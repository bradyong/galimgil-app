const fs=require('node:fs'),path=require('node:path');
const {engine,cases}=require('./semantic-eval.cjs');
const replies=require('./fixtures/semantic-v2-responses.json');
const run=engine();
const before=engine(path.join(__dirname,'../../low-confidence-safety-20261006/app-before.js'));
const out=process.argv[2];if(!out)throw new Error('Output directory required');
const rows=cases.map((f,i)=>{
 const ai=replies[i]?.status==='ready'?{binding:JSON.stringify([f.q,f.a,f.b]),version:'semantic-v2',meaning:replies[i].meaning}:null;
 const old=before(f,ai),first=run(f,ai);
 let answer=null;
 if(first.needsBasis)answer={binding:JSON.stringify([f.q,f.a,f.b]),preferred:'a',criterion:first.meaning.options[0].cue};
 if(first.needsMeaning)answer={binding:JSON.stringify([f.q,f.a,f.b]),preferred:'a',
  ...(i===11?{a:'녹차를 마시는 경험',b:'홍차를 마시는 경험',axis:'오늘 마시고 싶은 차',criterion:'오늘 마시고 싶은 차'}:
    {a:'종이에 그림을 그리는 체험',b:'점토를 빚는 활동',axis:'평면에 표현하기',criterion:'평면에 표현하기'})};
 const result=answer?run(f,ai,12345,answer):first;
 const output=r=>r.winner?{winner:r.winner.name,score:r.winnerScore,reason:r.why,future:r.futureComment,capture:r.advice}:null;
 return {index:i,...f,route:first.needsMeaning?'meaning-and-basis':first.needsBasis?'basis-only':'existing-rule',
  syntheticAnswer:answer,meaning:result.meaning,before:output(old),after:output(result)};
});
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'confirmed-28.json'),JSON.stringify(rows,null,2));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const output=r=>r?`<p>선택: ${esc(r.winner)} / 점수: ${r.score===null?'생성하지 않음':r.score}</p><p>이유: ${esc(r.reason)}</p><p>미래: ${esc(r.future)}</p><p>캡처: ${esc(r.capture)}</p>`:'확인 필요';
fs.writeFileSync(path.join(out,'confirmed-28.html'),`<!doctype html><html lang="ko"><meta charset="utf-8"><title>갈림길 확인 흐름 28건</title><style>body{max-width:1100px;margin:30px auto;padding:0 20px;font:16px/1.6 sans-serif;color:#202020}section{border-top:1px solid #bbb;padding:20px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f4f4f4;padding:12px}h2{font-size:21px}h3{font-size:17px}</style><h1>확인 흐름: 동일 28건</h1><p>새 API 호출 0회. 저장된 semantic-v2 응답을 재사용했습니다. 이전 출력은 온라인 출시본이 아니라 보존한 실험 파일 기준입니다.</p><p>8건 기존 경로 / 18건 기준 확인 / 2건 의미+기준 확인. 아래 확인 답변은 자동 테스트용 가상 답변이며 실제 사용자의 선호나 조어의 실제 뜻이 아닙니다. 모든 저신뢰도 사례에서 A를 선호한다는 답변을 넣어 연결만 검사했습니다. 정답률 또는 AI 판단 품질 검증으로 해석하면 안 됩니다.</p><p>기존 8건은 보존본과 동일합니다. 저신뢰도 결과는 사용자 확인 기록이며, 객관적인 우열이나 확률을 주장하지 않습니다. Writer 품질 개선 실험은 재개하지 않았습니다.</p>${rows.map(r=>`<section><h2>${r.index+1}. ${esc(r.a)} / ${esc(r.b)}</h2><p>${esc(r.q)} · ${r.route}</p><h3>가상 확인 답변</h3><pre>${esc(JSON.stringify(r.syntheticAnswer,null,2))}</pre><h3>보존본</h3>${output(r.before)}<h3>수정본</h3>${output(r.after)}<details><summary>의미와 판단 근거</summary><pre>${esc(JSON.stringify(r.meaning,null,2))}</pre></details></section>`).join('')}</html>`);
console.log(JSON.stringify({cases:rows.length,routes:rows.reduce((a,r)=>(a[r.route]=(a[r.route]||0)+1,a),{}),unresolvedAfterSyntheticAnswer:rows.filter(r=>!r.after).length,apiCalls:0,out}));
