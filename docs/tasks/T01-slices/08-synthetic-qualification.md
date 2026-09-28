# T01-08: Run the end-to-end synthetic acceptance profile

**What to build:** The fixture-only repository-maintenance flow can be exercised end to end with deterministic fake identity, runner, model, repository, and fault outcomes. It produces a reviewable evidence bundle for the specified authority, durability, recovery, artifact, and unknown-outcome cases without contacting external services.

**Blocked by:** T01-01 through T01-07.

**Status:** ready-for-agent (synthetic qualification only).

- [ ] The synthetic cohort covers valid and rejected admission, concurrent budget/resource conflicts, stale authority, idempotent replay, restart recovery, cancellation, and artifact failure.
- [ ] Fault injection at every fake send boundary demonstrates no duplicate create, no successor after unknown/revocation/drift, and correct retained liability.
- [ ] Evidence records the exact source revision, fixture versions, scenario outcomes, missingness, and verification commands; it makes no live-runtime claim.
- [ ] Repeated executions with the same fixture inputs produce the same domain results and stable evidence identity.
- [ ] Any failed case leaves the relevant capability disabled and identifies the next safe recovery action.
