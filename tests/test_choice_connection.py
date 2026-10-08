import ast
import copy
import json
import os
import sys
import threading
import unittest
from pathlib import Path
from unittest.mock import patch
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT))
OUT=ROOT.parent/'low-confidence-safety-20261006'
from choice_runtime import ChoiceRuntime,future_request,meaning_request,valid_future
from choice_contracts import meaning as contract
from choice_connection_preview import FixtureRuntime

def read(name):return json.loads((OUT/name).read_text(encoding='utf-8'))

class Store:
    def __init__(self):self.rows={};self.lock=threading.Lock();self.limit=False
    def get(self,k):
        with self.lock:return self.rows.get(k)
    def claim(self,k):
        with self.lock:
            if k in self.rows:return False
            self.rows[k]={'status':'attempted'};return True
    def save(self,k,v):
        with self.lock:self.rows[k]=v
    def reserve(self,ip):return 'global' if self.limit else None

class ConnectionTests(unittest.TestCase):
    def test_unavailable_is_not_unknown(self):
        payload={'question':'주말에 아이랑','a':'키즈카페','b':'놀이공원','reasons':['insufficient-grounded-contrast']}
        runtime=ChoiceRuntime()
        with patch.object(runtime,'one_shot',return_value=None):
            self.assertEqual(runtime.prepare(payload,'local')['status'],'unavailable')
        unknown=next(r['meaning_proposal'] for r in read('meaning-only-replay.json')['rows'] if r['expected_unknown'])
        with patch.object(runtime,'one_shot',return_value=unknown):
            self.assertEqual(runtime.prepare(payload,'local')['status'],'confirmation')
        ready={'situation':payload['question'],'optionA_meaning':'아이들이 놀이 시설을 이용하는 공간',
               'optionB_meaning':'놀이기구 등을 이용하는 장소','meaningful_difference':'놀이 공간과 놀이기구 체험',
               'explicit_facts':[],'uncertainty':{'level':'low'}}
        with patch.object(runtime,'one_shot',return_value=ready):
            self.assertEqual(runtime.prepare(payload,'local')['status'],'ready')

    def payload(self):
        e=read('future-only-pilot-plan.json')['entries'][0]
        p=json.loads(e['request']['input']);p['verified_meaning']=p.pop('understood_meaning')
        return p

    def test_promoted_contracts_identical(self):
        for src,dst in [('tests/meaning_only_candidate.py','choice_contracts/meaning.py'),('tests/pure_play_candidate.py','choice_contracts/play.py')]:
            self.assertEqual((ROOT/src).read_bytes(),(ROOT/dst).read_bytes())
        def nodes(path):
            return {getattr(n,'name',None) or 'WHY_PATTERNS':ast.dump(n) for n in ast.parse(path.read_text(encoding='utf-8')).body
                    if isinstance(n,ast.FunctionDef) and n.name=='why' or isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='WHY_PATTERNS' for t in n.targets)}
        self.assertEqual(nodes(ROOT/'tests/play_writer_validation.py'),nodes(ROOT/'choice_contracts/why.py'))

    def test_future_contract_exactly_matches_ten_saved_requests(self):
        for e in read('future-only-pilot-plan.json')['entries']:
            p=json.loads(e['request']['input']);p['verified_meaning']=p.pop('understood_meaning')
            self.assertEqual(future_request(p),e['request'])
        with self.assertRaises(ValueError):future_request(self.payload()|{'winner':'not-an-option'})

    def test_meaning_has_no_scene_writer_or_canonical_fields(self):
        b=meaning_request({'question':'q','a':'a','b':'b'})
        self.assertEqual(b['instructions'],contract.SEMANTIC_PROMPT)
        self.assertEqual(set(b['text']['format']['schema']['required']),set(contract.SEMANTIC_FIELDS))

    def test_saved_31_scores_why_confirmation_and_swap(self):
        runtime=FixtureRuntime();baseline={r['id']:r for r in read('play-writer-output.json')['rows']}
        count={'PURE_PLAY':0,'VERIFIED_SEMANTIC':0,'confirmation':0}
        for row in read('meaning-only-replay.json')['rows']:
            p={'question':row['question'],'a':row['a'],'b':row['b'],'reasons':['insufficient-grounded-contrast']}
            prepared=runtime.prepare(p,'local')
            if prepared['status']=='confirmation':count['confirmation']+=1;continue
            result=runtime.finalize(p|{'meaning':prepared['meaning'],'engine':row['new_result']})
            count[result['score_source']]+=1
            b=baseline[row['id']]
            self.assertEqual((result['winner'],result['score'],result['why']),(b['winner'],b['score'],b['why']))
            self.assertEqual(result,runtime.finalize(p|{'meaning':prepared['meaning'],'engine':row['new_result']}))
            if result['score_source']=='PURE_PLAY':
                swapped=p|{'a':p['b'],'b':p['a'],'meaning':prepared['meaning'],'engine':row['new_result']}
                other=runtime.finalize(swapped)
                self.assertEqual((result['winner'],result['score']),(other['winner'],other['score']))
        self.assertEqual(count,{'PURE_PLAY':25,'VERIFIED_SEMANTIC':3,'confirmation':3})

    @patch.dict(os.environ,{'CHOICE_FUTURE_ENABLED':'1','OPENAI_API_KEY':'test-only'})
    def test_success_and_no_duplicate_calls(self):
        store=Store();calls=[]
        def provider(b,t):calls.append(b);return {'future':'전송을 마친 뒤 의자에 기대 잠깐 쉬는 척한다.'}
        runtime=ChoiceRuntime(lambda k:store,provider)
        r=runtime.future(self.payload(),'local')
        self.assertEqual(r['status'],'ready');self.assertEqual(runtime.future(self.payload(),'local'),r)
        self.assertEqual(len(calls),1)

    @patch.dict(os.environ,{'CHOICE_FUTURE_ENABLED':'1','OPENAI_API_KEY':'test-only'})
    def test_failure_malformed_timeout_and_quota_fail_closed(self):
        for provider in [lambda b,t:(_ for _ in ()).throw(TimeoutError()),lambda b,t:{'future':'짧음'},lambda b,t:{'future':'valid'*10,'capture':'forbidden'}]:
            store=Store();calls=[]
            def wrapped(b,t):calls.append(1);return provider(b,t)
            runtime=ChoiceRuntime(lambda k:store,wrapped)
            for _ in range(2):self.assertEqual(runtime.future(self.payload(),'local')['future'],'')
            self.assertEqual(len(calls),1)
        store=Store();store.limit=True
        with patch('choice_runtime.call_once',side_effect=AssertionError('no paid call')):
            runtime=ChoiceRuntime(lambda k:store,lambda b,t:self.fail('quota bypass'))
            self.assertEqual(runtime.future(self.payload(),'local')['status'],'unavailable')
        runtime=ChoiceRuntime(lambda k:(_ for _ in ()).throw(ConnectionError()),lambda b,t:self.fail('storage bypass'))
        self.assertEqual(runtime.future(self.payload(),'local')['future'],'')

    @patch.dict(os.environ,{'CHOICE_FUTURE_ENABLED':'1','OPENAI_API_KEY':'test-only'})
    def test_concurrent_duplicates_call_once(self):
        store=Store();calls=[];entered=threading.Event();release=threading.Event()
        def provider(b,t):calls.append(1);entered.set();release.wait(2);return {'future':'전송을 마친 뒤 의자에 기대 잠깐 쉬는 척한다.'}
        runtime=ChoiceRuntime(lambda k:store,provider);thread=threading.Thread(target=runtime.future,args=(self.payload(),'local'))
        thread.start();self.assertTrue(entered.wait(2))
        self.assertEqual(runtime.future(self.payload(),'local')['status'],'unavailable')
        release.set();thread.join();self.assertEqual(len(calls),1)

    def test_incomplete_or_extra_future_rejected(self):
        self.assertFalse(valid_future({'future':'이 일을 한 뒤 만족하게 된다.'}))
        self.assertFalse(valid_future({'future':'<script>example</script>'}))
        self.assertFalse(valid_future({'future':'장면을 충분히 길게 만들었습니다.','winner':'A'}))

if __name__=='__main__':unittest.main()
