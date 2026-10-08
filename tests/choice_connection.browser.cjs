const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const out=path.resolve(__dirname,'../../low-confidence-safety-20261006');
const read=n=>JSON.parse(fs.readFileSync(path.join(out,n),'utf8'));
const rows=read('meaning-only-replay.json').rows;
const baseline=read('play-writer-output.json').rows;
const pilot=read('future-only-pilot-report.json').rows;
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const checks=[],errors=[];
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});
  await page.addInitScript(()=>{
   const NativeDate=Date,start=NativeDate.now(),baseline=NativeDate.parse('2026-10-07T12:00:00Z');
   globalThis.Date=class extends NativeDate{
    constructor(...args){super(...(args.length?args:[baseline+NativeDate.now()-start]));}
    static now(){return 1791244800000;}
   };
  });
  page.on('pageerror',e=>errors.push(e.message));
  let futureCalls=0;
  page.on('request',r=>{if(r.url().endsWith('/api/choice-future'))futureCalls++;});
  await page.goto(process.env.APP_URL||'http://127.0.0.1:8793/');
  const results=await page.evaluate(async rows=>{
   const output=[];
   for(const r of rows){
    const args={question:r.question,a:r.a,b:r.b,mood:6,sign:signs[0],archive:[]};
    const local=buildChoiceNarrative(r.question,r.a,r.b,6,signs[0],choiceProfile(r.question,r.a,r.b),12345,null,null,{omitCapture:true});
    const n=await ChoiceRuntimeUI.resolve({...args,local});
    const capture=restoredChoiceCapture(n,12345,signs[0],{question:r.question,a:r.a,b:r.b});
    output.push({id:r.id,confirmation:!!n.needsMeaning,winner:n.winner?.name,score:n.winnerScore,why:plainResultText(n.why),source:n.scoreSource,capture});
   }
   return output;
  },rows);
  for(const r of results){
   const expected=baseline.find(b=>b.id===r.id);
   if(!expected){assert.equal(r.confirmation,true);assert.equal(r.capture.text,'');continue;}
   assert.equal(r.confirmation,false,r.id);
   assert.ok(r.capture.text.includes(r.winner),r.id+' capture bound to final winner');
   assert.deepEqual([r.winner,r.score,r.why],[expected.winner,expected.score,expected.why],r.id);
  }
  assert.equal(results.filter(r=>r.confirmation).length,3);
  assert.equal(results.filter(r=>r.source==='PURE_PLAY').length,25);
  assert.equal(results.filter(r=>r.source==='VERIFIED_SEMANTIC').length,3);
  checks.push('31 real browser/server paths: 28 exact winner/score/WHY, 3 confirmation');
  const {cases}=require('./canonical-cases.cjs');
  const normal=read('writer-frozen-baseline.json').rows.filter(r=>r.route==='existing-rule').map(r=>cases[r.index]);
  const fast=await page.evaluate(async cases=>{
   for(const f of cases){
    const profile=choiceProfile(f.q,f.a,f.b),sign=signs[f.signIndex||0];
    const before=buildChoiceNarrative(f.q,f.a,f.b,f.mood||6,sign,profile,12345);
    const local=buildChoiceNarrative(f.q,f.a,f.b,f.mood||6,sign,profile,12345,null,null,{omitCapture:true});
    const after=await ChoiceRuntimeUI.resolve({question:f.q,a:f.a,b:f.b,mood:f.mood||6,sign,local,archive:[]});
    for(const key of ['winnerScore','why','futureComment'])if(before[key]!==after[key])throw Error(key+' regression');
    if(before.winner.name!==after.winner.name||after.runtimeMeaning)throw Error('existing route changed');
   }
   return cases.length;
  },normal);
  assert.equal(fast,8);checks.push('8 existing paths retain winner/score/WHY/FUTURE without Writer');
  const fill=async r=>{
   await page.locator('#questionInput').fill(r.question);
   await page.locator('#choiceA').fill(r.a);await page.locator('#choiceB').fill(r.b);
   await page.locator('#signInput').selectOption({index:0});
   await page.locator('#choiceSubmitButton').click();
  };
  const success=pilot.find(r=>r.future_only.pass);
  await fill(success);
  await page.locator('#choiceResult.show [data-future-section]:not([hidden])').waitFor();
  assert.equal(await page.locator('[data-future-section] blockquote').innerText(),success.future_only.future);
  assert.ok((await page.locator('#choiceResult').innerText()).includes('캡처 한 줄'));
  assert.equal(futureCalls,1);
  const card=await page.evaluate(()=>JSON.parse(localStorage.getItem('crossroads-choice-cards-v1'))[0]);
  assert.equal(card.details.winner,success.winner);
  await page.evaluate(()=>{navigator.share=async data=>{window.shared=data;};});
  await page.locator('#choiceShareButton').click();
  const shared=await page.evaluate(()=>window.shared);
  assert.ok(shared.text.includes(success.future_only.future));
  assert.ok(shared.text.includes('별 한 스푼'));assert.ok(shared.text.includes('캡처 한 줄'));
  const image=await page.evaluate(card=>{
   const c=createChoiceShareImage(card),ctx=c.getContext('2d'),pixels=ctx.getImageData(0,0,c.width,c.height).data;
   let colored=0;for(let i=0;i<pixels.length;i+=4)if(pixels[i]!==10||pixels[i+1]!==20||pixels[i+2]!==26)colored++;
   return {url:c.toDataURL(),width:c.width,height:c.height,colored};
  },card);
  assert.ok(image.colored>10000);assert.equal(image.width,1080);
  fs.writeFileSync(path.join(out,'connection-share.png'),Buffer.from(image.url.split(',')[1],'base64'));
  const downloaded=page.waitForEvent('download');
  await page.locator('#downloadChoiceButton').click();
  await (await downloaded).saveAs(path.join(out,'connection-button-download.png'));
  assert.ok(fs.statSync(path.join(out,'connection-button-download.png')).size>10000);
  for(const width of [320,390,1280]){
   await page.setViewportSize({width,height:844});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${width}`);
   await page.screenshot({path:path.join(out,`connection-${width}.png`),fullPage:true});
  }
  checks.push('FUTURE success unchanged; capture restored; share text/image and download button; mobile 320/390 and desktop bounds');
  await page.reload();
  await page.evaluate(card=>openChoiceCard(card),card);
  assert.equal(await page.locator('[data-future-section] blockquote').innerText(),success.future_only.future);
  assert.equal(futureCalls,1);
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('crossroads-choice-cards-v1'))[0].details.future),success.future_only.future);
  checks.push('saved history survives reload; opening result does not regenerate FUTURE');
  await page.locator('#newChoiceButton').click();
  const failure=pilot.find(r=>!r.future_only.pass);
  await fill(failure);
  await page.locator('#choiceResult.show').waitFor();
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('crossroads-choice-cards-v1'))[0].details.futureStatus==='unavailable');
  assert.ok(await page.locator('[data-future-section]').isHidden());
  assert.ok(await page.locator('#choiceShareButton').isVisible());
  assert.equal(futureCalls,2);
  await page.waitForTimeout(800);assert.equal(futureCalls,2);
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:path.join(out,'connection-failure.png'),fullPage:true});
  checks.push('missing/failed FUTURE hidden only; winner, save/share remain; no automatic retry');
  await page.locator('#newChoiceButton').click();
  await fill(rows.find(r=>r.expected_unknown));
  await page.locator('#choiceMeaningRow').waitFor({state:'visible'});
  assert.ok(await page.locator('#choiceResult').isHidden());
  assert.equal(futureCalls,2);
  checks.push('unknown coined input opens inline meaning confirmation without result or FUTURE call');
  await page.locator('#meaningA').fill('책을 읽고 감상을 기록하는 활동');
  await page.locator('#meaningB').fill('음악을 듣고 감상을 기록하는 활동');
  await page.locator('#choiceSubmitButton').click();
  await page.locator('#choiceResult.show').waitFor();
  assert.ok(await page.locator('#choiceMeaningRow').isHidden());
  checks.push('one meaning clarification proceeds to result');
  await page.locator('#newChoiceButton').click();
  await page.route('**/api/choice-future',route=>route.abort('failed'));
  await fill(pilot.filter(r=>r.future_only.pass)[1]);
  await page.locator('#choiceResult.show').waitFor();
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('crossroads-choice-cards-v1'))[0].details.futureStatus==='unavailable');
  const failures=futureCalls;
  assert.ok(await page.locator('[data-future-section]').isHidden());
  await page.waitForTimeout(800);assert.equal(futureCalls,failures);
  checks.push('transport failure leaves result usable, hides FUTURE and does not retry');
  assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(out,'connection-browser-report.json'),JSON.stringify({checks,results,futureCalls,external_api_calls:0,errors},null,2));
  console.log(JSON.stringify({checks,futureCalls,errors},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
