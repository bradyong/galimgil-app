import copy
import json
import sys
import unittest
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
from writer_selection import select_fields

class IndependentWriterTests(unittest.TestCase):
    def test_all_eight_verdict_combinations(self):
        import itertools
        existing = {'why':'old why','future':'old future','capture':'old capture'}
        draft = {'reason':'new why','future':'new future','capture':'new capture'}
        for values in itertools.product((False,True),repeat=3):
            verdict=dict(zip(draft,values))
            before=copy.deepcopy((existing,draft,verdict))
            selected=select_fields(existing,draft,verdict)
            for field,key in [('reason','why'),('future','future'),('capture','capture')]:
                self.assertEqual(selected['output'][key],draft[field] if verdict[field] else existing[key])
            self.assertEqual((existing,draft,verdict),before)

    def test_missing_or_empty_is_local_failure(self):
        result=select_fields({'why':'safe','future':'old','capture':'old'},
                             {'reason':'','future':'scene','capture':'joke'},
                             {'reason':True,'future':True,'capture':True})
        self.assertEqual(result['sources'],{'why':'SAFE_FALLBACK','future':'AI_WRITER','capture':'AI_WRITER'})

    def test_saved_19_sources_and_frozen_decisions(self):
        out=ROOT.parent/'low-confidence-safety-20261006'
        report=json.loads((out/'writer-independent-comparison.json').read_text(encoding='utf-8'))
        baseline=json.loads((out/'writer-frozen-baseline.json').read_text(encoding='utf-8'))
        raw=json.loads((out/'writer-frozen-raw.json').read_text(encoding='utf-8'))
        self.assertEqual(report['stats']['independent'],{'why':9,'future':19,'capture':13,'fallback_fields':16,'all_existing_rows':0})
        for row in report['rows']:
            old=next(r for r in baseline['rows'] if r['index']==row['index'])
            self.assertEqual((row['winner'],row['score']),(old['winner'],old['score']))
            self.assertEqual(row['independent']['output']['future'],raw[str(row['index'])]['draft']['future'])
