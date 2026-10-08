"""Saved 19-row grounded WHY + preserved FUTURE + six offline repair candidates."""
import hashlib
import html
import json
import sys
from collections import Counter
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
from writer_grounded_reason import render_reason
OUT = ROOT.parent/'low-confidence-safety-20261006'
def read(path):
    return json.loads(path.read_text(encoding='utf-8'))
baseline = read(OUT/'writer-frozen-baseline.json')
raw = read(OUT/'writer-frozen-raw.json')
reviews = read(ROOT/'tests/fixtures/writer-role-review.json')['rows']
repairs = read(ROOT/'tests/fixtures/capture-repair-local.json')
for file,digest in baseline['hashes'].items():
    assert hashlib.sha256((ROOT/file).read_bytes()).hexdigest()==digest
remaining = {9:'소스/젓가락이 미래와 캡처에 공통으로 남음',11:'냄새 맡기/코가 미래와 캡처에 공통으로 남음',17:'미래와 캡처가 핑계라는 반전을 공유'}
rows=[]
for r in baseline['rows']:
    if r['route']!='semantic-play':continue
    key=str(r['index']);draft=raw[key]['draft'];review=reviews[key]
    rendered=render_reason(r)
    repair=repairs['rows'].get(key)
    rows.append({'index':r['index'],'q':r['q'],'a':r['a'],'b':r['b'],'winner':r['winner'],'score':r['score'],
                 'why_comparison':{'ai':draft['reason'],'ai_strict_pass':review['reason'],
                                   'local':rendered['text'],'selected':'LOCAL_GROUNDED',
                                   'selection_note':'놀이 점수 또는 동점의 실제 선택 근거를 명시하는 로컬 표현을 실험 기본값으로 선택. 자연스러움은 사용자 검수 대상.'},
                 'output':{'why':rendered['text'],'future':draft['future'],'capture':repair['capture'] if repair else draft['capture']},
                 'sources':{'why':'LOCAL_GROUNDED','future':'AI_WRITER_SAVED','capture':'CODEX_REPAIR_CANDIDATE' if repair else 'AI_WRITER_SAVED'},
                 'renderer':rendered,'previous_capture':draft['capture'],'repair':repair,
                 'residual_overlap':remaining.get(r['index'])})
assert len(rows)==19
assert set(repairs['rows'])=={str(r['index']) for r in rows if not reviews[str(r['index'])]['capture']}
patterns=Counter(r['renderer']['pattern'] for r in rows)
stats={'rows':19,'why_unsupported_manual':0,'future_exactly_preserved':19,'repair_candidates':6,
       'capture_label_or_action_only_manual':0,'residual_role_overlap_manual':len(remaining),
       'exact_duplicate_excess':{k:19-len({r['output'][k] for r in rows}) for k in ('why','future','capture')},
       'why_patterns':dict(patterns),'why_pattern_repeat_excess':sum(n-1 for n in patterns.values()),
       'new_api_calls':0,'new_api_tokens':0,'new_api_cost_usd':0,'hashes_verified':True}
result={'stats':stats,'method':repairs['method'],'rows':rows}
(OUT/'writer-grounded-comparison.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
esc=lambda x:html.escape(str(x))
parts=[]
for r in rows:
    parts.append(f'<section><h2>{r["index"]+1}. {esc(r["a"])} / {esc(r["b"])}</h2><p>{esc(r["q"])} · winner {esc(r["winner"])} · score {r["score"]}</p><div class="grid"><article><h3>저장 AI WHY · {"PASS" if r["why_comparison"]["ai_strict_pass"] else "FAIL"}</h3><p>{esc(r["why_comparison"]["ai"])}</p><h3>로컬 WHY · 이번 조합 채택</h3><p>{esc(r["output"]["why"])}</p><p>{esc(r["why_comparison"]["selection_note"])}</p></article><article><h3>최종 조합</h3>'+''.join(f'<h4>{k} <small>{r["sources"][k]}</small></h4><p>{esc(r["output"][k])}</p>' for k in ('why','future','capture'))+f'</article></div><p>이전 캡처: {esc(r["previous_capture"])}</p><p>수정 의도: {esc(r["repair"]["change"] if r["repair"] else "변경 없음")}</p><p>잔여 역할 중복: {esc(r["residual_overlap"] or "명확한 중복 발견 없음")}</p><details><summary>WHY 근거 추적</summary><pre>{esc(json.dumps(r["renderer"]["evidence"],ensure_ascii=False,indent=2))}</pre></details></section>')
doc='''<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WHY 로컬 renderer와 캡처 6건 검토</title><style>body{max-width:1350px;margin:24px auto;padding:0 20px;font:16px/1.65 sans-serif;color:#222}h1{font-size:28px}h2{font-size:22px}h3{font-size:18px}h4{font-size:16px}small{display:block;color:#47645d;font-size:12px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:28px}article{min-width:0}p,pre{white-space:pre-wrap;overflow-wrap:anywhere}section{border-top:1px solid #aaa;padding:20px 0}@media(max-width:800px){.grid{grid-template-columns:1fr}}</style><h1>19건 최종 조합 검토 · 2026-10-07</h1><p>앱 연결/main merge/배포/push 없음. 의미/점수/승자 및 원응답 불변. WHY는 로컬 생성, FUTURE는 19건 원문 보존, CAPTURE는 실패 6건만 Codex가 작성한 검토용 후보입니다. 샘플별 운영 규칙이나 자동 repair 성능 검증이 아닙니다.</p><p>기존 AI WHY PASS 9건도 모두 나란히 표시했습니다. 이번 실험 기본 조합은 로컬 WHY이며 실제 근거의 추적 가능성을 우선했습니다. 기존 WHY보다 문체가 항상 우수하다는 판정은 아닙니다.</p><p>정성 검토상 WHY의 미확인 사실 0건, 캡처 단순 라벨/선택행동만 반복 0건. 미래와 캡처의 소재/반전 반복 3건은 보존했습니다. 새 캡처 6건은 비유·과장으로 검토한 후보이며 재미의 사용자 검수는 남아 있습니다.</p><p>문장 완전 일치 중복과 틀 중복을 구분합니다. 동점 이유는 같은 구조가 반복됩니다. 근거가 같은 경우 표현 다양성을 위해 사실을 만들어내지는 않았습니다. API 비용 0은 별도 외부 API 기준이며 이 대화의 모델 사용량은 별도입니다.</p><pre>'''+esc(json.dumps(stats,ensure_ascii=False,indent=2))+'</pre>'+''.join(parts)+'</html>'
(OUT/'writer-grounded-comparison.html').write_text(doc,encoding='utf-8')
print(json.dumps(stats,ensure_ascii=False,indent=2))
