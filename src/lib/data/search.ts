import type {Citation,User} from '@/lib/types';
import {repo} from './repository';
import {proofReadiness} from '@/lib/domain/proof-readiness';

export function searchKnowledge(user:User,q:string){
  if(user.role==='anonymous')return [];
  const n=q.toLowerCase();
  const out:{kind:string;id:string;title:string;snippet:string;citations:Citation[]}[]=[];
  for(const item of repo.knowledge()) if(item.allowedRoles.includes(user.role)&&(item.title+' '+item.content).toLowerCase().includes(n.split(' ')[0]||'')) out.push({kind:'knowledge',id:item.id,title:item.title,snippet:item.content,citations:[{sourceId:item.sourceId,title:item.title,locator:'fiche synthétique'}]});
  const canReadRestricted=['quality','admin'].includes(user.role);
  for(const reference of repo.references()) if((reference.title+' '+reference.summary+' '+reference.keywords.join(' ')).toLowerCase().includes(n.split(' ')[0]||'')){
    const evidence=repo.evidence().filter(item=>reference.evidenceIds.includes(item.id)&&(canReadRestricted||item.status!=='restricted'));
    const scopedReference={...reference,evidenceIds:evidence.map(item=>item.id)};
    const readiness=proofReadiness(scopedReference,evidence);
    out.push({kind:'reference',id:reference.id,title:reference.title,snippet:`${reference.summary} | proof-ready=${readiness.ready?'oui':'non'}`,citations:evidence.map(item=>({sourceId:item.id,title:item.title,locator:item.locator}))});
  }
  return out.slice(0,10);
}
