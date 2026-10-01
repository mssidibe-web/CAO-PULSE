import * as f from './fixtures';
import type {Action,AuditEvent,BidDecision,BillingMilestone,MarketSignal,MissionDraftReview,OfferRequirement,Opportunity,ReviewPoint} from '@/lib/types';

type State={signals:MarketSignal[];opportunities:Opportunity[];bidDecisions:BidDecision[];requirements:OfferRequirement[];reviewPoints:ReviewPoint[];draftReviews:MissionDraftReview[];actions:Action[];billing:BillingMilestone[];auditEvents:AuditEvent[]};
const clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x));
const baseline=():State=>({signals:clone(f.signals),opportunities:clone(f.opportunities),bidDecisions:clone(f.bidDecisions),requirements:clone(f.requirements),reviewPoints:clone(f.reviewPoints),draftReviews:clone(f.draftReviews),actions:clone(f.actions),billing:clone(f.billing),auditEvents:clone(f.auditEvents)});

declare global {var __caoPulseState:State|undefined}
function state(){globalThis.__caoPulseState??=baseline();return globalThis.__caoPulseState}

export const repo={
 users:()=>f.users, experts:()=>f.experts, evidence:()=>f.evidence, references:()=>f.references, missions:()=>f.missions,
 documents:()=>f.missionDocuments, pbc:()=>f.pbcRequests, knowledge:()=>f.knowledge,
 signals:()=>state().signals, opportunities:()=>state().opportunities, bidDecisions:()=>state().bidDecisions, requirements:()=>state().requirements, reviewPoints:()=>state().reviewPoints, draftReviews:()=>state().draftReviews,
  actions:()=>state().actions, billing:()=>state().billing, auditEvents:()=>state().auditEvents,
 reset:()=>{globalThis.__caoPulseState=baseline();return state()},
 updateOpportunity:(id:string,patch:Partial<Opportunity>)=>{const o=state().opportunities.find(x=>x.id===id);if(!o)return null;Object.assign(o,patch);return o},
 promoteSignal:(id:string,opportunity:Opportunity)=>{const index=state().signals.findIndex(item=>item.id===id);if(index<0)return null;state().signals.splice(index,1);state().opportunities.unshift(opportunity);return opportunity},
 updateRequirement:(id:string,patch:Partial<OfferRequirement>)=>{const x=state().requirements.find(v=>v.id===id);if(!x)return null;Object.assign(x,patch);return x},
 updateReviewPoint:(id:string,patch:Partial<ReviewPoint>)=>{const x=state().reviewPoints.find(v=>v.id===id);if(!x)return null;Object.assign(x,patch);return x},
 updateAction:(id:string,patch:Partial<Action>)=>{const x=state().actions.find(v=>v.id===id);if(!x)return null;Object.assign(x,patch);return x},
 addBidDecision:(decision:BidDecision)=>{state().bidDecisions.unshift(decision);return decision},
  addDraftReview:(review:MissionDraftReview)=>{state().draftReviews.unshift(review);return review},
  addAudit:(e:AuditEvent)=>{state().auditEvents.unshift(e);return e}
};
