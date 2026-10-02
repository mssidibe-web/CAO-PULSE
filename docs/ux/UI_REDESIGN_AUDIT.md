# CAO PULSE — Audit UX/UI et plan de refonte premium

**Date :** 2 octobre 2026  
**Périmètre :** démonstrateur CAO PULSE existant, données synthétiques, offline-first.  
**Règle de préservation :** aucune règle métier, permission serveur, gate, donnée synthétique, logique de preuve, comportement offline ou test de sécurité ne sera modifié par la refonte sans ADR explicite.

## 1. Méthode et état audité

Éléments examinés :

- `src/app/globals.css`
- shell, topbar, navigation, `PageHead`, `MetricCard`
- landing, Command Center, Growth, Opportunity Room, Reference Intelligence, Experts, Offer Workspace, Missions, Actions, Cash, Knowledge, Assistant, Security et Trajectoire pilote
- parcours écran capturés à **1366×768** et **1440×900**

Le repository `PYRAMIS-NEXUS` n’a pas été trouvé sous `/Users/moussasidibe/Projects`. Aucune grammaire, donnée ou contenu de ce produit ne sera donc réutilisé. Les principes retenus sont uniquement ceux demandés : orientation, densité maîtrisée, cockpit narratif, hiérarchie de décision et progressive disclosure.

## 2. Forces actuelles

1. **Socle produit crédible.** Les rôles, permissions, gates commerciaux, restrictions de preuve, sources et actions sont déjà visibles dans les écrans.
2. **Langage de statut sémantique.** Les couleurs green / amber / red soutiennent déjà des états métier réels.
3. **Navigation stable.** Le shell à sidebar fixe fournit une orientation initiale claire.
4. **Densité de contenu contrôlée.** Les tableaux affichent utilement les informations comparables : exigences, actions, journal d’audit et pipeline.
5. **Traçabilité présente.** La plateforme ne cache pas les sources, les limites de l’IA ni le caractère synthétique des données.
6. **Base responsive exploitable.** La grille actuelle rend les écrans lisibles à 1366 et 1440 px, sans overflow observé sur la landing.

## 3. Faiblesses observées

### Architecture d’information

- La navigation est plate et comporte trop d’entrées de même niveau.
- L’Assistant reste une destination au lieu d’une capacité contextuelle globale.
- La sélection de persona est visuellement plus saillante que le contexte de travail ou les décisions à prendre.
- La landing actuelle fonctionne comme un écran d’accès technique, non comme un portail exécutif.

### Hiérarchie visuelle

- La plupart des pages commencent par un `PageHead`, puis une succession homogène de cards et de tableaux.
- Le Command Center commence par des KPI de poids visuel identique : il n’exprime pas suffisamment « ce qui requiert votre attention aujourd’hui ».
- Les signaux bloquants, les décisions humaines et les recommandations algorithmiques ne sont pas encore assez distincts.
- Le nombre de cards au même radius, avec la même ombre, affaiblit la hiérarchie et donne une perception MVP.

### Design system

- Les couleurs fonctionnelles existent mais les tokens sont principalement techniques (`--navy`, `--card`, `--line`) plutôt que sémantiques.
- Le radius de 16 px, les ombres étendues et les badges nombreux donnent une esthétique SaaS générique.
- La typographie actuelle est lisible mais sans contraste institutionnel net entre display, titre, metadata et chiffres.
- Les tableaux ne distinguent pas encore suffisamment les données principales, secondaires et numériques.

### Visualisation et interaction

- Les pages critiques reposent majoritairement sur tableaux, listes et KPI, sans visualisation décisionnelle dérivée des fixtures.
- Aucun funnel, anneau de readiness, timeline de cash, mission health ou attention stream ne structure aujourd’hui le récit du cockpit.
- Il n’existe pas de recherche globale / command surface ni de Copilot en drawer lié au contexte actif.
- Les interactions utiles existent (promouvoir un signal, statuts, décisions) mais ne sont pas orchestrées dans un flux d’attention premium.

### Observations captures 1366×768 et 1440×900

- La sidebar sombre est propre mais très vide avant authentification et ne fournit aucune architecture par univers.
- L’essentiel de l’espace écran reste inexploité sur la landing ; le message d’entrée est petit et peu mémorable.
- Le topbar est fonctionnel mais n’exprime ni contexte, ni navigation, ni action globale.
- Aucun overflow ou chevauchement critique n’a été observé sur les deux captures de base.

## 4. Direction artistique retenue

CAO PULSE sera une **surface de pilotage institutionnelle** : précise, calme, dense lorsque nécessaire, mais jamais décorative.

### Palette sémantique

- `--background` : warm off-white pour le canvas
- `--surface`, `--surface-elevated` : couches sobres
- `--navy` : navigation, bandes exécutives et graphiques denses
- `--brand-primary` : CAO Blue pour liens, focus, actions actives
- `--brand-accent` : sable / gold discret pour environnement démo et signaux exécutifs
- `--positive`, `--warning`, `--critical`, `--information` : exclusivement états métier

### Typographie

- UI et titres : IBM Plex Sans si l’asset peut rester local/offline ; sinon fallback système strict.
- Métadonnées, dates et valeurs : IBM Plex Mono ou fallback mono système.
- Titres exécutifs : poids 300–400 ; labels et titres de sections : plus compacts, plus structurés.

### Composition

- Surfaces plates bordées, radius réduit (6–10 px), ombres limitées aux éléments réellement élevés.
- Cards réservées aux objets autonomes ; panels, séparateurs et bandes analytiques pour le reste.
- Information progressive : attention / décision en premier, analyse et détail ensuite.

## 5. Architecture de navigation cible

La navigation sera regroupée sous cinq univers, sans modifier les routes ni les autorisations serveur :

1. **01 — Pilotage** : Command Center
2. **02 — Développement** : Opportunity Radar, Pipeline, Offer Workspace
3. **03 — Capital intellectuel** : Références, Experts, Knowledge
4. **04 — Delivery** : Missions, Actions
5. **05 — Gouvernance** : Cash, Security

`Trajectoire pilote` devient un CTA discret bas de sidebar. `Assistant` quitte la navigation primaire et devient **CAO Copilot** dans la topbar.

## 6. Composants à créer ou faire évoluer

### Shell et primitives

- `primary-nav.tsx` : groupes, état actif `aria-current`, permissions conservées
- `icon.tsx` : icônes SVG locales cohérentes
- `cao-copilot-drawer.tsx` : actions contextuelles, source/fallback visibles
- évolution de `shell.tsx`, `PageHead`, `MetricCard`, tables, badges, panels et focus states

### Data-viz offline et accessibles

- `executive-charts.tsx` : Pipeline Funnel, Requirement Coverage, Decision Score Breakdown
- `proof-readiness-ring.tsx`
- `mission-timeline.tsx`
- `cash-timeline.tsx`
- `attention-stream.tsx`

Chaque composant sera dérivé des repositories/fixtures existants, avec texte équivalent, légende et état non fondé uniquement sur la couleur.

## 7. Refonte par surface

### Landing `/`

Portail exécutif CAO PULSE : hero, quatre moteurs, trust markers Offline ready / Données synthétiques / Human judgment required, CTA d’entrée et choix de rôle discret.

### Command Center `/dashboard`

- Attention Stream cliquable : opportunité à arbitrer, manque de preuve, mission sous vigilance, cash à traiter
- quatre KPI maximum
- Funnel pipeline, proof readiness, health missions, timeline cash
- drill-downs vers objets existants

### Growth `/growth` et `/growth/[id]`

- Radar en cartes compactes
- pipeline visuel/kanban léger complété par table secondaire
- Opportunity Room en deux colonnes : intelligence de décision dans le flux principal ; gates, owner, échéance et décision humaine dans un panneau sticky
- recommandation machine toujours visuellement distincte de la décision humaine

### Références, experts et offers

- portefeuille de références en cards professionnelles et filtres locaux
- chainage explicite TDR → exigence → référence → evidence → expert
- profile cards experts et capacity/expertise matrix dérivée des données disponibles
- Offer Readiness Header, progression segmentée et panneau « What prevents submission today? »

### Missions et cash

- Mission Command Room : health, progression, timeline, PBC, revue, documents et Copilot contextuel
- Cash : quatre métriques, timeline horizontale, distinction READY TO BILL / INVOICED / DUE / OVERDUE

## 8. Stratégie d’exécution

1. **Fondation visuelle :** tokens, typo, shell, nav, topbar et landing.
2. **Cockpit :** Command Center et composants data-viz.
3. **Parcours Développement :** Growth, Opportunity Room, References, Offers.
4. **Parcours Delivery / Gouvernance :** Missions, Cash, Actions, Security.
5. **Copilot global :** drawer contextuel, page Assistant maintenue.
6. **Polish :** responsive, reduced-motion, focus, tables, screenshots et corrections visuelles.

Chaque phase conserve les routes, props, endpoints, contrôles d’accès et fixtures. Les changements d’interface seront commités de manière atomique et testés avant la phase suivante.

## 9. Gates de la refonte

- lint, typecheck, unit tests et E2E existants restent verts ;
- nouveaux tests : nav active, drawer Copilot, landing, dashboard, Growth, Opportunity Room, références, mission et responsive ;
- captures réinspectées à 1366×768 et 1440×900 ;
- aucune donnée ajoutée uniquement pour décorer un graphique ;
- aucune règle métier ou permission modifiée sans ADR ;
- rapport final : `docs/ux/UI_REDESIGN_REPORT.md`.
