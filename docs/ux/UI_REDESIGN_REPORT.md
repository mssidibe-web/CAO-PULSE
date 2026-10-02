# CAO PULSE — UI Redesign Report

**Date :** 2 octobre 2026  
**Portée :** refonte UX/UI du démonstrateur offline-first, sans modification des règles métier, permissions, gates, données synthétiques ni contrôles de preuve.

## Avant / après

| Avant | Après |
|---|---|
| Navigation plate et Assistant comme page primaire | Navigation par 5 univers, action CAO Copilot globale et contextuelle |
| Cockpit à KPI homogènes | Attention Stream, quatre KPI décisionnels et trois visualisations dérivées des fixtures |
| Landing de sélection de persona | Portail exécutif avec proposition de valeur, modules et entrée de démonstration |
| Pipeline essentiellement tabulaire | Opportunity Radar, signal cards, cartes de pipeline et vue comparative |
| Références surtout sous forme de table | Portefeuille de références, proof readiness, evidence ledger et chaîne de rapprochement |
| Missions principalement listées | Mission Control et Mission Command Room avec timeline, vigilance PBC/revue et Copilot |
| Facturation en cartes simples | Cash Signals, quatre statuts, timeline et registre opérationnel |

## Composants créés

- `primary-nav.tsx`, `icon.tsx`, `demo-entry.tsx`
- `cao-copilot-drawer.tsx`
- `executive-charts.tsx` : Pipeline Funnel, Proof Readiness, Cash Timeline
- `proof-readiness-ring.tsx` : ProofReadinessRing, EvidenceLedger
- `mission-timeline.tsx`

## Décisions de design

- Palette sémantique : navy CAO, blue d’interaction, sable discret, statuts réservés au métier.
- Typographie : hiérarchie institutionnelle ; mono réservé aux metadata, KPI et labels.
- Surfaces : radius réduit, ombres limitées, cartes réservées aux objets autonomes.
- Toutes les visualisations sont calculées depuis les données de démonstration existantes ; elles comportent un label et un texte explicatif.
- Les décisions de l’IA restent des brouillons, et l’interface le signale dans le drawer et dans les surfaces Delivery.

## Vérification visuelle

Captures revues localement à **1440×900** :

- Command Center
- Opportunity Radar
- Reference Intelligence
- Mission Command Room

Le Command Center présentait une première anomalie de mise en page sur l’Attention Stream ; les styles de grille ont été rétablis. La capture de contrôle confirme quatre lignes distinctes, lisibles, sans overlap ni clipping critique.

Les tests E2E incluent des smoke checks à **1366×768** et **1440×900**, ainsi qu’un contrôle d’ouverture contextuelle du drawer CAO Copilot.

## Tests réalisés

- `npm run lint` — PASS
- `npm run typecheck` — PASS
- `npm run test` — 9 fichiers / 26 tests PASS
- `LIVE_AI=false npm run test:e2e` — 7 scénarios PASS après ajout du drawer
- contrôle visuel des surfaces principales à 1440×900 — PASS

## Limites restantes

- La démo conserve les fixtures et sessions en mémoire : ce n’est pas une authentification ou persistance de production.
- IBM Plex utilise le fallback système tant qu’un asset local offline n’est pas ajouté.
- Les captures d’audit sont conservées dans le workspace local de validation et ne sont pas publiées comme assets Git.
- Les routes secondaires conservent leurs composants métier existants tout en bénéficiant du shell, des tokens et primitives globales ; une itération ultérieure peut encore approfondir leurs compositions individuelles.
