#!/usr/bin/env bash
set -euo pipefail

repo='1deat0r/Teloforge'
payload='.github/rulesets/main.json'

gh auth status >/dev/null
ruleset_id=$(gh api "repos/${repo}/rulesets" --jq '.[] | select(.name == "main-pull-request-and-ci") | .id' | head -n 1)

if [[ -n "$ruleset_id" ]]; then
  gh api --method PUT "repos/${repo}/rulesets/${ruleset_id}" --input "$payload"
else
  gh api --method POST "repos/${repo}/rulesets" --input "$payload"
fi

gh api "repos/${repo}/rulesets" --jq '.[] | select(.name == "main-pull-request-and-ci") | {id, name, target, enforcement, source}'
