# T01-04: Finalize scoped, provenance-bound attempt evidence

**What to build:** A completed synthetic attempt can publish an immutable, tenant-scoped evidence artifact that the operator can inspect by reference. Evidence is finalized before dependent completion; failed or unsafe collection is visible and cannot be mistaken for success.

**Blocked by:** T01-03.

**Status:** ready-for-agent (synthetic artifacts only).

- [ ] Finalized artifacts bind to the attempt, tenant, source snapshot, producer, content digest, and relevant action identity.
- [ ] Collection rejects traversal, symlinks, hardlinks, special files, mount crossings, path substitution, and missing immutable-snapshot proof.
- [ ] Size, count, retention, and access scope are enforced; private prompts, credentials, and unrelated host/workspace data are never included.
- [ ] Failed, withheld, or quarantined evidence blocks any dependent successful completion and remains visible as such.
- [ ] Artifact metadata is durable in the control plane; artifact storage is not an alternate attempt-state authority.
