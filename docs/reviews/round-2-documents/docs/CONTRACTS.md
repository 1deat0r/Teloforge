# API and runner contract boundaries

## Present bootstrap HTTP surface

Control binds to loopback and offers no authenticated product API.

| Request | Status | Meaning |
| --- | --- | --- |
| `GET /healthz` | 200 | Process alive; stage is `scaffold` |
| `GET /readyz` | 503 | Authentication and persistence not implemented |
| `GET /v1/capabilities` | 200 | Every execution capability is false |
| Other GET | 404 | Unknown route |
| Any non-GET | 501 | Mutation and execution unavailable |

These routes do not access tenant data. API authentication, authorization, request validators, quotas, body limits, and audit must precede product mutations. The future tenant identity comes from authenticated membership; a caller-supplied tenant field is never sufficient.

## Future domain commands

T01 will define versioned schemas for intent creation/revision, grant/revocation, plan submission, attempt admission, cancel/reconcile, event ingest, artifact finalization, operation dispatch, and completion. These are planned operations, not existing routes.

All commands bind a tenant-scoped principal, stable command ID, canonical payload digest, expected record revision, and the relevant intent/authority tuple. Duplicate identity with an identical payload returns the recorded result; reuse with a different payload is a conflict. API error responses distinguish invalid input, denied authority, stale revision, exhausted budget, incompatible adapter, and unresolved external outcome. Transport success does not imply work completion.

Admission must commit the attempt, immutable bindings, resource lease generation, reservation, audit and outbox atomically. The storage port is an implementation seam; the trusted kernel still owns the decision. No remote call is made while holding the admission transaction.

## Draft runner envelope

Source: `packages/contracts/schemas/runner-envelope.schema.json`. The Rust crate embeds this JSON text for discoverability. It does not parse or enforce it. TypeScript declarations are handwritten drafts and are not generated from it.

Required envelope fields include protocol version, message identity and kind, tenant, attempt, lease generation, sequence, and payload. Large integer counters use decimal strings to avoid JavaScript precision loss. The payload is deliberately unspecified until the protocol qualification work; it must not be accepted as an arbitrary execution command.

Before T01 transport admission, define:

- Schema version negotiation and compatibility policy, including Paperclip PRP mapping or an explicit incompatibility statement.
- Generated TypeScript/Rust payload types and runtime validation; fixed message sizes and integer bounds.
- Authenticated worker identity, assignment binding, monotonic sequence and lease generation handling.
- Durable spool limits, duplicate/hash-conflict handling, acknowledgement only after database commit, and reconnect semantics.
- Cancellation, heartbeats, output backpressure, artifact finalization and classified failures.
- Shared conformance fixtures and adapter-specific resume/usage/effect limitations.

The scaffold's `0.1.0-draft` marker is not a promise of PRP compatibility or a frozen public API.

## Artifact handoff contract

All workspace collection, upload interpretation and grading must enforce SPEC.md's “Candidate artifact handoff and grading isolation” requirements. Finalization binds the bytes and scope; it never grants trust to the content. Collection after proven candidate termination uses an immutable snapshot, an unprivileged identity, descriptor-rooted no-follow access, allowlisted relative paths, regular single-link files and explicit resource bounds. Reject links, traversal, special files and mount escapes. Uploaded bytes and archives remain opaque until handled inside an isolated credential-free processing environment. Candidate code executes separately from scoring authority; the trusted controller does not parse rich content or execute candidate artifacts. Only its designated evaluator can submit bounded validated observations/results for controller-constructed receipts.
