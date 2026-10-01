import {fail,ok} from '@/lib/api';
import {repo} from '@/lib/data/repository';
import {currentUser} from '@/lib/session';

export async function POST(){
  const user=await currentUser();
  if(user.role!=='admin')return fail('Admin uniquement',403);
  repo.reset();
  repo.addAudit({id:`ae-${Date.now()}`,timestamp:new Date().toISOString(),userId:user.id,action:'demo_reset',objectType:'demo',objectId:'seed',result:'success'});
  return ok({reset:true});
}