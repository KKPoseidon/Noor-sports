import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {stripTypeScriptTypes} from 'node:module';
const root=fileURLToPath(new URL('../', import.meta.url));


const source=fs.readFileSync(root+'supabase/functions/server/index.tsx','utf8').replace(/^import .*;\r?\n/gm,'');
const code=stripTypeScriptTypes(source);
const routes=new Map(), store=new Map();
let pi, token, mutations, confirmedStatus='succeeded';
const response=data=>({ok:true,json:async()=>structuredClone(data)});
class Hono {use(){} get(p,h){routes.set(p,h)} post(p,h){routes.set(p,h)}}
const context={Hono,cors:()=>{},logger:()=>{},console,URLSearchParams,btoa,crypto,TextEncoder,Date,Deno:{env:{get:()=> 'test'},serve:()=>{}},kv:{get:async k=>store.get(k),set:async(k,v)=>store.set(k,v),del:async k=>store.delete(k)},fetch:async(url,opts={})=>{
  if(url.includes('/rest/v1/')) {const row=JSON.parse(opts.body);if(store.has(row.key))return {ok:false,status:409};store.set(row.key,row.value);return {ok:true};}
  if(!opts.method) return response(url.includes('confirmation_tokens')?token:pi);
  mutations.push({url,opts});
  const data=new URLSearchParams(opts.body);
  if(url.endsWith('/confirm')){pi.status=confirmedStatus;token.payment_intent=pi.id;return response(pi)}
  if(data.has('amount')) pi.amount=Number(data.get('amount'));
  for(const [k,v] of data) if(k.startsWith('metadata[')) pi.metadata[k.slice(9,-1)]=v;
  return response(pi);
}};
vm.runInNewContext(code,context);
const endpoint=routes.get('/make-server-e11bef9e/confirm-payment');
async function call(body){return endpoint({req:{json:async()=>({paymentIntentId:'pi_test',confirmationTokenId:'ctoken_test',...body})},json:(data,status=200)=>({data,status})})}
function reset(type='card',funding='credit'){
  store.clear();mutations=[];confirmedStatus='succeeded';
  pi={id:'pi_test',currency:'usd',amount:39700,confirmation_method:'automatic',status:'requires_payment_method',metadata:{programCode:'fall-2026-soccer-camp',registrationId:'NS-test'},client_secret:'test'};
  token={expires_at:Date.now()/1000+3600,payment_method_preview:{type,card:{funding},billing_details:{email:'test@example.com'}}};
}
let count=0;
for(const [type,funding,total] of [['card','debit',38500],['us_bank_account',null,38500],['card','credit',39700],['card','prepaid',39700],['card','unknown',39700],['card',undefined,39700]]){
  reset(type,funding);let r=await call({finalize:false,total:1,discount:99999});assert.equal(r.data.quote.total,total);assert.equal(mutations.length,0,'Review must never mutate Stripe');
  r=await call({finalize:true,expectedTotal:total});assert.equal(r.status,200);assert.equal(pi.amount,total);assert.equal(mutations.length,2);assert.ok(mutations[1].opts.headers['Idempotency-Key']);
  r=await call({finalize:true,expectedTotal:total});assert.equal(r.data.status,'succeeded');assert.equal(mutations.length,2,'Retry must not charge again');count+=3;
}
reset();assert.equal((await call({finalize:true,expectedTotal:39700})).status,409);assert.equal(mutations.length,0);count++;
reset();await call({finalize:false});assert.equal((await call({finalize:true,expectedTotal:1})).status,409);assert.equal(mutations.length,0);count++;
reset();token.expires_at=1;assert.equal((await call({finalize:false})).status,409);count++;
reset('link');assert.equal((await call({finalize:false})).status,400);count++;
reset();pi.metadata.programCode='other';assert.equal((await call({finalize:false})).status,403);count++;
reset();pi.confirmation_method='manual';assert.equal((await call({finalize:false})).status,409);count++;
reset('card','debit');await call({finalize:false});confirmedStatus='requires_action';await call({finalize:true,expectedTotal:38500});pi.status='requires_confirmation';confirmedStatus='succeeded';assert.equal((await call({finalize:true,expectedTotal:38500})).data.status,'succeeded');assert.equal(mutations.length,3);assert.equal(mutations[2].opts.body,'');count++;
reset('us_bank_account');await call({finalize:false});confirmedStatus='processing';assert.equal((await call({finalize:true,expectedTotal:38500})).data.status,'processing');count++;
reset();await call({finalize:false});store.set('payment-confirmation:pi_test',{tokenId:'ctoken_other'});assert.equal((await call({finalize:true,expectedTotal:39700})).status,409);assert.equal(mutations.length,0);count++;
console.log(`${count} payment assertions/scenarios passed; Stripe calls mocked, no real charges.`);


