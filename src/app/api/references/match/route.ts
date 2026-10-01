import {z} from 'zod';
import {ok} from '@/lib/api';
import {repo} from '@/lib/data/repository';
import {proofReadiness} from '@/lib/domain/proof-readiness';

const requestSchema=z.object({query:z.string().max(500).default(''),limit:z.number().int().min(1).max(5).default(5)}).strict();
export async function POST(req:Request){
  const parsed=requestSchema.safeParse(await req.json());
  if(!parsed.success)return new Response(JSON.stringify({data:null,error:{message:'Recherche invalide'},meta:{}}),{status:400,headers:{'content-type':'application/json'}});
  const q=parsed.data.query.toLowerCase();
  const result=repo.references().map((reference)=>{
    const readiness=proofReadiness(reference,repo.evidence());
    const score=reference.keywords.filter((keyword)=>q.includes(keyword)||reference.summary.toLowerCase().includes(keyword)).length;
    return {referenceId:reference.id,title:reference.title,score,relevant:score>0,eligible:reference.reusable&&!reference.evidenceIds.some((id)=>repo.evidence().find((item)=>item.id===id)?.status==='restricted'),evidencePresent:readiness.validCount>0,proofReady:readiness.ready,blockers:readiness.blockers};
  }).filter((item)=>item.relevant&&item.eligible).sort((a,b)=>b.score-a.score).slice(0,parsed.data.limit);
  return ok(result);
}
