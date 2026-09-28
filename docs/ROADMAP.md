# Implementation roadmap

The r2 architecture review is complete. S00 supplies the project specification and scaffold. **T01–T04 remain unimplemented**, and their acceptance scenarios have not run. This roadmap is a work sequence, not an instruction to start recurring experiments or deploy services.

| Milestone | Status | Dependency | Completion evidence |
| --- | --- | --- | --- |
| S00: project baseline | Files delivered; runtime unverified | Reviewed architecture | Spec, source layout, draft interfaces, archived review and local setup |
| [T01: intent and execution](tasks/T01-intent-execution.md) | Implementation held at T01-01 after three board rounds; downstream slices blocked | S00 | Resolve the recorded T01-01 security/evaluation findings before fixture implementation |
| [T02: baseline measurement](tasks/T02-baseline-measurement.md) | Pending | T01 | Cohort-complete costs/outcomes with repeatability and variance |
| [T03: evolution and release](tasks/T03-evolution-release.md) | Pending | T02 | Independent registered experiment, trustworthy receipts, bounded canary and rollback |
| [T04: extensions](tasks/T04-extension-qualification.md) | Deferred | Relevant T01–T03 gates | Qualified adapters or code releases with explicit supported guarantees |

## Decisions before their implementation slice

- Choose the first provider/runtime and sandbox using the target host's actual capabilities; do not claim all CLIs can resume safely.
- Choose authentication/session transport and define principal enrollment, membership and revocation before exposing product APIs.
- Specify operator-facing pause/cancel/uncertainty states alongside the backend lifecycle.
- Select the first repository workload, protected metrics and acceptance rubric before measurement.
- Register numeric effect thresholds, sample sizes, strata, statistical rules and experiment budgets after T02 data exists, before final-gate access.
- Select a distribution license and resolve name/namespace availability before public publication.

The original planning drafts remain under `docs/approved/teloforge-issues/` for provenance. Current tasks below restate the implementation sequence without treating the earlier design gate as still pending.
