import {z} from 'zod';
import {cookies} from 'next/headers';
import {repo} from '@/lib/data/repository';
import {fail,ok} from '@/lib/api';
import {createDemoSession} from '@/lib/session';

const selectableRoles = new Set(['founder','commercial','manager','expert','quality']);
const requestSchema=z.object({userId:z.string().min(1).max(100)}).strict();

export async function POST(req:Request) {
  if (process.env.DEMO_PERSONA_SWITCH === 'false') return fail('Changement de persona désactivé', 403);
  const parsed=requestSchema.safeParse(await req.json().catch(()=>null));
  if(!parsed.success)return fail('Persona invalide',400);
  const user = repo.users().find((candidate) => candidate.id === parsed.data.userId);
  if (!user || !selectableRoles.has(user.role)) return fail('Persona indisponible', 403);
  (await cookies()).set('cao_demo_session', createDemoSession(user.id), {httpOnly:true,sameSite:'lax'});
  return ok({userId:user.id});
}
