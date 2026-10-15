const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../ui-shell.js'),'utf8');
function run(bridge,ua='Android; wv)') {
 const modes=[],notes=[],events={};
 const input={mode:null,setAttribute(k,v){this.mode=v;},removeAttribute(){this.mode=null;},click(){modes.push(this.mode);}};
 const camera={hidden:true,parentElement:{after(n){notes.push(n);}},addEventListener(k,f){events.camera=f;}};
 const album={addEventListener(k,f){events.album=f;}};
 const document={getElementById:id=>({palmInput:input,palmCameraButton:camera,palmAlbumButton:album}[id]),querySelectorAll:()=>[],createElement:()=>({})};
 vm.runInNewContext(source,{document,navigator:{userAgent:ua},GalimgilAndroid:bridge});
 return {camera,notes,modes,events};
}
for(const [name,bridge] of [['v2',{shareText(){}}],['unknown',undefined],['denied',{supportsPalmCamera:()=>false}],['throw',{supportsPalmCamera(){throw Error('unavailable');}}],['invalid',{supportsPalmCamera:()=> 'true'}]]) {
 test(name+' fails closed to album without capture',()=>{
  const r=run(bridge);assert.equal(r.camera.hidden,true);assert.equal(r.notes.length,1);
  r.events.camera();r.events.album();assert.deepEqual(r.modes,[null]);
 });
}
test('v3 explicit support preserves camera and album',()=>{
 const r=run({supportsPalmCamera:()=>true});assert.equal(r.camera.hidden,false);assert.equal(r.notes.length,0);
 r.events.camera();r.events.album();assert.deepEqual(r.modes,['environment',null]);
});
test('normal browser preserves existing capture behavior',()=>{
 const r=run(undefined,'Mozilla/5.0 Chrome');assert.equal(r.camera.hidden,false);r.events.camera();assert.deepEqual(r.modes,['environment']);
});
test('HTML hides camera before capability evaluation',()=>{
 assert.match(fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),/id="palmCameraButton" hidden/);
});
