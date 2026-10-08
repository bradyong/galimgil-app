"""Offline role-specific re-review. No provider imports, calls or source mutation."""
import hashlib,html,json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
directory=Path(sys.argv[1])
baseline=json.loads((directory/'writer-frozen-baseline.json').read_text(encoding='utf-8'))
raw_path=directory/'writer-frozen-raw.json'
raw_hash=hashlib.sha256(raw_path.read_bytes()).hexdigest()
raw=json.loads(raw_path.read_text(encoding='utf-8'))
old=json.loads((ROOT/'tests/fixtures/frozen-writer-review.json').read_text(encoding='utf-8'))
review=json.loads((ROOT/'tests/fixtures/writer-role-review.json').read_text(encoding='utf-8'))
assert all(hashlib.sha256((ROOT/f).read_bytes()).hexdigest()==h for f,h in baseline['hashes'].items())
rows=[]
for r in baseline['rows']:
    key=str(r['index'])
    if r['route']!='semantic-play':continue
    verdict=review['rows'][key];draft=raw[key]['draft']
    assert set(verdict)=={'reason','future','capture','note'}
    assert all(isinstance(verdict[k],bool) for k in ['reason','future','capture'])
    accepted=all(verdict[k] for k in ['reason','future','capture'])
    rows.append({'index':r['index'],'a':r['a'],'b':r['b'],'winner':r['winner'],'score':r['score'],
        'draft':draft,'verdict':verdict,'accepted':accepted,
        'previous_unsupported':old['rows'][key]['unsupported'],
        'classes':{'A_reason_failure':not verdict['reason'],'B_allowed_fiction':verdict['future'],
                   'C_allowed_punchline':verdict['capture'],'D_dangerous_reality_in_creative_fields':False},
        'legacy_anchor_errors':raw[key].get('errors',[])})
assert len(rows)==19 and set(review['rows'])=={str(r['index']) for r in rows}
stats={k:sum(r['verdict'][k] for r in rows) for k in ['reason','future','capture']}
stats.update(accepted=sum(r['accepted'] for r in rows),total=19,new_api_calls=0,new_tokens=0,new_cost=0,
             previous_nine={k:sum(r['classes'][k] for r in rows if r['previous_unsupported']) for k in rows[0]['classes']},
             raw_sha256=raw_hash,protected_hashes_unchanged=True,
             accepted_reason_failures=sum(not r['verdict']['reason'] for r in rows if r['accepted']))
result={'stats':stats,'method':review['method'],'rows':rows}
(directory/'writer-role-comparison.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
esc=lambda s:html.escape(str(s))
flag=lambda v:'PASS' if v else 'FAIL'
table=''.join(f'<tr><td><a href="#r{r["index"]}">{esc(r["a"])} / {esc(r["b"])}</a></td>'+''.join(f'<td>{flag(r["verdict"][k])}</td>' for k in ['reason','future','capture'])+f'<td>{"가능" if r["accepted"] else "불가"}</td></tr>' for r in rows)
sections=''.join(f'<section id="r{r["index"]}"><h2>{esc(r["a"])} / {esc(r["b"])}</h2><p>고정 winner: {esc(r["winner"])} · {r["score"]}</p>'+''.join(f'<h3>{label}: {flag(r["verdict"][k])}</h3><p>{esc(r["draft"][k])}</p>' for k,label in [('reason','이유'),('future','미래의 나'),('capture','캡처')])+f'<p class="note">{esc(r["verdict"]["note"])}</p><p>이전 9건 해당: {r["previous_unsupported"]} · 이전 anchor 검사: {esc(r["legacy_anchor_errors"])}</p></section>' for r in rows)
doc=f'''<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Writer 영역별 정책 재평가</title><style>body{{max-width:1150px;margin:24px auto;padding:0 16px;font:16px/1.65 sans-serif;color:#222}}table{{border-collapse:collapse;width:100%}}td,th{{border:1px solid #bbb;padding:8px;overflow-wrap:anywhere}}section{{border-top:1px solid #888;padding:16px 0}}.note{{background:#edf5f2;padding:12px}}pre{{white-space:pre-wrap;overflow-wrap:anywhere}}h2{{font-size:22px}}h3{{font-size:18px}}</style><h1>Writer 19건: 영역별 허용 범위 재평가</h1><p>{esc(review['method'])}</p><p>이유는 STRICT GROUNDING, 미래는 PLAYFUL FICTION, 캡처는 CREATIVE PUNCHLINE. 창작 두 영역에는 원문 인용·숫자 금지를 적용하지 않습니다. 이유는 문장을 직접 대조해 근거 없는 내용이 하나라도 있으면 거절합니다. 이전 공통 anchors 오류만으로 전체 출력을 거절하지 않습니다.</p><p>최종 채택은 세 영역 모두 PASS일 때만 가능하며 원문을 고치거나 일부만 조합하지 않았습니다. 실패 사례를 기존 문장으로 복귀시켰다고 기존 문장까지 근거 100%라고 보장하지 않습니다. 실제 앱 연결 없음.</p><pre>{esc(json.dumps(stats,ensure_ascii=False,indent=2))}</pre><p>A/B/C/D는 서로 배타적인 사례 분류가 아니라 해당 영역의 내용 분류입니다. 예컨대 같은 응답에 A(이유 실패)와 B(미래 허용), C(캡처 허용)가 동시에 존재할 수 있습니다. 이전 9건은 모두 이유에서 지적된 항목이며 창작 허용으로 이유 실패가 사라지는 것은 아닙니다. D는 창작 영역에서 금지된 현실 단정 여부로 별도 집계합니다.</p><table><tr><th>선택지</th><th>이유</th><th>미래</th><th>캡처</th><th>최종</th></tr>{table}</table>{sections}<p>새 호출/토큰/비용 0. main merge/배포/push 없음. 원응답 및 보호 코드 해시 불변.</p></html>'''
(directory/'writer-role-comparison.html').write_text(doc,encoding='utf-8')
assert raw_hash==hashlib.sha256(raw_path.read_bytes()).hexdigest()
print(json.dumps(stats,ensure_ascii=False,indent=2))
