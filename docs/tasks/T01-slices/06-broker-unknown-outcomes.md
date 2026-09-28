# T01-06: Exercise ordered effects and unknown outcomes through fake adapters

**What to build:** The broker processes a small synthetic operation graph through fake model and repository adapters, checking current authority and stable logical operation identity before each send. The operator can distinguish applied, not-applied, and unknown outcomes. This is a control-plane proof path; live credentials and network adapters stay disabled.

**Blocked by:** T01-05.

**Status:** ready-for-agent (fake adapters only).

- [ ] Each send is durably claimed with its request binding, authority check, budget reservation, audit entry, and outbox state before dispatch.
- [ ] A successor is eligible only after its predecessor is verified applied and current authority, digest, expected state, and freeze checks still hold.
- [ ] An uncertain send is recorded as unknown, retains its liability, blocks dependent/repeating writes, and is reconciled read-only without a blind retry.
- [ ] Stop, revocation, budget exhaustion, drift, or freeze loss blocks unclaimed successors; partial application is never reported as successful completion.
- [ ] Fake adapter traces cannot be confused with provider/GitHub qualification evidence; no secrets or request payloads are copied into logs or outbox records.
