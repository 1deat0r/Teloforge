# T01-02: Admit a bounded attempt with atomic reservations

**What to build:** A current fixture intent can request one bounded attempt and receive a durable admitted or rejected result. The kernel checks the exact revision and grant, action identity, budget, expiry, and exclusive resource claim, then persists the command result, reservations, audit record, and dispatch outbox atomically. Admission alone performs no governed effect.

**Blocked by:** T01-01.

**Status:** ready-for-agent (fixture-only; dispatch disabled).

- [ ] A stale revision, revoked or mismatched grant, changed action identity, expired approval, exhausted budget, or conflicting lease is denied.
- [ ] Concurrent admission cannot overspend a controlled budget or claim the same exclusive resource.
- [ ] Idempotency binds to canonical request arguments and expected revisions; matching replay returns the original result and conflicting reuse is rejected.
- [ ] A transaction failure leaves no partial reservation, audit, command result, or dispatchable outbox entry.
- [ ] The attempt status is visible as admitted or blocked while runner dispatch and external effects remain disabled.
