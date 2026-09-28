# Optional GitHub workflow

For routine development, follow the local-first [development workflow](DEVELOPMENT.md). GitHub issues, branches, and pull requests are tools to use when they add durable coordination, isolation, outside review, or release confidence; they are not required for ordinary changes.

## Current remote safeguards

The active `main` ruleset is documented in `.github/rulesets/main.json`. It preserves linear history and prevents branch deletion, force-push, and bypass. Direct fast-forward commits are permitted after `pnpm verify`. Remote CI still runs on pushes to `main`, PRs, and manual dispatch as a clean-environment check. A CI failure is investigated and repaired; it does not make remote CI the local development loop.

Change repository rules only with the project owner's authorization. Keep the checked-in ruleset synchronized with the live GitHub ruleset using `scripts/github/apply-main-ruleset.sh`. Do not weaken credential, runner, release, or data-security boundaries as part of workflow simplification.

## Issues and pull requests

Use an Issue for long-lived backlog, cross-session dependencies, multi-agent coordination, external reports, or discussions that need a durable shared record. Use a PR for changes that benefit from isolation or deliberate review, external contributions, elevated-risk decisions, or explicit user/product requirements. Blank issues and direct commits are allowed.

When opening a PR, include the relevant task/context, local `pnpm verify` result, final commit, risk rationale, and any independent review findings. Treat agent feedback as analysis, not a GitHub human approval or runtime qualification. Continue independent local work while remote checks run.

## Remote workflow safety

- Keep workflow actions pinned to full commit SHAs and use the least permissions needed. Untrusted pull request code runs with read-only permissions through `pull_request`; never execute fork code under `pull_request_target` with write credentials.
- Do not auto-merge dependency or agent-generated changes. Investigate remote-only failures and update action pins deliberately.
- Keep credentials, private prompts, workspace data, host paths, and tokens out of commits and logs. Report sensitive vulnerabilities through GitHub's private reporting channel rather than a public issue.
- The repository has no selected license. Do not describe it as open source or merge outside contributions until distribution and contribution terms are recorded.

The GitHub Issue and PR templates remain available for these cases. They do not make either workflow mandatory.
