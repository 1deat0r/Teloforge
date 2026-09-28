# T01 — Intent and governed execution

Status: not implemented. Dependency: S00. Initial use case: a finite repository-maintenance change producing a reviewable PR under explicit authority. Merge and deployment are outside the initial grant.

## Work

1. Complete runtime schemas and migrations for authenticated principals, revisioned intents, grants, work/attempt identity, resource ownership, budgets, receipts, audit and outbox.
2. Implement intent create/revise/pause/cancel and bounded maintained-intent trigger semantics; enforce the role matrix and exact admission tuple.
3. Implement pure domain transitions and atomic admission/finalization with durable dispatch and reconciliation. Bind API idempotency to canonical arguments and expected revisions.
4. Implement a scoped artifact store and provenance; finalize evidence before dependent completion.
5. Qualify one adapter and managed execution profile. Implement runner transport/spool/fencing/cancellation and explicit resume limitations.
6. Implement the broker for that adapter's model and repository effects, with exact grant checks, protected credentials and provider reconciliation.
7. Add console views for intent, plan, attempt, evidence, spending and unresolved decisions. Distinguish cancellation request from confirmation.

## Required future acceptance evidence

- Concurrent admission cannot exceed controlled spend or own the same exclusive resource.
- Stale intent revision, revoked delegation, changed action digest, expired approval and old lease generation cannot authorize an action.
- Event replay after restart cannot duplicate committed state; conflicting identity/payload pairs fail.
- A provider write followed by broker failure is reconciled or visibly unknown; it is not blindly repeated.
- Runner loss requires environment reconciliation before conflicting reuse; Git worktrees alone do not establish isolation.
- Artifact failure withholds dependent completion; missing session identity cannot silently resume.
- Cross-tenant requests, prompt-injected forbidden tools and unsupported capabilities remain denied independently of model behavior.
- Retry/no-progress limits stop repeated unchanged failures with a named next action.

Close only with recorded evidence for the required cases and no known critical authority or duplicate-effect defect. Acceptance scenarios are requirements, not test results supplied by S00.
