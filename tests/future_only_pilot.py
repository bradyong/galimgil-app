"""FUTURE-only contract ablation. Offline experiment, no application imports."""
import argparse
import copy
import json
import urllib.error
from pathlib import Path
from writer_model_compare import OUT, ROOT, read, save, sha, post, reserve
from writer_model_compare import protections as previous_protections
from blind_live import automatic

CAP = .05
PLAN = OUT/'future-only-pilot-plan.json'
COUNTS = OUT/'future-only-pilot-counts.json'
LEDGER = OUT/'future-only-pilot-ledger.json'
CAPTURE_INSTRUCTION = '''capture (8-45 chars): shareable punchline with a DIFFERENT object/joke mechanism
from future. Not its summary, option repetition, noun label, moral or reason.
'''


def future_request(original):
    request=copy.deepcopy(original)
    assert request['model']=='gpt-5.6-sol' and request['reasoning']=={'effort':'none'}
    assert request['instructions'].count(CAPTURE_INSTRUCTION)==1
    request['instructions']=request['instructions'].replace(CAPTURE_INSTRUCTION,'').replace(
        'Return ONLY future and capture.','Return ONLY future.')
    schema=request['text']['format']['schema']
    assert schema['required']==['future','capture']
    schema['required']=['future'];del schema['properties']['capture']
    assert 'capture' not in json.dumps(request['text']).lower()
    assert 'capture' not in request['instructions'].lower()
    return request


def check_future(draft,row):
    flags=automatic(draft,row)['future']
    if set(draft)!={'future'}:flags.append('unexpected-fields')
    return flags


def plan():
    baseline=read(OUT/'writer-model-comparison-report.json')
    old=read(OUT/'writer-model-comparison-ledger.json')
    assert old['status']=='finished'
    entries=[]
    for row in baseline['rows']:
        rec=old['requests'][row['id']]
        assert rec['status']=='completed'
        entries.append({'id':row['id'],'row':row,'request':future_request(rec['request']),
                        'baseline_usage':rec['usage']})
    i=sum(e['baseline_usage']['input_tokens'] for e in entries)
    o=sum(e['baseline_usage']['output_tokens'] for e in entries)
    return {'entries':entries,'cap':CAP,'baseline_input_tokens':i,'output_forecast_tokens':o,
        'initial_forecast_usd':(i*5+o*20)/1e6,
        'forecast_method':'Reuse prior combined-output token length conservatively; count new inputs before generation. Not a guaranteed output bound. Reserve full 650 output tokens per request.',
        'generation_contract_delta':['Remove CAPTURE instructions','Remove CAPTURE JSON field'],
        'evaluation_policy':{'future':'Original 12-90-character fictional aftermath policy, unchanged',
            'physical':'Metaphor/personification allowed; incoherent literal actions fail',
            'reality':'No unverified prices, benefits, performance, preferences or real-world guarantees',
            'other_people':'No asserted future actions or responses of others',
            'ratings':'Codex direct reading; naturalness/humor 1..5, subjective, not a user panel'},
        'success':{'future_pass_min':9,'unverified_reality_claims_max':0,
                   'physical_incoherence_max':0,'other_people_claims_max':0}}


def protections():
    files=[Path(__file__),ROOT/'tests/test_future_only_pilot.py',ROOT/'tests/blind_live.py',PLAN]
    files += [OUT/n for n in ('writer-model-comparison-plan.json','writer-model-comparison-counts.json',
        'writer-model-comparison-ledger.json','writer-model-comparison-report.json')]
    return previous_protections() | {str(p):sha(p) for p in files}


def verify(hashes):
    assert all(sha(Path(k))==v for k,v in hashes.items()),'Frozen files changed'


def error_record(rec,err):
    rec.update(status='failed',error=type(err).__name__)
    if isinstance(err,urllib.error.HTTPError):rec['http_status']=err.code


def count_inputs(p):
    if COUNTS.exists():raise SystemExit('Count run already recorded; no retry')
    state={'requests':{},'protected':protections(),'status':'running'};save(COUNTS,state)
    for e in p['entries']:
        rec={'status':'attempted'};state['requests'][e['id']]=rec;save(COUNTS,state)
        try:
            raw=post('responses/input_tokens',{k:e['request'][k] for k in ('model','input','instructions','text')})
            assert isinstance(raw['input_tokens'],int) and raw['input_tokens']>0
            rec.update(status='completed',raw=raw,input_tokens=raw['input_tokens'])
        except Exception as err:
            error_record(rec,err);state['status']='error-stop';save(COUNTS,state);return
        save(COUNTS,state);print(e['id'],rec['input_tokens'],flush=True)
    total=sum(r['input_tokens'] for r in state['requests'].values())
    state['expected_cost_usd']=(total*5+p['output_forecast_tokens']*20)/1e6
    state['status']='ready' if state['expected_cost_usd']<=CAP else 'budget-stop'
    verify(state['protected']);save(COUNTS,state)
    print(state['status'],'forecast',state['expected_cost_usd'],flush=True)


def costs(usage):
    details=usage.get('input_tokens_details',{})
    cached=details.get('cached_tokens',0);written=details.get('cache_write_tokens',0)
    i,o=usage['input_tokens'],usage['output_tokens']
    assert 0<=cached+written<=i
    return {'calculated_usd':((i-cached-written)*4+cached*.4+written*5+o*20)/1e6,
            'budget_usd':(i*5+o*20)/1e6}


def execute(p):
    if LEDGER.exists():raise SystemExit('Generation run recorded; no retry')
    counts=read(COUNTS);assert counts['status']=='ready' and counts['expected_cost_usd']<=CAP
    verify(counts['protected'])
    state={'requests':{},'protected':protections(),'status':'running','cap':CAP};save(LEDGER,state)
    for e in p['entries']:
        charge=reserve(counts['requests'][e['id']]['input_tokens'],e['request']['max_output_tokens'])
        if sum(r['charged_or_reserved'] for r in state['requests'].values())+charge>CAP:
            state['status']='budget-stop';break
        rec={'status':'attempted','request':e['request'],'charged_or_reserved':charge}
        state['requests'][e['id']]=rec;save(LEDGER,state)
        try:
            raw=post('responses',e['request']);rec.update(raw=raw,status=raw.get('status','unknown'))
            if raw.get('usage'):
                rec.update(usage=raw['usage'],cost=costs(raw['usage']))
                rec['charged_or_reserved']=rec['cost']['budget_usd']
            if raw.get('status')=='completed':
                rec['content']=json.loads(''.join(c.get('text','') for o in raw.get('output',[])
                    for c in o.get('content',[]) if c.get('type')=='output_text'))
                rec['automatic']=check_future(rec['content'],e['row'])
        except Exception as err:
            error_record(rec,err);state['status']='error-stop'
        save(LEDGER,state);print(e['id'],rec['status'],flush=True)
        if state['status']=='error-stop':break
    if state['status']=='running':state['status']='finished'
    verify(state['protected']);save(LEDGER,state)
    print(state['status'],'budget_used',sum(r['charged_or_reserved'] for r in state['requests'].values()),flush=True)


def main():
    parser=argparse.ArgumentParser();parser.add_argument('--count',action='store_true');parser.add_argument('--execute',action='store_true')
    args=parser.parse_args();p=plan()
    if PLAN.exists():assert read(PLAN)==p
    else:save(PLAN,p)
    print(json.dumps({k:v for k,v in p.items() if k!='entries'}),flush=True)
    if p['initial_forecast_usd']>CAP:raise SystemExit('Forecast exceeds cap')
    if args.count:count_inputs(p)
    if args.execute:execute(p)


if __name__=='__main__':main()
