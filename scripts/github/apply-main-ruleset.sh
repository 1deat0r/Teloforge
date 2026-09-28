#!/usr/bin/env bash
set -euo pipefail

repo='1deat0r/Teloforge'
payload='.github/rulesets/main.json'

gh auth status >/dev/null
ruleset_id=$(gh api "repos/${repo}/rulesets" --jq '.[] | select(.name == "main-local-first-integrity") | .id' | head -n 1)

if [[ -z "$ruleset_id" ]]; then
  # Rename/update the original ruleset rather than creating a second active rule.
  ruleset_id=$(gh api "repos/${repo}/rulesets" --jq '.[] | select(.name == "main-pull-request-and-ci") | .id' | head -n 1)
fi

if [[ -n "$ruleset_id" ]]; then
  gh api --method PUT "repos/${repo}/rulesets/${ruleset_id}" --input "$payload"
else
  gh api --method POST "repos/${repo}/rulesets" --input "$payload"
fi

gh api "repos/${repo}/rulesets" --jq '.[] | select(.name == "main-local-first-integrity") | {id, name, target, enforcement, source}'
