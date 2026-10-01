import type {Action,BillingMilestone,EvidenceItem,OfferRequirement,Opportunity,ReferenceCase,ReviewPoint} from '@/lib/types';
import {weightedValue} from './scoring';import {proofReadiness} from './proof-readiness';import {requirementCoverage} from './requirements';
export function computeKpis(o:Opportunity[],refs:ReferenceCase[],ev:EvidenceItem[],reqs:OfferRequirement[],rp:ReviewPoint[],billing:BillingMilestone[],actions:Action[],asOf=new Date().toISOString().slice(0,10)){
 const priority=o.filter(x=>x.priority==='high'&&!x.result); const refReady=refs.filter(r=>proofReadiness(r,ev).ready).length;
 const bill=billing.filter(b=>b.status==='ready_to_bill'||b.status==='overdue').reduce((s,b)=>s+b.amount,0); const cov=requirementCoverage(reqs,ev);
 return {priorityOpportunities:priority.length,weightedPipeline:priority.reduce((s,x)=>s+weightedValue(x),0),proofReadyPct:refs.length?Math.round(refReady/refs.length*100):0,mandatoryCoverage:cov.pct,openMajorReviewPoints:rp.filter(x=>x.status==='open'&&(x.severity==='major'||x.severity==='blocking')).length,billableOrOverdue:bill,overdueActions:actions.filter(a=>a.status!=='done'&&a.dueDate<asOf).length}
}
