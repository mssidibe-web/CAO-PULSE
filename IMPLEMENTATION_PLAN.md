# CAO PULSE - Implementation Plan

## G0 - Project identity, evidence freeze and repository health
Deliver: positive project identity report, canonical source hash verification, Git root/remote evidence, dependency review, source register, package audit, build metadata and clean baseline.
Gate: `npm run identity:check` passes; product/client/source identity is verified; no unresolved critical dependency/security issue; source register classifications complete.

## G1 - Executive shell and navigation
Deliver: CAO PULSE design tokens, sidebar/topbar, demo banner, persona switch, error/forbidden/loading states, all target routes.
Gate: visual smoke at 1366x768 + 1440x900.

## G2 - Domain, fixtures, permissions and reset
Deliver: stable synthetic dataset, repository, scoring gates, proof readiness, permissions, audit events, deterministic reset.
Gate: permissions, gates and proof-readiness unit tests 100% pass.

## G3 - Growth Engine
Deliver: pipeline, opportunity room, score decomposition, human Bid/No-Bid, actions, deadlines, loss reasons.
Gate: eight commercial cases including blocked independence and unknown funding.

## G4 - Reference Intelligence + Offer Workspace
Deliver: references, experts, evidence ledger, proof-readiness score, TDR requirement matrix, requirement-to-proof matching, stale/missing evidence flags.
Gate: no proof-ready label without valid evidence; mandatory coverage is traceable.

## G5 - Command Center
Deliver: founder cockpit, underlying drill-downs, pipeline, offer deadlines, mission status, capacity proxy, billing milestones/cash alerts.
Gate: every metric traces to fixture records; changing a record changes KPI.

## G6 - Delivery Copilot
Deliver: mission workspace, PBC/evidence requests, document list, review points, source-backed draft summary, accept/reject workflow.
Gate: no autonomous professional conclusion; two complete mission scenarios.

## G7 - Assistant + offline AI
Deliver: context-aware assistant, FakeProvider, confirmation for mutations, citation/abstention policy.
Gate: founder flow fully works with `LIVE_AI=false`.

## G8 - Optional live AI and model evaluation
Deliver: adapters for OpenAI Responses, Anthropic Messages, Gemini GenerateContent/Interactions-compatible pattern; model evaluation script; raw eval report.
Gate: candidate chosen only on recorded task results and data-processing review.

## G9 - Security/adversarial hardening
Deliver: scope tests, prompt-injection fixtures, parameter tampering tests, audit logs, provider kill switch.
Gate: all critical adversarial cases pass.

## G10 - Founder demo release
Deliver: runbook, seed/reset, preflight, screenshots optional, archive manifest/hash, validation report.
Gate: 3 consecutive founder-flow runs on target laptop; one complete offline run.
