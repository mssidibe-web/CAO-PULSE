import {cookies} from 'next/headers';
import {repo} from '@/lib/data/repository';
import {fail,ok} from '@/lib/api';
import {createDemoSession} from '@/lib/session';

const selectableRoles = new Set(['founder','commercial','manager','expert','quality']);

export async function POST(req:Request) {
  if (process.env.DEMO_PERSONA_SWITCH === 'false') return fail('Changement de persona désactivé', 403);
  const {userId} = await req.json() as {userId?: string};
  const user = repo.users().find((candidate) => candidate.id === userId);
  if (!user || !selectableRoles.has(user.role)) return fail('Persona indisponible', 403);
  (await cookies()).set('cao_demo_session', createDemoSession(user.id), {httpOnly:true,sameSite:'lax'});
  return ok({userId:user.id});
}
