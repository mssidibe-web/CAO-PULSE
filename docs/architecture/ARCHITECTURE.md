# Architecture

## Shape
Next.js modular monolith for the demo. Presentation reliability and auditability are favored over microservices.

Layers:
- `app/`: routes, server pages, API handlers
- `components/`: view primitives/client controls
- `lib/domain/`: pure business rules
- `lib/data/`: fixture repository/search; SQLite migration boundary
- `lib/ai/`: provider abstraction and safeguards
- `tests/`: unit/integration/E2E/adversarial/model evals

## Data flow
User -> route/server page -> authorization -> domain/repository -> optional AI adapter -> source-backed output -> human validation -> audit event.

## Core linked objects
Opportunity -> Requirement -> Reference -> Evidence -> Expert -> Action -> Decision.
Mission -> PBC Request -> Document -> Review Point -> Draft -> Human validation.
Command Center derives metrics from those objects; it does not maintain a separate truth store.
