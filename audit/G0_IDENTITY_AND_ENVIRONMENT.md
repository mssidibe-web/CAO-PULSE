# CAO PULSE — G0 Identity and Environment Audit

**Date:** 1 October 2026  
**Git SHA:** `827baa8` (initial G0 baseline; amended with this evidence)  
**Status:** VERIFIED

## Identity

| Check | Result |
|---|---|
| Product | CAO PULSE |
| Client | Cabinet C.A.O |
| Working directory | `/Users/moussasidibe/Projects/CAO-PULSE` |
| Git root | `/Users/moussasidibe/Projects/CAO-PULSE` |
| Branch | `cao-pulse-implementation` |
| Git remote | Not configured — acceptable fresh local repository; must be configured before any push/release workflow. |
| Hermes profile | `cao-pulse-dev` created and selected as the sticky profile. |
| Pack | `CAO_PULSE_Hermes_Implementation_Pack_v1.2.zip` |
| Archive SHA-256 | `2e084aeac73350036edf52fc23cb3705f71d66d30ac927f7832ae7318fb0b864` |
| `npm run identity:check` | PASS: CAO PULSE, Cabinet C.A.O, source hash verified. |
| Cross-project scan | PASS: no prohibited SEC DIARRA / SIA / PYRAMIS / CIRA marker in the repository. |

## Environment

| Tool | Version / result |
|---|---|
| Node.js | `v26.7.0` |
| npm | `11.19.0` |
| Install | `npm install`: 396 packages installed; 0 vulnerabilities reported. |
| Production dependency audit | PASS: 0 high/critical vulnerabilities. |

## Executed verification

| Command | Result |
|---|---|
| `npm run identity:check` | PASS |
| `npm run audit:pack` | PASS, including after a production build |
| `npm run trace:verify` | PASS: 27 requirements |
| `npm run deps:check` | PASS; version deltas are recorded below |
| `npm run static:imports` | PASS: 136 internal imports |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test` | PASS: 6 files, 10 tests |
| `npm run build` | PASS: 30 application routes generated |
| `LIVE_AI=false npm run test:e2e` | PASS: founder flow + 1366/1440 visual smoke (3 tests) |
| `LIVE_AI=false npm run models:eval` | PASS in intentional no-live mode: 6 candidate cases listed |
| `LIVE_AI=false npm run demo:reset` | PASS: fixture-backed reset contract reported |
| `DEMO_URL=http://localhost:3101 npm run demo:smoke` | PASS: health, dashboard, opportunities, references all returned HTTP 200 |
| `POST /api/demo/reset` as `u-admin` | PASS: HTTP 200 and `{ "reset": true }` |

## Baseline corrections made during G0

1. Scoped the lint exception for untyped network-provider JSON to the three optional live-provider adapter files; FakeProvider and offline flow remain unchanged.
2. Made the PostCSS export named to remove the baseline ESLint warning.
3. Excluded generated `.next/` output from the pack secret scan. The build manifests produced false positives; source and tracked deliverables remain scanned.
4. Reserved Playwright port `3100` and disabled reuse of an unrelated process already occupying port `3000`; the E2E suite now starts an isolated test server.

## Dependency review

`npm run deps:check` reports newer registry versions for several packages (including Next, React, Playwright, TypeScript, ESLint and Tailwind). No dependency was upgraded in G0: the pack pins its baseline and the installed dependency audit reported no production high/critical vulnerability. Any upgrade requires a dedicated ADR plus a full regression pass.

## Known limitations / risks

- No Git remote is configured. The repository is local-only until a distinct CAO PULSE remote is provisioned; it must never point to another client/project repository.
- Live AI is intentionally not evaluated or enabled. The offline FakeProvider path is the presentation baseline.
- Vitest emits an upstream configuration/deprecation warning under Node 26, while all tests pass. This is non-blocking for G0 but should be addressed in hardening before final release.
- The current automated suite is materially smaller than the target acceptance volume stated in the cahier; passing G0 does not certify founder-release readiness.

## Gate decision

**G0 = GO**  
**PROJECT = CAO PULSE**  
**IDENTITY = VERIFIED**  
**CONTAMINATION = NONE**
