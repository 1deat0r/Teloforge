# Operator console

## Ownership

`apps/console` presents intent, plan, attempt, evidence, spending, and unresolved decisions for human operators. It is a client surface, not an authority boundary or source of truth.

## Boundaries

- The TypeScript kernel and PostgreSQL make authorization and lifecycle decisions; UI state cannot authorize effects.
- Display disabled capabilities and unresolved outcomes plainly. Do not infer readiness from process liveness or a successful HTTP response.
- Do not place credentials, private prompts, or workspace payloads in browser storage or logs.
- Keep approval and recovery displays bound to exact action digests and durable receipts when implemented.

The current React page is a static status scaffold without authenticated API integration. See `docs/IMPLEMENTATION.md` before describing behavior.
