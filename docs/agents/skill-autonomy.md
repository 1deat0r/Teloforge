# Autonomous Matt Pocock skill execution

This policy adapts the installed Matt Pocock engineering skills for Teloforge. It overrides generic skill steps that ask the user to answer routine interview rounds, approve a plan or test seam, vote on ticket granularity, choose an already-configured tracker, approve a local edit, or require a branch/PR/subagent by default. Platform rules and Teloforge's security, authority, licensing, and release constraints still apply.

## Default behavior

- When the user asks to run a skill or complete a task, carry it through the full in-scope workflow without intermediate approval checkpoints. A request for advice alone authorizes advice, not unrelated implementation.
- Inspect the repository, existing decisions, task history, and available environment. Research facts the agent can verify; do not ask the user to look up facts available through tools or project files.
- Resolve routine ambiguity with the least-surprising, lowest-risk option consistent with `SPEC.md`, ADRs, this `AGENTS.md`, and the user's stated preferences. Record only material assumptions and decisions in the relevant task or ADR; do not create decision paperwork for trivial choices.
- If a decision cannot be inferred safely, choose a conservative boundary: keep the affected capability disabled or restricted, record the unresolved owner decision, and complete independent work. Ask the user only when a higher-priority instruction requires it or no safe, useful path remains.
- At completion, report what changed, local verification, material assumptions, and any capability intentionally left blocked. Do not claim unverified behavior.

## Skill-specific adaptations

- **`grill-me`, `grill-with-docs`, `grilling`:** Treat the design tree as an internal analysis checklist. Research factual branches, choose reversible defaults from repo evidence, record consequential architecture decisions as ADRs, then continue. Do not emit interview rounds or wait for shared-understanding confirmation.
- **`to-spec`:** Select and justify the highest useful verification seam from the codebase. Write a buildable spec in the appropriate `docs/tasks/` file without waiting for seam approval. Keep user stories and acceptance criteria grounded in the actual product boundaries.
- **`to-tickets`:** Create complete, independently verifiable slices with real blocking edges. Check the breakdown internally and save durable plans locally by default. Create GitHub issues when their long-lived tracking or dependency links materially help; do not quiz the user before producing the result.
- **`implement`, `implement-spec`:** Work on the current development branch unless a separate branch or worktree materially reduces risk or avoids conflict. Run `pnpm verify`, inspect the full diff, make an atomic commit, and push to `origin` when available. Treat remote CI as a safety net, not a wait state. Do not create a PR solely because a skill prescribes one; preserve PRs when the product task or risk makes one valuable.
- **`code-review`:** Choose the correct comparison point from task context and Git history rather than asking for one. Use independent review agents when risk warrants their distinct perspective; do not spawn them solely to satisfy a generic skill template. Fix actionable findings within scope, re-verify, and report unresolved risks.
- **`triage`:** When the user invokes triage, inspect the issue and repository evidence, make the best-supported category/state recommendation, and complete the requested triage without waiting for a selection round. Keep changes limited to the requested issue and use the skill's required AI-generated disclaimer for any triage comment.
- **`setup-matt-pocock-skills`:** Reuse `docs/agents/issue-tracker.md`, `triage-labels.md`, `domain.md`, and `CONTEXT-MAP.md` when present. Do not repeat setup questions whose answers are already recorded.

## Actions that remain gated

Autonomy covers analysis, local implementation, local verification, routine Git commits, and task tracking within the user's request. It does not grant authority to merge a PR, deploy, publish a package or release, spend money, expose credentials or private data, choose a legal license, register names, or perform destructive production operations. If one of those actions is needed, prepare the reviewable result and stop at that action. For missing secrets or unqualified runtime/security capabilities, fail closed and continue work that does not depend on them.
