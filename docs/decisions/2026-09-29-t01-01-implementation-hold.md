# T01-01 implementation decision — HOLD

- Status: HOLD after three substantive independent board rounds
- Risk class: high-impact persistence, tenant boundary, and development API
- Scope: the bounded implementation design in [`2026-09-29-t01-01-implementation.md`](2026-09-29-t01-01-implementation.md)
- Reviewed proposal SHA-256: `4abe8137600e1da6d91cd4450af3cb0e563eaa503af45bc7ca1d3ead55fb4cf5`
- Source commit: `14cc46862ad337518dbe072e0fb2a16a3619cf44`
- Decision question: Is the proposed T01-01 fixture-only intent API sufficiently specified and guarded to implement?
- Decision: No. Three of five seats returned BUILD in round 3; security and evaluation returned CONDITIONAL with material findings. The required five-seat BUILD was not reached.
- Safe fallback: retain the current scaffold-only interface; do not register fixture routes, connect through fixture credentials, or claim T01-01/runtime qualification.

## Review history

| Round | Proposal SHA-256 | Result | Record |
| --- | --- | --- | --- |
| 1 | `634f130c81a7de4d322c5c5063b0e43e2d2e1361b67ee2aff6f1169556250212` | One BUILD, four CONDITIONAL | `../reviews/2026-09-29-t01-01-implementation-round-1.md` |
| 2 | `5bd9137a57c2edf73527605b7bbeece1a0af0ce3badad1c623a5cd7eb261d340` | Four BUILD, one CONDITIONAL | `../reviews/2026-09-29-t01-01-implementation-round-2.md` |
| 3 | `4abe8137600e1da6d91cd4450af3cb0e563eaa503af45bc7ca1d3ead55fb4cf5` | Three BUILD, two CONDITIONAL | `../reviews/2026-09-29-t01-01-implementation-round-3.md` |

## Outstanding material findings

The round-3 security findings require a complete, PostgreSQL-version-pinned privilege/ownership inventory, an exact RLS policy manifest that rejects extra permissive policies, and marker stability for the lifetime of each request transaction. The round-3 evaluation findings require deterministic concurrent command replay/conflict and lost-response semantics, canonical command/path/version representations with digest vectors, and evidence scoped to T01-01's fixed principal and no-admission behavior. Full citations and the independent seat verdicts are in the round-3 report.

## Board disposition

The five-seat policy limits repeated substantive review to three rounds before recording HOLD. That limit has been reached with unresolved material correctness and security findings. This disposition is final for this scope: do not make wording-only edits and restart the same review loop. A materially different decision scope or new authoritative evidence may be considered under the board policy; until then, keep the capability disabled and continue work outside T01-01's dependency cone. No owner decision is requested.

## Authority boundary

This HOLD blocks this proposed fixture API implementation only. It does not authorize or prohibit unrelated, independently ready work. It does not change production authentication, grants, runtime capability flags, or release authority.
