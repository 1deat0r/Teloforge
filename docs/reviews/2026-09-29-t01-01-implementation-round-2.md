# T01-01 implementation proposal — round 2 review

- Reviewed proposal SHA-256: `5bd9137a57c2edf73527605b7bbeece1a0af0ce3badad1c623a5cd7eb261d340`
- Source commit: `14cc46862ad337518dbe072e0fb2a16a3619cf44`
- Result: four BUILD, one CONDITIONAL; implementation remains closed.
- All five seats verified the proposal digest and the same 12 pinned source hashes. Reviewers did not inspect peer reasoning before submitting. No reviewer modified the worktree.

## Verdicts

| Seat | Agent | Configured model | Verdict | Summary |
| --- | --- | --- | --- | --- |
| Domain and distributed systems | `t0101_domain_20260929` | GPT-6 Astra | BUILD | Command identity, replay-before-stale behavior, atomic persistence, tenant-scoped keys, and T01-02 composition are sufficiently bounded. |
| Adversarial authority and security | `t0101_security_20260929` | GPT-5.6 Sol | CONDITIONAL | Recheck the fixture marker on every actual request connection, including reads, before tenant queries; define a closed runtime database role privilege allowlist and test role/function escalation paths. |
| Evaluation and evidence | `t0101_eval_20260929` | GPT-6 Sol | BUILD | Schema, observable error/replay/state behavior, security boundaries, and required evidence are concrete; runtime remains unqualified pending verification. |
| Product and operability | `t0101_product_20260929` | GPT-5.6 Terra | BUILD | Local fixture workflow, lifecycle, response markers, and disabled live capabilities are clear. |
| Fresh cold integration | `t0101_cold_20260929` | GPT-6 Luna | BUILD | Exact hashes match; prior schema, idempotency, lifecycle, atomicity, and downstream T01-02 gaps are closed. |

## Required closure for round 3

The proposal is being amended to make the security checks executable and closed-set:

1. Validate the migration-owned environment marker on the same checked-out connection at the start of every request transaction, including GETs, before setting tenant context or issuing tenant queries. On mismatch, roll back, discard the connection, and take the fixture API unavailable.
2. Require an exact runtime-role attribute set, no membership in any other role (including indirect and SET-only paths), no ownership, and closed effective database/schema/table/sequence/routine privileges. Explicitly include `PUBLIC` grants in effective checks; allow only the named built-ins used for transaction-local tenant context.
3. Add evidence for marker drift after startup, read and mutation routes on stale/replacement connections, unexpected memberships, PUBLIC function grants, and the exact baseline privilege envelope.

Only a fresh five-seat BUILD on the revised proposal digest authorizes implementation.
