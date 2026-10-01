# Route map

## UI routes
- `/dashboard` - founder Command Center
- `/growth` - opportunity pipeline
- `/growth/[id]` - opportunity room, score/gates/decision
- `/references` - reference portfolio
- `/references/[id]` - evidence ledger / proof readiness
- `/experts` - expert/capacity directory
- `/knowledge` - source-backed internal search
- `/offers?opportunity=...` - requirement/evidence compliance matrix
- `/missions` - authorized mission list
- `/missions/[id]` - Delivery Copilot workspace
- `/actions` - cross-module action tracker
- `/billing` - synthetic billing/cash milestones
- `/security` - audit events / denied accesses
- `/assistant` - contextual secondary assistant
- `/next-step` - 90-day pilot trajectory
- `/admin/health` - demo health / mode

## API routes
- `GET /api/dashboard`
- `GET /api/opportunities`
- `GET|PATCH /api/opportunities/[id]`
- `POST /api/opportunities/[id]/score`
- `POST /api/opportunities/[id]/decision`
- `GET /api/references`
- `GET /api/references/[id]`
- `POST /api/references/match`
- `GET /api/experts`
- `GET /api/requirements`
- `PATCH /api/requirements/[id]`
- `GET /api/missions`
- `GET /api/missions/[id]`
- `POST /api/missions/[id]/analyze`
- `PATCH /api/review-points/[id]`
- `GET /api/billing`
- `GET /api/search?q=...`
- `POST /api/assistant`
- `GET /api/audit-events`
- `GET /api/health`
- `POST /api/persona`
- `POST /api/demo/reset`
