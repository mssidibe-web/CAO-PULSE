'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

export function PromoteSignalControl({id}:{id:string}){
  const router=useRouter();const [busy,setBusy]=useState(false);const [error,setError]=useState<string>();
  async function promote(){
    if(!window.confirm('Promouvoir ce signal en opportunité à qualifier ?'))return;
    setBusy(true);setError(undefined);
    try{
      const response=await fetch(`/api/signals/${id}/promote`,{method:'POST'});const body=await response.json();
      if(!response.ok)throw new Error(body.error?.message??'Promotion refusée');
      router.push(`/growth/${body.data.id}`);router.refresh();
    }catch(cause){setError(cause instanceof Error?cause.message:'Promotion refusée')}finally{setBusy(false)}
  }
  return <div><button className="button" onClick={promote} disabled={busy}>{busy?'Promotion...':'Qualifier ce signal'}</button>{error&&<p role="alert" className="muted">{error}</p>}</div>;
}
