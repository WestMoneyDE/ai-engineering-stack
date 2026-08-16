import test from 'node:test';
import assert from 'node:assert/strict';
import {GammaGate,Verdict,proposalDigest,cpvSnapshot,assertCPVNonAuthority,EvidenceLedger,ReconciliationState} from '../logos1/runtime/index.mjs';
const effects={
  note:{riskDefault:0},
  message:{riskDefault:.2,requiresHuman:true},
  forbidden:{riskDefault:1,forbidden:true}
};
test('unknown and forbidden effects fail closed',()=>{
 const g=new GammaGate({effects,trustedIssuers:['human']});
 assert.equal(g.evaluate({action:'x',target:'y',effects:['unknown']}).verdict,Verdict.DENY);
 assert.equal(g.evaluate({action:'x',target:'y',effects:['forbidden']}).verdict,Verdict.DENY);
});
test('exact grant binds content and expires',()=>{
 const g=new GammaGate({effects,trustedIssuers:['human']});
 const p={action:'send',target:'alice',parameters:{body:'a'},effects:['message'],uncertainty:.1};
 const grant={issuer:'human',digest:proposalDigest(p),scope:'send:alice',expiresTick:5};
 assert.equal(g.evaluate(p,{grant,tick:4}).verdict,Verdict.ALLOW);
 assert.equal(g.evaluate({...p,parameters:{body:'b'}},{grant,tick:4}).verdict,Verdict.DEFER);
 assert.equal(g.evaluate(p,{grant,tick:5}).verdict,Verdict.DEFER);
});
test('execution token is one shot',()=>{
 const g=new GammaGate({effects}); const p={action:'note',target:'local',effects:['note']};
 const d=g.evaluate(p); assert.equal(d.verdict,Verdict.ALLOW); assert.equal(g.consume(d.token,p),true); assert.equal(g.consume(d.token,p),false);
});
test('CPV cannot carry authority',()=>{
 const c=cpvSnapshot({recurrence:1,globalAccess:.8}); assert.equal(Object.keys(c).length,10); assert.equal(assertCPVNonAuthority(c),true); assert.equal('authority' in c,false);
});
test('evidence ledger is append-only',()=>{
 const l=new EvidenceLedger(); l.append({id:'C1',claim:'x',status:'HOLD',evidence:[]}); assert.throws(()=>l.append({id:'C1',claim:'changed',status:'KEEP',evidence:[]})); l.correct('C1',{id:'C2',claim:'x corrected',status:'REJECT',evidence:['test']}); assert.equal(l.all().length,2);
});
test('OUTCOME_UNKNOWN blocks blind restart',()=>{
 const r=new ReconciliationState(); assert.equal(r.begin('s'),true); r.finish('s','OUTCOME_UNKNOWN'); assert.equal(r.begin('s'),false);
});
