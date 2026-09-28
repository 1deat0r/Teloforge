# T01-01 implementation proposal — round 1 review

- Reviewed proposal SHA-256: `634f130c81a7de4d322c5c5063b0e43e2d2e1361b67ee2aff6f1169556250212`
- Source commit: `14cc46862ad337518dbe072e0fb2a16a3619cf44`
- Result: one BUILD, four CONDITIONAL; no implementation authorized by this round.
- All five seats confirmed the proposal digest and the pinned source digests. No reviewer modified the worktree. Reviewers did not see peer findings before submitting their own verdict.

## Verdicts

| Seat | Agent | Configured model | Verdict | Summary |
| --- | --- | --- | --- | --- |
| Domain and distributed systems | `t0101_domain_20260929` | GPT-6 Astra | BUILD | Atomic revision/status/result/audit and fail-closed boundary fit the existing model; apply idempotency replay before stale-version checks. |
| Adversarial authority and security | `t0101_security_20260929` | GPT-5.6 Sol | CONDITIONAL | Require fixture database marker and separate credentials; define Host/Origin/loopback boundary; verify role-membership and RLS invariants; enforce append-only revisions/audit; define digest-bound replay. |
| Evaluation and evidence | `t0101_eval_20260929` | GPT-6 Sol | CONDITIONAL | Specify exact finite-intent schema and malformed-input limits; observable replay, stale/concurrent, rollback/restart, audit, and mode-gate checks. |
| Product and operability | `t0101_product_20260929` | GPT-5.6 Terra | CONDITIONAL | Define lifecycle transitions and operator-visible meaning; specify replay/conflict/stale outcomes; make fixture status markers mandatory on every response and define fixture readiness. |
| Fresh cold integration | `t0101_cold_20260929` | GPT-6 Luna | CONDITIONAL | Add canonical idempotency and lifecycle semantics; pin parent T01 and T01-02 so downstream compatibility is reviewable. |

Model labels above are the configured review variants. Some reviewers reported that their runtime did not expose a more specific model identity; these were isolated model contexts from one provider, not human or cross-provider certification.

## Consolidated closure plan

The proposal will be re-frozen with:

1. A versioned, closed finite-intent request schema, per-field and body byte limits, strict unknown-field rejection, and expected errors for incomplete, unsupported, malformed, duplicate, and oversized input.
2. Explicit command digest, replay, changed-payload conflict, stale-revision, race, transaction-failure, restart, and audit-result semantics, including tenant/actor/schema/rule bindings.
3. A lifecycle transition table, separate status version, revise-while-paused rule, terminal cancellation rule, and T01-02's active/current-revision admission predicate. Status is not process-stop or effect-completion evidence.
4. Exact runtime mode, fixture-database marker, fixture-only credentials, database role and `SET ROLE` checks, RLS/policy/privilege checks, immutable-row enforcement, and exact Host/Origin/content-type/body-limit behavior. The fixture profile trusts local OS processes; forwarding/tunneling is unsupported.
5. A deterministic verification matrix with expected persisted state and no-change observations, plus exact hashes for the parent T01 task and downstream T01-02.

Implementation remains held until a fresh five-seat round returns BUILD on one identical revised proposal digest.
