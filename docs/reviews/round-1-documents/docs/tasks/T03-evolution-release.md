# T03 — Bounded evolution and independent release

Status: not implemented. Dependency: T02. Start with context selection, skills/prompts, model routing, and verification choices within mandatory floors.

## Work

- Add a separately budgeted evolution worker that proposes immutable candidates and registers hypotheses/falsifiers.
- Implement experiment manifests with numeric floors/margins/effects, cohort weights, sample plan, uncertainty and multiplicity method, missingness rules, budget and rollout rules.
- Implement the trusted evaluator outside candidate sandboxes, with immutable graders/answers, scoped test effects and authenticated evidence receipts.
- Implement source-scope propagation, sealed final datasets and an exposure ledger. Default to one registered comparison per sealed dataset version; exhausted fresh cases hold promotion.
- Apply ordered reject/hold/promote-to-canary/retain decisions from the spec. An exploration archive or apparent Pareto improvement cannot bypass the release gate.
- Implement bounded canaries, atomic bundle assignment, recall, expansion thresholds and rollback. Keep active attempts pinned unless explicit checkpoint migration is supported.

## Required future acceptance evidence

All expected trial identities are accounted for. Tampering with grading fixtures, forged/replayed receipts, evaluator-credential access, test-egress bypass and hidden missing trials produce no accepted forged or unauthorized result. Tenant A's private evidence cannot flow into tenant B's active bundle. Candidate changes invalidate old receipts. Missing or inconclusive evidence retains the incumbent. No learner can rewrite grants or release rules. Canary caps, missing telemetry, harm and deadlines stop or revert admissions as specified, including after restart. Rollback does not claim to undo completed external effects.
