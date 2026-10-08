# A안 로컬 앱 연결 검증

## 후속 수정: confirmation 표시 시점

- 확인칸은 HTML/CSS에서 이미 기본 숨김이었다. 문제는 저장 응답 부재/네트워크 실패를 의미 UNKNOWN과 합쳐 confirmation으로 반환하던 연결부였다.
- 의미 응답 수신 여부와 동결된 `ready()` 판정을 분리했다. 미수신/불완전 응답은 `unavailable`, 실제 해석 응답이 기존 기준을 통과하지 못하면 `confirmation`이다. 의미 판단 기준 자체는 변경하지 않았다.
- 분석 대기 중에는 확인칸을 숨긴다. 실제 confirmation 응답 뒤에만 표시하고 A/B 설명만 받는다. 서버 오류 시 결과를 조작하지 않고 응답 미수신 안내를 표시한다.
- 세 일반 쌍(키즈카페/놀이공원, 버스/지하철, 녹차/홍차)은 정상 의미 응답 주입으로 확인칸 없이 결과 생성하는 UI 계약을 검증했다. 눌비락/쨈누소 UNKNOWN 응답 후 확인칸 표시, 설명 1회 후 실제 엔진 결과 생성도 통과했다. 이 테스트는 실제 OpenAI 의미 인식 검증이 아니다.
- 연결 Python 9개, 기존 판단 24개, canonical/고정 회귀 8개 및 31건 브라우저 연결 재검증 통과. 기존 28건 winner/score/WHY와 조어 3건 라우팅 동일.
- `confirmation-visibility-report.json`에 결과 저장. 추가 유료 API 호출, 배포, merge, push 없음.
- 8793 fixture 미리보기에서 저장 응답이 없는 새 질문은 이제 confirmation 대신 응답 미수신 안내를 표시한다. 실제 의미 서비스 연결 전까지 새 일반 질문의 즉시 결과 생성은 검증되지 않았다.

## 범위와 상태

- feature 브랜치의 로컬 연결 후보. main merge, push, production deploy 없음.
- 외부 OpenAI/Upstash 호출 0회. 실서비스 API 성능이나 Android 실기기 통과를 주장하지 않는다.
- 결과는 winner, 놀이 점수, WHY, 별 카드, 별의 한마디, FUTURE, 저장/공유 순으로 연결한다.
- 현재 정상 규칙 경로의 FUTURE는 보존하며 API로 재생성하지 않는다.

## 변경 파일

- `app.js`: 결과/기록/공유에서 CAPTURE 제외, 연결 어댑터 호출, 비동기 FUTURE 표시.
- `index.html`: `choice-runtime.js` 로드 추가. 이전 의미 확인 UI 변경은 이번 변경이 아니다.
- `choice-runtime.js`: API 경계, 결과 및 FUTURE 캐시 연결, CAPTURE 없는 공유 이미지.
- `server.py`: meaning-only / play / future 엔드포인트 추가. 손금 경로 변경 없음.
- `choice_runtime.py`: 동결 함수 호출, FUTURE 단독 요청, 중복/쿼터/실패 처리.
- `choice_contracts/meaning.py`, `play.py`, `why.py`: 승인된 오프라인 함수의 기계적 복사.
- `tests/promote_choice_contracts.py`, `test_choice_connection.py`, `choice_connection_preview.py`, `choice_connection.browser.cjs`: 보존/연결/로컬 UI 검증.
- `tests/choice.test.cjs`: DOM mock에 실제 브라우저의 dataset 속성 추가. 기존 assertion 유지.

## 동결 확인

- meaning/play 원본과 승격 모듈 byte 비교 통과.
- WHY 패턴과 함수 AST 동일성 통과.
- 실제 브라우저에서 기존 JS scorer를 실행하고 서버의 동결 compose/WHY 함수로 마무리했다.
- 저장된 31건 중 VERIFIED_SEMANTIC 3 / PURE_PLAY 25의 winner, score, WHY 모두 승인 결과와 일치.
- 조어 3건은 confirmation 유지. 한 번 의미를 입력하면 결과 진행.
- PURE_PLAY 25건 재현/옵션 교환 보존, 51~55% 범위 확인.
- 기존 정상 8건 winner/score/WHY/FUTURE 보존. 별 카드 및 별의 한마디 생성 함수 변경 없음.

## FUTURE 계약과 실패

- 승인된 FUTURE-only 요청 10건과 모델/프롬프트/스키마/입력 직렬화가 동일하다.
- Sol, reasoning none, output 최대 650 tokens. CAPTURE와 WHY 생성 필드 없음.
- 승인 실험처럼 Writer의 meaning은 원래 A/B 문자열 projection이다. AI가 확장한 의미 초안/상징/점수/WHY는 전달하지 않는다. VERIFIED 경로의 contrast도 승인된 원문 projection을 유지한다.
- 결과 화면을 먼저 표시하고 FUTURE만 비동기 연결한다. API 실패/빈 응답/형식 실패는 FUTURE 섹션만 숨긴다.
- 자동 재시도 없음. 동일 요청 Promise, 저장 기록, 서버 Redis claim/cache로 중복 요청 억제.
- Redis 장애나 쿼터 초과는 유료 호출하지 않는다. 실패 cache 24시간, 성공 cache 7일.
- 새 기록에는 CAPTURE/advice를 저장하지 않는다. 이전 기록 원본은 삭제/변환하지 않고 CAPTURE를 렌더링하지 않는다.
- 과거 실험용 CAPTURE 함수와 이전 API는 소스 보존을 위해 남아 있으나 새 앱 경로에서는 호출하지 않는다.

## 운영 연결 설정

이번 작업에서 운영 환경변수는 바꾸지 않았다. 기본 비활성 상태이다.

- `CHOICE_AI_ENABLED=1`: meaning-only 유료 해석 허용.
- `CHOICE_FUTURE_ENABLED=1`: FUTURE-only 유료 생성 허용.
- `OPENAI_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`: 서버 환경변수만 사용.
- `CHOICE_AI_DAILY_PER_IP/GLOBAL`, `CHOICE_FUTURE_DAILY_PER_IP/GLOBAL`: 각각 기본 30/300. 손금 카운터와 분리.
- 배포 승인이 없으므로 값을 추가하거나 활성화하지 않았다.

## 검증 결과

- JS 7개 파일: 판단 24, 이해 11, 의미 12, semantic 9, 광고 브리지 12, canonical 6, 고정 회귀 2 = 총 76개 assertion/test 통과.
- Python: 연결 8, meaning-only 8, PURE_PLAY 7, FUTURE-only 계약 5 = 28개 통과.
- Edge Playwright 실제 localhost: 31건 연결 비교, 정상 8건 경로, FUTURE 성공, 실패/네트워크 단절, 재호출 없음, 저장 기록 재열기, 공유 버튼, 이미지 다운로드 버튼 통과.
- 320px / 390px 모바일 및 1280px 데스크톱 가로 넘침 없음. 스크린샷과 1080px 공유 이미지 확인.
- 런타임 페이지 오류 0. 브라우저 테스트의 future 요청 4회는 로컬 fixture/오류 모의 요청이며 외부 API 호출이 아니다.

## 산출물

저장 위치: `../low-confidence-safety-20261006/`

- `app-connection-backup-20261007/`: 작업 전 원본과 해시.
- `connection-browser-report.json`: 31건 실제 비교 결과 및 브라우저 체크.
- `connection-320.png`, `connection-390.png`, `connection-1280.png`, `connection-failure.png`.
- `connection-share.png`, `connection-button-download.png`.
- 로컬 fixture 미리보기: http://127.0.0.1:8793/

## 남은 검증 / 한계

- 실제 Render API/Redis 및 Sol 네트워크 호출은 이번에 실행하지 않았다.
- Android WebView, 네이티브 저장/공유, UMP/배너는 실기기 재검증 전이다. 관련 코드는 수정하지 않았다.
- 자동 FUTURE 검사는 스키마/길이/일부 금지 표현 검사다. 모든 현실 주장이나 물리적 부자연스러움을 판정하는 검증기가 아니다.
- 성공 화면은 저장된 정책 PASS 응답으로 검증했다. 이것을 신규 실사용 FUTURE의 정책 100% 통과로 해석하면 안 된다.
- fixture 미리보기는 저장된 질문만 의미 해석한다. 모르는 새 질문은 확인 UI로 전환한다.
- 수동 의미 확인을 받은 조어에 대해 Writer는 여전히 승인된 원문 projection만 전달받는다. 새 의미를 Writer 입력에 확대하는 것은 별도 품질 검증 전까지 적용하지 않았다.
