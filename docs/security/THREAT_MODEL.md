# Threat model - demo and pilot boundary

Assets: synthetic opportunities, references/evidence, mission data, prompts, API keys (if live), audit logs.
Actors: legitimate personas, accidental misuse, malicious document content, browser tampering.

Critical threats and controls:
1. Broken access control -> server-side mission/role checks and negative tests.
2. Cross-scope retrieval -> filter before retrieval; never ask LLM to authorize.
3. Prompt injection -> documents treated as untrusted text; hostile fixture included.
4. Hallucinated evidence -> proof readiness computed deterministically; model cannot set it.
5. Gate bypass -> deterministic `blockingReasons`; GO route refuses blocked case.
6. Secret leakage -> env only; audit script scans common key patterns.
7. Model outage -> FakeProvider and offline path.
8. External action -> none in P0; no email/submission endpoint.
9. Misleading KPI -> all dashboard metrics derived from records and labelled appropriately.

Before real data: supplier/data residency review, encryption, SSO/MFA, retention, backup, DLP, privacy/legal review, incident process, penetration testing and client-specific confidentiality controls.
