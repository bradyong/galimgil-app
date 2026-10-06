const assert=require('node:assert/strict'), fs=require('node:fs'),path=require('node:path');
const {engine,cases}=require('./semantic-eval.cjs');
const responses=require('./fixtures/semantic-responses.json');
const run=engine();let count=0;
const baseline=process.env.SEMANTIC_BASELINE_APP?engine(process.env.SEMANTIC_BASELINE_APP):null;
const oldScoring=process.env.SCORING_BASELINE_APP?engine(process.env.SCORING_BASELINE_APP):null;
function test(name,fn){fn();count++;console.log('PASS '+name);}
const envelope=(f,m)=>({binding:JSON.stringify([f.q,f.a,f.b]),version:'semantic-v1',meaning:m});
test('28 mixed-domain cases; only low evidence requests interpretation',()=>{
 assert.equal(cases.length,28);assert.equal(cases.filter(f=>run(f).needsMeaning).length,20);
 for(let i=0;i<cases.length;i++)assert.equal(Boolean(responses[i]),Boolean(run(cases[i]).needsMeaning));
});
test('19 interpreted cases share one context, distinct output roles',()=>{
 let accepted=0;
 for(const [i,r] of Object.entries(responses)){
  const f=cases[i],after=run(f,envelope(f,r.meaning));
  if(after.needsMeaning)continue;
  accepted++;
  assert.equal(after.meaning.scoringPolicy,'existing-rules-unchanged');
  const parts=Object.values(after.content).filter(v=>v?.text);
  assert.ok(parts.every(p=>p.meaningId===after.meaning.id));
  assert.equal(new Set(parts.map(p=>p.text)).size,3);
  assert.doesNotMatch(parts.map(p=>p.text).join(' '),/말씀한 차이:|혼자 발표회|오늘 내 마음의 검색어/);
 }
 assert.equal(accepted,19);
});
test('unknown labels do not pass through self-reported low uncertainty',()=>{
 assert.ok(run(cases[27],envelope(cases[27],responses[27].meaning)).needsMeaning);
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
 const r=run(f,envelope(f,m));assert.doesNotMatch(r.why,/<img/);
});
if(baseline)test('all eight rule-handled cases retain winner, scores, stars across 30 seeds',()=>{
 for(const f of cases.filter(f=>!run(f).needsMeaning))for(let seed=0;seed<30;seed++){
  const a=baseline(f,null,seed),b=run(f,null,seed);
  for(const k of ['recommendA','winnerScore','loserScore','fortune','finalText'])assert.equal(b[k],a[k],`${f.a}: ${k}`);
 }
});
if(oldScoring)test('semantic AI does not change existing numeric scoring for interpreted cases',()=>{
 for(const [i,r] of Object.entries(responses))for(let seed=0;seed<10;seed++){
  const f=cases[i],b=run(f,envelope(f,r.meaning),seed);if(b.needsMeaning)continue;
  const a=oldScoring(f,null,seed);
  for(const k of ['recommendA','winnerScore','loserScore'])assert.equal(b[k],a[k],`${f.a}: ${k}`);
 }
});
console.log(`${count} semantic tests passed`);
