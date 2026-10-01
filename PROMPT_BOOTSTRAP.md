# Bootstrap prompt for Hermes - CAO PULSE v1.2

**MANDATORY FIRST ACTION:** run `npm run identity:check`, print `pwd`, Git root and Git remote. Continue only if the identity report confirms CAO PULSE, Cabinet C.A.O, the expected canonical source hash and an acceptable repository identity. Do not use memory from another Hermes profile as project truth.

You are implementing **CAO PULSE Demo** from this repository. Do not code immediately.

1. Read `PROJECT_IDENTITY.json`, `HERMES.md`, `docs/Cahier_des_charges_source.docx`, `docs/REQUIREMENTS_TRACEABILITY.csv`, all `docs/adr/*.md`, and `docs/research/RESEARCH_METHOD.md` + `SOURCE_REGISTER.csv`.
2. Inspect the existing scaffold and run `npm run audit:pack` and `npm run trace:verify` before edits.
3. Produce/update `IMPLEMENTATION_PLAN.md` with atomic tasks, dependencies, test evidence and explicit phase gates.
4. Preserve the approved product boundaries: synthetic data, offline-first, FakeProvider, server-side RBAC, blocking gates, source-backed outputs, human validation and no external actions.
5. Implement one phase at a time. After every phase run the specified tests and update `TASKS.md` and `docs/DECISION_LOG.md`.
6. Never add a feature silently. If the cahier is ambiguous, record an ADR proposal and choose the safer reversible behavior until approved.
7. Live AI comes only after the deterministic founder flow passes. A live model must pass the supplied C.A.O evaluation suite before being enabled for the presentation.
8. Before release execute: `identity:check -> audit:pack -> trace:verify -> lint -> typecheck -> test -> test:e2e -> demo:smoke -> offline smoke -> visual review`.

First output: a short G0 implementation gap analysis against the current repository and the exact next actions. Do not start broad refactoring until that analysis is complete.
