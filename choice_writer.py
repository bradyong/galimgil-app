"""Writing contract only. Never classifies, scores, or calls a provider."""
import re

VERSION = 'writer-v1'
FIELDS = ('reason', 'future', 'capture')
OPTION_SCHEMA = {'type':'object', 'additionalProperties':False,
                 'required':list(FIELDS)+['anchors'], 'properties':{
                     **{k:{'type':'string'} for k in FIELDS},
                     'anchors':{'type':'array','items':{'type':'string'}}}}
SCHEMA = {'type':'object','additionalProperties':False,'required':['a','b'],
          'properties':{'a':OPTION_SCHEMA,'b':OPTION_SCHEMA}}
PROMPT = '''
WRITER STAGE (separate from semantic reasoning; one response, no second call):
Write two independent possible endings, a assuming A chosen and b assuming B chosen.
No winner/score/preference inference. Code will select a side AFTER scoring.
All strings are natural Korean for a playful self-reflection app, not a report.
anchors: 1-3 EXACT substrings of that option's semantic summary/activity/scene
elements, to record the writing source. Do not merely repeat these nouns as copy.
reason: ONE conversational sentence, 25-90 Korean characters, depicting the
actual contrast in everyday terms. No axis labels, colon lists, slash comparisons,
English enum values, superiority claim or invented user preference. Describe what
the selected side offers instead of the other. Code appends the honest score basis.
future: 20-85 characters, ONE tiny comic aftermath in the first-person inner voice.
Show a concrete action/object and a small anticlimax, awkward moment, rationalization
or self-directed joke. Not a prediction: no 것이다, 하게 된다, 예상, 가능성,
할 수 있다. Use conversational Korean, a short diary beat, or an inner quote.
capture: 12-45 characters, an independently shareable punchline. It must say
something, not name the choice or summarize an object. No noun-label endings.
The joke must arise from this activity, not a stock motivational slogan. Do not
repeat the future scene as a shorter sentence, or begin the three fields alike.
Creative invention is allowed ONLY for a hypothetical self-scene, never factual
claims about price, distance, waiting time, product performance, safety, health,
other people's replies/feelings or guaranteed results. No invented numbers.
Preserve negation and compound actions exactly. Not contacting cannot send a text;
skipping a party to practice must not attend it. Do not reward violating boundaries.
Do not borrow a scene from the unchosen option. Do not output model/internal terms.
No fixed framing about photo titles, search tabs, teams cheering from a bench,
schedule stars, presentations about choosing, or '고른 사람 저요'. No sample lookup.
If meaning is uncertain, leave writer strings and anchors empty; do not fabricate.
'''


def validate(writing, meaning):
    if not isinstance(writing, dict) or set(writing) != {'a','b'}:
        return None
    for side in ('a','b'):
        w = writing[side]
        if not isinstance(w, dict) or set(w) != set(FIELDS) | {'anchors'}:
            return None
        if any(not isinstance(w[k], str) for k in FIELDS):
            return None
        if not 15 <= len(w['reason']) <= 110 or not 12 <= len(w['future']) <= 100 or not 8 <= len(w['capture']) <= 55:
            return None
        option = meaning['option'+side.upper()+'_meaning']
        ground = option['summary']+' '+option['activity']+' '+ ' '.join(option['scene']['elements'])
        if not isinstance(w['anchors'], list) or not 1 <= len(w['anchors']) <= 3 or any(not isinstance(a,str) or not a or a not in ground for a in w['anchors']):
            return None
        text = ' '.join(w[k] for k in FIELDS)
        if re.search(r'\b(activity|observe|participate|setting|immediacy|ownership|indoor|outdoor)\b|<[^>]+>', text, re.I):
            return None
        if re.search(r'것이다|하게 된다|예상된다|가능성이|할 수 있다', w['future']):
            return None
        if re.search(r'\d', text) or len({w[k] for k in FIELDS}) != 3:
            return None
        if not re.search(r'[.!?]|(?:요|네|지|다|군|걸|데|냐|까)$', w['capture']):
            return None
        if len({w[k][:8] for k in FIELDS}) != 3:
            return None
    return writing
