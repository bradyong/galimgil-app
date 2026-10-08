import copy
import unittest
from writer_model_compare import plan, sol_request, reserve, costs, protections


class ModelComparisonTests(unittest.TestCase):
    def test_exact_pilot_and_contract(self):
        p=plan()
        self.assertEqual([e['id'] for e in p['entries']],['B10','B11','B15','B16','B17','B19','B22','B24','B27','B29'])
        for e in p['entries']:
            r=e['request'];self.assertEqual(r['max_output_tokens'],650)
            self.assertEqual(r['reasoning'],{'effort':'none'})
            self.assertEqual(r['text']['format']['schema']['required'],['future','capture'])
        self.assertLess(p['expected_cost_historical_lengths'],.05)

    def test_only_allowed_changes(self):
        original={'model':'old','reasoning':{'effort':'minimal'},'input':'unchanged','nested':{'a':[1]}}
        saved=copy.deepcopy(original);new=sol_request(original)
        self.assertEqual(original,saved)
        self.assertEqual(new['input'],original['input'])
        self.assertEqual(new['nested'],original['nested'])

    def test_budget_includes_full_output_and_cache_write(self):
        self.assertAlmostEqual(reserve(1000,650),.01864)
        c=costs({'input_tokens':1000,'output_tokens':100,'input_tokens_details':{'cached_tokens':100}})
        self.assertAlmostEqual(c['standard_usd'],.00564)
        self.assertAlmostEqual(c['conservative_usd'],.007)

    def test_frozen_files(self):
        self.assertGreater(len(protections()),10)


if __name__=='__main__':unittest.main()
