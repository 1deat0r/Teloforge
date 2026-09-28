# Historical design review provenance

The immutable bundle in `approved/` preserves the reviewed design, architecture diagram, presentation evidence and board report. [MANIFEST.json](approved/MANIFEST.json) records copied file hashes. Historical absolute filesystem paths in those snapshots describe the original review environment; navigate through this document and the project README for portable links.

- [Final r2 design](approved/teloforge-design.md)
- [Execution foundation, originally named Keel v2](approved/keel-v2-design.md)
- [Board report](approved/teloforge-review.md)
- [Artifact and review receipt](approved/teloforge-receipt.json)
- [Interactive Archify diagram](approved/teloforge-architecture.html)
- [Diagram JSON](approved/teloforge-architecture.json)
- [Presentation report](approved/teloforge-architecture.visual-check.html)

Five reviewers covered systems, evaluation, adversarial concerns, product/value and a final cold integration read. They returned BUILD on the same final r2 normative revision, with no unresolved material blocker. Earlier conditional findings caused revisions to intent authority, derived-data scope, evaluator isolation, holdout exposure and total promotion/rollout decisions. The report retains those findings and their closure evidence.

Approval is for beginning staged implementation of the design. It does not approve this new source scaffold, establish security certification, prove production readiness, or demonstrate a benchmark improvement over Paperclip. Reviewers were agent instances using multiple OpenAI model variants; this is not statistically independent human or cross-provider certification.

The diagram and presentation evidence are copied without re-rendering. The board report records nonblocking visual notes. No new diagram presentation run or runtime review took place during scaffold creation. Archived implementation tickets are planning drafts and are not independently board-approved deliverables.

## Subsequent project-spec review

The consolidated project specification received a separate five-seat review after placement in the requested project directory. Final project-r2/spec 0.3 passed with 5 BUILD votes after two rounds and a verified artifact-handoff correction. See [current board report](reviews/BOARD.md). That review covers specification consistency and staged implementability; runtime qualification remains pending. The historical `approved/` bundle above remains unchanged.
