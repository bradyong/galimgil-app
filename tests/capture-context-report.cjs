const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),out=path.resolve(root,'../low-confidence-safety-20261006');
function load(file){
 const ctx=vm.createContext({console,localStorage:{getItem:()=>null}});
 vm.runInContext(fs.readFileSync(path.join(root,'choice-input.js'),'utf8'),ctx);
 const code=fs.readFileSync(file,'utf8');
 vm.runInContext(code.slice(0,code.indexOf('document.getElementById("todayDate").textContent')),ctx);
 return ctx;
}
const before=load(path.join(out,'capture-before-context-20261008.js')),after=load(path.join(root,'app.js'));
const rows=JSON.parse(fs.readFileSync(path.join(out,'play-writer-output.json'),'utf8')).rows.map(f=>{
 const n={runtimeMeaning:{},scoreSource:f.score_source,winner:{name:f.winner},loser:{name:f.winner===f.a?f.b:f.a}};
 const input={question:f.question,a:f.a,b:f.b};
 function run(ctx){ctx.n=n;ctx.input=input;return vm.runInContext('restoredChoiceCapture(n,12345,signs[0],input)',ctx);}
 const frozen=JSON.stringify(n),old=run(before),current=run(after);
 assert.equal(JSON.stringify(n),frozen);assert.ok(current.text.includes(`‘${f.winner}’`));
 assert.ok(!current.evidence.context || f.question.includes(current.evidence.context));
 assert.ok(!current.text.includes(n.loser.name));
 return {...f,before:old.text,after:current.text,context:current.evidence.context,pattern:current.pattern};
});
function metrics(field,removeContext){
 const counts={};
 for(const row of rows){
  let text=row[field].split(row.winner).join('{winner}');
  if(removeContext&&row.context)text=text.split(row.context).join('{context}');
  counts[text]=(counts[text]||0)+1;
 }
 const values=Object.values(counts);
 return {unique:values.length,duplicateExcess:rows.length-values.length,
  duplicateExcessPercent:Math.round((rows.length-values.length)/rows.length*1000)/10,
  maximumPatternCount:Math.max(...values),maximumPatternPercent:Math.round(Math.max(...values)/rows.length*1000)/10};
}
const report={count:rows.length,contextCount:rows.filter(r=>r.context).length,
 before:metrics('before',false),afterWinnerOnly:metrics('after',false),afterStructure:metrics('after',true),rows};
assert.equal(rows.length,28);
fs.writeFileSync(path.join(out,'capture-context-report.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({...report,rows:rows.map(r=>({id:r.id,text:r.after}))},null,2));
