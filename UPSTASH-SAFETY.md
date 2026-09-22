# Upstash-only palm quotas

Configuration (Render Environment only): UPSTASH_REDIS_REST_URL,
UPSTASH_REDIS_REST_TOKEN, PALM_DAILY_PER_IP=30, PALM_DAILY_GLOBAL=300.
No SQLite, PALM_USAGE_DB, or in-memory fallback. No new dependency.

One Redis EVAL reads Redis TIME, computes the UTC+09 day, checks both caps, and
performs one SET of the combined state with TTL. A single mutation avoids partial
increments if a preceding command fails. Previous-day counters are replaced on
the first accepted request of the new day. TTL extends through the following day
for cleanup, never expiring today's state prematurely. Redis server time, not app
clock, controls midnight. State key: galimgil:palm:usage:v1.

IP identities are HMAC-SHA256 using the REST token, not raw IPs. Treat them as
pseudonymous personal data. Rotating the token changes per-IP identities for that
day but does not reset the global count. No photos/questions are stored here.
Shared network users share an IP allowance. Existing forwarded-IP extraction is
unchanged; the global cap remains important against IP spoofing/rotation.

Use a regular user-owned Free database, not a temporary 72-hour database.
Eviction MUST remain disabled: losing the state key would reset the allowance.
Do not delete the production key, rename it per deploy, or auto-upgrade to paid.
Provider inactivity archival and free-command limits remain operational caveats.

Timeout, transport/HTTP/Redis error, malformed response, missing configuration,
or unexpected result all fail closed before AI. No automatic quota request retry:
a lost response may have committed, so retries could consume twice. Existing
server returns a short Korean retry message with HTTP 503; A/B is independent.

tests/upstash_live.py uses only isolated test keys, makes NO AI calls, and logs no
credentials. It checks 30/300 under concurrency, synthetic KST midnight through
the actual Lua, and a seven-day test marker for restart/redeploy comparisons.
Synthetic midnight is not a real overnight wall-clock observation.
