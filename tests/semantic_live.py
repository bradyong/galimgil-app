"""Opt-in bounded evaluation. Saves every attempt outside the public web root."""
import argparse
import json
import os
import pathlib
import sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from choice_meaning import interpret

p = argparse.ArgumentParser()
p.add_argument('candidates')
p.add_argument('output')
p.add_argument('--max-calls', type=int, default=1)
args = p.parse_args()
target = pathlib.Path(args.output).resolve()
root = pathlib.Path(__file__).resolve().parents[1]
if root == target or root in target.parents:
    raise SystemExit('Evaluation output must be outside public root')
rows = json.loads(pathlib.Path(args.candidates).read_text(encoding='utf-8-sig'))
saved = json.loads(target.read_text(encoding='utf-8')) if target.exists() else {}
count = 0
for row in rows:
    key = str(row['index'])
    if not row['needsAI'] or key in saved or count >= args.max_calls:
        continue
    saved[key] = {'status': 'confirmation', 'code': 'attempt-started'}
    target.write_text(json.dumps(saved, ensure_ascii=False, indent=2), encoding='utf-8')
    count += 1
    try:
        saved[key] = interpret({'question': row['q'], 'a': row['a'], 'b': row['b']}, os.environ['OPENAI_API_KEY'])
    except Exception as error:
        saved[key] = {'status': 'confirmation', 'code': type(error).__name__, 'http_status': getattr(error, 'code', None)}
    target.write_text(json.dumps(saved, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'index': row['index'], 'status': saved[key]['status'], 'code': saved[key].get('code'),
                      'usage': saved[key].get('usage'), 'http_status': saved[key].get('http_status')}, ensure_ascii=False), flush=True)
print('New attempts:', count)
