# Critical data dictionary

- `Opportunity.gates.independence`: PASS/WARN/BLOCKED; BLOCKED is non-compensable.
- `Opportunity.scores`: six 0-100 factors; weighted score is prioritization only, not win probability.
- `ReferenceCase.reusable`: contractual/permission flag for commercial reuse.
- `EvidenceItem.status`: verified/missing/expired/restricted.
- `EvidenceItem.reusable`: whether the evidence can be reused in a bid context.
- `proof_ready`: deterministic derived state; never authored by LLM.
- `OfferRequirement.status`: open/matched/validated/not_applicable. `matched` alone may not count as covered.
- `Mission.authorizedUserIds`: demo scope boundary.
- `ReviewPoint.status`: open/resolved/rejected; human-controlled.
- `BillingMilestone.status`: future/ready_to_bill/invoiced/overdue/paid; synthetic operating signal only.
- `AIResponse.fallback`: true when deterministic FakeProvider is used.
