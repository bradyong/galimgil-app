import concurrent.futures
import copy
import json
import threading
import unittest
from unittest.mock import patch
import choice_meaning as cm

DATA = {'question': '어디 갈까?', 'a': '동물원', 'b': '놀이동산', 'reasons': ['insufficient-grounded-contrast']}


def meaning():
    return {'situation': '외출 장소 선택',
            'optionA_meaning': {'summary': '동물 관람', 'activity': '동물 보기', 'basis': 'general-meaning', 'quote': '동물원'},
            'optionB_meaning': {'summary': '놀이기구 체험', 'activity': '놀이기구 타기', 'basis': 'general-meaning', 'quote': '놀이동산'},
            'meaningful_difference': '관람과 놀이기구 체험', 'useful_comparison_axes': ['체험 종류'],
            'evidence': [{'input': 'a', 'quote': '동물원'}, {'input': 'b', 'quote': '놀이동산'}],
            'uncertainty': {'level': 'low', 'reasons': []}}


class Store:
    def __init__(self):
        self.items = {}
        self.lock = threading.Lock()
        self.count = 0
        self.cap = 30

    def get(self, key):
        with self.lock:
            return self.items.get(key)

    def claim(self, key):
        with self.lock:
            if key in self.items:
                return False
            self.items[key] = {'status': 'confirmation'}
            return True

    def save(self, key, value):
        with self.lock:
            self.items[key] = value

    def reserve(self, ip):
        with self.lock:
            if self.count >= self.cap:
                return 'global'
            self.count += 1


class SemanticTests(unittest.TestCase):
    def test_schema_and_evidence(self):
        self.assertTrue(cm.validate(meaning(), cm.clean_input(DATA)))

    def test_winner_prohibited(self):
        value = meaning(); value['winner'] = 'A'
        with self.assertRaises(ValueError): cm.validate(value, DATA)

    def test_fabricated_quote(self):
        value = meaning(); value['optionA_meaning']['quote'] = '저렴하다'
        with self.assertRaises(ValueError): cm.validate(value, DATA)

    def test_unstated_observable_fact(self):
        value = meaning(); value['optionA_meaning']['summary'] = '대기 10분'
        with self.assertRaises(ValueError): cm.validate(value, DATA)

    def test_unknown_and_high_uncertainty(self):
        value = meaning(); value['uncertainty']['level'] = 'high'
        self.assertFalse(cm.validate(value, DATA))
        value = meaning(); value['optionA_meaning']['basis'] = 'unknown'
        self.assertFalse(cm.validate(value, DATA))

    def test_generic_contrast_not_confidence(self):
        value = meaning(); value['meaningful_difference'] = '구체적 내용은 제시되지 않음'
        self.assertFalse(cm.validate(value, DATA))

    def test_input_cap_and_gate(self):
        for payload in [{**DATA, 'question':'x'*401}, {**DATA, 'a':DATA['b']}, {**DATA, 'reasons':[]}]:
            with self.assertRaises(ValueError): cm.clean_input(payload)

    def test_singleflight_and_cache(self):
        store = Store(); calls = []
        def call(*args):
            calls.append(1)
            return {'status':'ready', 'meaning':meaning()}
        with concurrent.futures.ThreadPoolExecutor(max_workers=16) as pool:
            list(pool.map(lambda _:cm.resolve(DATA, 'ip', store, call), range(40)))
        self.assertEqual(len(calls), 1)
        self.assertTrue(cm.resolve(DATA, 'ip', store, call)['cached'])

    def test_failure_not_retried(self):
        store = Store(); calls=[]
        def fail(*args): calls.append(1); raise TimeoutError()
        for _ in range(3): cm.resolve(DATA, 'ip', store, fail)
        self.assertEqual(len(calls),1)

    def test_budget_fail_closed(self):
        store = Store(); store.cap=0
        def forbidden(*args): self.fail('paid call')
        self.assertEqual(cm.resolve(DATA, 'ip', store, forbidden)['code'], 'budget')

    def test_store_outage_does_not_call(self):
        store = Store()
        with patch.object(store, 'get', side_effect=RuntimeError()), self.assertRaises(RuntimeError):
            cm.resolve(DATA, 'ip', store, lambda *a:self.fail('paid call'))

    def test_redis_namespace_and_durable_attempt(self):
        store=cm.RedisMeaningStore(); commands=[]
        with patch.object(store.redis, 'command', side_effect=lambda c: commands.append(c) or 'OK'):
            self.assertTrue(store.claim('test'))
            store.save('test',{'status':'ready'})
        self.assertEqual(commands[0][-3:],['NX','EX',86400])
        self.assertNotIn('palm', store.redis.key)

    def test_provider_request_is_bounded_and_once(self):
        raw={'status':'completed','usage':{'input_tokens':42,'output_tokens':50},
             'output':[{'content':[{'type':'output_text','text':json.dumps(meaning())}]}]}
        class Response:
            def __enter__(self): return self
            def __exit__(self,*args): pass
            def read(self): return json.dumps(raw).encode()
        with patch.object(cm.urllib.request, 'build_opener') as opener:
            opener.return_value.open.return_value=Response()
            result=cm.interpret(cm.clean_input(DATA),'not-a-real-key')
            request=opener.return_value.open.call_args.args[0]
            body=json.loads(request.data)
            self.assertLessEqual(len(request.data),cm.INPUT_TOKEN_CEILING)
            self.assertEqual(body['max_output_tokens'],cm.OUTPUT_LIMIT)
            self.assertTrue(body['text']['format']['strict'])
            self.assertFalse(body['store'])
            self.assertEqual(opener.return_value.open.call_count,1)
            self.assertEqual(result['status'],'ready')

if __name__=='__main__': unittest.main()
