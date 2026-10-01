import {z} from 'zod';
import {fail,ok} from '@/lib/api';
import {repo} from '@/lib/data/repository';
import {currentUser} from '@/lib/session';
import {canEditOpportunity} from '@/lib/domain/permissions';
import type {OpportunityStage} from '@/lib/types';

const patchSchema=z.object({nextAction:z.string().min(1).max(500).optional(),dueDate:z.string().date().optional(),priority:z.enum(['high','medium','low']).optional(),stage:z.enum(['signal','qualification','decision','capture','eoi','rfp','negotiation','offer','result','capitalized']).optional(),result:z.enum(['won','lost','abandoned','cancelled']).optional(),lossReason:z.string().trim().min(3).max(500).optional()}).strict();
const transitions:Record<OpportunityStage,OpportunityStage[]>={signal:['qualification'],qualification:['decision'],decision:['capture','eoi','rfp','negotiation'],capture:['eoi','rfp','negotiation','offer'],eoi:['rfp','negotiation','offer'],rfp:['negotiation','offer'],negotiation:['offer','result'],offer:['result'],result:['capitalized'],capitalized:[]};
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){const user=await currentUser();const {id}=await params;if(!['founder','commercial','manager','quality','admin'].includes(user.role))return fail('Opportunité interdite',403);const opportunity=repo.opportunities().find(item=>item.id===id);return opportunity?ok(opportunity):fail('Introuvable',404)}
export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){
  const user=await currentUser();const {id}=await params;
  if(!canEditOpportunity(user.role)){repo.addAudit({id:`ae-${Date.now()}`,timestamp:new Date().toISOString(),userId:user.id,action:'opportunity_update',objectType:'opportunity',objectId:id,result:'denied'});return fail('Interdit',403)}
  const opportunity=repo.opportunities().find(item=>item.id===id);if(!opportunity)return fail('Introuvable',404);
  const parsed=patchSchema.safeParse(await req.json().catch(()=>null));if(!parsed.success)return fail('Mise à jour invalide',400);
  const patch=parsed.data;
  if(patch.stage&&patch.stage!==opportunity.stage&&!transitions[opportunity.stage].includes(patch.stage))return fail('Transition de pipeline interdite',409);
  if(patch.stage==='result'&&!patch.result)return fail('Un résultat est requis pour clôturer une opportunité',400);
  if(['lost','abandoned'].includes(patch.result??'')&&!patch.lossReason)return fail('Un motif est requis pour une perte ou un abandon',400);
  if(patch.result&&patch.stage!=='result')return fail('Le résultat ne peut être défini qu’à la clôture',400);
  const updated=repo.updateOpportunity(id,patch);if(!updated)return fail('Introuvable',404);
  repo.addAudit({id:`ae-${Date.now()}`,timestamp:new Date().toISOString(),userId:user.id,action:'opportunity_update',objectType:'opportunity',objectId:id,result:'success'});
  return ok(updated);
}
