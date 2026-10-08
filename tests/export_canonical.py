"""Offline validation of saved responses; never calls a provider."""
import json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
import choice_canonical as cc
cases=json.loads((ROOT/'tests/semantic-cases.json').read_text(encoding='utf-8'))
meaning=json.loads((ROOT/'tests/fixtures/semantic-v2-responses.json').read_text(encoding='utf-8'))
rows={}
for source in sys.argv[1:]:
    saved=json.loads(Path(source).read_text(encoding='utf-8'))
    for key,r in saved.items():
        text=''.join(c.get('text','') for i in r['raw']['output'] for c in i.get('content',[]) if c.get('type')=='output_text')
        raw=json.loads(text)['canonical_axes'];f=cases[int(key)]
        accepted=cc.accepted_rows(raw,meaning[key]['meaning'],{'question':f['q'],'a':f['a'],'b':f['b']})
        rows[key]={'canonical_axes':accepted,'excluded':[v for v in raw if v not in accepted]}
(ROOT/'tests/fixtures/canonical-validated.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
print({k:len(r['canonical_axes']) for k,r in rows.items()})
