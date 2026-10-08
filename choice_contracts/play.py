"""Offline second scoring layer. No semantic inference, provider or app imports."""
import copy
import hashlib
import json
import math

VERSION = 'pure-play-v1'
MAX_TILT = 5

def compose(row):
    """The first layer must already have validated meaning and canonical axes."""
    if row['new_route'] == 'confirmation':
        return {'route': 'confirmation', 'score_source': None, 'winner': None,
                'score': None, 'why': None}
    if row['new_route'] != 'semantic-play' or not row.get('new_result'):
        raise ValueError('Missing verified first layer')
    original = row['new_result']
    if ([{k:v for k,v in axis.items() if k != 'origin'} for axis in original['axes']]
            != row['new_axes']):
        raise ValueError('Axis boundary mismatch')
    if original['axes']:
        # Never rescore an existing verified-axis decision, even if it is tied.
        return {'route': 'semantic-play', 'score_source': 'VERIFIED_SEMANTIC',
                'winner': original['winner'], 'score': original['score'],
                'engine_result': copy.deepcopy(original)}
    a, b = row['a'], row['b']
    if not isinstance(a, str) or not isinstance(b, str) or not a.strip() or not b.strip() or a == b:
        raise ValueError('Distinct options required')
    inputs = original['inputs']
    mood = inputs['mood']
    if isinstance(mood, bool) or not isinstance(mood, (int, float)) or not math.isfinite(mood):
        raise ValueError('Invalid mood')
    if not isinstance(inputs['sign'], str) or not inputs['sign']:
        raise ValueError('Missing sign')
    cards = inputs['cards']
    if not isinstance(cards, list) or any(not isinstance(x, str) for x in cards):
        raise ValueError('Invalid cards')
    # Labels identify the unordered tickets only; the hash conveys no meaning.
    tickets = sorted([a, b])
    seed_input = {'version': VERSION, 'question': row['question'], 'options': tickets,
                  'sign': inputs['sign'], 'mood': float(mood), 'cards': sorted(cards)}
    seed = hashlib.sha256(json.dumps(seed_input, ensure_ascii=False, sort_keys=True,
                                    separators=(',', ':')).encode('utf-8')).digest()
    winner = tickets[seed[0] & 1]
    tilt = 1 + int.from_bytes(seed[1:9], 'big') % MAX_TILT
    score = 50 + tilt
    why = (f'확보한 의미 근거만으로는 어느 쪽이 더 낫다고 말하기 어려워요. '
           f'별자리·별 카드·마음 온도를 섞은 놀이 한 표는 ‘{winner}’ 쪽!')
    return {'route': 'semantic-play', 'score_source': 'PURE_PLAY', 'winner': winner,
            'score': score, 'loser_score': 100-score, 'why': why,
            'semantic_advantage': False, 'semantic_axes': [],
            'seed_input': seed_input, 'seed_sha256': seed.hex(),
            'draw_ticket': seed[0] & 1, 'tilt': tilt,
            'score_interpretation': 'play display only; not confidence or probability'}
