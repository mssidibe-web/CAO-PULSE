import type {EvidenceItem,OfferRequirement} from '@/lib/types';

function hasReusableVerifiedEvidence(requirement:OfferRequirement,evidence:EvidenceItem[]){
  return requirement.evidenceIds.some((id)=>evidence.some((item)=>item.id===id&&item.status==='verified'&&item.reusable));
}
export function requirementCoverage(requirements:OfferRequirement[],evidence:EvidenceItem[]){
  const mandatory=requirements.filter((requirement)=>requirement.mandatory);
  const covered=mandatory.filter((requirement)=>requirement.status!=='not_applicable'&&hasReusableVerifiedEvidence(requirement,evidence));
  return {mandatory:mandatory.length,covered:covered.length,pct:mandatory.length?Math.round(covered.length/mandatory.length*100):100};
}
