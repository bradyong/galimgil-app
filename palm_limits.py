"""Atomic, server-side safety caps; independent of native advertising counters."""
import hashlib
import os
import pathlib
import sqlite3
import tempfile
from datetime import datetime, timedelta, timezone


def positive_setting(name, default):
    value = int(os.environ.get(name, default))
    if value < 1:
        raise ValueError(f"{name} must be a positive integer")
    return value


class PalmLimits:
    def __init__(self, path, per_ip=30, global_limit=300, day=None):
        if per_ip < 1 or global_limit < 1:
            raise ValueError("Palm safety limits must be positive")
        self.path = pathlib.Path(path)
        self.per_ip = per_ip
        self.global_limit = global_limit
        self.day = day or (lambda: datetime.now(timezone(timedelta(hours=9))).date().isoformat())

    def reserve(self, client_ip):
        day = self.day()
        identity = hashlib.sha256(f"{day}:{client_ip}".encode()).hexdigest()
        self.path.parent.mkdir(parents=True, exist_ok=True)
        connection = sqlite3.connect(self.path, timeout=5)
        try:
            # One write transaction prevents concurrent requests exceeding either cap.
            connection.execute("BEGIN IMMEDIATE")
            connection.execute("CREATE TABLE IF NOT EXISTS usage (day TEXT, identity TEXT, count INTEGER NOT NULL, PRIMARY KEY(day, identity))")
            connection.execute("DELETE FROM usage WHERE day <> ?", (day,))
            rows = dict(connection.execute("SELECT identity, count FROM usage WHERE day = ?", (day,)))
            if rows.get(identity, 0) >= self.per_ip:
                return "ip"
            if rows.get("global", 0) >= self.global_limit:
                return "global"
            for key in (identity, "global"):
                connection.execute("INSERT INTO usage VALUES (?, ?, 1) ON CONFLICT(day, identity) DO UPDATE SET count = count + 1", (day, key))
            connection.commit()
            return None
        finally:
            connection.close()


def configured_limits():
    return PalmLimits(
        os.environ.get("PALM_USAGE_DB", str(pathlib.Path(tempfile.gettempdir()) / "galimgil-palm-usage.sqlite3")),
        positive_setting("PALM_DAILY_PER_IP", 30),
        positive_setting("PALM_DAILY_GLOBAL", 300),
    )
