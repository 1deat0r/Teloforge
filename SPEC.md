# Teloforge project specification

Spec: **0.3 / project review r2** · Design date: **28 September 2026**

## Status and authority of this document

This portable project specification incorporates the product requirements from the reviewed Teloforge r2 design and the execution foundation it extends. It adds a repository map and current implementation status. The original reviewed bytes are preserved in [the approved bundle](docs/approved/MANIFEST.json).

- Normative product source: [Teloforge r2](docs/approved/teloforge-design.md), SHA-256 `e7aaed19d3eaeaead4fb309d22ba0b3a01812542cbe96da69f2342b6dbdcce3a`.
- Execution foundation: [Keel v2](docs/approved/keel-v2-design.md), SHA-256 `0500d972bfb57b3e232b2738bebbc62cc9a9fb99876975c21f1d4931273ac8f3`.
- [Five-reviewer design record](docs/approved/teloforge-review.md): all five returned BUILD on r2, with no unresolved material blocker. The separate project-spec review is governed by the gate below; source implementation remains unqualified.

Where requirements conflict, the current project specification and its explicit revision resolutions take precedence; the incorporated r2 product requirements take precedence over the older execution foundation. Historical statements that implementation was not authorized describe the earlier review task. The user's subsequent instruction authorized creating this project and scaffold. It did not implement or satisfy the T01–T04 gates. The current [roadmap](docs/ROADMAP.md) replaces the archived tickets' historical status wording.

“Must,” “required,” and descriptions of runtime behavior below specify the target system. They are not claims about the scaffold. The actual delivered behavior is inventoried in [implementation status](docs/IMPLEMENTATION.md).

## Current project-spec review gate

This review concerns the implementability and internal consistency of this project specification and its supporting contracts, data model, roadmap and task requirements. It does not approve working runtime code, certify security, or establish measured superiority. Existing scaffold files are preparation authorized by the user; T01–T04 implementation remains behind this review gate.

Five isolated expert seats cover distributed execution, evaluation/statistics, adversarial authority boundaries, product/developer feasibility, and a final cold integration read. Every seat must return BUILD on the same final normative revision, with every material blocker closed by text and fresh reviewer quotes. CONDITIONAL or REJECT prevents gate closure. Reviewers may dissent; approval must not be inferred from silence or compelled. Reviews are parallel where available concurrency permits, with no exchange of peer reasoning before verdicts.

The skill normally caps review at about five rounds. The user's explicit instruction is to continue until all approve, so continue substantive revision and re-review while meaningful progress remains possible. An actual unresolved external decision is recorded openly rather than replaced with a fabricated approval. No product runtime implementation begins as part of this spec-review task.

The normative specification ends at the marked boundary near the end of this file. Its SHA-256 and the supporting-document hashes pin each review in `docs/reviews/round-N-manifest.json`. The board record and adjudication log below that boundary are nonnormative review evidence; appending a verdict cannot alter approved requirements. Any normative change requires a new revision and fresh final votes from all seats. Full verdict text is retained under `docs/reviews/`.

## Product summary

**Teloforge** (TEL-oh-forj) combines purpose, or *telos*, with building and refinement. It is an intent-driven agent harness with governed execution and a separate, evidence-controlled improvement loop.

The first customer workflow is repository maintenance: maintain an ongoing condition or complete a finite change, produce reviewable pull requests, and expose evidence, spending, uncertain effects, and decisions. The user remains the authority for goals, constraints, grants, and budgets. Configuration evolution can continue when there is a justified opportunity and available experiment budget.

The architecture aims to improve accepted outcomes, accuracy, quality, latency, total resource use, and token efficiency on declared workloads. Conflicting objectives require explicit tradeoffs. Superior results against Paperclip remain a hypothesis until a controlled comparison measures them.

The upstream comparison is pinned to Paperclip commit `0f14d261233c545aa6a8a38ec253c498a5130fff` from 27 September 2026. Its source already contains runner/protocol, evaluation, governance, and durability work; see the [original foundation and citations](docs/approved/keel-v2-design.md). Teloforge's proposed benefit is the integrated intent, authority, evidence, and improvement contract. This scaffold contains no copied Paperclip implementation.

## Scope and implementation boundary

| Stage | Included | Exit requirement |
| --- | --- | --- |
| S00, delivered | Documentation, workspace, draft ports, disabled entry points, local DB configuration | Files supplied with explicit implementation status; no runtime qualification claimed |
| T01, pending | Intent lifecycle, authentication, atomic scheduling/admission, one qualified adapter, action receipts | Execution and authority invariants demonstrated |
| T02, pending | Fixed baseline and complete outcome/resource accounting | Repeatable cohorts with missingness and variance recorded |
| T03, pending | Bounded context/skill/routing experiments, independent evaluator, registry and canary control | Registered comparison, valid receipts, bounded rollout and rollback |
| T04, deferred | Additional adapters, optional code evolution, broader workflows | Separate compatibility, isolation, effects and migration gates |

The intended initial deployment is one TypeScript modular control application, PostgreSQL, one Rust runner, and a scoped artifact directory. Evaluation and evolution use asynchronous workers with separate identities and budgets. Start with PostgreSQL scheduling and full-text retrieval. Add workflow infrastructure, vector search, or a Python service only for a demonstrated requirement.

## Specification map

1. Product contract and measured objectives.
2. Execution and improvement loops and their responsibilities.
3. Evolving configurations, token efficiency, and evaluation.
4. Intent authority, data scope, evaluator isolation, and exposure control.
5. Complete experiment and release decisions.
6. Language choices, evidence limits, and inherited execution foundation.
7. Repository delivery and acceptance boundary.

## Product contract

The user states a desired outcome, constraints, priorities, permitted actions, and whether the intent is a finite achievement or an ongoing condition. Teloforge maintains a plan, checks observable results, and selects an approved execution configuration. A separate learning process searches for better configurations. Continuous evolution means repeated opportunities to improve, with evidence-based releases. It does not promise uninterrupted activity, improvement after every experiment, or simultaneous global maxima across conflicting objectives.

An intent record contains an owner and revision; desired outcome; observable acceptance criteria; quality and accuracy requirements; time and budget limits; permitted resources and actions; trigger or schedule; stop conditions; explicit tradeoff priorities; assumptions and unresolved choices. Intent revisions retain their author and provenance. Consequential missing authority cannot be inferred from a broad desired outcome. Changes to the owner's goals, grants, and spending limits use the owner's authorization rules.

For example: keep a repository's dependencies within an update policy, prepare reviewable PRs, preserve required compatibility, spend within an explicit daily budget, and leave merging and deployment outside the grant. This example is a proposed intent, not an instruction to schedule work in this chat.

## Optimize a measured tradeoff

Use constrained, multiple-objective optimization per task class. First enforce permissions and resource limits and reject candidates that fail required correctness, quality, or regression gates. Among eligible candidates, retain useful tradeoffs between accepted outcome rate, quality, completion time, total cost, tokens, and human effort. The intent selects among these versions. An accuracy-first task may spend more on independent verification; a routine task may prefer an economical configuration that meets its requirements.

A Pareto archive stores configurations for which no other measured configuration is at least as good on every relevant objective and better on one. Estimates carry sample counts, uncertainty, task distribution, and evaluation version. Do not remove a useful specialist solely because its global average is lower. When evidence is sparse, retain the incumbent and collect more evidence under the experiment budget. Quality floors are evaluation criteria with uncertainty; they are not universal guarantees about every future result.

| Objective | Measurement | Potential improvements |
| --- | --- | --- |
| Performance | End-to-end completion latency, tail latency, throughput under declared load | Better scheduling, dependency-aware parallelism, fewer unnecessary round trips |
| Accuracy | Correctness checks, factual support, error severity, rate of unverified completion | Better retrieval, suitable models, deterministic checks, independent verification |
| Quality | Task-specific rubric, user acceptance, maintainability or usability where relevant | Better skills, planning, review, and context selection |
| Efficiency | Total dollars, compute and human intervention per accepted result | Better routing, reusable artifacts, fewer failed attempts, simpler workflows |
| Token efficiency | Total reported tokens across the cohort per accepted result, with coverage limits | Targeted context, selective tool loading, bounded tool output, useful summaries, fewer redundant calls |

Always report acceptance rate beside per-accepted-result ratios so that a system cannot appear efficient by skipping difficult tasks. Define cohorts before analysis. Include failed, retried, cancelled, and timed-out attempts under the chosen accounting policy; report those categories explicitly. With zero accepted results, the ratio is undefined or unbounded, never zero. Include verification, judge calls, and improvement experiments in system-wide cost; also show execution and improvement spend separately. Amortization assumptions must be stated and later checked against realized use.

Raw tokens are not directly equivalent across different tokenizers. Keep input, output, cached-input, and available reasoning-token usage separated by provider/model, plus price and wall time. Caching may reduce billed cost or computation without reducing logical input length. Unknown or unavailable usage remains unknown. Compare money and accepted outcomes alongside tokens when models differ.

## Two loops, with separate authority

**Execution loop:** observe the current state, compare it with the intent, propose a plan, admit work through the kernel, act through qualified runtimes and the broker, commit evidence, assess progress, and replan when necessary. Replanning uses outcomes and stop conditions, including no-progress limits. The diagram's planner-to-execution edge includes logical request/result interaction; outcome references and materialized intent status are available through the kernel API. The diagram omits these return arrows to keep the primary paths readable.

**Improvement loop:** identify a recurring failure or measurable opportunity, propose a candidate, evaluate it in an isolated environment, compare it with the incumbent, apply promotion rules, release to a limited cohort, monitor, and retain or roll back. Candidate rejection is an expected result. Successful production runs are useful evidence, but a favorable anecdote does not establish causality.

The evolution lab submits trial requests to an independently controlled evaluator. Trial execution uses the same runner contracts with copied environments, fixtures, or specifically authorized test resources. Replaying a trace does not reproduce stochastic model behavior or authorize repeating real external writes. Evaluation workers persist artifact-bound receipts through the kernel API. The promotion gate checks those receipts against the exact candidate digest, baseline, dataset version, model metadata, and evaluation contract. The lab cannot edit evaluator code or a promotion decision through its ordinary execution identity.

## Responsibilities in the diagram

| Component | Responsibility |
| --- | --- |
| Intent contract | User-visible desired outcome, priorities, constraints, scope, and authority |
| Intent planner | Construct and revise work plans; select an eligible approved bundle for the intent |
| Governed execution | The v2 TypeScript kernel, Rust runner, isolated environment, and action broker; sole authority for work state and effects |
| Durable state and context | PostgreSQL for structured authoritative records; versioned artifact storage for larger data |
| Evaluation contract | Separately governed criteria, grading rules, dataset splits, regression cases, and release thresholds |
| Outcome evaluator | Verify outcomes, run isolated comparisons, measure resource use, and issue evaluation receipts |
| Evolution lab | Generate candidate changes and request bounded experiments; retain experimental variants |
| Promotion gate | Check independent evidence and authority, control limited rollouts, and initiate rollback |
| Active bundle registry | Approved manifests and rollout assignments; historical versions remain inspectable |

These modules do not introduce another task-state authority. Intent records, evaluation metadata, release decisions, and registry manifests are domain records in the same authoritative system. The registry-to-planner edge supplies available versions. The kernel verifies eligibility when admitting a plan, and the runner launches the pinned bundle. Active work stays on its admitted version unless an explicit checkpoint migration is supported. Revoked permissions apply immediately even when a run remains on an older bundle.

## What may evolve

Start with context selection, scoped memory, skills, prompts, model routing, tool selection, reasoning budget, verification policy within required floors, and bounded recovery procedures. A bundle records the relevant versions and compatibility requirements. An optimization may remove unnecessary steps when evidence supports removal, including multi-agent stages that cost more than they contribute.

Add code evolution after the release process is established: generate candidate patches in an isolated checkout, evaluate them, and deploy versioned artifacts through the release controller. Runner, protocol, storage migration, and credential-boundary changes receive their own compatibility and release gates; rollback cannot assume an irreversible schema migration is reversible. The learner may propose changes to protected components, but cannot install them or widen its own authority. Kernel invariants, audit history, grants, and promotion rules stay outside the ordinary mutation surface.

Harness adaptation does not change a hosted model's weights. Fine-tuning a supported model would be a separate versioned training and evaluation pipeline, justified by the workload and authorized data use. It is not required for the first version.

## Concrete token-efficiency work

- Retrieve only context relevant to the current decision, with source references and version tracking.
- Keep an authoritative full record while assembling a smaller working context; preserve constraints, unresolved questions, and artifact references through compaction.
- Load applicable tools and skills selectively, retaining a way to discover missing capabilities.
- Filter large tool outputs before model ingestion while preserving retrievable source data.
- Reuse validated artifacts and cache results with tenant, permission, version, and freshness checks.
- Use deterministic code for suitable transformations and checks; evaluate economical model routes on their assigned tasks.
- Bound reflection and retries by measured progress, and remove duplicate analysis or unnecessary agent handoffs.

Evaluate omissions as well as token savings: a shorter context that drops a requirement fails the relevant gate. Protect rare cases and tail latency; an average gain is insufficient if a required class regresses. A stronger model that solves a task in one attempt can use fewer total resources than several cheaper failed attempts.

## Evaluation and promotion

Keep development feedback separate from held-out release evaluation. Repeated adaptive queries can overfit even a held-out set, so budget access, add fresh cases, and retain an independently governed final gate. Use matched environments, comparable task sets, and repeated trials to estimate variance. Separate model/provider changes from harness changes where possible. Store model aliases and resolved metadata; an alias alone cannot pin hidden model weights.

Combine deterministic outcome checks, domain rubrics, calibrated model judges, and sampled user or expert review as appropriate. The optimizer cannot rewrite acceptance criteria during an experiment. Evaluation definitions can evolve through a separate versioned process, with a new comparison baseline where necessary. Monitor for objective drift, benchmark gaming, selective task admission, and regressions concealed by aggregate scores.

Select experiments by expected value of information and expected operational benefit within a distinct resource budget. Avoid unbounded always-on self-experimentation. Trigger evaluation on enough new evidence, repeated failures, provider/model changes, or agreed review intervals. Pause search when marginal evidence is insufficient to justify further cost, while continuing normal execution and observation.

A release must satisfy the current intent's required gates, demonstrate a useful tradeoff with adequate evidence, and pass relevant regression checks. Begin with a limited eligible cohort. Watch actual outcomes and costs, then expand or roll back. Rollback changes future admissions and can stop affected work; it cannot undo an external action already completed. The v2 effect-reconciliation rules continue to govern those cases.

## Intent authority and revision binding

The kernel authenticates a tenant-scoped principal and checks explicit role grants for every intent operation. Roles are capabilities, not agent-generated labels. One person may hold several roles, but the mutation learner cannot hold the owner, grant-administrator, evaluation-custodian, or release-administrator role through its ordinary execution identity.

| Principal | Authorized operations | Limits |
| --- | --- | --- |
| Intent owner / explicitly appointed grant administrator | Create intent; revise goals, acceptance criteria, priorities, budgets and grants; appoint or remove delegates; pause or cancel | Authenticated membership and resource authority required. Cannot grant rights the principal does not possess. |
| Delegated operator | Start, pause, cancel, or retry within an explicit resource/action/budget scope | No widening of intent, grants, or budget; no onward delegation unless the owner explicitly permits it with a scope and expiry. |
| Action approver | Approve a specified action digest or explicitly bounded action class | Approval cannot expand the underlying grant; current revocation and expiry still apply. |
| Planner / learning worker | Propose plans, intent amendments, and candidate bundles | Proposals cannot activate an intent amendment or a wider grant. |
| Release service | Assign an eligible bundle under an existing release policy | Cannot revise the user's intent or grant its own new capabilities. |

Delegated scope is the intersection of all parent grants, with the earliest expiry. Revoking a parent invalidates its descendants. API checks enforce the matrix independently of prompts. Admission atomically binds the plan and attempt to `(tenant_id, intent_id, intent_revision, grant_set_digest, authorization_epoch, bundle_digest, policy_revision)`. The kernel checks current versions before dispatch; each consequential broker call checks the binding and current authorization again. A stale revision or authorization epoch fails closed and produces a recorded reason.

Activating an intent revision invalidates further dispatch and governed actions under its older revision. Active attempts may retain partial computation and artifacts, but cannot finalize against the new intent or issue further governed effects until reconciled and explicitly readmitted. No silent authority migration occurs. Pause, cancellation, grant revocation, and expiry deny future governed effects, revoke relevant credentials, and request process termination as appropriate. Already-issued external requests follow the foundation's outcome-unknown reconciliation rules. A user can inspect the author, diff, authority scope, and affected attempts for every revision; historical evidence remains bound to the intent under which it was produced.

## Learning data scope and derivation

Every learning input and derived artifact carries source lineage, tenant scope, confidentiality classification, authorized data uses, retention/expiry, and revision identifiers. This includes prompts, skills, memories, embeddings, evaluation fixtures, transcripts, candidate code, aggregates, and any trained model artifact. Derived outputs inherit the intersection of permitted uses and access audiences of all inputs; provenance cannot be discarded by summarizing, embedding, or calling an output a generic lesson. Unknown provenance blocks learning use and promotion until resolved.

The default learning and promotion scope is the originating tenant. A multi-tenant derivation has no shared audience unless each contributing owner's data-use policy explicitly authorizes that audience and purpose. The kernel, dataset service, artifact access layer, and registry independently enforce these labels when trials are admitted, datasets are read, and bundles are assigned. Model-generated assertions about being sanitized do not authorize declassification.

Cross-tenant aggregation or global release requires recorded authorization for every contributing source, approval by the authorized data steward, and an independent leakage review with adversarial extraction and contamination checks appropriate to the artifact. Passing a leakage check is insufficient without data-use authorization. Publicly licensed or independently authored inputs can use their documented permitted scope. Revocation or expiry blocks new learning and admissions, marks affected descendants ineligible, and triggers release recall and cache/artifact handling under the retention policy. Existing external copies cannot be retroactively erased; do not promise automatic machine unlearning. T03 must demonstrate tenant A's private evidence cannot enter tenant B's datasets or active bundles.

## Evaluator execution boundary

The trusted evaluation controller owns sandbox creation, trial identity, quotas, teardown, and evidence collection. It runs outside the candidate's sandbox. The candidate gets a read-only versioned bundle image and a disposable writable task workspace. Evaluator reference data, holdout answers, grading code, and the evaluation contract remain immutable and outside candidate-writable mounts. Task-facing input fixtures may be copied into the workspace when the task requires modifying them; trusted originals remain outside it. The trusted controller orchestrates artifact collection and isolated grading under the handoff contract below. It never parses or executes candidate content in its own process and never accepts candidate-authored success flags or logs as grading authority.

The candidate cannot access evaluator signing credentials, database credentials, control APIs, host sockets, privileged mounts, or the receipt store. Separate identities, filesystem/mount boundaries, compute limits, and enforced network egress implement that restriction. All authorized test effects go through a broker with test-only credentials and explicit destinations. Live production writes are denied in evaluation; any later experiment requiring real writes needs a separately scoped intent and is not an offline replay. Tool outputs, retrieved documents, generated tests, and candidate artifacts are untrusted inputs to the evaluator. A model judge's narrative cannot mint receipts or decide release authority.

The controller authenticates receipts covering candidate and baseline digests, intent and contract versions, dataset snapshot, test environment and runner identity, trial nonce and sequence, source-data scope, raw evidence digests, measurements including missingness, and grader versions. Keys never enter the candidate sandbox. The gate checks identity, signature or authenticated-service provenance, replay/deduplication rules, complete expected trial membership, and referenced immutable evidence. Receipt failure or a compromised environment quarantines the experiment and prevents promotion. T03 must include attempts to overwrite grading fixtures, forge receipts, access evaluator credentials/control APIs, bypass test egress, and conceal a missing trial; all must yield zero accepted forged or unauthorized results. This is a required future test, not a claimed test result.

## Candidate artifact handoff and grading isolation

This contract applies to candidate workspace files and uploaded content before they can become evaluation inputs or completion evidence. Content integrity identifies bytes; it does not establish that those bytes are safe or that their claims are true. A minimal collection service uses a separate, unprivileged identity with no evaluator signing keys, database credentials, host secrets or receipt-store access. Its readable mounts contain only the explicitly assigned workspace snapshot; it cannot read arbitrary host paths.

Before collecting workspace files, terminate the candidate process tree, including descendants, and detach a frozen read-only snapshot from every candidate-writable mount. If the controller cannot prove termination and snapshot immutability, quarantine the handoff and withhold grading/completion; do not copy files from a live mutable workspace. Streamed runtime logs use a separately bounded data channel and cannot bypass this file-collection or finalization contract.

Collection is descriptor-rooted beneath the assigned snapshot using an OS-enforced beneath-root, no-follow traversal; checking a string path and later reopening it is insufficient. Accept only predeclared allowlisted relative paths and regular files whose link count is exactly one. Reject absolute paths, parent traversal, symlinks at any path component, hardlinks, sockets, FIFOs, devices, mount crossings, and other special files. Inspect metadata on the opened descriptor; hash and copy that same opened object without reopening a candidate-controlled path. Enforce registered file-count, path-depth, per-file byte, total-byte, CPU and wall-time limits before finalization. A host or adapter that cannot enforce these semantics cannot qualify for this collection profile.

Treat archives as opaque bytes at collection. Any requested extraction, rich-document parsing, image decoding or other interpretation occurs in a fresh disposable, credential-free processing sandbox with bounded CPU, memory, time and output. It has no host sockets, privileged mounts, control/receipt APIs or unauthorized network egress. Reject archive traversal, absolute paths, link/special-file entries and decompression expansion beyond registered limits. Re-collect extracted outputs under the same descriptor-rooted rules. A parser crash or quota breach is classified evidence of failure, never permission to retry the parser inside the trusted controller.

Execute candidate code or candidate-supplied tests only in a fresh credential-free execution sandbox, separated from the scoring authority. Immutable grading programs and reference answers remain outside candidate-executable processes and candidate-accessible mounts. Parsing/code execution cannot share the controller's identity, keys or address space. The separately controlled scorer may consume bounded observations and collected outputs under the declared evaluation contract; candidate stdout, parser output and self-reported pass flags remain untrusted observations, not authoritative verdicts. Reference answers and protected grader resources never enter a sandbox that executes candidate code. The controller accepts only a bounded, schema-validated result from the designated evaluator identity, bound to the trial and artifact digests; it constructs/signs the receipt itself and does not deserialize executable objects or load candidate plug-ins. Failure outcomes can be audited, but no candidate-authored or forged success receipt can be accepted.

T01 must qualify the workspace/upload collection path. T03 must exercise symlink and host-path capture, hardlink/mount escape, path substitution, FIFO blocking, device/socket access, archive traversal/decompression expansion, malicious parser inputs and executable artifacts, and forged grader output. Required outcome: zero host-secret disclosures, zero candidate/parser execution in the trusted controller, and zero accepted forged or unauthorized grading results. Unsafe inputs are rejected/quarantined under the ordered experiment decision rule; failed or incomplete evidence cannot promote a candidate. These are future acceptance requirements, not claims that these scenarios have run.

## Evaluation exposure policy

The evaluation custodian controls final-gate datasets and grading versions. The learner and candidate developers may inspect development cases and their diagnostic feedback. They cannot inspect hidden final-gate cases, reference answers, per-case outputs, or raw final evidence. Candidate execution receives only the task inputs necessary for its trial; final-trial memory, transcripts, and filesystem changes are quarantined from learner memory and are not reused as development evidence. Only the independently controlled gate reads the detailed final result. The lab receives an aggregate decision with no case-level diagnostic disclosure.

An append-only exposure ledger records dataset/case version, candidate lineage and digest, baseline, caller, granted visibility, trial count, returned feedback, timestamps, and data-use scope. The default final-gate reuse limit is **one pre-registered candidate-versus-baseline experiment per sealed dataset version**, with its paired trials and planned looks fixed beforehand. Retire that version from final-gate use once the decision or any result is disclosed; a rerun after an infrastructure failure also consumes that exposure. Retired cases may become development cases only if their data-use policy allows it. Each subsequent experiment uses a fresh, separately curated set excluded from prior development and gate exposures. If no eligible fresh cases remain, HOLD promotion. A larger reuse allowance requires a new independently approved evaluation policy with a justified adaptive-testing method before any reuse; it is not a learner-controlled toggle.

Disclosing detailed gate feedback for debugging always retires the affected set and marks all descendants developed from that feedback as exposed. They require a fresh independent final gate. The custodian checks task/source/time splits, lineage and similarity for known contamination and replenishes representative strata from authorized sources. Unknown model pretraining contamination is recorded as a limitation. The registry does not treat previously valid receipts as evidence for a changed candidate or a changed evaluation contract.

## Complete experiment and rollout decisions

Before final evaluation, an immutable experiment manifest records: owner; hypothesis and falsifier; candidate and incumbent digests; eligible task strata and fixed weighting; primary comparison and direction; minimum useful effect; accuracy/quality floors; non-inferiority margins for protected metrics and strata; cost/token accounting; sample and repeat counts; maximum budget; uncertainty estimator and confidence level; treatment of paired or clustered tasks; permitted looks and multiplicity correction across metrics/candidates; missing-data rules; and rollout thresholds. Numeric values are required and justified from T02 baseline data before execution. Missing fields or an unjustified statistical method prevent final-gate admission. Keep an exploration archive distinct from the release-eligible registry: apparent Pareto membership alone cannot release a candidate.

The default comparison is fixed-sample with one final look. Sequential methods require their stopping and error-control rules to be specified in advance. A candidate is compared with its concurrent incumbent on the registered workload. When model and harness changes cannot be isolated, report the result as a bundle effect; component attribution stays UNVERIFIED. Timeouts and task failures count in the admitted cohort; missing acceptance evidence counts as unaccepted. Missing usage or grader evidence is flagged and blocks an efficiency/quality claim that depends on it. No selective reruns or exclusions may be introduced after results are seen. Any documented infrastructure-failure policy must be symmetric between candidate and baseline and consume the appropriate exposure/budget.

Apply the following ordered decision rule, taking the first matching branch:

1. **REJECT / DIES:** any authority, data-scope, evaluator-integrity, or critical correctness violation; or complete valid evidence establishes failure of a registered mandatory quality, regression, cost, or budget limit. Quarantine invalid evidence, make the candidate ineligible for release, and retain the incumbent.
2. **HOLD / WEAKENS:** required evidence, data, or manifest fields are missing, invalid for a non-compromise reason, underpowered, inconsistent, or inconclusive under the registered rule; budget exhaustion before a conclusive result also lands here. Retain the incumbent. A revised experiment is a new registration with a fresh applicable gate; no automatic indefinite retry.
3. **PROMOTE TO CANARY / SURVIVES:** complete valid evidence satisfies every registered floor and non-inferiority margin and demonstrates the registered useful improvement under the specified uncertainty/multiplicity method. A lower resource cost counts only with required quality maintained; greater quality may count at a higher cost only when the intent and registered limits permit that tradeoff.
4. **RETAIN INCUMBENT / WEAKENS:** all remaining complete valid outcomes, including a tie or no sufficiently useful improvement. The candidate may remain an experimental specialist, with no production assignment.

These categories are total and ordered; a Pareto claim never overrides an earlier branch. The gate emits its branch, evidence references, policy version, and reason. The experiment owner is accountable for interpretation, while the release service enforces the registered decision and current authorization.

Before canary admission, register the eligible cohort, control assignment, maximum traffic/task count and exposure, observation window and minimum sample, primary and protected metrics, explicit expansion and rollback thresholds, allowed looks, and the owner. During the window, confirmed authority/integrity violations or a registered harm threshold immediately stop candidate admissions and trigger recall/rollback. If these do not apply, missing critical telemetry or the exposure cap stops new candidate admissions and holds the rollout. Expansion occurs only at a registered decision point after all window/sample and statistical gates pass. An inconclusive or incomplete rollout at its deadline reverts future admissions to the incumbent and closes without expansion. Zero traffic stays inconclusive. Rollout state transitions and selected bundle versions commit atomically and recover after restart. Stopping a rollout cannot undo completed external effects.


## Deployment and languages

Retain TypeScript for product, intent, kernel, registry, and release rules; Rust for process supervision and execution boundaries; PostgreSQL/SQL for durable decisions. Use Python for experiment analysis or optimizers when its libraries help. Start the intent and registry modules in the control application. Run evaluation and evolution workers asynchronously with separate identities and resource limits so search cannot starve production. This is a logical extension of the v2 deployment, not a requirement to install another workflow server.

## Evidence and limits

GEPA provides a research precedent for using execution feedback to propose and compare prompt changes. ACE investigates evolving context playbooks. The Darwin Gödel Machine investigates evaluated changes to agent code. These are candidate techniques to benchmark in Teloforge, not evidence that Teloforge already improves or that the same gains will transfer to its workloads. [GEPA](https://arxiv.org/abs/2507.19457) · [ACE](https://arxiv.org/abs/2510.04618) · [Darwin Gödel Machine](https://arxiv.org/abs/2505.22954)

Anthropic's harness work emphasizes revisiting scaffolding as model capabilities change; its evaluation guidance describes outcome checks, repeated trials, and capability versus regression evaluation. Those principles inform this proposal. [Harness design](https://www.anthropic.com/engineering/harness-design-long-running-apps) · [Agent evaluation](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

This architecture does not establish a new feature's absence in Paperclip, and no comparative performance claim has been demonstrated. The product-level comparison should use the same workload and appropriately controlled model conditions, including development and evaluation expense, accepted outcome rate, quality, tail latency, and human intervention. The delivered diagram's validation measures presentation and artifact integrity only.

## Execution foundation

The following requirements carry forward from the reviewed v2 foundation.

### One authoritative work kernel

Use a TypeScript modular monolith with domain modules for identity, goals, work, run admission, resource ownership, budgets, approval policy, action receipts, and finalization. PostgreSQL is the authority for their persisted state. API handlers, timers, human decisions, and runner events submit commands to the same domain rules. A pure transition function produces decisions and declared effects; a transaction checks the current version, updates state, and writes audit and outbox records. Commands carry idempotency keys and expected revisions. Historical decisions retain their schema and rule versions.

The organization chart describes responsibility. Explicit work dependencies determine what may run. A work item, a run attempt, a provider session, a turn, and a logical external operation have different identities. One task may have several attempts without erasing the evidence from earlier attempts. Parallel child tasks get their own ownership and resource leases. Workspace or branch conflicts are resolved through resource ownership, even when the task IDs differ.

This direction extends Paperclip's existing transactional status arbiter and durable continuation design. [Status arbitration](https://github.com/paperclipai/paperclip/blob/0f14d261233c545aa6a8a38ec253c498a5130fff/doc/architecture/native-status-arbitration.md) · [Durable continuation scheduling](https://github.com/paperclipai/paperclip/blob/0f14d261233c545aa6a8a38ec253c498a5130fff/doc/architecture/durable-continuation-scheduler.md)

### Durable scheduling

Store dispatch intent, due times, wait conditions, retries, and lease generations in PostgreSQL. Dispatch workers claim eligible rows in short transactions, reserve budget and concurrency, and emit commands. Use database time for leases and indexed due-work queries. Notifications can reduce latency, but periodic reconciliation repairs missed notifications. Fair admission across companies and provider accounts prevents one busy tenant from starving others. Repeated unchanged failures have a retry limit and a visible owner/action to unblock them.

PostgreSQL documents `SKIP LOCKED` for queue consumers; it is useful for claiming work, not a replacement for the application state machine or resource fencing. Do not hold a database transaction open while a model or external API runs. [PostgreSQL locking](https://www.postgresql.org/docs/18/sql-select.html)

I would remove mandatory Temporal from the initial deployment. That reduces an additional service and avoids having to reconcile two independently authoritative run lifecycles. The tradeoff is real: we must maintain a small, explicit scheduler and its failure invariants. If arbitrary user-authored, long-lived business workflows become the core product, I would reconsider Temporal and deliberately assign it ownership of that workflow lifecycle. Simply wrapping an opaque agent process in an Activity does not checkpoint that process or make its external writes safe to repeat. Temporal retries timed-out Activities according to policy. [Temporal Activity execution](https://docs.temporal.io/activity-execution)

### Rust execution boundary

Use a narrow Rust daemon for provider process supervision, bounded streaming, cancellation, workspace setup, and a durable local event spool. Use Paperclip's PRP and conformance machinery as the starting point for the versioned command/event contract. Generate TypeScript and Rust types from a common schema and verify their behavior with shared fixtures.

The daemon connects outward with a scoped bootstrap identity. Persist events before sending them, accept acknowledgements only after the kernel commits them, and deduplicate by source identity and sequence. Reusing an event or command identity with a different payload is an error. A bounded SQLite spool is an implementation option for transport durability; it is not a second authority for task state. Spool exhaustion must surface as a classified failure.

A lease has a monotonically increasing generation. Kernel writes and broker calls reject old generations. On host loss, reconcile the environment before granting a conflicting workspace lease. A database fence alone cannot stop an already-issued external request or a process writing directly to an unfenced filesystem. Isolation, credential revocation, and actual environment cleanup complete that boundary.

### External-effect lifecycle

The governed action broker handles model requests and external connectors using kernel-owned policy. Long-lived upstream credentials stay in trusted storage. The runner gets narrowly scoped authority to ask for an operation. Connector credentials are resolved inside the broker, and every request is checked against current grants, resource scope, budget, and lease generation. MCP is one connector protocol; it does not itself provide isolation. Validate token audience and maintain distinct upstream credentials, consistent with MCP's prohibition on token passthrough. [MCP security guidance](https://modelcontextprotocol.io/docs/2025-11-25/tutorials/security/security_best_practices)

Before sending a consequential request, commit a stable logical operation ID, canonical argument digest, target, caller, and policy decision. An approval, when policy requires one, binds that exact action or an explicit bounded scope and has an expiry. Revocation still applies after approval. Routine work within an existing grant proceeds without repeated human prompts.

After sending the request, save the provider receipt. The important crash window is after the provider changes something but before the receipt reaches our database. Preserve `outcome_unknown` in that case. If the provider supports durable idempotency, retry with the same key and respect its retention window. If it supports lookup, reconcile by the recorded operation identity. If neither works, stop that operation and expose the uncertainty for a decision. Never claim universal exactly-once external effects. Deduplication applies to a stable operation identity; it cannot reliably recognize arbitrary semantically equivalent actions invented on a later model turn.

A cancellation first revokes future authority, then requests provider cancellation and reaps the process. The UI distinguishes cancellation requested from cancellation confirmed. A completed external action requires a separate compensating operation if reversal is possible and authorized.

### Adapter guarantees

Each qualified adapter publishes a capability manifest: structured events, cancellation, verified session resume, checkpoint format, model identity reporting, usage reporting, tool mediation, and isolation support. Bind it to tested runtime/protocol versions. Model selection is explicit; failover creates a visible new attempt unless the user enabled an appropriate fallback policy.

An instrumented runtime can expose durable step boundaries. An opaque CLI may support only restarting from a known workspace and recorded task context. Resume it only when the adapter has verified the exact session and checkpoint bindings. Replaying our event log reconstructs control state; it does not reproduce stochastic model reasoning or transfer hidden provider state to another model.

For the strongest managed profile, enforce workspace mounts, compute/time limits, and network egress outside the model's control. Git worktrees isolate edits but are not security sandboxes. Use an established sandbox runtime appropriate to the host and workload. A provider that needs unrestricted credentials or network access belongs to an explicitly trusted profile with weaker advertised guarantees; it cannot silently inherit the managed profile's promises.

### Versioned context and evidence

Every attempt records a manifest containing the agent and skill revisions, tool-schema digests, workspace base and overlay, selected provider/model, available resolved model metadata, context sources, and budget envelope. New turns append input snapshots. Pinning context does not preserve permissions after revocation, and a model alias does not guarantee immutable model weights.

Store small structured facts and access metadata in PostgreSQL. Store logs, documents, and workspace snapshots in a tenant-scoped artifact directory locally or object storage in a managed deployment. Use checksums and versioned references; content hashes are not access credentials. Finalize an upload before attaching its reference to a completion decision. Clean up unattached uploads separately. A snapshot captures explicit selected files and excludes secrets; it must not upload an evolving directory indiscriminately. Workspace collection and content interpretation must follow the Candidate artifact handoff and grading isolation contract above; finalization does not make uploaded content trusted.

Memory entries carry sources, scope, expiry, and a trust level. Start with document search and PostgreSQL full-text search; add embeddings only when retrieval evaluation justifies them. Evaluators propose skill, routing, and memory changes through the kernel. Promote them under an explicit policy after regression checks. Do not let untrusted retrieved text or an agent's own claim become a privileged instruction automatically.

Completion authority depends on the task contract. Ordinary low-risk work can accept a structured completion claim; consequential work can require independently recorded evidence. A missing proof should lead to a bounded next step or a named decision, not an endless verification loop.

### Cost and quality controls

Reserve budget atomically before admitting concurrent work. Track estimated, reserved, reported, and reconciled spend separately, including outstanding provider calls and prices used for estimates. Enforce token and step caps where the provider supports them. Opaque subscription-backed runtimes or delayed usage reports cannot promise an exact real-time dollar cap; advertise the available controls truthfully.

Track accepted outcomes, cost per accepted outcome, time to completion, recovery success, duplicate actions, uncertain effects, and human interventions. Use OpenTelemetry for traces and metrics, while authoritative receipts and decisions stay in the durable application records. Telemetry loss must not change whether an action is authorized or a task is complete. [OpenTelemetry signals](https://opentelemetry.io/docs/concepts/signals/)

### Deployment topology

| Part | Choice | Reason |
| --- | --- | --- |
| Console, API, kernel, dispatcher, broker, connector SDK | TypeScript on Node.js; React for UI | Fast product iteration and shared schemas. Business decisions have one implementation. |
| Runner and host process management | Rust | A narrow memory-safe system boundary with bounded resource handling and a distributable daemon. |
| Durable application state | PostgreSQL and SQL | Transactions, constraints, compare-and-swap updates, leases, and an outbox. |
| Worker transport spool | Embedded SQLite or equivalent durable journal | Restart-safe delivery local to the worker; never the application authority. |
| Evaluation/data workers | TypeScript; Python where its libraries help | Evaluation dependencies stay outside the execution and authorization paths. |

The initial installation is a TypeScript control service, PostgreSQL, a Rust runner, and an artifact directory. The broker and dispatcher are modules of the same application; they can become separate process roles from the same codebase when load or credential isolation warrants it. Evaluation workers can run asynchronously. No extra queue or workflow server is required for this bounded task model.

For a managed service, use API replicas, dispatch workers, managed PostgreSQL with recovery backups, object storage, and isolated runner pools. Give each company one authoritative region initially. Authenticate worker connections, scope every stored reference by tenant, and use a non-owner database role with row policies as defense in depth. Database owners and privileged roles can bypass row security, so merely enabling RLS is insufficient. [PostgreSQL row security](https://www.postgresql.org/docs/18/ddl-rowsecurity.html)

These diagram nodes are logical responsibilities, not nine mandatory microservices. Agent workspace outputs return through the runner/kernel artifact path; evaluation consumes committed event references and proposes updates through the kernel API. Payloads and credentials do not belong in the outbox. The diagram omits those return payloads and telemetry fan-out to keep the main control and action paths readable.

### Required execution acceptance scenarios

| Injected condition | Required behavior |
| --- | --- |
| Provider accepts a write; broker dies before saving the receipt | Reconcile using provider support, or preserve `outcome_unknown`; do not blindly resend. |
| Worker loses connectivity and its lease expires | Reject its later writes/actions; verify isolation or cleanup before assigning conflicting resources. |
| Runner restarts with unsent events | Replay the durable spool with stable IDs; duplicate delivery does not duplicate committed state. |
| Approval is revoked or arguments change before execution | Reject consumption of the old approval. |
| Two runs request the remaining budget | Transactional reservations prevent admitting more controlled spend than allowed. |
| Workspace snapshot or upload fails | Preserve partial work and withhold completion that depends on that artifact. |
| A CLI cannot prove session identity during resume | Start a clearly identified recovery attempt after effect reconciliation, or surface a blocker. |
| Repeated recovery sees no new progress or changed condition | Apply bounded retry/backoff and name the next action; do not create an endless model loop. |
| Retrieved content requests a forbidden tool or another tenant's data | Policy, storage authorization, and enforced egress reject it independent of the model. |
| New memory, skill, model, or adapter version regresses outcomes | Block promotion or roll back the version; keep prior run evidence readable. |

These are required future implementation gates. The scaffold delivery has not executed these scenarios; the archived diagram validation concerns presentation only.


## Repository delivery and acceptance boundary

The [README](README.md) maps source directories. [Contracts](docs/CONTRACTS.md) separates present bootstrap routes from planned APIs; [data model](docs/DATA_MODEL.md) describes proposed durable records. The TypeScript interfaces and runner JSON envelope are draft design aids. They do not provide runtime validation, schema generation, PRP compatibility, authentication, durable transport, or security isolation.

The scaffold's admission and authorization implementations always deny. Its promotion decision remains HOLD; the adapter registry is empty. The runner only reports help, version, and unavailable capabilities. Evaluator and evolution worker entry points report disabled status and exit. These defaults must change through the corresponding implementation milestone together with evidence for that milestone.

Future completion criteria are collected in [T01](docs/tasks/T01-intent-execution.md), [T02](docs/tasks/T02-baseline-measurement.md), [T03](docs/tasks/T03-evolution-release.md), and [T04](docs/tasks/T04-extension-qualification.md). Thresholds requiring workload data remain open until measured and registered; no placeholder number is a release threshold. Automated tests, runtime builds, benchmarks, and production rollout are not part of this scaffold delivery.

<!-- END NORMATIVE SPEC -->

## Board record — current project specification

**APPROVED FOR STAGED IMPLEMENTATION — project-r2, spec 0.3.** All five isolated expert seats returned BUILD on the same normative revision after two review rounds. There are zero unresolved material blockers. No runtime implementation qualification is implied.

| Seat | Model | Round 1 | Round 2 |
| --- | --- | --- | --- |
| Distributed systems | gpt-6-astra | BUILD | BUILD |
| Evaluation/statistics | gpt-6-sol | BUILD | BUILD |
| Adversarial authority/isolation | gpt-5.6-sol | REJECT: A1 | A1 PASS; BUILD |
| Product/developer feasibility | gpt-5.6-terra | BUILD | BUILD |
| Cold integration | gpt-6-astra | Not yet seated | BUILD |

Normative prefix: **54,429 bytes**, SHA-256 `712190480311998d0913ca9707a7db5bf3be72a75b73c9474cfd2e3f8d91dcef`. The [round-2 manifest](docs/reviews/round-2-manifest.json) pins supporting requirements. See the [full board record](docs/reviews/BOARD.md) and [machine-readable receipt](docs/reviews/approval.json). This footer is nonnormative evidence outside the hashed specification prefix.

Reviewers worked without peer debate, in parallel waves constrained by three available child-agent slots. The cold reviewer first joined for the final revision and did not read earlier verdicts. Four model variants were used; all are OpenAI agents, so isolated reviews are not independent human or cross-provider certification. Source behavior, sandbox enforcement, statistical validity and performance remain implementation questions.

## Adjudication log — current project specification

### A1 — Candidate artifacts can compromise the collector or grader

**Ruling: CONFIRMED; disposition: FIXED; reviewer closure: PASS.** The operator reread r1's evaluator boundary (snapshot lines 165–169), artifact foundation (259), data-model rules and T03 acceptance. They labeled inputs untrusted but did not specify a safe collection or parsing/execution boundary. That left a confused-deputy path through links, special files and poisoned content. A digest establishes byte identity, not safety.

**Resolution in r2:** “Candidate artifact handoff and grading isolation” (lines 171–183) requires process-tree termination and immutable snapshots; an unprivileged collector; descriptor-rooted no-follow access to allowlisted single-link regular files; explicit resource limits; sandboxed interpretation; candidate execution separate from protected scoring; and controller-constructed, authenticated receipts. Contracts, data model, T01 and T03 now carry matching implementation/acceptance requirements. No code or exported symbol changed; call-graph analysis was not applicable.

Fresh adversarial verification quotes include “regular files whose link count is exactly one” (177), “fresh disposable, credential-free processing sandbox” (179), and the paragraph at 183 requiring zero host-secret disclosure, controller execution or accepted forgery. The reviewer returned **A1 PASS / BUILD** after checking the exact r2 bytes. The operator independently checked the resolving text and all final manifest hashes. Full [A1 finding](docs/reviews/round-1-adversarial.md) and [closure](docs/reviews/round-2-adversarial.md) are retained. No material finding was waived or deferred to obtain unanimity.

### S-N1 / S-N2 — Nonblocking systems implementation notes

Reservation settlement must retain outstanding liabilities; dispatch implementation must define authority-check/send ordering and exclusive send ownership. The systems reviewer classified these as implementation notes, not material specification blockers, in both rounds. They are preserved in [implementation notes](docs/reviews/implementation-notes.md) for T01. No runtime behavior is claimed.
