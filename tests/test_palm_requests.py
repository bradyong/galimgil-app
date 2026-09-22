"""Exercise the actual POST handler without paid AI calls or real photos."""
import io
import json
import pathlib
import sys
import unittest
import urllib.error
from unittest.mock import patch

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
import server


RESULT = dict.fromkeys((
    "card_keyword", "title", "summary", "visual_note", "life_line",
    "head_line", "heart_line", "fate_line", "today_message", "ritual",
), "fixture")


def request(image="data:image/png;base64,fixture", length=None):
    handler = object.__new__(server.AppHandler)
    body = json.dumps({"image": image}).encode()
    handler.path = "/api/palm-reading"
    handler.headers = {"Content-Length": str(len(body) if length is None else length),
                       "X-Forwarded-For": "192.0.2.1"}
    handler.client_address = ("192.0.2.1", 10000)
    handler.rfile = io.BytesIO(body)
    with patch.object(server, "json_response") as reply:
        handler.do_POST()
        return reply.call_args.args[1:]


class PalmRequestsTest(unittest.TestCase):
    def setUp(self):
        env = patch.dict(server.os.environ, {"OPENAI_API_KEY": "fixture-not-a-key"})
        env.start()
        self.addCleanup(env.stop)

    def test_same_ip_beyond_both_old_daily_limits(self):
        def response(*args, **kwargs):
            return io.BytesIO(json.dumps({"output": [{"content": [
                {"type": "output_text", "text": json.dumps(RESULT)}
            ]}]}).encode())
        with patch.object(server.urllib.request, "urlopen", side_effect=response) as api:
            for attempt in range(40):
                self.assertEqual(request(), (200, RESULT), attempt)
            self.assertEqual(api.call_count, 40)

    def test_invalid_image_still_rejected_without_ai_request(self):
        with patch.object(server.urllib.request, "urlopen") as api:
            self.assertEqual(request("not-an-image")[0], 400)
            api.assert_not_called()

    def test_oversized_body_still_rejected(self):
        with patch.object(server.urllib.request, "urlopen") as api:
            self.assertEqual(request(length=server.MAX_BODY + 1)[0], 400)
            api.assert_not_called()

    def test_missing_key_still_unavailable(self):
        with patch.dict(server.os.environ, {"OPENAI_API_KEY": ""}), \
                patch.object(server.urllib.request, "urlopen") as api:
            self.assertEqual(request()[0], 503)
            api.assert_not_called()

    def test_provider_failure_is_not_reported_as_daily_quota(self):
        error = urllib.error.HTTPError("https://example.invalid", 429, "fixture", {},
                                       io.BytesIO(b'{"error":{"message":"fixture"}}'))
        with patch.object(server.urllib.request, "urlopen", side_effect=error):
            self.assertEqual(request()[0], 502)


if __name__ == "__main__":
    unittest.main()
