import type {Opportunity} from '@/lib/types';
export const weights={strategic:.20,references:.20,capacity:.15,access:.15,economics:.15,competition:.15} as const;
export function scoreOpportunity(o:Opportunity){return Math.round(Object.entries(weights).reduce((s,[k,w])=>s+o.scores[k as keyof typeof o.scores]*w,0))}
export function blockingReasons(o:Opportunity){const r:string[]=[];if(o.gates.eligibility==='BLOCKED')r.push('Éligibilité bloquante');if(o.gates.independence==='BLOCKED')r.push('Indépendance / conflit non résolu');if(o.fundingStatus==='not_funded')r.push('Financement absent');return r}
export function suggestedDecision(o:Opportunity){if(blockingReasons(o).length)return 'NO_GO' as const;const s=scoreOpportunity(o);if(o.gates.funding==='WARN'||o.fundingStatus==='unknown'||s<70)return 'GO_CONDITIONNEL' as const;return 'GO' as const}
export function weightedValue(o:Opportunity){return o.estimatedValue}
