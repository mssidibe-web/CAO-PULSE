# Pack validation report

Publication: 1 October 2026.  
Pack: CAO PULSE v1.2.

## Inventory
- Files before manifest generation: 157
- UI pages: 17
- API routes: 22
- Prompt files: 11
- Test/eval files: 12
- JSON output schemas: 4

## Identity-control correction in v1.2
The identity guard was redesigned from a negative keyword rule to a positive assertion model. The pack now proves its own identity through `PROJECT_IDENTITY.json`, package metadata, required CAO PULSE markers, canonical cahier SHA-256, repository root and an allowlisted remote naming rule. This removes self-referential blocking behavior.

## Checks completed during v1.2 generation
- `npm run identity:check`: PASS.
- Canonical cahier SHA-256: VERIFIED.
- Text scan for legacy project-name residues in operational text/code: ZERO MATCHES.
- `npm run audit:pack`: PASS.
- `npm run trace:verify`: PASS (27 requirements).
- `npm run static:imports`: PASS (136 internal imports checked).
- All JSON files parsed successfully.
- All `.mjs` scripts passed `node --check`.
- Source cahier included.
- Public C.A.O diagnostic and research register retained.
- UI, security, API, data and model-evaluation specifications retained from the validated CAO PULSE pack.

## Runtime validation on target machine — 1 October 2026
The following checks were executed against the implemented local repository after dependency installation and security hardening:

| Check | Result |
| --- | --- |
| `npm run identity:check` | PASS |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test` | PASS — 8 files, 18 tests |
| `LIVE_AI=false npm run test:e2e` | PASS — 4/4 Playwright scenarios |
| `npm run build` | PASS — 30 application routes |
| `npm run audit:pack` | PASS |
| `npm run trace:verify` | PASS — 27 requirements |
| `LIVE_AI=false npm run models:eval` | PASS in intentional offline mode — 6 frozen candidate cases listed |
| Demo smoke | PASS with an explicit isolated-demo Founder session: health, dashboard, opportunities and references returned 200 |

## Known limitations and deployment boundary
- The repository is a **synthetic, offline-first demonstrator**. Its repository state and opaque demo sessions are in memory and are resettable; they are not production persistence or authentication.
- Persona switching is disabled by default. It requires both `DEMO_MODE=true` and `DEMO_PERSONA_SWITCH=true`, and must only be enabled in an isolated demonstration environment.
- Live AI remains optional and disabled by default. No provider is presented as "best" and no live-provider evaluation result is claimed until the frozen evaluation suite is run with an explicitly approved provider and data-egress policy.
- Production deployment still requires a real identity provider, persistent data store, session revocation strategy, HTTPS/HSTS enforcement, operational monitoring, and approved data-processing controls before any non-synthetic data is introduced.

This limitation is preserved explicitly rather than presenting unexecuted production controls as successful.
