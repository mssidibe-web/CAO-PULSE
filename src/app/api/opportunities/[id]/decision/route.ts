import {z} from 'zod';
import {fail,ok} from '@/lib/api';
import {repo} from '@/lib/data/repository';
import {currentUser} from '@/lib/session';
import {canDecideBid} from '@/lib/domain/permissions';
import {blockingReasons} from '@/lib/domain/scoring';

const decisionSchema=z.object({decision:z.enum(['GO','GO_CONDITIONAL','NO_GO','HOLD']),rationale:z.string().min(3).max(2000)}).strict();
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){
  const user=await currentUser();const {id}=await params;
  if(!['founder','commercial','manager','quality','admin'].includes(user.role))return fail('Historique de décision interdit',403);
  if(!repo.opportunities().some(item=>item.id===id))return fail('Introuvable',404);
  return ok(repo.bidDecisions().filter(item=>item.opportunityId===id));
}
export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){
  const u=await currentUser();const {id}=await params;
  if(!canDecideBid(u.role)){repo.addAudit({id:`ae-${Date.now()}`,timestamp:new Date().toISOString(),userId:u.id,action:'bid_decision',objectType:'opportunity',objectId:id,result:'denied'});return fail('Décision réservée à la direction',403)}
  const o=repo.opportunities().find(x=>x.id===id);if(!o)return fail('Introuvable',404);
  const parsed=decisionSchema.safeParse(await req.json());if(!parsed.success)return fail('Décision invalide',400);
  if(['GO','GO_CONDITIONAL'].includes(parsed.data.decision)&&blockingReasons(o).length)return fail('GO impossible: gate bloquant',409);
  const record=repo.addBidDecision({id:`bd-${Date.now()}`,opportunityId:id,...parsed.data,decidedBy:u.id,decidedAt:new Date().toISOString()});
  repo.addAudit({id:`ae-${Date.now()}`,timestamp:new Date().toISOString(),userId:u.id,action:`bid_decision_${parsed.data.decision}`,objectType:'opportunity',objectId:id,result:'success',metadata:{rationale:parsed.data.rationale}});
  return ok(record);
}
