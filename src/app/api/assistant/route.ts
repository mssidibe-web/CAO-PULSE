import {z} from 'zod';
import {fail,ok} from '@/lib/api';
import {generateSafe} from '@/lib/ai';
import {repo} from '@/lib/data/repository';
import {currentUser} from '@/lib/session';

const requestSchema=z.object({task:z.enum(['growth_note','reference_match','mission_review','command_summary','assistant']).default('assistant'),prompt:z.string().trim().min(1).max(2000)}).strict();
export async function POST(req:Request){
  const user=await currentUser();
  if(user.role==='anonymous')return fail('Session requise',401);
  const parsed=requestSchema.safeParse(await req.json().catch(()=>null));
  if(!parsed.success)return fail('Demande assistant invalide',400);
  const context=[`Opportunités prioritaires=${repo.opportunities().filter(o=>o.priority==='high').length}`,`Références=${repo.references().length}`,`Points ouverts=${repo.reviewPoints().filter(p=>p.status==='open').length}`,`Jalons cash=${repo.billing().map(x=>`${x.label}:${x.status}`).join(';')}`];
  const citations=[{sourceId:'fixture-opportunities',title:'Opportunités de démonstration',locator:'src/lib/data/fixtures.ts'},{sourceId:'fixture-references',title:'Références de démonstration',locator:'src/lib/data/fixtures.ts'},{sourceId:'fixture-missions',title:'Missions et points de revue',locator:'src/lib/data/fixtures.ts'},{sourceId:'fixture-billing',title:'Jalons de facturation synthétiques',locator:'src/lib/data/fixtures.ts'}];
  return ok(await generateSafe({...parsed.data,context,citations}));
}
