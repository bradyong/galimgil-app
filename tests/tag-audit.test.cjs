const {test}=require('node:test'),assert=require('node:assert/strict');
const {engine,cases}=require('./semantic-eval.cjs');
const stored=require('./fixtures/semantic-v2-responses.json');
const play=require('./fixtures/play-axes-responses.json');
const tea=require('./fixtures/tea-semantic-response.json');
const run=engine();
const envelope=i=>{const r=i===11?tea:stored[i];return r?.status==='ready'?{
 binding:JSON.stringify([cases[i].q,cases[i].a,cases[i].b]),version:'semantic-v2',
 meaning:r.meaning,play_axes:i===11?tea.play_axes:play[i]?.play_axes}:null;};
test('same 28 now have 8 rule, 19 semantic and only invented terms unresolved',()=>{
 const counts={rule:0,semantic:0,confirmation:0};
 cases.forEach((f,i)=>{const r=run(f,envelope(i));counts[r.needsMeaning?'confirmation':r.meaning.ai?'semantic':'rule']++;
 if(r.needsMeaning)assert.equal(i,27);});
 assert.deepEqual(counts,{rule:8,semantic:19,confirmation:1});
});
test('empty local meaning requests semantic even when substring matched',()=>{
 const r=run(cases[11]);assert.ok(r.needsMeaning);
 assert.equal(r.understanding.level,'low');assert.ok(r.understanding.reasons.includes('insufficient-grounded-contrast'));
 const after=run(cases[11],envelope(11));assert.ok(after.winner);assert.equal(after.winnerScore,50);
});
test('transport, device age and medium do not imply speculative personality tags',()=>{
 for(const i of [2,3,14]) {
  const r=run(cases[i],envelope(i)),e=r.meaning.decisionEvidence;
  assert.equal(r.winnerScore,50);
  assert.deepEqual([...e.traces.a.tags,...e.traces.b.tags],[]);
  assert.equal(e.engine,'canonical-direct-v1');
 }
});
test('every accepted tag has an axis, value, quote and explanation',()=>{
 cases.forEach((f,i)=>{const ai=envelope(i);if(!ai)return;
 const e=run(f,ai).meaning.decisionEvidence;
 for(const row of e.used)for(const side of ['A','B']) {
  assert.ok(row['value'+side]&&row['quote'+side]&&row.explanation);
 }});
});
test('known meaning without tags is ready, unknown meaning without tags is not',()=>{
 const ai=structuredClone(envelope(11));ai.play_axes=[];
 assert.ok(run(cases[11],ai).winner);
 ai.meaning.uncertainty.level='high';assert.ok(run(cases[11],ai).needsMeaning);
});
module.exports={envelope};
