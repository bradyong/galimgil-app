import hashlib
import json
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT.parent/'low-confidence-safety-20261006'
def read(path):return json.loads(path.read_text(encoding='utf-8'))

class BlindPreflightTests(unittest.TestCase):
    def test_set_is_fixed_unique_and_not_training_pairs(self):
        path=ROOT/'tests/fixtures/blind-40-20261007.json'
        cases=read(path);old=read(ROOT/'tests/semantic-cases.json')
        self.assertEqual(len(cases),40)
        self.assertEqual(len({c['id'] for c in cases}),40)
        self.assertEqual(sum(c.get('expected_unknown',False) for c in cases),3)
        oldpairs={tuple(sorted((c['a'],c['b']))) for c in old}
        for c in cases:
            self.assertNotIn(tuple(sorted((c['a'],c['b']))),oldpairs)
            self.assertNotIn(c['q'],[o['q'] for o in old])
        self.assertEqual(hashlib.sha256(path.read_bytes()).hexdigest(),read(OUT/'blind-40-lock.json')['dataset_sha256'])

    def test_labels_not_sent_to_engine(self):
        for r in read(OUT/'blind-40-preflight.json')['rows']:
            self.assertEqual(set(r['input']),{'q','a','b','mood','signIndex','tieRoll'})

    def test_budget_gate_does_not_report_success(self):
        report=read(OUT/'blind-40-budget.json')
        self.assertEqual(report['stats']['status'],'BUDGET_BLOCKED')
        self.assertGreater(report['stats']['historical_estimate_usd'],.05)
        self.assertEqual(report['stats']['new_api_calls'],0)
        self.assertTrue(all(value is None for value in report['evaluation'].values()))

    def test_frozen_sources_and_training_artifacts(self):
        lock=read(OUT/'blind-40-lock.json')
        for name,digest in lock['protected_source_hashes'].items():
            self.assertEqual(hashlib.sha256((ROOT/name).read_bytes()).hexdigest(),digest)
        for name,digest in lock['training_artifact_hashes'].items():
            self.assertEqual(hashlib.sha256((OUT/name).read_bytes()).hexdigest(),digest)
