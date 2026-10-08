"""Retain nine failed cases; release local refused-proxy reservations, not retries."""
import json
from pathlib import Path
OUT=Path(__file__).resolve().parents[2]/'low-confidence-safety-20261006'
p=OUT/'blind-40-ledger.json'
ledger=json.loads(p.read_text(encoding='utf-8'))
snapshot=OUT/'blind-40-local-proxy-failure.json'
if snapshot.exists():raise SystemExit('Settlement already performed; no repeat')
assert len(ledger['requests'])==9
assert all(r['status']=='error' and r['error_type']=='URLError' for r in ledger['requests'].values())
assert set(ledger['requests'])=={f'B{i:02}:semantic' for i in range(1,10)}
assert ledger['rows']['B10']['status']=='budget-stop'
assert not any(k.startswith('B10:') for k in ledger['requests'])
snapshot.write_text(json.dumps(ledger,ensure_ascii=False,indent=2),encoding='utf-8')
for r in ledger['requests'].values():
    r['charged_or_reserved']=0
    r['settlement']='Local HTTPS proxy 127.0.0.1:9 refused connection, confirmed by no-generation HEAD and urllib proxy inventory. No API usage returned. Reservation released; failed case not retried.'
ledger['budget_pause_history']=[ledger['rows'].pop('B10')]
ledger['status']='continuing-unattempted-only'
p.write_text(json.dumps(ledger,ensure_ascii=False,indent=2),encoding='utf-8')
print('Retained B01-B09 failures; B10-B40 have no previous provider attempt.')
