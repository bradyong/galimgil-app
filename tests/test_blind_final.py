import hashlib
import json
import unittest
from pathlib import Path
import frozen_writer as fw
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT.parent/'low-confidence-safety-20261006'
def read(name):return json.loads((OUT/name).read_text(encoding='utf-8'))
class BlindFinalTests(unittest.TestCase):
    def test_exact_cases_no_replacement(self):
        report=read('blind-40-final.json')
        cases=json.loads((ROOT/'tests/fixtures/blind-40-20261007.json').read_text(encoding='utf-8'))
        self.assertEqual([r['case'] for r in report['rows']],cases)
        self.assertEqual(len(cases),40)

    def test_single_attempt_and_original_writer_output(self):
        ledger=read('blind-40-ledger.json')
        self.assertEqual(len(ledger['requests']),57)
        self.assertEqual(len([k for k in ledger['requests'] if k.endswith(':semantic')]),40)
        for key,row in ledger['rows'].items():
            if row['status']=='generated':
                draft=ledger['requests'][key+':writer']['content']
                for field in ('future','capture'):self.assertEqual(row['output'][field],draft[field])
        self.assertFalse(any(f'B{i:02}:writer' in ledger['requests'] for i in range(38,41)))

    def test_usage_budget_and_proxy_failures_separate(self):
        ledger=read('blind-40-ledger.json');stats=read('blind-40-final.json')['stats']
        usages=[r['usage'] for r in ledger['requests'].values() if 'usage' in r]
        self.assertEqual(len(usages),48)
        self.assertAlmostEqual(stats['cost_usd'],sum(fw.cost(u) for u in usages))
        self.assertLessEqual(stats['charged_or_reserved_usd'],.1)
        self.assertEqual(stats['local_proxy_failures'],9)

    def test_preserved_frozen_sources_and_training_data(self):
        lock=read('blind-40-lock.json')
        for name,digest in lock['protected_source_hashes'].items():
            self.assertEqual(hashlib.sha256((ROOT/name).read_bytes()).hexdigest(),digest)
        for name,digest in lock['training_artifact_hashes'].items():
            self.assertEqual(hashlib.sha256((OUT/name).read_bytes()).hexdigest(),digest)
