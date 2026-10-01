import type {AIRequest,AIResponse} from '@/lib/types';import type {AIProvider} from './provider';
const canned:Record<AIRequest['task'],string>={
 growth_note:'Décision de démonstration : vérifier d’abord les gates, puis la couverture des exigences et la disponibilité des preuves. Le score n’est pas une probabilité de gain.',
 reference_match:'Le matching retient uniquement les références compatibles avec l’exigence et distingue pertinence, réutilisabilité et preuve vérifiée. Les éléments manquants sont signalés.',
 mission_review:'Brouillon de revue : synthétiser les pièces disponibles, lister les manquants et rattacher chaque point à sa source. Aucune conclusion professionnelle finale n’est produite.',
 command_summary:'Priorités : sécuriser les offres proches de l’échéance, fermer les lacunes de preuve, traiter les jalons de facturation et résoudre les points de revue majeurs.',
 assistant:'Je réponds uniquement à partir des données de démonstration autorisées. Si une information manque, je l’indique au lieu de la compléter.'};
export class FakeProvider implements AIProvider{name='fake';async generate(req:AIRequest):Promise<AIResponse>{return {text:canned[req.task],citations:req.citations??[],provider:'fake',model:'deterministic-fixture-v1',fallback:true}}}
