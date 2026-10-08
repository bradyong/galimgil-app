"""One-shot frozen pipeline. Durable attempts and conservative $0.10 reservation."""
import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
import choice_meaning as cm
import choice_canonical as cc
from writer_grounded_reason import render_reason
import frozen_writer as fw
OUT=ROOT.parent/'low-confidence-safety-20261006'
NODE=Path.home()/'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
CAP=.10
def read(path):return json.loads(path.read_text(encoding='utf-8'))
def save(path,data):
    tmp=path.with_suffix('.tmp')
    tmp.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
    tmp.replace(path)
def digest(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def verify():
    lock=read(OUT/'blind-40-lock.json')
    assert digest(ROOT/'tests/fixtures/blind-40-20261007.json')==lock['dataset_sha256']
    for name,h in lock['protected_source_hashes'].items():assert digest(ROOT/name)==h,name
    for name,h in lock['training_artifact_hashes'].items():assert digest(OUT/name)==h,name
def reserve(body):
    # UTF-8 bytes bound text token count; overhead allowance includes framing.
    return ((len(json.dumps(body,ensure_ascii=False).encode())+1024)*.25+body['max_output_tokens']*2)/1e6
class BudgetStop(Exception):pass

def call_once(ledger,key,body,transport):
    if key in ledger['requests']:return ledger['requests'][key]
    bound=reserve(body)
    if sum(r['charged_or_reserved'] for r in ledger['requests'].values())+bound>CAP:
        raise BudgetStop(key)
    record={'status':'attempted','charged_or_reserved':bound,'reserved':bound,'body_sha256':hashlib.sha256(json.dumps(body,sort_keys=True).encode()).hexdigest()}
    ledger['requests'][key]=record
    save(OUT/'blind-40-ledger.json',ledger)  # Written BEFORE network, never retried.
    try:
        raw=transport(body)
        record.update(raw=raw,status=raw.get('status','unknown'))
        if raw.get('usage'):
            record.update(usage=raw['usage'],charged_or_reserved=fw.cost(raw['usage']))
        if raw.get('status')=='completed':
            text=''.join(c.get('text','') for item in raw.get('output',[]) for c in item.get('content',[]) if c.get('type')=='output_text')
            record['content']=json.loads(text)
    except urllib.error.HTTPError as e:
        record.update(status='http-error',http_code=e.code)
    except Exception as e:
        record.update(status='error',error_type=type(e).__name__)
    save(OUT/'blind-40-ledger.json',ledger)
    return record

def transport(body):
    req=urllib.request.Request('https://api.openai.com/v1/responses',data=json.dumps(body,ensure_ascii=False).encode(),
        headers={'Authorization':'Bearer '+os.environ['OPENAI_API_KEY'],'Content-Type':'application/json'},method='POST')
    with urllib.request.build_opener(cm.NoRedirect()).open(req,timeout=60) as response:
        return json.loads(response.read())

def semantic_result(content,data):
    meaning,discarded=cm.normalize(content['meaning'],data)
    ready=cm.validate(meaning,data)
    return {'status':'ready' if ready else 'confirmation','meaning':meaning,
            'discarded':discarded,'canonical_axes':cc.accepted_rows(content.get('canonical_axes'),meaning,data) if ready else []}

def automatic(draft,row):
    result={k:[] for k in ('future','capture')}
    for k,lo,hi in [('future',12,90),('capture',8,45)]:
        value=draft.get(k)
        if not isinstance(value,str) or not lo<=len(value)<=hi:
            result[k].append('length-or-type');continue
        if re.search(r'<[^>]+>|\b(canonical|axis|winner|score|active|passive|immediacy)\b',value,re.I):result[k].append('internal-code')
        if k=='future' and re.search(r'것이다|하게\s*된다|예상된다',value):result[k].append('prediction-style')
        if k=='capture' and value.strip(' .!?') in [row['a'],row['b']]:result[k].append('option-only')
    if draft.get('future')==draft.get('capture'):result['capture'].append('identical-future')
    return result

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--execute',action='store_true');args=parser.parse_args()
    verify()
    if not args.execute:print('Verified frozen data/sources; no API calls.');return
    if not os.getenv('OPENAI_API_KEY'):raise SystemExit('Missing key; no calls')
    path=OUT/'blind-40-ledger.json'
    ledger=read(path) if path.exists() else {'cap':CAP,'requests':{},'rows':{},'status':'running'}
    # Outcome-independent manifest: no prompt or evaluator tuning after results.
    runlock=OUT/'blind-40-run-lock.json'
    hashes={n:digest(ROOT/n) for n in ['tests/blind_live.py','tests/blind_engine.cjs','tests/frozen_writer.py']}
    if runlock.exists():assert read(runlock)==hashes
    else:save(runlock,hashes)
    cases=read(ROOT/'tests/fixtures/blind-40-20261007.json')
    preflight=read(OUT/'blind-40-preflight.json')['rows']
    for f,pre in zip(cases,preflight):
        key=f['id']
        if key in ledger['rows']:continue
        r={'id':key,'index':pre['index'],'q':f['q'],'a':f['a'],'b':f['b'],'status':'started'}
        try:
            data={'question':f['q'],'a':f['a'],'b':f['b']}
            if pre['needsAI']:
                body,_=cm.request_body(data,with_writer=False)
                record=call_once(ledger,key+':semantic',body,transport)
                if record.get('status')!='completed' or 'content' not in record:
                    r.update(status='semantic-call-failed',route='technical-failure');raise ValueError('semantic-call-failed')
                sem=semantic_result(record['content'],data)
                r['semantic']=sem
            else:sem=None
            process=subprocess.run([str(NODE),str(ROOT/'tests/blind_engine.cjs')],input=json.dumps({'input':pre['input'],'semantic':sem},ensure_ascii=False),
                encoding='utf-8',capture_output=True,check=True,cwd=ROOT)
            engine=json.loads(process.stdout);r['engine']=engine;r['route']=engine['route']
            if engine['route']=='confirmation':
                r.update(status='confirmation',output=None)
            else:
                rendered=render_reason(engine)
                r['why_render']=rendered
                record=call_once(ledger,key+':writer',fw.body(engine),transport)
                if record.get('status')!='completed' or 'content' not in record:
                    r.update(status='writer-call-failed');raise ValueError('writer-call-failed')
                draft=record['content'];r['draft']=draft
                r['auto']=automatic(draft,engine)
                r['output']={'why':rendered['text'],'future':draft.get('future'),'capture':draft.get('capture')}
                r['sources']={'why':'LOCAL_GROUNDED','future':'AI_WRITER_FIRST','capture':'AI_WRITER_FIRST'}
                r['status']='generated'
        except BudgetStop as e:
            r['status']='budget-stop';r['pending_request']=str(e)
            ledger['rows'][key]=r;ledger['status']='budget-stop';save(path,ledger)
            print(key,'BUDGET STOP',sum(v['charged_or_reserved'] for v in ledger['requests'].values()),flush=True)
            break
        except Exception as e:
            r['status']=r['status'] if r['status']!='started' else 'pipeline-failed'
            r['error_type']=type(e).__name__
        ledger['rows'][key]=r;save(path,ledger)
        print(key,r['status'],len(ledger['requests']),round(sum(v['charged_or_reserved'] for v in ledger['requests'].values()),6),flush=True)
    else:ledger['status']='finished';save(path,ledger)
    verify()

if __name__=='__main__':main()
