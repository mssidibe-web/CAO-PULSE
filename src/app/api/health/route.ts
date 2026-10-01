import {ok} from '@/lib/api';export async function GET(){return ok({status:'ok',version:'0.1.0',liveAI:process.env.LIVE_AI==='true',mode:process.env.LIVE_AI==='true'?'live':'offline'})}
