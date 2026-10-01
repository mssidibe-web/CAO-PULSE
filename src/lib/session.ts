import {cookies} from 'next/headers';
import {repo} from '@/lib/data/repository';

const sessions = new Map<string, string>();
const defaultUserId = 'u-founder';

export function createDemoSession(userId: string): string {
  const token = crypto.randomUUID();
  sessions.set(token, userId);
  return token;
}
export async function currentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('cao_demo_session')?.value;
  const userId = token ? sessions.get(token) : undefined;
  return repo.users().find((user) => user.id === userId) ?? repo.users().find((user) => user.id === defaultUserId)!;
}
