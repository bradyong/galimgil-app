# 갈림길

별자리와 손금 상징으로 오늘의 A/B 선택을 정리하는 모바일 앱 프로토타입입니다.

## 바로 실행

AI 손금 기능을 제외한 화면만 보려면 `index.html` 파일을 더블클릭하면 됩니다.

경로:

`C:\Users\PC\Documents\fortune-palm-app\index.html`

AI 손금 기능까지 실행하려면 PowerShell에서 아래 명령을 실행합니다.

```powershell
cd C:\Users\PC\Documents\fortune-palm-app
.\run-app.ps1
```

그다음 브라우저에서 아래 주소를 엽니다.

`http://127.0.0.1:8787`

## AI 손금 설정

AI 손금 기능은 OpenAI API 키가 필요합니다. API 키는 앱 화면이나 소스 코드에 넣지 않고, 서버를 실행하기 전에 환경 변수로 설정합니다.

```powershell
$env:OPENAI_API_KEY="설정한 API 키"
.\run-app.ps1
```

API 키를 채팅이나 소스 코드에 붙여넣지 마세요.

## Render 온라인 배포

`render.yaml` 파일이 포함되어 있습니다. Render에서 Blueprint를 생성하고 이 프로젝트가 올라간 GitHub 저장소를 선택하면 웹 서버를 배포할 수 있습니다.

배포 서버의 환경 변수 `OPENAI_API_KEY`에 API 키를 설정하면 실제 AI 손금 기능이 활성화됩니다.

## 들어간 기능

- 오늘의 고민 입력
- A/B 선택지 비교 리포트
- 별자리 기반 선택 키워드
- 손바닥 사진 미리보기와 감성 리추얼
- 사진 기반 AI 손금 카드
- 선택 카드 아카이브
- 브라우저 내 선택 카드 저장
- 공유/복사용 선택 카드 문구
- 밤 체크인과 한 줄 메모
- 개인정보처리방침 초안
- PWA용 manifest와 앱 아이콘 초안

## 차별화 방향

갈림길은 미래를 맞히는 운세 앱이 아니라, 사용자가 오늘 마주한 선택을 짧은 이야기와 리추얼로 정리하는 앱입니다.

핵심 카피:

`미래를 맞히는 대신, 오늘의 선택을 선명하게.`

## 다음 MVP 목표

- Android 앱 패키징
- 카드 디자인을 이미지로 저장하는 기능
- 하루 1개 선택 리포트 제한과 연속 기록
- 푸시 알림: 밤 체크인 리마인드
- 광고 또는 프리미엄 리포트 수익화

## 플레이스토어로 가기 전 필요한 것

- 앱 패키징 방식 결정: Flutter, Capacitor, 또는 TWA
- Android 빌드 환경 설치: Android Studio, Java, Gradle 또는 Flutter SDK
- 앱 아이콘 PNG 512x512
- 스토어 스크린샷
- 개인정보처리방침 웹 URL
- Google Play Console 개발자 계정

## 주의 문구

선택 리포트와 손바닥 메시지는 오락 및 자기성찰용이며 실제 미래, 건강, 투자, 법률 판단을 보장하지 않습니다.
