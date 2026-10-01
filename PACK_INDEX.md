# CAO PULSE pack index

## Identity / control
`PROJECT_IDENTITY.json`, `START_HERE_HERMES.md`, `HERMES.md`, `PROMPT_BOOTSTRAP.md`, `IMPLEMENTATION_PLAN.md`, `DEFINITION_OF_DONE.md`, `TASKS.md`.

`npm run identity:check` is the first gate. It validates positive CAO PULSE identity assertions, including the canonical cahier hash and repository identity. Design rationale: `docs/security/PROJECT_IDENTITY_GUARD.md`.

## Research / benchmark
`docs/research/`: public C.A.O diagnostic, source register, benchmark patterns, model matrix/selection, dependency protocol, research method.

## Product / architecture
`docs/Cahier_des_charges_source.docx`, traceability CSV, ADRs, route map, OpenAPI, data dictionary, threat model, test strategy, UI system, screen specs, founder runbook.

## Frontend
`src/app/` contains executive pages and API routes; `src/components/` contains reusable presentation/interaction components; `src/app/globals.css` defines the design system.

## Domain
`src/lib/domain/`: scoring/gates, proof readiness, requirement coverage, permissions, KPIs.

## Data
`src/lib/data/`: stable synthetic fixtures, mutable demo repository, role-filtered search. `database/schema.sql` is the later SQLite target.

## AI
`src/lib/ai/`: deterministic FakeProvider plus provider adapters for OpenAI Responses, Anthropic and Gemini; prompts are under `prompts/`; structured output contracts are under `schemas/`.

## QA / scripts
`scripts/`: positive identity gate, pack audit, import validation, traceability validation, dependency check, model evaluation, smoke/reset/preflight. `tests/`: unit, integration, E2E, adversarial and model eval cases.
