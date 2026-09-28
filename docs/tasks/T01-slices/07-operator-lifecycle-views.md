# T01-07: Inspect approval, progress, evidence, spending, and unresolved outcomes

**What to build:** An operator can follow one synthetic attempt from intent through admission, execution, evidence, approval, and effect reconciliation, including stopped and unresolved states. The console reads authoritative control-plane views and never grants authority itself.

**Blocked by:** T01-01, T01-02, T01-03, T01-04, T01-05, and T01-06.

**Status:** ready-for-agent (synthetic records only).

- [ ] Views show intent and action revisions, budgets, reservations, lease state, artifact provenance, and ordered effect status.
- [ ] Pause request, cancellation request, confirmed stop, cleanup pending, successful completion, failed/stopped execution, unknown external outcome, and awaiting human review are distinct.
- [ ] Unknown liabilities and the required read-only reconciliation action remain visible after process cleanup.
- [ ] Missing evidence, denied capabilities, and unqualified runtimes are visibly blocked rather than inferred as ready.
- [ ] The UI is not an authority source; server-side checks remain mandatory for every command and approval.
