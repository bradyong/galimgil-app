"""Offline candidate contract. Not imported by the app and has no provider I/O.

Legacy summaries are interpretation proposals, not verified facts. Scoring proof
uses original side-specific text only until a stronger entailment check exists.
"""
import re

SEMANTIC_FIELDS = ('situation', 'optionA_meaning', 'optionB_meaning',
                   'meaningful_difference', 'explicit_facts', 'uncertainty')
SEMANTIC_PROMPT = '''Explain only the situation, each option's meaning and their
actual difference. Return situation, optionA_meaning, optionB_meaning,
meaningful_difference, explicit_facts (side and exact input quote), uncertainty.
Do not return canonical values, personality tags, scores, scenes or Writer drafts.
Do not invent advantages or infer an opposite from missing information.'''

def project(raw, f):
    m = raw['meaning']
    return {k: m.get(k) for k in SEMANTIC_FIELDS if k != 'explicit_facts'} | {
        'optionA_meaning': m.get('optionA_meaning', {}).get('summary', ''),
        'optionB_meaning': m.get('optionB_meaning', {}).get('summary', ''),
        'explicit_facts': [{'side': s, 'quote': f[s]} for s in ('a', 'b')]}

def ready(m):
    uncertainty = m.get('uncertainty', {})
    level = uncertainty.get('level') if isinstance(uncertainty, dict) else uncertainty
    if level not in ('low', 'medium'):
        return False
    fields = [m.get(k, '') for k in ('optionA_meaning', 'optionB_meaning', 'meaningful_difference')]
    if any(not isinstance(x, str) or not x.strip() for x in fields):
        return False
    # Explicit admissions of unknown meanings remain unresolved regardless of scenes.
    if any(re.search(r'불명|확인\s*불가|알\s*수\s*없|해석\s*불가|이름.*(?:만|외에)', x) for x in fields):
        return False
    return fields[0].strip() != fields[1].strip()

# Closed axis proof grammar, not a category/option dictionary. No media, place
# names, product names, sentiment or model-generated personality associations.
PROOFS = {
    'ownership': {'temporary': r'대여(?:한다|한|\s|$)|빌린다',
                  'own': r'구매한다|구입한다|구매(?:\s|$)|구입(?:\s|$)|(?:하나\s+)?사서'},
    'social': {'high': r'모임에\s*(?:참여한다|나간다)|함께\s*한다',
               'low': r'^혼자\s'},
    'setting': {'indoor': r'^실내에서\s', 'outdoor': r'^실외에서\s'},
    'immediacy': {'now': r'^(?:오늘|지금)\s+', 'later': r'^(?:내일|나중에)\s+'},
}

def proof(text, axis):
    # Complex negation, reported speech, conditional and contrastive clauses
    # need scope parsing. Abstain rather than interpret their positive fragments.
    if re.search(r'않|못|아니|말고|["\'“”‘’]|다면|라면|지만|대신|아닌|안\s|지\s*말', text):
        return None
    matches = [(value, re.search(pattern, text)) for value, pattern in PROOFS[axis].items()]
    hits = [(value, match.group()) for value, match in matches if match]
    if len(hits) != 1:
        return None
    value, quote = hits[0]
    return {'value': value, 'quote': quote, 'source': 'original-option', 'rule': axis + ':literal-v1'}

def normalize(f, old_axes=()):
    used = []
    for axis in PROOFS:
        a, b = proof(f['a'], axis), proof(f['b'], axis)
        if not a or not b or a['value'] == b['value']:
            continue
        if axis == 'immediacy':
            # Same action required: 'today menu' is not 'today reply'. Different
            # processes cannot be projected onto a shared now/later target.
            pa, pb = PROOFS[axis][a['value']], PROOFS[axis][b['value']]
            if re.sub(pa, '', f['a']) != re.sub(pb, '', f['b']):
                continue
        used.append({'id': axis, 'valueA': a['value'], 'valueB': b['value'],
                     'quoteA': a['quote'], 'quoteB': b['quote'],
                     'explanation': '양쪽 선택지의 명시적 표현만 채택',
                     'proofA': a, 'proofB': b})
    removed = []
    for row in old_axes:
        if any(all(row.get(k) == x.get(k) for k in ('id','valueA','valueB')) for x in used):
            continue
        reason = ('동일 값으로 차이가 없음' if row.get('valueA') == row.get('valueB')
                  else '양쪽 원문의 직접 증명 또는 동일 행동 범위가 확보되지 않음')
        removed.append({'axis': row, 'reason': reason})
    return used, removed

def writer_input(f, m, result):
    """Candidate boundary only; no Writer request is made in this experiment."""
    return {'question': f['q'], 'A': f['a'], 'B': f['b'], 'winner': result['winner'],
            'verified_meaning': {'a': f['a'], 'b': f['b']},
            'verified_contrast': {'a': f['a'], 'b': f['b']},
            'verified_canonical_axes': result['axes']}
