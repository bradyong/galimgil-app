const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {test} = require('node:test');
const {engine, cases} = require('./semantic-eval.cjs');
const responses = require('./fixtures/semantic-v2-responses.json');
const root = path.join(__dirname, '..');
const context = vm.createContext({console, localStorage: {getItem: () => null}});
vm.runInContext(fs.readFileSync(path.join(root, 'choice-input.js'), 'utf8'), context);
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
vm.runInContext(source.slice(0, source.indexOf('document.getElementById("todayDate").textContent')), context);
const assess = vm.runInContext('assessDirectionalEvidence', context);
const run = engine();

test('same 28 stored cases: distinguish rule coverage, meaning and directional basis', () => {
  const counts = {};
  cases.forEach((f, i) => {
    const reply = responses[i];
    const envelope = reply?.status === 'ready' ? {
      binding: JSON.stringify([f.q, f.a, f.b]), version: 'semantic-v2', meaning: reply.meaning
    } : null;
    const result = run(f, envelope);
    const gate = assess(result.understanding, result.meaning);
    counts[gate.status] = (counts[gate.status] || 0) + 1;
    if (gate.status === 'semantic-play') {
      assert.ok(result.winner);
      assert.equal(result.needsBasis, undefined);
      assert.ok(result.meaning.decisionEvidence.excludedSources.includes('name-hash'));
      assert.ok(result.meaning.decisionEvidence.excludedSources.includes('preferred'));
    }
  });
  assert.deepEqual(counts, {'semantic-play': 18, 'existing-rule-path': 8, 'needs-meaning': 2});
});

test('manual descriptions alone are not a directional preference', () => {
  const result = assess({level: 'low'}, {status: 'ready', options: [
    {meaning: '관람', source: 'user-confirmed'}, {meaning: '체험', source: 'user-confirmed'}
  ]});
  assert.equal(result.status, 'semantic-play');
});

test('unknown meaning remains unresolved regardless of old confidence', () => {
  assert.equal(assess({level: 'supported'}, {status: 'needs-confirmation'}).status, 'needs-meaning');
});
