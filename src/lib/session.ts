import {cookies} from 'next/headers';
import {repo} from '@/lib/data/repository';
import type {User} from '@/lib/types';

declare global {var __caoPulseSessions:Map<string,string>|undefined}
function sessions(){globalThis.__caoPulseSessions??=new Map<string,string>();return globalThis.__caoPulseSessions}
const anonymousUser:User={id:'u-anonymous',name:'Session non authentifiée',role:'anonymous',missionIds:[],active:false};

export function createDemoSession(userId: string): string {
  const token = crypto.randomUUID();
  sessions().set(token, userId);
  return token;
}
export async function currentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('cao_demo_session')?.value;
  const userId = token ? sessions().get(token) : undefined;
  return repo.users().find((user) => user.id === userId) ?? anonymousUser;
}
