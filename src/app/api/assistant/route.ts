import {z} from 'zod';
import {fail,ok} from '@/lib/api';
import {generateSafe} from '@/lib/ai';
import {repo} from '@/lib/data/repository';
import {canReadMission} from '@/lib/domain/permissions';
import {currentUser} from '@/lib/session';

const requestSchema=z.object({task:z.enum(['growth_note','reference_match','mission_review','command_summary','assistant']).default('assistant'),prompt:z.string().trim().min(1).max(2000)}).strict();
const canReadGrowth=(role:string)=>['founder','commercial','manager','quality','admin'].includes(role);
const canReadBilling=(role:string)=>['founder','admin'].includes(role);
export async function POST(req:Request){
  const user=await currentUser();
  if(user.role==='anonymous')return fail('Session requise',401);
  const parsed=requestSchema.safeParse(await req.json().catch(()=>null));
  if(!parsed.success)return fail('Demande assistant invalide',400);
  const context:string[]=[];
  const citations:{sourceId:string;title:string;locator:string}[]=[];
  if(canReadGrowth(user.role)){context.push(`Opportunités prioritaires=${repo.opportunities().filter(opportunity=>opportunity.priority==='high').length}`);citations.push({sourceId:'fixture-opportunities',title:'Opportunités de démonstration',locator:'src/lib/data/fixtures.ts'})}
  context.push(`Références=${repo.references().length}`);citations.push({sourceId:'fixture-references',title:'Références de démonstration',locator:'src/lib/data/fixtures.ts'});
  const readableReviewPoints=repo.reviewPoints().filter(point=>{const mission=repo.missions().find(item=>item.id===point.missionId);return Boolean(mission&&canReadMission(user,mission))});
  if(readableReviewPoints.length){context.push(`Points ouverts=${readableReviewPoints.filter(point=>point.status==='open').length}`);citations.push({sourceId:'fixture-missions',title:'Missions et points de revue autorisés',locator:'src/lib/data/fixtures.ts'})}
  if(canReadBilling(user.role)){context.push(`Jalons cash=${repo.billing().map(item=>`${item.label}:${item.status}`).join(';')}`);citations.push({sourceId:'fixture-billing',title:'Jalons de facturation synthétiques',locator:'src/lib/data/fixtures.ts'})}
  return ok(await generateSafe({...parsed.data,context,citations}));
}
