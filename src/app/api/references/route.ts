import {ok} from '@/lib/api';
import {repo} from '@/lib/data/repository';
import {proofReadiness} from '@/lib/domain/proof-readiness';
import {currentUser} from '@/lib/session';

export async function GET(){
  const user=await currentUser();
  const canReadRestricted=['quality','admin'].includes(user.role);
  const evidence=repo.evidence().filter(item=>canReadRestricted||item.status!=='restricted');
  return ok(repo.references().map(reference=>{
    const evidenceIds=reference.evidenceIds.filter(id=>evidence.some(item=>item.id===id));
    return {...reference,evidenceIds,computed:proofReadiness({...reference,evidenceIds},evidence)};
  }));
}
