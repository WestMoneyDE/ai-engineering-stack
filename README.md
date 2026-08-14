# Ömer Hüseyin Coskun — AI Engineering Stack

[Deutsch](README.de.md) · [Architecture](docs/ARCHITECTURE.md) · [Skills](docs/SKILLS.md) · [Capabilities](docs/CAPABILITIES.md) · [Setup](docs/SETUP.md) · [Public sources](docs/SOURCES.md)

![Governed AI engineering stack with Hermes at the center, a plan-build-verify-review-recover loop, a provider wait gate, and mobile human approval](assets/ai-engineering-stack-loop-hero.png)

> **Built for fully autonomous orchestration with secure mobile approvals.**

## 👋 About

I am **Ömer Hüseyin Coskun**, an AI engineer focused on reliable agent systems. I turn
models into an engineering workforce that can plan, build, verify, review, recover, and
leave durable evidence behind.

My stack keeps routine, reversible development moving while consequential actions remain
under human authority.

## ⚡ Autonomous orchestration

**Hermes Supervisor** is the control plane for the engineering loop. It reads durable
state, chooses the next valid role, coordinates hand-offs, prevents duplicate work,
handles provider waits, and resumes from evidence instead of chat memory.

When a provider reports a usage limit or temporary outage, Hermes projects a
fail-closed `WAITING_FOR_PROVIDER` state. The machine-readable `provider_wait` record
keeps only normalized routing data such as `retry_after` and `reset_at`; the same
logical run resumes with a new attempt after recovery, without storing raw provider
messages.

The architecture is designed for continuous operation. Activation of unattended worker
dispatch is treated as a separate, testable safety decision—not as a marketing claim.

## 🔁 Loop Engineering

I practice **Loop Engineering**: every cycle follows a bounded path from plan to build,
verification, independent review, and improvement. Each pass leaves machine-readable
state and evidence, so Hermes can resume safely after a restart or provider wait. A loop
ends only with verified completion, an explicit human gate, or a documented stop.

[Explore Loop Engineering](https://github.com/cobusgreyling/loop-engineering)

## 📱 Mobile approvals

Hermes is designed to stop at a secure human gate whenever an action is externally
visible, financial, legal, production-facing, destructive, or difficult to reverse. The
approval request is bound to one exact action, expires, and can be approved or rejected
from a phone through Telegram.

## 🤖 Agent workforce

- **Claude Code** handles repository-aware implementation and review workflows.
- **OpenAI Codex** supports planning, coding, diagnosis, verification, and focused tool use.
- Agents receive the smallest useful context and never become the source of project truth.

## 🧭 Specialized roles

- Planner — converts intent into a reviewable plan.
- Builder — implements only the approved scope.
- Independent reviewer — checks the diff, tests, and evidence instead of trusting a report.
- Security and compliance reviewer — challenges boundaries and escalation decisions.

## 💾 Durable memory

Tasks, decisions, run evidence, review results, and current state live in versioned files.
A fresh agent can continue after a restart without relying on a previous conversation.

## 🧩 Skills

Skills provide narrow, source-pinned guidance for the scope being changed: databases,
React, security, testing, API contracts, and other engineering disciplines. Local rules,
architecture, invariants, and executable tests always take priority.

[See all nine public skills and upstream repositories](docs/SKILLS.md).

## 🏗 Architecture capabilities

Append-only Ledger, Event Sourcing, State Machines, Multi-Tenancy, PostgreSQL RLS,
Auth/RBAC, Idempotency, Audit Trails, Provider Abstraction, Fail-closed AI, Mobile
Approvals, Durable Agent Memory, and Loop Engineering.

[Explore the full capability map](docs/CAPABILITIES.md).

## 🔌 MCP

Model Context Protocol is an optional connector boundary for GitHub, browsers, databases,
documents, and development systems. Connectors start read-only, use least privilege, and
never own workflow state or business truth.

## 🪝 Hooks and guardrails

- Allow/ask/deny permission policies
- Secret-path and sensitive-write protection
- Git safety and protected-action gates
- Completion hooks that demand evidence
- Human approval for irreversible or external effects

## 🧪 Verification

Completion requires evidence: type checking, linting, tests, security checks, evals,
negative counterchecks, and independent review. Model output proposes; deterministic
checks and humans decide.

## 🔐 Privacy by design

Private code stays private. Agents receive the minimum relevant context, credentials stay
outside Git, and logs exclude secrets, personal data, prompts, model transcripts, and
hidden reasoning.

## 🛠 Tech stack

| Layer | My setup |
|---|---|
| Orchestration | Hermes Supervisor |
| Engineering method | Bounded, evidence-driven Loop Engineering |
| Engineering agents | Claude Code + OpenAI Codex |
| Workflow | Plan → build → verify → independent review → human gate |
| Memory | Versioned tasks, state, evidence, decisions, and Git history |
| Knowledge | Scope-routed skills with pinned public provenance |
| Connectors | Optional MCP with least privilege |
| Safety | Hooks, permission policies, secret scanning, and mobile approvals |
| Quality | Typecheck, lint, tests, security checks, evals, and review |

Read the generic inventory in [docs/STACK.md](docs/STACK.md).

## 📦 Install the starter

Requirements: Git plus Git Bash or PowerShell. Node.js 20+ is needed only for the test
suite.

```bash
git clone https://github.com/WestMoneyDE/ai-engineering-stack.git
cd ai-engineering-stack
bash scripts/install.sh --dry-run
```

Apply only after reviewing the dry run:

```bash
bash scripts/install.sh --target ../my-project --apply
```

PowerShell:

```powershell
pwsh -File scripts/install.ps1 -Target ../my-project -Apply
```

## 📬 Contact

- GitHub: [WestMoneyDE](https://github.com/WestMoneyDE)
- Reddit: [u/WASSUCHICHHIER](https://www.reddit.com/user/WASSUCHICHHIER/)

If this stack helps your work, [star the repository on GitHub](https://github.com/WestMoneyDE/ai-engineering-stack).

The reusable starter material is MIT licensed.
