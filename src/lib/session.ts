import {cookies} from 'next/headers';import {repo} from '@/lib/data/repository';
export async function currentUser(){const c=await cookies();const id=c.get('cao_persona')?.value??'u-founder';return repo.users().find(u=>u.id===id)??repo.users()[0]}
