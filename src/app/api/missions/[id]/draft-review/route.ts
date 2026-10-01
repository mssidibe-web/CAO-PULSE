import {z} from 'zod';
import {fail,ok} from '@/lib/api';
import {repo} from '@/lib/data/repository';
import {canReadMission} from '@/lib/domain/permissions';
import {currentUser} from '@/lib/session';

const schema=z.object({outcome:z.enum(['accepted','rejected']),rationale:z.string().trim().min(3).max(1000)}).strict();
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const user=await currentUser();const mission=repo.missions().find(item=>item.id===id);if(!mission||!canReadMission(user,mission))return fail('Interdit',403);return ok(repo.draftReviews().filter(item=>item.missionId===id))}
export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const user=await currentUser();const mission=repo.missions().find(item=>item.id===id);if(!mission||!canReadMission(user,mission)||!['founder','manager','quality','admin'].includes(user.role))return fail('Validation de brouillon interdite',403);const parsed=schema.safeParse(await req.json().catch(()=>null));if(!parsed.success)return fail('Validation de brouillon invalide',400);const review=repo.addDraftReview({id:`dr-${Date.now()}`,missionId:id,...parsed.data,reviewedBy:user.id,reviewedAt:new Date().toISOString()});repo.addAudit({id:`ae-${Date.now()}`,timestamp:new Date().toISOString(),userId:user.id,action:`mission_draft_${parsed.data.outcome}`,objectType:'mission',objectId:id,result:'success'});return ok(review)}
