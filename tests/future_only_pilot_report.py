"""Read-only first-response evaluation; no review data is used for generation."""
import html
import json
from future_only_pilot import OUT, PLAN, COUNTS, LEDGER, read, save, verify, check_future

# PASS, reality claim, physical incoherence, other-person claim, naturalness,
# humor, note. Ratings are Codex reading, not independent user evaluation.
REVIEWS={
 'B10':(True,False,False,False,4,3,'옷장 앞에서 문을 닫는 자기 행동에 옷걸이 회의라는 명시적 의인화를 붙였다. 물건이 실제 회의를 한다는 주장으로 보지 않으며 타인 반응을 만들지 않는다.'),
 'B11':(True,False,False,False,4,3,'반납 뒤 빈 가방에 조개껍데기를 넣는 여행 후 장면. 조개껍데기 입주는 비유이며 실제 여행지가 바다라는 사실을 판단 근거로 주장하지 않는다.'),
 'B15':(False,False,False,False,4,2,'의견을 모아 목차를 세웠다는 문장은 선택한 정리 행동의 비유적 재서술이다. 그 뒤의 구체적 장면이나 작은 자기합리화가 없어 FUTURE 역할 미달. 문법과 안전성은 통과하지만 원응답 그대로 FAIL.'),
 'B16':(True,False,False,False,5,4,'사진을 보낸 뒤 남은 사진을 감독판이라고 우기는 자기합리화가 있다. 가족의 반응을 예측하지 않고 선택 행동 뒤의 별도 반전이 확보됐다.'),
 'B17':(True,False,False,False,3,2,'전송 후 문서 요정인 척하는 상상은 허용. 다만 나를 보며/척한다는 자기 관찰 표현이 작위적이고 재미는 약하다. 정책 PASS와 강한 재미를 구분한다.'),
 'B19':(True,False,False,False,4,2,'공유 뒤 의자에 기대는 자기 장면은 성립한다. 오늘치 마침표는 은유이며 타인의 의견이나 업무 효과를 보장하지 않는다. 자연스럽지만 드립의 강도는 낮다.'),
 'B22':(True,False,False,False,4,3,'운동화 끈을 묶으며 소파의 스카우트를 거절하는 의인화된 자기 장면. 친구가 무엇을 하거나 사용자의 운동 효과가 어떨지 단정하지 않는다.'),
 'B24':(True,False,False,False,4,3,'자전거를 타며 공연 앙코르를 혼자 재연하는 장면. 이전 후렴/흥얼대기 문장보다 구체성은 약하지만 물리적으로 불가능한 동작이나 교통 효과를 추가하지 않는다.'),
 'B27':(True,False,False,False,5,4,'오후 업무 뒤 식당에서 메뉴판 읽기를 마지막 업무라고 우기는 장면. 시점과 승자가 유지되며 가격·대기시간·맛 같은 현실 장점을 만들지 않는다.'),
 'B29':(True,False,False,False,5,4,'사진 옆에서 그림을 그리다 삐끗한 선을 추상화라고 우기는 작은 자기합리화. 물리적으로 가능한 장면이며 실제 실력·만족도나 타인 평가를 보장하지 않는다.'),
}


def main():
    p,s=read(PLAN),read(LEDGER);counts=read(COUNTS)
    assert s['status']=='finished' and len(s['requests'])==10
    verify(s['protected'])
    rows=[]
    for e in p['entries']:
        r=e['row'];rec=s['requests'][e['id']]
        assert rec['status']=='completed' and rec['request']==e['request']
        assert rec['raw']['model']=='gpt-5.6-sol'
        assert rec['request']['input']==json.dumps(r['request_input'],ensure_ascii=False)
        assert set(rec['content'])=={'future'}
        flags=check_future(rec['content'],r)
        passed,reality,physical,others,natural,humor,note=REVIEWS[r['id']]
        rows.append({k:r[k] for k in ('id','question','a','b','score_source','winner','score','why')} | {
            'request_input':r['request_input'],
            'combined_baseline':{'future':r['sol']['future'],'pass':r['sol']['review']['future_pass'],
                'naturalness':r['sol']['ratings'][0],'humor':r['sol']['ratings'][2],
                'source':'SAVED_SOL_COMBINED_FIRST_RESPONSE','usage':e['baseline_usage']},
            'future_only':{'future':rec['content']['future'],'pass':passed and not flags,
                'unverified_reality_claim':reality,'physical_incoherence':physical,'other_people_claim':others,
                'naturalness':natural,'humor':humor,'review_note':note,'automatic':flags,
                'source':'SOL_FUTURE_ONLY_FIRST_RESPONSE','usage':rec['usage']}})
    n=len(rows)
    prior={'future_pass':sum(r['combined_baseline']['pass'] for r in rows),
        'naturalness_mean':sum(r['combined_baseline']['naturalness'] for r in rows)/n,
        'humor_mean':sum(r['combined_baseline']['humor'] for r in rows)/n}
    current={k:sum(bool(r['future_only'][k]) for r in rows) for k in
             ('pass','unverified_reality_claim','physical_incoherence','other_people_claim')}
    current['naturalness_mean']=sum(r['future_only']['naturalness'] for r in rows)/n
    current['humor_mean']=sum(r['future_only']['humor'] for r in rows)/n
    current['automatic_format_pass']=sum(not r['future_only']['automatic'] for r in rows)
    success=(current['pass']>=9 and not any(current[k] for k in
        ('unverified_reality_claim','physical_incoherence','other_people_claim')))
    usage=[rec['usage'] for rec in s['requests'].values()]
    oldstats=read(OUT/'writer-model-comparison-report.json')['stats']
    price=sum(rec['cost']['calculated_usd'] for rec in s['requests'].values())
    stats={'combined_baseline':prior,'future_only':current,'targets_met':success,
        'new_generation_calls':10,'completed':10,'semantic_calls':0,'capture_generations':0,
        'baseline_recalls':0,'retries':0,'count_only_requests':len(counts['requests']),
        'input_tokens':sum(u['input_tokens'] for u in usage),'output_tokens':sum(u['output_tokens'] for u in usage),
        'reasoning_tokens':sum(u.get('output_tokens_details',{}).get('reasoning_tokens',0) for u in usage),
        'cached_tokens':sum(u.get('input_tokens_details',{}).get('cached_tokens',0) for u in usage),
        'cache_write_tokens':sum(u.get('input_tokens_details',{}).get('cache_write_tokens',0) for u in usage),
        'generation_cost_usd':price,'budget_accounting_usd':sum(rec['charged_or_reserved'] for rec in s['requests'].values()),
        'expected_cost_usd':counts['expected_cost_usd'],'safety_cap_usd':p['cap'],
        'prior_combined_cost_usd':oldstats['calculated_generation_cost_usd'],
        'observed_cost_reduction_percent':100*(1-price/oldstats['calculated_generation_cost_usd']),
        'frozen_hashes_unchanged':True}
    report={'status':'PASS_CANDIDATE_ONLY' if success else 'FAIL_FUTURE_CONTRACT',
        'method':'Same ten cases and exact input strings. Same Sol none setting and 650-token cap. Only CAPTURE instruction block/return field removed. First responses, no repair. Automatic format checks plus Codex direct reading, not independent human evaluation.',
        'limits':'Selected development cases, one sample each. No significance or population quality claim. Baseline FUTURE 10/10 vs current 9/10 does not establish improvement. No app integration; B15 remains failed. Fictional metaphors are not treated as literal factual assertions.',
        'stats':stats,'rows':rows}
    save(OUT/'future-only-pilot-report.json',report)
    esc=lambda v:html.escape(str(v))
    parts=[]
    for r in rows:
        old,new=r['combined_baseline'],r['future_only']
        parts.append('<section><h2>'+r['id']+' · '+esc(r['question'])+'</h2><p>A: '+esc(r['a'])+'<br>B: '+esc(r['b'])+
            '</p><p>'+esc(r['score_source'])+' · 승자 '+esc(r['winner'])+' · 놀이 점수 '+str(r['score'])+':'+str(100-r['score'])+
            '</p><p>동결 WHY: '+esc(r['why'])+'</p><div class="compare"><article><h3>기존 Sol FUTURE+CAPTURE 계약의 FUTURE</h3><p>'+esc(old['future'])+
            '</p><p>'+('PASS' if old['pass'] else 'FAIL')+' · 자연스러움 '+str(old['naturalness'])+'/5 · 재미 '+str(old['humor'])+'/5</p></article>'+
            '<article><h3>Sol FUTURE 단독 계약</h3><p>'+esc(new['future'])+'</p><p><strong>'+('PASS' if new['pass'] else 'FAIL')+'</strong> · 자연스러움 '+
            str(new['naturalness'])+'/5 · 재미 '+str(new['humor'])+'/5</p><p>미확인 현실 주장 '+str(int(new['unverified_reality_claim']))+' · 물리적 부자연스러움 '+
            str(int(new['physical_incoherence']))+' · 타인 행동 단정 '+str(int(new['other_people_claim']))+'</p><p>'+esc(new['review_note'])+
            '</p></article></div><details><summary>변경 없는 Writer 입력</summary><pre>'+esc(json.dumps(r['request_input'],ensure_ascii=False,indent=2))+'</pre></details></section>')
    title='FUTURE 단독 계약: 동일 Sol 10건 검증'
    doc='<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+title+'</title><style>body{max-width:1300px;margin:24px auto;padding:0 18px;font:16px/1.65 sans-serif;color:#222}h1{font-size:26px}h2{font-size:20px}h3{font-size:18px}section{border-top:1px solid #aaa;padding:18px 0}.compare{display:grid;grid-template-columns:1fr 1fr;gap:26px}article{min-width:0}p,pre{overflow-wrap:anywhere}pre{white-space:pre-wrap;background:#f5f5f5;padding:12px;font-size:13px}@media(max-width:750px){.compare{grid-template-columns:1fr}}</style><h1>'+title+'</h1><p><strong>'+('후보 구조 기준 충족. 앱 연결은 하지 않음.' if success else '목표 미달. CAPTURE 복구 없이 FUTURE만 검토.')+'</strong></p><p>변경은 CAPTURE 지시·출력 필드 제거뿐입니다. 질문/A/B/의미/승자 입력, Sol none, 출력 상한 650은 기존과 동일합니다. semantic/canonical/PURE_PLAY/VERIFIED_SEMANTIC/winner/score/WHY와 기존 결과 파일은 해시로 보존 확인했습니다.</p><p>10건 첫 응답을 수정 없이 비교합니다. 형식 검사와 정책 판정은 별개입니다. 직접 읽기·자연스러움·재미 평가는 Codex의 주관적 평가이며 독립 사용자 평가가 아닙니다. 1점 매우 어색/재미 없음, 3점 이해 가능/약한 재미, 5점 매우 자연스러움/공유하고 싶은 재미.</p><p>현재 9/10은 기존 10/10보다 1건 낮습니다. B15는 선택 행동 재서술이라 FAIL로 유지합니다. 미확인 현실 주장·타인 행동·물리적 오류는 발견되지 않았습니다. 비유와 의인화는 허용 가능한 가상 장면으로 평가했습니다. 개발 사례 10건의 단회 결과이며 일반화나 출시 안전성을 보증하지 않습니다.</p><p>비용은 반환 usage와 <a href="https://developers.openai.com/api/docs/models/gpt-5.6-sol">공식 Sol 요금</a>으로 계산했습니다. 실제 청구서 대조는 하지 않았습니다. 과거 합산 계약 비용과 이번 FUTURE 단독 비용 비교이며 FUTURE 자체의 과거 비용을 따로 분리한 것은 아닙니다.</p><pre>'+esc(json.dumps(stats,ensure_ascii=False,indent=2))+'</pre>'+''.join(parts)+'</html>'
    (OUT/'future-only-pilot-report.html').write_text(doc,encoding='utf-8')
    print(json.dumps(stats,ensure_ascii=False,indent=2))


if __name__=='__main__':main()
