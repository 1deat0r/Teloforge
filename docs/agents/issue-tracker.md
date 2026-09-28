# Task and issue tracking

The current user request and repository context are the default task source. Routine work may proceed without opening an issue. For short tasks, the Git diff and an atomic Git commit provide enough durable history.

Use GitHub Issues when a durable shared record materially helps: long-running backlog, work spanning sessions, dependency tracking, coordination, external reports, or important discussion. Local task/spec notes are appropriate when they preserve useful context with less overhead. Do not create an issue solely to satisfy an engineering skill's default workflow.

Pull requests are also optional. Use one for substantial or risky work, external contributions, useful outside review, concurrent isolation, or an explicit product/release requirement. A product task that creates a PR as its output does not require all repository changes to use PRs.

This policy takes precedence over generic skill defaults that start every task with an issue or PR. Follow the user's explicit request about tracking and autonomy. Preserve repository security, release, and data-handling controls. The issue tracker is GitHub Issues in `1deat0r/Teloforge`; do not treat PRs as an issue-discovery surface for routine triage.

When the `triage` skill posts a comment, follow its required AI-generated triage disclaimer. Never create comments or other external messages without user authorization.
