import copy,json,unittest
from pathlib import Path
import frozen_writer as w

BASE=w.ROOT.parent/'low-confidence-safety-20261006'/'writer-frozen-baseline.json'
class FrozenWriterTests(unittest.TestCase):
    def setUp(self):
        self.row=json.loads(BASE.read_text(encoding='utf-8'))['rows'][0]
        self.draft={'reason':'오늘은 바라보는 쪽보다 직접 타보는 쪽에 놀이 마음이 기울었어요.',
          'future':'씩씩하게 올라탔는데 내려와서 다리부터 달래는 중.',
          'capture':'용기는 탑승 전에 가장 많았지.','anchors':['놀이기구 타기']}
    def test_good_copy_only_changes_output(self):
        before=copy.deepcopy(self.row);result,errors=w.select_output(self.row,self.draft)
        self.assertFalse(errors);self.assertEqual(self.row,before)
        for key in before:
            if key!='output':self.assertEqual(result[key],before[key])
    def test_writer_cannot_return_winner_or_score(self):
        for key in ['winner','score','meaning','axes']:
            value={**self.draft,key:'injected'};result,errors=w.select_output(self.row,value)
            self.assertTrue(errors);self.assertEqual(result,self.row)
    def test_grounding_failure_falls_back_without_retry(self):
        value={**self.draft,'anchors':['unknown external fact']}
        result,errors=w.select_output(self.row,value)
        self.assertIn('anchor',errors);self.assertEqual(result,self.row)
    def test_content_review_failure_keeps_original(self):
        result,errors=w.select_output(self.row,self.draft,['unsupported-fact'])
        self.assertEqual(result,self.row);self.assertIn('unsupported-fact',errors)
    def test_prediction_and_name_only_caption_rejected(self):
        value={**self.draft,'future':'놀이동산에 가서 놀이기구를 타게 될 것이다.'}
        self.assertIn('predictive-future',w.validate(value,self.row))
    def test_protected_sources_unchanged_and_only_19_eligible(self):
        data=json.loads(BASE.read_text(encoding='utf-8'))
        self.assertEqual(w.hashes(),data['hashes'])
        self.assertEqual(sum(r['route']=='semantic-play' for r in data['rows']),19)
    def test_api_contract_has_no_score_or_meaning_output(self):
        request=w.body(self.row)
        self.assertEqual(set(request['text']['format']['schema']['properties']),set(w.FIELDS+['anchors']))
        self.assertEqual(request['max_output_tokens'],650)
        self.assertEqual(json.loads(request['input'])['winner'],self.row['winner'])
