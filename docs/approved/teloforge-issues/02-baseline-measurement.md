# T02 — Baseline and measurement

Status: PLANNED; not started.
Type: Implementation and measurement.
Phase: 2.
Blocked by: T01; a future implementation instruction.

## What and why

Measure a fixed incumbent on a predeclared workload before proposing efficiency or quality gains.

## Method

Register admitted task strata, acceptance rules, primary/protected metrics, sample/repeat counts, control environment, usage coverage, missingness policy and uncertainty method. Count failed and cancelled attempts. Preserve source-data scope and keep development and final-gate data separate. Record exact bundle/model metadata; report opaque usage as unknown. Characterize variance without claiming an improvement effect.

## Acceptance and pre-registered decision rule

**DIES** if at least 1 trial is knowingly excluded contrary to the registered roster, or measurements are fabricated; **WEAKENS** if roster accounting is below 100%, required evidence is unavailable, or the predeclared method cannot estimate the needed variance; **SURVIVES** if 100% of admitted trials have records including explicit missingness, all registered baseline requirements pass, and the observed baseline supports a justified sample/margin plan for T03. Unknown usage blocks dependent efficiency comparisons even when accounting records are complete.

Falsifier/null: instrumentation or cohort design cannot support a meaningful, auditable candidate/incumbent comparison.

Risks: model drift, tokenizer differences, delayed billing, task correlation, subjective quality calibration.
