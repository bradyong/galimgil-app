package com.bradyong.galimgil

import android.annotation.SuppressLint
import android.app.Activity
import android.content.ContentValues
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.graphics.Bitmap
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.provider.MediaStore
import android.util.Base64
import android.webkit.JavascriptInterface
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.addCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import com.bradyong.galimgil.ads.AdsController
import com.bradyong.galimgil.ads.AdsWebBridge
import com.bradyong.galimgil.ads.ConsentManager
import java.io.OutputStream

class MainActivity : ComponentActivity() {
    private lateinit var webView: WebView
    private var filePathCallback: ValueCallback<Array<Uri>>? = null
    private lateinit var ads: AdsController
    private lateinit var consent: ConsentManager
    private lateinit var adsBridge: AdsWebBridge
    private lateinit var startupScreen: StartupScreen

    private val fileChooserLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            val callback = filePathCallback
            filePathCallback = null

            if (callback == null) return@registerForActivityResult

            val uris = when {
                result.resultCode != Activity.RESULT_OK -> null
                result.data?.clipData != null -> {
                    val clipData = result.data?.clipData
                    Array(clipData?.itemCount ?: 0) { index ->
                        clipData!!.getItemAt(index).uri
                    }
                }
                result.data?.data != null -> arrayOf(result.data!!.data!!)
                else -> null
            }

            callback.onReceiveValue(uris)
        }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        WindowCompat.setDecorFitsSystemWindows(window, false)
        val root = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
        val bannerHost = FrameLayout(this)
        ads = AdsController(this, bannerHost)
        consent = ConsentManager(this) {
            ads.setConsent(adsBridge.connected && consent.canRequestAds)
            adsBridge.updatePrivacy()
        }

        webView = WebView(this).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.databaseEnabled = true
            settings.cacheMode = WebSettings.LOAD_DEFAULT
            settings.allowFileAccess = false
            settings.allowContentAccess = true
            settings.mediaPlaybackRequiresUserGesture = false
            addJavascriptInterface(AppBridge(), "GalimgilAndroid")

            webViewClient = object : WebViewClient() {
                override fun onPageStarted(view: WebView, url: String, favicon: Bitmap?) {
                    if (::startupScreen.isInitialized) startupScreen.pageStarted(url)
                    if (::adsBridge.isInitialized) adsBridge.pageStarted()
                }
                override fun onReceivedError(view: WebView, request: WebResourceRequest, error: android.webkit.WebResourceError) {
                    if (request.isForMainFrame) startupScreen.connectionError("network-${error.errorCode}")
                }

                override fun onReceivedHttpError(view: WebView, request: WebResourceRequest, response: android.webkit.WebResourceResponse) {
                    if (request.isForMainFrame) startupScreen.httpError(response.statusCode)
                }
                override fun shouldOverrideUrlLoading(
                    view: WebView,
                    request: WebResourceRequest
                ): Boolean {
                    return if (AdsWebBridge.trusted(request.url)) {
                        false
                    } else {
                        if (request.isForMainFrame) runCatching { startActivity(Intent(Intent.ACTION_VIEW, request.url)) }
                        true
                    }
                }

                override fun onPageFinished(view: WebView, url: String) {
                    super.onPageFinished(view, url)
                    startupScreen.pageFinished()
                    if (!AdsWebBridge.trusted(Uri.parse(url))) return
                    adsBridge.updatePrivacy()
                    view.evaluateJavascript(
                        """
                        (function () {
                          if (!window.GalimgilAndroid) return;
                          navigator.share = function (data) {
                            data = data || {};
                            var title = String(data.title || '갈림길');
                            var pieces = [];
                            if (data.text) pieces.push(String(data.text));
                            if (data.url) pieces.push(String(data.url));
                            window.GalimgilAndroid.shareText(title, pieces.join('\n\n'));
                            return Promise.resolve();
                          };
                        })();
                        """.trimIndent(),
                        null
                    )
                }
            }

            webChromeClient = object : WebChromeClient() {
                override fun onShowFileChooser(
                    webView: WebView,
                    filePathCallback: ValueCallback<Array<Uri>>,
                    fileChooserParams: FileChooserParams
                ): Boolean {
                    this@MainActivity.filePathCallback?.onReceiveValue(null)
                    this@MainActivity.filePathCallback = filePathCallback

                    val intent = fileChooserParams.createIntent().apply {
                        addCategory(Intent.CATEGORY_OPENABLE)
                        type = "image/*"
                    }

                    return try {
                        fileChooserLauncher.launch(intent)
                        true
                    } catch (_: Exception) {
                        this@MainActivity.filePathCallback = null
                        filePathCallback.onReceiveValue(null)
                        false
                    }
                }
            }

        }

        root.addView(webView, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1f))
        root.addView(bannerHost, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0))
        var imeVisible = false
        ViewCompat.setOnApplyWindowInsetsListener(root) { view, insets ->
            val safe = insets.getInsets(WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout())
            val ime = insets.getInsets(WindowInsetsCompat.Type.ime())
            imeVisible = insets.isVisible(WindowInsetsCompat.Type.ime())
            view.setPadding(safe.left, safe.top, safe.right, maxOf(safe.bottom, ime.bottom))
            ads.onLayout(view.width - safe.left - safe.right, imeVisible)
            insets
        }
        root.addOnLayoutChangeListener { view, _, _, _, _, _, _, _, _ ->
            ads.onLayout(view.width - view.paddingLeft - view.paddingRight, imeVisible)
        }
        val container = FrameLayout(this)
        container.setBackgroundColor(android.graphics.Color.rgb(7, 17, 22))
        container.addView(root, FrameLayout.LayoutParams(-1, -1))
        // Bypass legacy entry-page caches only; subresources retain normal HTTP caching.
        startupScreen = StartupScreen(this, webView, APP_URL + "?launch=" + java.util.UUID.randomUUID())
        container.addView(startupScreen, FrameLayout.LayoutParams(-1, -1))
        setContentView(container)
        ViewCompat.requestApplyInsets(root)
        WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG)
        adsBridge = AdsWebBridge(webView, ads, consent)
        val adsSupported = adsBridge.install()
        startupScreen.start()
        if (adsSupported) consent.gather()

        onBackPressedDispatcher.addCallback(this) {
            adsBridge.pageStarted()
            if (webView.canGoBack()) {
                webView.goBack()
            } else {
                finish()
            }
        }
    }

    override fun onResume() {
        super.onResume()
        if (::ads.isInitialized) ads.resume()
        if (::webView.isInitialized) webView.onResume()
    }

    override fun onPause() {
        if (::ads.isInitialized) ads.pause()
        if (::webView.isInitialized) webView.onPause()
        super.onPause()
    }

    override fun onDestroy() {
        startupScreen.destroy()
        filePathCallback?.onReceiveValue(null)
        filePathCallback = null
        ads.destroy()
        webView.destroy()
        super.onDestroy()
    }

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }

    inner class AppBridge {
        @JavascriptInterface
        fun shareText(title: String, text: String) {
            runOnUiThread {
                val sendIntent = Intent(Intent.ACTION_SEND).apply {
                    type = "text/plain"
                    putExtra(Intent.EXTRA_TITLE, title)
                    putExtra(Intent.EXTRA_SUBJECT, title)
                    putExtra(Intent.EXTRA_TEXT, text)
                }
                startActivity(Intent.createChooser(sendIntent, title.ifBlank { "Galimgil share" }))
            }
        }

        @JavascriptInterface
        fun saveImage(dataUrl: String, filename: String) {
            runOnUiThread {
                try {
                    val base64Part = dataUrl.substringAfter(",", "")
                    if (base64Part.isBlank()) {
                        showToast("Image save failed.")
                        return@runOnUiThread
                    }

                    val imageBytes = Base64.decode(base64Part, Base64.DEFAULT)
                    val safeFilename = filename.ifBlank { "galimgil-card.png" }
                    val values = ContentValues().apply {
                        put(MediaStore.Images.Media.DISPLAY_NAME, safeFilename)
                        put(MediaStore.Images.Media.MIME_TYPE, "image/png")
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                            put(MediaStore.Images.Media.RELATIVE_PATH, "Pictures/Galimgil")
                            put(MediaStore.Images.Media.IS_PENDING, 1)
                        }
                    }

                    val resolver = contentResolver
                    val uri = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values)
                    if (uri == null) {
                        showToast("Image save failed.")
                        return@runOnUiThread
                    }

                    resolver.openOutputStream(uri).use { output: OutputStream? ->
                        output?.write(imageBytes)
                    }

                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                        values.clear()
                        values.put(MediaStore.Images.Media.IS_PENDING, 0)
                        resolver.update(uri, values, null, null)
                    }

                    showToast("Saved to Gallery.")
                } catch (_: Exception) {
                    showToast("Image save failed.")
                }
            }
        }
    }

    private companion object {
        const val APP_URL = "https://galimgil-app.onrender.com/"
    }
}
