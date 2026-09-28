# Contributing to Teloforge

All work is tracked in [GitHub](https://github.com/1deat0r/Teloforge). See the binding [GitHub development policy](docs/GITHUB_DEVELOPMENT.md) and [`AGENTS.md`](AGENTS.md).

## Required flow

1. Open or select an issue that states the user outcome, scope, acceptance criteria, risks, and milestone. Link work to T01–T04 when applicable.
2. Branch from the latest `main`: `feat/<issue>-short-name`, `fix/<issue>-short-name`, `docs/<issue>-short-name`, or `security/<issue>-short-name`.
3. Make one reviewable change. Keep credentials, private datasets, local paths, and unrelated generated output out of commits. Follow the intent, evidence, and authority rules in `SPEC.md`.
4. Push the branch and open a pull request. Use the template; name the exact commit SHA reviewed. Explain user impact, design, risks, migration/effect behavior, and evidence.
5. Obtain the required independent agent reviews. Re-run affected reviews after changes. Address every blocker and resolve every review conversation.
6. Wait for both `Source CI / TypeScript` and `Source CI / Rust` to pass on the latest commit. Do not claim the scaffold has automated tests; none exist yet.
7. A human maintainer verifies the evidence and merges through GitHub using squash merge. Do not push to `main`.

The expert-agent verdicts are analysis, not GitHub account approvals. Never create a fake GitHub approval or imply that a green check substitutes for review. The current solo-maintainer ruleset enforces pull requests and CI but has no native approval-count requirement; the human maintainer is responsible for enforcing the agent-review policy before merge. Add native reviewer enforcement when qualified collaborators or a review GitHub App are available.

## Review standard

Every PR receives two reviewers isolated from one another:

- A domain/systems reviewer checks the behavior against the issue and `SPEC.md`.
- An adversarial reviewer tries to find an authority, privacy, corruption, recovery, or misuse path appropriate to the change.

Changes to architecture, authorization, tenant boundaries, credentials, action effects, evaluator/evolution, release decisions, storage migrations, protocol, or security sandboxing require a five-seat review: domain/systems, evaluation/statistics, adversarial, product/operability, and a fresh cold integration reviewer. Every seat reviews the exact final commit. All must return BUILD and every material blocker must be evidenced closed. If a seat rejects, revise and re-review; do not vote-shop or omit dissent.

Store a concise report in the PR body or as a linked committed artifact with role, model, commit SHA, verdict, file/section citations, blockers, closure conditions, and fresh closure quotes. Reviewers must not see other seats' reasoning before their own verdict. Separate fact checks from opinion and label unverified runtime claims.

## CI and test honesty

The current checks install from the lockfile, typecheck/build the TypeScript workspaces, check Rust formatting, and compile the Rust workspace. They do not run unit, integration, security, or product-acceptance tests; no automated test suite has been implemented. Add appropriate tests in a behavior-changing PR when the task asks for testing or implementation verification, and register new checks in the branch ruleset through a reviewed change. Never label a build or lint result a test pass.

## Licensing

The repository is public but currently has no `LICENSE` file, and package manifests are `UNLICENSED`. Do not call Teloforge open source or assume the repository grants reuse rights. Outside contributions must not be merged until the owner chooses distribution and contribution terms. No upstream Paperclip source has been copied into this repository.
