"""Export only non-secret recorded axes for deterministic offline regressions."""
import json
from pathlib import Path
import sys

raw = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
target = Path(__file__).with_name('fixtures') / 'play-axes-responses.json'
rows = {i: {'status': r['status'], 'play_axes': r.get('play_axes'), 'usage': r.get('usage'),
            'cost': r['charged_bound']} for i, r in raw.items()}
target.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding='utf-8')
print('Exported', len(rows), 'recorded responses; zero API calls')
