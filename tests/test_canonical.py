import copy,json,unittest
from pathlib import Path
from unittest.mock import MagicMock,patch
import choice_canonical as cc
import choice_meaning as cm
ROOT=Path(__file__).parent
CASES=json.loads((ROOT/'semantic-cases.json').read_text(encoding='utf-8'))
MEANINGS=json.loads((ROOT/'fixtures/semantic-v2-responses.json').read_text(encoding='utf-8'))
NORMAL=json.loads((ROOT/'fixtures/canonical-validated.json').read_text(encoding='utf-8'))
def data(i):
    f=CASES[i]
    return {'question':f['q'],'a':f['a'],'b':f['b']}
class CanonicalTests(unittest.TestCase):
    def test_saved_accepted_rows_revalidate(self):
        for k,r in NORMAL.items():
            self.assertEqual(cc.validate(r['canonical_axes'],MEANINGS[k]['meaning'],data(int(k))),r['canonical_axes'])
    def test_negative_is_not_now(self):
        r=json.loads((ROOT/'fixtures/canonical-repair-responses.json').read_text(encoding='utf-8'))['24']['canonical_axes']
        self.assertIsNone(cc.validate(r,MEANINGS['24']['meaning'],data(24)))
    def test_contract_enforces_closed_values_and_no_personality_tags(self):
        props=cc.SCHEMA['items']['properties']
        self.assertIn('enum',props['valueA']);self.assertNotIn('tags',props)
        self.assertNotIn('winner',props);self.assertNotIn('score',props)
    def test_bad_quote_unknown_value_and_unproven_familiarity_rejected(self):
        row=copy.deepcopy(NORMAL['6']['canonical_axes'])
        row[0]['quoteA']='not in input';self.assertIsNone(cc.validate(row,MEANINGS['6']['meaning'],data(6)))
        row=copy.deepcopy(NORMAL['6']['canonical_axes']);row[0]['valueA']='other'
        self.assertIsNone(cc.validate(row,MEANINGS['6']['meaning'],data(6)))
    def test_combined_runtime_one_call_preserves_meaning_and_returns_canonical(self):
        content={'meaning':MEANINGS['6']['meaning'],'canonical_axes':NORMAL['6']['canonical_axes']}
        raw={'status':'completed','output':[{'content':[{'type':'output_text','text':json.dumps(content)}]}]}
        opener=MagicMock();opener.open.return_value.__enter__.return_value.read.return_value=json.dumps(raw).encode()
        with patch.object(cm.urllib.request,'build_opener',return_value=opener):result=cm.interpret_semantics(data(6),'test-only')
        self.assertEqual(opener.open.call_count,1)
        self.assertEqual(result['canonical_axes'],content['canonical_axes']);self.assertEqual(result['status'],'ready')
        self.assertIsNone(result['writer'])
