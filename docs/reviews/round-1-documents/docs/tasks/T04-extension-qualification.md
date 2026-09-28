# T04 — Adapter and code-evolution extensions

Status: deferred. Dependencies: relevant T01–T03 gates. This milestone is optional per extension; it is not required to begin bounded configuration improvement.

## Work

- Publish per-adapter guarantees for events, usage, model identity, tool mediation, cancellation, resume, checkpoints and isolation, bound to exact qualified versions.
- Admit additional runtimes only with their conformance and effect-reconciliation evidence. Trusted profiles with weaker isolation must be visible and explicitly authorized.
- Introduce code-change proposals through isolated checkouts and evaluated versioned artifacts. Separate application releases, runner/protocol compatibility changes, storage migrations and protected-control changes.
- Add broader business connectors only with explicit action scope, provider idempotency/reconciliation behavior and compensation limits.

## Required future acceptance evidence

Each extension has a documented rollback or forward-repair path, declared limitations, complete resource accounting and workload regression evidence. Protocol negotiation rejects unsupported peers. Irreversible schema migrations cannot be advertised as automatically reversible. Candidate code cannot install itself, change authority or make its own release decision.
