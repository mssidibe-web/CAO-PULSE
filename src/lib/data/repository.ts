import * as f from './fixtures';
import type {Action,AuditEvent,BidDecision,BillingMilestone,MarketSignal,MissionDraftReview,OfferRequirement,Opportunity,RagDocument,ReviewPoint} from '@/lib/types';

const ragSeed:RagDocument[]=[{id:'rag-demo-method',title:'Guide synthétique — revue qualité',content:'La revue qualité nécessite un plan de travail, une analyse des preuves disponibles, la résolution des points de revue et une validation humaine avant clôture.',scope:'office',allowedRoles:['founder','commercial','manager','expert','quality','admin'],ingestedBy:'system',ingestedAt:'2026-10-02T00:00:00.000Z',sourceId:'rag-demo-method'},{id:'rag-demo-growth',title:'Guide synthétique — capitalisation des références',content:'Une référence proposée pour une offre doit être rapprochée des exigences, de preuves vérifiées et réutilisables, puis des experts documentés.',scope:'office',allowedRoles:['founder','commercial','manager','expert','quality','admin'],ingestedBy:'system',ingestedAt:'2026-10-02T00:00:00.000Z',sourceId:'rag-demo-growth'}];
type State={signals:MarketSignal[];opportunities:Opportunity[];bidDecisions:BidDecision[];requirements:OfferRequirement[];reviewPoints:ReviewPoint[];draftReviews:MissionDraftReview[];actions:Action[];billing:BillingMilestone[];ragDocuments:RagDocument[];auditEvents:AuditEvent[]};
const clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x));
const baseline=():State=>({signals:clone(f.signals),opportunities:clone(f.opportunities),bidDecisions:clone(f.bidDecisions),requirements:clone(f.requirements),reviewPoints:clone(f.reviewPoints),draftReviews:clone(f.draftReviews),actions:clone(f.actions),billing:clone(f.billing),ragDocuments:clone(ragSeed),auditEvents:clone(f.auditEvents)});

declare global {var __caoPulseState:State|undefined}
function state(){globalThis.__caoPulseState??=baseline();return globalThis.__caoPulseState}

export const repo={
 users:()=>f.users, experts:()=>f.experts, evidence:()=>f.evidence, references:()=>f.references, missions:()=>f.missions,
 documents:()=>f.missionDocuments, pbc:()=>f.pbcRequests, knowledge:()=>f.knowledge, ragDocuments:()=>state().ragDocuments,
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
  addRagDocument:(document:RagDocument)=>{state().ragDocuments.unshift(document);return document},
  addAudit:(e:AuditEvent)=>{state().auditEvents.unshift(e);return e}
};
