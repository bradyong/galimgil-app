const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const {cases}=require('./canonical-cases.cjs');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});
  await page.goto(process.env.APP_URL||'http://127.0.0.1:8793/');
  const report=await page.evaluate(cases=>{
   for(const f of cases){
    const sign=signs[f.signIndex||0],n=buildChoiceNarrative(f.q,f.a,f.b,6,sign,choiceProfile(f.q,f.a,f.b),12345,null,null,{omitCapture:true});
    const capture=restoredChoiceCapture(n,12345,sign);
    if(!capture.text)continue;
    const card={date:'검증',question:f.q,choiceA:f.a,choiceB:f.b,createdAt:'capture-fixture',advice:capture.text,
     details:{winner:n.winner.name,loser:n.loser.name,percent:n.winnerScore,why:plainResultText(n.why),fortune:plainResultText(n.fortune),cards:n.zodiacCards,future:plainResultText(n.futureComment)}};
    openChoiceCard(card);
    const result=document.getElementById('choiceResult');
    return {caption:capture.text,display:result.querySelector('[data-capture-section]').textContent,
     order:[...result.querySelectorAll('h4')].map(e=>e.textContent),shared:choiceShareText(card)};
   }
   throw Error('No supported legacy caption');
  },cases);
  assert.ok(report.display.includes(report.caption));
  assert.ok(report.shared.includes(report.caption));
  assert.deepEqual(report.order.slice(-2),['미래의 나 댓글','캡처 한 줄']);
  for(const width of [320,390,1024]){
   await page.setViewportSize({width,height:844});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  }
  console.log(JSON.stringify(report,null,2));
  if(process.env.CAPTURE_SAVED_FIXTURE_URL){
   await page.goto(process.env.CAPTURE_SAVED_FIXTURE_URL);
   const saved=require('../../low-confidence-safety-20261006/live-path-20261008/cases.json').slice(0,5);
   const rows=await page.evaluate(async cases=>{
    const output=[];
    for(const f of cases){
     const sign=signs[0],local=buildChoiceNarrative(f.question,f.a,f.b,6,sign,choiceProfile(f.question,f.a,f.b),12345,null,null,{omitCapture:true});
     const n=await ChoiceRuntimeUI.resolve({question:f.question,a:f.a,b:f.b,mood:6,sign,local,archive:[]});
     if(n.needsMeaning||n.meaningUnavailable)throw Error(f.id+' fixture unavailable');
     const frozen=JSON.stringify(n),capture=restoredChoiceCapture(n,12345,sign,{question:f.question,a:f.a,b:f.b});
     if(frozen!==JSON.stringify(n))throw Error('Frozen result changed');
     const card={question:f.question,choiceA:f.a,choiceB:f.b,createdAt:f.id,advice:capture.text,
      details:{winner:n.winner.name,loser:n.loser.name,percent:n.winnerScore,why:plainResultText(n.why),fortune:n.fortune,cards:n.zodiacCards,future:''}};
     openChoiceCard(card);
     const visible=!!document.querySelector('[data-capture-section]') && document.querySelector('[data-capture-section]').textContent.includes(capture.text);
     const shared=choiceShareText(card).includes(capture.text);
     output.push({id:f.id,a:f.a,b:f.b,winner:n.winner.name,score:n.winnerScore,capture,visible,shared});
    }
    return output;
   },saved);
   for(const r of rows){
    assert.equal(r.capture.source,'LOCAL_SELECTION');assert.equal(r.visible,true);assert.equal(r.shared,true);
    assert.ok(r.capture.text.includes(r.winner));
   }
   console.log(JSON.stringify({savedFixtureCases:rows},null,2));
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
