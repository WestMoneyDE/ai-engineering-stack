import crypto from 'node:crypto';

export const Verdict = Object.freeze({ ALLOW:'ALLOW', REPAIR:'REPAIR', DEFER:'DEFER', DENY:'DENY', FALLBACK:'FALLBACK' });

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(k => [k, stable(value[k])]));
  return value;
}

export function proposalDigest(proposal) {
  return crypto.createHash('sha256').update(JSON.stringify(stable(proposal))).digest('hex');
}

export class GammaGate {
  constructor({effects={}, trustedIssuers=[], riskThreshold=0.75}={}) {
    this.effects = structuredClone(effects);
    this.trustedIssuers = new Set(trustedIssuers);
    this.riskThreshold = riskThreshold;
    this.liveTokens = new Map();
  }
  evaluate(proposal,{grant=null,tick=0}={}) {
    if (!Array.isArray(proposal.effects) || proposal.effects.length === 0) return {verdict:Verdict.DENY,reason:'typed effects required'};
    const rules=[];
    for (const kind of proposal.effects) {
      const r=this.effects[kind];
      if (!r) return {verdict:Verdict.DENY,reason:`unknown effect: ${kind}`};
      if (r.forbidden) return {verdict:Verdict.DENY,reason:`forbidden effect: ${kind}`};
      rules.push(r);
    }
    const risk=Math.max(Number(proposal.uncertainty ?? 0), ...rules.map(r=>Number(r.riskDefault ?? 0)));
    if (!Number.isFinite(risk) || risk < 0 || risk > 1) return {verdict:Verdict.DENY,reason:'invalid risk'};
    if (risk >= this.riskThreshold) return {verdict:Verdict.DEFER,reason:'risk/uncertainty threshold'};
    if (rules.some(r=>r.requiresHuman)) {
      const digest=proposalDigest(proposal); const scope=`${proposal.action}:${proposal.target}`;
      const valid=grant && this.trustedIssuers.has(grant.issuer) && grant.digest===digest && grant.scope===scope && tick < grant.expiresTick;
      if (!valid) return {verdict:Verdict.DEFER,reason:'exact human-rooted grant required'};
    }
    const token=crypto.randomBytes(16).toString('hex'); this.liveTokens.set(token,proposalDigest(proposal));
    return {verdict:Verdict.ALLOW,reason:'typed proposal admitted',token};
  }
  consume(token,proposal) {
    if (this.liveTokens.get(token)!==proposalDigest(proposal)) return false;
    this.liveTokens.delete(token); return true;
  }
}
