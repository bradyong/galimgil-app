import io
import json
import pathlib
import sys
import unittest
from unittest.mock import patch, Mock
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from palm_limits import PalmLimits

class UnitTests(unittest.TestCase):
    def setUp(self):
        self.limits = PalmLimits('https://fixture.upstash.io', 'fixture-token')

    def test_result_contract(self):
        for result, expected in [(0,None),(1,'ip'),(2,'global')]:
            with patch.object(self.limits, 'command', return_value=result):
                self.assertEqual(self.limits.reserve('192.0.2.1'), expected)

    def test_invalid_result_fails_closed(self):
        for result in [None,False,'0',3,{},[]]:
            with patch.object(self.limits, 'command', return_value=result), self.assertRaises(RuntimeError):
                self.limits.reserve('ip')

    def test_ip_is_not_sent_raw(self):
        with patch.object(self.limits, 'command', return_value=0) as command:
            self.limits.reserve('192.0.2.1')
            self.assertNotIn('192.0.2.1', json.dumps(command.call_args.args))

    def test_missing_configuration(self):
        with self.assertRaises(RuntimeError):
            PalmLimits('', '').reserve('ip')

    def test_transport_and_error_fail_closed(self):
        for payload in [{'error':'quota'}, {}, {'result':0,'error':'bad'}]:
            opener = Mock()
            opener.open.return_value = io.BytesIO(json.dumps(payload).encode())
            with patch('urllib.request.build_opener',return_value=opener), self.assertRaises(RuntimeError):
                self.limits.reserve('ip')
        with patch('urllib.request.build_opener',side_effect=OSError), self.assertRaises(RuntimeError):
            self.limits.reserve('ip')

    def test_invalid_url_never_sends_token(self):
        for url in ['http://fixture.upstash.io','https://other.example','https://fixture.upstash.io/path']:
            with self.assertRaises(RuntimeError):
                PalmLimits(url,'token').reserve('ip')

if __name__ == '__main__':
    unittest.main()
