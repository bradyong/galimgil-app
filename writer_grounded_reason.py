"""Offline deterministic Writer renderer; never selects or scores options."""
import math

LABELS = {'mood': '마음 온도', 'zodiac': '별자리 성향', 'card': '별 카드'}
# Presentation of already-validated enum values, not option/category inference.
PHRASES = {
    'activity': {'active': '행동에 나서는 쪽', 'passive': '직접 행동을 더하지 않는 쪽'},
    'immediacy': {'now': '바로 시작하는 쪽', 'later': '시작을 뒤로 두는 쪽'},
    'setting': {'outdoor': '실외에서 하는 쪽', 'indoor': '실내에서 하는 쪽'},
    'ownership': {'temporary': '잠시 빌려 쓰는 쪽', 'own': '직접 소유하는 쪽'},
    'social': {'high': '사람들과 함께하는 쪽', 'low': '사람들과의 만남을 줄이는 쪽'},
    'effort': {'high': '노력을 더 들이는 쪽', 'low': '노력을 덜 들이는 쪽'},
    'pace': {'calm': '차분한 흐름의 쪽', 'dynamic': '역동적인 흐름의 쪽'},
    'novelty': {'familiar': '익숙한 쪽', 'new': '새로운 쪽'},
}


def render_reason(row):
    winner = row['winner']
    if row['a'] == row['b'] or winner not in (row['a'], row['b']):
        raise ValueError('Ambiguous winner')
    side = 'a' if winner == row['a'] else 'b'
    other = 'b' if side == 'a' else 'a'
    chosen, rival = row['traces'][side], row['traces'][other]
    values = [chosen[k] for k in ('total', *LABELS)] + [rival[k] for k in ('total', *LABELS)]
    if any(not isinstance(v, (int, float)) or not math.isfinite(v) for v in values):
        raise ValueError('Invalid contribution trace')
    gap = chosen['total'] - rival['total']
    if gap < -1e-8:
        raise ValueError('Winner contradicts fixed score trace')
    if abs(gap) < 1e-8:
        return {'text': f'‘{row["a"]}’도 ‘{row["b"]}’도 오늘 놀이 기준에선 팽팽했어요. 마지막 한 표는 가볍게 ‘{winner}’ 쪽!',
                'pattern': 'tie', 'evidence': {'tie': True, 'contributors': [], 'axis': None}}
    supporters = [k for k in LABELS if chosen[k] - rival[k] > 1e-8]
    if not supporters:
        raise ValueError('No attributable positive contribution')
    names = '·'.join(LABELS[k] for k in supporters)
    other_axes = {a['id']: a for a in rival['axes']}
    candidates = []
    for axis in chosen['axes']:
        peer = other_axes.get(axis['id'])
        known = any(a['id'] == axis['id'] and a.get('value'+side.upper()) == axis['value']
                    for a in row['axes'])
        if not peer or not known or peer['value'] == axis['value']:
            continue
        delta = sum(axis.get(k, 0) - peer.get(k, 0) for k in LABELS)
        phrase = PHRASES.get(axis['id'], {}).get(axis['value'])
        if delta > 1e-8 and phrase:
            candidates.append((delta, axis['id'], axis['value'], phrase))
    best = max(candidates, default=None, key=lambda item: item[0])
    phrase = best[3] if best else f'‘{winner}’ 쪽'
    if len(chosen['axes']) > 1:
        text = f'여러 차이를 함께 놓고 보니, 오늘은 ‘{winner}’ 쪽으로 기울었어요. {phrase}에 붙은 {names}의 놀이 점수가 힘을 보탰어요.'
        pattern = 'mixed'
    elif len(supporters) == 1:
        text = f'오늘은 {names}가 {phrase}에 한 표를 보탰어요. 그래서 ‘{winner}’ 쪽으로 기울었어요.'
        pattern = 'single'
    else:
        text = f'{phrase}에 {names}의 놀이 점수가 더 붙었어요. 오늘의 선택은 ‘{winner}’!'
        pattern = 'combined'
    return {'text':text,'pattern':pattern,'evidence':{'tie':False,'contributors':supporters,
            'axis':list(best[1:3]) if best else None,'score_gap':gap}}
