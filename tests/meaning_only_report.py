"""Replay saved semantics only; never imports a live API runner."""
import hashlib
import html
import json
import subprocess
from pathlib import Path
from meaning_only_candidate import project, ready, normalize, writer_input

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT.parent / 'low-confidence-safety-20261006'
NODE = Path.home()/'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
def read(path):
    return json.loads(path.read_text(encoding='utf-8'))

def main():
    ledger = read(OUT/'blind-40-ledger.json')
    lock = read(OUT/'blind-40-lock.json')
    fixtures = ROOT/'tests/fixtures/blind-40-20261007.json'
    assert hashlib.sha256(fixtures.read_bytes()).hexdigest() == lock['dataset_sha256']
    for name, digest in lock['protected_source_hashes'].items():
        assert hashlib.sha256((ROOT/name).read_bytes()).hexdigest() == digest, name
    audit = read(OUT/'blind-40-policy-audit.json')
    rows, pending = [], []
    for f in read(fixtures):
        raw = ledger['requests'].get(f['id']+':semantic', {}).get('content')
        if not raw:
            continue
        m = project(raw, f)
        axes, removed = normalize(f, raw.get('canonical_axes', []))
        accepted = ready(m)
        old = ledger['rows'][f['id']]
        row = {'id': f['id'], 'question': f['q'], 'a': f['a'], 'b': f['b'],
               'previous_route': old.get('engine', {}).get('route', old['status']),
               'new_route': 'semantic-play' if accepted else 'confirmation',
               'previous_raw_axes': raw.get('canonical_axes', []),
               'previous_adopted_axes': old.get('engine', {}).get('axes', []),
               'previous_winner': old.get('engine', {}).get('winner'),
               'previous_score': old.get('engine', {}).get('score'),
               'meaning_proposal': m, 'new_axes': axes if accepted else [],
               'removed_axes': removed, 'expected_unknown': bool(f.get('expected_unknown')),
               'previous_adopted_error': bool(audit['rows'][f['id']].get('final_meaning_error')),
               'summary_entailment_verified': False,
               'score_source': 'original option proof only; legacy summaries quarantined'}
        rows.append(row)
        if accepted:
            pending.append({'f': f, 'axes': axes})
    results = json.loads(subprocess.run([str(NODE), str(ROOT/'tests/meaning_only_engine.cjs')],
        input=json.dumps(pending, ensure_ascii=False), text=True, encoding='utf-8',
        capture_output=True, check=True).stdout)
    iterator = iter(zip(pending, results))
    for row in rows:
        if row['new_route'] != 'semantic-play':
            row['new_result'] = None
            continue
        data, result = next(iterator)
        assert [x['id'] for x in result['axes']] == [x['id'] for x in data['axes']]
        row['new_result'] = result
        row['writer_boundary_not_called'] = writer_input(data['f'], row['meaning_proposal'], result)
        row['unsupported_axis_in_score'] = any(
            ax['quoteA'] not in row['a'] or ax['quoteB'] not in row['b']
            or ax['valueA'] == ax['valueB'] for ax in result['axes'])
    played = [r for r in rows if r['new_result']]
    stats = {'saved_responses': len(rows), 'missing_responses_not_retried': 9,
        'previous_unnecessary_confirmation': sum(r['previous_route']=='confirmation' and not r['expected_unknown'] for r in rows),
        'unnecessary_confirmation': sum(r['new_route']=='confirmation' and not r['expected_unknown'] for r in rows),
        'previous_adopted_error': sum(r['previous_adopted_error'] for r in rows),
        'unsupported_axis_in_score': sum(r['unsupported_axis_in_score'] for r in played),
        'semantic_play': len(played), 'confirmation': len(rows)-len(played),
        'zero_axis': sum(not r['new_result']['axes'] for r in played),
        'ties': sum(bool(r['new_result']['tie']) for r in played),
        'changed_previous_results': sum(r['previous_winner'] is not None and
            (r['previous_winner'], r['previous_score']) != (r['new_result']['winner'], r['new_result']['score']) for r in played),
        'api_calls': 0, 'tokens': 0, 'cost_usd': 0,
        'protected_source_hashes_unchanged': True}
    result = {'status': 'offline candidate; blind40 remains a failed development set',
        'limitations': ['Saved meanings retain unsupported elaborations; not certified as fully grounded.',
            'No new semantic prompt execution. This replay does not prove future model quality.',
            'Proof grammar currently supports ownership/social/setting/immediacy only; other axes abstain.',
            'Quotes in question/meaning alone are not sufficient side-specific proof in this candidate.',
            'Zero axes is valid. Same seeded tie draw as previous experiment; not a preference.',
            'No Writer regeneration, app integration, merge, deployment or push.'],
        'stats': stats, 'rows': rows}
    (OUT/'meaning-only-replay.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    esc = lambda value: html.escape(str(value))
    sections = []
    for r in rows:
        n = r['new_result'] or {}
        sections.append(f'<section><h2>{r["id"]} {esc(r["question"])}</h2><p>A: {esc(r["a"])}<br>B: {esc(r["b"])}</p>'
            f'<p>경로: {r["previous_route"]} → {r["new_route"]}<br>승자/점수: {esc(r["previous_winner"])} / {r["previous_score"]} → {esc(n.get("winner"))} / {n.get("score")}</p>'
            '<p>새 점수는 원문 증명만 사용합니다. 저장된 의미 설명의 전체 사실성 통과를 뜻하지 않습니다.</p>'
            '<pre>'+esc(json.dumps(r, ensure_ascii=False, indent=2))+'</pre></section>')
    doc = '<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>의미/축 분리: 저장 31건</title><style>body{max-width:1100px;margin:24px auto;padding:0 18px;font:16px/1.6 sans-serif}section{border-top:1px solid #aaa;padding:18px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f4f5f5;padding:12px}h2{font-size:20px}</style><h1>의미/축 분리 · 저장 31건 재평가</h1><p>기존 블라인드 40건은 실패 분석 세트로 동결. 질문 교체/새 API/Writer 호출/앱 연결 없음. 미응답 9건은 평가 불가로 유지합니다.</p><p>기존 scene 검증은 제외했습니다. 원응답의 의미 설명에 남은 과장은 점수 입력에서 격리했습니다. 전체 의미 오류가 0건으로 고쳐졌다는 보고가 아닙니다. 축 4종만 제한적 원문 증명을 지원하며, 의미 문장에만 있는 주장과 나머지 축은 채택하지 않습니다.</p><pre>'+esc(json.dumps(stats,ensure_ascii=False,indent=2))+'</pre>'+''.join(sections)+'</html>'
    (OUT/'meaning-only-replay.html').write_text(doc, encoding='utf-8')
    print(json.dumps(stats, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    main()
