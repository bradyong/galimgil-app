import json
import mimetypes
import os
import pathlib
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from cache_policy import representation
from palm_limits import configured_limits


ROOT = pathlib.Path(__file__).resolve().parent
HOST = "0.0.0.0"
PORT = int(os.getenv("PORT", "8787"))
MAX_BODY = 16 * 1024 * 1024
PALM_LIMITS = configured_limits()
if PALM_LIMITS.path.resolve().is_relative_to(ROOT):
    raise ValueError("PALM_USAGE_DB must be outside the public web directory")


PALM_PROMPT = """
You are writing a Korean entertainment-only palm reading card for a lifestyle app.
Analyze only visible palm-line impressions in the supplied hand photo. Do not claim
scientific certainty, medical meaning, biometric identification, or guaranteed future
prediction. If the palm is unclear, say so gently. Return JSON only with these keys:
card_keyword, title, summary, visual_note, life_line, head_line, heart_line, fate_line,
today_message, ritual. Every value must be a Korean string. Keep each line warm,
specific, reflective, and concise. Mention that the result is for entertainment and
self-reflection where appropriate. Avoid stock fortune-telling templates. Make the
card feel different for each photo by grounding the wording in the visible image
quality, palm orientation, and line impressions. Do not repeat the same sentence
structure across fields.
""".strip()


def json_response(handler, status, payload):
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.send_header("Cache-Control", "no-store")
    handler.end_headers()
    handler.wfile.write(body)


def extract_output_text(response):
    for item in response.get("output", []):
        for content in item.get("content", []):
            if content.get("type") == "output_text":
                return content.get("text", "")
    return ""


class AppHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path == "/api/health":
            json_response(self, 200, {"ok": True, "ai_ready": bool(os.getenv("OPENAI_API_KEY"))})
            return
        if path == "/":
            path = "/index.html"
        target = (ROOT / path.lstrip("/")).resolve()
        if ROOT not in target.parents and target != ROOT:
            self.send_error(403)
            return
        if not target.is_file():
            self.send_error(404)
            return
        content, cache_control, etag = representation(target, self.path, ROOT)
        content_type = mimetypes.guess_type(target.name)[0] or "application/octet-stream"
        validators = [value.strip().removeprefix('W/') for value in self.headers.get('If-None-Match', '').split(',')]
        if etag in validators or '*' in validators:
            self.send_response(304)
            self.send_header("Cache-Control", cache_control)
            self.send_header("ETag", etag)
            self.end_headers()
            return
        self.send_response(200)
        self.send_header("Cache-Control", cache_control)
        self.send_header("ETag", etag)
        self.send_header("Content-Type", f"{content_type}; charset=utf-8" if content_type.startswith("text/") else content_type)
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    def do_POST(self):
        if self.path != "/api/palm-reading":
            self.send_error(404)
            return
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            json_response(self, 503, {"error": "OpenAI API 키가 아직 설정되지 않았어요."})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > MAX_BODY:
                raise ValueError("사진 용량이 너무 커요. 다른 사진으로 다시 시도해주세요.")
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            image = payload.get("image", "")
            if not image.startswith("data:image/"):
                raise ValueError("지원되는 손바닥 사진을 선택해주세요.")
            # The global cap remains effective even if a client forges forwarding headers.
            forwarded_for = self.headers.get("X-Forwarded-For", "")
            client_ip = forwarded_for.split(",", 1)[0].strip() or self.client_address[0]
            try:
                limit = PALM_LIMITS.reserve(client_ip)
            except Exception:
                json_response(self, 503, {"error": "손금 이용량 확인이 잠시 지연되고 있어요. 잠시 후 다시 시도해주세요."})
                return
            if limit:
                message = (
                    f"안전한 이용을 위해 같은 네트워크에서는 하루 {PALM_LIMITS.per_ip}회까지 손금을 볼 수 있어요. 내일 다시 이용해주세요. (한국 시간 자정 기준)"
                    if limit == "ip" else
                    "오늘의 손금 서비스 안전 이용량에 도달했어요. 내일 다시 이용해주세요. (한국 시간 자정 기준)"
                )
                json_response(self, 429, {"error": message, "code": f"palm_daily_{limit}_limit"})
                return
            request_body = {
                "model": "gpt-5-mini",
                "input": [{
                    "role": "user",
                    "content": [
                        {"type": "input_text", "text": PALM_PROMPT},
                        {"type": "input_image", "image_url": image, "detail": "high"},
                    ],
                }],
            }
            request = urllib.request.Request(
                "https://api.openai.com/v1/responses",
                data=json.dumps(request_body).encode("utf-8"),
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                method="POST",
            )
            with urllib.request.urlopen(request, timeout=60) as response:
                api_response = json.loads(response.read().decode("utf-8"))
            text = extract_output_text(api_response).strip()
            if text.startswith("```"):
                text = text.strip("`").removeprefix("json").strip()
            result = json.loads(text)
            required = {
                "card_keyword", "title", "summary", "visual_note", "life_line",
                "head_line", "heart_line", "fate_line", "today_message", "ritual",
            }
            if not required.issubset(result):
                raise ValueError("AI 결과 형식이 맞지 않아요. 다시 시도해주세요.")
            json_response(self, 200, result)
        except urllib.error.HTTPError as error:
            detail = error.read().decode("utf-8", "replace")
            try:
                api_message = json.loads(detail).get("error", {}).get("message", "")
            except json.JSONDecodeError:
                api_message = ""
            message = f"OpenAI API 요청이 실패했어요. ({error.code})"
            if api_message:
                message = f"{message} {api_message}"
            json_response(self, 502, {"error": message})
        except (ValueError, json.JSONDecodeError) as error:
            json_response(self, 400, {"error": str(error)})
        except Exception:
            json_response(self, 500, {"error": "AI 해석 중 오류가 발생했어요. 잠시 후 다시 시도해주세요."})

    def log_message(self, format, *args):
        return


if __name__ == "__main__":
    print(f"갈림길 앱 서버: http://{HOST}:{PORT}")
    ThreadingHTTPServer((HOST, PORT), AppHandler).serve_forever()
