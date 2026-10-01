# CAO PULSE - Hermes Implementation Pack

Version: 1.2 (1 October 2026)  
Owner: 3P IMPACT / Moussa SIDIBE  
Status: implementation-ready demonstration pack; not a production certification

> **Project identity gate:** before any Hermes action, run `npm run identity:check`. The gate validates only positive CAO PULSE identity markers: project metadata, canonical source hash, package identity, repository root and, when configured, the Git remote slug.

## Purpose
This repository operationalizes the approved CAO PULSE cahier des charges and the dated public diagnostic in `docs/research/CAO_PUBLIC_DIAGNOSTIC_2026.md` into an auditable, runnable demonstration platform for Cabinet C.A.O. The demo is built around four business axes:

1. **CAO Growth Engine** - opportunity radar, qualification, Bid/No-Bid, offer workspace and lessons learned.
2. **CAO Reference Intelligence** - references, experts, evidence readiness and requirement-to-proof matching.
3. **CAO Command Center** - founder cockpit for pipeline, deadlines, missions, capacity, billing and cash signals.
4. **CAO Delivery Copilot** - controlled assistance for mission preparation, evidence requests, review points and draft summaries.

The demo MUST work with synthetic data and without Internet access. Live AI is optional and feature-flagged.

## Scientific and auditable method
Every material statement or choice is classified:
- **VERIFIED EXTERNAL FACT**: backed by an official/primary source in `docs/research/SOURCE_REGISTER.csv`.
- **VENDOR CLAIM**: accurately attributed to the vendor; never treated as independent evidence.
- **PROJECT HYPOTHESIS**: derived from the C.A.O diagnostic and explicitly testable.
- **DESIGN DECISION**: architecture/UX choice recorded in `docs/adr/`.
- **IMPLEMENTED**: present in code and traceable to `docs/REQUIREMENTS_TRACEABILITY.csv`.

Do not convert vendor marketing into performance claims. Do not invent benchmark scores. Model choice must be based on the supplied evaluation harness and representative C.A.O tasks.

## Hermes start
1. Extract the pack into a dedicated directory whose name clearly identifies CAO PULSE.
2. Use a dedicated Hermes profile (`cao-pulse-dev`).
3. Start Hermes from this repository root so `HERMES.md` is loaded.
4. Run `npm run identity:check` and archive the output in G0 evidence.
5. Paste `PROMPT_BOOTSTRAP.md`.
6. Hermes reads the cahier, traceability matrix, ADRs and research register before coding.
7. Hermes implements phases in `IMPLEMENTATION_PLAN.md`, running the required tests after every gate.

## Local demo start
```bash
cp .env.example .env.local
npm install
npm run dev
```
Open `http://localhost:3000`.

Before a founder presentation:
```bash
npm run identity:check
npm run audit:pack
npm run trace:verify
npm run demo:smoke
bash scripts/preflight-demo.sh
```

## Runtime boundary
Hermes builds and tests the application. **Hermes is not required at presentation runtime.** The founder flow must run standalone, offline, with the deterministic FakeProvider.

## Production boundary
This pack contains no real C.A.O client data, credentials, non-public opportunities or confidential engagement evidence. Connecting real systems requires a separate pilot decision, data classification, supplier review, legal/compliance review, SSO/MFA, retention policy and security testing.
