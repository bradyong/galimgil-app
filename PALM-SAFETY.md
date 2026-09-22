# Palm request safety caps

Native ad counters and behavior are unchanged. The server does not trust an ad
view claim and does not require an ad to succeed before processing a request.

## Configuration

- PALM_DAILY_PER_IP: default 30; positive integer.
- PALM_DAILY_GLOBAL: default 300; positive integer. User approved 300 on
  2026-09-22. This is a request cap, not a monetary budget guarantee.
- PALM_USAGE_DB: SQLite file OUTSIDE the public web directory. Defaults to the OS
  temporary directory, galimgil-palm-usage.sqlite3.
- Day boundary: midnight Korea time (UTC+09:00), independent of server timezone.
- Values of zero/negative or malformed settings fail startup rather than silently
  disabling the safety caps.

Requests passing the existing body/image validation are reserved before the paid
provider call. Provider failures still consume a reservation because the provider
may already have incurred work/cost. Invalid input does not consume a reservation.
Database failure returns 503 without making a paid request. Limits return 429 with
an explicit Korean explanation and separate IP/global codes. A SQLite write
transaction protects both counters against simultaneous requests.

The stored IP key is a day-specific hash, NOT anonymous data; no raw IP, photo or
question is stored in this database. Previous-day rows are removed on reservation.
The database cannot be configured inside the public document root.

## Deployment requirements and limitations

No production deployment was performed for this change. The temporary default
survives application-process restart only while its file still exists. Render's
ephemeral filesystem can reset it on deployment/replacement. Before production,
configure PALM_USAGE_DB on a persistent volume (outside the public root) or migrate
the counters to a shared persistent database. Separate instances with separate
SQLite files DO NOT share a global cap; use one instance with a durable file or a
shared database. A permanent monetary budget cannot be claimed from these counters.

IP identity follows the existing first X-Forwarded-For entry/fallback socket-IP
behavior. Verify trusted proxy header normalization before relying on the IP cap;
forged headers or changing IPs can evade an IP cap, but cannot evade the global
cap on a single persistent database. Shared Wi-Fi users share an IP allowance.

The previous unlimited-removal commit was not pushed. Do not deploy that commit
on its own. Include server.py AND palm_limits.py with this safety policy.

## Validation

Offline tests cover IP 29/30/31, global 300/301, multiple IPs beyond the old global
30 cap, process-object recreation/persistence, next day, concurrent IP/global
reservations, invalid inputs, missing key, provider failure and database failure.
No real photos or paid provider requests are used in these tests.
