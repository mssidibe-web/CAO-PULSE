'use client';
import {useState} from 'react';

type Match={referenceId:string;title:string;score:number;relevant:boolean;eligible:boolean;evidencePresent:boolean;proofReady:boolean;blockers:string[]};
export function ReferenceMatchBox(){
  const [query,setQuery]=useState('audit bailleur projet');const [matches,setMatches]=useState<Match[]>();const [error,setError]=useState<string>();const [busy,setBusy]=useState(false);
  async function match(){
    setBusy(true);setError(undefined);
    try{const response=await fetch('/api/references/match',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query,limit:5})});const body=await response.json();if(!response.ok)throw new Error(body.error?.message??'Recherche refusée');setMatches(body.data)}catch(cause){setError(cause instanceof Error?cause.message:'Recherche refusée')}finally{setBusy(false)}
  }
  return <div className="card" style={{marginTop:18}}><div className="section-title" style={{marginTop:0}}>Matching TDR ↔ références ↔ preuves</div><div className="toolbar"><input className="input" aria-label="Critères de recherche de références" value={query} onChange={event=>setQuery(event.target.value)} style={{minWidth:300}}/><button className="button" onClick={match} disabled={busy}>{busy?'Recherche...':'Rechercher'}</button></div>{error&&<p role="alert" className="muted">{error}</p>}{matches&&<div>{matches.length===0?<p className="muted">Aucune référence recevable ne correspond à ces critères.</p>:<div className="grid2">{matches.map(item=><div className="list-item" key={item.referenceId}><strong>{item.title}</strong><p><span className={`badge ${item.proofReady?'green':'amber'}`}>{item.proofReady?'PROOF-READY':'ÉLÉMENT À COMPLÉTER'}</span> <span className="badge blue">score de rapprochement {item.score}</span></p>{item.blockers.length>0&&<div className="muted">{item.blockers.join(' · ')}</div>}</div>)}</div>}</div>}</div>;
}
