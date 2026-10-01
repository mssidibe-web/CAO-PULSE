# Test Strategy

## Pyramid
- unit: domain rules (permissions, gates, KPIs, citation validation)
- integration: route authorization, input schemas, repository filtering
- canonical AI/knowledge: fixed synthetic corpus and questions
- adversarial: prompt injection, scope bypass, missing source, live provider failure
- E2E: founder flows, reset, offline
- visual/accessibility smoke: all principal routes at founder resolution

## Scientific comparison for models
Run the identical frozen evaluation dataset. Keep prompts and fixtures versioned. Record raw outputs, model identifier/date, provider, parameters, latency and reviewer scores. Do not change the dataset after seeing one model's result without creating a new version for all candidates.

## Acceptance thresholds
See cahier des charges and traceability matrix. Critical security tests require 100%; knowledge usefulness target >=90% is specific to the synthetic validated corpus, not a claim about arbitrary real-world performance.
