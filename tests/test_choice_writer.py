import copy
import json
import pathlib
import unittest
from unittest.mock import patch
import choice_meaning as cm
import choice_writer as cw

ROOT=pathlib.Path(__file__).parent
RESPONSES=json.loads((ROOT/'fixtures/writer-responses.json').read_text(encoding='utf-8'))


class WriterTests(unittest.TestCase):
    def test_all_twenty_raw_responses_have_reproducible_validation(self):
        for result in RESPONSES.values():
            actual=cw.validate(result['raw_writer'],result['meaning']) if result['status']=='ready' else None
            self.assertEqual(actual,result['writer'])

    def test_label_and_prediction_are_not_silently_accepted(self):
        for field,value in [('capture','선택한 물건'),('future','앞으로 아주 즐거운 일이 생길 것이다.')]:
            writing=copy.deepcopy(RESPONSES['6']['writer']);writing['a'][field]=value
            self.assertIsNone(cw.validate(writing,RESPONSES['6']['meaning']))

    def test_writer_cannot_add_schema_fields(self):
        writing=copy.deepcopy(RESPONSES['6']['writer']);writing['a']['winner']='A'
        self.assertIsNone(cw.validate(writing,RESPONSES['6']['meaning']))

    def test_one_integrated_request_returns_separate_writer_and_unchanged_meaning(self):
        fixture=RESPONSES['6'];meaning=fixture['meaning'];writing=fixture['writer']
        raw={'status':'completed','usage':{'input_tokens':1,'output_tokens':1},
             'output':[{'content':[{'type':'output_text','text':json.dumps({'meaning':meaning,'writer':writing})}]}]}
        class Response:
            def __enter__(self):return self
            def __exit__(self,*args):pass
            def read(self):return json.dumps(raw).encode()
        data={'question':'피곤한데 운동하고 공부할까 쉴까?','a':'운동하고 공부한다','b':'쉰다'}
        with patch.object(cm.urllib.request,'build_opener') as opener:
            opener.return_value.open.return_value=Response()
            actual=cm.interpret(data,'not-a-key')
            body=json.loads(opener.return_value.open.call_args.args[0].data)
            self.assertEqual(set(body['text']['format']['schema']['properties']),{'meaning','writer'})
            self.assertEqual(opener.return_value.open.call_count,1)
            self.assertEqual(actual['meaning'],meaning)
            self.assertEqual(actual['writer'],writing)

    def test_bad_writer_does_not_invalidate_good_meaning(self):
        self.assertIsNone(cw.validate(None,RESPONSES['6']['meaning']))
        data={'question':'피곤한데 운동하고 공부할까 쉴까?','a':'운동하고 공부한다','b':'쉰다'}
        self.assertTrue(cm.validate(RESPONSES['6']['meaning'],data))
