# Teloforge — Intent and continuous improvement

## Revision and review scope

Revision: r2. The design gate is recorded in the companion review report; this document alone makes no approval claim. This is a design review for beginning a staged implementation; BUILD does not certify an implemented runtime, measured superiority to Paperclip, security assurance, or production readiness. All five reviewers must return BUILD on the same final normative revision and every material blocker must have an evidenced closure. Reviewers may dissent. A maximum of five review rounds applies; unresolved disagreements are reported rather than converted into approval. No product implementation or rollout is authorized by this review task.

Working project name: **Teloforge**, pronounced “TEL-oh-forj.” The name joins purpose (telos) with building and refining (forge). The product descriptor is **an intent-driven agent harness that improves through evaluated changes**. It avoids a promise of unlimited autonomous improvement. Keel's existing agent/control product collisions are a reason to rename: https://docs.keelapi.com/ and https://github.com/rockerlabs/keel/ . AimWright was considered and dropped after an exact-name AI/software-company match; see https://find-and-update.company-information.service.gov.uk/company/15939119 . Exact-name web searches for “Teloforge” on 28 September 2026 found no obvious matching software product. This is preliminary discoverability screening only; domain, package namespace, and trademark availability are UNVERIFIED. No external name has been registered or changed.

Normative scope: this document extends the v2 execution design linked below. Where revisions conflict, this revision takes precedence. The first workload is repository maintenance with reviewable pull requests; wider business automation is later scope. No automatic merge/deployment is in the initial grant. The reviewed architecture includes that workload and the extension path, not a claim that every connector has equivalent guarantees.

## Implementation phases and ticket index

The following are future implementation tickets; all are BLOCKED by this design gate and none has been executed.

| Ticket | Phase | Deliverable | Exit decision |
| --- | --- | --- | --- |
| T01 | 1 | Intent records, execution invariants, one qualified runtime, action receipts | All required invariant scenarios pass; any known critical authority or duplicate-effect defect blocks the next phase. |
| T02 | 2 | Fixed-baseline outcome and resource measurement | All admitted trials accounted for; missing measurements explicit; paired baseline repeatability and variance characterized before optimization. |
| T03 | 3 | Bounded context/skill/routing experiments and version registry | First pre-registered independent comparison with complete receipts and a demonstrable rollout/rollback path; insufficient evidence keeps the incumbent. |
| T04 | 4 | Broader adapters and optional code evolution | Only after their separate compatibility, isolation, effect-reconciliation, and migration gates are defined and passed. |

The board reviews the architecture and whether these staged boundaries are coherent. Experiment-specific sample sizes, quality margins, targets and costs are registered before that experiment begins, using workload baseline data. No numeric benchmark result is claimed here.

Design date: 28 September 2026. Proposed architecture; no Teloforge runtime or performance benchmark has been implemented. This revision adds the user's requirements for intent, self-improvement, and continuing optimization of performance, accuracy, quality, efficiency, and token efficiency. It extends the [v2 execution design](/home/its1deat0r/Documents/Codex/2026-09-28/ho/outputs/keel-v2-design.md); its recovery, authority, external-effect, and adapter limitations still apply. The [interactive architecture](/home/its1deat0r/Documents/Codex/2026-09-28/ho/outputs/teloforge-architecture.html) shows logical responsibilities, not nine separately deployed services.

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

The trusted evaluation controller owns sandbox creation, trial identity, quotas, teardown, and evidence collection. It runs outside the candidate's sandbox. The candidate gets a read-only versioned bundle image and a disposable writable task workspace. Evaluator reference data, holdout answers, grading code, and the evaluation contract remain immutable and outside candidate-writable mounts. Task-facing input fixtures may be copied into the workspace when the task requires modifying them; trusted originals remain outside it. Grading reads the resulting artifact from the trusted side and checks integrity, rather than trusting candidate-authored success flags or logs.

The candidate cannot access evaluator signing credentials, database credentials, control APIs, host sockets, privileged mounts, or the receipt store. Separate identities, filesystem/mount boundaries, compute limits, and enforced network egress implement that restriction. All authorized test effects go through a broker with test-only credentials and explicit destinations. Live production writes are denied in evaluation; any later experiment requiring real writes needs a separately scoped intent and is not an offline replay. Tool outputs, retrieved documents, generated tests, and candidate artifacts are untrusted inputs to the evaluator. A model judge's narrative cannot mint receipts or decide release authority.

The controller authenticates receipts covering candidate and baseline digests, intent and contract versions, dataset snapshot, test environment and runner identity, trial nonce and sequence, source-data scope, raw evidence digests, measurements including missingness, and grader versions. Keys never enter the candidate sandbox. The gate checks identity, signature or authenticated-service provenance, replay/deduplication rules, complete expected trial membership, and referenced immutable evidence. Receipt failure or a compromised environment quarantines the experiment and prevents promotion. T03 must include attempts to overwrite grading fixtures, forge receipts, access evaluator credentials/control APIs, bypass test egress, and conceal a missing trial; all must yield zero accepted forged or unauthorized results. This is a required future test, not a claimed test result.

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
