"""Atomic Upstash quotas. No local persistence or fail-open fallback."""
import hashlib
import hmac
import json
import os
import urllib.request
from urllib.parse import urlsplit


SCRIPT = """
local now = tonumber(redis.call('TIME')[1])
local day = math.floor((now + 32400) / 86400)
local raw = redis.call('GET', KEYS[1])
local state = {day=day, total=0, ips={}}
if raw then
  state = cjson.decode(raw)
  if type(state.day) ~= 'number' or type(state.total) ~= 'number' or type(state.ips) ~= 'table' then
    return redis.error_reply('Invalid quota state')
  end
  if state.day > day then return redis.error_reply('Quota clock mismatch') end
  if state.day < day then state = {day=day, total=0, ips={}} end
end
local count = state.ips[ARGV[1]] or 0
if count >= tonumber(ARGV[2]) then return 1 end
if state.total >= tonumber(ARGV[3]) then return 2 end
state.ips[ARGV[1]] = count + 1
state.total = state.total + 1
local ttl = (day + 1) * 86400 - 32400 - now + 86400
redis.call('SET', KEYS[1], cjson.encode(state), 'EX', ttl)
return 0
"""


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def positive_setting(name, default):
    value = int(os.environ.get(name, default))
    if value < 1:
        raise ValueError(f"{name} must be a positive integer")
    return value


class PalmLimits:
    def __init__(self, url, token, per_ip=30, global_limit=300, key='galimgil:palm:usage:v1'):
        if per_ip < 1 or global_limit < 1:
            raise ValueError("Palm safety limits must be positive")
        self.url = url
        self.token = token
        self.key = key
        self.per_ip = per_ip
        self.global_limit = global_limit

    def command(self, command):
        parsed = urlsplit(self.url)
        if (parsed.scheme != 'https' or not (parsed.hostname or '').endswith('.upstash.io')
                or parsed.username or parsed.password or parsed.query or parsed.fragment
                or parsed.path not in ('', '/') or parsed.port not in (None, 443) or not self.token):
            raise RuntimeError('Upstash configuration unavailable')
        request = urllib.request.Request(self.url, data=json.dumps(command).encode(),
            headers={'Authorization': 'Bearer ' + self.token, 'Content-Type': 'application/json'}, method='POST')
        try:
            with urllib.request.build_opener(NoRedirect()).open(request, timeout=5) as response:
                payload = json.loads(response.read())
            if not isinstance(payload, dict) or 'error' in payload or 'result' not in payload:
                raise ValueError('Invalid response')
            return payload['result']
        except Exception:
            raise RuntimeError('Upstash request unavailable') from None

    def reserve(self, client_ip):
        identity = hmac.new(self.token.encode(), client_ip.encode(), hashlib.sha256).hexdigest()
        result = self.command(['EVAL', SCRIPT, 1, self.key, identity, self.per_ip, self.global_limit])
        if type(result) is not int or result not in (0, 1, 2):
            raise RuntimeError('Invalid quota response')
        return {0: None, 1: 'ip', 2: 'global'}[result]


def configured_limits():
    return PalmLimits(
        os.environ.get('UPSTASH_REDIS_REST_URL', ''),
        os.environ.get('UPSTASH_REDIS_REST_TOKEN', ''),
        positive_setting("PALM_DAILY_PER_IP", 30),
        positive_setting("PALM_DAILY_GLOBAL", 300),
    )
