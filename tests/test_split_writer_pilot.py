import copy
import json
import unittest
from split_writer_pilot import plan,body,CAP

class SplitTests(unittest.TestCase):
    def test_selection_and_budget(self):
        p=plan();self.assertEqual(len(p['rows']),10);self.assertLessEqual(p['conservative_bound'],CAP)
    def test_contract_not_repair(self):
        for row in plan()['rows']:
            before=copy.deepcopy(row)
            a=json.loads(body(row,'future')['input'])
            b=json.loads(body(row,'capture','새롭게 생성된 장면')['input'])
            self.assertNotIn('future',a);self.assertNotIn('score',a);self.assertNotIn('why',a)
            self.assertNotIn('capture',b);self.assertEqual(b.pop('future'),'새롭게 생성된 장면')
            self.assertEqual(a,b);self.assertEqual(row,before)
            self.assertEqual(a['winner'],row['winner'])
    def test_capture_dependency(self):
        with self.assertRaises(ValueError):body(plan()['rows'][0],'capture')
    def test_one_field_schema(self):
        for stage in ('future','capture'):
            schema=body(plan()['rows'][0],stage,'가상 장면입니다')['text']['format']['schema']
            self.assertEqual(set(schema['properties']),{stage})

if __name__=='__main__':unittest.main()
