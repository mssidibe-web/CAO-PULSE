import {cookies} from 'next/headers';
import {repo} from '@/lib/data/repository';
import type {User} from '@/lib/types';

type DemoSession={userId:string;expiresAt:number};
declare global {var __caoPulseSessions:Map<string,DemoSession>|undefined}
function sessions(){globalThis.__caoPulseSessions??=new Map<string,DemoSession>();return globalThis.__caoPulseSessions}
const anonymousUser:User={id:'u-anonymous',name:'Session non authentifiée',role:'anonymous',missionIds:[],active:false};
const sessionTtlMs=8*60*60*1000;

export function createDemoSession(userId: string): string {
  const token = crypto.randomUUID();
  sessions().set(token,{userId,expiresAt:Date.now()+sessionTtlMs});
  return token;
}
export async function currentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('cao_demo_session')?.value;
  const session = token ? sessions().get(token) : undefined;
  if(session&&session.expiresAt<=Date.now()){sessions().delete(token as string);return anonymousUser}
  return repo.users().find((user) => user.id === session?.userId) ?? anonymousUser;
}
