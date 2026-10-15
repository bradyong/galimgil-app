const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  for(const width of [320,360,390]) {
   const page=await browser.newPage({viewport:{width,height:844}});
   await page.goto('http://127.0.0.1:8798/');
   await page.locator('[data-tab="ritual"]').click();
   const selected=[];
   await page.exposeFunction('selectedMode',value=>selected.push(value));
   await page.evaluate(()=>document.querySelector('#palmInput').addEventListener('click',e=>{e.preventDefault();window.selectedMode(e.target.getAttribute('capture'));}));
   await page.locator('#palmCameraButton').click();
   await page.locator('#palmAlbumButton').click();
   await page.waitForFunction(()=>document.querySelector('#palmInput').getAttribute('capture')===null);
   assert.deepEqual(selected,['environment',null]);
   for(const id of ['palmCameraButton','palmAlbumButton']) {
    const box=await page.locator('#'+id).boundingBox();
    assert.ok(box.height>=44&&box.x>=0&&box.x+box.width<=width);
   }
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   await page.locator('#palmInput').setInputFiles(path.resolve(__dirname,'../../../galimgil-brand-review-20261013/assets/existing-play-icon.png'));
   await page.waitForFunction(()=>document.querySelector('#palmPreview').naturalWidth>0);
   let requests=0;
   await page.route('**/api/palm-reading',route=>{requests++;return route.fulfill({status:503,json:{error:'Fixture only'}});});
   await page.locator('#palmButton').click();
   await page.waitForTimeout(50);
   assert.equal(requests,0);
   await page.locator('#palmConsent').check();
   await page.locator('#palmButton').click();
   await page.waitForFunction(()=>!document.querySelector('#palmButton').disabled);
   assert.equal(requests,1);
   assert.equal(await page.locator('#palmLoader').evaluate(e=>e.classList.contains('show')),false);
   await page.screenshot({path:path.resolve(__dirname,`../../ui-integration-20261013/palm-camera-${width}.png`),fullPage:true});
   await page.close();
  }
  const current=fs.readFileSync(path.resolve(__dirname,'../app.js'));
  assert.deepEqual(current,fs.readFileSync(path.resolve(__dirname,'../../../galimgil-brand-review-20261013/camera-fix-baseline/app.js')));
  console.log('PASS: 320/360/390, explicit modes, preview, consent gate, request/error recovery, app.js unchanged');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
