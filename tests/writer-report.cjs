// Same 28 inputs. Offline rendering only; never contacts a provider.
const fs=require('node:fs');
const {engine,cases}=require('./semantic-eval.cjs');
const semantics=require('./fixtures/semantic-v2-responses.json');
const replies=require('./fixtures/writer-responses.json');
if(!process.env.WRITER_BASELINE_APP)throw Error('WRITER_BASELINE_APP required');
const before=engine(process.env.WRITER_BASELINE_APP),after=engine();
const envelope=(f,r,w)=>r?.status==='ready'?{binding:JSON.stringify([f.q,f.a,f.b]),version:'semantic-v2',meaning:r.meaning,writer:w}:null;
const outputs=r=>r.needsMeaning?null:{reason:r.why,future:r.futureComment,capture:r.advice};
const rows=cases.map((f,i)=>{
 const old=before(f,envelope(f,semantics[i]));
 const current=after(f,envelope(f,semantics[i],replies[i]?.writer));
 return {index:i+1,...f,writerStatus:current.needsMeaning?'needs-confirmation':current.content.writerStatus||'existing-rule',
   before:outputs(old),after:outputs(current),winner:current.winner?.name,winnerScore:current.winnerScore,
   loserScore:current.loserScore,meaningUnchanged:JSON.stringify(old.meaning)===JSON.stringify(current.meaning),
   semantic:current.meaning,rawWriter:replies[i]?.raw_writer,usage:replies[i]?.usage};
});
const predictive=s=>/것이다|하게 된다|예상된다|가능성이|할 수 있다/.test(s);
const label=s=>!/[.!?]|(?:요|네|지|다|군|걸|데|냐|까)$/.test(s);
function metricsFor(key){
 const rendered=rows.filter(r=>r[key]);
 const masked=(text,r)=>{
  const m=r.semantic;
  const values=[r.q,r.a,r.b,m.contrast,...m.axes,...m.options.flatMap(o=>[o.name,o.meaning,o.cue])].filter(Boolean).sort((a,b)=>b.length-a.length);
  for(const v of values)text=text.split(v).join('CONTENT');
  return text.replace(/[‘“][^’”]*[’”]/g,'CONTENT');
 };
 return {outputs:rendered.length,predictiveFuture:rendered.filter(r=>predictive(r[key].future)).length,
  labelLikeCapture:rendered.filter(r=>label(r[key].capture)).length,
  internalCode:rendered.filter(r=>Object.values(r[key]).some(s=>/\b(activity|observe|participate|setting|immediacy)\b/.test(s))).length,
  roles:Object.fromEntries(['reason','future','capture'].map(role=>{
   const text=rendered.map(r=>r[key][role]),shapes=rendered.map(r=>masked(r[key][role],r));
   return [role,{exactDuplicateExcess:text.length-new Set(text).size,templateDuplicateExcess:shapes.length-new Set(shapes).size}];
  }))};
}
const metrics={cases:28,calls:Object.keys(replies).length,acceptedWriter:rows.filter(r=>r.writerStatus==='accepted').length,
 legacyDraft:rows.filter(r=>r.writerStatus==='legacy-draft').length,confirmation:rows.filter(r=>!r.after).length,
 meaningUnchanged:rows.filter(r=>r.meaningUnchanged).length,before:metricsFor('before'),after:metricsFor('after'),
 inputTokens:0,cachedInputTokens:0,outputTokens:0,costUSD:0};
for(const r of Object.values(replies)){
 metrics.inputTokens+=r.usage.input_tokens;metrics.cachedInputTokens+=r.usage.input_tokens_details.cached_tokens;
 metrics.outputTokens+=r.usage.output_tokens;metrics.costUSD+=r.charged_bound;
}
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const show=o=>o?Object.entries(o).map(([k,v])=>`<dt>${e(k)}</dt><dd>${e(v)}</dd>`).join(''):'<dd>인라인 확인. 결과 문장 생성 안 함.</dd>';
const html=`<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>갈림길 Writer 실제 출력 28건</title>
<style>body{font:16px/1.7 system-ui;color:#192523;max-width:1080px;margin:24px auto;padding:0 18px}h1{font-size:26px}h2{font-size:20px}article{border-top:1px solid #bbb;padding:22px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f1f5f4;padding:14px}dt{font-weight:700}dd{margin:0 0 14px;overflow-wrap:anywhere}.warning{border-left:4px solid #b94335;padding-left:16px}.compare{display:grid;grid-template-columns:1fr 1fr;gap:22px;min-width:0}.compare>*{min-width:0}@media(max-width:700px){.compare{grid-template-columns:1fr}}</style>
<h1>갈림길 Writer 실제 출력 28건</h1><p>2026-10-06 · feature 브랜치만 수정 · 배포 / main merge / push 없음</p>
<p class="warning"><strong>품질 목표 미달: 배포 권장 안 함.</strong> 내부 축 노출은 제거했고 의미·판단값은 보존했습니다. 그러나 새 Writer 패키지는 18건 중 5건만 형식 검사에 통과했습니다. 형식 통과도 재미나 사실 적합성 검수를 대신하지 않습니다. 나머지 13건은 기존 장면 초안으로 돌아가므로 설명문·명사구 문제가 남습니다.</p>
<p>같은 28개 질문을 사용했습니다. 실제 유료 실험 20회는 저장된 의미 구조를 고정하고 Writer만 생성한 분리 평가입니다. 신규 질문의 의미+Writer 통합 응답은 단일 요청 코드와 모의 응답 테스트로 확인했으며, 새 의미를 다시 생성하는 실서비스 검증은 하지 않았습니다. 재호출은 없습니다.</p>
<p>로컬 이유는 검증된 활동과 실제 카드/별자리 점수 근거만 사용합니다. 모델이 작성한 이유는 혜택·상대 반응을 임의로 덧붙인 사례가 있어 최종 문장에 사용하지 않았습니다. 아래에는 실제 앱 경로의 출력과 탈락한 원응답을 구분해 실었습니다.</p>
<pre>${e(JSON.stringify(metrics,null,2))}</pre>
<p>설명형: 것이다 / 하게 된다 / 예상된다 / 가능성이 / 할 수 있다. 명사구 검사는 문장 부호·종결형 기반 대략적 검사이므로 품질 합격률이 아닙니다. 중복은 내용어·인용구 치환 후 초과 중복 수이며, 말투와 재미의 유사성까지 측정하지 않습니다. 비용은 반환 토큰×공식 단가, 청구서 미확인입니다.</p>
<nav>${rows.map(r=>`<a href="#case-${r.index}">${r.index}</a>`).join(' · ')}</nav>
${rows.map(r=>`<article id="case-${r.index}"><h2>${r.index}. ${e(r.q)}</h2><p>${e(r.a)} / ${e(r.b)} · ${e(r.writerStatus)} · ${r.after?e(`${r.winner} ${r.winnerScore}/${r.loserScore}`):'확인 필요'} · 의미 구조 동일: ${r.meaningUnchanged?'예':'아니오'}</p>
<div class="compare"><section><h3>이전 출력</h3><dl>${show(r.before)}</dl></section><section><h3>현재 실제 출력</h3><dl>${show(r.after)}</dl></section></div>
${r.rawWriter?`<details><summary>Writer 원응답 (최종 출력과 구분)</summary><pre>${e(JSON.stringify(r.rawWriter,null,2))}</pre></details>`:''}
<details><summary>변경하지 않은 의미·판단 근거</summary><pre>${e(JSON.stringify(r.semantic,null,2))}</pre></details></article>`).join('')}</html>`;
const output=process.argv[2];if(!output)throw Error('Output .html required');
fs.writeFileSync(output,html);fs.writeFileSync(output.replace(/\.html$/,'.json'),JSON.stringify({metrics,rows},null,2));
console.log(JSON.stringify(metrics,null,2));
