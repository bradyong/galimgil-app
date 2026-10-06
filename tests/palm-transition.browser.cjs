const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  const page=await browser.newPage(); let calls=0;
  await page.addInitScript(()=>{
   window.palmMessages=[];
   window.GalimgilAds={postMessage(raw){
    const m=JSON.parse(raw);window.palmMessages.push(m);
    if(m.type==='ready')this.onmessage({data:JSON.stringify({type:'config',palmAds:true,privacyRequired:false})});
    if(m.type==='preparePalm')this.onmessage({data:JSON.stringify({type:'next',request:m.request})});
   }};
  });
  await page.route('**/api/palm-reading',async route=>{
   calls++;
   const data=Object.fromEntries(['card_keyword','title','summary','visual_note','life_line','head_line','heart_line','fate_line','today_message','ritual'].map(k=>[k,'테스트 결과']));
   await route.fulfill({json:data});
  });
  await page.goto(process.env.APP_URL || 'http://127.0.0.1:8788/');
  await page.locator('[data-tab="ritual"]').click();
  await page.locator('#palmButton').click();
  assert.equal(await page.evaluate(()=>palmMessages.filter(m=>m.type==='preparePalm').length),0);
  await page.locator('#palmInput').setInputFiles({name:'fixture.png',mimeType:'image/png',buffer:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aRZkAAAAASUVORK5CYII=','base64')});
  await page.locator('#palmButton').click();
  assert.equal(await page.evaluate(()=>palmMessages.filter(m=>m.type==='preparePalm').length),0);
  await page.locator('#palmConsent').check();
  for(let i=1;i<=2;i++){
   await page.locator('#palmButton').click();
   await page.waitForFunction(()=>!document.getElementById('palmButton').disabled);
   assert.equal(calls,i);
   assert.equal(await page.evaluate(()=>palmMessages.filter(m=>m.type==='preparePalm').length),i);
  }
  console.log('PASS palm integration: invalid photo/consent do not count; valid requests traverse bridge and continue (mock only, no paid API or ads)');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
