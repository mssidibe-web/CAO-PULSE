import {z} from 'zod';
import {cookies} from 'next/headers';
import {repo} from '@/lib/data/repository';
import {fail,ok} from '@/lib/api';
import {createDemoSession} from '@/lib/session';

const selectableRoles = new Set(['founder','commercial','manager','expert','quality']);
const requestSchema=z.object({userId:z.string().min(1).max(100)}).strict();
const demoSwitchEnabled=()=>process.env.DEMO_MODE==='true'&&process.env.DEMO_PERSONA_SWITCH==='true';

export async function POST(req:Request) {
  if(!demoSwitchEnabled())return fail('Changement de persona désactivé hors environnement démo isolé',403);
  const parsed=requestSchema.safeParse(await req.json().catch(()=>null));
  if(!parsed.success)return fail('Persona invalide',400);
  const user = repo.users().find((candidate) => candidate.id === parsed.data.userId);
  if (!user || !selectableRoles.has(user.role)) return fail('Persona indisponible', 403);
  (await cookies()).set('cao_demo_session', createDemoSession(user.id), {httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:60*60*8});
  return ok({userId:user.id});
}
