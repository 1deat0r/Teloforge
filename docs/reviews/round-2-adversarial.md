# Adversarial authority and isolation — 2

Agent: `/root/project_adversarial` · Model: `gpt-5.6-sol`

The reviewer response below is retained as delivered; line citations refer to its frozen round.

---

**A1 PASS**

The frozen r2 directly closes the confused-deputy artifact path:

- `SPEC.md:173`: “Content integrity identifies bytes; it does not establish that those bytes are safe” and the collector has “no evaluator signing keys, database credentials, host secrets or receipt-store access.”
- `SPEC.md:175`: collection requires candidate process-tree termination and a “frozen read-only snapshot”; inability to prove either causes quarantine and withheld grading/completion.
- `SPEC.md:177`: collection is “descriptor-rooted,” OS-enforced beneath-root and no-follow; accepts only allowlisted relative paths and “regular files whose link count is exactly one”; rejects traversal, links, special files and mount crossings; hashes/copies the same opened object under resource limits.
- `SPEC.md:179`: archives remain opaque until processed in a “fresh disposable, credential-free processing sandbox” without host sockets, privileged mounts, control/receipt APIs or unauthorized egress.
- `SPEC.md:181`: candidate code executes only in a fresh credential-free sandbox separated from scoring authority; parsing/execution cannot share controller identity, keys or address space; the controller accepts only bounded schema-validated results from the designated evaluator and constructs/signs receipts itself.
- `SPEC.md:183` makes symlink/host capture, hardlink/mount escape, path substitution, special files, archive attacks, malicious parsers/executables and forged grader output mandatory T01/T03 qualification, requiring zero host disclosure, controller execution or accepted forgery.

The supporting documents align rather than weakening this contract: `docs/CONTRACTS.md:42–44`, `docs/DATA_MODEL.md:27–29`, `docs/tasks/T01-intent-execution.md:10,22`, and `docs/tasks/T03-evolution-release.md:9,18`.

No new material defect introduced by r2 was found. The design now specifies both prevention mechanisms and acceptance evidence while preserving quarantine/fail-closed behavior.

Manifest pin verified: normative prefix exactly 54,429 bytes with SHA-256 `712190480311998d0913ca9707a7db5bf3be72a75b73c9474cfd2e3f8d91dcef`; changed document hashes match the round-2 manifest.

**BUILD**
