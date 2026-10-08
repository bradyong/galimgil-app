// Offline report: compare the same cases and recorded provider responses.
const fs=require('node:fs');
const {engine,cases}=require('./semantic-eval.cjs');
const replies=require('./fixtures/semantic-v2-responses.json');
const previous=require('./fixtures/semantic-responses.json');
if(!process.env.SEMANTIC_BASELINE_APP)throw new Error('SEMANTIC_BASELINE_APP required');
const current=engine(),old=engine(process.env.SEMANTIC_BASELINE_APP);
const envelope=(f,r,version)=>r?{binding:JSON.stringify([f.q,f.a,f.b]),version,meaning:r.meaning}:null;
const outputs=r=>r.needsMeaning?null:{reason:r.why,future:r.futureComment,capture:r.advice};
const decision=r=>r.needsMeaning?null:{winner:r.winner.name,winnerScore:r.winnerScore,loserScore:r.loserScore,evidence:r.meaning.decisionEvidence};
const rows=cases.map((f,i)=>{
 const a=old(f,envelope(f,previous[i],'semantic-v1'));
 const b=current(f,replies[i]?.status==='ready'?envelope(f,replies[i],'semantic-v2'):null);
 return {index:i+1,...f,called:!!replies[i],beforeInline:!!a.needsMeaning,afterInline:!!b.needsMeaning,
  before:decision(a),after:decision(b),beforeOutputs:outputs(a),outputs:outputs(b),semantic:b.meaning,
  providerSemantic:replies[i]?.raw_meaning,discardedAxes:replies[i]?.discarded_axes,usage:replies[i]?.usage};
});
function shape(text,row){
 const m=row.semantic;
 const values=[row.q,row.a,row.b,m?.contrast,...(m?.axes||[]),...(m?.options||[]).flatMap(o=>[o.name,o.meaning,o.cue,...(o.scene?.elements||[])])].filter(v=>typeof v==='string'&&v.length>1).sort((a,b)=>b.length-a.length);
 for(const value of values)text=text.split(value).join('CONTENT');
 return text.replace(/[‘“][^’”]*[’”]/g,'CONTENT');
}
function roles(key){
 const rendered=rows.filter(r=>r[key]);
 return Object.fromEntries(['reason','future','capture'].map(role=>{
  const texts=rendered.map(r=>r[key][role]),shapes=rendered.map(r=>shape(r[key][role],r));
  return [role,{count:texts.length,exactDuplicateExcess:texts.length-new Set(texts).size,
   templateDuplicateExcess:shapes.length-new Set(shapes).size,
   templateDuplicateRate:(shapes.length-new Set(shapes).size)/shapes.length,
   predictiveEndingCount:texts.filter(t=>/것이다[.!]?$/.test(t)).length}];
 }));
}
const metrics={cases:28,calls:rows.filter(r=>r.called).length,beforeInline:rows.filter(r=>r.beforeInline).length,afterInline:rows.filter(r=>r.afterInline).length,
 changed:rows.filter(r=>r.before&&r.after&&(r.before.winner!==r.after.winner||r.before.winnerScore!==r.after.winnerScore||r.before.loserScore!==r.after.loserScore)).map(r=>r.index),
 winnerChanged:rows.filter(r=>r.before&&r.after&&r.before.winner!==r.after.winner).map(r=>r.index),
 inputTokens:0,outputTokens:0,cachedInputTokens:0,roles:roles('outputs')};
for(const r of rows){metrics.inputTokens+=r.usage?.input_tokens||0;metrics.outputTokens+=r.usage?.output_tokens||0;metrics.cachedInputTokens+=r.usage?.input_tokens_details?.cached_tokens||0;}
metrics.usagePriceUSD=((metrics.inputTokens-metrics.cachedInputTokens)*.25+metrics.cachedInputTokens*.025+metrics.outputTokens*2)/1e6;
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const html=`<!doctype html><html lang="ko"><meta charset="utf-8"><title>갈림길 28건 의미·판단 검증</title>
<style>body{font:16px/1.7 system-ui;max-width:1100px;margin:32px auto;padding:0 20px;color:#192523}h1{font-size:28px}h2{font-size:20px}article{border-top:1px solid #ccc;padding:20px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f3f6f5;padding:16px}dt{font-weight:bold}dd{margin:0 0 12px}</style>
<h1>갈림길 28건 의미·판단 검증</h1><p>2026-10-06 · feature 브랜치만 수정 · 배포/merge 없음. 기존 28개 입력, seed=12345, 마음 온도=6, 동일 별자리와 날짜. 실제 API 20회 이후 저장 응답만 재사용했습니다.</p>
<p>판단 근거 오염은 제거했지만 문장 재미의 완성까지 의미하지 않습니다. 일반적인 뜻을 검증하는 규칙은 의미적 진실을 완전히 증명하지 못합니다. 근거 없는 비용/혼잡도 우열을 막고, 우열 정보가 없는 축에는 임의 효용 점수를 주지 않습니다. 이 경우 결과는 놀이용 기본 점수와 카드/별자리 가중치입니다.</p>
<pre>${e(JSON.stringify(metrics,null,2))}</pre>
<p>중복률은 질문/선택명/의미/판단축/인용구를 CONTENT로 치환한 뒤 (출력 수−고유 틀 수)/출력 수입니다. 비슷한 어투나 재미까지 측정하는 지표가 아닙니다. '것이다'로 끝나는 예측형 문장도 별도 집계합니다. 비용은 실제 반환 토큰과 공식 단가의 계산값이며 청구서 결제액은 확인하지 않았습니다.</p>
${rows.map(r=>`<article><h2>${r.index}. ${e(r.q)} · ${e(r.a)} / ${e(r.b)}</h2><p>API ${r.called?'1회':'0회'} · 인라인 ${r.beforeInline?'필요':'없음'} → ${r.afterInline?'필요':'없음'}</p>
<p>이전: ${r.before?e(`${r.before.winner} (${r.before.winnerScore}/${r.before.loserScore})`):'확인 필요'} → 현재: ${r.after?e(`${r.after.winner} (${r.after.winnerScore}/${r.after.loserScore})`):'확인 필요'}</p>
<dl>${r.outputs?Object.entries(r.outputs).map(([k,v])=>`<dt>${e(k)}</dt><dd>${e(v)}</dd>`).join(''):'<dt>결과 출력 보류</dt><dd>실제 차이를 짧은 인라인 질문으로 확인합니다.</dd>'}</dl>
<details><summary>이전 판단 근거</summary><pre>${e(JSON.stringify(r.before?.evidence,null,2))}</pre></details>
<details open><summary>현재 의미 구조·판단 근거·점수 추적</summary><pre>${e(JSON.stringify(r.semantic,null,2))}</pre></details>
${r.providerSemantic?`<details><summary>모델 원응답과 버린 축</summary><pre>${e(JSON.stringify({raw:r.providerSemantic,discarded:r.discardedAxes},null,2))}</pre></details>`:''}</article>`).join('')}</html>`;
const output=process.argv[2];if(!output)throw new Error('Output .html path required');
fs.writeFileSync(output,html);fs.writeFileSync(output.replace(/\.html$/,'.json'),JSON.stringify({metrics,rows},null,2));
console.log(JSON.stringify(metrics,null,2));
