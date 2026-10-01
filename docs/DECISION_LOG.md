# Decision log

No unresolved deviations at pack publication. Hermes appends dated entries for scope/architecture changes.

## 2026-10-01 — G0 validation adjustments

| Topic | Decision | Impact / rationale | Status |
|---|---|---|---|
| Live-provider linting | Scope `no-explicit-any` exception to the three optional HTTP provider adapters only. | Third-party JSON crosses an untyped network boundary; offline FakeProvider and domain code remain strictly checked. Runtime behavior is unchanged. | Accepted for G0 |
| Pack secret audit | Exclude generated `.next/` output. | Next build manifests contain source-like strings and caused false positives. Source, documentation, fixtures and tracked deliverables remain scanned. | Accepted for G0 |
| Playwright server port | Use isolated port 3100 with `reuseExistingServer: false`. | An unrelated process occupied port 3000. Isolated E2E runs are reproducible and do not attach to another application. | Accepted for G0 |

