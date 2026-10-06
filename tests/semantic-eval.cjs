const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'..');
function engine(file=path.join(root,'app.js')){
 const ctx=vm.createContext({console,localStorage:{getItem:()=>null}});
 vm.runInContext('Date.now=()=>1791244800000',ctx);
 vm.runInContext(fs.readFileSync(path.join(root,'choice-input.js'),'utf8'),ctx);
 const source=fs.readFileSync(file,'utf8');vm.runInContext(source.slice(0,source.indexOf('document.getElementById("todayDate").textContent')),ctx);
 return (f,ai=null,seed=12345)=>{
  ctx.input={f,ai,seed};return vm.runInContext(`(()=>{const {f,ai,seed}=input;
   const i=typeof inspectMeaningInput==='function'?inspectMeaningInput(f.q,f.a,f.b):ChoiceInput.inspect(f.q,f.a,f.b,x=>findFeatureEntry(x)?.item.category,'daily');
   const p=choiceProfile(f.q,f.a,f.b);if(p.type!==i.category)p.forced=null;p.type=i.category;
   return buildChoiceNarrative(f.q,f.a,f.b,6,signs[0],p,seed,null,ai);
  })()`,ctx);
 };
}
const cases=JSON.parse(fs.readFileSync(path.join(__dirname,'semantic-cases.json'),'utf8'));
if(require.main===module){
 const run=engine();const replies=process.env.SEMANTIC_REPLIES?JSON.parse(fs.readFileSync(process.env.SEMANTIC_REPLIES,'utf8')):{};
 const rows=cases.map((f,index)=>{
  const before=run(f);const reply=replies[index];
  const ai=reply?.status==='ready'?{binding:JSON.stringify([f.q,f.a,f.b]),version:'semantic-v1',meaning:reply.meaning}:null;
  const result=ai?run(f,ai):before;
  return {index,...f,needsAI:!!before.needsMeaning,reasons:before.understanding?.reasons||[],
   inline:!!result.needsMeaning,meaning:result.meaning,
   output:result.needsMeaning?null:{reason:result.why,future:result.futureComment,capture:result.advice},
   winner:result.winner?.name,score:result.winnerScore};
 });
 process.stdout.write(JSON.stringify(rows,null,2));
}
module.exports={engine,cases};
