"""Replay a recorded provider run through the current validator; zero API calls."""
import json
import pathlib
import sys
sys.path.insert(0,str(pathlib.Path(__file__).resolve().parents[1]))
from choice_meaning import normalize, validate

rows=json.loads(pathlib.Path(sys.argv[1]).read_text(encoding='utf-8'))
cases=json.loads(pathlib.Path(__file__).with_name('semantic-cases.json').read_text(encoding='utf-8'))
for index,row in rows.items():
    f=cases[int(index)]
    data={'question':f['q'],'a':f['a'],'b':f['b']}
    row['raw_meaning']=row.get('raw_meaning',row.get('meaning'))
    try:
        row['meaning'],row['discarded_axes']=normalize(row['raw_meaning'],data)
        row['status']='ready' if validate(row['meaning'],data) else 'confirmation'
    except (TypeError,KeyError,ValueError):
        row['status']='confirmation'
    print(index,row['status'])
pathlib.Path(sys.argv[2]).write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
