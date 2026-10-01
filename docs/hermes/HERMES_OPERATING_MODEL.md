# Hermes operating model

Use Hermes as implementation orchestrator, not runtime dependency. `HERMES.md` contains project-critical rules because current Hermes docs identify `.hermes.md/HERMES.md` as highest-priority project context. Keep a dedicated profile and do not share one profile between concurrent agents.

Recommended phases: architecture review -> shell -> domain/RBAC -> Growth -> References/Offers -> Command Center -> Delivery -> offline assistant -> optional live AI -> hardening.
