# Runner and protocol

## Ownership

The Rust runner is a narrow host-execution boundary. The TypeScript control plane remains authoritative. The versioned protocol carries typed commands and events; any local spool exists for restart-safe transport only and never becomes a second task-state store.

## Code

`crates/protocol` holds protocol definitions and `crates/runner` is the host process boundary.

## Boundaries

- Restrict the runner to bounded supervision, streaming, cancellation, workspace setup, and durable event transport.
- Fence commands and events by identity, sequence, and lease generation. Conflicting payloads for a reused identity are errors.
- Do not put long-lived provider credentials in the runner or candidate workspace.
- A worktree is not a security sandbox. Fail closed when required isolation, resource limits, process-tree cleanup, or snapshot proof is unavailable.
- Reconcile external effects separately from killing a process; stopping execution does not prove an external write was absent.

The runner is not qualified and currently exposes only help/version/capability output. Consult the current T01 task and `SPEC.md` before changing this boundary.
