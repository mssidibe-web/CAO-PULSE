import {fail,ok} from '@/lib/api';
import {repo} from '@/lib/data/repository';
import {currentUser} from '@/lib/session';

export async function GET(){
  const user=await currentUser();
  if(!['founder','commercial','manager','quality','admin'].includes(user.role))return fail('Pipeline commercial interdit',403);
  return ok(repo.opportunities());
}
