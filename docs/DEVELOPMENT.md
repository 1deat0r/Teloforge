# Development workflow

**Local first, Git-backed, low ceremony.** Work in the shared checkout unless isolation materially reduces risk or coordination cost. The normal loop is:

```text
task and relevant context → implement locally → pnpm verify → inspect diff → atomic commit → sync when useful
```

This policy is the canonical workflow for people and coding agents. GitHub provides source backup, synchronization, durable task tracking when useful, optional external review, clean-environment checks, and release infrastructure. It is not the routine inner loop.

## Start a task

1. Read `AGENTS.md`, this file, and `CONTEXT-MAP.md`. Read `SPEC.md`, `docs/IMPLEMENTATION.md`, the relevant ADRs, and the current milestone when the task changes product behavior.
2. Use the current user request as the task. Do not create an issue or a plan file just to satisfy a template. Use a local task/spec file for work that benefits from durable notes without GitHub coordination.
3. Inspect the working tree before editing. Keep unrelated user and agent work intact. Use a branch or worktree when parallel work, risky changes, or recovery needs make isolation valuable.

## Canonical local verification

Install locked dependencies when needed, then run the one pre-commit command from the repository root:

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm verify
```

`pnpm verify` runs:

1. `pnpm build` — builds the TypeScript workspaces and checks/bundles the console with TypeScript.
2. `cargo fmt --all -- --check` — checks Rust formatting using the toolchain in `rust-toolchain.toml`.
3. `cargo check --workspace --locked` — checks all Rust workspace crates against `Cargo.lock`.

The command exits nonzero on failure and performs no provider, database, runner, or application execution. It uses pinned toolchains and lockfiles; after required dependencies have been fetched, it does not need external services or network access.

There is currently no unit/integration test suite, TypeScript linter, or TypeScript formatter configured. The verifier reports what exists; it does not invent a test pass. Add the appropriate deterministic tests and checks to `pnpm verify` when those suites are introduced. Use targeted verification during implementation, but run the full `pnpm verify` before committing.

## Review and commit

1. Inspect `git status`, the full `git diff`, and `git diff --cached`; run `git diff --check` and `git diff --cached --check`. Confirm only intended files are included and no generated output, secrets, debug files, or private workspace content slipped in.
2. Make one small, coherent commit with a descriptive message. Each commit should leave the repository understandable and in a verifiable state. Do not rewrite or discard unrelated work.
3. Sync with `git push` when backup, sharing, or remote verification adds value. Direct commits to `main` are allowed by the current branch rules after local verification; keep commits linear and never force-push or delete protected branches.
4. GitHub Actions run the clean-checkout verifier on pushes to `main`, PRs, and manual dispatch. They are an independent safety net, not a prerequisite for continuing local work. If a remote-only failure appears, diagnose it, fix the cause, and commit the repair.

## When GitHub tracking or review helps

GitHub Issues are optional. Use one for a durable backlog item, long-running work spanning sessions, a dependency graph, multi-agent coordination, an external report, or important design discussion that benefits from a shared record. Routine changes can proceed from the user request or a local task/spec.

Pull requests are optional. Use one when the change is high risk, externally contributed, benefits from deliberate outside review, needs isolated concurrent work, or is an explicit product deliverable. A PR is not a substitute for `pnpm verify`, and agents should not wait idle for remote CI when local checks have already established what can be verified locally.

When an active GitHub rule requires a PR, follow it. The project owner may authorize changing workflow-only protections; do not bypass a rule, force-push, weaken security controls, or change release protections. The current ruleset preserves linear history and protects against force-push, branch deletion, and bypass. The PR template and issue template remain available when those workflows are useful.

## Keep product safeguards

A faster development process does not change Teloforge's runtime authority model. Follow `SPEC.md` and the relevant ADRs: validate input, persist admission and authority before effects, broker governed operations, preserve unknown outcomes, protect evaluator/release authority, scope tenant data, and keep unqualified capabilities disabled. CI and a successful local build do not establish runtime qualification or permission to deploy, publish, merge, or release.

## Local development services

Prerequisites are Node.js 24.21.0 (`.node-version`; the package also allows Node 26), pnpm 11.18.0, and Rust 1.98.1 (`rust-toolchain.toml`). Docker Compose is needed only for the optional PostgreSQL container.

To run the TypeScript control bootstrap and console after dependency installation:

```sh
cp .env.example .env
pnpm dev
```

The local services bind to `127.0.0.1`. The console is a static scaffold, `/readyz` deliberately reports unavailable readiness, and no agent execution path is enabled. See `docs/IMPLEMENTATION.md` for capability status and `docs/DEPENDENCIES.md` for pinned dependencies.

PostgreSQL remains optional and unused by the scaffold. See the existing `db:up` and `db:down` scripts for the isolated local Compose setup; do not put provider or runner credentials in `.env`.

## Other local commands

| Command | Purpose |
| --- | --- |
| `pnpm dev:control` | Build shared packages, then start the loopback control bootstrap |
| `pnpm dev:console` | Build shared packages, then start the console |
| `pnpm build:ts` | Compile non-console TypeScript workspaces in dependency order |
| `pnpm build` | Compile TypeScript and bundle the console |
| `pnpm typecheck` | Compile shared packages and typecheck the console |
| `pnpm runner:capabilities` | Run the Rust stub and print its disabled capabilities |
| `cargo build --locked` | Build the Rust workspace |

Build output stays in ignored `dist/` and `target/`. Shared packages are compiled before development starts; they are not watched. After changing a shared package, stop development, rebuild, and restart.

## Optional PostgreSQL and configuration

The control scaffold does not connect to PostgreSQL. To use the optional local container, copy `.env.example` to `.env`, replace `POSTGRES_PASSWORD` with a local password, and keep `DATABASE_URL` consistent (URL-encode special characters). Start or stop it with `pnpm db:up` and `pnpm db:down`.

The database binds to `127.0.0.1:55432`. Data persists in a named Docker volume; `db:down` does not remove it. No application migration is applied and no application database role is created. The Compose bootstrap user is an administration role; a production application must use a separate non-owner role with appropriate row policies.

| Variable | Current use |
| --- | --- |
| `TELOFORGE_PORT` | Control listener port, 1024–65535 |
| `POSTGRES_USER`, `POSTGRES_DB`, `POSTGRES_PASSWORD` | Optional Compose database only |
| `DATABASE_URL` | Reserved for future persistence; currently unused |
| `TELOFORGE_ARTIFACT_DIR` | Reserved for future artifact storage; currently unused |

`.env` is ignored by Git. Do not put runner or provider credentials there; no broker credential store exists yet. Neither the default HTTP bootstrap nor the static console is a production deployment.
