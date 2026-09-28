# Triage label vocabulary

Use the following labels when an issue is intentionally triaged. Each triaged issue should have exactly one category and one state.

| Role | GitHub label | Meaning |
| --- | --- | --- |
| Category | `bug` | Existing behavior is broken. |
| Category | `enhancement` | New capability or improvement. |
| State | `needs-triage` | Maintainer review is needed. |
| State | `needs-info` | Waiting for reporter information. |
| State | `ready-for-agent` | Brief is sufficiently clear for an agent to act. |
| State | `ready-for-human` | Human judgment or implementation is needed. |
| State | `wontfix` | The request will not be actioned. |

The category labels and `wontfix` already exist on GitHub. The remaining state labels use the canonical names above. Issues remain optional; labels are for deliberate triage, not a required step for routine development. External PRs are not included in routine issue discovery. When the `triage` skill posts a comment, begin it with the skill's required AI-generated triage disclaimer.
