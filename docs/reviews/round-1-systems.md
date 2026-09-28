# Distributed systems — 1

Agent: `/root/project_systems` · Model: `gpt-6-astra`

The reviewer response below is retained as delivered; line citations refer to its frozen round.

---

**BUILD — project-r1.**

Material blockers: none. The specification is sufficiently consistent to begin staged implementation.

PostgreSQL remains the sole application-state authority; admission binds authority, resources, budget, command result, audit and outbox before dispatch. Supporting contracts and data model agree on that transaction boundary (SPEC.md:215–235; docs/CONTRACTS.md:21–23; docs/DATA_MODEL.md:30–38).

The effect contract correctly separates durable operation intent from external outcome, preserves uncertainty, limits retries to provider-supported reconciliation, and requires environment reconciliation before conflicting resource reuse. Cancellation revokes future authority while distinguishing requested from confirmed termination (SPEC.md:239–245; docs/tasks/T01-intent-execution.md:18–21). Revision changes invalidate subsequent governed actions without silently migrating authority (SPEC.md:151–153).

Budget reservations are atomic, accounting distinguishes estimates from reported/reconciled charges, and opaque-provider limits are explicit (SPEC.md:267; docs/DATA_MODEL.md:24–26). No requirement promises universal exactly-once effects or treats telemetry as authoritative.

**Nonblocking implementation notes:**

1. When completing T01 schemas, explicitly define reservation settlement for cancellation, timed-out calls, unknown effects and delayed charges. Retrying or cancelling an attempt must not accidentally make outstanding liabilities available for new admission. This elaborates SPEC.md:267 and docs/DATA_MODEL.md:12,25–26.
2. Document the broker’s authority-check/send linearization and concurrent dispatch ownership when implementing operation dispatch. Distinguish already-issued requests from requests still prohibited by cancellation or revocation; stable IDs alone do not coordinate two senders. This implements SPEC.md:151–153,239–245 and docs/CONTRACTS.md:19,35–37.

**Evidence:** Read AGENTS.md, all of SPEC.md, docs/CONTRACTS.md, docs/DATA_MODEL.md and T01. Read-only hashing verified every round-1 manifest entry, including the 49,886-byte normative SPEC prefix and supplied SHA-256 `02289c5a01fb759757b121f92a567e25061c564c1bd7960f5a6c24d99bc6c3be`.

**UNVERIFIED:** Runtime behavior, SQL isolation, adapter qualification, crash recovery and actual budget enforcement. No tests, builds, services, edits or delegation performed; no peer reports or historical approval rationales consulted. Approval concerns the staged specification, not runtime qualification.
