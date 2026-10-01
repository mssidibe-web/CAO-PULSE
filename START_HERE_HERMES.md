# START HERE - Hermes / CAO PULSE v1.2

## Project identity first
Before Hermes reads any product context or writes any file, run:

```bash
npm run identity:check
```

Expected output contains:
- `CAO PULSE PROJECT IDENTITY CHECK: OK`
- `product=CAO PULSE`
- `client=Cabinet C.A.O`
- `profile_expected=cao-pulse-dev`
- `source_hash=VERIFIED`

If the check fails, STOP and correct the workspace identity before continuing.

## Required clean-start procedure
1. Extract this pack into a new empty directory named `CAO-PULSE` or `CAO-PULSE-DEMO`.
2. Do not extract it inside another repository.
3. `cd` to the pack root.
4. Run `npm run identity:check`.
5. If using Git, initialize a new repository only after the identity check.
6. Use the dedicated Hermes profile `cao-pulse-dev`.
7. Start Hermes from this exact repository root so `HERMES.md` is the active project context.
8. Paste `PROMPT_BOOTSTRAP.md` as the first task message.
9. Do not enable live AI before the offline founder flow passes.
10. G0 must run installation/build/tests in the actual target environment.

## Mandatory preflight evidence
Hermes must print and record before coding:
```bash
pwd
git rev-parse --show-toplevel 2>/dev/null || true
git remote -v 2>/dev/null || true
npm run identity:check
head -40 HERMES.md
head -40 README.md
```
The evidence must consistently identify CAO PULSE and Cabinet C.A.O.

Critical files:
- Project identity: `PROJECT_IDENTITY.json`
- Business source: `docs/Cahier_des_charges_source.docx`
- Atomic requirements: `docs/REQUIREMENTS_TRACEABILITY.csv`
- Research evidence: `docs/research/SOURCE_REGISTER.csv`
- Public C.A.O diagnostic: `docs/research/CAO_PUBLIC_DIAGNOSTIC_2026.md`
- Architecture: `docs/architecture/ARCHITECTURE.md`
- UI: `docs/ux/UI_SYSTEM.md` + `docs/ux/SCREEN_SPEC.md`
- Security: `docs/security/THREAT_MODEL.md`
- Model evaluation: `tests/model-evals/cases.json` + `scripts/model-eval.mjs`
- Founder runbook: `docs/ux/FOUNDER_DEMO_RUNBOOK.md`
