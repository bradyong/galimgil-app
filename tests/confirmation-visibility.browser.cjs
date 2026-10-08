// UI lifecycle test: injected semantic responses are not live interpretation proof.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const out=path.resolve(__dirname,'../../low-confidence-safety-20261006');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});const checks=[];
  let mode='ready',release,called,requests=0;
  await page.route('**/api/choice-future',r=>r.fulfill({json:{status:'unavailable'}}));
  await page.route('**/api/choice-meaning-only',async route=>{
   requests++;const p=route.request().postDataJSON();
   if(p.clarification){await route.continue();return;}
   const pending=new Promise(r=>release=r);called();await pending;
   if(mode==='network'){await route.abort();return;}
   if(mode==='unavailable'){await route.fulfill({json:{status:'unavailable'}});return;}
   const high=mode==='unknown';
   await route.fulfill({json:high?{status:'confirmation',code:'meaning-unresolved'}:{status:'ready',axes:[],meaning:{
    situation:p.question,optionA_meaning:p.a,optionB_meaning:p.b,meaningful_difference:p.a+' / '+p.b,
    explicit_facts:[],uncertainty:{level:'low'}}}});
  });
  const row=page.locator('#choiceMeaningRow');
  const submit=async(a,b,q='주말에 아이랑')=>{
   if(page.url().startsWith('http'))await page.evaluate(()=>localStorage.clear());
   await page.goto('http://127.0.0.1:8793/');assert.ok(await row.isHidden());
   await page.locator('#questionInput').fill(q);await page.locator('#choiceA').fill(a);await page.locator('#choiceB').fill(b);
   assert.ok(await row.isHidden());
   const sent=new Promise(r=>called=r);
   await page.locator('#choiceSubmitButton').click();await sent;
   assert.ok(await row.isHidden(),'hidden while semantic response is pending');release();
  };
  for(const [a,b] of [['키즈카페','놀이공원'],['버스','지하철'],['녹차','홍차']]){
   mode='ready';await submit(a,b);await page.locator('#choiceResult.show').waitFor();
   assert.ok(await row.isHidden());checks.push(`${a}/${b}: initial, typing, pending and ready hidden`);
  }
  for(mode of ['unavailable','network']){
   await submit('키즈카페','놀이공원');await page.locator('#choiceSubmitButton:not([disabled])').waitFor();
   assert.ok(await row.isHidden());assert.ok(await page.locator('#choiceResult').isHidden());
   assert.match(await page.locator('#choiceFeedback').innerText(),/응답을 받지 못/);checks.push(`${mode}: no confirmation or fabricated result`);
  }
  mode='unknown';await submit('눌비락','쨈누소','어떤 체험을 할까?');await row.waitFor({state:'visible'});
  assert.match(await page.locator('#choiceFeedback').innerText(),/어떤 건지/);
  await page.locator('#meaningA').fill('책을 읽고 감상을 기록하는 활동');
  await page.locator('#meaningB').fill('음악을 듣고 감상을 기록하는 활동');
  await page.locator('#choiceSubmitButton').click();await page.locator('#choiceResult.show').waitFor();
  assert.ok(await row.isHidden());checks.push('unknown: only after response; descriptions once then engine result');
  fs.writeFileSync(path.join(out,'confirmation-visibility-report.json'),JSON.stringify({checks,requests,api_calls:0,semantic_responses:'mocked for UI lifecycle; clarification uses actual local server'},null,2));
  console.log(JSON.stringify(checks));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
