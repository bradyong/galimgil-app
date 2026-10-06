const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
function engine(file) {
  const c = vm.createContext({localStorage:{getItem:()=>null}, console});
  vm.runInContext(fs.readFileSync(path.join(root,'choice-input.js'),'utf8'),c);
  const text = fs.readFileSync(file,'utf8');
  vm.runInContext(text.slice(0,text.indexOf('document.getElementById("todayDate").textContent')),c);
  return (q,a,b,seed=12345) => {
    c.input = {q,a,b,seed};
    return vm.runInContext(`(() => {
      const {q,a,b,seed}=input, p=choiceProfile(q,a,b);
      const check=ChoiceInput.inspect(q,a,b,(x)=>findFeatureEntry(x)?.item.category);
      if(check.message) return {invalid:true};
      return buildChoiceNarrative(q,a,b,6,signs[0],p,seed);
    })()`,c);
  };
}
const run = engine(path.join(root,'app.js'));
let count=0;
function test(name,fn) { fn(); count++; console.log('PASS '+name); }
test('simple concrete pair supported',()=>assert.equal(run('저녁 뭐 먹을까?','치킨','피자').understanding.level,'supported'));
test('simple negative action supported',()=>assert.equal(run('연락할까?','연락한다','연락하지 않는다').understanding.level,'supported'));
test('mixed context flagged',()=>assert.equal(run('출근하지만 운동도 하고 싶어','출근한다','쉰다').understanding.level,'low'));
test('question negation not silently trusted',()=>assert.ok(run('연락하지 않아도 될까?','연락한다','연락하지 않는다').understanding.reasons.includes('question-negation-unverified')));
test('different action meanings flagged',()=>assert.ok(run('무엇부터?','공부한다','청소한다').understanding.reasons.includes('mixed-context')));
test('conditional context needs verification',()=>assert.ok(run('다이어트 중인데 오늘 어떻게 할까?','쉰다','운동한다').understanding.reasons.includes('condition-scope-unverified')));
test('fallback is not extracted evidence',()=>{
 const r=run('저녁 메뉴','루모벡','테노풉');
 assert.equal(r.understanding.level,'low');
 for(const e of r.understanding.evidence) if(e.source==='fallback') assert.equal(e.features.length,0);
 assert.ok(r.understanding.evidence.some(e=>e.source==='fallback'));
});
test('new term not promoted to known fact',()=>{
  const r=run('저녁 메뉴','프룬젤','트롤핀');
  assert.equal(r.understanding.level,'low');
  assert.ok(r.understanding.evidence.every(e=>e.source!=='feature-bank'));
  assert.equal(r.needsMeaning,true);
  assert.equal(r.why,undefined);
});
test('double negation still clarifies',()=>assert.ok(run('어떻게?','안 할 수 없다','한다').invalid));
test('reason contrast retains negative label',()=>assert.match(run('연락할까?','연락한다','연락하지 않는다').why,/연락하지 않는다/));
test('distinct action explanations do not share fixed body',()=>{
  const reasons=[['오늘 회사 출근할까?','출근한다','출근 안 한다'],['저녁 먹을까?','먹는다','먹지 않는다'],['연락할까?','연락한다','연락하지 않는다']].map(x=>run(...x).why.replace(/‘[^’]*’/g,'OPTION'));
  assert.equal(new Set(reasons).size,3);
});

// Existing offline reproduce.cjs corpus, deduplicated by question and unordered A/B.
const corpus=[
 ['오늘 회사 출근할까?','출근 안 한다','출근한다'],
 ['저녁 먹을까?','먹지 않는다','먹는다'],
 ['연락할까?','연락하지 않는다','연락한다'],
 ['동물원에서 뭘 볼까?','판다','호랑이'],
 ['다이어트 중인데 오늘 어떻게 할까?','쉰다','운동한다'],
 ['','치킨','치킨'],['','그거','저거'],
 ['친구랑 저녁 뭐 먹을까?','피자','치킨']
];
const reports=corpus.map(x=>run(...x));
const valid=reports.filter(r=>!r.invalid && !r.needsMeaning);
// Mask both option names and echoed questions so cosmetic interpolation does not count.
const skeleton = s=>s.replace(/‘[^’]*’/g,'OPTION').replace(/“[^”]*”/g,'QUESTION');
const duplicateExcess = rs=>rs.length-new Set(rs.map(r=>skeleton(r.why))).size;
const metrics={source:'existing offline reproduction fixtures, not production traffic',total:reports.length,invalid:reports.filter(r=>r.invalid).length,needsMeaning:reports.filter(r=>r.needsMeaning).length,eligible:valid.length,afterDuplicateExcess:duplicateExcess(valid)};
if(process.env.BASELINE_APP) {
 const before=engine(process.env.BASELINE_APP);
 const old=corpus.map(x=>before(...x)).filter(r=>!r.invalid);
 metrics.beforeDuplicateExcess=duplicateExcess(old);
 test('scores and stars unchanged on immediately interpretable corpus',()=>{
  for(const x of corpus) for(let seed=0;seed<30;seed++) {
   const a=before(...x,seed), b=run(...x,seed);
   if(a.invalid) { assert.ok(b.invalid); continue; }
   if(b.needsMeaning) { assert.equal(b.why,undefined); continue; }
   for(const key of ['winnerScore','loserScore','recommendA','fortune','finalText']) assert.equal(b[key],a[key],key);
  }
 });
 assert.ok(metrics.afterDuplicateExcess < metrics.beforeDuplicateExcess);
}
console.log(JSON.stringify(metrics));
console.log(`${count} understanding tests passed`);
