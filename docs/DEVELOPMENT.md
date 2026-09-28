# Local development

All commands are run from the project root. These are setup instructions; no application has been launched as part of scaffold delivery.

## Prerequisites

- Node.js 24.21.0 baseline (`.node-version`). The manifest also allows Node 26, without a runtime qualification claim.
- pnpm 11.18.0, matching `packageManager` and `engines`.
- Rust 1.98.1 for the optional runner stub (`rust-toolchain.toml`).
- Docker with Compose only if you want the optional development database.

Use an existing tool/version manager to select these versions. No global installation or host configuration is included in this project.

## TypeScript and console

```sh
cp .env.example .env
pnpm install --frozen-lockfile --ignore-scripts
pnpm dev
```

`pnpm dev` first builds shared TypeScript packages, then starts the control and console development processes in parallel. The console uses port 5173 with strict port selection. Control uses `TELOFORGE_PORT` or 4100. Both bind to `127.0.0.1`.

Dependency lifecycle scripts are disabled in the setup command. The scaffold adds no install-time build hook. If a later dependency requires a lifecycle build, inspect its requirement and explicitly document the chosen permission rather than enabling every script.

Shared packages are compiled before development begins; they are not watched by this scaffold. After changing a shared package, stop development, run `pnpm build:ts`, and restart. App source changes use the respective development watchers.

## Available commands

| Command | Purpose |
| --- | --- |
| `pnpm dev:control` | Build shared packages, then start the local HTTP bootstrap |
| `pnpm dev:console` | Build shared packages, then start the console |
| `pnpm build:ts` | Compile all non-console TypeScript workspaces in dependency order |
| `pnpm build` | Compile TypeScript and bundle the console |
| `pnpm typecheck` | Compile shared packages and check console types; this emits shared package output |
| `pnpm runner:capabilities` | Compile/run the Rust stub and print its disabled capabilities |
| `cargo build --locked` | Build the Rust workspace |

Build output stays in ignored `dist/` and `target/`. There are no test suites or test scripts in S00. The commands above have not been run during scaffold creation.

## Optional PostgreSQL

The control scaffold does not connect to this database. It is preparation for T01.

1. In `.env`, replace `POSTGRES_PASSWORD` with a local development password. Update the password in `DATABASE_URL` as well; URL-encode special characters in the URL value.
2. Start or stop the development database:

```sh
pnpm db:up
pnpm db:down
```

The database binds to `127.0.0.1:55432`. Its data persists in a named Docker volume; `db:down` does not remove that volume. No migration is applied and no application database role is created. The Compose bootstrap user is a development administration role; the production application must use a separate non-owner role under T01.

## Configuration

| Variable | Present use |
| --- | --- |
| `TELOFORGE_PORT` | Control listener port, 1024–65535 |
| `POSTGRES_USER`, `POSTGRES_DB`, `POSTGRES_PASSWORD` | Optional Compose database only |
| `DATABASE_URL` | Reserved for future persistence; currently unused |
| `TELOFORGE_ARTIFACT_DIR` | Reserved for future artifact storage; currently unused |

`.env` is ignored by Git. Do not add runner or provider credentials to it; there is no broker credential store yet. Neither the default HTTP bootstrap nor the static console is a production deployment.
