import {fail,ok} from '@/lib/api';
import {repo} from '@/lib/data/repository';
import {currentUser} from '@/lib/session';

export async function POST(_:Request,{params}:{params:Promise<{id:string}>}){
  const user=await currentUser();const {id}=await params;
  if(!['commercial','admin'].includes(user.role))return fail('Promotion de signal interdite',403);
  const signal=repo.signals().find(item=>item.id===id);
  if(!signal)return fail('Signal introuvable',404);
  const now=new Date().toISOString();
  const opportunity=repo.promoteSignal(id,{id:`opp-${Date.now()}`,title:signal.title,buyer:signal.buyer,country:signal.country,sector:signal.sector,source:signal.source,sourceUrl:signal.sourceUrl,fundingStatus:'unknown',deadline:signal.deadline??signal.detectedAt,estimatedValue:signal.estimatedValue??0,currency:signal.currency??'XOF',stage:'qualification',ownerId:user.id,nextAction:'Qualifier le besoin, le financement et les critères d’éligibilité',dueDate:signal.deadline??signal.detectedAt,priority:'medium',scores:{strategic:50,references:50,capacity:50,access:50,economics:50,competition:50},gates:{eligibility:'WARN',independence:'WARN',funding:'WARN'},referenceIds:[],expertIds:[],requirementIds:[]});
  if(!opportunity)return fail('Signal introuvable',404);
  repo.addAudit({id:`ae-${Date.now()}`,timestamp:now,userId:user.id,action:'signal_promoted',objectType:'signal',objectId:id,result:'success',metadata:{opportunityId:opportunity.id}});
  return ok(opportunity);
}
