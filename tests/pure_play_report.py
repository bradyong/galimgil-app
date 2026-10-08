"""Saved 31-case replay; no API or Writer regeneration."""
import copy
import hashlib
import html
import json
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from writer_grounded_reason import render_reason
from pure_play_candidate import compose

OUT = ROOT.parent/'low-confidence-safety-20261006'

def main():
    source = OUT/'meaning-only-replay.json'
    report = json.loads(source.read_text(encoding='utf-8'))
    frozen = json.loads((OUT/'blind-40-lock.json').read_text(encoding='utf-8'))
    for name, digest in frozen['protected_source_hashes'].items():
        assert hashlib.sha256((ROOT/name).read_bytes()).hexdigest() == digest, name
    rows = []
    for row in report['rows']:
        result = compose(row)
        if result['score_source'] == 'VERIFIED_SEMANTIC':
            result['why'] = render_reason({**row['new_result'], 'a':row['a'], 'b':row['b']})['text']
        swap = copy.deepcopy(row)
        swap['a'], swap['b'] = row['b'], row['a']
        swapped_result = compose(swap) if result['score_source'] == 'PURE_PLAY' else None
        rows.append({'id':row['id'], 'question':row['question'], 'a':row['a'], 'b':row['b'],
                     'before':row['new_result'], **result,
                     'repeated_equal': compose(row) == compose(copy.deepcopy(row)),
                     'swapped_winner': swapped_result['winner'] if swapped_result else None,
                     'swapped_score': swapped_result['score'] if swapped_result else None,
                     'swap_preserved': ((result['winner'],result['score']) ==
                         (swapped_result['winner'],swapped_result['score'])) if swapped_result else None})
    pure = [r for r in rows if r['score_source']=='PURE_PLAY']
    verified = [r for r in rows if r['score_source']=='VERIFIED_SEMANTIC']
    stats = {'cases':len(rows), 'verified_semantic':len(verified), 'pure_play':len(pure),
             'remaining_50_50':sum(r['score']==50 for r in rows),
             'confirmation':sum(r['route']=='confirmation' for r in rows),
             'pure_original_A_wins':sum(r['winner']==r['a'] for r in pure),
             'pure_original_B_wins':sum(r['winner']==r['b'] for r in pure),
             'pure_swapped_A_wins':sum(r['swapped_winner']==r['b'] for r in pure),
             'swap_preserved':sum(r['swap_preserved'] for r in pure),
             'reproduction_preserved':sum(r['repeated_equal'] for r in rows),
             'verified_engine_result_preserved':sum(r['engine_result']==r['before'] for r in verified),
             'pure_scores':dict(Counter(r['score'] for r in pure)),
             'why_unfounded_semantic_claims_manual_review':0,
             'api_calls':0, 'tokens':0, 'cost_usd':0,
             'protected_source_hashes_unchanged':True}
    result = {'stats':stats, 'source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),
        'scope':'Offline candidate only. No app/Writer/provider changes.',
        'why_review':'All 28 generated WHY sentences read in this replay: pure WHY asserts no semantic advantage; the three verified WHY sentences reference the retained axis and actual positive mood trace. Manual review, not a general entailment guarantee.',
        'frozen_candidate_hashes': {name:hashlib.sha256((ROOT/'tests'/name).read_bytes()).hexdigest()
            for name in ('meaning_only_candidate.py','meaning_only_engine.cjs')},
        'rows':rows}
    (OUT/'pure-play-replay.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
    esc = lambda x: html.escape(str(x))
    sections=[]
    for r in rows:
        sections.append(f'<section><h2>{r["id"]} · {esc(r["question"])}</h2><p>A: {esc(r["a"])}<br>B: {esc(r["b"])}</p>'
            f'<p>score source: {r["score_source"] or "CONFIRMATION (점수 없음)"}<br>선택: {esc(r["winner"] or "의미 확인")}<br>점수: {str(r["score"])+":"+str(100-r["score"]) if r["score"] else "없음"}</p>'
            f'<p>WHY: {esc(r.get("why") or "결과 생성 안 함")}</p><details><summary>이전 결과 / seed / 순서 교환 추적</summary><pre>'
            +esc(json.dumps(r,ensure_ascii=False,indent=2))+'</pre></details></section>')
    doc='<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>31건 semantic / pure play 분리</title><style>body{max-width:1050px;margin:24px auto;padding:0 18px;font:16px/1.65 sans-serif;color:#222}h1{font-size:26px}h2{font-size:20px}section{border-top:1px solid #aaa;padding:18px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f5f5f5;padding:12px}</style><h1>31건 · 의미 점수와 놀이 추첨 분리</h1><p>축 검증 규칙 유지. 축 0개일 때만 51~55점의 순수 놀이 기울기를 표시합니다. 신뢰도나 성공 확률이 아닙니다. 같은 선택지 쌍·질문·별자리·마음 온도·카드 조합으로 재현되며, A/B 위치를 뒤집어도 선택지 승자는 같습니다.</p><p>새 API/Writer 호출 없음. 앱 연결/main merge/배포/push 없음. 기존 미응답 9건은 평가하지 않았습니다. WHY 외 FUTURE/CAPTURE는 이 결과에 재사용하지 않았습니다.</p><pre>'+esc(json.dumps(stats,ensure_ascii=False,indent=2))+'</pre>'+''.join(sections)+'</html>'
    (OUT/'pure-play-replay.html').write_text(doc,encoding='utf-8')
    print(json.dumps(stats,ensure_ascii=False,indent=2))

if __name__=='__main__': main()
