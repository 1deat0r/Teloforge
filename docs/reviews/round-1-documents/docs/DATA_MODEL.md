# Proposed durable data model

This is a design map for T01–T03. No tables, SQL migrations, or persistence implementation are delivered in S00.

## Records and ownership

| Group | Proposed records | Required constraints |
| --- | --- | --- |
| Identity and authority | tenants, principals, memberships, grants, delegation_edges, authorization_epochs | Tenant membership checked; delegation cannot widen scope; parent revocation invalidates descendants |
| Intent | intents, intent_revisions, intent_status | Immutable authored revisions; current pointer changed with compare-and-swap; finite/maintained mode and stop conditions explicit |
| Planning and work | plans, work_items, work_dependencies, attempts, provider_sessions, turns | Different identities for each layer; plans pin intent revision; attempts do not erase earlier evidence |
| Admission | resource_leases, budget_accounts, reservations, command_results | Monotonic lease generations; atomic controlled-budget reservation; command ID bound to payload digest |
| Transport | runner_events, outbox, dispatch_schedule | Unique event identity and sequence; duplicate payload conflict rejected; durable intent precedes dispatch |
| Effects | operations, action_approvals, provider_receipts, reconciliation_records | Stable logical operation; canonical arguments and target; unknown outcome represented; approval expiry/revocation enforced |
| Evidence and context | artifacts, uploads, context_manifests, memory_entries, provenance_edges | Only finalized artifacts referenced; tenant access independent of hash; restrictive lineage and expiry |
| Evaluation | evaluation_contracts, dataset_versions, experiments, trials, evaluation_receipts, exposure_ledger | Registered immutable experiment; complete cohort; protected final data and authenticated receipts |
| Release | bundles, eligibility, releases, cohort_assignments, recall_records | Content-bound manifests; current authority; atomic assignment changes; prior decisions retained |
| Audit/accounting | audit_decisions, usage_reports, price_versions, reconciliation_adjustments | Append-only decisions; known/estimated/missing values explicit; costs not inferred from null usage |

## Relational rules

- Include `tenant_id` in tenant-owned keys, unique constraints and foreign keys. Cross-tenant sharing is an explicit governed record with source authorization, never a missing tenant filter.
- Use immutable revision rows and versioned current-state projections. Historical rule/schema versions remain attached to decisions; the first version need not be a full event-sourced system.
- Use database time for lease deadlines. Serialize changes to a resource or budget account with locked rows or suitable compare-and-swap rules. Claim due work in short transactions; skipped locked rows still require domain eligibility checks.
- Store monetary amounts in fixed-point integer minor units with currency/scale, and token counters as bounded integers. Avoid floating-point currency. Estimates, reservations, reported use, and reconciled charges have distinct fields.
- Record usage coverage and provider/model/token class. Missing usage is unknown. Budget enforcement advertises the limits of delayed or opaque provider accounting.
- Store large payloads outside database command/outbox rows. References carry tenant, digest, byte length, media type, scope, and finalization state. A digest alone never authorizes a read.
- Protect audit, evaluator evidence, and exposure records through separate role privileges. Ordinary learners cannot update them. The application runs as a non-owner role with row policies as defense in depth.

## Admission transaction

1. Authenticate outside the database trust boundary; validate the command and canonical identity.
2. Begin a short transaction and load the authoritative current intent revision, grants, epoch, policy, bundle eligibility and required resources.
3. Check expected versions and current authority, intent stop conditions, adapter capabilities, and budget/concurrency availability.
4. Persist `(tenant_id, intent_id, intent_revision, grant_set_digest, authorization_epoch, bundle_digest, policy_revision)` with the attempt. Reserve controlled spend and resources, increment a lease generation as required, and write the command result, audit and outbox.
5. Commit before dispatch. A dispatcher may deliver more than once; downstream deduplication uses stable identities.

This transaction pattern does not make an external API transaction atomic with PostgreSQL. The broker commits the operation intent before dispatch and separately reconciles the provider outcome afterward. An absent receipt after dispatch must remain `outcome_unknown` until evidence resolves it.

## Retention and recovery

Before production, set explicit retention periods for raw prompts, artifacts, receipts, memory, evaluator data and audit; the owner must choose values appropriate to the workload. Revoked or expired sources block new learning/admission and recall affected descendants according to the spec. Record retained tombstones/digests when payload deletion is required and lawful. Do not promise erasure from uncontrolled external copies or automatic model unlearning.

Define backup and restore procedures for PostgreSQL and artifacts together. Restore qualification must detect missing referenced blobs, expired/revoked authority, stale leases, and operations whose provider outcome is uncertain. Schema changes use reviewed, forward-compatible migrations; rollback may require a forward repair instead of an unsafe down migration.
