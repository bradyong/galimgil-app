"""Explicitly approved 18-call replay. Durable attempt markers, no retry."""
import argparse
import json
import os
from pathlib import Path
import sys
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
import choice_meaning as cm
import choice_play_axes as pa


def cost(usage):
    cached = usage.get('input_tokens_details', {}).get('cached_tokens', 0)
    return ((usage.get('input_tokens', 0)-cached)*.25+cached*.025+usage.get('output_tokens', 0)*2)/1e6


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('output')
    parser.add_argument('--execute', action='store_true')
    args = parser.parse_args()
    target = Path(args.output).resolve()
    if target == ROOT or ROOT in target.parents:
        raise SystemExit('Raw output must be outside public root')
    cases = json.loads((ROOT/'tests/semantic-cases.json').read_text(encoding='utf-8'))
    replies = json.loads((ROOT/'tests/fixtures/semantic-v2-responses.json').read_text(encoding='utf-8'))
    rows = [(i, r) for i, r in replies.items() if r['status'] == 'ready']
    assert len(rows) == 18
    saved = json.loads(target.read_text(encoding='utf-8')) if target.exists() else {}
    spent = sum(r['charged_bound'] for r in saved.values())
    for index, previous in rows:
        if index in saved:
            continue
        f = cases[int(index)]
        data = {'question': f['q'], 'a': f['a'], 'b': f['b']}
        body = pa.request_body(data, previous['meaning'], cm.MODEL)
        encoded = json.dumps(body, ensure_ascii=False, separators=(',', ':')).encode()
        upper = ((len(encoded)+1024)*.25+body['max_output_tokens']*2)/1e6
        if not args.execute:
            print(index, 'bytes', len(encoded), 'upper', upper)
            continue
        if spent + upper > .05:
            print('STOP: budget guard', spent, upper, flush=True)
            break
        # Reserve before network access, including timeouts and failed responses.
        saved[index] = {'status': 'attempt-started', 'charged_bound': upper, 'budget_upper': upper}
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(json.dumps(saved, ensure_ascii=False, indent=2), encoding='utf-8')
        try:
            request = urllib.request.Request('https://api.openai.com/v1/responses', data=encoded,
                headers={'Authorization': 'Bearer '+os.environ['OPENAI_API_KEY'], 'Content-Type': 'application/json'}, method='POST')
            with urllib.request.build_opener(cm.NoRedirect()).open(request, timeout=60) as response:
                raw = json.loads(response.read())
            saved[index].update(raw=raw, usage=raw.get('usage', {}))
            if raw.get('usage'):
                saved[index]['charged_bound'] = cost(raw['usage'])
            content = ''.join(c.get('text', '') for item in raw.get('output', []) for c in item.get('content', []) if c.get('type') == 'output_text')
            parsed = json.loads(content) if raw.get('status') == 'completed' else {}
            axes = pa.validate(parsed, previous['meaning'], data)
            saved[index].update(status='ready' if axes else 'invalid', play_axes=axes)
        except Exception as error:
            saved[index].update(status='failed', error_type=type(error).__name__)
        spent += saved[index]['charged_bound']
        target.write_text(json.dumps(saved, ensure_ascii=False, indent=2), encoding='utf-8')
        print(json.dumps({'index': index, 'status': saved[index]['status'], 'usage': saved[index].get('usage'), 'spent_bound': spent}), flush=True)
    if args.execute:
        print('TOTAL attempted', len(saved), 'charged bound', sum(r['charged_bound'] for r in saved.values()), flush=True)
