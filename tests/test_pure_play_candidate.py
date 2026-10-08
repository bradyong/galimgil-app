import copy
import json
import unittest
from pathlib import Path
from pure_play_candidate import compose

OUT=Path(__file__).resolve().parents[2]/'low-confidence-safety-20261006'

class PurePlayTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.rows=json.loads((OUT/'meaning-only-replay.json').read_text(encoding='utf-8'))['rows']

    def test_swaps_and_reproduction_all_saved(self):
        n=0
        for row in self.rows:
            r=compose(row)
            self.assertEqual(r,compose(copy.deepcopy(row)))
            if r['score_source']!='PURE_PLAY':continue
            n+=1
            swapped=copy.deepcopy(row)
            swapped['a'],swapped['b']=row['b'],row['a']
            self.assertEqual(r,compose(swapped))
        self.assertEqual(n,25)

    def test_score_range_and_no_semantic_axis(self):
        for row in self.rows:
            r=compose(row)
            if r['score_source']!='PURE_PLAY':continue
            self.assertTrue(51<=r['score']<=55)
            self.assertEqual(r['score']+r['loser_score'],100)
            self.assertFalse(r['semantic_advantage'])
            self.assertEqual(r['semantic_axes'],[])
            self.assertIn('놀이 한 표',r['why'])
            self.assertNotIn('더 활동적',r['why'])

    def test_verified_results_preserved_including_tied_axis(self):
        rows=[r for r in self.rows if r.get('new_axes')]
        self.assertEqual(len(rows),3)
        for row in rows:
            self.assertEqual(compose(row)['engine_result'],row['new_result'])
            tied=copy.deepcopy(row);tied['new_result']['score']=50
            self.assertEqual(compose(tied)['score_source'],'VERIFIED_SEMANTIC')
            self.assertEqual(compose(tied)['score'],50)

    def test_unknowns_not_decided(self):
        rows=[r for r in self.rows if r['new_route']=='confirmation']
        self.assertEqual(len(rows),3)
        for row in rows:
            result=compose(row)
            self.assertIsNone(result['winner']);self.assertIsNone(result['score'])

    def test_inputs_in_seed_and_card_order_irrelevant(self):
        row=copy.deepcopy(next(r for r in self.rows if r['new_result'] and not r['new_axes']))
        base=compose(row)
        for key,value in [('mood',2),('sign','테스트 별자리'),('cards',['다른 카드'])]:
            other=copy.deepcopy(row);other['new_result']['inputs'][key]=value
            self.assertNotEqual(base['seed_sha256'],compose(other)['seed_sha256'])
        row['new_result']['inputs']['cards'].reverse()
        self.assertEqual(base,compose(row))

    def test_does_not_mutate_or_use_meaning_drafts(self):
        for row in self.rows:
            before=copy.deepcopy(row)
            result=compose(row)
            self.assertEqual(row,before)
            other=copy.deepcopy(row);other['meaning_proposal']={'made_up':'active passive'}
            self.assertEqual(result,compose(other))

    def test_invalid_boundary_rejected(self):
        row=copy.deepcopy(next(r for r in self.rows if r['new_result'] and not r['new_axes']))
        row['new_result']['axes']=[{'id':'fake'}]
        with self.assertRaises(ValueError):compose(row)

if __name__=='__main__':unittest.main()
