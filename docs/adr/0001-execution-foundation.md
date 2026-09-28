# ADR 0001 — One durable work authority with a narrow Rust runner

Status: adopted design baseline; implementation pending. Date: 28 September 2026.

## Decision

Use a TypeScript modular monolith for the control plane, React for the console, PostgreSQL for authoritative records, and Rust for process supervision and transport at the runner boundary. Keep dispatcher and broker as modules first; split process roles when operational isolation or measured load requires it. Use scoped file artifacts locally and object storage for a managed deployment.

The kernel owns intent and work transitions. Transactions bind authority, budget, resources, audit and outbox before dispatch. External operations have a distinct durable lifecycle with reconciliation and an explicit unknown state. Each adapter advertises qualified guarantees.

## Alternatives and consequences

- A Rust-only product would unify the toolchain but slow product/API iteration and widen the low-level implementation surface. Reserve it for the narrow boundary where it helps.
- A TypeScript-only runner is simpler initially, but Rust suits a bounded standalone supervisor. The cost is a cross-language protocol requiring schemas and conformance work.
- Mandatory Temporal would add lifecycle ownership and an operational dependency. PostgreSQL scheduling is adequate for the bounded initial task model, but requires maintaining explicit failure/recovery invariants. Reconsider if arbitrary durable user workflows become the core product.
- Microservices, a separate queue and a graph/vector database add operations before the initial workload justifies them. PostgreSQL transactions and search are the baseline.

This decision is inherited from the [reviewed foundation](../approved/keel-v2-design.md). It does not establish measured performance advantages. See [ADR 0002](0002-governed-evolution.md) for improvement boundaries.
