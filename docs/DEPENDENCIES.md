# Dependency baseline

Selected on 28 September 2026. Version metadata was read from the official npm registry and runtime documentation during scaffold creation. Resolution is not a runtime compatibility or security guarantee. Application builds and tests were not run.

| Component | Pinned version | Use |
| --- | --- | --- |
| Node.js | 24.21.0 | LTS development baseline; package engine also allows 26 |
| pnpm | 11.18.0 | Available local tool, deliberately pinned; no claim it is newest |
| TypeScript | 7.0.2 | TypeScript compiler |
| tsx | 4.23.15 | Control-service development loader |
| React / React DOM | 19.3.0 | Console |
| Vite | 8.3.1 | Console development and bundling |
| Vite React plugin | 6.1.1 | React transform integration |
| React / React DOM type packages | 19.3.0 | Console types |
| Node type package | 24.19.0 | Node baseline types |
| Rust toolchain | 1.98.1 | Locally available pinned runner toolchain |
| PostgreSQL container | 18.6 | Optional development database; image not launched |

Official sources: [Node release policy](https://nodejs.org/en/about/previous-releases), [Vite guide](https://vite.dev/guide/), [PostgreSQL 18 documentation](https://www.postgresql.org/docs/18/index.html). npm version metadata comes from package-specific `registry.npmjs.org` endpoints, including [TypeScript](https://registry.npmjs.org/typescript/7.0.2), [React](https://registry.npmjs.org/react/19.3.0), [Vite](https://registry.npmjs.org/vite/8.3.1), and [the React plugin](https://registry.npmjs.org/@vitejs/plugin-react/6.1.1).

`pnpm-lock.yaml` records exact resolved dependency versions and integrity values. Direct application dependencies use exact versions. `Cargo.lock` records the local Rust workspace; S00 uses no external Rust crates. The PostgreSQL development tag is versioned but not pinned to an image digest; choose and record a verified digest before a deployment release.

Install with lifecycle scripts disabled. Optional native packages may be selected by platform. No automatic package updater, CI action, model SDK, database driver, ORM, authentication SDK, sandbox runtime or telemetry exporter is selected yet. Add those when their T01/T02 interfaces and host requirements are concrete.
