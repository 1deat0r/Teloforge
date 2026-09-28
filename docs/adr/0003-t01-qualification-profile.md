# ADR 0003: T01 qualification profile

- **Status:** Proposed profile revision 0.2; no runtime is authorized or qualified
- **Profile revision:** 0.2
- **Date:** 2026-09-28
- **Tracking:** [Issue #4](https://github.com/1deat0r/Teloforge/issues/4), milestone T01
- **Scope:** One finite Markdown-link repair ending in a draft pull request

This document proposes a concrete first runtime profile for T01. It is not an implementation or a qualification result. The approved r2 specification and [T01 task](../tasks/T01-intent-execution.md) remain the requirements. This profile may add detail but cannot weaken their authority, provenance, artifact-handoff, or recovery rules.

## Decision summary

Qualify one owner-authorized repair to one relative Markdown link in one tracked documentation file. Pin the target repository, base branch and commit, file, intent revision, action budget, and expiry before admission. The model may propose one patch. A deterministic validator checks the exact changed file and link target. The owner approves the canonical patch digest before any repository write. A constrained runner checks the immutable candidate snapshot without repository scripts or network access. A broker writes the candidate branch to a staging fork in the target repository's GitHub fork network, then opens a draft PR in the target repository. The owner must also approve the repository automation profile because branch and PR writes can trigger downstream workflows, webhooks, integrations, and notifications.

Use a direct OpenAI Responses API adapter in the trusted TypeScript process, one explicitly pinned model profile, PostgreSQL as the sole durable authority, and a Rust runner using a fail-closed Linux bubblewrap profile. Do not expose arbitrary shell, general HTTP, provider-hosted tools, or merge/deploy operations to the model or broker.

The split credential authority is preferred because GitHub's merge endpoint requires target-repository `Contents: write`. A staging-writer App receives that permission only on the staging repository. A distinct target-PR App receives `Pull requests: write` and the minimum read access needed to inspect the target and staging head, but no `Contents: write` on the target. The PR app installation topology and API calls must be qualified against the selected fork and actual repositories; do not assume an installation token can span separate installations or that documented endpoint permissions prove cross-fork access. If the split cannot be demonstrated, stop and return to the owner for a revised grant decision. A single-repository `Contents: write` token is weaker: the broker can withhold merge, but credential compromise could still merge. GitHub's create-PR endpoint takes a base branch name, not an expected base SHA, so the profile records and handles that race explicitly below rather than claiming an atomic SHA precondition.

## Pilot contract

### Target and task

The pilot task is one owner-selected broken relative link in one tracked Markdown file. The model receives only the owner's task statement, the selected file, a bounded repository path index, and any owner-approved neighboring documentation needed to identify the correct destination. It proposes a replacement destination that already exists at the pinned base commit. The deterministic checker verifies that the replacement resolves inside the target repository and that the changed link is syntactically valid.

The task must not be accepted until the owner selects the target repository and one genuine broken-link occurrence, and supplies an acceptance rubric for the intended destination. A read-only scan of the current editable Teloforge Markdown documents found no missing relative links; the historical review snapshots and approved bundle are not eligible pilot targets. Do not manufacture a production defect or silently switch to a different workload. A disposable fixture can validate mechanics but cannot count as the live repository-maintenance qualification.

At admission, bind all of the following:

- immutable target repository ID, staging repository ID, and base commit SHA;
- one allowlisted Markdown file path and the identified link occurrence;
- owner-authored intent revision, acceptance criteria, and exact action grant;
- model profile, tool-schema version, checker version, runner image/runtime digest, and artifact policy;
- maximum input/output tokens, provider-call count, wall time, changed bytes, and expiry;
- owner-approved, versioned provider data-use consent and repository automation profile digests;
- a reserved operation identity for each provider call and repository write.

Bind both the target base branch name and its observed commit SHA. The current GitHub create-PR endpoint accepts a base branch name and does not expose an expected-base-SHA condition. Before any staging write and immediately before PR creation, fetch the target ref and require the observed SHA to equal the admitted SHA. The staging commit must be a child of the admitted base SHA. After PR creation, verify the returned base ref and SHA, staging head SHA, draft state, and canonical diff/metadata digest against the approval. If the ref drifts before a send claim, block without sending. If the race occurs after the final preflight and GitHub creates the PR against a different SHA, preserve the single PR receipt, move to `blocked_base_drift`, revoke further writes, and require fresh owner review; never rebase, close, recreate, or otherwise compensate automatically. The approval must disclose this residual race and authorize only that one draft-PR attempt. If the owner will not accept that bounded residual, the target branch must be held stable by an owner-controlled mechanism for the entire write window; Teloforge itself cannot promise the branch remained fixed atomically.

The candidate must change exactly one existing regular Markdown file. It may alter only one link destination. Reject added/deleted files, any mode/type change, binary or non-UTF-8 content, symlinks, submodules, workflow/code/dependency/configuration changes, extra hunks, path traversal, and output exceeding the admitted byte limit. Require the target link to resolve to an existing file or directory at the pinned base. No unrelated broken links need to be repaired.

### Intent, grant, and approval

This first profile has one tenant and one preconfigured owner. Authentication must resolve to the owner's pre-bound immutable GitHub numeric user ID; display names, email matches, first-login-wins, or model assertions do not establish ownership. The owner revises the intent and grants the task's resource, actions, budgets, and expiry through the authenticated control API.

An exact-action approval is required after patch generation and before any branch or PR write. It is bound to the target repository ID, staging repository ID, base SHA, canonical patch digest, changed path, deterministic-check receipt, PR title/body digest, intent revision, grant digest, authorization epoch, and expiry. A changed patch, base SHA, grant, PR metadata, or expired approval requires a new approval. The grant allows a staging branch write and creation/update of a draft PR; it does not authorize merge, deployment, target-branch writes, arbitrary issue/comment writes, or repository administration.

Before that approval, the work enters the owner-visible `awaiting_owner_approval` state. The approval view shows the full unified diff; target and staging repository IDs; base branch and pinned SHA; head SHA; deterministic-check receipt; patch, changed-path, PR-metadata, provider-consent, and automation-profile digests; exact external operations; reserved and maximum budgets; remaining expiry; and the known base-ref race. The authenticated owner can approve or reject the exact tuple. Rejection becomes a terminal `approval_rejected` execution state; expiry becomes `approval_expired`; revocation invalidates the pending approval and increments the authorization epoch. All three states are visibly non-executable. Approval is recorded as an immutable event and consumed once in the same transaction that admits the first external operation. Any material change requires a new approval.

OAuth is used only to establish the owner session. Use an exact HTTPS callback, one-use unpredictable `state`, PKCE S256, a short transaction lifetime, one-use authorization code handling, server-side identity lookup, secure opaque session cookies, CSRF checks on mutations, and session revocation. Do not use the OAuth token for repository effects. The GitHub App installations perform repository operations with short-lived installation tokens scoped to numeric repository IDs and minimum permissions.

### Model adapter and data boundary

The adapter calls the Responses API directly from the trusted TypeScript service. Use one owner-selected, exact model ID; `store: false`; foreground calls; no provider-hosted tools, remote MCP, browser, file-search, conversation, or background-mode features. Use a strict structured output schema and independently validate every response and tool request at runtime. Provider output is untrusted data. It cannot choose an operation, repository, path, authority, model, or credential.

Disable SDK-level retries (`maxRetries: 0`) so the durable operation state machine owns retry decisions. Persist a unique logical request identity, canonical request digest, budget reservation, and `dispatching` transition before sending. A lost response is an unknown outcome: retain its spend liability and record the request as uncertain. Do not assume provider-side idempotency or recover the model's hidden reasoning/session. Any explicit retry is a separately authorized attempt with a fresh reservation; unresolved earlier usage remains accounted as unknown.

Only bounded, owner-approved repository text crosses the provider boundary. Never include `.git`, environment files, credentials, secrets, private prompts, unrelated workspace data, or local machine paths. `store: false` is a request option and does not itself disable provider abuse-monitoring retention or other disclosed data controls. Before live qualification, the owner must approve an immutable, versioned `ProviderDataUseConsent` record containing provider and project identifiers, exact endpoint/model profile, purpose, permitted repository/content classes and byte limits, application-state setting, the actual project/organization retention mode as observed, known abuse-monitoring/retention behavior, local evidence retention, consent actor, creation time, expiry, and revocation state. Bind the consent digest to the intent revision, admission, and every provider operation. Before dispatch, confirm the consent is current and matches the resolved project/profile; show its summary in the exact-action approval view. Unknown or changed controls block provider dispatch. Use a dedicated provider project/key with the narrowest available response-creation permission, expiry/rotation, and provider-side spend/rate limits. Keep the key in a trusted secret store; never put it in the runner, candidate workspace, database row, outbox, source, or log.

### Runner and artifact boundary

The TypeScript kernel, authenticated API, PostgreSQL database, secret broker, and GitHub connector stay outside the candidate sandbox. The Rust runner accepts a versioned, runtime-validated command envelope; it does not parse a draft TypeScript type as proof of valid input. T01 exposes only typed operations for reading the admitted document, submitting one patch, and running the pinned link checker. It does not expose a general shell or execute repository scripts, package managers, hooks, filters, submodules, or LFS operations.

T01 supports only a local runner on the qualified host. The control process and runner supervisor use a permission-restricted Unix-domain socket, verify peer credentials, and bind every assignment to an authenticated runner identity, runner boot ID, one-use assignment capability, attempt ID, intent/grant digests, authorization epoch, lease generation, and runtime-profile digest. The capability is available only to the supervisor and is never inherited by candidate processes. The versioned envelope negotiates a supported major/minor protocol before assignment; an unknown major version, unsupported message kind, field, or limit fails closed. The assignment and outputs are typed operations, not commands or shell strings.

The runner spool is a bounded delivery buffer, never a task-state authority. Bound its bytes, records, age, and per-attempt output before assignment. Every event has boot ID, attempt ID, lease generation, monotonically increasing sequence, stable event ID, and canonical payload digest. The kernel commits validated event/result, audit, and any resulting outbox transition before acknowledging that sequence. Reconnect replays unacknowledged records in order; identical duplicates return the committed result, while an identity/sequence with a different digest is rejected and quarantined. A runner never infers success from a local spool acknowledgement. At a spool or consumer limit, the controller applies explicit backpressure and stops candidate output; it never drops a record and then reports success. Heartbeats and cancellation are fenced by the same boot ID, lease generation, and authorization epoch. Protocol conformance evidence must include reconnect, lost acknowledgement, duplicate, conflict, stale assignment, overflow, and backpressure cases.

The host profile is Linux x86_64 with a pinned bubblewrap/runtime/checker profile. `bwrap` availability alone does not qualify the boundary. Before launch, prove the exact unprivileged namespace, AppArmor, seccomp, cgroup-v2 resource-control, mount, environment, inherited-file-descriptor, and process-tree cleanup invariants on the target host. Candidate execution has no network, host home, host runtime sockets, provider/GitHub token, Docker socket, SSH material, or writable host path. The assigned workspace is the only writable mount. Do not fall back to host execution when any invariant is unavailable.

On candidate termination, kill and reconcile the complete process cgroup, prove no process or writable descriptor remains, then freeze an immutable snapshot. A separate unprivileged collector opens only declared regular files beneath the snapshot using descriptor-rooted, no-follow, no-cross-device resolution. Require link count one, bounded path/file/count/total-byte limits, hash bytes from the same file descriptor used to copy, and quarantine the artifact if any proof is missing. Finalized artifacts retain tenant, repository, base-SHA, intent, attempt, tool/checker version, and source provenance. Artifact failure prevents dependent task completion.

### GitHub effect boundary

Use two GitHub Apps with separate installation and key custody:

1. **Staging writer App:** installed only on the staging repository with `Contents: write` and no target-repository installation. It creates/updates the deterministic Teloforge-owned staging branch and commits the approved patch. Its token has no target-repository authority.
2. **Target PR App:** installed on the target and staging repositories so it can inspect the head and base. Grant `Contents: read` and `Pull requests: write`, but no `Contents: write`, administration, actions/workflows, secrets, deployments, or members permission. Its token is scoped to the two fixed repository IDs and opens/updates a draft PR from the staging head to the exact pinned target base. It cannot push content or use the merge endpoint on either repository, which requires `Contents: write` on the base repository.

The connector uses typed, constant endpoint/method templates and numeric repository/installation IDs. It does not accept arbitrary URLs, methods, GraphQL documents, or caller-supplied repository names. A deterministic branch name includes the work/operation identity. PR metadata contains an opaque operation marker, base/head SHA, task summary, changed path, check receipt, and budget summary; it contains no private prompt or host path.

Before an external effect, commit the exact operation ID, canonical-arguments digest, current grant and authorization epoch, budget reservation, lease generation, audit entry, and outbox row in one PostgreSQL transaction. Recheck authority at a fenced send claim immediately before dispatch. After an ambiguous branch or PR write, query the exact repo/ref or PR identity and accept only a receipt matching the expected operation marker, base/head SHA, and metadata digest. Conflicting or unavailable evidence leaves `outcome_unknown` for human reconciliation. Never retry an uncertain write by issuing a second create request.

The staging branch and target draft PR remain after completion. Closing/deleting them is a separate external effect and is not automatic compensation. The target repository's current PR rules must require the human-maintainer path and current CI before merge; the Teloforge app and broker have no merge operation. The owner must confirm target repository policy before qualification.

Treat branch creation and draft-PR creation as triggers for further GitHub effects. Before admission, bind an owner-approved automation-profile digest that enumerates target/staging workflow files at their pinned revisions, Actions enablement and default permission settings, relevant webhooks and installed integrations, deployment behavior, and the expected notification audience. Reject a profile containing unreviewed executable or privileged automation, including `pull_request_target`/`workflow_run` paths that can access secrets or perform writes, unapproved deployments, or integrations with unknown behavior. The exact pre-write check must revalidate the workflow tree/revision and available repository settings; the owner attests any organization-level secrets or integrations that the API cannot inspect. Unknown automation or an uninspectable required setting blocks the write. The one draft-PR event and its downstream workflow/notification effects are part of the owner's grant. Qualification includes a repository profile with prohibited automation that Teloforge blocks before branch/PR creation. App permissions alone do not constrain workflows, webhooks, or other integrations triggered by the API call.

### Operator lifecycle

- **Pause:** one transaction disables new admissions and future sends. An already claimed external operation proceeds to reconciliation; pause does not claim to undo it.
- **Cancel requested:** first revoke future authority and increment the authorization epoch, then request runner/process cancellation. Keep budget reservations and uncertain provider liability until they are reconciled.
- **Cancel confirmed:** only after process-tree cleanup and reconciliation of every operation that crossed its send linearization point. Preserve completed branch/PR effects; any cleanup requires separate approval.
- **Blocked:** name the unmet prerequisite, affected operation/resource, evidence available, and owner action needed.
- **Outcome unknown:** name the stable operation ID, possible external effect, spend liability, and reconciliation query/result. Do not offer a blind retry.
- **Awaiting owner approval:** show the immutable action tuple and consent/risk summaries above; only the authenticated owner can approve, reject, or revoke it.
- **Approval rejected / expired:** remain visibly non-executable; a new attempt requires a new owner command and current authority.
- **Blocked on base drift:** preserve the actual PR receipt if one exists, identify both observed base SHAs, and wait for a new owner decision; never amend the PR automatically.
- **Awaiting PR review:** execution/evidence are complete and a draft PR exists; the maintenance outcome remains pending human review/merge.

Cancellation request, runner termination, external-effect reconciliation, and confirmed cancellation are distinct events. Stale lease generations and authorization epochs cannot commit results or authorize later effects.

## Authority and persistence invariants

The following state is authoritative only in PostgreSQL: owner/session binding, intent and revision, grant and authorization epoch, budget reservations and accounting, work/attempt identity, resource lease and generation, external-operation identities and receipts, artifact metadata, audit, outbox, and materialized operator state. Runner spool data is an event-delivery aid; it is never an alternate authority.

Admission validates the authenticated principal, request schema, current intent revision, grant, profile, budget, exclusivity, expiry, and provenance before domain admission. One database transaction persists the admission binding, reservation, resource lease, command result, audit record, and outbox entry. The dispatcher claims from this durable outbox; it does not hold a database transaction open across a provider or GitHub request.

Idempotency keys bind to canonical arguments and expected revisions. Replaying the same identity/payload returns the stored result; reusing an identity with a different payload is rejected. Events are deduplicated by stable source/attempt/sequence identity plus payload digest. A stale runner boot ID, lease generation, authorization epoch, or intent revision cannot finalize state.

## Bounded maintained-intent triggers

T01 implements two explicit trigger classes, but only `manual_once` is enabled for the live pilot. A finite intent accepts one authenticated owner start and admits at most one attempt. A maintained intent may be represented only with a declared wake source, immutable trigger-policy revision, minimum interval, maximum runs per window, maximum total runs, maximum consecutive no-progress outcomes, wall-clock expiry, total and per-attempt budget ceilings, stop conditions, and an explicit owner grant. Each wake is a bounded, versioned trigger receipt with a stable source/event identity, observed time, intent revision, and payload digest; it cannot directly execute an action. The kernel deduplicates trigger receipts, evaluates the current policy/authority and budget, then separately admits work. Out-of-window, duplicate, stale-revision, paused, revoked, expired, over-limit, or over-budget triggers are recorded as rejected with a reason. No catch-up burst is allowed after downtime. There is at most one active attempt per exclusive resource. An unresolved provider or repository effect, repeated no-progress boundary, runner-loss ambiguity, or exhausted budget pauses further automatic wakes pending owner action. T01 acceptance exercises these rules with a deterministic synthetic event source; it does not install a recurring schedule or enable maintained execution for the live pilot.

## Atomic finalization

Artifact bytes are first copied into immutable, content-addressed storage and verified by the isolated collector; they are not authoritative until PostgreSQL records the finalization transaction. The kernel then rechecks the active attempt, current intent revision, grant digest, authorization epoch, runner boot ID, lease generation, and every stable operation identity. The finalization transaction binds the artifact/snapshot digest and collector receipt, deterministic-check receipt, provider request/usage state (known or explicitly unknown liability), branch/PR receipt state (known or `outcome_unknown`), command result, final budget settlement/reservations, audit event, outbox events, operator state, and transition revision. Repeated finalization with the same identity and digest returns the committed result; a conflicting digest is rejected.

The resource lease is released only after the runner supervisor proves the full process cgroup is empty, writable descriptors are gone, and the immutable snapshot is sealed. If cleanup proof is absent, keep the lease fenced and expose a blocked state. Enter `awaiting_pr_review` only when artifact/checker evidence is finalized, every external operation is known, the approved draft PR receipt matches the admitted head and metadata, provider usage is accounted (or any remaining uncertainty is explicit and policy-permitted), and no active runner or lease remains. Otherwise enter `outcome_unknown` or `blocked` with reservations retained. Human review/merge remains outside this finalization contract.

## Required qualification evidence

| Requirement | Evidence required before T01 is qualified |
| --- | --- |
| Owner authority | Authentication, callback/CSRF/session, non-owner, immutable-ID, and revoked-session negative cases; exact intent/grant/action-digest binding |
| Atomic admission | Concurrent admissions at a fixed budget and exclusive workspace; demonstrate no oversubscription and no duplicate lease |
| Replay/fencing | Restart and duplicate command/event receipts; conflicting payload rejection; stale revision, epoch, runner boot, and lease-generation rejection |
| Budget/unknown use | Provider timeout/lost-response case; reservation retained as unknown; no implicit SDK retry; explicit retry reserves separately |
| Sandbox | Host-path/env/FD/network/userns probes, resource exhaustion limits, cancellation and cgroup-wide cleanup; unsupported controls fail closed |
| Artifact handoff | Symlink, hardlink, FIFO/device, traversal, mount crossing, path substitution/TOCTOU, oversized file, and missing-snapshot-proof cases; zero host disclosure and no dependent completion |
| Broker authority | Permission receipts for both App installations; negative checks for target content write, merge, deployment, arbitrary URL/method, and repository substitution |
| Uncertain writes | Fault injection after branch/PR creation but before receipt; exact identity reconciliation or persistent `outcome_unknown`; no duplicate create; base-drift race is retained and blocked |
| Operator states | Pause/cancel around the send linearization point; owner approval/rejection/expiry/revocation; no premature confirmation; distinct blocked, unknown, awaiting-owner-approval, and awaiting-human-review states |
| Provider consent | Immutable consent digest binds provider/project, model, content classes, retention posture, purpose, owner, expiry/revocation; mismatched or unknown consent blocks dispatch |
| Downstream automation | Prohibited workflow/integration profile is denied before any external write; accepted profile digest is revalidated and recorded |
| Finalization | Duplicate/conflicting finalization, unknown effects, missing artifact proof, incomplete runner cleanup, budget settlement, and lease-release cases are atomic and fenced |
| Maintained triggers | Duplicate/stale/out-of-order trigger, downtime without burst, paused/revoked/expired intent, budget/run/no-progress cap, unknown effect, and exclusive-resource cases are evidenced against a synthetic source |
| Runner transport | Version mismatch, unauthenticated assignment, replay/conflict, lost ack/reconnect, bounded-spool overflow and backpressure preserve database authority |
| End-to-end pilot | Owner-approved task and exact patch digest; one staging commit; one target draft PR; deterministic validation and complete provenance/budget receipt |

Build, typecheck, or static CI results alone do not satisfy runtime qualification. Each result must identify the exact host/runtime/profile, test inputs, observed result, and remaining limitations. No live provider or GitHub qualification is claimed by this proposal.

## Owner decisions before implementation qualification

1. Target repository, one genuine broken-link occurrence, destination rubric, and staging fork in the target's GitHub fork network.
2. Target/staging repository installation topology that allows the two-App split, plus the target and staging automation profiles. The split is unqualified until the actual scoped tokens pass positive and negative API calls; do not fall back to target `Contents: write` if it fails.
3. Provider account/project, exact model ID, approved API credential store, maximum spend, and explicit acceptance of the observed retention posture in a versioned data-use consent record.
4. Target host profile and whether the verified bwrap/AppArmor/seccomp/cgroup conditions can be maintained for qualification.
5. Owner confirmation of the pre-bound GitHub numeric user ID, PR/check/merge rules, permitted downstream automation/notifications, and acceptance of the bounded base-ref race or a branch-stability mechanism.

These choices cannot be inferred from the prose request or agent-generated configuration. Use a synthetic fixture for development while they remain open; do not describe fixture evidence as live T01 qualification.

## Rejected shortcuts and limits

- **Authenticated coding CLI session as model adapter:** rejected for T01. It is not a dedicated provider API profile with explicit cost, retry, storage, and operation accounting.
- **General-purpose shell or repository scripts:** rejected. The selected task is expressible through a narrow document read/patch/check contract.
- **One target-repository Contents-write token with a claim that it cannot merge:** rejected. The broker can deny merge, but the token itself can merge.
- **Background provider calls with `store: false`:** excluded from this profile until their data-retention behavior and reconciliation value are explicitly accepted.
- **Automatic cancellation cleanup or blind retry:** rejected because a completed/unknown external write cannot be safely treated as absent.
- **Unqualified bwrap host fallback:** rejected. Failure to establish the target profile leaves the capability disabled.
- **Treating GitHub PR creation as a harmless metadata call:** rejected. It may trigger workflows, webhooks, integrations, and notifications, which must be disclosed and included in the owner grant.
- **Claiming the PR targets an immutable branch SHA:** rejected. The endpoint accepts a branch name; the bounded preflight/post-receipt and base-drift stop state are required.

## Sources to verify during implementation

- [T01 requirements](../tasks/T01-intent-execution.md) and [artifact handoff contract](../CONTRACTS.md)
- [OpenAI function calling](https://developers.openai.com/api/docs/guides/function-calling), [Responses data controls](https://developers.openai.com/api/docs/guides/your-data), and [Node SDK retry configuration](https://github.com/openai/openai-node/blob/main/docs/configuration.md)
- [GitHub installation-token scoping](https://docs.github.com/en/rest/apps/apps), [GitHub App installation and repository selection](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party), [create a reference](https://docs.github.com/en/rest/git/refs#create-a-reference), [create/merge pull request endpoints](https://docs.github.com/en/rest/pulls/pulls?apiVersion=2026-03-10), and [workflow trigger/security behavior](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows)
- [bubblewrap security model](https://github.com/containers/bubblewrap/blob/main/README.md) and [cgroup v2 controls](https://docs.kernel.org/admin-guide/cgroup-v2.html)
