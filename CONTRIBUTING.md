# Contributing to Teloforge

Follow the local-first [development workflow](docs/DEVELOPMENT.md) and architecture boundaries in [`AGENTS.md`](AGENTS.md). The normal loop is implement locally, run `pnpm verify`, inspect the full diff, make an atomic commit, and sync when useful.

Issues, branches, and PRs are optional. Use them when durable coordination, isolation, external review, or release confidence justifies the overhead. The optional GitHub workflow is documented in [`docs/GITHUB_DEVELOPMENT.md`](docs/GITHUB_DEVELOPMENT.md).

Do not weaken Teloforge's runtime authority, privacy, effect-brokering, isolation, recovery, or release boundaries. The repository has no selected license; do not describe it as open source or merge outside contributions until distribution and contribution terms are recorded.
