'use client';
import {useState} from 'react';

type Analysis={text:string;citations:{sourceId:string;title:string;locator:string}[];provider:string;model:string;fallback:boolean;unsupported?:string[]};
export function MissionCopilot({missionId}:{missionId:string}){
  const [analysis,setAnalysis]=useState<Analysis>();const [error,setError]=useState<string>();const [busy,setBusy]=useState(false);
  async function prepare(){
    setBusy(true);setError(undefined);
    try{const response=await fetch(`/api/missions/${missionId}/analyze`,{method:'POST'});const body=await response.json();if(!response.ok)throw new Error(body.error?.message??'Préparation refusée');setAnalysis(body.data)}catch(cause){setError(cause instanceof Error?cause.message:'Préparation refusée')}finally{setBusy(false)}
  }
  return <div className="card" style={{marginTop:18}}><div className="section-title" style={{marginTop:0}}>Delivery Copilot — brouillon sourcé</div><p className="muted">Le Copilot prépare une synthèse ; il ne conclut, ne signe ni ne décide à la place du professionnel.</p><button className="button" onClick={prepare} disabled={busy}>{busy?'Préparation...':'Préparer la synthèse de revue'}</button>{error&&<p role="alert" className="muted">{error}</p>}{analysis&&<div className="source" style={{marginTop:14,whiteSpace:'pre-wrap'}}><p>{analysis.text}</p><p className="muted">{analysis.fallback?'Mode démonstration déterministe':`${analysis.provider} · ${analysis.model}`}</p><ul>{analysis.citations.map(citation=><li key={citation.sourceId}>{citation.title} — {citation.locator}</li>)}</ul>{analysis.unsupported&&analysis.unsupported.length>0&&<p className="muted">Informations insuffisantes : {analysis.unsupported.join(', ')}</p>}</div>}</div>;
}
