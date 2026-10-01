# Model selection - candidate set, not a winner

Publication date of this pack: 30 September 2026.

## Verified current candidates
- **OpenAI GPT-6.1 Sol**: released 29 Sep 2026; OpenAI describes it for complex coding/professional work, with ~1.05M context and Responses API tool calling. Source register OAI-01/OAI-02.
- **Anthropic Claude Sonnet 5.5**: announced 28 Sep 2026; Anthropic positions it as faster/lower-cost than Sonnet 5 and strong on scoped coding/everyday work. Source register ANT-01.
- **Google Gemini 3.8 Flash**: GA 2 Sep 2026; Google describes it for long-horizon software engineering, autonomous agents and complex enterprise workflows, with 1,048,576-token input and structured/function tools. Source register GOO-01/GOO-02.

These are vendor descriptions. They do not establish which is best for C.A.O.

## Runtime recommendation
P0: FakeProvider only.  
P1 live: provider selected by `scripts/model-eval.mjs` on the exact C.A.O tasks.

## Evaluation dimensions
1. factual fidelity to supplied context
2. source/citation discipline
3. abstention when evidence missing
4. gate discipline (never override BLOCKED)
5. proof-readiness semantics
6. structured output validity
7. French professional writing quality
8. latency
9. measured token/cost data where API exposes usage
10. provider contract/data-processing acceptability (separate human review)

No model is enabled for presentation solely because it is newer or scores well on a general coding benchmark.
