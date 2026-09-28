# Implementation status

Baseline: S00, 28 September 2026. This inventory describes delivered source, not observed runtime results. No application build, typecheck, automated test, database migration, runner execution, provider call, or benchmark was run during scaffold creation.

Verification update, 29 September 2026: `pnpm verify` passed locally. It built the TypeScript workspaces, typechecked and bundled the console, checked Rust formatting, and checked the Rust workspace. The repository still has no automated unit or integration test suite. This source-level verification does not run or qualify the application, runner, provider integrations, persistence, or agent execution.

Decision update, 29 September 2026: the proposed T01-01 fixture intent API received three independent five-seat review rounds and ended in HOLD, with unresolved security and evaluation blockers. No product implementation was made. The control service remains scaffold-only, `/readyz` remains unavailable, and T01-02 through T01-08 are blocked by the T01-01 dependency chain. See `docs/decisions/2026-09-29-t01-01-implementation-hold.md`.

## What exists

| Path | Delivered source | Remaining work |
| --- | --- | --- |
| `apps/control` | Loopback HTTP bootstrap, JSON status endpoints, shutdown handlers | Authentication, domain API, persistence, dispatcher and broker wiring |
| `apps/console` | Static React status page with disabled capability list | Intent editor, evidence/receipt views, live authorized API integration |
| `packages/contracts` | Draft domain types and JSON runner envelope | Runtime validators, complete schemas, compatibility fixtures, code generation |
| `packages/kernel` | Admission port and always-deny implementation | Intent/planner domain modules, state transitions, scheduler, atomic admission/finalization |
| `packages/policy` | Authorization port and always-deny implementation | Principal authentication, grants, delegation, revocation, receipt binding |
| `packages/db` | Repository port and migration directory documentation | SQL schema, migration runner, transactions, row policies and recovery |
| `packages/broker` | Operation request/receipt and reconciliation ports | Credential custody, providers, idempotency and uncertain-outcome reconciliation |
| `packages/adapters` | Capability shape and empty qualified registry | First adapter and per-version qualification evidence |
| `packages/artifacts` | Upload/finalize/read port | Scoped storage, checksums, access control, cleanup and retention |
| `packages/evaluation` | Trial and receipt interfaces | Independent evaluator, grading, accounting and evidence custody |
| `packages/evolution` | Candidate proposal interface | Bounded opportunity selection and candidate generation |
| `packages/registry` | Registry/release ports and HOLD decision | Immutable bundle store, evidence gate, atomic assignments, canary controller |
| `packages/observability` | Structured bootstrap metadata logging | OTel traces/metrics and outcome accounting; durable audit lives elsewhere |
| `workers/evaluator` | Disabled process entry point that exits | Separately authenticated controller, sandbox supervision, quotas |
| `workers/evolution-lab` | Disabled process entry point that exits | Authorized experiments, protected-data separation and budgets |
| `crates/protocol` | Draft version constant and embedded schema text | Parsing, generated types, negotiation, conformance fixtures |
| `crates/runner` | CLI help/version/capabilities | Supervision, durable spool, isolation, cancellation, transport and fencing |
| `infra/compose.yaml` | Optional local PostgreSQL configuration | Application connection, migrations, deployment backup/recovery setup |

The `IntentRevision` and `BundleManifest` types are intentionally incomplete draft subsets of the spec. They are not safe storage or network admission contracts. Required budgets, trigger semantics, complete provenance, validators, and authorization bindings must be implemented before use.

## Current behavior by design

- No adapter is qualified; no code path starts an agent process.
- Admission and policy always deny. Promotion stays on hold.
- `/healthz` reports process liveness; `/readyz` reports unavailable readiness with HTTP 503.
- The UI lists compile-time scaffold capabilities; it does not query or authenticate to the control service.
- The service does not access PostgreSQL or create an artifact directory.
- Worker stubs print that they are disabled and exit; they do not consume queues or run continuous loops.

## Evidence boundary

The original design board and Archify presentation evidence are archived under `docs/approved/`. They establish review of a specific design and diagram. They provide no test results for this scaffold. Dependency lockfiles record resolution, not runtime compatibility or security qualification.
