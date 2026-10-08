"""Post-generation evaluation only; these reviews never enter any API prompt."""
import html
import json
from pathlib import Path
from writer_model_compare import OUT, PLAN, COUNTS, LEDGER, read, save, sha, costs
from blind_live import automatic

# Future pass, capture pass, material overlap, role overlap, reality claim.
REVIEWS = {
 'B10':(True,True,True,True,False,'FUTURE의 옷걸이 소풍은 허용 가능한 상상. CAPTURE도 의인화 드립으로 단독 통과하지만, 단체 소풍/철새 떼 이사의 집단 이동 비유가 겹친다.'),
 'B11':(True,True,False,False,False,'반납 뒤 서랍의 조개껍데기 장면과 장비 명단의 체크아웃 도장이 다른 소재. 해변 소품은 창작 허용 범위이며 대여의 현실적 장점이나 타인 반응을 보장하지 않는다.'),
 'B15':(True,False,True,True,False,'회의록 요정이라는 자기 장면은 허용. CAPTURE의 말풍선 줄 맞추기는 표처럼 의견 정리한 장면을 재서술하므로 별도 punchline 역할 부족.'),
 'B16':(True,False,False,False,False,'사진처럼 단체방 구석에 붙어 있는 자기 비유는 허용. CAPTURE는 엄지손가락을 큐레이터로 이름 붙인 명사구 라벨에서 끝나며 별도 한 방이 부족.'),
 'B17':(True,False,True,True,False,'체크박스 출석 도장이라는 자기 장면은 허용하나 다소 작위적. CAPTURE도 설명을 칸에 정리한 상황의 재서술이며 서랍 정리한 척이라는 불완전한 명사구로 끝난다.'),
 'B19':(True,True,True,True,False,'커서 퇴근과 완벽주의 임시휴업은 가상 의인화로 허용. 다만 두 영역 모두 전송 후 퇴근/업무 종료 비유라 독립 소재 조건은 미달. 완벽주의는 농담으로 읽었으며 사용자 성격의 사실적 진단으로 채택한 것이 아니다.'),
 'B22':(True,True,False,False,False,'운동화에 초대장 보내는 상상과 소파의 스카우트 제안을 거절하는 반전이 분리된다. 친구가 어떻게 반응한다고 단정하지 않는다.'),
 'B24':(True,True,False,False,False,'공연 후 혼자 후렴/앙코르하는 장면과 퇴장 버튼 비유는 다른 각도. CAPTURE는 두 바퀴라는 선택 수단을 다시 언급하지만 퇴장 버튼으로 전환한 드립으로 통과; 참신성은 보통.'),
 'B27':(True,True,True,True,False,'가방을 퇴근시키는 장면과 숟가락 마침표 모두 단독으로는 허용. 그러나 두 영역 모두 일과 종료를 의인화한 같은 마무리 장치라 소재/역할 중복.'),
 'B29':(True,True,False,False,False,'지우개 가루 설산과 연필의 카메라 행세는 그림이라는 동일 맥락 안에서 서로 다른 소품/장치. 후자는 실제 성능 보장이 아닌 명시적 비유라 허용.'),
}

# [Future naturalness, Capture naturalness, Future humor, Capture humor], 1..5.
RATINGS = {
 'B10':[4,4,3,3], 'B11':[4,4,3,3], 'B15':[4,4,3,3], 'B16':[4,4,3,3],
 'B17':[3,2,2,2], 'B19':[4,4,3,3], 'B22':[4,4,3,4], 'B24':[5,4,4,3],
 'B27':[4,4,3,3], 'B29':[4,4,3,3],
}


def adoption(review):
    return (review['future_pass'] and review['capture_pass'] and
            not any(review[k] for k in ('future_capture_overlap','role_overlap','unverified_reality_claim')))


def aggregate(rows, name):
    fields=('future_pass','capture_pass','future_capture_overlap','role_overlap','unverified_reality_claim')
    totals={k:sum(bool(r[name]['review'][k]) for r in rows) for k in fields}
    totals['adoptable']=sum(adoption(r[name]['review']) for r in rows)
    totals['qualitative_means']={k:sum(r[name]['ratings'][i] for r in rows)/len(rows)
        for i,k in enumerate(('future_naturalness','capture_naturalness','future_humor','capture_humor'))}
    return totals


def main():
    p,s=read(PLAN),read(LEDGER)
    assert s['status']=='finished' and len(s['requests'])==10
    assert all(sha(Path(k))==v for k,v in s['protected'].items())
    oldratings={r['id']:r['qualitative_ratings']['single'] for r in read(OUT/'split-writer-pilot-report.json')['rows']}
    rows=[]
    for e in p['entries']:
        r=e['row'];rec=s['requests'][e['id']];d=rec['content']
        assert rec['status']=='completed' and set(d)=={'future','capture'}
        assert rec['request']==e['request'] and rec['raw']['model']==p['model']
        flags=automatic(d,r);f,c,material,roles,reality,note=REVIEWS[r['id']]
        newreview={'future_pass':f and not flags['future'],'capture_pass':c and not flags['capture'],
            'future_capture_overlap':material,'role_overlap':roles,'unverified_reality_claim':reality,'note':note}
        rows.append({k:r[k] for k in ('id','question','a','b','score_source','winner','score','why')} | {
            'single':{'future':r['future'],'capture':r['capture'],'review':r['review'],'ratings':oldratings[r['id']]},
            'sol':d|{'review':newreview,'ratings':RATINGS[r['id']],'automatic':flags},
            'request_input':json.loads(rec['request']['input']), 'usage':rec['usage']})
    usages=[v['usage'] for v in s['requests'].values()]
    current=aggregate(rows,'sol')
    success=(current['future_pass']>=9 and current['capture_pass']>=8 and
        current['future_capture_overlap']<=2 and current['role_overlap']<=2 and current['unverified_reality_claim']==0)
    stats={'single_saved':aggregate(rows,'single'),'sol':current,'success_criteria_met':success,
        'new_generation_calls':10,'old_model_calls':0,'semantic_calls':0,'retries':0,'count_only_calls':10,
        'input_tokens':sum(u['input_tokens'] for u in usages),'output_tokens':sum(u['output_tokens'] for u in usages),
        'reasoning_tokens':sum(u.get('output_tokens_details',{}).get('reasoning_tokens',0) for u in usages),
        'cache_write_tokens':sum(u.get('input_tokens_details',{}).get('cache_write_tokens',0) for u in usages),
        'cached_tokens':sum(u.get('input_tokens_details',{}).get('cached_tokens',0) for u in usages),
        'calculated_generation_cost_usd':sum(costs(u)['standard_usd'] for u in usages),
        'budget_accounting_conservative_usd':sum(v['charged_or_reserved'] for v in s['requests'].values()),
        'preflight_expected_usd':read(COUNTS)['expected_cost'],'cap_usd':p['cap'],
        'automatic_format_pass':sum(not any(r['sol']['automatic'].values()) for r in rows),
        'frozen_hashes_unchanged':True}
    method=('Same saved single-call prompt, inputs, schema and 650-token output cap. Only model and supported '
        'reasoning effort differ (gpt-5-mini minimal vs gpt-5.6-sol none). Old responses reused, not rerun. '
        'Existing role policy and old case evaluations retained. New raw outputs reviewed directly by Codex; '
        'not a blind independent human panel or user evaluation. No prompt tuning or manual repair.')
    caveats=('Ten selected development cases, not population-level generalization. Input remains the existing '
        'original-option verified projection, not enriched semantic text. Better naturalness does not establish '
        'model capability as the only bottleneck. Ratings 1..5 are subjective. Overlap includes joke mechanism, '
        'not just exact repeated nouns; same question topic alone is not overlap. Field pass and cross-field '
        'overlap are reported separately. Count-only requests are separate from generation usage; calculated '
        'generation cost uses official rates and returned usage, not a billing invoice.')
    report={'status':'PASS' if success else 'FAILED_TARGETS_NO_MORE_TUNING','method':method,
            'caveats':caveats,'stats':stats,'rows':rows}
    save(OUT/'writer-model-comparison-report.json',report)
    esc=lambda v:html.escape(str(v))
    sections=[]
    for r in rows:
        cols=[]
        for name,label in [('single','기존 GPT-5 mini · 저장본'),('sol','GPT-5.6 Sol · 새 첫 응답')]:
            d=r[name];review=d['review']
            cols.append('<article><h3>'+label+'</h3><h4>FUTURE</h4><p>'+esc(d['future'])+
                '</p><h4>CAPTURE</h4><p>'+esc(d['capture'])+'</p><p>미래 '+('PASS' if review['future_pass'] else 'FAIL')+
                ' / 캡처 '+('PASS' if review['capture_pass'] else 'FAIL')+' / 최종 '+('채택 가능' if adoption(review) else '미달')+
                '</p><p>소재 중복 '+str(int(review['future_capture_overlap']))+' · 역할 중복 '+str(int(review['role_overlap']))+
                ' · 현실 주장 '+str(int(review['unverified_reality_claim']))+'</p><p>'+esc(review['note'])+
                '</p><p>평점 [미래 자연스러움, 캡처 자연스러움, 미래 재미, 캡처 재미]: '+esc(d['ratings'])+'</p></article>')
        sections.append('<section><h2>'+r['id']+' · '+esc(r['question'])+'</h2><p>A: '+esc(r['a'])+'<br>B: '+esc(r['b'])+
            '</p><p>'+r['score_source']+' · 승자 '+esc(r['winner'])+' · 놀이 점수 '+str(r['score'])+':'+str(100-r['score'])+
            '</p><p>동결 WHY: '+esc(r['why'])+'</p><div class="compare">'+''.join(cols)+'</div><details><summary>동일 Writer 입력</summary><pre>'+
            esc(json.dumps(r['request_input'],ensure_ascii=False,indent=2))+'</pre></details></section>')
    labels={'future_pass':'FUTURE 통과','capture_pass':'CAPTURE 통과','future_capture_overlap':'소재 중복',
            'role_overlap':'역할 중복','unverified_reality_claim':'미확인 현실 주장','adoptable':'전체 채택 가능'}
    table='<table><thead><tr><th>항목</th><th>기존 mini</th><th>Sol</th></tr></thead><tbody>'+''.join(
        '<tr><td>'+label+'</td><td>'+str(stats['single_saved'][k])+'/10</td><td>'+str(stats['sol'][k])+'/10</td></tr>' for k,label in labels.items())+'</tbody></table>'
    doc='<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Writer 모델 비교 10건</title><style>body{max-width:1300px;margin:24px auto;padding:0 18px;font:16px/1.65 sans-serif;color:#202020}h1{font-size:26px}h2{font-size:20px}h3{font-size:18px}section{border-top:1px solid #aaa;padding:18px 0}.compare{display:grid;grid-template-columns:1fr 1fr;gap:26px}article{min-width:0}p,pre{overflow-wrap:anywhere}pre{white-space:pre-wrap;background:#f5f5f5;padding:12px;font-size:13px}table{border-collapse:collapse}td,th{padding:8px 18px;border-bottom:1px solid #bbb;text-align:left}@media(max-width:750px){.compare{grid-template-columns:1fr}}</style><h1>동일 단일 Writer 계약: GPT-5 mini vs GPT-5.6 Sol</h1><p>결론: '+('기준 충족' if success else '목표 미달. 추가 미세조정·확대 호출 없음.')+'</p><p>동일 10건, 동일 프롬프트·입력·JSON 계약·출력 상한 650. 변경은 모델과 reasoning 설정(minimal → none)뿐입니다. 기존 모델 0호출, Sol 10호출, 재시도 0. 의미·축·승자·점수·WHY는 해시로 보존 확인.</p><p>자동 형식 통과와 실제 정책 통과는 다릅니다. 새 출력 원문을 Codex가 직접 읽어 평가했으며 독립 사용자 평가가 아닙니다. 단독 문장의 통과와 두 영역 간 소재/반전 중복을 별도로 표시합니다. 기존 기준선 판정은 그대로 유지했습니다.</p><p>주의: 선택된 개발 사례 10건의 탐색 결과입니다. 모델만이 유일한 병목이라는 인과 결론이나 출시 품질을 입증하지 않습니다. 입력 의미는 기존 선택지 원문 투영을 그대로 유지했습니다. 아래 출력은 수정하지 않은 원응답입니다.</p>'+table+'<pre>'+esc(json.dumps(stats,ensure_ascii=False,indent=2))+'</pre><p>요금: <a href="https://developers.openai.com/api/docs/models/gpt-5.6-sol">공식 모델 문서</a>. 반환 usage 기준 계산이며 청구서 대조는 하지 않았습니다. 캐시 쓰기/읽기 0토큰. 토큰 계산용 요청 10회는 생성 요청 10회와 구분합니다.</p>'+''.join(sections)+'</html>'
    (OUT/'writer-model-comparison-report.html').write_text(doc,encoding='utf-8')
    print(json.dumps(stats,ensure_ascii=False,indent=2))


if __name__=='__main__':main()
