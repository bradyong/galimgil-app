"""Comparison artifacts from saved responses, no API calls."""
import html,json,sys
from pathlib import Path
import frozen_writer as w

directory=Path(sys.argv[1]);baseline=json.loads((directory/'writer-frozen-baseline.json').read_text(encoding='utf-8'))
saved=json.loads((directory/'writer-frozen-raw.json').read_text(encoding='utf-8'))
review=json.loads((w.ROOT/'tests/fixtures/frozen-writer-review.json').read_text(encoding='utf-8'))
assert baseline['hashes']==w.hashes()
rows=[]
for row in baseline['rows']:
    key=str(row['index']);record=saved.get(key);draft=record.get('draft') if record else None
    audit=review['rows'].get(key,{})
    selected,errors=w.select_output(row,draft,audit.get('errors',[])) if record else (row,[])
    rows.append({'original':row,'draft':draft,'format_errors':w.validate(draft,row) if record else [],
                 'review':audit,'errors':errors,'accepted':bool(record and not errors),'selected':selected})
semantic=[r for r in rows if r['original']['route']=='semantic-play']
before=[r['original']['output'] for r in semantic]
raw=[{'why':r['draft']['reason'],'future':r['draft']['future'],'capture':r['draft']['capture']} if r['draft'] else r['original']['output'] for r in semantic]
after=[r['selected']['output'] for r in semantic];inputs=[r['original'] for r in semantic]
stats={'calls':len(saved),'input':sum(r.get('usage',{}).get('input_tokens',0) for r in saved.values()),
       'output':sum(r.get('usage',{}).get('output_tokens',0) for r in saved.values()),
       'cost':sum(r['charged_bound'] for r in saved.values()),'format_pass':sum(not r['format_errors'] for r in semantic),
       'accepted':sum(r['accepted'] for r in semantic),'fallback':sum(not r['accepted'] for r in semantic),
       'schema_pass':sum(isinstance(r['draft'],dict) and set(r['draft'])==set(w.FIELDS+['anchors']) for r in semantic),
       'before':w.metrics(before,inputs),'raw':w.metrics(raw,inputs),'selected':w.metrics(after,inputs),
       'manual':{'old_overlap':len(review['old_overlap']),'new_overlap':sum(r['review'].get('overlap',False) for r in semantic),
       'old_unsupported':len(review['old_unsupported']),'new_unsupported':sum(r['review'].get('unsupported',False) for r in semantic),
       'new_noun_caption':sum(r['review'].get('noun_caption',False) for r in semantic)},
       'frozen_hashes_verified':True,'normal_eight_unchanged':all(r['original']==r['selected'] for r in rows if r['original']['route']=='existing-rule')}
stats['manual']['selected_unsupported']=sum(r['review'].get('unsupported',False) if r['accepted'] else r['original']['index'] in review['old_unsupported'] for r in semantic)
(directory/'writer-frozen-comparison.json').write_text(json.dumps({'stats':stats,'review_method':review['method'],'rows':rows},ensure_ascii=False,indent=2),encoding='utf-8')
esc=lambda s:html.escape(str(s or ''))
def copy_block(o):
    if not o or not o.get('why'):return '<p>의미 확인 대상: 결과 생성 및 Writer 호출 없음</p>'
    return ''.join(f'<h4>{label}</h4><p>{esc(html.unescape(o[k]))}</p>' for k,label in [('why','이유'),('future','미래의 나'),('capture','캡처 한 줄')])
sections=[]
metric_rows=[('이유 틀 초과 중복 (자동)',stats['before']['reason_repeat']['excess'],stats['raw']['reason_repeat']['excess']),
 ('예측형 미래 어미 (자동)',stats['before']['future_prediction'],stats['raw']['future_prediction']),
 ('명사구형 캡처 추정 (자동)',stats['before']['caption_noun_proxy'],stats['raw']['caption_noun_proxy']),
 ('세 영역 의미 역할 중복 (Codex 정성 검토)',stats['manual']['old_overlap'],stats['manual']['new_overlap']),
 ('근거 없는 내용 (Codex 정성 검토)',stats['manual']['old_unsupported'],stats['manual']['new_unsupported'])]
summary_table='<table><tr><th>19건 기준 지표</th><th>현재</th><th>새 원초안</th></tr>'+''.join(f'<tr><td>{esc(label)}</td><td>{a}/19</td><td>{b}/19</td></tr>' for label,a,b in metric_rows)+'</table>'
for r in rows:
    old=r['original'];d=r['draft'];new={'why':d['reason'],'future':d['future'],'capture':d['capture']} if d else old['output']
    status='새 Writer 채택' if r['accepted'] else '기존 출력 유지 (검증 실패)' if d else '호출 제외'
    sections.append(f'''<section id="case-{old['index']}"><h2>{old['index']+1}. {esc(old['a'])} / {esc(old['b'])}</h2>
    <p>{esc(old['q'])} · 고정 winner: {esc(old.get('winner'))} · 놀이 점수: {old.get('score','-')} · {status}</p>
    <div class="comparison"><article><h3>현재 출력</h3>{copy_block(old['output'])}</article>
    <article><h3>새 Writer 원출력 {'(미채택)' if d and not r['accepted'] else ''}</h3>{copy_block(new)}</article></div>
    <p class="review">검토: {esc(r['review'].get('note','기존 정상 경로 보존 또는 조어 확인'))}</p>
    <p>자동 검사: {esc(', '.join(r['format_errors']) or '통과 / 호출 제외')} · 내용 검사: {esc(', '.join(r['review'].get('errors',[])) or '추가 거절 사유 없음')}</p>
    <details><summary>최종 선택 출력·고정 의미·축·실제 기여점수</summary>{copy_block(r['selected']['output'])}<pre>{esc(json.dumps({k:old.get(k) for k in ['meaning','contrast','axes','inputs','traces']},ensure_ascii=False,indent=2))}</pre></details></section>''')
doc=f'''<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>갈림길 Writer 동결 실험 28건 비교</title>
<style>body{{font:16px/1.65 sans-serif;margin:24px auto;max-width:1200px;padding:0 20px;color:#202020;background:#fff}}h1{{font-size:28px}}h2{{font-size:22px}}h3{{font-size:18px}}h4{{margin-bottom:4px}}p{{margin-top:4px;overflow-wrap:anywhere}}section{{border-top:2px solid #777;padding:20px 0}}.comparison{{display:grid;grid-template-columns:1fr 1fr;gap:28px}}article{{min-width:0}}pre{{white-space:pre-wrap;overflow-wrap:anywhere;background:#f4f4f4;padding:14px}}.review{{background:#fff1ce;padding:12px}}a{{color:#126257}}table{{border-collapse:collapse;width:100%}}td,th{{border:1px solid #ccc;padding:8px;text-align:left}}@media(max-width:700px){{.comparison{{grid-template-columns:1fr}}}} </style></head><body>
<h1>Writer만 변경한 28건 전후 비교</h1><p>2026-10-06 · feature 로컬 실험. main merge / 배포 / push 없음. 앱에는 연결하지 않았습니다.</p>
<p>semantic-play 19건 각 1회, 정상 8건 미호출·그대로 유지, 조어 1건 결과 미생성. 자동 재호출 없음. 원출력은 수동으로 고치지 않았습니다.</p>
<p>Winner·점수·의미·축은 고정 파일에서 읽었습니다. 보호 코드 7개 SHA-256 불변 확인. 새 Writer 응답 계약에는 winner/score/meaning 필드가 없습니다.</p>
<h2>평가 해석</h2><p>지표 분모는 Writer 대상 19건입니다. 형식 통과는 근거·재미 통과가 아닙니다. 이유/이름 치환 중복은 문자 유사도 0.65 휴리스틱, 예측문은 어미 패턴, 명사구는 종결어미 휴리스틱입니다. 원초안/기존문구 복귀 후 결과를 별도로 기록했습니다.</p>
<p>{esc(review['method'])} 내용 검토 실패도 이번 오프라인 채택에서 기존 출력으로 복귀합니다. 이 정성 검토를 일반 입력에 적용할 자동 의미 검증기로 구현한 것은 아닙니다. 승인 전 운영 연결하지 않습니다.</p>
{summary_table}<p>JSON 필드 형식 19/19 · 길이/어미/인용 포함 계약 검사 {stats['format_pass']}/19 · 내용 검토 포함 채택 {stats['accepted']}/19 · 기존 복귀 {stats['fallback']}/19.<br>호출 {stats['calls']}회 · 입력 {stats['input']:,} / 출력 {stats['output']:,} 토큰 · 계산 비용 ${stats['cost']:.6f}</p>
<p>이름만 치환한 자동 유사도 초과 중복은 이유 17→0, 미래 0→0, 캡처 0→0입니다. 문자 중복 0이 의미 중복 0은 아닙니다. 새 캡처의 직접 읽기 판정은 라벨형 7/19로 자동 추정 12/19와 다릅니다.</p>
<p>fallback 이후에는 이유 틀 중복 15/19, 예측형 미래 14/19, 명사구 추정 17/19가 남습니다. 기존 문구 복귀는 새 오류를 막는 조치이지 기존 품질을 해결하는 조치가 아닙니다.</p>
<details><summary>전체 자동 지표·그룹·fallback 후 지표</summary><pre>{esc(json.dumps(stats,ensure_ascii=False,indent=2))}</pre></details>
<nav>{' · '.join(f'<a href="#case-{r["original"]["index"]}">{r["original"]["index"]+1}</a>' for r in rows)}</nav>
{''.join(sections)}<p>비용은 API 사용량 × <a href="https://developers.openai.com/api/docs/models/gpt-5-mini">공식 단가</a> 계산값이며 청구서 확정액이 아닙니다.</p></body></html>'''
(directory/'writer-frozen-comparison.html').write_text(doc,encoding='utf-8')
print(json.dumps(stats,ensure_ascii=False,indent=2))
