"""No-network preflight and budget estimate; deliberately contains no API executor."""
import hashlib
import html
import json
import statistics
import sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
import choice_meaning as cm
OUT=ROOT.parent/'low-confidence-safety-20261006'
def read(path):return json.loads(path.read_text(encoding='utf-8'))
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def cost(u):
    cached=u.get('input_tokens_details',{}).get('cached_tokens',0)
    return ((u['input_tokens']-cached)*.25+cached*.025+u['output_tokens']*2)/1e6
cases=read(ROOT/'tests/fixtures/blind-40-20261007.json')
preflight=read(OUT/'blind-40-preflight.json')
assert sha(ROOT/'tests/fixtures/blind-40-20261007.json')==preflight['datasetSha256']
assert len(cases)==40
frozen=read(OUT/'writer-frozen-baseline.json')
for name,digest in frozen['hashes'].items():assert sha(ROOT/name)==digest
old_semantic=read(ROOT/'tests/fixtures/semantic-v2-responses.json')
old_writer=read(OUT/'writer-frozen-raw.json')
sem_usages=[r['usage'] for r in old_semantic.values() if r.get('usage')]
writer_usages=[r['usage'] for r in old_writer.values() if r.get('usage')]
tea=read(OUT/'tea-semantic-raw.json')['raw']['usage']
count=preflight['stats']['semanticCallsNeeded']
historical_sem=statistics.mean(cost(u) for u in sem_usages)
historical_writer=statistics.mean(cost(u) for u in writer_usages)
expected=count*historical_sem+37*historical_writer
recent_reference=count*cost(tea)+37*historical_writer
bodies=[cm.request_body({'question':f['q'],'a':f['a'],'b':f['b']},with_writer=False) for f in cases]
semantic_reserve=sum(((len(encoded)+1024)*.25+body['max_output_tokens']*2)/1e6 for body,encoded in bodies)
manifest_path=OUT/'blind-40-lock.json'
manifest={'dataset_sha256':preflight['datasetSha256'],'protected_source_hashes':{
    name:sha(ROOT/name) for name in [*frozen['hashes'],'writer_grounded_reason.py','writer_selection.py','choice_play_axes.py']},
    'training_artifact_hashes':{name:sha(OUT/name) for name in ['writer-frozen-baseline.json','writer-frozen-raw.json','writer-independent-comparison.json','writer-grounded-comparison.json']},
    'policy':'New 40 locked before paid inference; no case replacement, repair, provider retry or training-set tuning.'}
if manifest_path.exists():assert read(manifest_path)==manifest
else:manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
stats={'status':'BUDGET_BLOCKED' if min(expected,recent_reference)>.05 else 'REQUIRES_EXECUTION_REVIEW',
       'cap_usd':.05,'new_api_calls':0,'new_api_tokens':0,'new_api_cost_usd':0,
       'semantic_calls_needed':count,'writer_calls_assuming_37_understood':37,
       'historical_semantic_usage_samples':len(sem_usages),
       'historical_semantic_mean_cost':historical_sem,'historical_writer_mean_cost':historical_writer,
       'historical_estimate_usd':expected,'recent_single_reference_estimate_usd':recent_reference,
       'semantic_only_conservative_reserve_usd':semantic_reserve,
       'semantic_output_cap_tokens':cm.OUTPUT_LIMIT,
       'exact_saved_input_hits':0,'unknown_authored_cases':3,
       'limitations':['Old semantic usage is a proxy, not the current canonical schema measurement.',
         'Writer estimate uses prior 3-field request usage, not a newly shortened prompt.',
         '37 writer requests is an assumption, not a forced route or exclusion of the three unknown cases.',
         'Prompt-cache discounts are not guaranteed; exact previous responses cannot replace novel questions.',
         'UTF-8 bytes plus 1024 overhead is a conservative reservation heuristic, not an exact tokenizer count.']}
assert stats['status']=='BUDGET_BLOCKED'
result={'stats':stats,'rows':preflight['rows'],'evaluation':{
    'meaning_errors':None,'unnecessary_confirmation':None,'why_unsupported':None,'why_template_repetition':None,
    'future_pass_rate':None,'capture_pass_rate':None,'future_capture_overlap':None,'role_overlap':None,
    'user_output_acceptance':None},'blockers':[
    'Preflight estimate exceeds authorized $0.05; no inference performed.',
    'Prior field-level policy verdicts were manually supplied fixtures, not a general automatic content validator.']}
(OUT/'blind-40-budget.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
esc=lambda x:html.escape(str(x))
sections=[]
for f,r in zip(cases,preflight['rows']):
    sections.append(f'<section><h2>{f["id"]}. {esc(f["q"])}</h2><p>A: {esc(f["a"])}<br>B: {esc(f["b"])}</p><p>범위: {esc(", ".join(f["tags"]))}</p><p>로컬 경로: {r["route"]} · 기존 근거: {esc(r.get("reasons",[]))}</p><p>의미 이해 / canonical axis / winner / score / WHY / FUTURE / CAPTURE / source / 최종 PASS·FAIL: 미평가. 비용 승인 범위를 넘어 API 실행 전 중단했습니다.</p></section>')
doc='''<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>블라인드 40건 사전 점검</title><style>body{max-width:1100px;margin:24px auto;padding:0 20px;font:16px/1.65 sans-serif;color:#222}section{border-top:1px solid #aaa;padding:16px 0}h1{font-size:26px}h2{font-size:20px}p,pre{white-space:pre-wrap;overflow-wrap:anywhere}</style><h1>블라인드 40건 고정 및 실행 전 비용 점검</h1><p>2026-10-07. 비용 초과로 END-TO-END 미실행. 아래는 성공/실패 보고서가 아니라 사전 점검 자료입니다. 로컬 의미 부족은 최종 사용자 확인과 다르며 AI 해석이 필요한 경로입니다. 40건 모두 AI 요청 전 단계에 도달했습니다.</p><p>기존 28건과 질문/선택지 쌍 정확 중복 0건. 조어 3건 포함. 주제 범위는 저자가 검토했지만 독립 제3자가 작성한 완전 블라인드 세트는 아닙니다. 결과를 보기 전 질문을 고정했고 이후 교체하지 않습니다. 평가용 태그/조어 표시를 엔진에 전달하지 않았습니다.</p><p>기존 19건은 회귀 자료로만 보존. 엔진/Writer/renderer 수정 없음. 이전 수동 판정 fixture와 수동 캡처 repair는 이번 자동 성능으로 인정하지 않습니다. 추가 API/토큰/비용 모두 0.</p><p>가격 근거: <a href="https://developers.openai.com/api/docs/models/gpt-5-mini">OpenAI GPT-5 mini 공식 문서</a>, 입력 $0.25 / 캐시 입력 $0.025 / 출력 $2.00 (1M tokens). 모델은 변경하지 않았습니다.</p><pre>'''+esc(json.dumps(stats,ensure_ascii=False,indent=2))+'</pre>'+''.join(sections)+'</html>'
(OUT/'blind-40-preflight.html').write_text(doc,encoding='utf-8')
print(json.dumps(stats,ensure_ascii=False,indent=2))
