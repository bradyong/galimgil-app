"""Five missing enum repairs, one request each with durable no-retry markers."""
import json, os, sys, urllib.request
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
import choice_meaning as cm
import choice_canonical as cc
from play_axes_live import cost
target=Path(sys.argv[1]).resolve()
if target==ROOT or ROOT in target.parents: raise SystemExit('Outside web root only')
saved=json.loads(target.read_text(encoding='utf-8')) if target.exists() else {}
cases=json.loads((ROOT/'tests/semantic-cases.json').read_text(encoding='utf-8'))
replies=json.loads((ROOT/'tests/fixtures/semantic-v2-responses.json').read_text(encoding='utf-8'))
indices = [int(i) for i in sys.argv[2].split(',')] if len(sys.argv)>2 else [6,15,24,25,26]
for i in indices:
    key=str(i)
    if key in saved: continue
    f=cases[i];data={'question':f['q'],'a':f['a'],'b':f['b']};meaning=replies[key]['meaning']
    body=cc.request_body(data,meaning,cm.MODEL);encoded=json.dumps(body,ensure_ascii=False).encode()
    upper=((len(encoded)+1024)*.25+750*2)/1e6
    if sum(r['bound'] for r in saved.values())+upper>.02: raise SystemExit('Budget guard')
    saved[key]={'status':'attempted','bound':upper}
    target.write_text(json.dumps(saved,ensure_ascii=False,indent=2),encoding='utf-8')
    request=urllib.request.Request('https://api.openai.com/v1/responses',data=encoded,
        headers={'Authorization':'Bearer '+os.environ['OPENAI_API_KEY'],'Content-Type':'application/json'},method='POST')
    with urllib.request.build_opener(cm.NoRedirect()).open(request,timeout=60) as response: raw=json.loads(response.read())
    saved[key].update(raw=raw,usage=raw.get('usage',{}),bound=cost(raw.get('usage',{})))
    target.write_text(json.dumps(saved,ensure_ascii=False,indent=2),encoding='utf-8')
    if raw.get('status')!='completed': raise SystemExit('Incomplete; no retry')
    content=json.loads(''.join(c.get('text','') for item in raw['output'] for c in item.get('content',[]) if c.get('type')=='output_text'))
    axes=cc.accepted_rows(content['canonical_axes'],meaning,data)
    saved[key].update(status='ready' if axes is not None else 'invalid',canonical_axes=axes)
    target.write_text(json.dumps(saved,ensure_ascii=False,indent=2),encoding='utf-8')
    print(key,saved[key]['status'],saved[key]['bound'],flush=True)
fixture={k:{a:r[a] for a in ['status','canonical_axes','usage','bound']} for k,r in saved.items()}
(ROOT/('tests/fixtures/canonical-repair-responses.json' if len(sys.argv)>2 else 'tests/fixtures/canonical-responses.json')).write_text(json.dumps(fixture,ensure_ascii=False,indent=2),encoding='utf-8')
