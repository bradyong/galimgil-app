import hashlib,json,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT.parent/'low-confidence-safety-20261006'
class WriterRoleTests(unittest.TestCase):
    def setUp(self):
        self.report=json.loads((OUT/'writer-role-comparison.json').read_text(encoding='utf-8'))
    def test_exact_19_and_independent_verdicts(self):
        self.assertEqual(len(self.report['rows']),19)
        row=next(r for r in self.report['rows'] if r['index']==0)
        self.assertFalse(row['verdict']['reason'])
        self.assertTrue(row['verdict']['future']);self.assertTrue(row['verdict']['capture'])
    def test_final_requires_all_three_and_no_raw_mutation(self):
        raw=json.loads((OUT/'writer-frozen-raw.json').read_text(encoding='utf-8'))
        for row in self.report['rows']:
            self.assertEqual(row['accepted'],all(row['verdict'][k] for k in ['reason','future','capture']))
            self.assertEqual(row['draft'],raw[str(row['index'])]['draft'])
    def test_legacy_anchor_failures_do_not_reject_fiction(self):
        for i in [17,22]:
            row=next(r for r in self.report['rows'] if r['index']==i)
            self.assertIn('anchor',row['legacy_anchor_errors'])
            self.assertTrue(row['accepted'])
    def test_zero_calls_and_frozen_engine(self):
        self.assertEqual(self.report['stats']['new_api_calls'],0)
        baseline=json.loads((OUT/'writer-frozen-baseline.json').read_text(encoding='utf-8'))
        for name,digest in baseline['hashes'].items():
            self.assertEqual(hashlib.sha256((ROOT/name).read_bytes()).hexdigest(),digest)
        self.assertEqual(hashlib.sha256((OUT/'writer-frozen-raw.json').read_bytes()).hexdigest(),self.report['stats']['raw_sha256'])
