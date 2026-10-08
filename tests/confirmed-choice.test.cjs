const {test}=require('node:test');
const assert=require('node:assert/strict');
const {engine,cases}=require('./semantic-eval.cjs');
const replies=require('./fixtures/semantic-v2-responses.json');
const playReplies=require('./fixtures/play-axes-responses.json');
const run=engine();
const envelope=(f,i)=>replies[i]?.status==='ready'?{
 binding:JSON.stringify([f.q,f.a,f.b]),version:'semantic-v2',meaning:replies[i].meaning,play_axes:playReplies[i]?.play_axes
}:null;

test('18 meanings proceed directly without a user preference',()=>{
 let n=0;
 cases.forEach((f,i)=>{
  const ai=envelope(f,i);if(!ai)return;
  const r=run(f,ai);n++;
  assert.ok(r.winner);assert.equal(r.needsBasis,undefined);assert.equal(r.needsMeaning,undefined);
  assert.equal(r.meaning.scoringPolicy,'semantic-play-v1');
  for(const preferred of ['a','b']) {
   const legacy={binding:JSON.stringify([f.q,f.a,f.b]),preferred,criterion:'내가 고른 쪽'};
   const after=run(f,ai,999,legacy);
   assert.equal(after.winner.name,r.winner.name);
   assert.equal(after.winnerScore,r.winnerScore);
   assert.deepEqual(after.meaning.decisionEvidence,r.meaning.decisionEvidence);
  }
 });assert.equal(n,18);
});

test('unknown terms resolve after meaning only; app chooses',()=>{
 const f=cases[27];assert.ok(run(f).needsMeaning);
 const answer={binding:JSON.stringify([f.q,f.a,f.b]),a:'종이에 그림을 그리는 체험',b:'점토를 빚는 활동'};
 const first=run({...f,tieRoll:0.25},null,1,answer),second=run({...f,tieRoll:0.75},null,1,answer);
 assert.equal(first.winner.name,f.a);assert.equal(second.winner.name,f.b);
 assert.equal(first.meaning.decisionEvidence.tieBreak.semanticAdvantage,false);
 assert.equal(first.winnerScore,50);
 assert.ok(first.meaning.options.every(o=>o.source==='user-confirmed'));
});

test('mood changes semantic play direction with traceable contributions',()=>{
 const f=cases[0],ai=envelope(f,0);
 const cold=run({...f,mood:1,signIndex:11},ai),hot=run({...f,mood:10,signIndex:11},ai);
 assert.ok(cold.meaning.decisionEvidence.traces.a.mood>cold.meaning.decisionEvidence.traces.b.mood);
 assert.ok(hot.meaning.decisionEvidence.traces.a.mood<hot.meaning.decisionEvidence.traces.b.mood);
 assert.notEqual(cold.winner.name,hot.winner.name);
});

test('choice rename cannot affect semantic scores or cards',()=>{
 const f=cases[0],ai=envelope(f,0),before=run(f,ai);
 const renamed={...f,a:'선택 하나',b:'선택 둘'},copy=structuredClone(ai);
 copy.binding=JSON.stringify([renamed.q,renamed.a,renamed.b]);
 copy.meaning.optionA_meaning.quote=renamed.a;copy.meaning.optionB_meaning.quote=renamed.b;
 copy.meaning.evidence=[{input:'a',quote:renamed.a},{input:'b',quote:renamed.b}];
 copy.meaning.decision_axes.forEach(ax=>{ax.quoteA=renamed.a;ax.quoteB=renamed.b;});
 const after=run(renamed,copy,87654);
 assert.ok(after.winner);
 assert.deepEqual(after.meaning.decisionEvidence.traces,before.meaning.decisionEvidence.traces);
 assert.deepEqual(after.zodiacCards,before.zodiacCards);
});

test('eight supported outputs match preserved pre-change app',()=>{
 const baseline=engine(require('node:path').join(__dirname,'../../low-confidence-safety-20261006/app-before.js'));
 let checked=0;
 cases.forEach(f=>{
  if(run(f).needsMeaning)return;checked++;
  for(const seed of [1,22,999]) {
   const before=baseline(f,null,seed),after=run(f,null,seed);
   for(const k of ['why','futureComment','advice','winnerScore','fortune'])assert.equal(after[k],before[k]);
  }
 });assert.equal(checked,8);
});

test('unsupported context tags are excluded, not converted to unrelated features',()=>{
 for(const i of [0,9,18,24,26]) {
  const r=run(cases[i],envelope(cases[i],i));
  const e=r.meaning.decisionEvidence;
  assert.equal(e.engine,'canonical-direct-v1');
  assert.ok(e.used.every(ax=>ax.id!=='symbolic-association'));
  for(const side of ['a','b'])assert.ok(e.traces[side].tags.every(t=>!['family','presence','safe'].includes(t)));
 }
});

test('invalid quoted play axes cannot enter scoring',()=>{
 const f=cases[0],ai=envelope(f,0),bad=structuredClone(ai);
 bad.play_axes[0].a.quote='원문에 없는 근거';
 const r=run(f,bad);
 assert.ok(r.meaning.decisionEvidence.used.every(ax=>ax.id!=='symbolic-association'));
 assert.ok(r.winner);
});
