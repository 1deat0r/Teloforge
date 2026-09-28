# T01-01 implementation proposal — round 3 review

- Reviewed proposal SHA-256: `4abe8137600e1da6d91cd4450af3cb0e563eaa503af45bc7ca1d3ead55fb4cf5`
- Source commit: `14cc46862ad337518dbe072e0fb2a16a3619cf44`
- Result: three BUILD, two CONDITIONAL; the design gate remains closed.
- All five fresh reviewer contexts verified the proposal and all 12 pinned source hashes. They did not inspect peer reports before voting. No reviewer changed files. One cold reviewer reported that a search command touched `docs/approved/`; they did not inspect `docs/reviews/` or rely on that output.

## Verdicts

| Seat | Agent | Configured model | Verdict | Summary |
| --- | --- | --- | --- | --- |
| Domain and distributed systems | `t01r3_domain_fresh` | GPT-6 Astra (runtime exposed GPT-6 only) | BUILD | Transaction/replay model and T01-02 boundary are coherent. Nonblocking implementation notes: serialize and uniquely constrain command IDs across targets; interpret version consumption by version dimension; make T01-02 check state in its admission transaction. |
| Adversarial authority and security | `t01r3_security_fresh` | GPT-5.6 Sol | CONDITIONAL | Add a closed PostgreSQL 18 ACL/ownership inventory across all grantable classes; verify the exact RLS policy set and properties to reject additional permissive policies; hold the environment marker stable through each transaction, for example with a row lock. |
| Evaluation and evidence | `t01r3_eval_fresh` | GPT-6 Sol | CONDITIONAL | Specify concurrent identical/conflicting idempotency-key outcomes and committed-write/lost-response recovery; define UUID/path/version bounds and canonical digest vectors; move changed-actor and T01-02 admission claims out of this fixed-principal/no-admission slice or give them a scoped test seam. |
| Product and operability | `t01r3_product_fresh` | GPT-5.6 Terra | BUILD | The bounded local operator workflow and fixture/live capability distinction are understandable and operable without implying that pause/cancel stops work. |
| Fresh cold integration | `t01r3_cold_fresh` | GPT-6 Luna | BUILD | Proposal composes with T01-01, SPEC, and T01-02. No material blocker found. |

## Outcome under the board policy

This was the third substantive review round. The five-seat board policy says to record HOLD when a material disagreement remains after three rounds. The two CONDITIONAL votes identify correctness and security evidence still missing, so BUILD is not authorized. Do not implement or expose the T01-01 fixture API under this proposal. Continue only with work outside its dependency cone; do not request an owner checkpoint or repeat the same review with wording-only changes.

## Material findings

### Security

1. The privilege inventory is not exhaustive across PostgreSQL 18 ACL-bearing object classes, ownership classes, and privilege types. Include types/domains, languages, large objects, tablespaces, foreign-data wrappers/servers, configuration-parameter grants, and future privilege kinds, with explicit baseline/denial behavior. PostgreSQL exposes privilege inquiry across object classes and notes ACL-based grants beyond table/schema/function access ([PostgreSQL 18 privilege inquiry](https://www.postgresql.org/docs/18/functions-info.html), [PostgreSQL 18 `GRANT`](https://www.postgresql.org/docs/18/sql-grant.html)).
2. Presence of the required RLS policy does not reject an additional permissive policy. PostgreSQL combines applicable permissive policies with `OR`; require an exact per-table policy manifest and check command, roles, permissive/restrictive mode, `USING`, `WITH CHECK`, enabled, and forced properties ([PostgreSQL 18 row security](https://www.postgresql.org/docs/18/ddl-rowsecurity.html)).
3. A marker read at transaction start is not stable through transaction completion. Hold a row lock or equivalent serialization guarantee so marker reclassification cannot race an in-flight request.

### Evaluation and evidence

1. Add same-key/same-digest and same-key/different-digest races, plus a commit-success/HTTP-response-lost recovery case. Specify the deterministic winner, replay, conflict, and persisted result; do not permit an uncaught uniqueness error or 500.
2. Define canonical lower-case UUID form and bounds, path identifier syntax, positive integer version range and JSON representation, and digest byte vectors. The evidence matrix currently names invalid UUID/numeric cases without defining the accepted forms.
3. Keep T01-01 evidence within its fixed synthetic principal and no-admission boundary. Test actor-binding via a pure domain seam only if explicitly included; otherwise defer it and the T01-02 admission predicate to their own slices.

No runtime or implementation verification is claimed by these reviews.
