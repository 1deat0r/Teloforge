# Adversarial authority and isolation — 1

Agent: `/root/project_adversarial` · Model: `gpt-5.6-sol`

The reviewer response below is retained as delivered; line citations refer to its frozen round.

---

**REJECT**

**A1 — Candidate artifact handoff can turn the trusted evaluator into a confused deputy.**
`SPEC.md` §Evaluator execution boundary says grading reads candidate-produced artifacts “from the trusted side” (`SPEC.md:165`), while the controller and signing/DB credentials remain outside the candidate sandbox (`:165–169`). Filesystem mounts constrain the candidate process, but do not constrain a privileged collector resolving candidate-created symlinks, hardlinks, FIFOs, device nodes, archive paths, or parser payloads from the host side. Calling artifacts untrusted (`:167`) and checking integrity (`:165`) does not define a safe collection or execution boundary; a digest can faithfully authenticate poisoned content. The general snapshot rule only says to select files and avoid uploading an evolving directory (`:259`). Neither `docs/DATA_MODEL.md:15,27–28`, T01 artifact acceptance (`docs/tasks/T01-intent-execution.md:22`), nor T03 acceptance (`docs/tasks/T03-evolution-release.md:16`) closes this route.

This violates the stated invariant that candidates cannot access evaluator credentials, control APIs, host sockets, privileged mounts, or the receipt store (`SPEC.md:167`) and the T03 criterion that evaluator credential access and forged/unauthorized results yield zero accepted results (`SPEC.md:169`; `docs/tasks/T03-evolution-release.md:16`).

**Closure condition:** Normatively define descriptor-rooted, no-follow artifact collection after candidate termination: allowlisted relative paths; regular single-link files only; reject symlinks, hardlinks, FIFOs, sockets, devices and traversal/archive escapes; enforce file/count/depth/byte limits; hash the already-open object. Parse or execute candidate content only in a fresh credential-free grader sandbox with no host sockets or unauthorized egress. Add T03 cases for symlink/host-path capture, archive traversal, special-file blocking, and malicious parser/executable artifacts, requiring zero host disclosure, controller execution, or accepted receipt.

**Nonblocking:** Direct authority, tenant lineage, revocation, and learner/release separation are coherently specified. The disabled scaffold matches `SPEC.md:307–311` and the inspected source.

**Pin:** normative prefix is 49,886 bytes, SHA-256 `02289c…c3be`; all manifest-listed hashes match. Manifest SHA-256 is `3c482eac…4f29`.

**Unverified runtime claims:** None; no builds or tests were run.
