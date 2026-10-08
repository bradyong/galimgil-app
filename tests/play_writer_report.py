"""Descriptive policy review only. Never fed into prompts, scores or selection."""
import html
import json
from collections import Counter
from play_writer_validation import OUT, read, save, frozen
from frozen_writer import repeat_metric

def main():
    rows=read(OUT/'play-writer-output.json')['rows']
    old=read(OUT/'blind-40-policy-audit.json')['rows']
    ledger=read(OUT/'play-writer-ledger.json')
    assert ledger['frozen']==frozen()
    for r in rows:
        available=bool(r['future'] and r['capture'])
        r['sources']={'why':'LOCAL_PURE_PLAY_VARIANT' if r['score_source']=='PURE_PLAY' else 'LOCAL_GROUNDED_UNCHANGED',
            'future':r['writer_source'] if available else 'NOT_GENERATED_NETWORK_FAILURE',
            'capture':r['writer_source'] if available else 'NOT_GENERATED_NETWORK_FAILURE'}
        if available:
            p=old[r['id']]
            r['review']={'why_false':False,'future_pass':p['future_pass'] and not r['automatic']['future'],
                'capture_pass':p['capture_pass'] and not r['automatic']['capture'],
                'future_capture_overlap':p['future_capture_overlap'],
                'role_overlap':p['role_overlap'],
                'note':p['note'],
                'review_scope':'Same saved future/capture and winner re-read; old semantic/WHY comments in note are historical, not applied to new WHY.'}
            r['adoptable_without_overlap']=bool(r['review']['future_pass'] and r['review']['capture_pass'] and not r['review']['role_overlap'])
        else:
            r['review']=None;r['adoptable_without_overlap']=False
    available=[r for r in rows if r['review']]
    pure=[r for r in rows if r['score_source']=='PURE_PLAY']
    patterns=Counter(r['why_pattern'] for r in pure)
    metric=repeat_metric([r['why'] for r in pure],[{**r,'index':r['id']} for r in pure])
    usages=[v['usage'] for v in ledger['requests'].values() if v.get('usage')]
    stats={'cases':28,'completed_outputs':len(available),'unavailable':28-len(available),
        'why_false_manual_review':0,'pure_why_patterns_used':len(patterns),
        'pure_why_pattern_counts':dict(patterns),'pure_why_repeat_excess':25-len(patterns),
        'pure_why_repeat_excess_rate':(25-len(patterns))/25,'why_similarity_proxy':metric,
        'future_pass':sum(r['review']['future_pass'] for r in available),
        'capture_pass':sum(r['review']['capture_pass'] for r in available),
        'future_capture_overlap':sum(r['review']['future_capture_overlap'] for r in available),
        'role_overlap':sum(r['review']['role_overlap'] for r in available),
        'quality_denominator':len(available),
        'unverified_reality_claim_cases':['B13','B35'],
        'unverified_reality_claim_note':'B13: third-party action/timing asserted; B35: generic benefit claim/lesson. Conservative policy flags, not new factual verification.',
        'adoptable_field_policies':sum(r['review']['future_pass'] and r['review']['capture_pass'] for r in available),
        'adoptable_without_overlap':sum(r['adoptable_without_overlap'] for r in rows),
        'overall_denominator':28,'attempts':len(ledger['requests']),'responses_with_usage':len(usages),
        'returned_input_tokens':sum(u.get('input_tokens',0) for u in usages),
        'returned_output_tokens':sum(u.get('output_tokens',0) for u in usages),
        'usage_based_cost_usd':0,'billing_confirmed':False,
        'charged_or_reserved':sum(v['charged_or_reserved'] for v in ledger['requests'].values()),
        'score_winner_and_engines_unchanged':True}
    report={'status':'INCOMPLETE_NETWORK_FAILURE; not a successful 28-case Writer evaluation',
        'evaluation_method':'Re-read nine available cached pairs under current roles. Quality percentages use 9; coverage/overall acceptance uses 28. Missing 19 are not model quality failures or passes. No retries or manual repair.',
        'network_diagnostic':'19 requests logged URLError. Subsequent unauthenticated non-generation HEAD to api.openai.com failed with Errno 11001 getaddrinfo failed. No provider responses or usage returned.',
        'stats':stats,'rows':rows}
    save(OUT/'play-writer-report.json',report)
    esc=lambda v:html.escape(str(v))
    parts=[]
    for r in rows:
        fields=''.join(f'<h3>{name.upper()} · {esc(r["sources"][name])}</h3><p>{esc(r.get(name) or "미생성: 네트워크 실패, 재호출 안 함")}</p>' for name in ('why','future','capture'))
        parts.append(f'<section><h2>{r["id"]} {esc(r["question"])}</h2><p>A: {esc(r["a"])}<br>B: {esc(r["b"])}</p><p>{r["score_source"]} · {esc(r["winner"])} · {r["score"]}:{100-r["score"]}</p>{fields}<details><summary>평가 / 보존된 응답 검토</summary><pre>{esc(json.dumps(r["review"],ensure_ascii=False,indent=2))}</pre></details></section>')
    doc='<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>28건 Writer 재연결 검증</title><style>body{max-width:1100px;margin:24px auto;padding:0 18px;font:16px/1.65 sans-serif}h1{font-size:26px}h2{font-size:20px}h3{font-size:16px}section{border-top:1px solid #aaa;padding:18px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f5f5f5;padding:12px}</style><h1>출력 검증 · 네트워크 실패로 미완료</h1><p>WHY 28건 로컬 생성. 저장 Writer 9건 재사용. 신규 19건은 URLError로 응답 없음; 별도 비생성 진단에서 DNS 오류 확인. 자동 재호출/샘플 교체/수동 repair 없음. 의미·축·점수·winner 동결. 앱 연결/merge/배포/push 없음.</p><p>정책 통과율·중복률은 출력이 있는 9건을 분모로 사용합니다. 전체 채택률은 28건 분모로 보고하며 미생성 19건은 미평가입니다. 저장 응답 9건은 구형 프롬프트(점수 등 포함)의 결과이므로 새 축소 입력 계약의 성능 증거가 아닙니다. 새 계약의 실제 성공 응답은 0건입니다.</p><p>비용: usage 반환 없음. usage 기준 합계는 0이지만 청구서 확정액은 확인하지 않았습니다. 보수적 비용 예약 $0.0375575는 유지합니다.</p><pre>'+esc(json.dumps(stats,ensure_ascii=False,indent=2))+'</pre>'+''.join(parts)+'</html>'
    (OUT/'play-writer-report.html').write_text(doc,encoding='utf-8')
    print(json.dumps(stats,ensure_ascii=False,indent=2))

if __name__=='__main__':main()
