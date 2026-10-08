"""Saved first responses only. Human policy audit never repairs or feeds the engine."""
import hashlib
import html
import json
import sys
from collections import Counter
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
import choice_meaning as cm
import frozen_writer as fw
OUT=ROOT.parent/'low-confidence-safety-20261006'
def read(p):return json.loads(p.read_text(encoding='utf-8'))
ledger=read(OUT/'blind-40-ledger.json')
cases=read(ROOT/'tests/fixtures/blind-40-20261007.json')
audit=read(OUT/'blind-40-policy-audit.json')
lock=read(OUT/'blind-40-lock.json')
assert hashlib.sha256((ROOT/'tests/fixtures/blind-40-20261007.json').read_bytes()).hexdigest()==lock['dataset_sha256']
for name,digest in lock['protected_source_hashes'].items():
    assert hashlib.sha256((ROOT/name).read_bytes()).hexdigest()==digest
source_lines=Path(cm.__file__).read_text(encoding='utf-8').splitlines()
rows=[]
for f in cases:
    key=f['id'];r=ledger['rows'].get(key,{'status':'not-run'})
    record=ledger['requests'].get(key+':semantic',{})
    raw=record.get('content',{})
    policy=audit['rows'].get(key)
    if raw:assert policy is not None,key
    validation={}
    if raw:
        line=[]
        def trace(frame,event,arg):
            if frame.f_code.co_filename==cm.__file__ and frame.f_code.co_name=='validate' and event=='return' and arg is False:line.append(frame.f_lineno)
            return trace
        try:
            data={'question':f['q'],'a':f['a'],'b':f['b']}
            meaning,_=cm.normalize(raw['meaning'],data)
            sys.settrace(trace);ready=cm.validate(meaning,data);sys.settrace(None)
            validation={'ready':ready,'false_at_lines':line}
        except Exception as e:
            sys.settrace(None);validation={'error':str(e),'type':type(e).__name__}
    generated=r.get('status')=='generated'
    adopted=bool(generated and policy and not policy['final_meaning_error'] and not policy['why_false']
                 and policy['future_pass'] and policy['capture_pass']
                 and not any(r.get('auto',{}).values()))
    rows.append({'case':f,'run':r,'raw_semantic':raw,'validation':validation,'policy':policy,
                 'adoptable':adopted,'expected_confirmation_success':bool(f.get('expected_unknown') and r.get('status')=='confirmation')})
generated=[r for r in rows if r['run'].get('status')=='generated']
semantics=[r for r in rows if r['raw_semantic']]
normal=[r for r in semantics if not r['case'].get('expected_unknown')]
usages=[r['usage'] for r in ledger['requests'].values() if r.get('usage')]
outputs=[r['run']['output'] for r in generated]
engine_rows=[{**r['run']['engine'],'index':r['run']['index']} for r in generated]
repeats=fw.metrics(outputs,engine_rows) if outputs else None
stats={'total':40,'status_counts':dict(Counter(r['run']['status'] for r in rows)),
 'semantic_response_count':len(semantics),'generated_count':len(generated),
 'raw_semantic_or_axis_errors':sum(bool(r['policy']['raw_meaning_error']) for r in semantics),
 'adopted_engine_meaning_errors':sum(bool(r['policy']['final_meaning_error']) for r in generated),
 'unnecessary_confirmation':sum(r['run']['status']=='confirmation' for r in normal),
 'normal_semantic_denominator':len(normal),
 'why_false':sum(r['policy']['why_false'] for r in generated),
 'future_pass':sum(r['policy']['future_pass'] and not r['run']['auto']['future'] for r in generated),
 'capture_pass':sum(r['policy']['capture_pass'] and not r['run']['auto']['capture'] for r in generated),
 'automatic_future_pass':sum(not r['run']['auto']['future'] for r in generated),
 'automatic_capture_pass':sum(not r['run']['auto']['capture'] for r in generated),
 'future_capture_overlap':sum(r['policy']['future_capture_overlap'] for r in generated),
 'role_overlap':sum(r['policy']['role_overlap'] for r in generated),
 'adoptable_results':sum(r['adoptable'] for r in rows),
 'adoptable_without_role_overlap':sum(r['adoptable'] and not r['policy']['role_overlap'] for r in generated),
 'correct_unknown_confirmation':sum(r['expected_confirmation_success'] for r in rows),
 'request_attempts':len(ledger['requests']),
 'api_responses_with_usage':len(usages),
 'provider_semantic_calls':sum(k.endswith(':semantic') and bool(v.get('usage')) for k,v in ledger['requests'].items()),
 'provider_writer_calls':sum(k.endswith(':writer') and bool(v.get('usage')) for k,v in ledger['requests'].items()),
 'local_proxy_failures':sum(bool(r.get('settlement')) for r in ledger['requests'].values()),
 'input_tokens':sum(u['input_tokens'] for u in usages),'cached_input_tokens':sum(u.get('input_tokens_details',{}).get('cached_tokens',0) for u in usages),
 'output_tokens':sum(u['output_tokens'] for u in usages),'cost_usd':sum(fw.cost(u) for u in usages),
 'charged_or_reserved_usd':sum(r['charged_or_reserved'] for r in ledger['requests'].values()),
 'repetition':repeats,'frozen_hashes_unchanged':True}
assert stats['charged_or_reserved_usd']<=.10
result={'stats':stats,'audit_method':audit['method'],'rows':rows}
(OUT/'blind-40-final.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
esc=lambda s:html.escape(str(s))
sections=[]
for r in rows:
    f=r['case'];run=r['run'];p=r['policy'];engine=run.get('engine',{})
    final=run.get('output')
    verdict='채택 가능' if r['adoptable'] else '정상 조어 확인' if r['expected_confirmation_success'] else 'FAIL / 결과 없음'
    lines=''.join(f'<h4>{k} · {esc(run.get("sources",{}).get(k,"미생성"))}</h4><p>{esc(final.get(k))}</p>' for k in ('why','future','capture')) if final else '<p>WHY/FUTURE/CAPTURE: 생성되지 않음. 기존 결과로 대체하거나 수동 repair하지 않았습니다.</p>'
    sections.append(f'<section><h2>{f["id"]}. {esc(f["q"])}</h2><p>A: {esc(f["a"])}<br>B: {esc(f["b"])}</p><p>경로: {esc(run.get("route",run["status"]))} · 상태: {run["status"]} · 판정: {verdict}</p><p>winner: {esc(engine.get("winner","없음"))} · score: {esc(engine.get("score","없음"))}</p>{lines}<h3>자동 검사 / 정책 검토</h3><pre>{esc(json.dumps({"automatic":run.get("auto"),"policy":p,"validation":r["validation"]},ensure_ascii=False,indent=2))}</pre><details><summary>실제 의미·canonical 원응답·채택 축·점수 근거</summary><pre>{esc(json.dumps({"raw_semantic":r["raw_semantic"],"engine":engine},ensure_ascii=False,indent=2))}</pre></details></section>')
doc='''<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>블라인드 40건 첫 응답 검증</title><style>body{max-width:1150px;margin:24px auto;padding:0 20px;font:16px/1.65 sans-serif;color:#222}h1{font-size:26px}h2{font-size:21px}h3{font-size:18px}section{border-top:1px solid #aaa;padding:20px 0}p,pre{white-space:pre-wrap;overflow-wrap:anywhere}pre{background:#f4f5f5;padding:12px}h4{margin-bottom:4px}</style><h1>동결 블라인드 40건 · 첫 응답 검증</h1><p>2026-10-07. 같은 40건, 같은 엔진/renderer. 자동 재호출·수동 repair·질문 교체 없음. 앱 연결/main merge/배포/push 없음.</p><p>B01~B09는 로컬 프록시 127.0.0.1:9 연결 거부로 기술 실패했습니다. 재시도하지 않았고 40건 분모에서 제외하지 않았습니다. 비용 예약은 연결 진단 증거로 해제했으며 최초 실패 원장도 별도 보존했습니다. 과금 토큰이 반환된 응답만 비용을 계산합니다. 청구서 확정액은 아닙니다.</p><p>정책 검토는 Codex가 원문을 읽은 평가이며 자동 검증기 성능과 구분합니다. 자동 검사 통과만으로 의미나 현실 근거가 안전하다고 보지 않습니다. semantic 원응답의 오해와 실제 점수에 채택된 오해도 따로 셉니다. 확인 경로는 사용자에게 결과 문장을 생성한 성공과 별도입니다.</p><p>표현/겹침 지표의 분모는 실제 생성 결과 수입니다. 전체 채택 가능률 분모는 40건을 유지합니다. 의미 평가에서는 응답을 받지 못한 9건을 평가불가로 남깁니다. 기존 모델 요청은 이유 필드까지 반환하지만 자유 생성 이유는 버리고 로컬 WHY만 사용했습니다.</p><pre>'''+esc(json.dumps(stats,ensure_ascii=False,indent=2))+'</pre>'+''.join(sections)+'</html>'
doc=doc.replace('<pre>'+esc(json.dumps(stats,ensure_ascii=False,indent=2)),
    '<p>영역별 정책과 의미/WHY가 통과한 결과 2/40건도 소재 중복이 남습니다. 역할 중복까지 없는 엄격한 최종 채택은 0/40건입니다. 조어 정상 확인 3건은 결과 문장 채택률에 합산하지 않습니다.</p><pre>'+esc(json.dumps(stats,ensure_ascii=False,indent=2)))
(OUT/'blind-40-final.html').write_text(doc,encoding='utf-8')
print(json.dumps(stats,ensure_ascii=False,indent=2))
