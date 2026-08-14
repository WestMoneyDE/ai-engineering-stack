# Repository Agent Contract

This repository stores durable engineering context in versioned files, not only in chat.

## Before changing files

1. Read the project rules, task, relevant decisions, and existing implementation.
2. State assumptions and keep scope explicit.
3. Write a reviewable plan and wait for the required approval.
4. Add or update a failing test before implementation.

## Delivery loop

`PLAN → BUILD → VERIFY → INDEPENDENT REVIEW → HUMAN GATE → COMPLETE`

- Work on one bounded task at a time.
- Prefer deterministic checks before model judgment.
- Record evidence for every completion claim.
- Keep secrets, personal data, prompts, transcripts, and hidden reasoning out of logs.
- Treat skills and MCP connectors as adapters; repository rules remain authoritative.
- Require a human decision for external, irreversible, financial, legal, destructive, or
  production-facing actions.

## Verification

Run the repository's typecheck, lint, tests, security checks, and evals. Inspect the final
diff and metadata. An independent reviewer evaluates the actual change and reruns relevant
checks before completion.

## Git safety

- Never force-push without a specific, current human authorization.
- Never retry a failed push automatically.
- Show status and recent commits immediately before an approved push.
- Stage explicit paths and preserve unrelated work.
