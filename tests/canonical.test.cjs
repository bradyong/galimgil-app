const {test}=require('node:test'),assert=require('node:assert/strict');
const {engine}=require('./semantic-eval.cjs'),{cases,envelope}=require('./canonical-cases.cjs');
const run=engine();
test('same 28 retain eight local, nineteen semantic, one unknown',()=>{
 const counts={local:0,semantic:0,unknown:0};
 cases.forEach((f,i)=>{const r=run(f,envelope(i));counts[r.needsMeaning?'unknown':r.meaning.ai?'semantic':'local']++;});
 assert.deepEqual(counts,{local:8,semantic:19,unknown:1});
});
test('actual canonical contrasts score without any model personality tags',()=>{
 for(const i of [0,6,7,13,15,19,22,23,25,26]) {
  const r=run(cases[i],envelope(i)),e=r.meaning.decisionEvidence;
  assert.ok(e.used.length,`${i}: missing axis`);
  assert.ok(e.traces.a.axes.length);assert.equal(e.traces.a.tags.length,0);
  assert.ok(r.winnerScore>50,`${i}: missed contrast`);
 }
});
test('no speculative values for transport, media, product age or unknown meanings',()=>{
 for(const i of [2,3,9,11,14,16,17,18,24])assert.equal(run(cases[i],envelope(i)).winnerScore,50);
 assert.ok(run(cases[27],envelope(27)).needsMeaning);
});
test('free form tag poisoning cannot change any canonical score',()=>{
 for(let i=0;i<28;i++) {const ai=envelope(i);if(!ai)continue;
  const before=run(cases[i],ai);const poisoned=structuredClone(ai);
  poisoned.play_axes=[{label:'made up',a:{value:'x',quote:cases[i].a,tags:['fun','unique','focus']},b:{value:'y',quote:cases[i].b,tags:['comfort']}}];
  assert.deepEqual(run(cases[i],poisoned).meaning.decisionEvidence,before.meaning.decisionEvidence);
 }
});
test('negative action is not an immediate action, unknown and equal values cannot score',()=>{
 const i=24,ai=structuredClone(envelope(i));
 ai.canonical_axes=[{id:'immediacy',valueA:'later',valueB:'now',quoteA:cases[i].a,quoteB:cases[i].b,explanation:'bad timing'}];
 assert.equal(run(cases[i],ai).winnerScore,50);
 for(const values of [['other','own'],['own','own']]) {
  const copy=structuredClone(envelope(15));copy.canonical_axes[0].valueA=values[0];copy.canonical_axes[0].valueB=values[1];
  assert.equal(run(cases[15],copy).winnerScore,50);
 }
});
test('swapping sides preserves score and reverses polarity without a name hash',()=>{
 const i=6,f=cases[i],ai=structuredClone(envelope(i)),before=run(f,ai);
 const other={...f,a:f.b,b:f.a};ai.binding=JSON.stringify([other.q,other.a,other.b]);
 [ai.meaning.optionA_meaning,ai.meaning.optionB_meaning]=[ai.meaning.optionB_meaning,ai.meaning.optionA_meaning];
 ai.meaning.evidence=ai.meaning.evidence.map(e=>({...e,input:e.input==='a'?'b':e.input==='b'?'a':e.input}));
 for(const ax of [...ai.meaning.decision_axes,...ai.canonical_axes]) {
  [ax.valueA,ax.valueB]=[ax.valueB,ax.valueA];[ax.quoteA,ax.quoteB]=[ax.quoteB,ax.quoteA];[ax.a,ax.b]=[ax.b,ax.a];
 }
 const after=run(other,ai,999);assert.equal(after.winner.name,before.winner.name);assert.equal(after.winnerScore,before.winnerScore);
});
