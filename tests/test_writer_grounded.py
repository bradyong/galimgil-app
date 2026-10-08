import copy
import hashlib
import json
import sys
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
from writer_grounded_reason import render_reason
OUT=ROOT.parent/'low-confidence-safety-20261006'

class GroundedWriterTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.baseline=json.loads((OUT/'writer-frozen-baseline.json').read_text(encoding='utf-8'))
        cls.rows=[r for r in cls.baseline['rows'] if r['route']=='semantic-play']

    def test_deterministic_read_only_and_no_internal_codes(self):
        for row in self.rows:
            snapshot=copy.deepcopy(row)
            first=render_reason(row)
            self.assertEqual(first,render_reason(row))
            self.assertEqual(row,snapshot)
            self.assertNotRegex(first['text'],r'canonical|axis|algorithm|추첨 알고리즘|active|passive|indoor|outdoor')

    def test_only_positive_relative_contributors(self):
        for row in self.rows:
            rendered=render_reason(row)
            side='a' if row['winner']==row['a'] else 'b'
            other='b' if side=='a' else 'a'
            for key in rendered['evidence']['contributors']:
                self.assertGreater(row['traces'][side][key],row['traces'][other][key])
        setting=next(r for r in self.rows if r['index']==13)
        self.assertEqual(render_reason(setting)['evidence']['contributors'],['mood'])
        self.assertNotIn('별 카드',render_reason(setting)['text'])

    def test_tie_has_no_fabricated_contribution(self):
        for row in self.rows:
            if row['traces']['a']['total']==row['traces']['b']['total']:
                result=render_reason(row)
                self.assertTrue(result['evidence']['tie'])
                self.assertEqual(result['evidence']['contributors'],[])
                self.assertIn('팽팽',result['text'])

    def test_invalid_winner_or_trace_rejected(self):
        row=copy.deepcopy(self.rows[0]);row['winner']='unknown'
        with self.assertRaises(ValueError):render_reason(row)
        row=copy.deepcopy(self.rows[0]);row['winner']=row['a']
        with self.assertRaises(ValueError):render_reason(row)
        row=copy.deepcopy(self.rows[0]);row['traces']['a']['total']=float('nan')
        with self.assertRaises(ValueError):render_reason(row)

    def test_final_preserves_all_future_and_thirteen_capture(self):
        report=json.loads((OUT/'writer-grounded-comparison.json').read_text(encoding='utf-8'))
        raw=json.loads((OUT/'writer-frozen-raw.json').read_text(encoding='utf-8'))
        repaired=[]
        for r in report['rows']:
            self.assertEqual(r['output']['future'],raw[str(r['index'])]['draft']['future'])
            if r['repair']:repaired.append(r['index'])
            else:self.assertEqual(r['output']['capture'],raw[str(r['index'])]['draft']['capture'])
            old=next(x for x in self.rows if x['index']==r['index'])
            self.assertEqual((r['winner'],r['score']),(old['winner'],old['score']))
        self.assertEqual(repaired,[7,14,15,18,23,26])

    def test_protected_source_and_original_responses_unchanged(self):
        for file,digest in self.baseline['hashes'].items():
            self.assertEqual(hashlib.sha256((ROOT/file).read_bytes()).hexdigest(),digest)
        self.assertEqual(hashlib.sha256((OUT/'writer-frozen-raw.json').read_bytes()).hexdigest(),
                         '8b8e31b1057bc89ea8cb86870f3ad0b4c31adcdc5352f1e33e6b14e7fbbe1abd')
