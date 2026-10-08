"""Loopback fixture preview. Never calls OpenAI or Upstash."""
import argparse
import json
import os
import sys
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT.parent/'low-confidence-safety-20261006'
sys.path.insert(0,str(ROOT))
import server
from choice_runtime import ChoiceRuntime

def read(name):return json.loads((OUT/name).read_text(encoding='utf-8'))

class FixtureRuntime(ChoiceRuntime):
    def __init__(self):
        self.meanings={json.dumps([r['question'],r['a'],r['b']],ensure_ascii=False):r['meaning_proposal']
                       for r in read('meaning-only-replay.json')['rows']}
        self.futures={json.dumps([r['question'],r['a'],r['b'],r['winner']],ensure_ascii=False):r['future_only']['future']
                      for r in read('future-only-pilot-report.json')['rows'] if r['future_only']['pass']}

    def one_shot(self,kind,body,ip,validator):
        data=json.loads(body['input'])
        if kind=='meaning':
            value=self.meanings.get(json.dumps([data['question'],data['a'],data['b']],ensure_ascii=False))
        else:
            future=self.futures.get(json.dumps([data['question'],data['A'],data['B'],data['winner']],ensure_ascii=False))
            value={'future':future} if future else None
        return value if validator(value) else None

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=8793);args=parser.parse_args()
    os.environ.pop('OPENAI_API_KEY',None)
    server.CHOICE_RUNTIME=FixtureRuntime()
    print(f'Fixture-only preview http://127.0.0.1:{args.port} (no external API)',flush=True)
    server.ThreadingHTTPServer(('127.0.0.1',args.port),server.AppHandler).serve_forever()
