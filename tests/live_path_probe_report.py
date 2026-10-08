"""Summarize saved live observations; no API calls."""
import json,hashlib,html
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT.parent/'low-confidence-safety-20261006'/'live-path-20261008'
def read(n):return json.loads((OUT/n).read_text(encoding='utf-8'))
s=read('ledger.json');rows=read('browser.json');calls=list(s['calls'].values());checks=[]
for r in rows:
    sem=next(x for x in r['responses'] if x['url'].endswith('choice-meaning-only'))
    assert r['initiallyHidden'] and not r['errors']
    if r['id']=='L6':
        assert r['first']['confirmation'] and not r['first']['shown']
        assert r['first']['visibility'][0]>=sem['at']
        checks.append({'id':r['id'],'route':'confirmation','semantic':'high uncertainty','pass':True})
    else:
        d=r['card']['details'];f=next(x for x in r['responses'] if x['url'].endswith('choice-future'))
        assert sem['data']['status']=='ready' and r['first']['shown'] and not r['first']['visibility']
        assert d['futureStatus']=='ready' and d['why'] and d['winner'] in (r['a'],r['b'])
        assert r['first']['resultShownAt']<f['at']
        assert d['scoreSource']=='PURE_PLAY' and 51<=d['percent']<=55
        checks.append({'id':r['id'],'route':d['scoreSource'],'winner':d['winner'],'score':d['percent'],
            'future_after_result_ms':f['at']-r['first']['resultShownAt'],'pass':True})
unchanged=all(hashlib.sha256((ROOT/k).read_bytes()).hexdigest()==v for k,v in s['hashes'].items())
assert unchanged and len(calls)==11 and all(c['status']=='completed' for c in calls)
summary={'checks':checks,'semantic_calls':6,'future_calls':5,'generation_failures':0,'retries':0,
 'input_tokens':sum(c['raw']['usage']['input_tokens'] for c in calls),
 'output_tokens':sum(c['raw']['usage']['output_tokens'] for c in calls),
 'calculated_usd':round(sum(c['cost'] for c in calls),9),'frozen_hashes_unchanged':unchanged,
 'failure_ui':read('failure-ui.json'),
 'regression':'28 results and 3 unknowns passed at approved 2026-10-07 card date; 8 existing-rule outputs preserved. Browser test clock corrected to freeze new Date as well as Date.now. No application changes.',
 'scope':'Actual OpenAI calls through unchanged application routes/provider. Test-only persistent local store, NOT production Upstash verification.',
 'limitations':['Semantic drafts contain unsupported generalizations about cost, distance, caffeine or efficiency; none used by canonical proof, score or WHY.',
 'FUTURE success is format/runtime success; five short fictional outputs were also read manually. It does not guarantee all future outputs.',
 'No Android/production validation. No merge/push/deploy. GPT-5 Mini is marked deprecated in official documentation; no model changed.']}
(OUT/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
e=lambda v:html.escape(str(v))
sections=[]
for r in rows:
    d=(r.get('card') or {}).get('details',{})
    sem=next(x['data'] for x in r['responses'] if x['url'].endswith('choice-meaning-only'))
    sections.append(f"<section><h2>{e(r['id'])}: {e(r['a'])} / {e(r['b'])}</h2><p>{e(r['question'])}</p>"
      f"<p>확인 UI: {e(r['first']['confirmation'])} · winner: {e(d.get('winner','없음'))} · score: {e(d.get('percent','없음'))}</p>"
      f"<h3>WHY</h3><p>{e(d.get('why','결과 생성 안 함'))}</p><h3>FUTURE</h3><p>{e(d.get('future','호출 안 함'))}</p>"
      f"<details><summary>실제 semantic 응답</summary><pre>{e(json.dumps(sem,ensure_ascii=False,indent=2))}</pre></details></section>")
doc='<!doctype html><meta charset="utf-8"><title>실제 API 연결 검증</title><style>body{max-width:960px;margin:32px auto;padding:0 20px;font:16px/1.6 sans-serif;color:#18272b}section{border-top:1px solid #bbb;padding:20px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere}h2{font-size:22px}</style>'
doc+='<h1>실제 API 연결 검증 · 2026-10-08</h1><p>semantic 6회 + FUTURE 5회, 재시도 0회. 입력 2,696 / 출력 2,240 tokens. 계산 비용 $0.013638.</p>'
doc+='<p>일반 5건 confirmation 없음, FUTURE 후속 표시 성공. 조어 1건만 분석 응답 후 confirmation. 앱 코드 및 판단 함수 해시 동일.</p>'
doc+='<p><strong>범위:</strong> 실제 API + 실제 localhost 브라우저. 운영 Redis 대신 검증 전용 파일 저장소 사용. 운영 배포와 실기기 검증은 아님.</p>'
doc+='<p><strong>한계:</strong> semantic 초안의 가격·시간·카페인 등 일반화는 실제 근거로 검증되지 않았으며 점수/WHY에는 사용하지 않았다. 모델은 변경하지 않았다.</p>'
doc+='<p>회귀: 승인 당시 2026-10-07 날짜/카드 조건에서 기존 28건 결과와 조어 3건, 정상 경로 8건 유지. 날짜가 바뀌면 카드가 달라지므로 테스트의 new Date 고정 누락만 수정했다. 앱 코드 수정 없음.</p>'
doc+=''.join(sections)
doc+='<p>단가 출처: <a href="https://developers.openai.com/api/docs/models/gpt-5-mini">GPT-5 Mini</a> / <a href="https://developers.openai.com/api/docs/models/gpt-5.6-sol">GPT-5.6 Sol</a>. 청구서 금액이 아닌 반환 usage 기준 계산.</p>'
(OUT/'report.html').write_text(doc,encoding='utf-8')
print(json.dumps(summary,ensure_ascii=False,indent=2))
