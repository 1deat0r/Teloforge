# Nonblocking implementation notes

These notes were raised by the systems expert in round 1. They do not change the review gate or claim implemented behavior.

- **S-N1 — Reservation settlement:** T01 should specify cancellation, timed-out calls, unknown effects and delayed charges. Retrying/cancelling an attempt must not release outstanding liabilities for new admission. Source requirements: r1 SPEC lines 267 and DATA_MODEL lines 12,25–26.
- **S-N2 — Dispatch ordering:** T01 should define the authority-check/send linearization and concurrent dispatch ownership. Distinguish already-issued requests from those still prohibited by cancellation/revocation; stable operation IDs alone cannot coordinate senders. Source requirements: r1 SPEC lines 151–153,239–245 and CONTRACTS lines 19,35–37.

Both are implementation detail notes under already-required atomic budgeting, current authorization, stable operation identity and reconciliation. They are retained as planning follow-through.
