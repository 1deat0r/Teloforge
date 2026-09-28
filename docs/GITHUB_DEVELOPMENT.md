# GitHub development standard

**Effective 28 September 2026.** The public Teloforge repository on GitHub is the canonical issue, source, review, CI, and merge record. The local checkout is for editing. A code change is not delivered until its GitHub pull request is merged.

## Protected-branch rule

The initial import creates `main`. The active GitHub repository ruleset then requires every subsequent `main` change to arrive by pull request with current `Source CI / TypeScript` and `Source CI / Rust` checks. It dismisses stale reviews, requires review threads to be resolved, requires linear history, blocks force-push and branch deletion, and defines no bypass actors. Squash merge is the only allowed merge strategy. GitHub's branch ruleset is the enforcement mechanism; this policy and the checked-in `.github/rulesets/main.json` describe the intended state.

GitHub supports native review counts and code-owner approvals, but there is one human maintainer and no reviewer team or review App connected at setup. A required independent human approval would make owner-authored PRs unmergeable. For now the native review count is zero, `CODEOWNERS` routes review requests to the maintainer, and the mandatory independent-agent protocol below is enforced by maintainers against the PR evidence. Do not claim GitHub technically validates an agent report. Add native review enforcement once a genuine independent GitHub reviewer/App is configured. Ruleset bypass remains disabled.

## Issue, branch, PR

- Put all milestones and work on GitHub issues. Issues state intent/outcome, scope, acceptance criteria, non-goals, risks, dependent T01–T04 milestone, and owner.
- Use a branch tied to an issue. Keep one conceptual change per PR and rebase/update against current `main` as required by strict CI.
- Use `.github/pull_request_template.md`. Attach UI screenshots only when a visual change needs them; don't attach secrets or private data.
- Squash merge the approved PR on GitHub. Reference the issue with `Closes #N`. GitHub CI and reviews must reference the final head SHA, not an earlier version.
- Update docs and status in the same PR as the behavior they describe. Do not rewrite the hash-pinned historical `docs/approved/` bundle; add new design revisions alongside it.

## Independent expert-agent protocol

Review is a separate evaluation track from implementation. The authoring agent cannot count its own assessment as a review. Dispatch reviewers with separate tasks and pinned paths/commit SHA. Collect their initial verdicts before exposing any peer rationale. Select different model variants where available; note that several model variants do not constitute independent human or provider certification.

Every PR:

1. **Domain/systems seat:** checks behavior, failure handling, compatibility, dependencies, and acceptance criteria.
2. **Adversarial seat:** tries to reject the change; checks authority, data scope, poisoning, secrets, unsafe inputs, concurrency and recovery as relevant.

The five-seat gate also applies before merging changes to product/spec architecture; intent/grant/budget admission; broker/effect policy; tenancy or provenance; evaluator datasets, graders, receipts or exposure; promotion, canaries or rollback; protocol/runner isolation; production schema migration; and security boundaries. The seats are domain/systems, evaluation/statistics, adversarial, product/operability, and a cold final integration read. The cold reader was not exposed to earlier reports.

Every report names the exact head commit and contains BUILD / CONDITIONAL / REJECT, numbered material blockers with locations and closure conditions, separate nonblocking notes, source/check evidence, and explicit UNVERIFIED limits. Material blockers stop merge. A confirmed blocker is fixed in the branch, all affected reviewers get the revised digest for a fresh vote, and each closure is quoted against the final source. Keep dissent and rejected rulings in the PR record. No reviewer is pressured to BUILD.

Store reports in the GitHub PR record, preferably a single report comment/attachment or committed `docs/reviews/` report linked by the PR. Do not message a collaborator or post GitHub review/comment on someone's behalf without clear authorization. Never impersonate a reviewer or ask an agent for a GitHub login token.

## Quality and safety gates

- Current required CI checks are static compilation/build checks only. The absence of tests is visible, not waived. A feature PR should add an appropriate test suite in a later explicitly authorized implementation/verification task; do not claim the current pipeline provides runtime assurance.
- Do not merge a release or self-improvement candidate using exploration evidence alone. Follow the sealed-set, registered-manifest, complete-accounting, ordered-decision, and bounded-canary gates in `SPEC.md`.
- Actions use full commit-SHA pins. Pull requests run with read-only repository permissions, no deployment credentials, and `pull_request` triggers; never run fork code under `pull_request_target` with write secrets.
- Use Dependabot PRs for dependency updates. Review action pins and their resolved changes; do not auto-merge dependency or agent-generated changes.
- Keep sensitive security reports in GitHub's private vulnerability reporting when available, never in a public issue. No credentials, tokens, private task data, personal file paths, or host identifiers go into commits or logs.
- This repository has no selected distribution license. Public visibility is not a project license decision. No external patches may be merged until contributor rights and distribution terms are settled.

## Bootstrap and exceptional downtime

The initial import is the sole direct push to `main` and is recorded in Git history. Configure and verify the ruleset immediately after the CI check contexts exist. All later changes must use pull requests. If GitHub is unavailable, local work may be prepared but remains pending and is not merged/delivered outside the GitHub record.
