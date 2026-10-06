package com.bradyong.galimgil

/** Pure timing policy; retries never renew the overall startup budget. */
internal class StartupRetryPolicy {
    var deadline = 0L
        private set
    private var failures = 0
    fun start(now: Long) { deadline = now + TOTAL_MS; failures = 0 }
    fun remaining(now: Long) = (deadline - now).coerceAtLeast(0)
    fun nextDelay(now: Long): Long? {
        val delay = (2_000L shl failures.coerceAtMost(3)).coerceAtMost(10_000L)
        failures++
        return delay.takeIf { remaining(now) > it }
    }
    companion object {
        const val TOTAL_MS = 180_000L
        const val ATTEMPT_MS = 25_000L
        fun transientHttp(status: Int) = status == 408 || status == 425 || status == 429 || status in 500..599
    }
}
