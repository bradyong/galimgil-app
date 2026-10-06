const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const responses=require('./fixtures/semantic-responses.json');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});let calls=0,release;
  await page.route('**/api/choice-meaning',async route=>{calls++;const p=route.request().postDataJSON();
   if(p.question==='이번 주말 어디 놀러갈까?')await new Promise(resolve=>{release=resolve;});
   await route.fulfill({json:p.a==='동물원'?responses[0]:{status:'confirmation'}});
  });
  await page.goto(process.env.APP_URL);
  const fill=async(q,a,b)=>{await page.locator('#questionInput').fill(q);await page.locator('#choiceA').fill(a);await page.locator('#choiceB').fill(b);};
  const submit=()=>page.locator('#choiceSubmitButton').click();
  const reset=()=>page.getByRole('button',{name:'다른 고민하기',exact:true}).click();
  await fill('저녁 뭐 먹을까?','피자','치킨');await submit();await page.locator('#choiceResult.show').waitFor();
  assert.equal(calls,0);await reset();
  await fill('어디 놀러갈까?','동물원','놀이동산');await submit();await page.locator('#choiceResult.show').waitFor();
  assert.equal(calls,1);assert.ok(await page.locator('#choiceMeaningRow').isHidden());
  const card=await page.evaluate(()=>JSON.parse(localStorage.getItem('crossroads-choice-cards-v1'))[0]);
  assert.equal(card.details.meaning.options[0].source,'ai-semantic');
  await page.reload();await fill('어디 놀러갈까?','동물원','놀이동산');await submit();await page.locator('#choiceResult.show').waitFor();
  assert.equal(calls,1);await reset();
  await fill('뭐가 좋을까?','처음보는말','또다른말');await submit();await page.locator('#choiceMeaningRow').waitFor({state:'visible'});
  assert.equal(calls,2);await submit();await page.locator('#choiceSubmitButton:not([disabled])').waitFor();assert.equal(calls,2);
  assert.ok(await page.locator('#choiceResult').isHidden());
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const savedCount=await page.evaluate(()=>JSON.parse(localStorage.getItem('crossroads-choice-cards-v1')).length);
  await fill('이번 주말 어디 놀러갈까?','동물원','놀이동산');await submit();
  while(!release)await new Promise(resolve=>setTimeout(resolve,10));
  await page.locator('#questionInput').fill('수정한 질문');
  await page.locator('#questionInput').fill('이번 주말 어디 놀러갈까?');
  release();await page.locator('#choiceSubmitButton:not([disabled])').waitFor();
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('crossroads-choice-cards-v1')).length),savedCount);
  assert.ok(await page.locator('#choiceResult').isHidden());
  console.log('PASS browser: rules zero calls; semantic result; archive reuse after reload; failure confirmation; no retry; mobile bounds');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
