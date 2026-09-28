# T01-01 implementation decision

- Status: proposed for fresh five-seat board review
- Risk class: high-impact persistence, tenant boundary, and development API
- Scope and mandate: implement T01-01 only: finite-intent create, revision, inspect, pause, and cancel in a synthetic fixture profile. Do not qualify production authentication, task execution, provider access, repository effects, admission, or release.
- Decision question: What exact implementation boundary delivers a useful, durable T01-01 workflow without exposing a product API before production authentication is designed?
- Source revision: commit `14cc46862ad337518dbe072e0fb2a16a3619cf44` plus this frozen proposal.
- Safe fallback: if any fixture, database, role, tenant, profile, or transport check fails, do not register the fixture routes; record HOLD and retain the existing scaffold-only interface.

## Selected architecture for review

Use PostgreSQL as the only authority for this slice. The TypeScript kernel owns validation-independent domain decisions and lifecycle transitions. The database adapter executes each mutation as one tenant-scoped transaction. Use a dedicated fixture runtime role, distinct migration credentials, runtime validation, append-only revision/audit records, optimistic versions, and durable idempotency results.

Expose only a non-product JSON operator API under `/__fixture/v1`. It is available only in the explicitly selected fixture development/test modes below. Do not change the React console in this slice; the JSON API is the fixture operator surface. T01-07 can add a console view. No browser Origin is allowed on fixture requests, so there is no CORS path in this slice. Direct local OS processes are inside this development profile's trust boundary; port forwarding and tunneling are unsupported.

Intent action/resource/budget statements are user goals, not authorization grants. This slice creates no grant, attempt, admission, reservation, dispatch, credential, provider call, repository effect, release, or external write. Production `/readyz` stays 503; `/v1/capabilities` remains disabled.

## Runtime profile gate

Require both environment values; missing, unknown, or contradictory values fail startup before routes or database connections are created.

| `TELOFORGE_PROFILE` | Required `NODE_ENV` | Fixture API | Database behavior |
| --- | --- | --- | --- |
| `scaffold` | `development`, `test`, or `production` | absent | No database connection; existing scaffold behavior only |
| `fixture-development` | `development` | register after every fixture DB check passes | Use only `TELOFORGE_FIXTURE_DATABASE_URL`, whose parsed host must be numeric loopback; reject `DATABASE_URL` and migration URLs |
| `fixture-test` | `test` | register after every fixture DB check passes | Same credential and DB-marker rules as fixture-development |
| `production` | `production` | absent | Do not read fixture credentials; existing live readiness and execution capabilities stay disabled |

The server binds only to `127.0.0.1` and verifies the effective listening address. For fixture routes, accept only the exact `Host` value `127.0.0.1:<configured-port>`. Reject missing, foreign, `localhost`, `Origin: null`, or any other Origin header; do not emit CORS headers; reject `OPTIONS`; ignore all forwarded/proxy headers. Mutation routes require `application/json` and reject bodies over 65,536 bytes before parsing. GET routes reject request bodies. The fixture DB URL must use a numeric loopback host and never be logged. Production configuration must fail startup if a fixture URL is present; fixture configuration must fail if a production URL or migration credential is present.

## Database identity and tenant boundary

Migrations are run separately using `TELOFORGE_MIGRATION_DATABASE_URL`; the control process must reject that variable and must never import or use migration credentials. The application connects only as the fixed role `teloforge_fixture_runtime` using `TELOFORGE_FIXTURE_DATABASE_URL`. Provisioning owns the database, schemas, and tables. The runtime role must not own the database, any schema, table, sequence, type, or routine.

The accepted runtime-role attributes are a closed set: `LOGIN` and `NOINHERIT` are true; `SUPERUSER`, `CREATEDB`, `CREATEROLE`, `REPLICATION`, and `BYPASSRLS` are false. The role must have no direct or indirect membership in any other role, whether or not that membership currently grants inheritance or `SET ROLE`. This intentionally rejects all PostgreSQL predefined roles, including server-file, server-program, monitoring, broad-data, signal, and maintenance roles, without depending on a hand-maintained name list. No role-level setting may broaden the connection; application SQL is schema-qualified and never runs caller-supplied SQL.

The effective database-privilege allowlist is exact. The runtime role may have `CONNECT` and must not have `CREATE` or `TEMPORARY` on the fixture database. It may have `USAGE` but not `CREATE` on the single application schema `teloforge`. It may have only these effective table privileges in that schema: `intents` and `intent_status` (`SELECT`, `INSERT`, `UPDATE`); `intent_revisions`, `command_results`, and `audit_events` (`SELECT`, `INSERT`); and `runtime_environment` (`SELECT`). Every other table privilege, including `DELETE`, `TRUNCATE`, `REFERENCES`, `TRIGGER`, `MAINTAIN`, any privilege introduced by a newer server, or grant option, is forbidden. Check both table- and column-level effective privileges on every non-system table so a column grant cannot escape the matrix. The runtime role gets no sequence privilege; IDs are generated in trusted application code. The only application routines callable through a non-system schema are none: stored functions outside `pg_catalog` must not be executable by this role or `PUBLIC`. The static application query set may call only the reviewed `pg_catalog` tenant-context routines (`set_config(text,text,boolean)` and `current_setting(text,boolean)`) and invoker privilege-inquiry routines used by the preflight checks. Verify those signatures and `SECURITY INVOKER` status. No executable `SECURITY DEFINER` routine may exist on an application-query path through any schema the role can use. The application schema contains no `SECURITY DEFINER` routine. Its immutable-row trigger functions, if present, must be invoker functions owned by the migration role and attached only to the approved immutable tables. Revoke `PUBLIC` access from non-application schemas used by the fixture database, and keep `search_path` fixed to `pg_catalog, teloforge`.

Before a physical pool connection is admitted and again on every checkout/request transaction, verify on that same connection: `session_user = current_user = teloforge_fixture_runtime`; the exact role attributes and absence of membership in every other role; no ownership; and the closed effective privilege allowlist across the current database, non-system schemas, tables and columns, sequences, and routines. Evaluate every privilege kind supported by the connected PostgreSQL major; an unknown/new privilege fails closed until explicitly added to this allowlist. Use privilege-inquiry functions across enumerated objects so grants to `PUBLIC` are included; do not rely only on `information_schema.role_*_grants`, which does not enumerate all effective `PUBLIC` access. Verify required tables, exact owner/grants, and each required RLS policy. Any unexpected privilege or missing security metadata fails closed before a tenant query. Pool connections are released as broken and discarded if an invariant check fails.

Every request uses a transaction on its checked-out connection. Immediately after `BEGIN`, before setting tenant context or running any tenant query, read and validate the migration-owned `teloforge.runtime_environment` singleton on that connection. It must identify exactly the selected `fixture-development` or `fixture-test` environment and the compiled synthetic tenant and principal IDs. This marker check occurs on every request transaction, including list, inspect, and fixture readiness reads, not only on startup or mutations. On a missing, production, changed, or mismatched marker, roll back, discard that connection, mark fixture readiness unavailable, and stop serving all fixture routes; never continue the request or silently reconnect to a different environment. The runtime role can only read the marker. The fixture identity is fixed in trusted code; request bodies and headers cannot choose tenant, principal, or owner.

Tenant-owned tables have `tenant_id` in every primary/unique/foreign-key relationship; RLS is enabled and forced with both `USING` and `WITH CHECK` policies derived from transaction-local tenant context established by trusted server code only after the marker passes. A tenant query is never issued before both checks pass.

Revision and audit rows are append-only **against the application runtime role**: that role receives only `SELECT` and `INSERT`, no `UPDATE`, `DELETE`, `TRUNCATE`, ownership, schema, or destructive-cascade rights. Database triggers reject updates, deletes, and truncation as defense in depth. The audit captures tenant, server-derived actor, command, decision/result, previous and resulting content revision/status version, schema version, rule version, payload digest, and database time. Migration owners and PostgreSQL superusers remain outside the application-role immutability guarantee.

## Versioned request and response contract

Every route is strict JSON where a body is allowed. Validate the byte limit, JSON parse, `schemaVersion`, every property, value, array size, and nested object before calling the kernel or opening a mutation transaction. Reject unknown keys; never coerce invalid input or use caller-supplied identity. The only accepted intent is `mode: "finite"`; scheduled/maintained execution is unsupported and rejected.

Schema version 1 has these required intent fields:

| Field | Validation |
| --- | --- |
| `mode` | Exactly `finite` |
| `desiredOutcome` | Non-empty string, at most 4,096 UTF-8 bytes |
| `acceptanceCriteria` | 1–10 non-empty strings, each at most 512 UTF-8 bytes |
| `qualityRequirements`, `accuracyRequirements`, `constraints`, `permittedResources`, `permittedActions`, `stopConditions`, `assumptions`, `unresolvedChoices` | Each an array of 0–10 non-empty strings, each at most 512 UTF-8 bytes |
| `timeLimitMinutes` | `null` or integer 1–525,600 |
| `budgetLimit` | `null` or exactly `{ amountMinor, currency }`; `amountMinor` is a positive canonical decimal integer up to 12 digits; `currency` matches `[A-Z]{3}` |
| `trigger` | Exactly `{ kind: "manual" }`; no schedule or recurring trigger |
| `tradeoffPriorities` | Ordered non-empty unique list drawn from `accepted_outcomes`, `accuracy`, `quality`, `latency`, `cost`, `tokens`, `human_intervention` |

The request body is at most 65,536 bytes. Use the validated representation to produce a canonical JSON v1 digest: fixed schema/property order, exact validated strings, ordered arrays, and canonical integer forms. Hash the command kind, target intent ID (or null for create), expected content revision, expected status version where applicable, schema version, normalized intent content, tenant ID, and principal ID. The command ID is the idempotency key and is stored separately from the digest.

Routes:

| Route | Operation | Command body |
| --- | --- | --- |
| `POST /__fixture/v1/intents` | Create | `schemaVersion`, `commandId`, `intent` |
| `GET /__fixture/v1/intents` | List up to 100 fixture intents | none |
| `GET /__fixture/v1/intents/:intentId` | Inspect current content/status and revision history | none |
| `POST /__fixture/v1/intents/:intentId/revisions` | Revise | `schemaVersion`, `commandId`, `expectedRevision`, `intent` |
| `POST /__fixture/v1/intents/:intentId/pause` | Pause | `schemaVersion`, `commandId`, `expectedRevision`, `expectedStatusVersion` |
| `POST /__fixture/v1/intents/:intentId/cancel` | Cancel | `schemaVersion`, `commandId`, `expectedRevision`, `expectedStatusVersion` |

Every fixture API response, including errors, contains `profile: "fixture_only"`, `schemaVersion: 1`, and explicit capability flags `intentRevisionManagement: true`, `attemptAdmission: false`, `execution: false`, `governedEffects: false`, and `release: false`. Successful mutation results contain command ID, intent ID, current revision, lifecycle status, status version, and audit ID. `GET /__fixture/readyz` returns 200 only after startup checks pass and identifies `fixture_only`; it never means live readiness. `/readyz` remains 503. Responses are `no-store` and `nosniff`.

Expected HTTP outcomes: malformed/unknown/oversized/unsupported schema is 400; unknown intent is 404; stale versions, invalid transitions, and command ID reuse with a different digest are 409; fixture/database prerequisite failure prevents listener startup or reports fixture readiness unavailable without registering mutation routes. Identical command replay returns the original recorded HTTP status and body before checking current versions. A command-ID conflict never mutates the original result or intent.

## Lifecycle and concurrency contract

`revision` tracks immutable user-authored content. `statusVersion` tracks lifecycle transitions. Each content revision increments only `revision`; pause/cancel increments only `statusVersion`.

| Operation | Required current state and versions | Result |
| --- | --- | --- |
| Create | None | `active`, revision 1, statusVersion 1 |
| Revise | `active` or `paused`; exact expected revision | Append immutable revision `n+1`; preserve lifecycle state and statusVersion |
| Pause | `active`; exact expected revision and statusVersion | `paused`; preserve content revision; increment statusVersion |
| Cancel | `active` or `paused`; exact expected revision and statusVersion | `cancelled` terminal state; preserve content revision; increment statusVersion |
| Revise/pause/cancel while `cancelled`; repeat transition under a new command; stale version | Any | 409, no current state change; persist the result and audit decision |

Only an identical command ID/digest replays a prior success or rejection. Concurrent distinct commands serialize on the intent row; at most one can consume a given expected version. An exact replay is resolved before stale checks so a lost HTTP response can be recovered. T01-02 may admit only an `active` intent at its exact current content revision, and still must independently check grant, action, expiry, budget, and resource requirements. This slice creates no attempt/process/effect, so `paused` and `cancelled` describe future intent eligibility only; neither status asserts that work or an external request stopped. There is no resume operation in T01-01.

## Atomic persistence contract

For create, revise, pause, cancel, and rejected version/transition decisions, persist the command digest/result and audit decision in the same short PostgreSQL transaction as the current projection and immutable revision change (if any). The composite tenant-scoped keys bind intents, revisions, command results, and audit events; no cross-tenant foreign key may omit tenant ID. Revisions and audit events cannot be updated/deleted by the runtime role. If any statement fails, roll back every write. A retry with the same tenant, command ID, and digest returns the exact prior result even when its expected version is now stale. Reuse with a different digest returns 409 with no change to the original command record or intent. A stale concurrent command returns 409, leaves content/status unchanged, and retains a denial result/audit record. After restart, committed revisions, status, command results, and audit history remain readable.

## Required deterministic evidence

The implementation tests and local verification must include:

1. **Schema gate:** missing required property, unknown top-level and nested property, wrong schema version, maintained mode, scheduled trigger, malformed JSON, invalid command UUID, invalid numeric form, duplicate priority, overlong UTF-8 text, overfull arrays, and body over 65,536 bytes each fail before any repository call; persisted state remains unchanged.
2. **Command identity:** identical create/revision/pause/cancel retry returns the same status/body/audit/result; same ID with any changed target, expected version, actor, or payload returns 409 without state change; two concurrent distinct revisions at the same expected revision produce exactly one success and one 409.
3. **Atomicity/recovery:** injected failure after each write boundary leaves no partial intent, revision, command result, projection, or audit; after a committed mutation and process restart, a retry returns the original result and inspection returns the same state/history.
4. **Lifecycle:** verify every allowed/denied transition in the table, separate content/status versions, and exact T01-02 active/current-revision admission predicate. Pause/cancel responses never claim a process or effect stopped.
5. **Database boundary:** absent/production/wrong fixture marker, runtime superuser/BYPASSRLS/table-owner role, any direct or indirect membership (including SET-only membership) in another role, unexpected database/schema/table/sequence/function privilege including one granted to `PUBLIC`, executable `SECURITY DEFINER` routine, missing/disabled/non-forced RLS policy, absent tenant predicate, writable immutable-table privilege, or wrong fixture IDs fails closed. After startup, change or remove the marker and verify that each GET route and each mutation detects it on the same transaction connection before a tenant query, rolls back, discards the connection, and takes fixture readiness down. Restore the marker and verify the process does not silently resume on a replacement connection. Cross-tenant select/update returns no rows or denies; immutable revision/audit update/delete/truncate attempts fail as the runtime role. Add focused tests that create a nested role-membership path and a `PUBLIC EXECUTE`/security-definer function, confirm both are rejected, then remove them and confirm the exact baseline allowlist passes.
6. **Transport boundary:** missing/unknown/contradictory profile, production fixture request, non-loopback bind, wrong Host, any Origin including `null`, `OPTIONS`, non-JSON mutation, oversized body, caller tenant/principal/owner fields, and forwarded-host spoofing fail without a repository call. Fixture responses and fixture readiness carry only the explicit fixture marker/capabilities; live `/readyz` stays 503 and live capability flags stay false.

Use synthetic data and a local fixture PostgreSQL instance only. These scenarios must not call providers, run a candidate, access a real repository, or create external effects. `pnpm verify` must pass. Database-backed cases may use an explicit local disposable PostgreSQL service; they are reported separately if not available. No test result or runtime qualification is claimed by this proposal.

## Round 3 review input hashes

All five seats must make a fresh, independent review of the same exact proposal and sources below, including a cold integration read. Verify each digest. Do not consult `docs/reviews/` or any peer verdicts/findings until submitting your own vote.

| File | SHA-256 |
| --- | --- |
| `AGENTS.md` | `718f0dd28a0d83472462bc801ad4fb8eaf6e4a028f1b1a544604d626a91a085c` |
| `SPEC.md` | `8dc51b05ab62c1e116e9d4f8b6eacb4623b5fdc6409591bc2ed1caaec49c33d3` |
| `docs/IMPLEMENTATION.md` | `2f1a913fa21bb50d0ba2b83b1f74a9a2d8dfa31b724f83575dc31f4e99d65975` |
| `docs/ROADMAP.md` | `3b11bb0e401d88ff734b86136f3314f175c6f94f02c61d7e7c4fd9d0ce69ff21` |
| `docs/CONTRACTS.md` | `44dfab6a57d3194813e07e3fd292c4d341867b8c0411e35ded8a470c12ea5f4f` |
| `docs/DATA_MODEL.md` | `09a154e5c50439010dd5d2caf3e288b894913451c02864a55ba17ab97c7ad950` |
| `docs/tasks/T01-intent-execution.md` | `cd866d636bc9a6c23352c7fae5402734b0335c7d0e827acc58cdc2957225cad8` |
| `docs/tasks/T01-slices/01-intent-revisions.md` | `a4851477f6460bde5cb40b3b32caff8a13a8236afd2b97f9f450c1ded8144a79` |
| `docs/tasks/T01-slices/02-atomic-admission.md` | `123ce5222630f7adf501b23de07899e1b8e4be4fca13d712e628142451d79c7d` |
| `docs/agents/contexts/control-plane/CONTEXT.md` | `b00ebf9bd0c2f7e63ee13601625d882184ac82952e81ab1fc6e4f0ab8a3941c0` |
| `docs/agents/decision-board.md` | `31ff3d9b617c7827a7f619ad54dfd601bb88f68a15738ff4eb50664ed6d38a7f` |
| `docs/agents/skill-autonomy.md` | `8fc5db6edf7cb8cfe3bb7b76ad3a32e19ec756d6cecbb4e5ec4e9d9278ca9f03` |

## Independent verdicts

Five fresh verdicts on this exact proposal hash are pending. A missing vote or unresolved material blocker keeps implementation closed.
