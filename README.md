# Teloforge

**An intent-driven agent harness that improves through evaluated changes.**

Specify an outcome, its acceptance criteria, authority, and resource limits. Teloforge's intended execution loop pursues that outcome; a separately governed improvement loop evaluates better contexts, skills, routing, and workflows before releasing them.

**Status: project specification and scaffold.** A fresh five-expert board approved the consolidated project specification (project-r2 / spec 0.3) after two rounds, with all material findings resolved. See the [review record](docs/reviews/BOARD.md). The original scaffold handoff did not include build or runtime evidence; the current local verification status is recorded in [implementation status](docs/IMPLEMENTATION.md). Teloforge has no production agent execution, and no improvement over Paperclip has been measured.

The [public GitHub repository](https://github.com/1deat0r/Teloforge) is the canonical source location for backup, synchronization, optional tracking/review, and releases. Local development is the normal inner loop. See [project location](docs/PROJECT_LOCATION.md) and [development workflow](docs/DEVELOPMENT.md).

## Start here

- [Full project specification](SPEC.md)
- [Agent context map](CONTEXT-MAP.md)
- [Interactive Archify architecture](docs/approved/teloforge-architecture.html)
- [Development setup](docs/DEVELOPMENT.md)
- [Implementation status and module map](docs/IMPLEMENTATION.md)
- [Milestones and implementation backlog](docs/ROADMAP.md)
- [Proposed data model](docs/DATA_MODEL.md) and [API/protocol boundaries](docs/CONTRACTS.md)
- [Architecture decisions](docs/adr/0001-execution-foundation.md)
- [Current 5/5 expert approval](docs/reviews/BOARD.md) and [receipt](docs/reviews/approval.json)
- [Historical review provenance](docs/REVIEW_PROVENANCE.md)
- [Scaffold delivery record](docs/DELIVERY.md)

## Technology choices

| Technology | Responsibility | Reason |
| --- | --- | --- |
| TypeScript / Node.js | Kernel, API, policy, broker, release logic, adapters | Shared contracts and one implementation of business decisions |
| React / TypeScript | Operator console | A familiar component model for intent, evidence, and release views |
| Rust | Runner and process boundary | Bounded resource handling and a distributable daemon |
| PostgreSQL / SQL | Authoritative state, budgets, audit, outbox | Atomic decisions and constraints |
| Python, optional later | Statistical analysis and experiment tooling | Use its scientific libraries when needed; no second control plane |

Start with one modular control application, PostgreSQL, a runner, and artifact storage. Evaluation and evolution workers have separate identities and quotas. The architecture does not require Redis, Temporal, or Kubernetes for the initial workload.

## Project layout

```text
teloforge/
├── SPEC.md                      Product and execution requirements
├── AGENTS.md                    Contributor boundaries
├── apps/
│   ├── control/                 Loopback HTTP bootstrap; execution disabled
│   └── console/                 Static React scaffold status page
├── packages/
│   ├── contracts/               Draft domain types and runner envelope schema
│   ├── kernel/                  Work admission port; deny-only implementation
│   ├── policy/                  Authorization port; deny-only implementation
│   ├── db/                      Persistence port; migrations still to implement
│   ├── broker/                  External-operation and reconciliation ports
│   ├── adapters/                Capability declarations; no qualified adapter
│   ├── artifacts/               Artifact storage port
│   ├── evaluation/              Independent trial and receipt port
│   ├── evolution/               Candidate proposal port
│   ├── registry/                Release port; promotion stays on hold
│   └── observability/           Bootstrap metadata logging
├── workers/
│   ├── evaluator/               Disabled worker entry point
│   └── evolution-lab/           Disabled worker entry point
├── crates/
│   ├── protocol/                Draft protocol version and embedded schema
│   └── runner/                  CLI version/help/capabilities only
├── infra/compose.yaml           Optional local PostgreSQL
└── docs/                        Setup, roadmap, ADRs, and original review bundle
```

## Local development

Use the pinned tool versions in [dependencies](docs/DEPENDENCIES.md), then from this folder:

```sh
cp .env.example .env
pnpm install --frozen-lockfile --ignore-scripts
pnpm verify
pnpm dev
```

The intended local addresses are `http://127.0.0.1:4100` for the control bootstrap and `http://127.0.0.1:5173` for the console. `/readyz` deliberately returns 503. The console displays static scaffold capabilities and does not establish server readiness. PostgreSQL is optional for this scaffold because persistence is not connected.

See [development](docs/DEVELOPMENT.md) for the canonical verification command and the separate Rust runner command.

## First implementation slice

[T01](docs/tasks/T01-intent-execution.md): persist a revisioned intent, enforce its grants and budget in atomic admission, and complete one repository-maintenance task through a qualified adapter with durable action receipts. A reviewable pull request is a product outcome for that task; it does not make PRs mandatory for Teloforge's own routine development. Automatic merging and deployment require additional authority.

Teloforge is a working name. Package, domain, and trademark availability are unverified. The public repository currently has no license file; package manifests are marked `UNLICENSED`. Distribution and contribution terms remain undecided, so do not treat the repository as open source.
