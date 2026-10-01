'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

export function DecisionControls({id}:{id:string}){
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState<string>();
  const router=useRouter();
  async function act(decision:string){
    const rationale=window.prompt(`Justification de la décision ${decision} :`);
    if(!rationale?.trim())return;
    if(!window.confirm(`Confirmer ${decision} pour cette opportunité avec la justification fournie ?`))return;
    setBusy(true);setError(undefined);
    try{const response=await fetch(`/api/opportunities/${id}/decision`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({decision,rationale})});const body=await response.json();if(!response.ok)throw new Error(body.error?.message??'Décision refusée');router.refresh()}catch(cause){setError(cause instanceof Error?cause.message:'Décision refusée')}finally{setBusy(false)}
  }
  return <div><div className="toolbar"><button className="button" disabled={busy} onClick={()=>act('GO')}>Confirmer GO</button><button className="button secondary" disabled={busy} onClick={()=>act('GO_CONDITIONAL')}>GO sous conditions</button><button className="button secondary" disabled={busy} onClick={()=>act('HOLD')}>Mettre en attente</button><button className="button danger" disabled={busy} onClick={()=>act('NO_GO')}>Confirmer NO GO</button></div>{error&&<p role="alert" className="muted">{error}</p>}</div>
}
