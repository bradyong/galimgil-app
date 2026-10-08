"""Offline model-only experiment; saved single-call contract, one attempt per case."""
import argparse
import copy
import json
import os
import urllib.error
import urllib.request
from pathlib import Path
from play_writer_validation import OUT, ROOT, read, save, sha, frozen, NoRedirect

MODEL = 'gpt-5.6-sol'
CAP = .05
PLAN = OUT / 'writer-model-comparison-plan.json'
COUNTS = OUT / 'writer-model-comparison-counts.json'
LEDGER = OUT / 'writer-model-comparison-ledger.json'


def sol_request(original):
    request = copy.deepcopy(original)
    request['model'] = MODEL
    request['reasoning'] = {'effort': 'none'}
    assert {k:v for k,v in request.items() if k not in ('model','reasoning')} == {
        k:v for k,v in original.items() if k not in ('model','reasoning')}
    return request


def plan():
    pilot = read(OUT / 'split-writer-pilot-plan.json')
    original = {e['id']:e for e in read(OUT / 'play-writer-plan.json')['entries']}
    previous = read(OUT / 'play-writer-host-recovery-ledger.json')['requests']
    entries = []
    for row in pilot['rows']:
        case = row['id']
        assert not original[case]['reuse']
        assert previous[case]['status'] == 'completed'
        entries.append({'id':case, 'row':row, 'request':sol_request(original[case]['request']),
                        'old_usage':previous[case]['usage']})
    i = sum(e['old_usage']['input_tokens'] for e in entries)
    o = sum(e['old_usage']['output_tokens'] for e in entries)
    return {'entries':entries, 'model':MODEL, 'cap':CAP,
            'historical_same_inputs_tokens':i, 'historical_output_tokens':o,
            'expected_cost_historical_lengths':(i*4+o*20)/1e6,
            'pricing_url':'https://developers.openai.com/api/docs/models/gpt-5.6-sol',
            'pricing_per_million':{'input':4,'cache_write':5,'cached':.4,'output':20},
            'estimate_note':'Historical output length estimate, not a maximum. Count target-model inputs before generation; reserve full 650 output tokens before each call.'}


def protections():
    paths = [Path(__file__), ROOT/'tests/play_writer_validation.py',
             ROOT/'tests/split_writer_pilot.py', ROOT/'tests/split_writer_pilot_report.py']
    paths += [OUT/n for n in ('play-writer-plan.json','play-writer-output.json',
        'play-writer-host-recovery-report.json','play-writer-host-recovery-ledger.json',
        'split-writer-pilot-plan.json','split-writer-pilot-ledger.json','split-writer-pilot-report.json')]
    return frozen() | {str(p):sha(p) for p in paths}


def post(endpoint, body):
    request = urllib.request.Request('https://api.openai.com/v1/'+endpoint,
        data=json.dumps(body,ensure_ascii=False).encode(), method='POST',
        headers={'Authorization':'Bearer '+os.environ['OPENAI_API_KEY'], 'Content-Type':'application/json'})
    with urllib.request.build_opener(NoRedirect()).open(request,timeout=90) as response:
        return json.loads(response.read())


def count_inputs(p):
    if COUNTS.exists():
        raise SystemExit('Count run exists; no automatic retry')
    state={'requests':{}, 'protected':protections(), 'status':'running'}
    save(COUNTS,state)
    for e in p['entries']:
        # Counting endpoint accepts input, instructions and structured output format.
        request={k:e['request'][k] for k in ('model','input','instructions','text')}
        rec={'status':'attempted'};state['requests'][e['id']]=rec;save(COUNTS,state)
        try:
            raw=post('responses/input_tokens',request)
            assert isinstance(raw['input_tokens'],int) and raw['input_tokens']>0
            rec.update(status='completed',raw=raw,input_tokens=raw['input_tokens'])
        except Exception as err:
            rec.update(status='failed',error=type(err).__name__)
            if isinstance(err,urllib.error.HTTPError):rec['http_status']=err.code
            state['status']='count-failure-stop';save(COUNTS,state);return
        save(COUNTS,state);print(e['id'],'input_tokens',rec['input_tokens'],flush=True)
    tokens=sum(v['input_tokens'] for v in state['requests'].values())
    # Cache-write rate on ALL input is conservative even if no cache is used.
    state['expected_cost']=(tokens*5+p['historical_output_tokens']*20)/1e6
    state['status']='ready' if state['expected_cost']<=CAP else 'budget-stop'
    assert all(sha(Path(k))==v for k,v in state['protected'].items())
    save(COUNTS,state);print('expected_cost',state['expected_cost'],state['status'],flush=True)


def reserve(tokens, output):
    return ((tokens+128)*5+output*20)/1e6


def costs(usage):
    i,o=usage['input_tokens'],usage['output_tokens']
    cached=usage.get('input_tokens_details',{}).get('cached_tokens',0)
    return {'standard_usd':((i-cached)*4+cached*.4+o*20)/1e6,
            'conservative_usd':(i*5+o*20)/1e6}


def execute(p):
    if LEDGER.exists():raise SystemExit('Generation run exists; no retries')
    counts=read(COUNTS)
    assert counts['status']=='ready' and counts['expected_cost']<=CAP
    assert all(sha(Path(k))==v for k,v in counts['protected'].items())
    state={'requests':{},'protected':protections(),'status':'running','cap':CAP}
    save(LEDGER,state)
    for e in p['entries']:
        charge=reserve(counts['requests'][e['id']]['input_tokens'],e['request']['max_output_tokens'])
        if sum(v['charged_or_reserved'] for v in state['requests'].values())+charge>CAP:
            state['status']='budget-stop';break
        rec={'status':'attempted','request':e['request'],'charged_or_reserved':charge}
        state['requests'][e['id']]=rec;save(LEDGER,state)
        try:
            raw=post('responses',e['request']);rec.update(raw=raw,status=raw.get('status','unknown'))
            if raw.get('usage'):
                rec.update(usage=raw['usage'],cost=costs(raw['usage']))
                rec['charged_or_reserved']=rec['cost']['conservative_usd']
            if raw.get('status')=='completed':
                rec['content']=json.loads(''.join(c.get('text','') for o in raw.get('output',[])
                    for c in o.get('content',[]) if c.get('type')=='output_text'))
        except Exception as err:
            rec.update(status='failed',error=type(err).__name__)
            if isinstance(err,urllib.error.HTTPError):rec['http_status']=err.code
            state['status']='error-stop'
        save(LEDGER,state);print(e['id'],rec['status'],flush=True)
        if state['status']=='error-stop':break
    if state['status']=='running':state['status']='finished'
    assert all(sha(Path(k))==v for k,v in state['protected'].items())
    save(LEDGER,state)
    print(state['status'],sum(v['charged_or_reserved'] for v in state['requests'].values()),flush=True)


def main():
    parser=argparse.ArgumentParser();parser.add_argument('--count',action='store_true');parser.add_argument('--execute',action='store_true')
    args=parser.parse_args();p=plan()
    if PLAN.exists():assert read(PLAN)==p
    else:save(PLAN,p)
    print(json.dumps({k:v for k,v in p.items() if k!='entries'}),flush=True)
    if p['expected_cost_historical_lengths']>CAP:raise SystemExit('Forecast over cap')
    if args.count:count_inputs(p)
    if args.execute:execute(p)


if __name__=='__main__':main()
