const fs=require('node:fs'), path=require('node:path'), vm=require('node:vm'), assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
function load(file) {
 const c=vm.createContext({localStorage:{getItem:()=>null},console});
 vm.runInContext('Date.now = () => 1791244800000',c);
 vm.runInContext(fs.readFileSync(path.join(root,'choice-input.js'),'utf8'),c);
 const s=fs.readFileSync(file,'utf8');vm.runInContext(s.slice(0,s.indexOf('document.getElementById("todayDate").textContent')),c);
 return (fixture,seed=12345,confirmed=false)=>{
  c.input={fixture,seed,confirmed};
  return vm.runInContext(`(()=>{
   const {fixture:f,seed,confirmed}=input;
   const i=ChoiceInput.inspect(f.q,f.a,f.b,x=>findFeatureEntry(x)?.item.category,f.category||'daily');
   if(i.message) throw new Error(i.message);
   const p=choiceProfile(f.q,f.a,f.b); if(p.type!==i.category)p.forced=null;p.type=i.category;
   const confirmation=confirmed ? {binding:f.overrideBinding||JSON.stringify([f.q,f.a,f.b]),a:f.meanings[0],b:f.meanings[1],axis:f.axis}:null;
   return buildChoiceNarrative(f.q,f.a,f.b,6,signs[0],p,seed,confirmation);
  })()`,c);
 };
}
const fixtures=[
 {q:'어디 놀러갈까?',a:'동물원',b:'놀이동산',meanings:['동물 관람과 차분한 체험','놀이기구와 활동적인 체험'],axis:'오늘 원하는 체험'},
 {q:'연락할까?',a:'연락한다',b:'연락하지 않는다',meanings:['먼저 말을 건다','지금은 말을 걸지 않는다'],axis:'연락 시점'},
 {q:'퇴근길 어떻게 갈까?',a:'버스',b:'지하철',meanings:['지상 풍경을 보며 이동','지하 노선을 따라 이동'],axis:'이동 경험'},
 {q:'어떤 노트북을 살까?',a:'중고노트북',b:'새노트북',meanings:['사용 이력이 있는 제품','새 제품'],axis:'사용 이력과 상태'},
 {q:'저녁 뭐 먹을까?',a:'피자',b:'치킨',meanings:['치즈가 있는 메뉴','튀김 메뉴'],axis:'식감'},
 {q:'점심 뭐 먹을까?',a:'짜장면',b:'짬뽕',meanings:['소스를 비빈 면','국물에 담긴 면'],axis:'국물 유무'},
 {q:'피곤한데 운동하고 공부할까 쉴까?',a:'운동하고 공부한다',b:'쉰다',meanings:['운동 후 공부까지 한다','두 활동을 미루고 쉰다'],axis:'활동과 휴식'},
 {q:'연락하고 약속을 잡을까 더 생각할까?',a:'연락하고 약속 잡는다',b:'더 생각한다',meanings:['연락해서 약속까지 정한다','연락과 약속을 보류한다'],axis:'지금 진행할 범위'}
];
const run=load(path.join(root,'app.js'));
const before=process.env.MEANING_BASELINE_APP && load(process.env.MEANING_BASELINE_APP);
let count=0;const rows=[];
function test(name,fn){fn();count++;console.log('PASS '+name);}
for(const fixture of fixtures) test(`shared evidence and roles: ${fixture.a}/${fixture.b}`,()=>{
 const first=run(fixture),r=first.needsMeaning?run(fixture,12345,true):first;
 assert.equal(r.meaning.status,'ready');
 assert.equal(r.meaning.situation,fixture.q);
 assert.equal(r.meaning.decision.winner,r.winner.name);
 assert.equal(r.meaning.differences.length,1);
 assert.deepEqual(JSON.parse(JSON.stringify(r.meaning.decisionEvidence.a)),JSON.parse(JSON.stringify(r.recommendA?r.winner.features:r.loser.features)));
 const outputs=[r.content.reason,r.content.future,r.content.capture];
 assert.ok(outputs.every(v=>v.meaningId===r.meaning.id));
 assert.equal(new Set(outputs.map(v=>v.role)).size,3);
 assert.equal(new Set(outputs.map(v=>v.text)).size,3);
 assert.doesNotMatch(outputs.map(v=>v.text).join(' '),/조건과 차이를 충분히 확인하지 못|결과보다 내가 왜 골랐는지 기억|결정은 가볍게, 내 조건은 꼼꼼하게/);
 if(first.needsMeaning){
  for(const key of ['why','futureComment','advice','winnerScore'])assert.equal(first[key],undefined);
  assert.ok(r.meaning.options.every(o=>o.source==='user-confirmed'));
  assert.equal(r.meaning.options[0].meaning,fixture.meanings[0]);
  assert.equal(r.meaning.options[1].meaning,fixture.meanings[1]);
  assert.doesNotMatch(outputs.map(v=>v.text).join(' '),/저렴|비싸|분 대기|분 걸|고장률/);
 }
 if(before)for(let seed=0;seed<30;seed++){
  const old=before(fixture,seed),cur=run(fixture,seed,!!first.needsMeaning);
  for(const key of ['recommendA','winnerScore','loserScore','fortune','finalText']) assert.equal(cur[key],old[key],key);
  assert.equal(JSON.stringify(cur.zodiacCards),JSON.stringify(old.zodiacCards));
  if(!first.needsMeaning && ['피자','짜장면'].includes(fixture.a)){
   assert.equal(cur.advice,old.advice);assert.equal(cur.futureComment,old.futureComment);
  }
 }
 rows.push({pair:[fixture.a,fixture.b],confirmation:!!first.needsMeaning,why:r.why,future:r.futureComment,capture:r.advice,before:before?{why:before(fixture).why,future:before(fixture).futureComment,capture:before(fixture).advice}:null});
});
test('identical clarification does not bypass evidence gate',()=>{
 const f={...fixtures[0],meanings:['같은 체험','같은 체험']};assert.ok(run(f,1,true).needsMeaning);
});
test('empty comparison axis does not bypass gate',()=>assert.ok(run({...fixtures[0],axis:''},1,true).needsMeaning));
test('confirmation from another question is rejected',()=>assert.ok(run({...fixtures[0],overrideBinding:'stale-question'},1,true).needsMeaning));
test('HTML in user evidence is escaped',()=>{
 const r=run({...fixtures[0],meanings:['<img src=x onerror=alert(1)>','다른 체험']},1,true);
 for(const s of [r.why,r.futureComment,r.advice])assert.doesNotMatch(s,/<img/);
});
const duplicates = values=>values.length-new Set(values).size;
const skeleton=(text,row)=>row.pair.reduce((s,name)=>s.split(name).join('OPTION'),text).replace(/‘[^’]*’|“[^”]*”/g,'CONTENT');
const metrics={pairs:rows.length,confirmation:rows.filter(r=>r.confirmation).length,identicalWithinReport:rows.filter(r=>new Set([r.why,r.future,r.capture]).size<3).length};
for(const field of ['why','future','capture']){
 metrics[field]={afterExactDuplicates:duplicates(rows.map(r=>r[field]))};
 metrics[field].afterSkeletonDuplicates=duplicates(rows.map(r=>skeleton(r[field],r)));
 if(before) metrics[field].beforeExactDuplicates=duplicates(rows.map(r=>r.before[field]));
}
console.log(JSON.stringify({metrics,examples:rows.filter(r=>r.pair[0]==='동물원'||r.pair[0]==='연락한다')}));
console.log(`${count} meaning tests passed; ${before?'240 baseline seed comparisons':'baseline not supplied'}`);
