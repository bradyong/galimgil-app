const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  for(const width of [320,360,390]) for(const mode of ['v2','v3','unknown','throws']) {
   const page=await browser.newPage({viewport:{width,height:844},userAgent:'Mozilla/5.0 (Linux; Android 16; SM-F966N; wv) AppleWebKit/537.36 Version/4.0 Chrome/140 Mobile Safari/537.36'});
   await page.addInitScript(mode=>{
    if(mode==='v2') window.GalimgilAndroid={shareText(){}};
    if(mode==='v3') window.GalimgilAndroid={supportsPalmCamera:()=>true};
    if(mode==='throws') window.GalimgilAndroid={supportsPalmCamera(){throw Error('unavailable');}};
   },mode);
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto('http://127.0.0.1:8798/');
   await page.locator('[data-tab="ritual"]').click();
   assert.equal(await page.locator('#palmCameraButton').isVisible(),mode==='v3');
   assert.equal(await page.locator('#palmCameraCompatibility').count(),mode==='v3'?0:1);
   await page.evaluate(()=>{window.picked=[];document.querySelector('#palmInput').addEventListener('click',e=>{e.preventDefault();window.picked.push(e.target.getAttribute('capture'));});});
   if(mode==='v3') await page.locator('#palmCameraButton').click();
   await page.locator('#palmAlbumButton').click();
   assert.deepEqual(await page.evaluate(()=>window.picked),mode==='v3'?['environment',null]:[null]);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   assert.deepEqual(errors,[]);
   await page.screenshot({path:path.resolve(__dirname,`../../../galimgil-release-20261014/compat-${mode}-${width}.png`),fullPage:true});
   await page.close();
  }
  console.log('PASS: 12 mobile browser combinations; v2/v3/unknown/exception; album capture flag; no JS errors/overflow');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
