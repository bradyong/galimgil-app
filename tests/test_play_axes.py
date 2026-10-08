import copy
import json
from pathlib import Path
import unittest
from unittest.mock import patch, MagicMock
import choice_meaning as cm
import choice_play_axes as pa

ROOT = Path(__file__).parent
CASES = json.loads((ROOT/'semantic-cases.json').read_text(encoding='utf-8'))
MEANINGS = json.loads((ROOT/'fixtures/semantic-v2-responses.json').read_text(encoding='utf-8'))
PLAY = json.loads((ROOT/'fixtures/play-axes-responses.json').read_text(encoding='utf-8'))


class PlayAxesTests(unittest.TestCase):
    def test_empty_tags_and_empty_axes_are_valid_not_unknown_meaning(self):
        data = {'a': CASES[0]['a'], 'b': CASES[0]['b']}
        self.assertEqual(pa.validate({'axes': []}, MEANINGS['0']['meaning'], data), [])
        value = {'axes': copy.deepcopy(PLAY['0']['play_axes'])}
        for axis in value['axes']:
            axis['a']['tags'] = []
            axis['b']['tags'] = []
        self.assertEqual(pa.validate(value, MEANINGS['0']['meaning'], data), value['axes'])

    def test_known_tea_needs_no_scoring_axis_but_high_uncertainty_still_blocks(self):
        tea = json.loads((ROOT/'fixtures/tea-semantic-response.json').read_text(encoding='utf-8'))
        f = CASES[11]
        data = {'question': f['q'], 'a': f['a'], 'b': f['b']}
        self.assertTrue(cm.validate(tea['meaning'], data))
        value = copy.deepcopy(tea['meaning'])
        value['uncertainty']['level'] = 'high'
        self.assertFalse(cm.validate(value, data))

    def test_saved_18_pass_shape_and_quote_validation(self):
        self.assertEqual(len(PLAY), 18)
        for key, row in PLAY.items():
            f = CASES[int(key)]
            self.assertTrue(pa.validate({'axes': row['play_axes']}, MEANINGS[key]['meaning'], {'a': f['a'], 'b': f['b']}))

    def test_wrong_quote_or_winner_field_is_rejected(self):
        f = CASES[0]
        data = {'a': f['a'], 'b': f['b']}
        value = {'axes': copy.deepcopy(PLAY['0']['play_axes'])}
        value['winner'] = 'a'
        self.assertIsNone(pa.validate(value, MEANINGS['0']['meaning'], data))
        del value['winner']
        value['axes'][0]['a']['quote'] = '원문에 없는 가격 우위'
        self.assertIsNone(pa.validate(value, MEANINGS['0']['meaning'], data))

    def test_single_combined_semantic_request_returns_axes_without_writer(self):
        f = CASES[0]
        data = {'question': f['q'], 'a': f['a'], 'b': f['b']}
        content = {'meaning': MEANINGS['0']['meaning'], 'play_axes': PLAY['0']['play_axes']}
        raw = {'status': 'completed', 'output': [{'content': [{'type': 'output_text', 'text': json.dumps(content)}]}]}
        opener = MagicMock()
        opener.open.return_value.__enter__.return_value.read.return_value = json.dumps(raw).encode()
        with patch.object(cm.urllib.request, 'build_opener', return_value=opener):
            result = cm.interpret_semantics(data, 'test-only')
        self.assertEqual(opener.open.call_count, 1)
        self.assertEqual(result['status'], 'ready')
        self.assertEqual(result['play_axes'], PLAY['0']['play_axes'])
        self.assertIsNone(result['writer'])

    def test_paid_replay_uses_same_model_and_no_preferences(self):
        f = CASES[0]
        request = pa.request_body({'question': f['q'], 'a': f['a'], 'b': f['b']}, MEANINGS['0']['meaning'], cm.MODEL)
        self.assertEqual(request['model'], 'gpt-5-mini-2025-08-07')
        self.assertLessEqual(request['max_output_tokens'], 750)
        self.assertNotIn('mood', json.loads(request['input']))
        self.assertNotIn('preferred', json.loads(request['input']))


if __name__ == '__main__':
    unittest.main()
