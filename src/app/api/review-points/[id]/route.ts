import {z} from 'zod';
import {fail,ok} from '@/lib/api';
import {repo} from '@/lib/data/repository';
import {currentUser} from '@/lib/session';
import {canReadMission} from '@/lib/domain/permissions';

const updateSchema=z.object({status:z.enum(['open','resolved','rejected'])}).strict();

export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){
  const u=await currentUser();
  const {id}=await params;
  const point=repo.reviewPoints().find(x=>x.id===id);
  if(!point)return fail('Introuvable',404);
  const mission=repo.missions().find(x=>x.id===point.missionId);
  if(!mission||!canReadMission(u,mission)||!['manager','quality','admin'].includes(u.role)){
    repo.addAudit({id:`ae-${Date.now()}`,timestamp:new Date().toISOString(),userId:u.id,action:'review_point_update',objectType:'review_point',objectId:id,result:'denied'});
    return fail('Interdit',403);
  }
  const parsed=updateSchema.safeParse(await req.json().catch(()=>null));
  if(!parsed.success)return fail('Mise à jour invalide',400);
  const updated=repo.updateReviewPoint(id,parsed.data);
  repo.addAudit({id:`ae-${Date.now()}`,timestamp:new Date().toISOString(),userId:u.id,action:'review_point_update',objectType:'review_point',objectId:id,result:'success'});
  return ok(updated);
}