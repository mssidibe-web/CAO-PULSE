export type Role='founder'|'commercial'|'manager'|'expert'|'quality'|'admin';
export type Gate='PASS'|'WARN'|'BLOCKED';
export type OpportunityStage='signal'|'qualification'|'decision'|'capture'|'eoi'|'rfp'|'negotiation'|'offer'|'result'|'capitalized';
export type ProofStatus='missing'|'partial'|'proof_ready'|'expired';
export type RequirementStatus='open'|'matched'|'validated'|'not_applicable';

export interface User {id:string;name:string;role:Role;missionIds:string[];active:boolean}
export interface ExpertProfile {id:string;name:string;title:string;skills:string[];sectors:string[];countries:string[];languages:string[];availability:'available'|'limited'|'unavailable';referenceIds:string[]}
export interface EvidenceItem {id:string;referenceId:string;type:'contract'|'attestation'|'report'|'certificate'|'cv'|'other';title:string;status:'verified'|'missing'|'expired'|'restricted';reusable:boolean;locator:string;verifiedAt:string}
export interface ReferenceCase {id:string;title:string;clientAlias:string;country:string;sector:string;service:string;year:number;summary:string;keywords:string[];expertIds:string[];evidenceIds:string[];reusable:boolean;proofStatus:ProofStatus}
export interface ScoreFactors {strategic:number;references:number;capacity:number;access:number;economics:number;competition:number}
export interface Opportunity {id:string;title:string;buyer:string;country:string;sector:string;source:string;sourceUrl:string;fundingStatus:'confirmed'|'likely'|'unknown'|'not_funded';deadline:string;estimatedValue:number;currency:'XOF'|'EUR'|'USD';stage:OpportunityStage;ownerId:string;nextAction:string;dueDate:string;priority:'high'|'medium'|'low';scores:ScoreFactors;gates:{eligibility:Gate;independence:Gate;funding:Gate};referenceIds:string[];expertIds:string[];requirementIds:string[];result?:'won'|'lost'|'abandoned'|'cancelled';lossReason?:string}
export interface OfferRequirement {id:string;opportunityId:string;category:'eligibility'|'reference'|'expert'|'methodology'|'administrative'|'financial';text:string;mandatory:boolean;status:RequirementStatus;evidenceIds:string[];ownerId:string;dueDate:string}
export interface Action {id:string;objectType:'opportunity'|'reference'|'mission'|'billing';objectId:string;title:string;ownerId:string;dueDate:string;status:'todo'|'in_progress'|'done';priority:'high'|'medium'|'low'}
export interface Mission {id:string;name:string;clientAlias:string;type:string;status:'planned'|'active'|'review'|'closed';managerId:string;partnerId:string;startDate:string;endDate:string;progress:number;authorizedUserIds:string[]}
export interface MissionDocument {id:string;missionId:string;title:string;kind:string;content:string;sourceId:string;injected?:boolean}
export interface PBCRequest {id:string;missionId:string;title:string;owner:string;dueDate:string;status:'requested'|'received'|'reviewed'|'overdue'}
export interface ReviewPoint {id:string;missionId:string;severity:'info'|'minor'|'major'|'blocking';title:string;description:string;sourceDocumentId?:string;ownerId:string;dueDate:string;status:'open'|'resolved'|'rejected'}
export interface BillingMilestone {id:string;missionId:string;label:string;amount:number;currency:'XOF'|'EUR'|'USD';dueDate:string;status:'future'|'ready_to_bill'|'invoiced'|'overdue'|'paid'}
export interface KnowledgeItem {id:string;title:string;kind:'method'|'policy'|'reference_note';content:string;sourceId:string;allowedRoles:Role[];validThrough?:string}
export interface AuditEvent {id:string;timestamp:string;userId:string;action:string;objectType:string;objectId:string;result:'success'|'denied'|'error';metadata?:Record<string,string|number|boolean>}
export interface Citation {sourceId:string;title:string;locator:string}
export interface AIRequest {task:'growth_note'|'reference_match'|'mission_review'|'command_summary'|'assistant';prompt:string;context:string[];citations?:Citation[]}
export interface AIResponse {text:string;citations:Citation[];provider:string;model:string;fallback:boolean;unsupported?:string[]}
