const fs=require('node:fs');
const {engine}=require('./semantic-eval.cjs');
const {input,semantic}=JSON.parse(fs.readFileSync(0,'utf8'));
const run=engine();
const ai=semantic?.status==='ready'?{binding:JSON.stringify([input.q,input.a,input.b]),
 version:'semantic-v2',meaning:semantic.meaning,canonical_axes:semantic.canonical_axes}:null;
const r=run(input,ai),e=r.meaning?.decisionEvidence;
process.stdout.write(JSON.stringify({q:input.q,a:input.a,b:input.b,
 route:r.needsMeaning?'confirmation':r.meaning.ai?'semantic-play':'existing-rule',
 meaning:r.meaning.options,contrast:r.meaning.contrast||r.meaning.differences,
 axes:e?.used||[],excluded:e?.excluded,inputs:e?.inputs,traces:e?.traces,
 winner:r.winner?.name,score:r.winnerScore,tie:e?.tieBreak,
 output:r.needsMeaning?null:{why:r.why,future:r.futureComment,capture:r.advice}}));
