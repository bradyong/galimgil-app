const fs=require('node:fs'),path=require('node:path');
const {engine}=require('./semantic-eval.cjs'),{cases,envelope,normalized}=require('./canonical-cases.cjs');
const run=engine(),out=process.argv[2];if(!out)throw Error('output directory required');
const previous=JSON.parse(fs.readFileSync(path.join(out,'tag-audit-28.json'),'utf8'));
const rows=cases.map((f,i)=>{
 const r=run(f,envelope(i)),e=r.meaning.decisionEvidence;
 return {index:i,...f,route:r.needsMeaning?'confirmation':r.meaning.ai?'semantic-play':'existing-rule',
  meaning:r.meaning.options,contrast:r.meaning.contrast||r.meaning.differences,axes:e?.used||[],
  excluded:e?.excluded,modelRejected:normalized[i]?.excluded||[],inputs:e?.inputs,traces:e?.traces,
  winner:r.winner?.name,score:r.winnerScore,tie:e?.tieBreak,
  tieReason:e?.tieBreak?e.tieReason:null,previous:{winner:previous.rows[i].winner,score:previous.rows[i].score},
  output:{why:r.why,future:r.futureComment,capture:r.advice}};
});
const raw=[...Object.values(JSON.parse(fs.readFileSync(path.join(out,'canonical-raw.json'),'utf8'))),...Object.values(JSON.parse(fs.readFileSync(path.join(out,'canonical-repair-raw.json'),'utf8')))];
const stats={routes:rows.reduce((s,r)=>(s[r.route]=(s[r.route]||0)+1,s),{}),
 ties:rows.filter(r=>r.tie).length,previousTies:previous.stats.ties,
 calls:raw.length,input:raw.reduce((s,r)=>s+r.usage.input_tokens,0),output:raw.reduce((s,r)=>s+r.usage.output_tokens,0),cost:raw.reduce((s,r)=>s+r.bound,0)};
const sensitivity=rows.filter(r=>r.route==='semantic-play').map(row=>{
 let ties=0,bad=0;const winners=new Set();
 for(let mood=1;mood<=10;mood++)for(let signIndex=0;signIndex<12;signIndex++) {
  const r=run({...cases[row.index],mood,signIndex},envelope(row.index));
  if(r.meaning.decisionEvidence.tieBreak)ties++;else winners.add(r.winner.name);
  if(!Number.isFinite(r.winnerScore))bad++;
 }
 return {index:row.index,total:120,ties,winners:[...winners],bad};
});
fs.writeFileSync(path.join(out,'canonical-28.json'),JSON.stringify({stats,rows,sensitivity},null,2));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pre=v=>`<pre>${esc(JSON.stringify(v,null,2))}</pre>`;
fs.writeFileSync(path.join(out,'canonical-28.html'),`<!doctype html><html lang="ko"><meta charset="utf-8"><title>공통 놀이축 28건 검증</title><style>body{font:16px/1.7 sans-serif;max-width:1100px;margin:25px auto;padding:20px;color:#222}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f3f3f3;padding:12px}section{border-top:1px solid #aaa}table{border-collapse:collapse;width:100%}td,th{border:1px solid #aaa;padding:8px;text-align:left}</style><h1>공통 놀이축 직접 점수 연결</h1><p>같은 28건. 마음 온도 6·양자리·실행일 카드. 동점은 재현용 추첨값 0.25이며 실제 앱은 독립 난수입니다. Writer/main/배포 변경 없음.</p>${pre(stats)}<h2>계산 원칙</h2><p>원문·의미 → 닫힌 축/값 → 고정 놀이 설정의 반응 → 점수. 선택지에 자유 성격 태그를 붙이지 않습니다. 별자리/카드의 기존 성향 코드는 게임 설정 입력으로만 사용하며 선택지의 사실로 간주하지 않습니다. 각 축에서 마음 온도 기여(최대 6), 별자리 기여(최대 4.2), 카드 기여(최대 4)를 계산하고 축 수로 평균내어 기본 50에 더합니다. 자세한 설정은 각 traces.axes.config에 표시됩니다. 축이 없거나 실제 기여가 상쇄된 경우 동점이며 의미상의 우위를 만들지 않습니다.</p><p>추가 호출: 첫 5건 중 4건에 형식 문제가 있었고, 그중 플로깅/홈트는 유효 setting 행만 저장 응답에서 회수했습니다. 나머지 3건은 enum 스키마를 수정해 1회씩 재검증했습니다. 참석하지 않음을 now로 해석한 잘못된 행은 최종 제외했습니다. 총 8회이며 이후 추가 호출 없음. 신규 통합 의미+canonical 계약은 모의 응답 검증, 실제 호출은 저장 의미의 축 정규화만 수행했습니다.</p><table><tr><th>선택</th><th>사용 축</th><th>결과</th></tr>${rows.map(r=>`<tr><td><a href="#c${r.index}">${r.index+1}. ${esc(r.a)} / ${esc(r.b)}</a></td><td>${esc(r.axes.map(a=>a.id+': '+a.valueA+'/'+a.valueB).join('; '))}</td><td>${esc(r.winner||'의미 확인')} ${r.score??''}${r.tie?' (동점 추첨)':''}</td></tr>`).join('')}</table>${rows.map(r=>`<section id="c${r.index}"><h2>${r.index+1}. ${esc(r.a)} / ${esc(r.b)}</h2><p>${esc(r.q)}</p><h3>의미와 차이</h3>${pre({meaning:r.meaning,contrast:r.contrast})}<h3>canonical axis/value와 근거</h3>${pre(r.axes)}<h3>마음 온도·별자리·카드 반응</h3>${pre({inputs:r.inputs,traces:r.traces})}<h3>최종 점수 / 이전 결과</h3>${pre({winner:r.winner,score:r.score,tieReason:r.tieReason,previous:r.previous})}<details><summary>제외한 축·모델 오류 및 Writer 출력</summary>${pre({excluded:r.excluded,modelRejected:r.modelRejected,output:r.output})}</details></section>`).join('')}<h2>설정 민감도: 19×120=2,280건</h2>${pre(sensitivity)}</html>`);
console.log(JSON.stringify(stats));
