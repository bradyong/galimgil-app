// Read-only local routing pass. Never substitutes guessed semantic responses.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {engine}=require('./semantic-eval.cjs');
const source=path.join(__dirname,'fixtures/blind-40-20261007.json');
const cases=JSON.parse(fs.readFileSync(source,'utf8'));
const old=require('./semantic-cases.json');
if(cases.length!==40)throw Error('Expected 40 cases');
const pairs=new Set();
for(const f of cases){
 const key=[f.a,f.b].sort().join('|');
 if(pairs.has(key)||old.some(o=>o.q===f.q||[o.a,o.b].sort().join('|')===key))throw Error('Duplicate');
 pairs.add(key);
}
const run=engine();
const rows=cases.map((f,index)=>{
 // Metadata/expected labels are not supplied to the engine.
 const input={q:f.q,a:f.a,b:f.b,mood:6,signIndex:0,tieRoll:0.25};
 try{
 const r=run(input);
 return {id:f.id,index,input,needsAI:!!r.needsMeaning,
   route:r.needsMeaning?'SEMANTIC_PENDING':'LOCAL_RESULT',
   reasons:r.understanding?.reasons||[],localMeaning:r.meaning,
   winner:r.winner?.name??null,score:r.winnerScore??null,
   output:r.needsMeaning?null:{why:r.why,future:r.futureComment,capture:r.advice}};
 }catch(e){return {id:f.id,index,input,route:'LOCAL_ERROR',error:e.message};}
});
const result={datasetSha256:crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'),
 settings:{mood:6,signIndex:0,tieRoll:0.25,dateNow:1791244800000},
 rows,stats:{total:40,semanticCallsNeeded:rows.filter(r=>r.needsAI).length,
 localResults:rows.filter(r=>r.route==='LOCAL_RESULT').length,errors:rows.filter(r=>r.route==='LOCAL_ERROR').length}};
fs.writeFileSync(process.argv[2],JSON.stringify(result,null,2));
console.log(JSON.stringify({datasetSha256:result.datasetSha256,stats:result.stats}));
