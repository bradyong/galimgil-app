// Generated evaluation artifacts only. Never contacts an API.
const fs=require('node:fs'),path=require('node:path');
const {engine,cases}=require('./semantic-eval.cjs'),responses=require('./fixtures/semantic-responses.json');
const run=engine(),before=process.env.SEMANTIC_BASELINE_APP?engine(process.env.SEMANTIC_BASELINE_APP):null;
const rows=cases.map((f,i)=>{
 const initial=run(f),api=responses[i],envelope=api?{binding:JSON.stringify([f.q,f.a,f.b]),version:'semantic-v1',meaning:api.meaning}:null;
 const result=envelope?run(f,envelope):initial;
 return {index:i+1,...f,called:!!api,beforeInline:!!initial.needsMeaning,afterInline:!!result.needsMeaning,
  semantic:result.meaning,providerSemantic:api?.meaning,
  outputs:result.needsMeaning?null:{reason:result.why,future:result.futureComment,capture:result.advice},
  usage:api?.usage||null};
});
function skeleton(text,row){
 const m=row.semantic;const values=[row.q,row.a,row.b,m.contrast,...m.axes,...m.options.flatMap(o=>[o.name,o.meaning,o.cue])].filter(Boolean).sort((a,b)=>b.length-a.length);
 for(const v of values)text=text.split(v).join('CONTENT');
 return text.replace(/[‘“][^’”]*[’”]/g,'CONTENT');
}
const rendered=rows.filter(r=>r.outputs),metrics={cases:rows.length,called:rows.filter(r=>r.called).length,
 beforeInline:rows.filter(r=>r.beforeInline).length,afterInline:rows.filter(r=>r.afterInline).length,
 original8:{before:rows.slice(0,8).filter(r=>r.beforeInline).length,after:rows.slice(0,8).filter(r=>r.afterInline).length},
 inputTokens:0,outputTokens:0,cachedInputTokens:0,roles:{}};
for(const r of rows){metrics.inputTokens+=r.usage?.input_tokens||0;metrics.outputTokens+=r.usage?.output_tokens||0;metrics.cachedInputTokens+=r.usage?.input_tokens_details?.cached_tokens||0;}
metrics.listPriceUSD=((metrics.inputTokens-metrics.cachedInputTokens)*.05+metrics.cachedInputTokens*.005+metrics.outputTokens*.4)/1e6;
for(const role of ['reason','future','capture']){
 const exact=rendered.map(r=>r.outputs[role]),shapes=rendered.map(r=>skeleton(r.outputs[role],r));
 metrics.roles[role]={count:rendered.length,exactDuplicateExcess:exact.length-new Set(exact).size,templateDuplicateExcess:shapes.length-new Set(shapes).size};
}
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const html=`<!doctype html><html lang="ko"><meta charset="utf-8"><title>갈림길 의미 해석 검증</title>
<style>body{font:16px/1.7 system-ui;max-width:1100px;margin:32px auto;padding:0 20px;color:#192523}h1{font-size:28px}h2{font-size:20px}article{border-top:1px solid #ccc;padding:20px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f3f6f5;padding:16px}dt{font-weight:bold}dd{margin:0 0 12px}</style>
<h1>갈림길 의미 해석 검증 · 2026-10-06</h1>
<p>온라인 배포 없음. 28개 합성 질문 중 저신뢰도 20개만 실제 API 1회씩 호출. 이후 저장 응답만 재사용.</p>
<p>의미 확인 비율은 개선되었으나 문장 틀 반복은 남아 있습니다. 아래 수치는 실제 사용 분포가 아니라 고정 평가 세트입니다. 비용은 반환 토큰×공식 단가이며 청구서 결제금액은 미확인입니다.</p>
<pre>${e(JSON.stringify(metrics,null,2))}</pre>
<p>틀 중복: 질문/선택명/의미/판단축/인용구를 CONTENT로 치환한 뒤 (출력 수−고유 틀 수)/출력 수. 반복된 그룹의 전체 점유율과는 다릅니다.</p>
${rows.map(r=>`<article><h2>${r.index}. ${e(r.q)} · ${e(r.a)} / ${e(r.b)}</h2><p>API: ${r.called?'1회':'없음'} · 인라인: ${r.beforeInline?'필요':'없음'} → ${r.afterInline?'필요':'없음'}</p>
<dl>${r.outputs?Object.entries(r.outputs).map(([k,v])=>`<dt>${e(k)}</dt><dd>${e(v)}</dd>`).join(''):'<dt>출력 보류</dt><dd>두 선택의 실제 차이를 인라인으로 확인합니다. 확신형 결과를 만들지 않습니다.</dd>'}</dl>
<details><summary>공통 의미 구조와 근거</summary><pre>${e(JSON.stringify(r.semantic,null,2))}</pre></details>
${r.providerSemantic?`<details><summary>모델 원응답 의미 구조</summary><pre>${e(JSON.stringify(r.providerSemantic,null,2))}</pre></details>`:''}</article>`).join('')}</html>`;
const output=process.argv[2];if(!output)throw new Error('Output path required');
fs.writeFileSync(output,html);fs.writeFileSync(output.replace(/\.html$/,'.json'),JSON.stringify({metrics,rows},null,2));
console.log(JSON.stringify(metrics,null,2));
