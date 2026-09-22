"""Run on Render with its environment. Never imports server or calls AI.
Only writes isolated galimgil:test:* keys; deletes its own temporary keys.
"""
import json
import pathlib
import sys
import uuid
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0,str(pathlib.Path(__file__).resolve().parents[1]))
from palm_limits import configured_limits, SCRIPT

def persistence():
    client = configured_limits()
    key = 'galimgil:test:persistence:20260922'
    before = client.command(['GET',key])
    if before is None:
        client.command(['SET',key,uuid.uuid4().hex,'NX','EX',604800])
    value = client.command(['GET',key])
    print('PERSISTENCE', 'EXISTING' if before else 'SEEDED', value, flush=True)
    client.key = key + ':counter'
    previous = client.command(['GET',client.key])
    if previous is None:
        assert client.reserve('persistence-fixture') is None
    current = client.command(['GET',client.key])
    assert json.loads(current)['total'] == 1
    if previous is not None:
        assert json.loads(previous) == json.loads(current)
    print('COUNTER PERSISTENCE', 'EXISTING' if previous else 'SEEDED', current, flush=True)

def run():
    client = configured_limits()
    prefix = 'galimgil:test:' + uuid.uuid4().hex
    keys = []
    def fresh(suffix):
        key = prefix + ':' + suffix
        keys.append(key)
        instance = configured_limits()
        instance.key = key
        return instance
    try:
        ip = fresh('ip')
        with ThreadPoolExecutor(max_workers=8) as pool:
            results = list(pool.map(ip.reserve, ['fixture-ip'] * 40))
        assert results.count(None)==30 and results.count('ip')==10, results
        print('PASS concurrent IP 30/40',flush=True)
        global_limit = fresh('global')
        with ThreadPoolExecutor(max_workers=8) as pool:
            results = list(pool.map(global_limit.reserve, map(str,range(320))))
        assert results.count(None)==300 and results.count('global')==20
        print('PASS concurrent global 300/320',flush=True)
        # Execute the same Lua with only TIME substituted for a synthetic boundary.
        clock = fresh('clock')
        before = 1790089199  # A timestamp immediately before a KST midnight.
        before = ((before + 32400)//86400 + 1)*86400 - 32400 - 1
        for timestamp, expected in [(before,0),(before,1),(before+1,0)]:
            script = SCRIPT.replace("tonumber(redis.call('TIME')[1])",str(timestamp))
            result = clock.command(['EVAL',script,1,clock.key,'fixture',1,300])
            assert result == expected,(timestamp,result)
        print('PASS synthetic KST midnight Lua transition',flush=True)
        persistence()
    finally:
        for key in keys:
            client.command(['DEL',key])

if __name__ == '__main__':
    try:
        persistence() if '--persistence-only' in sys.argv else run()
    except Exception as error:
        print('UPSTASH TEST FAILED:', type(error).__name__, flush=True)
        sys.exit(1)
