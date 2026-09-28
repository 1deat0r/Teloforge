# T02 — Fixed baseline and outcome accounting

Status: not implemented. Dependency: T01. No optimization runs before baseline instrumentation can account for their full cost and outcome.

## Work

- Freeze a versioned task cohort, environment and incumbent bundle. Record model aliases plus available resolved metadata and the limits of model pinning.
- Record admitted tasks and every failed, retried, cancelled and timed-out attempt; preserve unknown usage and incomplete grading as explicit missingness.
- Report accepted outcome rate, task-specific accuracy/quality, latency distribution, cost and human intervention. Separate execution, verification, evaluation and learning expense.
- Track provider/model input, output, cached input and available reasoning tokens separately. Different tokenizers do not make raw token totals directly comparable.
- Characterize paired repeatability, variance, task strata, evaluator behavior and available resource ceilings.
- If comparing with Paperclip, pin its version, provider conditions, workload and policies; include engineering/evaluation expense and publish limitations.

## Required future acceptance evidence

Every admitted trial has an outcome/accounting record or explicit missingness. Ratios per accepted result always include acceptance rate and cohort membership; zero accepted results yields undefined/unbounded ratios. Fixed baselines can be reproduced within characterized variability. No quality or efficiency claim depends on unmeasured data. Outputs inform numeric T03 experiment registration rather than retroactive thresholds.
