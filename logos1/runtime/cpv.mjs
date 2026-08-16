export const CPV_DIMENSIONS = Object.freeze(['R','G','S','A','M','T','B','C','U','I']);

export function cpvSnapshot({recurrence=0,globalAccess=0,selfModel=0,attentionSchema=0,metacognition=0,temporalContinuity=0,boundary=0,counterfactual=0,uncertaintyAwareness=0,integration=0}={}) {
  const values=[recurrence,globalAccess,selfModel,attentionSchema,metacognition,temporalContinuity,boundary,counterfactual,uncertaintyAwareness,integration].map(x=>Math.max(0,Math.min(1,Number(x)||0)));
  return Object.freeze(Object.fromEntries(CPV_DIMENSIONS.map((k,i)=>[k,values[i]])));
}

export function assertCPVNonAuthority(snapshot) {
  if ('authority' in snapshot || 'permission' in snapshot || 'grant' in snapshot) throw new Error('CPV must not carry authority');
  return true;
}
