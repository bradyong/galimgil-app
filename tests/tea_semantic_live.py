"""One explicitly requested missing-case replay, never automatically retried."""
import json
import os
from pathlib import Path
import sys
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
import choice_meaning as cm
from play_axes_live import cost

target = Path(sys.argv[1]).resolve()
if ROOT == target or ROOT in target.parents:
    raise SystemExit('Raw response must remain outside the web root')
if target.exists():
    raise SystemExit('Attempt already recorded; no retry')
f = json.loads((ROOT/'tests/semantic-cases.json').read_text(encoding='utf-8'))[11]
data = {'question': f['q'], 'a': f['a'], 'b': f['b']}
body, encoded = cm.request_body(data, with_writer=False)
upper = ((len(encoded)+1024)*.25+body['max_output_tokens']*2)/1e6
if upper > .02:
    raise SystemExit('Budget guard')
record = {'status': 'attempted', 'upper_cost': upper}
target.write_text(json.dumps(record), encoding='utf-8')
request = urllib.request.Request('https://api.openai.com/v1/responses', data=encoded,
    headers={'Authorization': 'Bearer '+os.environ['OPENAI_API_KEY'], 'Content-Type': 'application/json'}, method='POST')
with urllib.request.build_opener(cm.NoRedirect()).open(request, timeout=60) as response:
    raw = json.loads(response.read())
record.update(raw=raw, cost=cost(raw.get('usage', {})))
target.write_text(json.dumps(record, ensure_ascii=False, indent=2), encoding='utf-8')
if raw.get('status') != 'completed':
    raise SystemExit('Incomplete; no retry')
content = json.loads(''.join(c.get('text','') for i in raw['output'] for c in i.get('content',[]) if c.get('type')=='output_text'))
meaning, discarded = cm.normalize(content['meaning'], data)
ready = cm.validate(meaning, data)
result = {'status':'ready' if ready else 'confirmation', 'meaning':meaning,
          'play_axes':cm.choice_play_axes.validate({'axes':content['play_axes']},meaning,data),
          'discarded_axes':discarded, 'usage':raw.get('usage',{}), 'cost':record['cost']}
(ROOT/'tests/fixtures/tea-semantic-response.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'status':result['status'],'cost':result['cost'],'usage':result['usage']},ensure_ascii=False))
