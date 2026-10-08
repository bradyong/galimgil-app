"""Local review only: replay the 28 stored cases without paid API access."""
import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CASES = json.loads((ROOT / 'tests/semantic-cases.json').read_text(encoding='utf-8'))
REPLIES = json.loads((ROOT / 'tests/fixtures/semantic-v2-responses.json').read_text(encoding='utf-8'))
PLAY = json.loads((ROOT / 'tests/fixtures/play-axes-responses.json').read_text(encoding='utf-8'))
CANONICAL = json.loads((ROOT / 'tests/fixtures/canonical-validated.json').read_text(encoding='utf-8'))
REPLIES['11'] = json.loads((ROOT / 'tests/fixtures/tea-semantic-response.json').read_text(encoding='utf-8'))


class Preview(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_POST(self):
        if self.path != '/api/choice-meaning':
            self.send_error(404)
            return
        length = int(self.headers.get('Content-Length', '0'))
        if length > 8192:
            self.send_error(413)
            return
        try:
            payload = json.loads(self.rfile.read(length))
        except (ValueError, TypeError):
            self.send_error(400)
            return
        result = {'status': 'confirmation', 'code': 'offline-preview'}
        for index, case in enumerate(CASES):
            if [payload.get(k) for k in ('question', 'a', 'b')] == [case[k] for k in ('q', 'a', 'b')]:
                result = {**REPLIES.get(str(index), result), 'play_axes': PLAY.get(str(index), {}).get('play_axes')}
                if str(index) in CANONICAL:
                    result['canonical_axes'] = CANONICAL[str(index)]['canonical_axes']
                break
        data = json.dumps(result, ensure_ascii=False).encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)


if __name__ == '__main__':
    ThreadingHTTPServer(('127.0.0.1', 8798), Preview).serve_forever()
