# T03 — Evaluated improvement and release

Status: PLANNED; not started.
Type: Implementation and controlled experiment.
Phase: 3.
Blocked by: T01 and T02; a future implementation instruction.

## What and why

Implement bounded context/skill/routing candidate generation, independent evaluation, lineage, registry eligibility, canary decisions and rollback. Code evolution remains later scope.

## Method

Use the exact r2 controls for derivation, candidate isolation, authenticated receipts and sealed-gate exposure. Before any final evaluation, register numeric quality floors, non-inferiority margins, minimum useful effect, sample/repeat counts, allowed looks, uncertainty/multiplicity method, budgets, missingness handling and canary thresholds from T02 evidence. Missing manifest fields block admission. Include revocation races, rollout restart and candidate attempts to compromise grading or cross tenant boundaries.

## Acceptance and pre-registered decision rule

For infrastructure qualification: **DIES** if at least 1 unauthorized or forged result is accepted; **WEAKENS** if required scenario evidence is missing or fewer than 100% of registered required checks pass; **SURVIVES** with 100% passing checks and 0 critical violations. For any candidate release, apply r2's ordered REJECT/DIES, HOLD/WEAKENS, PROMOTE TO CANARY/SURVIVES, RETAIN/WEAKENS branches using its registered numeric values. Infrastructure qualification is not evidence of a candidate's improvement.

Falsifier/null: no candidate demonstrates the registered useful improvement while meeting required protected-metric margins and cost constraints. Retaining the incumbent is a valid outcome.

Risks: adaptive overfitting, evaluator compromise, insufficient fresh cases, inadequate statistical power, improvement spend exceeding realized benefit.
