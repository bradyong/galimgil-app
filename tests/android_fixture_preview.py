"""Loopback-only Android UI verification using saved responses; no paid calls."""
import json
import os
import sys
import time
import argparse
from urllib.parse import urlsplit
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from choice_connection_preview import FixtureRuntime, OUT
import server

LOG = OUT / 'android-debug-20261008.jsonl'

def record(event, value):
    with LOG.open('a', encoding='utf-8') as stream:
        stream.write(json.dumps({'time': time.time(), 'event': event, 'value': value}, ensure_ascii=False) + '\n')

class Replay(FixtureRuntime):
    def __init__(self):
        super().__init__()
        ledger = json.loads((OUT / 'live-path-20261008/ledger.json').read_text(encoding='utf-8'))
        for row in ledger['calls'].values():
            if row.get('status') != 'completed':
                continue
            data = json.loads(row['request']['input'])
            if 'a' in data:
                self.meanings[json.dumps([data['question'], data['a'], data['b']], ensure_ascii=False)] = row['value']
            else:
                self.futures[json.dumps([data['question'], data['A'], data['B'], data['winner']], ensure_ascii=False)] = row['value']['future']

    def one_shot(self, kind, body, ip, validator):
        record(kind + '-start', json.loads(body['input']))
        if kind == 'future':
            time.sleep(2)
        value = super().one_shot(kind, body, ip, validator)
        record(kind + '-end', {'cache_hit': value is not None, 'external_calls': 0})
        return value

    def prepare(self, payload, ip):
        result = super().prepare(payload, ip)
        record('prepare', {'input': payload, 'result': result})
        return result

    def finalize(self, payload):
        result = super().finalize(payload)
        record('result', result)
        return result

    def future(self, payload, ip):
        result = super().future(payload, ip)
        record('future-result', result)
        return result

class DeviceHandler(server.AppHandler):
    def allowed(self):
        return self.client_address[0] in ('127.0.0.1', '192.168.0.8', '192.168.0.9')

    def do_GET(self):
        path = urlsplit(self.path).path
        public = {'/', '/index.html', '/styles.css', '/app.js', '/choice-input.js',
                  '/choice-runtime.js', '/native-ads-events.js', '/privacy.html', '/api/health'}
        asset = path.startswith('/assets/') and '..' not in path and Path(path).suffix in ('.png', '.jpg', '.webp', '.svg', '.ico')
        if not self.allowed() or not (path in public or asset):
            self.send_error(403)
            return
        super().do_GET()

    def do_POST(self):
        if not self.allowed() or self.path not in ('/api/choice-meaning-only', '/api/choice-play', '/api/choice-future'):
            self.send_error(403)
            return
        super().do_POST()

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--host', choices=['127.0.0.1', '192.168.0.8'], default='127.0.0.1')
    args = parser.parse_args()
    os.environ.pop('OPENAI_API_KEY', None)
    server.CHOICE_RUNTIME = Replay()
    print(f'Android fixture preview http://{args.host}:8795/; zero external AI calls', flush=True)
    server.ThreadingHTTPServer((args.host, 8795), DeviceHandler).serve_forever()
