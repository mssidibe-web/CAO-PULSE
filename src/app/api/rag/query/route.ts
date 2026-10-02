import {z} from 'zod';import {fail,ok} from '@/lib/api';import {currentUser} from '@/lib/session';import {queryRag} from '@/lib/rag';
const schema=z.object({question:z.string().trim().min(3).max(2000)}).strict();
export async function POST(request:Request){const user=await currentUser();if(user.role==='anonymous')return fail('Session requise',401);const parsed=schema.safeParse(await request.json().catch(()=>null));if(!parsed.success)return fail('Question RAG invalide',400);return ok(queryRag(user,parsed.data.question))}
