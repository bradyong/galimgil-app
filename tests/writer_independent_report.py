"""Offline saved-response recombination. Does not integrate into the app."""
import hashlib
import html
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from writer_selection import select_fields

OUT = ROOT.parent / 'low-confidence-safety-20261006'
read = lambda name: json.loads((OUT / name).read_text(encoding='utf-8'))
baseline = read('writer-frozen-baseline.json')
raw = read('writer-frozen-raw.json')
review = json.loads((ROOT / 'tests/fixtures/writer-role-review.json').read_text(encoding='utf-8'))
for name, digest in baseline['hashes'].items():
    assert hashlib.sha256((ROOT / name).read_bytes()).hexdigest() == digest

# Qualitative residual-role audit of the final combinations, not a semantic validator.
overlap = {
    7: '캡처가 약속 잡기라는 이유의 행동을 반복',
    9: '미래와 캡처가 소스/젓가락 소재를 반복',
    11: '미래와 캡처가 냄새 맡기 소재를 반복',
    14: '기존 캡처가 독서 장면의 라벨에 가까움',
    15: '기존 캡처가 임시 대여라는 이유를 요약',
    17: '미래와 캡처가 핑계라는 같은 반전을 공유',
    18: '기존 캡처가 대면 사과의 진심이라는 주제를 재서술',
    23: '기존 캡처가 산책/우산/통화 장면을 요약',
    24: '이유와 캡처가 늦어도 얼굴 비추기라는 발상을 공유',
    26: '기존 캡처가 쓰레기/운동 장면 라벨에 가까움',
}
capture_causes = {7:'선택 행동 반복',14:'단순 명사구',15:'선택 행동 반복',18:'이유 요약',23:'단순 명사구',26:'단순 명사구'}
rows = []
for frozen in baseline['rows']:
    if frozen['route'] != 'semantic-play':
        continue
    i = frozen['index']
    verdict = review['rows'][str(i)]
    draft = raw[str(i)]['draft']
    final = select_fields(frozen['output'], draft, verdict)
    all_pass = all(verdict[k] for k in ('reason','future','capture'))
    whole = select_fields(frozen['output'], draft, {k:all_pass for k in ('reason','future','capture')})
    rows.append({'index':i, 'q':frozen['q'],'a':frozen['a'],'b':frozen['b'],
                 'winner':frozen['winner'],'score':frozen['score'],
                 'existing':frozen['output'],'whole':whole,'independent':final,
                 'verdict':verdict,'why_failure':verdict['note'] if not verdict['reason'] else None,
                 'capture_failure':capture_causes.get(i),'residual_overlap':overlap.get(i),
                 'reality_claim_failure':False})
assert len(rows) == 19
def metrics(mode):
    counts = {k:sum(r[mode]['sources'][k]=='AI_WRITER' for r in rows) for k in ('why','future','capture')}
    counts['fallback_fields'] = 57-sum(counts.values())
    counts['all_existing_rows'] = sum(all(v!='AI_WRITER' for v in r[mode]['sources'].values()) for r in rows)
    return counts
stats = {'whole':metrics('whole'),'independent':metrics('independent'),
         'residual_role_overlap':len(overlap),'reality_claim_failures_manual':0,
         'new_api_calls':0,'new_tokens':0,'cost_usd':0,
         'protected_hashes_unchanged':True,
         'raw_sha256':hashlib.sha256((OUT/'writer-frozen-raw.json').read_bytes()).hexdigest()}
result = {'stats':stats,'rows':rows}
result['method'] = '저장 원응답의 영역별 정성 판정을 재사용. 역할 중복은 최종 조합을 직접 읽고 보수적으로 표시. 자동 사실 검증 또는 재미 보증 아님.'
(OUT/'writer-independent-comparison.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
esc = lambda text: html.escape(html.unescape(str(text)))
def block(output, sources=None):
    return ''.join(f'<h4>{label} <small>{sources[k] if sources else "EXISTING"}</small></h4><p>{esc(output[k])}</p>' for k,label in [('why','이유'),('future','미래의 나'),('capture','캡처 한 줄')])
sections = []
for r in rows:
    sections.append(f'<section><h2>{r["index"]+1}. {esc(r["a"])} / {esc(r["b"])}</h2><p>{esc(r["q"])} · winner {esc(r["winner"])} · score {esc(r["score"])}</p><div class="grid"><article><h3>① 기존 출력 (저장 기준본)</h3>{block(r["existing"])}</article><article><h3>② 전체 fallback (6/19 채택)</h3>{block(**r["whole"])}</article><article><h3>③ 영역별 독립 채택</h3>{block(**r["independent"])}</article></div><p>이유 실패: {esc(r["why_failure"] or "없음")}</p><p>캡처 실패: {esc(r["capture_failure"] or "없음")}</p><p>잔여 역할 중복: {esc(r["residual_overlap"] or "발견 없음")}</p></section>')
doc = '''<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Writer 독립 채택 19건</title><style>body{font:16px/1.65 sans-serif;max-width:1500px;margin:24px auto;padding:0 20px;color:#222}h1{font-size:28px}h2{font-size:22px}h3{font-size:18px}h4{font-size:16px;margin-bottom:4px}small{display:block;color:#47645d;font-size:12px}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}p,pre{overflow-wrap:anywhere;white-space:pre-wrap}section{border-top:1px solid #aaa;padding:20px 0}article{min-width:0}@media(max-width:850px){.grid{grid-template-columns:1fr}}</style><h1>Writer 19건: 영역별 독립 채택</h1><p>①은 동결 실험 시작 당시 저장한 기존 출력입니다. 현재 온라인 출시본과 동일함을 새로 확인한 자료는 아닙니다. ②는 직전 영역별 정책에서 전체 PASS 6건만 채택하던 방식이며, 과거 공통 anchor 기준 2건 방식과 구분합니다.</p><p>WHY 실패 10건만 기존 안전 이유를 사용하고 FUTURE 19건, CAPTURE 13건은 새 문장을 그대로 사용합니다. 원응답 수정 없음. 앱 연결 없음. SAFE_FALLBACK은 검토한 기존 이유의 출처 표기이며, 모든 입력에 대한 안전성 보증이 아닙니다.</p><p>새 문장 사용: 이유 9/19(47.4%), 미래 19/19(100%), 캡처 13/19(68.4%). 기존 문장 사용: 16/57(28.1%), 전체 기존 문장인 응답 0/19. 전체 fallback 방식은 기존 문장 39/57(68.4%), 전체 기존 응답 13/19입니다.</p><p>최종 조합의 근거 없는 현실 주장: 정성 검토상 0건. 이유는 기존 판정 및 저장 의미/점수 근거를 재사용했고 창작 장면은 현실 보장으로 세지 않았습니다. 역할 중복/같은 소재 반복은 보수적 재검토상 10/19에 남습니다. 정책 통과는 유머나 역할 분리 완성의 보증이 아닙니다. 기존 캡처의 약한 라벨/교훈도 임의 수정하지 않았습니다.</p>'''+''.join(sections)+'<p>API/토큰/비용 0. semantic/canonical/winner/score 동결. main merge/배포/push 없음.</p></html>'
(OUT/'writer-independent-comparison.html').write_text(doc,encoding='utf-8')
print(json.dumps(stats,ensure_ascii=False,indent=2))
