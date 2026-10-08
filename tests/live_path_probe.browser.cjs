const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const out=path.resolve(__dirname,'../../low-confidence-safety-20261006/live-path-20261008');
const read=n=>JSON.parse(fs.readFileSync(path.join(out,n),'utf8'));
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});const results=[];
 try{
  for(const c of read('cases.json')){
   if(read('ledger.json').stopped)break;
   const page=await browser.newPage({viewport:{width:390,height:844}});const requests=[],responses=[],errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('request',r=>{if(r.url().includes('/api/choice-'))requests.push({url:r.url(),at:Date.now()});});
   page.on('response',async r=>{if(r.url().includes('/api/choice-'))responses.push({url:r.url(),at:Date.now(),data:await r.json().catch(()=>null)});});
   await page.goto('http://127.0.0.1:8794/');
   const initiallyHidden=await page.locator('#choiceMeaningRow').isHidden();
   await page.locator('#questionInput').fill(c.question);await page.locator('#choiceA').fill(c.a);await page.locator('#choiceB').fill(c.b);
   await page.evaluate(()=>{
    window.confirmationVisibility=[];window.resultShownAt=null;
    new MutationObserver(()=>{if(!document.querySelector('#choiceMeaningRow').hidden)window.confirmationVisibility.push(Date.now());})
      .observe(document.querySelector('#choiceMeaningRow'),{attributes:true,attributeFilter:['hidden']});
    new MutationObserver(()=>{if(document.querySelector('#choiceResult').classList.contains('show'))window.resultShownAt??=Date.now();})
      .observe(document.querySelector('#choiceResult'),{attributes:true,attributeFilter:['class']});
   });
   await page.locator('#choiceSubmitButton').click();
   await page.waitForFunction(()=>!document.querySelector('#choiceSubmitButton').disabled,{},{timeout:55000});
   const first=await page.evaluate(()=>({card:JSON.parse(localStorage.getItem('crossroads-choice-cards-v1')||'[]')[0],
    shown:document.querySelector('#choiceResult').classList.contains('show'),confirmation:!document.querySelector('#choiceMeaningRow').hidden,
    feedback:document.querySelector('#choiceFeedback').textContent,visibility:window.confirmationVisibility,resultShownAt:window.resultShownAt}));
   if(first.card?.details.futureStatus==='pending')await page.waitForFunction(()=>JSON.parse(localStorage.getItem('crossroads-choice-cards-v1'))[0].details.futureStatus!=='pending',{},{timeout:40000});
   const card=await page.evaluate(()=>JSON.parse(localStorage.getItem('crossroads-choice-cards-v1')||'[]')[0]);
   await page.waitForTimeout(300);
   const result={...c,initiallyHidden,first,card,requests,responses,errors};results.push(result);
   fs.writeFileSync(path.join(out,'browser.json'),JSON.stringify(results,null,2));
   await page.screenshot({path:path.join(out,c.id+'.png'),fullPage:true});
   console.log(c.id,JSON.stringify({confirmation:first.confirmation,result:first.shown,future:card?.details.futureStatus,requests:requests.length}));
   await page.close();
  }
  const page=await browser.newPage();
  await page.route('**/api/choice-meaning-only',r=>r.abort('failed'));
  await page.goto('http://127.0.0.1:8794/');
  const c=read('cases.json')[0];
  await page.locator('#questionInput').fill(c.question);await page.locator('#choiceA').fill(c.a);await page.locator('#choiceB').fill(c.b);
  let count=0;page.on('request',r=>{if(r.url().endsWith('/api/choice-meaning-only'))count++;});
  await page.locator('#choiceSubmitButton').click();await page.waitForFunction(()=>!document.querySelector('#choiceSubmitButton').disabled);
  await page.waitForTimeout(1000);
  const failure={confirmationHidden:await page.locator('#choiceMeaningRow').isHidden(),feedback:await page.locator('#choiceFeedback').innerText(),requests:count,external_calls:0};
  assert.ok(failure.confirmationHidden);assert.match(failure.feedback,/응답을 받지 못/);assert.equal(count,1);
  fs.writeFileSync(path.join(out,'failure-ui.json'),JSON.stringify(failure,null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
