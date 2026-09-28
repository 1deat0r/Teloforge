# Working on Teloforge

Read `SPEC.md`, `docs/IMPLEMENTATION.md`, and the current milestone before changing product behavior. Start with `CONTEXT-MAP.md` and read only the context files relevant to the task. `docs/approved/` is an immutable historical review bundle; add new revisions elsewhere. The current project specification and explicit revision resolutions take precedence; incorporated r2 requirements override the older execution foundation.

## Architecture boundaries

- The TypeScript kernel and PostgreSQL own application state. Runner spools and telemetry never become alternate authorities.
- Authenticate and validate untrusted input before domain admission. Draft TypeScript types alone are insufficient.
- Persist admission binding, budget reservation, resource lease, command result, audit, and outbox together before effects.
- Broker every governed effect using current authority and stable logical operation identity. Preserve unknown outcomes; never blindly retry an uncertain write.
- Treat intent grants, evaluator rules, sealed data, signing keys, and release authority as protected from ordinary learner execution.
- Keep tenant scope and restrictive provenance through derived artifacts, memory, datasets, and bundles.
- Keep incomplete capabilities visibly disabled. An interface or successful process start does not qualify a runtime.
- Do not store secrets, provider credentials, private prompts, or workspace payloads in source, outbox records, or bootstrap logs.

## Local-first development

The normal loop is: inspect task and context, implement locally, run `pnpm verify`, inspect the diff, make a small atomic commit, then sync to GitHub when useful. Read `docs/DEVELOPMENT.md` for the canonical workflow.

These local-first instructions supersede earlier workflow text that required Issues, topic branches, PRs, or remote CI for routine changes. Historical review bundles and stale branches may retain that wording; follow the current `main` policy while complying with protections actually enforced by GitHub.

- Do not create a GitHub issue, branch, PR, or remote-CI wait for routine work. Use them when they materially improve durable tracking, isolation, external review, coordination, or release confidence.
- Direct commits to `main` are allowed by the current ruleset after local verification. Preserve linear history; never force-push, delete protected branches, or bypass a rule. If GitHub changes a protection so a direct update is blocked, comply unless the project owner explicitly authorizes a legitimate rule change.
- Before committing, run `pnpm verify`, inspect `git status` and the full diff, run `git diff --check` and `git diff --cached --check`, and exclude generated output, secrets, unrelated user/agent work, and debug artifacts. Commit one coherent change with a descriptive message.
- Keep GitHub Actions as clean-environment safety checks. Do not wait idly for remote CI when equivalent local work can continue; investigate a remote-only failure and repair it promptly.
- Request independent agent review when risk warrants it. Match review depth to the affected authority, data, effect, migration, runner, evaluator, or security boundary. Agent output is evidence to inspect, not a human approval or runtime qualification.

## Contribution conventions

- Use TypeScript for product/domain code, Rust for the narrow runner boundary, SQL for durable constraints. Python is optional analysis tooling.
- Use the pinned workspace tool versions. Commit intentional manifest and lockfile changes together.
- Shared package imports use `@teloforge/*`; use type-only imports where appropriate. Keep the console outside the authority path.
- Update implementation status when adding a product capability and document its remaining limits.
- Do not merge, deploy, publish packages, register names, or schedule recurring execution merely because the roadmap describes those actions.

No repository license has been chosen. Obtain a license decision before publishing or incorporating upstream code under its applicable terms.

## Matt Pocock engineering skills

For every Matt Pocock skill used in this repository, follow the autonomous execution contract in `docs/agents/skill-autonomy.md`. Do not stop for a routine interview, plan approval, ticket-granularity vote, tracker choice, or PR confirmation.

Consequential development decisions are delegated to the independent agent board in `docs/agents/decision-board.md`. Do not ask the owner to resolve engineering or product-design choices within the approved project scope. If a decision needs authority not already granted, record HOLD, keep that capability disabled, and continue independent work. This development delegation does not change runtime owner grants or authorize spending, external effects, release, or destructive operations.

### Issue tracker

Use the current user request and local project context by default. GitHub Issues are optional for persistent multi-session work, dependencies, coordination, externally reported problems, and other cases where a durable shared record helps. See `docs/agents/issue-tracker.md`.

### Triage labels

When an issue is intentionally triaged, use the canonical Matt Pocock state-label mapping. See `docs/agents/triage-labels.md`.

### Domain docs

This is a multi-context workspace. Start with `CONTEXT-MAP.md`, then read only the relevant context file and related ADRs. See `docs/agents/domain.md`.
