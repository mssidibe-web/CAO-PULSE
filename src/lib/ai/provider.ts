import type {AIRequest,AIResponse} from '@/lib/types';
export interface AIProvider {name:string;generate(req:AIRequest):Promise<AIResponse>}
