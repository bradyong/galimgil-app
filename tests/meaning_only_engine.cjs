// Offline adapter: reuse existing scoring/card/tie functions, not old scene gates.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const c=vm.createContext({console,localStorage:{getItem:()=>null}});
vm.runInContext('Date.now=()=>1791244800000',c);
vm.runInContext(fs.readFileSync(path.join(root,'choice-input.js'),'utf8'),c);
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
vm.runInContext(app.slice(0,app.indexOf('document.getElementById("todayDate").textContent')),c);
c.rows=JSON.parse(fs.readFileSync(0,'utf8'));
const results=vm.runInContext(`rows.map(({f,axes})=>{
 const meaning={id:'offline-meaning-only',situation:f.q,
   options:[f.a,f.b].map(name=>({name,meaning:name,cue:name})),
   ai:{canonical_axes:axes,meaning:{}},decisionAxes:[]};
 const r=semanticPlayNarrative(meaning,{},f.mood??6,signs[f.signIndex??0],{tieRoll:f.tieRoll??.25});
 const e=r.meaning.decisionEvidence;
 return {winner:r.winner.name,score:r.winnerScore,axes:e.used,traces:e.traces,
   inputs:e.inputs,tie:e.tieBreak,excluded:e.excluded};
})`,c);
process.stdout.write(JSON.stringify(results));
