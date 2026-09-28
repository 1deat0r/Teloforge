# T04 — Additional adapters and code evolution

Status: PLANNED; not started.
Type: Optional extension.
Phase: 4.
Blocked by: T01–T03 and a separately approved extension scope.

## What and why

Expand supported runtimes or mutation surfaces only after the initial execution and release contracts are established.

## Method

Give each adapter a versioned capability manifest and connector-specific effect/recovery scenarios. For code evolution, bind patch/build provenance to candidate artifacts and review runner/protocol/schema compatibility. State irreversible migration limits and an explicit forward recovery path; do not infer rollback from restoring a binary. Review new public symbols and callers when actual code exists.

## Acceptance and pre-registered decision rule

Register required qualification cases before execution. **DIES** if at least 1 unsupported safety/recovery guarantee is advertised or a critical boundary violation occurs; **WEAKENS** if fewer than 100% of required cases pass or evidence remains missing; **SURVIVES** only at 100% with 0 critical violations and explicit support limits. Any evolving bundle still passes T03's registered outcome and release gates.

Falsifier/null: the proposed adapter or mutation surface cannot meet the guarantees required by its intended execution profile.

Risks: opaque provider sessions, platform-specific sandbox behavior, protocol drift, incompatible state migrations and unrepeatable model state.
