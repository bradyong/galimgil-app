/* App wiring only. Scoring functions and frozen server contracts remain unchanged. */
const ChoiceRuntimeUI = (() => {
  const meanings = new Map(), futures = new Map();
  const reasons = ["insufficient-grounded-contrast"];
  async function post(path, body, timeout = 45000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(path, {method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify(body), signal:controller.signal});
      return response.ok ? await response.json() : null;
    } catch (_) { return null; }
    finally { clearTimeout(timer); }
  }
  async function resolve({question,a,b,mood,sign,local,clarification,archive}) {
    if (!local.needsMeaning && !local.meaning?.ai && local.meaning?.scoringPolicy !== "semantic-play-v1") return local;
    const binding=JSON.stringify([question,a,b]);
    const validClarification=local.meaning?.confirmation || null;
    const key=JSON.stringify([binding,validClarification]);
    const saved=archive.find(c=>c.question===question&&c.choiceA===a&&c.choiceB===b&&c.details?.runtimeMeaning)?.details.runtimeMeaning;
    if (!meanings.has(key)) meanings.set(key, saved ? Promise.resolve(saved) :
      post('/api/choice-meaning-only',{question,a,b,reasons,clarification:validClarification}));
    const prepared=await meanings.get(key);
    if (prepared?.status==='confirmation') return {...local,needsMeaning:true};
    if (!prepared || prepared.status!=='ready') return {...local,needsMeaning:false,meaningUnavailable:true};
    const meaning={id:binding,situation:question,options:[a,b].map(name=>({name,meaning:name,cue:name})),
      ai:{canonical_axes:prepared.axes,meaning:{}},decisionAxes:[]};
    const base=semanticPlayNarrative(meaning,local.understanding,mood,sign,{omitCapture:true});
    const e=base.meaning.decisionEvidence;
    const engine={winner:base.winner.name,score:base.winnerScore,axes:e.used,traces:e.traces,
      inputs:e.inputs,tie:e.tieBreak,excluded:e.excluded};
    const result=await post('/api/choice-play',{question,a,b,reasons,meaning:prepared.meaning,engine},10000);
    if (!result || result.status!=='ready') throw new Error('놀이 결과 연결이 잠시 지연되고 있어요.');
    const chosen=result.winner===a;
    return {...base,needsMeaning:false,recommendA:chosen,winner:{name:result.winner},loser:{name:chosen?b:a},
      winnerScore:result.score,loserScore:100-result.score,why:escapeHtml(result.why),
      futureComment:'',runtimeMeaning:prepared,scoreSource:result.score_source,
      meaning:{...base.meaning,confirmation:validClarification,decision:{winner:result.winner,winnerScore:result.score},
        decisionEvidence:{...e,scoreSource:result.score_source,purePlay:result.score_source==='PURE_PLAY'?result:null}},
      content:{reason:{text:result.why,source:result.score_source},future:{text:'',source:'EMPTY_SAFE_FALLBACK'}}};
  }
  async function future(card, archive) {
    const d=card.details;
    if (!d.runtimeMeaning || d.futureStatus!=='pending') return;
    const projection={A:card.choiceA,B:card.choiceB};
    const payload={question:card.question,A:card.choiceA,B:card.choiceB,winner:d.winner,verified_meaning:projection};
    if (d.scoreSource==='VERIFIED_SEMANTIC') payload.verified_contrast=projection;
    const key=JSON.stringify(payload);
    const saved=archive.find(c=>c!==card&&c.details?.futureKey===key&&c.details.futureStatus!=='pending');
    if (!futures.has(key)) futures.set(key,saved ? Promise.resolve({status:saved.details.future?'ready':'unavailable',future:saved.details.future}) :
      post('/api/choice-future',payload,35000));
    const result=await futures.get(key);
    const text=result?.status==='ready'&&typeof result.future==='string'&&result.future.length>=12&&result.future.length<=90 ? result.future : '';
    d.future=text;d.futureStatus=text?'ready':'unavailable';d.futureKey=key;
    d.contentSources.future={text,source:text?'AI_WRITER':'EMPTY_SAFE_FALLBACK'};
    saveArchive();renderArchive();
    const active=document.getElementById('choiceResult');
    if (active.dataset.cardId===card.createdAt) {
      const section=active.querySelector('[data-future-section]');
      section.hidden=!text;section.querySelector('blockquote').textContent=text;
    }
  }
  return {resolve,future};
})();

function createChoiceShareImage(card) {
  const canvas=document.createElement('canvas');canvas.width=1080;
  const ctx=canvas.getContext('2d'),d=card.details,lines=[];
  const add=(text,size,color,gap=24)=>{
    ctx.font=`600 ${size}px Malgun Gothic, sans-serif`;
    let line='';
    for (const char of String(text)) {
      if (char==='\n'||ctx.measureText(line+char).width>860) {
        lines.push({text:line,size,color});line=char==='\n'?'':char;
      } else line+=char;
    }
    if(line)lines.push({text:line,size,color});
    lines.push({gap});
  };
  add('갈림길 선택 카드',40,'#f4c866',48);
  add(card.question,44,'#f7fbff',36);
  add(`${card.choiceA} vs ${card.choiceB}`,32,'#a9bbc2');
  add(d.winner,62,'#54d2c2');
  if(d.percent!==null)add(`놀이 기울기 ${d.percent}% : ${100-d.percent}%`,36,'#f4c866',40);
  add('별 한 스푼',32,'#f4c866');add(d.cards.join(' · '),38,'#f7fbff',36);
  if(d.future){add('미래의 나 댓글',32,'#f4c866');add(d.future,42,'#f7fbff',44);}
  if(card.advice){add('캡처 한 줄',32,'#f4c866');add(card.advice,42,'#f7fbff',44);}
  if(card.memo)add(`밤 체크인: ${card.memo}`,30,'#a9bbc2');
  add('놀이용 결과이며 실제 성공 확률이 아닙니다.',28,'#a9bbc2');
  canvas.height=Math.max(1350,Math.ceil(lines.reduce((y,r)=>y+(r.gap||r.size*1.55),220)));
  ctx.fillStyle='#0a141a';ctx.fillRect(0,0,canvas.width,canvas.height);
  let y=110;
  for(const row of lines){if(row.gap){y+=row.gap;continue;}ctx.font=`600 ${row.size}px Malgun Gothic, sans-serif`;
    ctx.fillStyle=row.color;ctx.fillText(row.text,110,y+row.size);y+=row.size*1.55;}
  return canvas;
}
