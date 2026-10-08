const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const responses=require('./fixtures/writer-responses.json');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});let calls=0;
  await page.route('**/api/choice-meaning',async route=>{calls++;await route.fulfill({json:responses[6]});});
  await page.goto(process.env.APP_URL);
  const submit=async()=>{
   await page.locator('#questionInput').fill('피곤한데 운동하고 공부할까 쉴까?');
   await page.locator('#choiceA').fill('운동하고 공부한다');await page.locator('#choiceB').fill('쉰다');
   await page.locator('#choiceSubmitButton').click();await page.locator('#choiceResult.show').waitFor();
  };
  await submit();assert.equal(calls,1);
  const read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('crossroads-choice-cards-v1'))[0]);
  const first=await read();
  assert.equal(first.details.contentSources.writerStatus,'accepted');
  assert.ok(first.details.contentSources.writerPayload);
  assert.equal(first.details.meaning.ai.writer,undefined);
  const firstSide=first.details.winner==='쉰다'?'b':'a';
  assert.equal(first.details.future,responses[6].writer[firstSide].future);
  await page.reload();await submit();assert.equal(calls,1);
  const second=await read();assert.equal(second.details.contentSources.writerStatus,'accepted');
  const side=second.details.winner==='쉰다'?'b':'a';
  assert.equal(second.details.future,responses[6].writer[side].future);
  assert.doesNotMatch(await page.locator('#choiceResult').innerText(),/\b(activity|observe|participate|setting|immediacy)\b/);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  console.log('PASS writer browser: accepted copy, separate archive payload, no extra request after reload, mobile bounds');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
