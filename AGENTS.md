# Working on Teloforge

Read `SPEC.md`, `docs/IMPLEMENTATION.md`, and the current milestone before changing behavior. `docs/approved/` is an immutable historical review bundle; add new revisions elsewhere. The current project specification and explicit revision resolutions take precedence; incorporated r2 requirements override the older execution foundation. Keep review-round normative text frozen while reviewers read it.

## Architecture boundaries

- The TypeScript kernel and PostgreSQL own application state. Runner spools and telemetry never become alternate authorities.
- Authenticate and validate untrusted input before domain admission. Draft TypeScript types alone are insufficient.
- Persist admission binding, budget reservation, resource lease, command result, audit, and outbox together before effects.
- Broker every governed effect using current authority and stable logical operation identity. Preserve unknown outcomes; never blindly retry an uncertain write.
- Treat intent grants, evaluator rules, sealed data, signing keys, and release authority as protected from ordinary learner execution.
- Keep tenant scope and restrictive provenance through derived artifacts, memory, datasets, and bundles.
- Keep incomplete capabilities visibly disabled. An interface or successful process start does not qualify a runtime.
- Do not store secrets, provider credentials, private prompts, or workspace payloads in source, outbox records, or bootstrap logs.

## Contribution conventions

- Use TypeScript for product/domain code, Rust for the narrow runner boundary, SQL for durable constraints. Python is optional analysis tooling.
- Use the pinned workspace tool versions. Commit intentional manifest and lockfile changes together.
- Shared package imports use `@teloforge/*`; use type-only imports where appropriate. Keep the console outside the authority path.
- Update implementation status when adding a capability and document its remaining limits.
- Add or run tests only when the user asks for testing or implementation verification. Documentation of future acceptance scenarios does not mean they ran.
- Do not merge, deploy, publish packages, register names, or schedule recurring execution merely because the roadmap describes those actions.

No repository license has been chosen. Obtain a license decision before publishing or incorporating upstream code under its applicable terms.

## Mandatory GitHub development workflow

GitHub is the sole collaboration record and merge path. Read `CONTRIBUTING.md` and `docs/GITHUB_DEVELOPMENT.md` before work.

- Every deliverable starts from a GitHub issue or a linked, approved roadmap task. Every change is developed on a named topic branch, pushed to `origin`, and submitted as a pull request to `main`.
- Never commit or push directly to `main`, including for documentation, generated files, emergencies, or administrator changes. The initial repository import is the only bootstrap exception.
- Keep plans, design decisions, reviewer verdicts, evidence, corrections, CI results, and completion notes attached to the GitHub issue/PR. Chat discussions do not replace repository review records.
- Each PR needs two isolated expert-agent reviews: one domain/systems review and one adversarial review. Architecture, authorization, tenant-data, evaluator, release, migration, protocol, or security-boundary changes require the five-seat board in `docs/GITHUB_DEVELOPMENT.md`, including a fresh cold read. Any material blocker keeps the PR open. Re-review the exact final commit after changes.
- Reviewers do not see peer reasoning before submitting. Record agent role/model, reviewed commit SHA, verdict, citations, blockers, and closure quotes in the PR. Never fabricate GitHub user approvals or claim agent consensus from a CI job.
- CI must pass on the latest PR commit; resolve all review conversations. A human maintainer performs the final merge only after checking the required review evidence. Squash merge through GitHub.
- Do not land secrets, private workspace content, credentials, or local machine paths. No license has been selected; don't merge outside contributions or describe this as open source until the owner records applicable terms. The public repository currently has no license grant.
- If GitHub or CI is unavailable, prepare a local patch if needed, but don't mark it delivered or merge it elsewhere. Push the topic branch and complete the recorded PR workflow when GitHub returns.

The active `main` branch ruleset enforces PR-only changes, the required CI jobs, resolved review threads, a linear history, no force-push or deletion, and no bypass actors. Update this policy and the ruleset together through a reviewed PR if the workflow changes.
