# Teloforge — Independent architecture review

Date: 28 September 2026. **Design gate: APPROVED, 5/5 BUILD on normative revision r2.** Five material blockers were confirmed, resolved in the specification, and reverified by their originating reviewers using direct quotations. There are zero unresolved material blockers. No runtime implementation, benchmark, deployment, or external registration was performed.

## What was approved

The approval covers **Teloforge as a working name and the architecture as a basis for staged implementation** of an intent-driven agent harness with evaluated improvement. The first workload is repository maintenance producing reviewable pull requests. It does not establish security certification, performance superiority to Paperclip, continuously increasing capability, or name availability.

The immutable normative package is [the r2 design](teloforge-design.md) plus its unchanged [execution foundation](keel-v2-design.md). The foundation retains its historical Keel v2 title. The [r1 review snapshot](teloforge-review-evidence/r1-design.md) preserves the pre-revision text. The [renamed Archify diagram](teloforge-architecture.html) is a logical overview; the specification states the omitted feedback paths and authority boundaries.

| Artifact | SHA-256 |
| --- | --- |
| Normative design r1, retained as audit evidence | `62fe71f5f3d8093990aaf1a6b5082d38d847d803a344a9f281e1c70750571b63` |
| Approved normative design r2 | `e7aaed19d3eaeaead4fb309d22ba0b3a01812542cbe96da69f2342b6dbdcce3a` |
| Unchanged execution foundation | `0500d972bfb57b3e232b2738bebbc62cc9a9fb99876975c21f1d4931273ac8f3` |
| Diagram specification | `b3528d83a7c7166a8a6257d3e01074bdb36cc3749118fb19f434376ed0688983` |
| Delivered diagram HTML | `97b4cda9971ad319e76bc211db37ddb552ebee590097aa3ead70586aac7b6dc0` |

## Gate rule

All five seats must independently return BUILD on the same normative revision. Every material blocker must have a concrete resolution in that revision and a fresh quotation-based closure check by its originating reviewer. A majority cannot override a dissenter. Revisions are frozen while a review round is in progress. Any later normative change invalidates this approval until the affected design is re-reviewed. The review was capped at five rounds; it passed in two.

BUILD means suitable to begin staged implementation. CONDITIONAL means material closures remain. REJECT means a design defect stops the gate. This task authorized review and design revision; future implementation tickets remain unexecuted.

## Board record

Reviewers ran in isolated agent contexts with separate specialist briefs. Parallel review used up to three reviewer slots; subsequent work used newly available slots. Reviewers were not shown one another's messages or verdicts. The final cold-read reviewer had not seen earlier review rounds. Models were varied under the board-review skill's guidance; they are all OpenAI models, so the panel should not be described as five statistically independent human experts or a cross-provider certification.

| Seat / agent | Model | Lens | Round 1 | Round 2, exact r2 |
| --- | --- | --- | --- | --- |
| `systems_review` | GPT-6 Astra | State authority, recovery, technical feasibility | BUILD | **BUILD** |
| `evaluation_review` | GPT-6 Sol | Statistics, confounds, evaluation economics | CONDITIONAL: E1, E2 | **BUILD; E1/E2 PASS** |
| `adversarial_review` | GPT-5.6 Sol | Security, isolation, hostile candidates | CONDITIONAL: A1, A2 | **BUILD; A1/A2 PASS** |
| `product_review` | GPT-5.6 Terra | Intent ownership, product scope, working name | CONDITIONAL: P1 | **BUILD; P1 PASS** |
| `cold_integration_review` | GPT-6 Astra | Fresh integration review and diagram/UX | Reserved for final cold read | **BUILD** |

Round 1 tally: one BUILD, three CONDITIONAL, cold-read seat reserved. Round 2 tally: **five BUILD, zero CONDITIONAL, zero REJECT**. The final reviewer read both normative documents, checked the supplied design hash, inspected the diagram JSON and endpoint screenshots, and reviewed automated browser measurements. Other seats approved their assigned architectural dimensions; they did not claim to test a running implementation.

## Adjudication log

The coordinating agent checked each cited gap against the frozen r1 text before revising. No blocker was dismissed or converted into a note. All five rulings were **CONFIRMED** at the architectural level. Changes were batched into r2; original reviewers then checked their own closures independently.

| Item | Verified r1 gap and ruling | Resolution in r2 | Originating reviewer's closure |
| --- | --- | --- | --- |
| **P1: intent authorization** | r1 lines 28–31 and 74 described ownership and current grants without a role matrix or explicit intent/grant admission tuple. CONFIRMED. | “Intent authority and revision binding,” lines 106–120: role matrix, constrained delegation, atomic revision binding, revocation and readmission behavior. | **PASS.** Quoted: “Admission atomically binds the plan and attempt to `(tenant_id, intent_id, intent_revision, grant_set_digest, authorization_epoch, bundle_digest, policy_revision)`.” Also verified: “No silent authority migration occurs.” |
| **A1: cross-tenant derivation** | r1 lines 56–58 and 86–90 scoped direct storage/cache access but left derived learning artifacts and global promotion underspecified. CONFIRMED. | “Learning data scope and derivation,” lines 122–128: transitive source lineage, default tenant-local scope, independent enforcement, authorized declassification, leakage review and descendant recall. | **PASS.** Quoted: “Derived outputs inherit the intersection of permitted uses and access audiences of all inputs” and “The default learning and promotion scope is the originating tenant.” |
| **A2: evaluator compromise** | r1 line 58 and lines 98–108 separated identities without fully specifying which grading resources and credentials candidate code could reach. CONFIRMED. | “Evaluator execution boundary,” lines 130–136: external trusted controller, protected grading inputs, denied credentials/control APIs, test-only effects, evidence-bound authenticated receipts and adversarial acceptance scenarios. | **PASS.** Quoted: “The trusted evaluation controller owns sandbox creation… It runs outside the candidate's sandbox.” Also verified immutable grading resources and candidate-denied control-plane access. |
| **E1: adaptive holdout leakage** | r1 line 98 acknowledged overfitting but omitted enforceable visibility, reuse and retirement rules. CONFIRMED. | “Evaluation exposure policy,” lines 138–144: custodian, quarantined final runs, exposure ledger, one experiment per sealed version by default, retirement and fresh gates for exposed descendants. | **PASS.** Quoted: “one pre-registered candidate-versus-baseline experiment per sealed dataset version” and “Each subsequent experiment uses a fresh, separately curated set.” |
| **E2: incomplete promotion decisions** | r1 lines 38 and 104 left useful improvement, confidence and canary termination open to interpretation. CONFIRMED. | “Complete experiment and rollout decisions,” lines 146–161: registered metrics/margins and statistical method, missing-data rules, ordered total decisions, bounded rollout and restart recovery. | **PASS.** Quoted: “Missing fields or an unjustified statistical method prevent final-gate admission.” Verified reject/hold/promote/retain branches and the canary deadline outcome. |

The systems reviewer re-pinned to r2 and found the new controls consistent with the single authority, bundle pinning, effect-reconciliation and restart model. The final cold-read reviewer raised no new material blocker.

## Remaining nonblocking notes

- At 1440×900, diagram subtitles are small: the browser measured approximately 7.57 CSS pixels. Containment passes; this is not a comfortable-readability or accessibility certification. An enlarged reading mode or larger default text is a future presentation improvement.
- The diagram's evaluator/lab request and feedback arrows share a duplex route. Separate routes and labels distinguishing development diagnostics from aggregate final-gate decisions would communicate the exposure rules more directly. The specification already defines those restrictions.
- T01 should turn the stated contracts into explicit state transitions and transaction boundaries. T03 should exercise bundle revocation racing admission/dispatch and restart during rollout. These are future implementation acceptance work.
- Fresh representative evaluation cases and independently controlled grading create ongoing operating cost. When evidence or fresh cases are insufficient, promotion remains on HOLD while ordinary execution can continue.

## Implementation ticket index

The following tickets translate the approved phases into planning drafts. They have not been executed, and this review does not initiate them. The board's votes bind the normative r2 package; these derived ticket drafts and later detailed implementation/test plans are not separately board-approved artifacts.

- [T01 — Intent and execution foundation](teloforge-issues/01-intent-execution.md)
- [T02 — Baseline and measurement](teloforge-issues/02-baseline-measurement.md)
- [T03 — Evaluated improvement and release](teloforge-issues/03-evolution-release.md)
- [T04 — Additional adapters and code evolution](teloforge-issues/04-extension-qualification.md)

## Name decision and evidence

**Recommendation: Teloforge**, pronounced “TEL-oh-forj.” “Telo” invokes purpose; “forge” invokes building and deliberate refinement. The descriptor is **an intent-driven agent harness that improves through evaluated changes**. It fits the expanded product direction without promising unbounded or automatic progress.

Keel is already used for agent control infrastructure, including policy, budgets, routing and execution evidence. [Existing Keel documentation](https://docs.keelapi.com/). AimWright was screened out after finding an exact-name software company. [Companies House](https://find-and-update.company-information.service.gov.uk/company/15939119).

Exact-name web searches for Teloforge and software/agent variations on 28 September 2026 found no obvious matching software product. Search silence is incomplete evidence: domain, package namespace and trademark availability remain UNVERIFIED. Teloforge is the working name in these local design artifacts; no repository, domain or external service was renamed or registered.

## Diagram evidence

Architecture diagram: **9/9 showcase checks, zero errors, zero warnings**. Automated browser evidence passes at 1440×900, 1600×1000, 1920×1080 and 2048×1320. Separate image review inspected light/dark endpoint screenshots; the cold reviewer inspected 1440×900 light and 2048×1320 dark. Presentation notes above are retained. Search/focus/presentation/export interaction flows were not separately exercised.

See the [artifact receipt](teloforge-receipt.json) and [automated browser receipt](teloforge-architecture.visual-check.json). These validate the architecture presentation and byte identity only.
