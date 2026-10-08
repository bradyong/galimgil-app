const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const responses=require('./fixtures/semantic-v2-responses.json');
const play=require('./fixtures/play-axes-responses.json');
const tea=require('./fixtures/tea-semantic-response.json');
const canonical=require('./canonical-cases.cjs');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  const page=await browser.newPage({viewport:{width:390,height:844}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));let calls=0;
  await page.route('**/api/choice-meaning',route=>{
   calls++;const p=route.request().postDataJSON();
   const index=canonical.cases.findIndex(f=>f.q===p.question&&f.a===p.a&&f.b===p.b);
   const ai=index>=0?canonical.envelope(index):null;
   if(ai)return route.fulfill({json:{status:'ready',meaning:ai.meaning,canonical_axes:ai.canonical_axes}});
   return route.fulfill({json:p.a==='녹차'?tea:p.a==='동물원'?{...responses[0],play_axes:play[0].play_axes}:{status:'confirmation'}});
  });
  await page.goto(process.env.APP_URL);
  const fill=async(q,a,b)=>{await page.locator('#questionInput').fill(q);await page.locator('#choiceA').fill(a);await page.locator('#choiceB').fill(b);};
  const submit=()=>page.locator('#choiceSubmitButton').click();
  const result=()=>page.locator('#choiceResult.show').waitFor();
  const reset=()=>page.locator('#newChoiceButton').click();
  await fill('저녁 뭐 먹을까?','피자','치킨');await submit();await result();assert.equal(calls,0);await reset();
  await fill('어디 놀러갈까?','동물원','놀이동산');await submit();
  await result();
  assert.ok(await page.locator('#choiceMeaningRow').isHidden());assert.equal(calls,1);
  assert.equal(await page.locator('[data-choice-basis]').count(),0);
  assert.match(await page.locator('.winner-line').innerText(),/놀이동산/);
  assert.doesNotMatch(await page.locator('.result-balance').innerText(),/null|NaN/);
  assert.match(await page.locator('.result-balance').innerText(),/%/);
  if(process.env.SCREENSHOT_PATH)await page.screenshot({path:process.env.SCREENSHOT_PATH,fullPage:true});
  await page.reload();await fill('어디 놀러갈까?','동물원','놀이동산');await submit();await result();
  assert.equal(calls,1);assert.ok(await page.locator('#choiceMeaningRow').isHidden());await reset();
  await fill('오늘 마실 차는?','녹차','홍차');await submit();await result();
  assert.equal(calls,2);assert.ok(await page.locator('#choiceMeaningRow').isHidden());
  assert.match(await page.locator('.result-balance').innerText(),/50/);await reset();
  await fill('둘 중 뭐가 좋을까?','드르밈 체험','쀼라코 활동');await submit();
  await page.locator('#choiceMeaningRow').waitFor({state:'visible'});assert.equal(calls,3);
  await page.locator('#meaningA').fill('종이에 그림을 그리는 체험');
  await page.locator('#meaningB').fill('점토를 빚는 활동');
  assert.equal(await page.locator('#meaningAxis').count(),0);
  await page.locator('#meaningB').press('Enter');await result();assert.equal(calls,3);
  assert.match(await page.locator('.winner-line').innerText(),/쀼라코|드르밈/);
  assert.ok(await page.locator('#choiceMeaningRow').isHidden());
  for(const i of [6,15,23]) {
   await reset();const f=canonical.cases[i];await fill(f.q,f.a,f.b);await submit();await result();
   assert.ok(await page.locator('#choiceMeaningRow').isHidden());
   assert.doesNotMatch(await page.locator('.result-balance').innerText(),/50%|NaN|null/);
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.setViewportSize({width:1280,height:900});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.deepEqual(errors,[]);
  console.log('PASS browser: normal zero calls; understood direct result; unknown meaning once; no preference controls; reload reuse; no retry/API duplication; mobile/desktop bounds; no runtime errors');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
