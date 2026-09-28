# Decision DB-001: Delegate Teloforge development choices to an independent agent board

- Status: BUILD — adopted for Teloforge development
- Risk class: high-impact process and authority boundary
- Scope and mandate: consequential development, architecture, implementation-order, and reversible product-design choices within the current approved project scope. The project owner's instruction on 29 September 2026 delegates these choices to an independent agent board.
- Reviewed artifact digest: per-file SHA-256 values below
- Decision question: Can Teloforge remove routine owner checkpoints and have an independent board decide important development choices without giving agents runtime authority they do not already have?
- Selected option and rationale: Adopt the five-seat review and decision policy in docs/agents/decision-board.md. Routine reversible implementation details remain with the implementer; consequential reversible choices require 3/3 BUILD; high-impact choices require 5/5 BUILD on the same frozen revision. Missing authority yields HOLD without prompting the owner, and independent work continues.
- Safe fallback: zero-spend fixtures, fake adapters, no credentials, no external writes, and no unqualified candidate execution. Current live T01 remains held because no standing grant covers it.
- Required implementation and verification: Apply the board policy through AGENTS.md and docs/agents/skill-autonomy.md. Use the synthetic-first T01 plan. Keep the current SPEC.md runtime owner, grants, budget, data-use, and release authority unchanged.
- Revisit trigger: a user instruction changes the project mandate; the product SPEC changes runtime authority; an enforced platform rule changes; or new evidence invalidates a selected decision.

## Reviewed files

All five seats independently checked these exact files in the active main worktree:

| File | SHA-256 |
| --- | --- |
| AGENTS.md | 718f0dd28a0d83472462bc801ad4fb8eaf6e4a028f1b1a544604d626a91a085c |
| docs/agents/decision-board.md | 31ff3d9b617c7827a7f619ad54dfd601bb88f68a15738ff4eb50664ed6d38a7f |
| docs/agents/skill-autonomy.md | 8fc5db6edf7cb8cfe3bb7b76ad3a32e19ec756d6cecbb4e5ec4e9d9278ca9f03 |
| docs/tasks/T01-slices/README.md | c034a1fd7feb2635c2cc5d7d41a0a6e329e7858a2ea8559620873e08409a5159 |
| docs/tasks/T01-slices/09-live-profile-qualification.md | 950f7b12de32567d7a53aca2376fb14a9873260511faa10bc56416a6e3b764a4 |

SPEC.md and docs/GITHUB_DEVELOPMENT.md were read as constraints, not changed by this decision.

## Independent verdicts

| Seat | Agent/model | Verdict | Findings |
| --- | --- | --- | --- |
| Domain and distributed systems | final_domain_board / GPT-6 Astra | BUILD | No material blockers; development authority is separate from runtime grants and current effect checks. |
| Adversarial authority and security | final_adversarial_board / GPT-5.6 Sol | BUILD | No material blockers; no authority laundering, and stale/revoked grants fail closed. |
| Evaluation and evidence | final_evaluation_board / GPT-6 Sol | BUILD | No material blockers; qualification evidence is a deliverable, and review approval is not runtime qualification. |
| Product and operability | final_product_board / GPT-5.6 Terra | BUILD | No material blockers; owner prompts are removed for in-scope work and HOLD is legible. |
| Fresh cold integration | final_cold_board / GPT-6 Luna | BUILD | No material blockers; active local-first rules, T01 dependencies, and authority boundaries compose. |

The five seats reviewed the same hashes independently without peer reasoning. Their models came from one provider; separate contexts do not establish statistical independence or human professional approval.

## Adjudication

1. An earlier review brief contained a mistyped T01-09 digest. The final review was re-frozen from the active worktree, each reviewer recomputed the same hash set, and all five final votes apply to the digests above.
2. A prior cold read found mandatory-PR instructions in a stale checkout. The user had explicitly superseded routine Issue/branch/PR/remote-CI ceremony with local-first development, and current main now says the same. The final cold seat checked the active main policy and returned BUILD. Enforced GitHub protections remain binding.
3. T01-09 initially required the qualification evidence it was meant to produce. It now requires an existing standing grant to begin, makes exact-profile evidence its deliverable, requires pre-effect checks, and keeps effects disabled when evidence is missing. The evaluation seat verified this closure on the final revision.

## Decision boundary

This decision removes the owner's routine development and design approvals. It does not alter SPEC.md or appoint agents as runtime owners, grant administrators, data stewards, or release administrators. The board cannot create a repository grant, credential permission, data-use consent, spend limit, legal license, or merge/deployment authority. When one is absent, it records HOLD and does not ask the owner to settle the decision. Tickets T01-01 through T01-08 may proceed only within their synthetic, zero-spend boundaries; T01-09 remains held until an existing grant and the required qualification evidence cover its scope.

BUILD approves the reviewed policy and planning decision only. No runtime implementation, live provider, external write, or acceptance scenario was qualified or exercised by this review.
