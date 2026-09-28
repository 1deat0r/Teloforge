# T01-01: Persist and inspect a validated intent revision

**What to build:** An operator can create and revise a finite intent in a synthetic tenant, then inspect its current revision and lifecycle state. The request is runtime-validated, recorded with its synthetic principal and audit history, and kept separate from work admission. Fixture identity is available only in an isolated development/test profile; no unauthenticated production path is introduced.

**Blocked by:** Implementation decision HOLD; see [the board disposition](../../decisions/2026-09-29-t01-01-implementation-hold.md).

**Status:** held after three independent board rounds; fixture API remains unimplemented.

- [ ] Invalid, incomplete, oversized, or unknown intent fields are rejected before domain state changes.
- [ ] Creation and revision use expected-revision checks and retain actor, revision, and audit provenance durably.
- [ ] Pause and cancellation are distinct lifecycle operations; neither implies that an attempt or external effect has stopped.
- [ ] Fixture identity cannot authenticate through a production configuration, and live API readiness remains denied without qualified authentication.
- [ ] The operator surface shows the current revision and lifecycle state without claiming execution capability.
