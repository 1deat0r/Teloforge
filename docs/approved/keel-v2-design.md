**Keel v2 — the Paperclip successor architecture I would build**

Design date: 28 September 2026. This is a proposed architecture, not an implemented or benchmarked system. It is intended for a self-hosted product that can grow into a managed service, coordinating coding and business agents across local and remote execution environments. There is no universally best architecture without workload, team, availability, and cost requirements.

The comparison is pinned to Paperclip commit `0f14d261233c545aa6a8a38ec253c498a5130fff`, committed on 27 September 2026 and returned by GitHub's commit listing with a 28 September cutoff. The earlier architecture proposal relied too heavily on introductory documentation. The pinned repository already contains an experimental Rust runner, a language-neutral runner protocol, durable transport, provider qualification, an evaluation package, an MCP governance gateway, and transactional status arbitration. The runner ADR describes its integration as an explicit adapter behind a default-off flag; source availability does not establish general availability or production reliability. [Runner package](https://github.com/paperclipai/paperclip/blob/0f14d261233c545aa6a8a38ec253c498a5130fff/packages/paperclip-runner/README.md) · [Runner ADR](https://github.com/paperclipai/paperclip/blob/0f14d261233c545aa6a8a38ec253c498a5130fff/doc/architecture/paperclip-runner.md)

My recommendation is to consolidate those foundations into one execution contract, make the guarantees visible per adapter, and qualify them with fault scenarios. These are design choices and acceptance criteria, not claims that Paperclip lacks every individual feature below. I would evolve useful upstream code rather than replace it wholesale.

**1. Keep one authoritative work kernel.**

Use a TypeScript modular monolith with domain modules for identity, goals, work, run admission, resource ownership, budgets, approval policy, action receipts, and finalization. PostgreSQL is the authority for their persisted state. API handlers, timers, human decisions, and runner events submit commands to the same domain rules. A pure transition function produces decisions and declared effects; a transaction checks the current version, updates state, and writes audit and outbox records. Commands carry idempotency keys and expected revisions. Historical decisions retain their schema and rule versions.

The organization chart describes responsibility. Explicit work dependencies determine what may run. A work item, a run attempt, a provider session, a turn, and a logical external operation have different identities. One task may have several attempts without erasing the evidence from earlier attempts. Parallel child tasks get their own ownership and resource leases. Workspace or branch conflicts are resolved through resource ownership, even when the task IDs differ.

This direction extends Paperclip's existing transactional status arbiter and durable continuation design. [Status arbitration](https://github.com/paperclipai/paperclip/blob/0f14d261233c545aa6a8a38ec253c498a5130fff/doc/architecture/native-status-arbitration.md) · [Durable continuation scheduling](https://github.com/paperclipai/paperclip/blob/0f14d261233c545aa6a8a38ec253c498a5130fff/doc/architecture/durable-continuation-scheduler.md)

**2. Make durable scheduling a bounded part of that kernel.**

Store dispatch intent, due times, wait conditions, retries, and lease generations in PostgreSQL. Dispatch workers claim eligible rows in short transactions, reserve budget and concurrency, and emit commands. Use database time for leases and indexed due-work queries. Notifications can reduce latency, but periodic reconciliation repairs missed notifications. Fair admission across companies and provider accounts prevents one busy tenant from starving others. Repeated unchanged failures have a retry limit and a visible owner/action to unblock them.

PostgreSQL documents `SKIP LOCKED` for queue consumers; it is useful for claiming work, not a replacement for the application state machine or resource fencing. Do not hold a database transaction open while a model or external API runs. [PostgreSQL locking](https://www.postgresql.org/docs/18/sql-select.html)

I would remove mandatory Temporal from the initial deployment. That reduces an additional service and avoids having to reconcile two independently authoritative run lifecycles. The tradeoff is real: we must maintain a small, explicit scheduler and its failure invariants. If arbitrary user-authored, long-lived business workflows become the core product, I would reconsider Temporal and deliberately assign it ownership of that workflow lifecycle. Simply wrapping an opaque agent process in an Activity does not checkpoint that process or make its external writes safe to repeat. Temporal retries timed-out Activities according to policy. [Temporal Activity execution](https://docs.temporal.io/activity-execution)

**3. Keep Rust at the execution boundary.**

Use a narrow Rust daemon for provider process supervision, bounded streaming, cancellation, workspace setup, and a durable local event spool. Use Paperclip's PRP and conformance machinery as the starting point for the versioned command/event contract. Generate TypeScript and Rust types from a common schema and verify their behavior with shared fixtures.

The daemon connects outward with a scoped bootstrap identity. Persist events before sending them, accept acknowledgements only after the kernel commits them, and deduplicate by source identity and sequence. Reusing an event or command identity with a different payload is an error. A bounded SQLite spool is an implementation option for transport durability; it is not a second authority for task state. Spool exhaustion must surface as a classified failure.

A lease has a monotonically increasing generation. Kernel writes and broker calls reject old generations. On host loss, reconcile the environment before granting a conflicting workspace lease. A database fence alone cannot stop an already-issued external request or a process writing directly to an unfenced filesystem. Isolation, credential revocation, and actual environment cleanup complete that boundary.

**4. Treat external effects as their own durable lifecycle.**

The governed action broker handles model requests and external connectors using kernel-owned policy. Long-lived upstream credentials stay in trusted storage. The runner gets narrowly scoped authority to ask for an operation. Connector credentials are resolved inside the broker, and every request is checked against current grants, resource scope, budget, and lease generation. MCP is one connector protocol; it does not itself provide isolation. Validate token audience and maintain distinct upstream credentials, consistent with MCP's prohibition on token passthrough. [MCP security guidance](https://modelcontextprotocol.io/docs/2025-11-25/tutorials/security/security_best_practices)

Before sending a consequential request, commit a stable logical operation ID, canonical argument digest, target, caller, and policy decision. An approval, when policy requires one, binds that exact action or an explicit bounded scope and has an expiry. Revocation still applies after approval. Routine work within an existing grant proceeds without repeated human prompts.

After sending the request, save the provider receipt. The important crash window is after the provider changes something but before the receipt reaches our database. Preserve `outcome_unknown` in that case. If the provider supports durable idempotency, retry with the same key and respect its retention window. If it supports lookup, reconcile by the recorded operation identity. If neither works, stop that operation and expose the uncertainty for a decision. Never claim universal exactly-once external effects. Deduplication applies to a stable operation identity; it cannot reliably recognize arbitrary semantically equivalent actions invented on a later model turn.

A cancellation first revokes future authority, then requests provider cancellation and reaps the process. The UI distinguishes cancellation requested from cancellation confirmed. A completed external action requires a separate compensating operation if reversal is possible and authorized.

**5. Declare each adapter's real guarantees.**

Each qualified adapter publishes a capability manifest: structured events, cancellation, verified session resume, checkpoint format, model identity reporting, usage reporting, tool mediation, and isolation support. Bind it to tested runtime/protocol versions. Model selection is explicit; failover creates a visible new attempt unless the user enabled an appropriate fallback policy.

An instrumented runtime can expose durable step boundaries. An opaque CLI may support only restarting from a known workspace and recorded task context. Resume it only when the adapter has verified the exact session and checkpoint bindings. Replaying our event log reconstructs control state; it does not reproduce stochastic model reasoning or transfer hidden provider state to another model.

For the strongest managed profile, enforce workspace mounts, compute/time limits, and network egress outside the model's control. Git worktrees isolate edits but are not security sandboxes. Use an established sandbox runtime appropriate to the host and workload. A provider that needs unrestricted credentials or network access belongs to an explicitly trusted profile with weaker advertised guarantees; it cannot silently inherit the managed profile's promises.

**6. Version context, artifacts, memory, and completion evidence.**

Every attempt records a manifest containing the agent and skill revisions, tool-schema digests, workspace base and overlay, selected provider/model, available resolved model metadata, context sources, and budget envelope. New turns append input snapshots. Pinning context does not preserve permissions after revocation, and a model alias does not guarantee immutable model weights.

Store small structured facts and access metadata in PostgreSQL. Store logs, documents, and workspace snapshots in a tenant-scoped artifact directory locally or object storage in a managed deployment. Use checksums and versioned references; content hashes are not access credentials. Finalize an upload before attaching its reference to a completion decision. Clean up unattached uploads separately. A snapshot captures explicit selected files and excludes secrets; it must not upload an evolving directory indiscriminately.

Memory entries carry sources, scope, expiry, and a trust level. Start with document search and PostgreSQL full-text search; add embeddings only when retrieval evaluation justifies them. Evaluators propose skill, routing, and memory changes through the kernel. Promote them under an explicit policy after regression checks. Do not let untrusted retrieved text or an agent's own claim become a privileged instruction automatically.

Completion authority depends on the task contract. Ordinary low-risk work can accept a structured completion claim; consequential work can require independently recorded evidence. A missing proof should lead to a bounded next step or a named decision, not an endless verification loop.

**7. Make cost and quality operational controls.**

Reserve budget atomically before admitting concurrent work. Track estimated, reserved, reported, and reconciled spend separately, including outstanding provider calls and prices used for estimates. Enforce token and step caps where the provider supports them. Opaque subscription-backed runtimes or delayed usage reports cannot promise an exact real-time dollar cap; advertise the available controls truthfully.

Track accepted outcomes, cost per accepted outcome, time to completion, recovery success, duplicate actions, uncertain effects, and human interventions. Use OpenTelemetry for traces and metrics, while authoritative receipts and decisions stay in the durable application records. Telemetry loss must not change whether an action is authorized or a task is complete. [OpenTelemetry signals](https://opentelemetry.io/docs/concepts/signals/)

**Language and deployment choices.**

| Part | Choice | Reason |
| --- | --- | --- |
| Console, API, kernel, dispatcher, broker, connector SDK | TypeScript on Node.js; React for UI | Fast product iteration and shared schemas. Business decisions have one implementation. |
| Runner and host process management | Rust | A narrow memory-safe system boundary with bounded resource handling and a distributable daemon. |
| Durable application state | PostgreSQL and SQL | Transactions, constraints, compare-and-swap updates, leases, and an outbox. |
| Worker transport spool | Embedded SQLite or equivalent durable journal | Restart-safe delivery local to the worker; never the application authority. |
| Evaluation/data workers | TypeScript; Python where its libraries help | Evaluation dependencies stay outside the execution and authorization paths. |

The initial installation is a TypeScript control service, PostgreSQL, a Rust runner, and an artifact directory. The broker and dispatcher are modules of the same application; they can become separate process roles from the same codebase when load or credential isolation warrants it. Evaluation workers can run asynchronously. No extra queue or workflow server is required for this bounded task model.

For a managed service, use API replicas, dispatch workers, managed PostgreSQL with recovery backups, object storage, and isolated runner pools. Give each company one authoritative region initially. Authenticate worker connections, scope every stored reference by tenant, and use a non-owner database role with row policies as defense in depth. Database owners and privileged roles can bypass row security, so merely enabling RLS is insufficient. [PostgreSQL row security](https://www.postgresql.org/docs/18/ddl-rowsecurity.html)

These diagram nodes are logical responsibilities, not nine mandatory microservices. Agent workspace outputs return through the runner/kernel artifact path; evaluation consumes committed event references and proposes updates through the kernel API. Payloads and credentials do not belong in the outbox. The diagram omits those return payloads and telemetry fan-out to keep the main control and action paths readable.

**Acceptance gates before calling this production-ready.**

| Injected condition | Required behavior |
| --- | --- |
| Provider accepts a write; broker dies before saving the receipt | Reconcile using provider support, or preserve `outcome_unknown`; do not blindly resend. |
| Worker loses connectivity and its lease expires | Reject its later writes/actions; verify isolation or cleanup before assigning conflicting resources. |
| Runner restarts with unsent events | Replay the durable spool with stable IDs; duplicate delivery does not duplicate committed state. |
| Approval is revoked or arguments change before execution | Reject consumption of the old approval. |
| Two runs request the remaining budget | Transactional reservations prevent admitting more controlled spend than allowed. |
| Workspace snapshot or upload fails | Preserve partial work and withhold completion that depends on that artifact. |
| A CLI cannot prove session identity during resume | Start a clearly identified recovery attempt after effect reconciliation, or surface a blocker. |
| Repeated recovery sees no new progress or changed condition | Apply bounded retry/backoff and name the next action; do not create an endless model loop. |
| Retrieved content requests a forbidden tool or another tenant's data | Policy, storage authorization, and enforced egress reject it independent of the model. |
| New memory, skill, model, or adapter version regresses outcomes | Block promotion or roll back the version; keep prior run evidence readable. |

These are proposed implementation gates. This delivery validates the architecture artifact and its browser presentation; it does not claim that the proposed runtime has passed these scenarios.
