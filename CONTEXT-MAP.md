# Teloforge context map

Read `AGENTS.md` and the relevant sections of `SPEC.md` first. Then select the smallest applicable context below. `docs/adr/` contains system-wide decisions. The current implementation status is in `docs/IMPLEMENTATION.md`.

| Context | Read | Main paths |
| --- | --- | --- |
| Control plane and governed effects | [`docs/agents/contexts/control-plane/CONTEXT.md`](docs/agents/contexts/control-plane/CONTEXT.md) | `apps/control`, `packages/{contracts,kernel,policy,db,broker,artifacts,adapters,observability}` |
| Runner and protocol | [`docs/agents/contexts/runner/CONTEXT.md`](docs/agents/contexts/runner/CONTEXT.md) | `crates/protocol`, `crates/runner` |
| Evaluation and evolution | [`docs/agents/contexts/evaluation-release/CONTEXT.md`](docs/agents/contexts/evaluation-release/CONTEXT.md) | `packages/{evaluation,evolution,registry}`, `workers/{evaluator,evolution-lab}` |
| Operator console | [`docs/agents/contexts/console/CONTEXT.md`](docs/agents/contexts/console/CONTEXT.md) | `apps/console` |

Cross-context changes should read every affected context. Do not read every context for routine work.
