# T01 — Intent and execution foundation

Status: PLANNED; not started.
Type: Implementation.
Phase: 1.
Blocked by: approval of architecture r2 (satisfied); a future implementation instruction.

## What and why

Implement the initial repository-maintenance workload with one qualified runtime, immutable intent/admission bindings, governed action receipts, bounded scheduling and recovery. This establishes the authority on which later learning depends.

## Method

Translate the role matrix and execution foundation into schemas and explicit state transitions. Record current revision and grant checks at admission, dispatch and consequential effects. Preserve outcome-unknown states and resource fencing. Implement no-progress bounds, revocation, artifact durability and event deduplication. Keep merge/deploy outside the initial grant.

## Acceptance and pre-registered decision rule

Before implementation verification, register a finite required scenario roster from the foundation's ten acceptance conditions, plus intent/delegation revision races and revocation-versus-dispatch races. Record expected final states and exact observations for every scenario.

Apply in order: **DIES** if there is at least 1 observed unauthorized action, cross-tenant access, forged accepted state, or duplicate committed effect from replay; **WEAKENS** if evidence is incomplete or fewer than 100% of registered required scenarios meet their expected observations; **SURVIVES** only when 100% pass and the critical violation count is 0. Missing evidence is not a pass. Connector reconciliation may correctly stop at outcome_unknown when its provider lacks lookup/idempotency; an unsupported guarantee is a failure.

Falsifier/null: the stated authority and recovery invariants do not survive their registered fault/race conditions.

Risks: provider-specific cancellation and resume limits, in-flight external effects, workspace fencing and filesystem isolation.
