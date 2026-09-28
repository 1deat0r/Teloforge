# T01-05: Bind approval to one exact, expiring effect digest

**What to build:** An operator can review a proposed synthetic effect and approve only its exact canonical digest, scope, intent revision, and expiry. Any material change invalidates the approval. This creates an auditable authority decision but does not itself send an effect.

**Blocked by:** T01-02 and T01-04.

**Status:** ready-for-agent (fixture-only; no live approval authority).

- [ ] Approval is authenticated, scoped to the current owner/grant and expected intent revision, bound to one action digest, and expires.
- [ ] A changed patch, destination, operation order, scope, or relevant authority epoch makes the prior approval unusable.
- [ ] Approval, denial, expiry, revocation, and audit state are persisted durably and checked again at effect admission.
- [ ] Fixture approvals cannot be accepted by a production broker or be presented as owner authorization for live writes.
- [ ] The exact approved effect summary is inspectable without exposing secrets or private prompts.
