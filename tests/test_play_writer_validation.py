import copy
import json
import unittest
from play_writer_validation import prepare, why, body, frozen, OUT

class OutputTests(unittest.TestCase):
    def test_budget_and_cache(self):
        rows,plan=prepare()
        self.assertEqual(len(rows),28)
        self.assertEqual((plan['reused'],plan['new_calls']),(9,19))
        self.assertLess(plan['conservative_cost_bound'],.05)

    def test_writer_contract(self):
        for r in prepare()[0]:
            p=json.loads(body(r)['input'])
            self.assertFalse(set(p)&{'score','axes','canonical_axes','why','traces','seed'})
            self.assertEqual(p['winner'],r['winner'])
            self.assertEqual(set(body(r)['text']['format']['schema']['properties']),{'future','capture'})

    def test_why_cannot_modify_engine(self):
        for r in prepare()[0]:
            before=copy.deepcopy(r);text,p=why(r)
            self.assertEqual(r,before)
            self.assertEqual(why(r),why(copy.deepcopy(r)))
            if r['score_source']=='VERIFIED_SEMANTIC':self.assertEqual(text,r['why'])
            else:
                self.assertIsInstance(p,int)
                other=copy.deepcopy(r);other['a'],other['b']=r['b'],r['a']
                self.assertEqual(why(r),why(other))

    def test_protected_hashes(self):
        self.assertTrue(frozen())

if __name__=='__main__':unittest.main()
