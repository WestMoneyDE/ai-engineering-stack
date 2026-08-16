export class EvidenceLedger {
  #entries=[];
  append(entry) {
    const required=['id','claim','status','evidence'];
    for (const k of required) if (!(k in entry)) throw new Error(`missing ${k}`);
    if (this.#entries.some(e=>e.id===entry.id)) throw new Error('IDs are immutable; append a correction instead');
    const frozen=Object.freeze({...structuredClone(entry),recordedAt:new Date().toISOString()});
    this.#entries.push(frozen); return frozen;
  }
  correct(priorId,entry) { return this.append({...entry,corrects:priorId}); }
  all() { return this.#entries.slice(); }
}

export const EpistemicStatus=Object.freeze({KEEP:'KEEP',KEEP_BOUNDED:'KEEP_BOUNDED',HOLD:'HOLD',REJECT:'REJECT',UNTESTED:'UNTESTED',MERGE:'MERGE'});
