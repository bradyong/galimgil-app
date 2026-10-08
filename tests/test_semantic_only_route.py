import inspect
import unittest
from unittest.mock import patch

import choice_meaning as cm


class SemanticOnlyRouteTests(unittest.TestCase):
    def test_active_resolver_uses_semantic_only(self):
        self.assertIs(inspect.signature(cm.resolve).parameters['call'].default,
                      cm.interpret_semantics)
        with patch.object(cm, 'interpret', return_value={'status': 'confirmation'}) as call:
            cm.interpret_semantics({'question': 'q'}, 'not-a-key')
        call.assert_called_once_with({'question': 'q'}, 'not-a-key', with_writer=False)

    def test_active_request_excludes_discontinued_writer(self):
        body, _ = cm.request_body({'question': 'q', 'a': 'a', 'b': 'b'}, with_writer=False)
        self.assertEqual(body['text']['format']['schema']['properties']['meaning'], cm.SCHEMA)
        self.assertIn('canonical_axes', body['text']['format']['schema']['properties'])
        self.assertTrue(body['instructions'].startswith(cm.PROMPT))
        self.assertNotIn('writer', body['text']['format']['schema']['properties'])

    def test_frozen_writer_experiment_cannot_be_used_as_semantic_request(self):
        with self.assertRaises(ValueError):
            cm.request_body({}, frozen_meaning={}, with_writer=False)


if __name__ == '__main__':
    unittest.main()
