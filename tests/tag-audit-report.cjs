const fs=require('node:fs'),path=require('node:path');
const {engine,cases}=require('./semantic-eval.cjs');
const replies=require('./fixtures/semantic-v2-responses.json'),play=require('./fixtures/play-axes-responses.json');
const tea=require('./fixtures/tea-semantic-response.json');
const run=engine(),out=process.argv[2];if(!out)throw Error('output path required');
const rows=cases.map((f,i)=>{
 const reply=i===11?tea:replies[i];
 const ai=reply?.status==='ready'?{binding:JSON.stringify([f.q,f.a,f.b]),version:'semantic-v2',meaning:reply.meaning,play_axes:i===11?tea.play_axes:play[i]?.play_axes}:null;
 const r=run(f,ai),e=r.meaning.decisionEvidence;
 return {index:i,...f,route:r.needsMeaning?'confirmation':ai?'semantic-play':'existing-rule',
  meaning:r.meaning.options,contrast:r.meaning.contrast||r.meaning.differences,
  accepted:e?.used||[],excluded:e?.excluded||[],traces:e?.traces,
  winner:r.winner?.name,score:r.winnerScore,tie:e?.tieBreak||null,
  output:{why:r.why,future:r.futureComment,capture:r.advice}};
});
const stats={routes:rows.reduce((s,r)=>(s[r.route]=(s[r.route]||0)+1,s),{}),
 ties:rows.filter(r=>r.tie).length,excluded:rows.reduce((n,r)=>n+r.excluded.length,0),
 newCalls:1,usage:tea.usage,cost:tea.cost};
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'tag-audit-28.json'),JSON.stringify({stats,rows},null,2));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pre=x=>`<pre>${esc(JSON.stringify(x,null,2))}</pre>`;
fs.writeFileSync(path.join(out,'tag-audit-28.html'),`<!doctype html><html lang="ko"><meta charset="utf-8"><title>의미 라우팅·상징 태그 검증</title><style>body{font:16px/1.7 sans-serif;max-width:1080px;margin:24px auto;padding:20px;color:#222}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f4f4f4;padding:12px}section{border-top:1px solid #aaa}table{border-collapse:collapse;width:100%}td,th{border:1px solid #aaa;padding:8px;text-align:left}</style><h1>동일 28건: 의미 라우팅·상징 태그 검증</h1><p>마음 온도 6, 양자리, 실행일 카드. 동점은 재현용 추첨값 0.25이며 실제 앱은 독립 난수를 사용합니다. 확률이 아닌 놀이 점수입니다. main merge/배포 없음.</p>${pre(stats)}<p>녹차/홍차만 신규 1회 호출. 나머지 저장 응답 재사용. 의미를 아는 것과 점수 차이를 만들 수 있는 것은 분리했습니다. 인용문에 단어가 있다는 이유만으로 상징을 허용하지 않고, 검증된 판단축의 직접적 연결만 허용합니다. 근거 없는 newness/unique/focus/comfort 등은 제외합니다. 이는 보수적인 허용 목록이며 실제 성향의 과학적 검증은 아닙니다. Writer는 변경하지 않았습니다.</p><table><tr><th>번호 / 선택</th><th>경로</th><th>결과</th></tr>${rows.map(r=>`<tr><td><a href="#r${r.index}">${r.index+1}. ${esc(r.a)} / ${esc(r.b)}</a></td><td>${r.route}</td><td>${esc(r.winner||'의미 확인')} ${r.score??''}${r.tie?' (동점 추첨)':''}</td></tr>`).join('')}</table>${rows.map(r=>`<section id="r${r.index}"><h2>${r.index+1}. ${esc(r.a)} / ${esc(r.b)}</h2><p>${esc(r.q)}</p><h3>① 의미</h3>${pre({options:r.meaning,contrast:r.contrast})}<h3>② 채택 태그 / ④ 허용 근거</h3>${pre(r.accepted)}<h3>③ 제외 태그</h3>${pre(r.excluded)}<h3>⑤ 최종 놀이 점수</h3>${pre({winner:r.winner,score:r.score,tie:r.tie,traces:r.traces})}<details><summary>기존 Writer 출력 확인용</summary>${pre(r.output)}</details></section>`).join('')}</html>`);
console.log(JSON.stringify(stats));
