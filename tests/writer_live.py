"""Approved, bounded Writer evaluation using frozen semantic-v2 evidence."""
import argparse
import json
import os
import pathlib
import sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
import choice_meaning as cm


def cost(usage):
    cached = usage.get('input_tokens_details', {}).get('cached_tokens', 0)
    return ((usage.get('input_tokens', 0)-cached)*.25+cached*.025+usage.get('output_tokens', 0)*2)/1e6


if __name__ == '__main__':
    p=argparse.ArgumentParser()
    p.add_argument('output')
    p.add_argument('--max-calls',type=int,default=1)
    p.add_argument('--budget',type=float,default=.05)
    args=p.parse_args()
    root=pathlib.Path(__file__).resolve().parents[1]
    target=pathlib.Path(args.output).resolve()
    if root==target or root in target.parents:
        raise SystemExit('Raw evaluation must be outside public root')
    cases=json.loads((root/'tests/semantic-cases.json').read_text(encoding='utf-8'))
    responses=json.loads((root/'tests/fixtures/semantic-v2-responses.json').read_text(encoding='utf-8'))
    saved=json.loads(target.read_text(encoding='utf-8')) if target.exists() else {}
    spent=sum(r.get('charged_bound',0) for r in saved.values())
    count=0
    for key,previous in responses.items():
        if key in saved or count>=min(args.max_calls,20):
            continue
        case=cases[int(key)]
        data={'question':case['q'],'a':case['a'],'b':case['b']}
        body,encoded=cm.request_body(data,previous['meaning'])
        # UTF-8 byte count plus message overhead bounds uncached input tokens.
        upper=((len(encoded)+1024)*.25+body['max_output_tokens']*2)/1e6
        if spent+upper>min(args.budget,.05):
            print('STOP: next worst-case call exceeds approved budget',flush=True)
            break
        saved[key]={'status':'confirmation','code':'attempt-started','charged_bound':upper}
        target.write_text(json.dumps(saved,ensure_ascii=False,indent=2),encoding='utf-8')
        count+=1
        try:
            result=cm.interpret(data,os.environ['OPENAI_API_KEY'],previous['meaning'])
            result['charged_bound']=cost(result['usage']) if result.get('usage') else upper
            result['budget_upper']=upper
            saved[key]=result
        except Exception as error:
            saved[key]['code']=type(error).__name__
        spent+=saved[key]['charged_bound']
        target.write_text(json.dumps(saved,ensure_ascii=False,indent=2),encoding='utf-8')
        print(json.dumps({'index':int(key),'status':saved[key]['status'],'writer':bool(saved[key].get('writer')),
                          'usage':saved[key].get('usage'),'spent_bound':spent}),flush=True)
    print('New calls:',count,'Charged/unknown bound:',spent,flush=True)
