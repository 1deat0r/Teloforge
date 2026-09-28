# T01 synthetic-first tracer tickets

This ticket set applies the Matt Pocock grilling and to-tickets workflows to T01. It is a local, dependency-ordered plan; it does not change product behavior or qualify a runtime.

## Authority and scope

- The normative requirements come from SPEC.md and docs/tasks/T01-intent-execution.md.
- GitHub Issue #4 remains the parent record for the bounded live pilot and its owner decisions. This plan does not modify that issue.
- The revision 0.6 profile described by open PR #5 is a proposal, not an approved operational profile. Do not treat its candidate model, target/staging repositories, permission split, sandbox, freeze, or other profile details as selected.
- The first eight tickets use synthetic identities, fixtures, and fake effect adapters. They must not enable a live provider, repository write, or candidate execution outside a qualified profile.
- Ticket 09 remains blocked until the required owner decisions and runtime evidence are recorded. No credentials or private workspace data belong in this plan.

## Grill result

### Resolved by current project requirements

- The TypeScript kernel and PostgreSQL are the authorities for intent, admission, attempt, budget, lease, audit, and outbox state.
- Validate untrusted input before domain admission. Bind authorization to the current intent revision, grant, action identity, budget, resource lease, and expected state.
- Persist admission and its accounting before effects. Use stable logical operation identity, preserve unknown external outcomes, and never blindly retry an uncertain write.
- Treat runner state, telemetry, and artifacts as non-authoritative. Preserve tenant scope and provenance; require evidence finalization before dependent completion.
- Keep unsupported execution, integrations, and release capabilities visibly disabled. T01 does not grant merge or deployment authority.
- Use TypeScript for product/domain code, Rust for the narrow runner boundary, and SQL for durable constraints.

### Safe implementation defaults

- Build and exercise the first vertical path with synthetic tenant and identity fixtures and fake model/repository adapters.
- Make fixture-only execution impossible to configure as a live provider or repository writer. Production-facing endpoints remain deny-by-default until real authentication and an approved profile are qualified.
- Keep the work in the existing modular control application and PostgreSQL design. Do not add a new queue, service, or database without evidence that the current design cannot meet a requirement.

### Owner decisions still open

Issue #4 records the current list: target repository, file, broken link, and correctness rubric; staging boundary, App permissions, and enforceable freeze; provider, model, credential custody, spend limit, and data-use/retention choices; host and sandbox profile; principal enrollment and repository settings; and any permitted notifications. These cannot be inferred safely. The live capability remains disabled until the owner records the decisions and qualification evidence.

## Dependency order

| Ticket | Work | Blocked by |
| --- | --- | --- |
| [T01-01](01-intent-revisions.md) | Persist and inspect a validated intent revision in fixture mode | None |
| [T01-02](02-atomic-admission.md) | Admit one bounded attempt with atomic reservations | T01-01 |
| [T01-03](03-runner-lifecycle.md) | Drive a synthetic attempt through the fenced runner protocol | T01-02 |
| [T01-04](04-evidence-finalization.md) | Finalize scoped, provenance-bound attempt evidence | T01-03 |
| [T01-05](05-exact-effect-approval.md) | Bind an approval to one exact, expiring effect digest | T01-02, T01-04 |
| [T01-06](06-broker-unknown-outcomes.md) | Exercise ordered effects and unknown outcomes through fake adapters | T01-05 |
| [T01-07](07-operator-lifecycle-views.md) | Inspect approval, progress, evidence, spending, and unresolved outcomes | T01-01 through T01-06 |
| [T01-08](08-synthetic-qualification.md) | Run the end-to-end synthetic acceptance profile and retain its evidence | T01-01 through T01-07 |
| [T01-09](09-live-profile-qualification.md) | Qualify the owner-selected live pilot without expanding its grant | T01-08 and all Issue #4 owner gates |

Tickets 01–08 are ready for implementation only within their fixture-only boundaries. T01-09 is blocked on owner input and exact-host/provider/repository qualification. Acceptance criteria are future requirements; none are claimed as executed by this planning work.
