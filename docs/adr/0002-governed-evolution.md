# ADR 0002 — Evolve configurations through independent evidence

Status: adopted design baseline; implementation pending. Date: 28 September 2026.

## Decision

Separate execution authority, candidate generation, evaluation custody and release authority. An immutable intent bounds outcomes and allowed actions. A learner may propose changes; it cannot broaden grants, edit the final evaluator or activate its own release. Enforce this through service identities, data privileges and sandbox boundaries.

Optimize constrained tradeoffs across accepted outcomes, accuracy, quality, latency, cost, tokens and human intervention. Maintain scoped provenance, complete cost/outcome accounting, fresh final evaluation sets, registered statistical decisions and bounded canaries. Missing evidence retains the incumbent.

## Consequences

Learning incurs measurable evaluation and curation costs; it may pause when evidence or expected value is insufficient. Useful specialists can remain available for matching intents. A cheaper candidate can be rejected for a protected quality regression. Code evolution arrives after the release system and receives separate compatibility/migration gates.

This avoids using the same agent's self-reported success as release evidence. It does not eliminate correlated judge errors or guarantee permanent improvement. Five agents approved the architecture; the production evaluator and resulting runtime still require implementation qualification.

Source: [reviewed r2 requirements](../approved/teloforge-design.md).
