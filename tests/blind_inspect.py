"""Read-only compact inspection of saved responses and frozen validation failures."""
import json
import sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
import choice_meaning as cm
OUT=ROOT.parent/'low-confidence-safety-20261006'
ledger=json.loads((OUT/'blind-40-ledger.json').read_text(encoding='utf-8'))
for key,r in ledger['rows'].items():
    if len(sys.argv)>1 and int(key[1:])<int(sys.argv[1]):continue
    raw=ledger['requests'].get(key+':semantic',{}).get('content',{})
    if not raw:continue
    m=raw.get('meaning',{})
    print(key,r['status'],r['q'])
    print('A:',m.get('optionA_meaning',{}).get('summary'))
    print('B:',m.get('optionB_meaning',{}).get('summary'))
    print('DIFF:',m.get('meaningful_difference'))
    print('CANON:',json.dumps(raw.get('canonical_axes'),ensure_ascii=False))
    last=[]
    def trace(frame,event,arg):
        if frame.f_code.co_name=='validate' and frame.f_code.co_filename==cm.__file__ and event=='return' and arg is False:
            last.append(frame.f_lineno)
        return trace
    try:
        data={'question':r['q'],'a':r['a'],'b':r['b']}
        normalized,_=cm.normalize(m,data)
        sys.settrace(trace)
        ok=cm.validate(normalized,data)
        sys.settrace(None)
        print('VALIDATE:',ok,last)
    except Exception as e:
        sys.settrace(None);print('VALIDATE:',type(e).__name__,str(e))
    print('FINAL:',json.dumps(r.get('output'),ensure_ascii=False))
    if r.get('auto'):print('AUTO:',r['auto'])
    print()
