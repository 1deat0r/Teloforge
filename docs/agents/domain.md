# Domain documentation

Teloforge is a multi-context workspace. Start with the root `CONTEXT-MAP.md`, then read only the context documents relevant to the task. For cross-context work, read every affected context. Avoid loading every domain document for routine changes.

`docs/adr/` contains system-wide architecture decisions. `SPEC.md`, explicit specification revision resolutions, and `docs/IMPLEMENTATION.md` define product requirements and current capability limits. Read the relevant current milestone in `docs/tasks/` before changing product behavior. `docs/approved/` is an immutable historical review bundle; add new revisions elsewhere.

The context map links control plane/effects, runner/protocol, evaluation/release, and operator-console ownership. Keep the architecture boundaries in root `AGENTS.md` intact while simplifying development process.
