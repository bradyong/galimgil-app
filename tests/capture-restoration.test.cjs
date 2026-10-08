const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {engine}=require('./semantic-eval.cjs');
const {cases,envelope}=require('./canonical-cases.cjs');
const root=path.resolve(__dirname,'..');
function context(){
 const ctx=vm.createContext({console,localStorage:{getItem:()=>null}});
 vm.runInContext(fs.readFileSync(path.join(root,'choice-input.js'),'utf8'),ctx);
 const source=fs.readFileSync(path.join(root,'app.js'),'utf8');
 vm.runInContext(source.slice(0,source.indexOf('document.getElementById("todayDate").textContent')),ctx);
 return ctx;
}
test('supported legacy captions are deterministic and never mutate frozen narratives',()=>{
 const baseline=JSON.parse(fs.readFileSync(path.resolve(root,'../low-confidence-safety-20261006/writer-frozen-baseline.json'),'utf8'));
 const run=engine(),ctx=context();let restored=0;
 for(const row of baseline.rows.filter(r=>r.route==='existing-rule')){
  const n=run(cases[row.index],envelope(row.index)),before=JSON.stringify(n);ctx.n=n;
  const f=cases[row.index];ctx.input={question:f.q,a:f.a,b:f.b};
  const caption=vm.runInContext('restoredChoiceCapture(n,12345,signs[0],input)',ctx);
  assert.equal(JSON.stringify(n),before);
  assert.equal(caption.text,vm.runInContext('restoredChoiceCapture(n,12345,signs[0],input).text',ctx));
  if(caption.text){assert.ok(['EXISTING','LOCAL_SELECTION'].includes(caption.source));restored++;}
 }
 assert.equal(restored,8,'all eight existing results have captions');
});
test('semantic results never reuse unrelated category jokes in five requested cases',()=>{
 const ctx=context();
 for(const [a,b] of [['키즈카페','놀이공원'],['버스','지하철'],['녹차','홍차'],['집에서 쉬기','산책하기'],['수첩에 감상 적기','음성 메모 남기기']]){
  ctx.n={runtimeMeaning:{},winner:{name:a},loser:{name:b},understanding:{level:'supported'}};
  const result=vm.runInContext('restoredChoiceCapture(n,12345,signs[0])',ctx);
  assert.ok(result.text.includes(a));assert.ok(!result.text.includes(b));
  assert.equal(result.source,'LOCAL_SELECTION');
 }
});
test('capture validates legacy candidates by full winner-bound form, not substring guesses',()=>{
 const ctx=context();
 assert.equal(vm.runInContext('safeLegacyCapture("인생은 몰라도 오늘은 버스입니다.", "지하철")',ctx),false);
 assert.equal(vm.runInContext('safeLegacyCapture("지하철은 더 빠르고 저렴합니다.", "지하철")',ctx),false);
 assert.equal(vm.runInContext('safeLegacyCapture("인생은 몰라도 오늘은 지하철입니다.", "지하철")',ctx),true);
});
test('selection captions preserve negation, original names, both winners and option swap',()=>{
 const ctx=context();
 for(const [a,b] of [['연락한다','연락하지 않는다'],['안 가지 않는다','가지 않는다'],['메모','음성 메모'],['<선택 A>','선택 B']]){
  for(const winner of [a,b]){
   ctx.n={runtimeMeaning:{},winner:{name:winner},loser:{name:winner===a?b:a}};
   ctx.input={question:'어떻게 할까?',a,b};
   const before=JSON.stringify(ctx.n),r=vm.runInContext('restoredChoiceCapture(n,1,null,input)',ctx);
   assert.ok(r.text.includes(`‘${winner}’`));assert.equal(r.evidence.winner,winner);
   ctx.input={question:'어떻게 할까?',a:b,b:a};
   assert.equal(vm.runInContext('restoredChoiceCapture(n,999,null,input).text',ctx),r.text);
   assert.equal(JSON.stringify(ctx.n),before);
  }
 }
 ctx.n={winner:{name:'없는 선택'}};ctx.input={a:'A',b:'B'};
 assert.equal(vm.runInContext('restoredChoiceCapture(n,1,null,input).source',ctx),'INVALID_WINNER_BINDING');
});
test('history captions share unchanged after FUTURE without migration',()=>{
 const ctx=context();
 ctx.card={question:'질문',choiceA:'A',choiceB:'B',recommended:'A',advice:'기존 기록의 한 줄',details:{winner:'A',loser:'B',percent:53,why:'이유',cards:[],fortune:'별',future:'미래 댓글'}};
 const before=JSON.stringify(ctx.card);
 const text=vm.runInContext('choiceShareText(card)',ctx);
 assert.ok(text.includes('캡처 한 줄: 기존 기록의 한 줄'));
 assert.ok(text.indexOf('미래 댓글')<text.indexOf('캡처 한 줄'));
 assert.equal(JSON.stringify(ctx.card),before);
 delete ctx.card.advice;
 assert.ok(!vm.runInContext('choiceShareText(card)',ctx).includes('캡처 한 줄'));
});
test('context is an exact source span, preserving negation and excluding option mentions',()=>{
 const ctx=context();
 for(const question of ['이번에는 야근을 안 하려고 하는데 일이 남았어.','초대를 거절 못 할 건 아니지만 고민이야.','처음 듣는 조어를 기록하는데 어떻게 하지?']){
  ctx.q=question;
  const context=vm.runInContext('captureOriginalContext(q,"A","B")',ctx);
  assert.ok(question.includes(context));assert.ok(context.length>0);
  if(question.includes('안 하려고'))assert.ok(context.includes('안 하려고'));
  if(question.includes('못 할 건 아니지만'))assert.ok(context.includes('못 할 건 아니지만'));
 }
 assert.equal(vm.runInContext('captureOriginalContext("버스가 싫은데", "버스", "지하철")',ctx),'');
 assert.equal(vm.runInContext('captureOriginalContext("", "A", "B")',ctx),'');
 const patterns=vm.runInContext('captureSelectionPatterns("선택", "원문 상황")',ctx);
 for(const text of patterns){assert.equal((text.match(/[.!?]/g)||[]).length,1);assert.ok(text.includes('원문 상황'));}
});
test('image includes original caption after future and sizes canvas to content',()=>{
 const drawn=[];const ctx=context();
 ctx.document={createElement:()=>({getContext:()=>({measureText:s=>({width:s.length*20}),fillRect(){},fillText:s=>drawn.push(s)})})};
 vm.runInContext(fs.readFileSync(path.join(root,'choice-runtime.js'),'utf8'),ctx);
 ctx.card={question:'질문',choiceA:'A',choiceB:'B',advice:'공유할 한 줄',details:{winner:'A',percent:53,cards:[],future:'미래 댓글'}};
 const canvas=vm.runInContext('createChoiceShareImage(card)',ctx);
 assert.ok(drawn.includes('공유할 한 줄'));assert.ok(drawn.indexOf('미래 댓글')<drawn.indexOf('공유할 한 줄'));
 assert.ok(canvas.height>=1350);
});
