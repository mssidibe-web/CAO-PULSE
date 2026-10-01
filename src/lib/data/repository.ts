import * as f from './fixtures';
import type {Action,AuditEvent,BillingMilestone,OfferRequirement,Opportunity,ReviewPoint} from '@/lib/types';

type State={opportunities:Opportunity[];requirements:OfferRequirement[];reviewPoints:ReviewPoint[];actions:Action[];billing:BillingMilestone[];auditEvents:AuditEvent[]};
const clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x));
const baseline=():State=>({opportunities:clone(f.opportunities),requirements:clone(f.requirements),reviewPoints:clone(f.reviewPoints),actions:clone(f.actions),billing:clone(f.billing),auditEvents:clone(f.auditEvents)});

declare global {var __caoPulseState:State|undefined}
function state(){globalThis.__caoPulseState??=baseline();return globalThis.__caoPulseState}

export const repo={
 users:()=>f.users, experts:()=>f.experts, evidence:()=>f.evidence, references:()=>f.references, missions:()=>f.missions,
 documents:()=>f.missionDocuments, pbc:()=>f.pbcRequests, knowledge:()=>f.knowledge,
 opportunities:()=>state().opportunities, requirements:()=>state().requirements, reviewPoints:()=>state().reviewPoints,
 actions:()=>state().actions, billing:()=>state().billing, auditEvents:()=>state().auditEvents,
 reset:()=>{globalThis.__caoPulseState=baseline();return state()},
 updateOpportunity:(id:string,patch:Partial<Opportunity>)=>{const o=state().opportunities.find(x=>x.id===id);if(!o)return null;Object.assign(o,patch);return o},
 updateRequirement:(id:string,patch:Partial<OfferRequirement>)=>{const x=state().requirements.find(v=>v.id===id);if(!x)return null;Object.assign(x,patch);return x},
 updateReviewPoint:(id:string,patch:Partial<ReviewPoint>)=>{const x=state().reviewPoints.find(v=>v.id===id);if(!x)return null;Object.assign(x,patch);return x},
 addAudit:(e:AuditEvent)=>{state().auditEvents.unshift(e);return e}
};
