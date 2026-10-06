const assert=require('node:assert/strict'), vm=require('node:vm'), fs=require('node:fs');
const source=fs.readFileSync(require('node:path').join(__dirname,'../native-ads-events.js'),'utf8');
let total=0;
function test(name,fn){fn();console.log('PASS '+name);total++;}
function setup(bridge=true,palm=true){
 const messages=[],tasks=new Map(),events={};let seq=0;
 const privacy={hidden:true},button={addEventListener(t,f){this.click=f;}};
 const document={hidden:false,getElementById:id=>id==='adPrivacyEntry'?privacy:button};
 const window={addEventListener:(t,f)=>events[t]=f};
 if(bridge)window.GalimgilAds={postMessage:raw=>messages.push(JSON.parse(raw))};
 vm.runInNewContext(source,{window,document,setTimeout:f=>{tasks.set(++seq,f);return seq;},clearTimeout:id=>tasks.delete(id)});
 const receive=m=>window.GalimgilAds.onmessage({data:JSON.stringify(m)});
 if(bridge)receive({type:'config',palmAds:palm,privacyRequired:true});
 return {api:window.GalimgilAdsEvents,messages,document,privacy,button,receive,events,
 tick(){for(const [id,f] of [...tasks]){tasks.delete(id);f();}},count:t=>messages.filter(m=>m.type===t).length};
}
test('A/B is unlimited and never sends advertising/count events',()=>{const h=setup();let n=0;for(let i=0;i<100;i++){h.api.resultShown(String(i),true);h.api.nextQuestion(()=>n++);}assert.equal(n,100);assert.deepEqual(h.messages.map(m=>m.type),['ready']);});
test('browser palm is immediate',()=>{const h=setup(false);let n=0;h.api.beforePalm(()=>n++);assert.equal(n,1);});
test('old APK palm is immediate without legacy A/B fallback',()=>{const h=setup(true,false);let n=0;h.api.beforePalm(()=>n++);assert.equal(n,1);assert.equal(h.count('preparePalm'),0);});
test('privacy behavior preserved',()=>{const h=setup();assert.equal(h.privacy.hidden,false);h.button.click();assert.equal(h.count('privacy'),1);h.api.updatePrivacy(false);assert.equal(h.privacy.hidden,true);});
test('unready native responds next immediately',()=>{const h=setup();let n=0;h.api.beforePalm(()=>n++);h.receive({type:'next',request:h.messages.at(-1).request});assert.equal(n,1);});
test('no native response fails open; late offers ignored',()=>{const h=setup();let n=0;h.api.beforePalm(()=>n++);const request=h.messages.at(-1).request;h.tick();assert.equal(n,1);h.receive({type:'offer',request});assert.equal(h.count('acceptPalm'),0);});
test('dismissal resumes exactly once without timer under ad',()=>{const h=setup();let n=0;h.api.beforePalm(()=>n++);const request=h.messages.at(-1).request;h.receive({type:'offer',request});h.tick();assert.equal(n,0);h.receive({type:'next',request});h.receive({type:'next',request});assert.equal(n,1);});
test('double taps and duplicate offers cannot show twice',()=>{const h=setup();h.api.beforePalm(()=>{});h.api.beforePalm(()=>{});const request=h.messages.at(-1).request;h.receive({type:'offer',request});h.receive({type:'offer',request});assert.equal(h.count('preparePalm'),1);assert.equal(h.count('acceptPalm'),1);});
test('background before offer cancels',()=>{const h=setup();let n=0;h.api.beforePalm(()=>n++);const request=h.messages.at(-1).request;h.document.hidden=true;h.receive({type:'offer',request});assert.equal(n,1);assert.equal(h.count('acceptPalm'),0);});
test('no new palm offer in background',()=>{const h=setup();h.document.hidden=true;let n=0;h.api.beforePalm(()=>n++);assert.equal(n,1);assert.equal(h.count('preparePalm'),0);});
test('bridge messages have no question or image data',()=>{const h=setup();h.api.beforePalm(()=>{});assert.deepEqual(Object.keys(h.messages.at(-1)).sort(),['id','request','type']);});
test('wrong reply cannot resume a pending transition',()=>{const h=setup();let n=0;h.api.beforePalm(()=>n++);h.receive({type:'next',request:'wrong'});assert.equal(n,0);h.tick();assert.equal(n,1);});
console.log(`${total} native bridge tests passed`);
