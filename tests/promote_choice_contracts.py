"""Mechanical promotion of approved pure functions, with an immutable backup."""
import ast
import hashlib
import json
import shutil
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT.parent/'low-confidence-safety-20261006'
BACKUP=OUT/'app-connection-backup-20261007'

def main():
    BACKUP.mkdir(exist_ok=True)
    for name in ('app.js','index.html','styles.css','server.py','choice_meaning.py','choice_writer.py',
                 'choice-input.js','native-ads-events.js','writer_grounded_reason.py'):
        target=BACKUP/name
        if not target.exists():shutil.copyfile(ROOT/name,target)
    dest=ROOT/'choice_contracts';dest.mkdir(exist_ok=True)
    for source,target in [('tests/meaning_only_candidate.py','meaning.py'),('tests/pure_play_candidate.py','play.py')]:
        if (dest/target).exists():assert (dest/target).read_bytes()==(ROOT/source).read_bytes()
        else:shutil.copyfile(ROOT/source,dest/target)
    source=(ROOT/'tests/play_writer_validation.py').read_text(encoding='utf-8')
    nodes=[n for n in ast.parse(source).body if
        (isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='WHY_PATTERNS' for t in n.targets))
        or (isinstance(n,ast.FunctionDef) and n.name=='why')]
    assert len(nodes)==2
    promoted='"""Approved WHY expressions, mechanically extracted without edits."""\nimport hashlib\n\n'+'\n\n'.join(ast.get_source_segment(source,n) for n in nodes)+'\n'
    target=dest/'why.py'
    if target.exists():assert target.read_text(encoding='utf-8')==promoted
    else:target.write_text(promoted,encoding='utf-8')
    manifest={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in BACKUP.iterdir() if p.is_file() and p.suffix!='json'}
    (BACKUP/'hashes.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
    print('Preserved backup and exact promoted contracts:',BACKUP)

if __name__=='__main__':main()
