const {cases}=require('./semantic-eval.cjs');
const stored=require('./fixtures/semantic-v2-responses.json');
const tea=require('./fixtures/tea-semantic-response.json');
const normalized=require('./fixtures/canonical-validated.json');
function envelope(i) {
 const r=i===11?tea:stored[i],f=cases[i];
 return r?.status==='ready'?{binding:JSON.stringify([f.q,f.a,f.b]),version:'semantic-v2',
 meaning:r.meaning,...(normalized[i]?{canonical_axes:normalized[i].canonical_axes}:{})}:null;
}
module.exports={cases,envelope,normalized};
