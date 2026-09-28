# Evaluation and evolution

## Ownership

Evaluation measures candidate outcomes and proposes improvements. The release registry and kernel-controlled policy own promotion decisions. An agent, evaluator, or exploration run cannot grant itself broader authority or mark its own candidate qualified.

## Code

`packages/evaluation`, `packages/evolution`, and `packages/registry` define shared domain ports. `workers/evaluator` and `workers/evolution-lab` are separate worker entry points.

## Boundaries

- Keep evaluator rules, signing keys, sealed data, holdouts, and release authority outside learner execution.
- Preserve tenant and source provenance across derived artifacts, datasets, memories, and bundles.
- Separate candidate execution from protected scoring; treat collected content as untrusted.
- Require the registered evidence, complete accounting, ordered gates, and bounded canary/rollback specified in `SPEC.md` before any release.
- Workers must remain visibly disabled until independently qualified and authorized.

Current packages and workers are interfaces or disabled stubs. Do not describe an evaluation, self-improvement loop, or promotion path as operational.
