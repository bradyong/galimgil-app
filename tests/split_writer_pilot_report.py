"""Evaluation records only. Case reviews never enter generation or scoring."""
import html
import json
from pathlib import Path
from split_writer_pilot import OUT,read,save,sha
from blind_live import automatic

# future pass, capture pass, material/role overlap, reality claims, review note.
REVIEWS={
 'B10':(False,False,True,True,False,'FUTURE는 스스로 옷을 골라 입는 장면으로 물리적 정합성 부족. CAPTURE는 상자/개/잠드는 장면을 거의 그대로 요약.'),
 'B11':(False,False,True,True,True,'직원이 달려와 물건을 건네는 타인 행동 추가. CAPTURE도 모래사장/직원 소재 반복이며 빌려 쓰자는 권유까지 추가.'),
 'B15':(False,False,True,True,True,'모두가 답장을 시작한다는 반응 단정. CAPTURE는 버튼/추가 입력/줄서기를 다시 설명.'),
 'B16':(False,False,True,True,True,'이모가 퀴즈를 내고 기다리는 반응 단정. CAPTURE가 같은 단체방 퀴즈를 요약.'),
 'B17':(True,False,True,True,False,'체크리스트를 보며 혼잣말하는 가상 장면은 허용. CAPTURE는 체크리스트/다음은을 반복하고 펜을 물감으로 바꿈.'),
 'B19':(False,False,True,True,True,'동료가 과자를 들고 달려오는 행동 추가. CAPTURE도 동료/과자 반복과 예측·권유.'),
 'B22':(False,False,True,True,True,'친구와 웃고 간식을 나눠 먹는 구체적 타인 행동까지 단정. CAPTURE는 손목/초코바 장면 그대로 요약.'),
 'B24':(True,False,True,True,False,'역 앞에서 쉬는 자기 장면은 허용. CAPTURE는 바람/머리카락/기대기 반복. 헬멧 생략이라는 불필요한 안전 관련 문구도 추가.'),
 'B27':(True,False,True,True,False,'식사 중 바라보는 자기 장면은 정책상 허용하되 닭 소품은 맥락과 연결이 약함. CAPTURE도 가게 밖 닭 소재 반복.'),
 'B29':(True,False,True,True,False,'사진을 확대하며 그리는 자기 장면은 허용. CAPTURE는 창가/앉기/확대/웃기 틀을 재사용하고 사진 대상만 바꿈.'),
}
# Qualitative 1..5 ratings, Codex reading, NOT an independent human panel.
# [future naturalness, capture naturalness, future humor, capture humor]
RATINGS={
 'B10':([2,4,3,3],[1,2,1,1]),'B11':([1,2,1,1],[2,2,2,1]),
 'B15':([4,1,3,1],[3,2,3,1]),'B16':([4,4,3,3],[3,3,2,2]),
 'B17':([3,3,2,2],[2,1,1,1]),'B19':([3,3,2,3],[2,2,2,1]),
 'B22':([3,4,2,3],[3,3,2,1]),'B24':([3,3,2,2],[3,2,2,1]),
 'B27':([1,1,1,1],[2,2,1,1]),'B29':([1,1,1,1],[3,2,2,1]),
}

def main():
    plan=read(OUT/'split-writer-pilot-plan.json');ledger=read(OUT/'split-writer-pilot-ledger.json')
    assert all(sha(Path(k))==v for k,v in ledger['protected'].items())
    rows=[]
    for row in plan['rows']:
        requests={s:ledger['requests'].get(row['id']+':'+s,{}) for s in ('future','capture')}
        draft={s:requests[s].get('content',{}).get(s) for s in requests}
        flags=automatic(draft,row)
        f,c,overlap,roles,reality,note=REVIEWS[row['id']]
        assert json.loads(requests['capture']['request']['input'])['future']==draft['future']
        assert all(set(x.get('content',{}))=={s} for s,x in requests.items())
        rows.append({'id':row['id'],'selection_reason':plan['selection'][row['id']],
            'question':row['question'],'a':row['a'],'b':row['b'],'winner':row['winner'],
            'score':row['score'],'score_source':row['score_source'],'why':row['why'],
            'single':{'future':row['future'],'capture':row['capture'],'review':row['review']},
            'split':draft|{'review':{'future_pass':f and not flags['future'],'capture_pass':c and not flags['capture'],
                'future_capture_overlap':overlap,'role_overlap':roles,'unverified_reality_claim':reality,
                'note':note},'automatic':flags},'qualitative_ratings':{'single':RATINGS[row['id']][0],'split':RATINGS[row['id']][1]}})
    def aggregate(which):
        fields=('future_pass','capture_pass','future_capture_overlap','role_overlap','unverified_reality_claim')
        totals={k:sum(bool(r[which]['review'][k]) for r in rows) for k in fields}
        totals['qualitative_means']={k:sum(r['qualitative_ratings'][which][i] for r in rows)/10 for i,k in enumerate(('future_naturalness','capture_naturalness','future_humor','capture_humor'))}
        return totals
    usages=[v['usage'] for v in ledger['requests'].values() if v.get('usage')]
    prior=read(OUT/'play-writer-host-recovery-ledger.json')
    oldusage=[prior['requests'][r['id']]['usage'] for r in rows]
    from frozen_writer import cost
    def usage_report(us):return {'input_tokens':sum(u['input_tokens'] for u in us),
        'output_tokens':sum(u['output_tokens'] for u in us),'cost_usd':sum(cost(u) for u in us)}
    stats={'single':aggregate('single'),'split':aggregate('split'),
        'single_historical_10_calls':usage_report(oldusage),'split_current_20_calls':usage_report(usages),
        'attempts':len(ledger['requests']),'completed':sum(v['status']=='completed' for v in ledger['requests'].values()),
        'incomplete':sum(v['status']=='incomplete' for v in ledger['requests'].values()),
        'frozen_hashes_unchanged':True,'success_criteria_met':False,'expand_remaining_18':False}
    report={'status':'FAILED: capture paraphrases supplied future; no expansion',
        'method':'Same selected development cases, first responses only. No prompt repair, no resampling. Semantic/winner/score/WHY frozen. Policy flags combine existing automatic checks with Codex qualitative reading, not a human user panel.',
        'rating_scale':'1 incoherent/unfunny, 2 awkward/weak, 3 understandable/mild, 4 natural/funny, 5 highly natural/shareable. Subjective, not statistical evidence.',
        'confounds':'Role prompts and output limit differ (single 650, split 192 tokens). This tests the two-stage contract as a whole, not a controlled causal estimate of splitting alone. No truncation observed. All ten use original-option verified projection, not enriched semantic descriptions.',
        'stats':stats,'rows':rows}
    save(OUT/'split-writer-pilot-report.json',report)
    esc=lambda v:html.escape(str(v))
    sections=[]
    for r in rows:
        panels=[]
        for name,label in [('single','기존 단일 호출'),('split','새 2단계 호출')]:
            panels.append('<article><h3>'+label+'</h3><h4>FUTURE</h4><p>'+esc(r[name]['future'])+'</p><h4>CAPTURE</h4><p>'+esc(r[name]['capture'])+'</p><pre>'+esc(json.dumps(r[name]['review'],ensure_ascii=False,indent=2))+'</pre></article>')
        sections.append('<section><h2>'+r['id']+' '+esc(r['question'])+'</h2><p>선정: '+esc(r['selection_reason'])+'</p><p>A: '+esc(r['a'])+'<br>B: '+esc(r['b'])+'<br>'+r['score_source']+' · '+esc(r['winner'])+' · '+str(r['score'])+':'+str(100-r['score'])+'</p><p>동결 WHY: '+esc(r['why'])+'</p><div class="compare">'+''.join(panels)+'</div><p>정성 평점 [미래 자연스러움, 캡처 자연스러움, 미래 재미, 캡처 재미]: '+esc(r['qualitative_ratings'])+'</p></section>')
    doc='<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>분리 Writer 10건 비교</title><style>body{max-width:1300px;margin:24px auto;padding:0 18px;font:16px/1.65 sans-serif}h1{font-size:26px}h2{font-size:20px}h3{font-size:18px}section{border-top:1px solid #aaa;padding:18px 0}.compare{display:grid;grid-template-columns:1fr 1fr;gap:24px}article{min-width:0}p,pre{overflow-wrap:anywhere}pre{white-space:pre-wrap;background:#f5f5f5;padding:12px;font-size:13px}@media(max-width:750px){.compare{grid-template-columns:1fr}}</style><h1>단일 Writer 실패 기준선 / 2단계 Writer 10건 실험</h1><p>실행 전 10건 고정. 기존 출력은 프롬프트에 전달하지 않았습니다. CAPTURE에는 이번에 생성된 FUTURE만 추가 전달했습니다. 정책 및 정성 평가는 Codex 직접 읽기이며 실제 사용자 평가와 구분합니다. 단어/개별 질문별 생성 규칙 없음.</p><p>기존 엔진/WHY/승자/점수 해시 보존. 20호출 모두 완료. 재호출·repair·18건 확대·앱 연결·merge·배포·push 없음.</p><p>출력 상한은 기존 단일 650토큰, 이번 단계별 192토큰으로 다릅니다. 잘림은 없었지만 순수한 단계 분리 효과만 입증하는 대조 실험은 아닙니다.</p><pre>'+esc(json.dumps(stats,ensure_ascii=False,indent=2))+'</pre>'+''.join(sections)+'</html>'
    (OUT/'split-writer-pilot-report.html').write_text(doc,encoding='utf-8')
    print(json.dumps(stats,ensure_ascii=False,indent=2))

if __name__=='__main__':main()
