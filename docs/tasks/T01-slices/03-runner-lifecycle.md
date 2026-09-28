# T01-03: Drive a synthetic attempt through the fenced runner protocol

**What to build:** A fixture-only attempt travels from the control plane through the versioned runner protocol and back as identity- and sequence-bound events. The controller remains authoritative for attempt state. A deterministic fake runner is sufficient for protocol and recovery development; this ticket does not qualify host isolation or authorize arbitrary candidate commands.

**Blocked by:** T01-02.

**Status:** blocked by T01-01 dependency chain (synthetic transport only).

- [ ] Commands and events bind to attempt identity, sequence, and lease generation; conflicting reuse is rejected.
- [ ] Duplicate delivery is idempotent, event gaps or stale generations fence progress, and runner spool data is never treated as authoritative state.
- [ ] Cancellation request, confirmed process stop, cleanup pending, and controller recovery are distinct durable states.
- [ ] Controller restart or database reconnection requires a recovery barrier before new work can be assigned.
- [ ] Real candidate execution remains unavailable unless the selected host profile proves isolation, resource bounds, and process-tree cleanup.
