const assert=require('node:assert/strict'), fs=require('node:fs'),path=require('node:path');
const {engine,cases}=require('./semantic-eval.cjs');
const responses=require('./fixtures/semantic-v2-responses.json');
const run=engine();let count=0;
const baseline=process.env.SEMANTIC_BASELINE_APP?engine(process.env.SEMANTIC_BASELINE_APP):null;
const oldScoring=process.env.SCORING_BASELINE_APP?engine(process.env.SCORING_BASELINE_APP):null;
function test(name,fn){fn();count++;console.log('PASS '+name);}
const envelope=(f,m)=>({binding:JSON.stringify([f.q,f.a,f.b]),version:'semantic-v2',meaning:m});
function confirmed(f, ai) {
 return run(f,ai);
}
test('28 mixed-domain cases; only low evidence requests interpretation',()=>{
 assert.equal(cases.length,28);assert.equal(cases.filter(f=>run(f).needsMeaning).length,20);
 for(let i=0;i<cases.length;i++)assert.equal(Boolean(responses[i]),Boolean(run(cases[i]).needsMeaning));
});
test('18 interpreted cases share grounded axes and separate scene roles',()=>{
 let accepted=0;
 for(const [i,r] of Object.entries(responses)){
  const f=cases[i],after=confirmed(f,r.status==='ready'?envelope(f,r.meaning):null);
  if(after.needsMeaning)continue;
  accepted++;
  assert.equal(after.meaning.scoringPolicy,'semantic-play-v1');
  assert.equal(after.meaning.decisionEvidence.source,'validated-meaning-play');
  assert.ok(after.winnerScore>=50 && after.winnerScore<=75);
  for(const [index,side] of ['a','b'].entries())assert.deepEqual(JSON.parse(JSON.stringify(after.meaning.decisionEvidence[side])),[after.meaning.options[index].meaning]);
  const parts=Object.values(after.content).filter(v=>v?.text);
  assert.ok(parts.every(p=>p.meaningId===after.meaning.id));
  assert.equal(new Set(parts.map(p=>p.text)).size,3);
  assert.doesNotMatch(parts.map(p=>p.text).join(' '),/말씀한 차이:|혼자 발표회|오늘 내 마음의 검색어/);
 }
 assert.equal(accepted,18);
});
test('unknown labels do not pass through self-reported low uncertainty',()=>{
 assert.ok(run(cases[27],envelope(cases[27],responses[27].meaning)).needsMeaning);
});
test('tea without scoring axes uses a tie instead of borrowing toy features',()=>{
 const r=run(cases[11],envelope(cases[11],require('./fixtures/tea-semantic-response.json').meaning));
 assert.equal(r.winnerScore,50);assert.equal(r.meaning.decisionEvidence.used.length,0);
});
test('unrelated historical features are absent from targeted interpretations',()=>{
 for(const i of [0,2,14,15,16,26]){
  const r=confirmed(cases[i],envelope(cases[i],responses[i].meaning));
  assert.doesNotMatch(JSON.stringify(r.meaning.decisionEvidence),/장난감|술자리|숙취|부모|아이.*책|다음날/);
 }
});
test('wrong binding and high uncertainty cannot bypass confirmation',()=>{
 const f=cases[0];assert.ok(run(f,envelope(cases[2],responses[0].meaning)).needsMeaning);
 const m=structuredClone(responses[0].meaning);m.uncertainty.level='high';
 assert.ok(run(f,envelope(f,m)).needsMeaning);
});
test('AI cannot override an already understood rule pair',()=>{
 const f=cases[4],before=run(f),after=run(f,envelope(f,responses[0].meaning));
 assert.deepEqual(after,before);
});
test('HTML in semantic payload is escaped',()=>{
 const f=cases[0],m=structuredClone(responses[0].meaning);m.optionA_meaning.summary='<img src=x onerror=alert(1)>';
 const r=confirmed(f,envelope(f,m));assert.doesNotMatch(r.why,/<img/);
});
if(baseline)test('all eight rule-handled cases retain winner, scores, stars across 30 seeds',()=>{
 for(const f of cases.filter(f=>!run(f).needsMeaning))for(let seed=0;seed<30;seed++){
  const a=baseline(f,null,seed),b=run(f,null,seed);
  for(const k of ['recommendA','winnerScore','loserScore','fortune','finalText'])assert.equal(b[k],a[k],`${f.a}: ${k}`);
 }
});
test('meaning produces traceable play scores, never a name hash',()=>{
 for(const [i,r] of Object.entries(responses)){
  if(r.status!=='ready')continue;
  const result=run(cases[i],envelope(cases[i],r.meaning));
  assert.ok(result.winner);
  assert.equal(result.needsBasis,undefined);
  for(const t of Object.values(result.meaning.decisionEvidence.traces))assert.ok(Math.abs(t.total-(t.base+t.mood+t.zodiac+t.card))<0.000001);
 }
});
console.log(`${count} semantic tests passed`);
