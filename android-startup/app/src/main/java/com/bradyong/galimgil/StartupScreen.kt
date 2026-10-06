package com.bradyong.galimgil

import android.content.Context
import android.content.res.ColorStateList
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.os.Handler
import android.os.Looper
import android.os.SystemClock
import android.view.Gravity
import android.view.View
import android.webkit.WebView
import android.widget.Button
import android.widget.FrameLayout
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.ProgressBar
import android.widget.TextView

/** Owns only the loading curtain; consent, ads and web app state remain independent. */
class StartupScreen(context: Context, private val webView: WebView, private val appUrl: String) : FrameLayout(context) {
    private val handler = Handler(Looper.getMainLooper())
    private val probe = context.assets.open("page-ready.js").bufferedReader().use { it.readText() }
    private var generation = 0L
    private val policy = StartupRetryPolicy()
    private var retryPending = false
    private var finishedAt = 0L
    private var waiting = false
    private var failed = false
    private var targetUrl = appUrl
    private val message = TextView(context)
    private val progress = ProgressBar(context)
    private val retry = Button(context)
    private fun dp(value: Int) = (value * resources.displayMetrics.density).toInt()

    init {
        setBackgroundColor(Color.rgb(7, 17, 22))
        isClickable = true
        isFocusable = true
        addView(object : View(context) {
            private val paint = Paint(Paint.ANTI_ALIAS_FLAG)
            override fun onDraw(canvas: Canvas) {
                paint.color = Color.rgb(112, 153, 157)
                for (i in 0 until 45) {
                    val x = ((i * 137 + 29) % 997) / 997f * width
                    val y = ((i * 211 + 71) % 991) / 991f * height
                    canvas.drawCircle(x, y, resources.displayMetrics.density * if (i % 5 == 0) 1.5f else 0.7f, paint)
                }
            }
        }, LayoutParams(-1, -1))
        val content = LinearLayout(context).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            setPadding(dp(24), dp(24), dp(24), dp(24))
        }
        content.addView(ImageView(context).apply {
            setImageResource(R.mipmap.ic_launcher)
            importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_NO
        }, LinearLayout.LayoutParams(dp(76), dp(76)))
        content.addView(TextView(context).apply {
            text = "갈림길"
            textSize = 28f
            setTextColor(Color.rgb(244, 200, 102))
            gravity = Gravity.CENTER
            setPadding(0, dp(16), 0, dp(24))
        })
        progress.indeterminateTintList = ColorStateList.valueOf(Color.rgb(84, 210, 194))
        content.addView(progress, LinearLayout.LayoutParams(dp(28), dp(28)))
        message.apply {
            textSize = 16f
            gravity = Gravity.CENTER
            setTextColor(Color.rgb(247, 251, 255))
            setPadding(0, dp(20), 0, dp(16))
            accessibilityLiveRegion = View.ACCESSIBILITY_LIVE_REGION_POLITE
        }
        content.addView(message)
        retry.text = "재시도"
        retry.setOnClickListener { start() }
        content.addView(retry)
        addView(content, LayoutParams(-1, -2, Gravity.CENTER))
        cover()
    }

    private fun cover() {
        visibility = View.VISIBLE
        webView.alpha = 0f
        webView.importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_NO_HIDE_DESCENDANTS
    }

    fun start() {
        generation++
        handler.removeCallbacksAndMessages(null)
        failed = false
        waiting = true
        finishedAt = 0
        policy.start(SystemClock.elapsedRealtime())
        retryPending = false
        cover()
        progress.visibility = View.VISIBLE
        retry.visibility = View.GONE
        message.text = "별빛을 모으고 있어요"
        val ticket = generation
        handler.postDelayed({ if (waiting && generation == ticket) fail() }, StartupRetryPolicy.TOTAL_MS)
        webView.loadUrl(targetUrl)
    }

    fun pageStarted(url: String) {
        // Redirects/reloads invalidate old callbacks without extending the attempt deadline.
        if (failed) { cover(); return }
        if (com.bradyong.galimgil.ads.AdsWebBridge.trusted(android.net.Uri.parse(url))) targetUrl = url
        if (!waiting) {
            waiting = true
            policy.start(SystemClock.elapsedRealtime())
            progress.visibility = View.VISIBLE
            retry.visibility = View.GONE
            message.text = "별빛을 모으고 있어요"
        }
        generation++
        retryPending = false
        handler.removeCallbacksAndMessages(null)
        finishedAt = 0
        cover()
        val ticket = generation
        handler.postDelayed({ if (waiting && generation == ticket) fail() },
            policy.remaining(SystemClock.elapsedRealtime()))
        handler.postDelayed({ if (waiting && generation == ticket) connectionError("attempt-timeout") }, StartupRetryPolicy.ATTEMPT_MS)
        android.util.Log.i("GalimgilStartup", "loading remainingMs=${policy.remaining(SystemClock.elapsedRealtime())}")
    }

    fun pageFinished() {
        if (!waiting || failed || retryPending) return
        if (finishedAt == 0L) finishedAt = SystemClock.elapsedRealtime()
        checkReady(generation)
    }

    private fun checkReady(ticket: Long) {
        if (!waiting || failed || ticket != generation) return
        webView.evaluateJavascript(probe) { result ->
            if (!waiting || failed || ticket != generation) return@evaluateJavascript
            if (result == "true") {
                webView.postVisualStateCallback(ticket, object : WebView.VisualStateCallback() {
                    override fun onComplete(requestId: Long) {
                        if (!waiting || failed || ticket != generation) return
                        handler.removeCallbacksAndMessages(null)
                        waiting = false
                        android.util.Log.i("GalimgilStartup", "ready remainingMs=${policy.remaining(SystemClock.elapsedRealtime())}")
                        webView.alpha = 1f
                        webView.importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_AUTO
                        visibility = View.GONE
                    }
                })
            } else if (SystemClock.elapsedRealtime() - finishedAt >= 5_000L) {
                // Render's wake page can return HTTP 200 without becoming the app.
                connectionError("page-not-ready")
            } else {
                handler.postDelayed({ checkReady(ticket) }, 500)
            }
        }
    }

    fun connectionError(reason: String) {
        if (!waiting || failed || retryPending) return
        val delay = policy.nextDelay(SystemClock.elapsedRealtime()) ?: return fail()
        retryPending = true
        generation++
        val ticket = generation
        handler.removeCallbacksAndMessages(null)
        cover()
        webView.stopLoading()
        android.util.Log.i("GalimgilStartup", "retry reason=$reason delayMs=$delay remainingMs=${policy.remaining(SystemClock.elapsedRealtime())}")
        handler.postDelayed({ if (waiting && generation == ticket) fail() }, policy.remaining(SystemClock.elapsedRealtime()))
        handler.postDelayed({
            if (waiting && !failed && generation == ticket) {
                retryPending = false
                webView.loadUrl(targetUrl)
            }
        }, delay)
    }

    fun httpError(status: Int) {
        if (!waiting || failed || retryPending) return
        if (StartupRetryPolicy.transientHttp(status)) connectionError("http-$status") else fail()
    }

    fun fail() {
        generation++
        waiting = false
        failed = true
        android.util.Log.i("GalimgilStartup", "manual-retry")
        handler.removeCallbacksAndMessages(null)
        cover()
        webView.stopLoading()
        progress.visibility = View.GONE
        message.text = "연결이 지연되고 있습니다"
        retry.visibility = View.VISIBLE
    }

    fun destroy() {
        generation++
        waiting = false
        handler.removeCallbacksAndMessages(null)
    }

}
