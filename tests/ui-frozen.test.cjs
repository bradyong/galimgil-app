const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const {engine,cases}=require('./semantic-eval.cjs');
const baseline=path.resolve(__dirname,'../../ui-integration-20261013/baseline');
const root=path.resolve(__dirname,'..');
test('UI integration preserves all 28 narratives across 30 seeds',()=>{
 const old=engine(path.join(baseline,'app.js')),current=engine();
 const replies=require('./fixtures/semantic-v2-responses.json');
 for(let i=0;i<cases.length;i++)for(let seed=0;seed<30;seed++){
  const f=cases[i],r=replies[i],semantic=r?.status==='ready'?{binding:JSON.stringify([f.q,f.a,f.b]),version:'semantic-v2',meaning:r.meaning}:null;
  assert.deepEqual(JSON.parse(JSON.stringify(current(f,semantic,seed))),JSON.parse(JSON.stringify(old(f,semantic,seed))));
 }
});
test('server, meaning, scoring, usage, ads and input sources unchanged except checkout line endings',()=>{
 for(const name of ['choice-input.js','native-ads-events.js','server.py','choice_runtime.py','choice_contracts/meaning.py','choice_contracts/play.py','choice_contracts/why.py','render.yaml'])
  assert.equal(fs.readFileSync(path.join(root,name),'utf8').replace(/\r\n/g,'\n'),fs.readFileSync(path.join(baseline,name),'utf8').replace(/\r\n/g,'\n'),name);
});
test('published privacy and palm consent wording retained',()=>{
 const text=f=>fs.readFileSync(f,'utf8').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
 const {execFileSync}=require('node:child_process');
 const published=execFileSync('git',['show','1dda3e4:privacy.html'],{cwd:root});
 assert.equal(fs.readFileSync(path.join(root,'privacy.html'),'utf8').replace(/\r\n/g,'\n'),published.toString('utf8').replace(/\r\n/g,'\n'));
 const old=fs.readFileSync(path.join(baseline,'index.html'),'utf8'),now=fs.readFileSync(path.join(root,'index.html'),'utf8');
 for(const klass of ['privacy-note','consent-row']){const pattern=new RegExp(`<[^>]+class="${klass}"[\\s\\S]*?<\\/(?:div|label)>`);assert.equal(now.match(pattern)[0],old.match(pattern)[0]);}
});
