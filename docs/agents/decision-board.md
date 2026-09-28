# Independent agent decision board

This policy operationalizes the project owner's instruction of 29 September 2026 to have an independent agent board make consequential Teloforge development decisions without routine owner checkpoints.

This delegation covers **building Teloforge**: architecture, implementation choices, task order, reversible product defaults within the approved project scope, and whether evidence supports a development decision. It does not change Teloforge's runtime authority model in SPEC.md. The product owner remains the source of intent, grants, budgets, data-use permissions, and release authority.

## Decision authority

| Decision class | Board authority | Required disposition |
| --- | --- | --- |
| Routine, reversible implementation detail | Implementer decides using the repository rules and current task | Record material assumptions in the task; no board meeting |
| Consequential but reversible project design or product choice within SPEC | Independent three-seat board may choose and approve an option | 3/3 BUILD on the same frozen decision record |
| Architecture, authority, tenant data, security, protocol, persistence, evaluator, release, migration, or other high-impact change | Independent five-seat board decides whether the design is fit to proceed | 5/5 BUILD on the same frozen revision; any unresolved blocker keeps the gate closed |
| External effect already covered by a valid standing grant | Board may select only within that exact target, action, data-use, and budget scope; the runtime must recheck authority | Five-seat BUILD plus deterministic kernel/broker enforcement and recorded action receipt |
| Missing grant, spend authority, credential permission, data-use consent, legal term, repository scope, live runtime qualification, merge/deploy/publish authority, or destructive production authority | Board cannot invent or widen authority | Record HOLD, keep the capability disabled, and continue independent work; do not ask the owner to unblock it |

The board should make a decision when the evidence and mandate support one. When they do not, its decision is to hold or reject the affected action. That disposition is final for the current scope; routine work must not wait for the owner to choose among options or answer an interview question.

## Board seats

For consequential choices, convene reviewers in isolated agent contexts. The standard seats are:

1. **Domain and distributed systems:** state ownership, transactions, recovery, protocols, and feasibility.
2. **Adversarial authority and security:** least privilege, untrusted input, tenant/data boundaries, effects, and failure modes.
3. **Evaluation and evidence:** measurable claims, missingness, reproducibility, experiment validity, and resource accounting.
4. **Product and operability:** user outcome, workflow fit, clear status, and operational burden.
5. **Fresh cold integration:** independently checks the complete proposal, interactions, and whether earlier resolutions actually compose.

Use the three most relevant seats for a bounded reversible decision. Use all five for high-impact decisions. Add a privacy, legal, platform, or other specialist when needed; a specialist may add a blocker but cannot waive a required seat. The proposer and implementer do not count as independent approvers of their own work.

Use different model families or providers when they are available and appropriate. Record the model identity when exposed. Independent agent contexts reduce direct peer influence but do not establish statistical independence, human professional review, legal consent, or runtime safety. State those limits plainly.

## Review protocol

1. Write a concise decision record with the question, risk class, scope, current mandate, verified facts, options, evidence, recommendation, and safe fallback.
2. Freeze the exact files or artifact digest being reviewed. Give each seat the same source and a distinct lens. Reviewers must not see peer reasoning or verdicts before submitting.
3. Require a verdict of BUILD, CONDITIONAL, or REJECT, with evidence citations and numbered blockers. Silence is not approval. A missing vote fails the gate.
4. Fix or explicitly rebut every material finding with evidence. Security, authority, privacy, and correctness blockers cannot be overruled by majority vote.
5. Re-freeze changed material and obtain fresh votes on that exact revision. Do not edit a normative artifact while its review is in progress.
6. Record the result, reviewer roles and model identities, artifact digest, citations, dissent, adjudications, and any capability boundary. A board verdict authorizes only the reviewed decision within its stated scope.

Resolve disagreement by checking facts, applying the current SPEC and recorded objectives, and preferring the narrower, reversible option. If material disagreement remains after three substantive rounds, or a required independent seat is unavailable, record HOLD for that decision and continue work outside its dependency cone. Never manufacture unanimity or hand the decision back to the owner by default.

## Autonomous fallback

When an action exceeds the current authority envelope, the board's fallback is the least-authority useful path: synthetic data, fake adapters, no credentials, no new spend, no external write, no publication, no merge or deployment, and no destructive operation. Keep the affected capability visibly disabled. Do not repeatedly prompt the owner; resume only if a later instruction or standing grant supplies the missing authority.

This fallback is an autonomy mechanism, not an approval workaround. Board members cannot issue grants to themselves, turn proposals into approved policy, treat synthetic results as live qualification, or use an agent vote to bypass GitHub protections, release controls, or mandatory platform approval.

## Decision record template

Save completed, non-secret decision records under `docs/decisions/`. One record may cover a coherent board decision and its reviewed scope; keep source artifacts frozen until final votes are recorded.

```markdown
# Decision <id>: <short title>

- Status: proposed | BUILD | HOLD | REJECT | superseded
- Risk class: routine | consequential | high-impact | external-action
- Scope and mandate:
- Reviewed artifact digest:
- Decision question:
- Verified facts and sources:
- Options considered:
- Selected option and rationale:
- Safe fallback:
- Required implementation and verification:
- Revisit trigger:

## Independent verdicts

| Seat | Agent/model | Exact artifact | Verdict | Findings and citations |
| --- | --- | --- | --- | --- |

## Adjudication and dissent

Record each blocker, resolution or reason it remains open, and any dissent.
```
