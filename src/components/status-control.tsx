'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

export function StatusControl({endpoint,id,value,options}:{endpoint:string;id:string;value:string;options:string[]}){
  const router=useRouter();const [error,setError]=useState<string>();const [busy,setBusy]=useState(false);
  return <div><select className="select" value={value} disabled={busy} onChange={async event=>{const status=event.target.value;if(!window.confirm(`Confirmer le statut ${status} ?`))return;setBusy(true);setError(undefined);try{const response=await fetch(`${endpoint}/${id}`,{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify({status})});const body=await response.json();if(!response.ok)throw new Error(body.error?.message??'Mise à jour refusée');router.refresh()}catch(cause){setError(cause instanceof Error?cause.message:'Mise à jour refusée')}finally{setBusy(false)}}}>{options.map(option=><option key={option}>{option}</option>)}</select>{error&&<p role="alert" className="muted">{error}</p>}</div>
}
