# Control plane and governed effects

## Ownership

The TypeScript kernel and PostgreSQL own authoritative application state. The control app admits authenticated intent and drives explicit domain state. Policy checks current authority; the broker is the only path for governed model and connector effects. Durable admission, budgets, leases, audit, commands, and outbox state follow the atomicity requirements in `SPEC.md`.

## Code

`apps/control` is currently a loopback HTTP bootstrap. The related shared packages are `contracts`, `kernel`, `policy`, `db`, `broker`, `artifacts`, `adapters`, and `observability`.

## Boundaries

- Validate untrusted inputs at runtime before domain admission; TypeScript declarations alone are not validation.
- Persist authority, budget reservation, lease, audit, and outbox state before effects.
- Recheck current grant and stable operation identity at the broker. Preserve unknown external outcomes; never blindly retry uncertain writes.
- Treat database state as authoritative. Telemetry, artifacts, runner spools, and console state are not alternate authorities.
- Carry tenant scope and restrictive provenance through stored and derived data.
- Provider credentials and private prompts do not enter runner environments, source, logs, or outbox payloads.

Most paths are ports or disabled stubs today. Check `docs/IMPLEMENTATION.md`; do not infer runtime capability from an interface.
