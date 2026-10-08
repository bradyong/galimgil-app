"""Bounded localhost live API verification; never an operational storage fallback."""
import hashlib,json,os,sys,threading,time,urllib.request
from pathlib import Path
from unittest.mock import patch
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT))
import server
from choice_runtime import ChoiceRuntime,call_once,meaning_request,future_request
OUT=ROOT.parent/'low-confidence-safety-20261006'/'live-path-20261008'
CASES=[
 {'id':'L1','question':'주말에 아이랑','a':'키즈카페','b':'놀이공원'},
 {'id':'L2','question':'오늘 퇴근길에 뭘 탈까?','a':'버스','b':'지하철'},
 {'id':'L3','question':'오후에 마실 차를 골라줘','a':'녹차','b':'홍차'},
 {'id':'L4','question':'일요일 오후를 어떻게 보낼까?','a':'집에서 쉬기','b':'산책하기'},
 {'id':'L5','question':'이번 달 읽은 책을 어떻게 기록할까?','a':'수첩에 감상 적기','b':'음성 메모 남기기'},
 {'id':'L6','question':'오늘 어떤 체험을 할까?','a':'눌비락','b':'쨈누소'}]
CAP=.15
LOCK=threading.RLock()
def save(p,v):p.write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
def digest(b):return hashlib.sha256(json.dumps(b,ensure_ascii=False,sort_keys=True).encode()).hexdigest()
def bound(b):
    rate=5 if b['model']=='gpt-5.6-sol' else .3125
    output=20 if b['model']=='gpt-5.6-sol' else 2
    return ((len(json.dumps(b,ensure_ascii=False).encode())+1000)*rate+b['max_output_tokens']*output)/1e6
def cost(raw,model):
    u=raw.get('usage',{});i=u.get('input_tokens',0);o=u.get('output_tokens',0);d=u.get('input_tokens_details',{})
    c=d.get('cached_tokens',0);w=d.get('cache_write_tokens',0)
    ir,cr,wr,orr=(4,.4,5,20) if model=='gpt-5.6-sol' else (.25,.025,.3125,2)
    return ((i-c-w)*ir+c*cr+w*wr+o*orr)/1e6

class Store:
    def __init__(self):
        self.file=OUT/'test-store.json';self.rows=json.loads(self.file.read_text(encoding='utf-8')) if self.file.exists() else {}
    def get(self,k):
        with LOCK:return self.rows.get(k)
    def claim(self,k):
        with LOCK:
            if k in self.rows:return False
            self.rows[k]={'status':'attempted'};save(self.file,self.rows);return True
    def save(self,k,v):
        with LOCK:self.rows[k]=v;save(self.file,self.rows)
    def reserve(self,ip):return None

def provider(body,timeout):
    data=json.loads(body['input']);a=data.get('a',data.get('A'));b=data.get('b',data.get('B'))
    match=next((c for c in CASES if (c['question'],c['a'],c['b'])==(data['question'],a,b)),None)
    if not match or (match['id']=='L6' and body['model']=='gpt-5.6-sol'):raise ValueError('Not authorized case')
    key=digest(body)
    with LOCK:
        if state.get('stopped') or key in state['calls'] or len(state['calls'])>=11:raise ValueError('No retry')
        reserved=bound(body)
        if sum(c.get('cost',c['reserved']) for c in state['calls'].values())+reserved>CAP:raise ValueError('Budget')
        rec={'case':match['id'],'request':body,'status':'attempted','reserved':reserved};state['calls'][key]=rec;save(OUT/'ledger.json',state)
        opener=urllib.request.build_opener;start=time.monotonic()
        class Response:
            def __init__(self,r):self.r=r
            def __enter__(self):return self
            def __exit__(self,*args):self.r.close()
            def read(self):
                content=self.r.read();rec['raw']=json.loads(content);return content
        class Opener:
            def __init__(self,*args):self.inner=opener(*args)
            def open(self,*args,**kwargs):return Response(self.inner.open(*args,**kwargs))
        try:
            with patch('choice_runtime.urllib.request.build_opener',Opener):value=call_once(body,timeout)
            rec['status']='completed';rec['value']=value
            return value
        except Exception as e:
            rec.update(status='failed',error=type(e).__name__,http_status=getattr(e,'code',None));state['stopped']=True
            raise
        finally:
            rec['seconds']=round(time.monotonic()-start,3)
            if 'raw' in rec:rec['cost']=cost(rec['raw'],body['model'])
            save(OUT/'ledger.json',state);print(match['id'],body['model'],rec['status'],rec['seconds'],flush=True)

if __name__=='__main__':
    OUT.mkdir(exist_ok=True);save(OUT/'cases.json',CASES)
    files=['app.js','choice-runtime.js','choice_runtime.py','server.py','writer_grounded_reason.py']
    files += ['choice_contracts/'+n for n in ['meaning.py','play.py','why.py']]
    hashes={n:hashlib.sha256((ROOT/n).read_bytes()).hexdigest() for n in files}
    path=OUT/'ledger.json'
    state=json.loads(path.read_text(encoding='utf-8')) if path.exists() else {'calls':{},'hashes':hashes,'cap':CAP}
    assert state['hashes']==hashes,'App changed since probe start'
    store=Store();reused=0
    for path in OUT.parent.glob('*ledger.json'):
        old=json.loads(path.read_text(encoding='utf-8'))
        for r in old.get('requests',{}).values():
            body=r.get('request');raw=r.get('raw',{})
            if not body or raw.get('status')!='completed':continue
            for c in CASES:
                if body==meaning_request(c):
                    value=json.loads(''.join(x.get('text','') for o in raw.get('output',[]) for x in o.get('content',[]) if x.get('type')=='output_text'))
                    store.save('galimgil:meaning:runtime-v1:'+digest(body),{'status':'ready','value':value});reused+=1
    estimate=sum(bound(meaning_request(c)) for c in CASES)
    for c in CASES[:5]:
        estimate+=max(bound(future_request({'question':c['question'],'A':c['a'],'B':c['b'],'winner':winner,
             'verified_meaning':{'A':c['a'],'B':c['b']}})) for winner in (c['a'],c['b']))
    state.update(preflight_bound=estimate,reused_semantic=reused);save(OUT/'ledger.json',state)
    print('BOUND',estimate,'CAP',CAP,'REUSED',reused,flush=True)
    assert estimate<=CAP and os.getenv('OPENAI_API_KEY')
    os.environ['CHOICE_AI_ENABLED']='1';os.environ['CHOICE_FUTURE_ENABLED']='1'
    server.CHOICE_RUNTIME=ChoiceRuntime(lambda kind:store,provider)
    print('Loopback live API probe 8794; 6 allowlisted pairs only',flush=True)
    server.ThreadingHTTPServer(('127.0.0.1',8794),server.AppHandler).serve_forever()
