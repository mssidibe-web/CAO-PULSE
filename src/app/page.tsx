import {redirect} from 'next/navigation';
import {PageHead} from '@/components/page-head';
import {currentUser} from '@/lib/session';

export default async function Home(){
  const user=await currentUser();
  if(user.role!=='anonymous')redirect(['founder','admin'].includes(user.role)?'/dashboard':'/growth');
  return <><PageHead eyebrow="Accès démo" title="CAO PULSE" sub="Sélectionnez une persona dans la barre supérieure pour ouvrir le démonstrateur. Les données sont synthétiques et le mode IA est déterministe par défaut."/><div className="card" style={{maxWidth:760,marginTop:18}}><div className="section-title" style={{marginTop:0}}>Démarrer la démonstration</div><p className="muted">Utilisez le sélecteur <strong>Persona</strong> en haut à droite. Le Fondateur ouvre le cockpit complet ; les autres personas démontrent les accès par rôle et par mission.</p><div className="source">Aucune donnée réelle, aucun envoi externe et aucune décision professionnelle automatique.</div></div></>;
}
