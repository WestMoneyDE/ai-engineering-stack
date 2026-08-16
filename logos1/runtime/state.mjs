export class WorkOrderState {
  constructor({id,status='ACTIVE',parent=null}={}) { this.id=id; this.status=status; this.parent=parent; this.attempts=[]; }
  recordAttempt({id,result,evidence=[]}) {
    if (this.attempts.some(a=>a.id===id)) throw new Error('duplicate attempt');
    this.attempts.push(Object.freeze({id,result,evidence:[...evidence]}));
  }
}

export class ReconciliationState {
  constructor(){ this.scopes=new Map(); }
  begin(scope){ const s=this.scopes.get(scope)??'NOT_STARTED'; if(['STARTED','SUCCEEDED','OUTCOME_UNKNOWN'].includes(s)) return false; this.scopes.set(scope,'STARTED'); return true; }
  finish(scope,outcome){ if(this.scopes.get(scope)!=='STARTED') throw new Error('invalid transition'); this.scopes.set(scope,outcome); }
  state(scope){ return this.scopes.get(scope)??'NOT_STARTED'; }
}
