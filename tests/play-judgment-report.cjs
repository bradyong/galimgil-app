const fs=require('node:fs'),path=require('node:path');
const {engine,cases}=require('./semantic-eval.cjs');
const semantic=require('./fixtures/semantic-v2-responses.json');
const normalized=require('./fixtures/play-axes-responses.json');
const run=engine(),out=process.argv[2];if(!out)throw new Error('output directory required');
const before=engine(path.join(__dirname,'../../low-confidence-safety-20261006/app-before.js'));
const pack=r=>r.winner?{winner:r.winner.name,score:r.winnerScore,reason:r.why,future:r.futureComment,capture:r.advice}:null;
const rows=cases.map((f,index)=>{
 const ai=semantic[index]?.status==='ready'?{binding:JSON.stringify([f.q,f.a,f.b]),version:'semantic-v2',meaning:semantic[index].meaning}:null;
 const old=before(f,ai),withoutAxes=run(f,ai);
 const current=run(f,ai?{...ai,play_axes:normalized[index]?.play_axes}:null);
 const differences=[];
 if(normalized[index]) {
  differences.push('기준/선호 확인 없이 바로 놀이 판단. preferred 및 선택지 이름 hash는 사용하지 않음.');
  differences.push(`정규화 전: ${withoutAxes.winner.name} ${withoutAxes.winnerScore}%${withoutAxes.meaning.decisionEvidence.tieBreak?' (동점 추첨)':''}.`);
  differences.push(current.meaning.decisionEvidence.tieBreak
   ? '이번 설정에서 실제 가산점이 같아 50:50 동점 추첨. 의미상 우위가 있다고 주장하지 않음.'
   : '정규화한 의미 태그에 현재 마음 온도/별자리/카드가 반응하여 점수 차이가 발생함.');
 }
 return {index,...f,route:current.needsMeaning?'meaning-confirmation':ai?'semantic-play':'existing-rule',
  originalSemanticResult:pack(old),beforeNormalization:pack(withoutAxes),after:pack(current),
  meaning:current.meaning,rawNormalizedAxes:normalized[index]?.play_axes||null,
  evidence:current.meaning.decisionEvidence,changes:differences};
});
const usage=Object.values(normalized).reduce((a,r)=>({calls:a.calls+1,input:a.input+r.usage.input_tokens,
 output:a.output+r.usage.output_tokens,cost:a.cost+r.cost}),{calls:0,input:0,output:0,cost:0});
const sensitivity=rows.filter(r=>r.route==='semantic-play').map(row=>{
 const f=cases[row.index],ai={binding:JSON.stringify([f.q,f.a,f.b]),version:'semantic-v2',meaning:semantic[row.index].meaning,play_axes:normalized[row.index].play_axes};
 const results=[];
 for(let signIndex=0;signIndex<12;signIndex++)for(let mood=1;mood<=10;mood++){
  const r=run({...f,signIndex,mood},ai);
  results.push({signIndex,mood,winner:r.winner.name,score:r.winnerScore,tie:!!r.meaning.decisionEvidence.tieBreak});
 }
 return {index:row.index,combinations:results.length,ties:results.filter(r=>r.tie).length,
  winners:[...new Set(results.filter(r=>!r.tie).map(r=>r.winner))],results};
});
const stats={usage,routes:rows.reduce((a,r)=>(a[r.route]=(a[r.route]||0)+1,a),{}),
 normalizationBeforeTies:rows.filter(r=>r.route==='semantic-play'&&r.beforeNormalization.score===50).length,
 currentTies:rows.filter(r=>r.route==='semantic-play'&&r.evidence.tieBreak).length,
 discardedTags:rows.filter(r=>r.route==='semantic-play').reduce((n,r)=>n+r.evidence.excluded.length,0),
 note:'Fixed evaluation: mood 6, Aries, date-specific cards. Tie roll 0.25 for reproducible reports, not production bias.'};
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'play-judgment-28.json'),JSON.stringify({stats,rows,sensitivity},null,2));
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const output=r=>r?`<p><b>${esc(r.winner)} ${r.score}%</b></p><p>이유: ${esc(r.reason)}</p><p>미래: ${esc(r.future)}</p><p>캡처: ${esc(r.capture)}</p>`:'의미 확인 필요';
fs.writeFileSync(path.join(out,'play-judgment-28.html'),`<!doctype html><html lang="ko"><meta charset="utf-8"><title>갈림길 의미 놀이 판단 28건</title><style>body{font:16px/1.65 sans-serif;max-width:1180px;margin:28px auto;padding:0 20px;color:#202020}section{border-top:1px solid #aaa;margin-top:24px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ccc;padding:8px;text-align:left;vertical-align:top;overflow-wrap:anywhere}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f4f4f4;padding:12px}h2{font-size:22px}h3{font-size:18px}.warn{background:#fff2bd;padding:14px}</style><h1>의미 기반 놀이 판단: 동일 28건</h1><p>main 병합/배포 없음. 18건 각 1회 호출, 재호출 없음. 원문·의미는 기존 세트 그대로이고 판정축만 새로 구조화했습니다. AI는 마음 온도·별자리·카드를 받지 않으며 승자/점수 필드도 없습니다.</p><pre>${esc(JSON.stringify(stats,null,2))}</pre><p class="warn">테스트 조건: 마음 온도 6, 양자리. 동점은 50:50 추첨이며 아래 표는 재현을 위해 추첨값 0.25를 고정했습니다. 실제 앱은 이름과 무관한 난수를 사용합니다. 태그는 의미에서 연상한 놀이용 상징이지 실제 가격·속도·만족도·안전성의 사실 판단이 아닙니다. 모르는 2건은 답변을 조작하지 않고 확인 상태 그대로 보고합니다. Writer 품질 개선은 이번 검증 대상이 아닙니다.</p><table><tr><th>번호</th><th>질문</th><th>경로</th><th>결과</th></tr>${rows.map(r=>`<tr><td>${r.index+1}</td><td><a href="#case-${r.index}">${esc(r.a)} / ${esc(r.b)}</a></td><td>${r.route}</td><td>${r.after?esc(r.after.winner)+' '+r.after.score+'%'+(r.evidence?.tieBreak?' · 동점추첨':''):'의미 확인'}</td></tr>`).join('')}</table>${rows.map(r=>`<section id="case-${r.index}"><h2>${r.index+1}. ${esc(r.a)} / ${esc(r.b)}</h2><p>${esc(r.q)}</p><h3>① 의미 구조</h3><pre>${esc(JSON.stringify({situation:r.meaning.situation,options:r.meaning.options,contrast:r.meaning.contrast,differences:r.meaning.differences},null,2))}</pre><h3>② 최종 판정축과 값</h3><pre>${esc(JSON.stringify(r.evidence?.used||r.meaning.decisionEvidence,null,2))}</pre>${r.rawNormalizedAxes?`<details><summary>모델 원응답 축과 제외된 태그</summary><pre>${esc(JSON.stringify({raw:r.rawNormalizedAxes,excluded:r.evidence.excluded},null,2))}</pre></details>`:''}<h3>③ 마음 온도 / 별자리 / 카드 영향</h3><pre>${esc(JSON.stringify(r.evidence?.traces?{inputs:r.evidence.inputs,traces:r.evidence.traces,tieBreak:r.evidence.tieBreak}:'기존 정상 경로 유지. 이번 추가 점수 추적 대상은 의미 해석 18건입니다.',null,2))}</pre><h3>④ 최종 승자 / 놀이 점수</h3>${output(r.after)}<h3>⑤ 이전 결과와 달라진 이유</h3>${r.changes.map(s=>`<p>${esc(s)}</p>`).join('')}<details><summary>정규화 전 결과 (동일 새 점수 엔진, 기존 enum만 사용)</summary>${output(r.beforeNormalization)}</details><details><summary>이전 semantic-v2 실험 결과 (이름 해시 포함, 온라인 출시본 아님)</summary>${output(r.originalSemanticResult)}</details></section>`).join('')}<h2>기존 놀이 설정에 따른 민감도</h2><p>18건 × 마음 온도 10개 × 별자리 12개 = 2,160건을 저장 응답으로 재계산했습니다. 추가 API 호출 없음.</p><pre>${esc(JSON.stringify(sensitivity.map(({results,...s})=>s),null,2))}</pre><p>비용은 API 사용량과 <a href="https://developers.openai.com/api/docs/models/gpt-5-mini">공식 모델 단가</a>로 계산한 값이며 청구서 확정액은 아닙니다.</p></html>`);
console.log(JSON.stringify(stats));
