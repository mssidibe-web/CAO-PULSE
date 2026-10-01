# G10 — Founder-flow repeatability evidence

**Execution date:** 1 October 2026  
**Mode:** `LIVE_AI=false` (deterministic offline demonstration)

## Command

```text
npx playwright test tests/e2e/founder-flow.spec.ts --repeat-each=3
```

## Result

- 3 executions requested
- 3 executions passed
- No retry required
- Total runtime: 8.1 seconds

The founder flow verifies the cockpit, opportunity gates, proof-ready reference, offer matrix, the two mission scenarios, injected-document isolation, and the deterministic Delivery Copilot path.

This demonstrates repeatability on the target laptop in offline mode. It does not certify production authentication, persistence, or live-AI deployment.
