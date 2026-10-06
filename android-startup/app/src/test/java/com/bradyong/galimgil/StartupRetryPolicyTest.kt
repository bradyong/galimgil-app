package com.bradyong.galimgil

import org.junit.Assert.*
import org.junit.Test

class StartupRetryPolicyTest {
    @Test fun boundedBackoff() {
        val p = StartupRetryPolicy()
        p.start(100)
        assertEquals(listOf(2000L, 4000L, 8000L, 10000L, 10000L), List(5) { p.nextDelay(100) })
        assertEquals(180100L, p.deadline)
        assertNull(p.nextDelay(180100))
    }
    @Test fun neverScheduleBeyondDeadline() {
        val p = StartupRetryPolicy()
        p.start(0)
        assertNull(p.nextDelay(179000))
        assertEquals(0L, p.remaining(190000))
    }
    @Test fun manualRetryRenewsBudget() {
        val p = StartupRetryPolicy()
        p.start(0)
        p.nextDelay(0)
        p.start(200000)
        assertEquals(2000L, p.nextDelay(200000))
        assertEquals(180000L, p.remaining(200000))
    }
    @Test fun onlyTransientHttp() {
        listOf(408, 425, 429, 500, 502, 503, 504).forEach { assertTrue(StartupRetryPolicy.transientHttp(it)) }
        listOf(200, 301, 400, 401, 403, 404).forEach { assertFalse(StartupRetryPolicy.transientHttp(it)) }
    }
}
