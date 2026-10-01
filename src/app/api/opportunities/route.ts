import {ok} from '@/lib/api';import {repo} from '@/lib/data/repository';export async function GET(){return ok(repo.opportunities())}
