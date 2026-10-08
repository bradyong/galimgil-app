const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const {engine}=require('./semantic-eval.cjs');
const {cases,envelope}=require('./canonical-cases.cjs');
const out=path.resolve(__dirname,'../../low-confidence-safety-20261006');
test('eight existing-rule outputs exactly match the frozen baseline',()=>{
 const baseline=JSON.parse(fs.readFileSync(path.join(out,'writer-frozen-baseline.json'),'utf8'));
 const run=engine();let count=0;
 for(const row of baseline.rows){
  if(row.route!=='existing-rule')continue;
  const r=run(cases[row.index],envelope(row.index));count++;
  assert.equal(r.winner.name,row.winner);
  assert.equal(r.winnerScore,row.score);
  assert.deepEqual({why:r.why,future:r.futureComment,capture:r.advice},row.output);
 }
 assert.equal(count,8);
});
test('saved replay keeps only independently supported contrasts and unknowns',()=>{
 const report=JSON.parse(fs.readFileSync(path.join(out,'meaning-only-replay.json'),'utf8'));
 assert.equal(report.rows.length,31);
 for(const row of report.rows){
  assert.equal(row.new_route==='confirmation',row.expected_unknown);
  if(row.new_result){
   assert.equal(row.unsupported_axis_in_score,false);
   if(!row.new_axes.length)assert.equal(row.new_result.score,50);
  }
 }
 assert.equal(report.stats.api_calls,0);
});
