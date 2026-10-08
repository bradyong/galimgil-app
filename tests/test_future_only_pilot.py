import copy
import unittest
from future_only_pilot import plan, future_request, read, OUT, check_future, costs


class FutureOnlyTests(unittest.TestCase):
    def test_same_ten_and_exact_inputs(self):
        p=plan();old=read(OUT/'writer-model-comparison-ledger.json')['requests']
        self.assertEqual([e['id'] for e in p['entries']],['B10','B11','B15','B16','B17','B19','B22','B24','B27','B29'])
        for e in p['entries']:
            original=old[e['id']]['request'];new=e['request']
            self.assertEqual({k:v for k,v in original.items() if k not in ('instructions','text')},
                             {k:v for k,v in new.items() if k not in ('instructions','text')})
            self.assertNotIn('capture',new['instructions'].lower())
            self.assertEqual(new['text']['format']['schema']['properties'],{'future':{'type':'string'}})
            self.assertEqual(new['text']['format']['schema']['required'],['future'])

    def test_no_baseline_mutation(self):
        original=read(OUT/'writer-model-comparison-ledger.json')['requests']['B10']['request']
        saved=copy.deepcopy(original);future_request(original);self.assertEqual(original,saved)

    def test_capture_not_required_or_accepted(self):
        row={'a':'A','b':'B'};sentence='가방 속 수첩에 오늘의 작은 장면을 적어 둔 나.'
        self.assertEqual(check_future({'future':sentence},row),[])
        self.assertIn('unexpected-fields',check_future({'future':sentence,'capture':'extra'},row))
        self.assertIn('length-or-type',check_future({},row))

    def test_existing_future_guards_preserved(self):
        row={'a':'A','b':'B'}
        self.assertIn('prediction-style',check_future({'future':'이 선택을 한 뒤 나는 만족하게 된다.'},row))
        self.assertIn('internal-code',check_future({'future':'오늘의 canonical axis를 사용한 문장입니다.'},row))

    def test_cache_write_accounting_and_forecast(self):
        c=costs({'input_tokens':1000,'output_tokens':100,
            'input_tokens_details':{'cached_tokens':100,'cache_write_tokens':200}})
        self.assertAlmostEqual(c['calculated_usd'],.00584)
        self.assertGreaterEqual(c['budget_usd'],c['calculated_usd'])
        self.assertLess(plan()['initial_forecast_usd'],.05)


if __name__=='__main__':unittest.main()
