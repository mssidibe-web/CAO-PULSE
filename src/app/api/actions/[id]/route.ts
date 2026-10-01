import {z} from 'zod';
import {fail,ok} from '@/lib/api';
import {repo} from '@/lib/data/repository';
import {currentUser} from '@/lib/session';

const patchSchema=z.object({status:z.enum(['todo','in_progress','done'])}).strict();
export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){
  const user=await currentUser();const {id}=await params;
  const action=repo.actions().find(item=>item.id===id);
  if(!action)return fail('Introuvable',404);
  if(!(user.role==='admin'||user.role==='founder'||action.ownerId===user.id)){
    repo.addAudit({id:`ae-${Date.now()}`,timestamp:new Date().toISOString(),userId:user.id,action:'action_update',objectType:'action',objectId:id,result:'denied'});
    return fail('Action interdite',403);
  }
  const parsed=patchSchema.safeParse(await req.json());
  if(!parsed.success)return fail('Mise à jour invalide',400);
  const updated=repo.updateAction(id,parsed.data);
  repo.addAudit({id:`ae-${Date.now()}`,timestamp:new Date().toISOString(),userId:user.id,action:'action_update',objectType:'action',objectId:id,result:'success'});
  return ok(updated);
}
