"""Local design QA: saved responses only, no external requests."""
import os
import urllib.request
from urllib.parse import urlsplit

for key in tuple(os.environ):
    if key.startswith(('OPENAI_', 'UPSTASH_')):
        os.environ.pop(key, None)

def blocked(*args, **kwargs):
    raise RuntimeError('External requests disabled in UI fixture preview')

urllib.request.urlopen = blocked
from android_fixture_preview import Replay, DeviceHandler, server

class PreviewHandler(DeviceHandler):
    def do_GET(self):
        path = urlsplit(self.path).path
        public = {'/', '/index.html', '/styles.css', '/soft-lovely.css',
                  '/app.js', '/ui-shell.js', '/choice-input.js', '/choice-runtime.js',
                  '/native-ads-events.js', '/privacy.html', '/page-ready.js'}
        asset = path.startswith('/assets/') and '..' not in path
        if path == '/api/health':
            server.json_response(self, 200, {'ok': True, 'mode': 'fixture-only'})
        elif path in public or asset:
            server.AppHandler.do_GET(self)
        else:
            self.send_error(403)

if __name__ == '__main__':
    server.CHOICE_RUNTIME = Replay()
    print('Fixture-only UI: http://127.0.0.1:8798/; external requests blocked', flush=True)
    server.ThreadingHTTPServer(('127.0.0.1', 8798), PreviewHandler).serve_forever()
