"""Bounded 19-call isolated experiment, no automatic retries or engine mutation."""
import argparse,json,os,urllib.request
from pathlib import Path
import frozen_writer as w

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,*args,**kwargs):return None

p=argparse.ArgumentParser();p.add_argument('directory');p.add_argument('--execute',action='store_true');args=p.parse_args()
directory=Path(args.directory).resolve()
if directory==w.ROOT or w.ROOT in directory.parents:raise SystemExit('Outputs must be outside public root')
baseline=directory/'writer-frozen-baseline.json'
if not baseline.exists():
    original=json.loads((directory/'canonical-28.json').read_text(encoding='utf-8'))
    baseline.write_text(json.dumps({'hashes':w.hashes(),'rows':original['rows']},ensure_ascii=False,indent=2),encoding='utf-8')
frozen=json.loads(baseline.read_text(encoding='utf-8'))
assert frozen['hashes']==w.hashes(),'Frozen source changed'
rows=[r for r in frozen['rows'] if r['route']=='semantic-play'];assert len(rows)==19
target=directory/'writer-frozen-raw.json'
saved=json.loads(target.read_text(encoding='utf-8')) if target.exists() else {}
for row in rows:
    key=str(row['index'])
    if key in saved:continue
    body=w.body(row);encoded=json.dumps(body,ensure_ascii=False).encode()
    upper=((len(encoded)+1024)*.25+650*2)/1e6
    spent=sum(r['charged_bound'] for r in saved.values())
    if spent+upper>.05:raise SystemExit('Budget guard')
    if not args.execute:
        print(key,'worst-case',upper);continue
    saved[key]={'status':'attempted','charged_bound':upper}
    target.write_text(json.dumps(saved,ensure_ascii=False,indent=2),encoding='utf-8')
    try:
        request=urllib.request.Request('https://api.openai.com/v1/responses',data=encoded,method='POST',
            headers={'Authorization':'Bearer '+os.environ['OPENAI_API_KEY'],'Content-Type':'application/json'})
        with urllib.request.build_opener(NoRedirect()).open(request,timeout=60) as response:raw=json.loads(response.read())
        saved[key].update(raw=raw,usage=raw.get('usage',{}))
        if raw.get('usage'):saved[key]['charged_bound']=w.cost(raw['usage'])
        if raw.get('status')=='completed':
            draft=json.loads(''.join(c.get('text','') for i in raw['output'] for c in i.get('content',[]) if c.get('type')=='output_text'))
            saved[key].update(draft=draft,errors=w.validate(draft,row),status='completed')
        else:saved[key]['status']='incomplete'
    except Exception as e:saved[key]['status']=type(e).__name__
    target.write_text(json.dumps(saved,ensure_ascii=False,indent=2),encoding='utf-8')
    print(key,saved[key]['status'],saved[key].get('errors'),saved[key]['charged_bound'],flush=True)
assert frozen['hashes']==w.hashes(),'Frozen source changed'
