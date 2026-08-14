# Stack inventory

This is a generic description of my engineering environment. It documents personal
tooling and reusable operating principles without exposing private code or internal
implementation evidence.

## ⚡ Orchestration — Hermes Supervisor

Hermes is the deterministic control plane around the agent workforce. It is designed to:

- read durable workflow state without asking a model what happened;
- route the next valid role and prevent duplicate workers;
- preserve work across restarts and provider limits;
- separate routine development from consequential actions;
- request a scoped mobile approval when human authority is required.

The public claim is intentionally precise: **built for fully autonomous orchestration
with secure mobile approvals**. Unattended dispatch and the approval return path must be
activated and verified independently before they are described as continuously running.

## 🔁 Loop Engineering

Loop Engineering treats agentic development as a bounded, evidence-producing control
loop rather than a single prompt. Each cycle plans, builds, verifies, receives independent
review, and either improves the change or exits through a verified completion or human
gate. Durable state lets Hermes resume the correct step without trusting conversation
memory.

[Explore Loop Engineering by Cobus Greyling](https://github.com/cobusgreyling/loop-engineering)

### Provider waits

Usage limits and temporary provider outages are explicit, fail-closed state rather
than hidden retries. Hermes records normalized `provider_wait` metadata (`retry_after`,
`reset_at`, source run and failure class), starts no worker while waiting, and resumes
the same logical run with a new attempt after recovery.

## 🤖 Engineering agents

| Agent | Use |
|---|---|
| Claude Code | Repository-aware implementation, command execution, verification, and review |
| OpenAI Codex | Planning, implementation, diagnosis, review, research, and focused tool use |

Models do not own project state. They consume an approved task and return work plus
evidence to a deterministic workflow.

## 🧭 Roles and separation of duties

| Role | Responsibility |
|---|---|
| Planner | Defines scope, assumptions, risks, and acceptance criteria |
| Builder | Implements the approved plan and records verification evidence |
| Independent reviewer | Re-runs checks and judges the actual diff |
| Security/compliance reviewer | Challenges sensitive boundaries and escalation choices |

The builder cannot approve its own work. Repeated review failure escalates instead of
looping forever.

## 💾 Durable state

The workflow persists tasks, current state, attempts, decisions, implementation evidence,
and reviews in versioned artifacts. Chat history is convenient context, never the only
place where progress exists.

## 🧩 Skills

Skills are small, scope-routed instruction packages. They add focused knowledge without
becoming architecture authorities.

- Load only what the touched scope needs.
- Pin public provenance and review updates deliberately.
- Prefer local invariants and executable tests when guidance conflicts.
- Keep security and domain review independent from implementation.

## 🔌 MCP

MCP is a connector boundary, not the center of the system. It can expose tools, resources,
and workflows from external systems while the repository retains authority.

- Start with read-only discovery.
- Grant mutation tools individually.
- Keep credentials in the operating system or an approved secret manager.
- Require a human gate for messages, deployments, payments, production writes, and other
  external effects.
- Treat connector failure as failure; never invent success.

## 🪝 Hooks and permissions

The default policy separates operations into three groups:

- **Allow:** local reads, search, tests, formatting, and reversible development.
- **Ask:** pushes, external submissions, production interaction, and consequential writes.
- **Deny:** forceful history destruction, secret-file writes, permission bypasses, and
  unreviewed infrastructure or production actions.

Pre-tool hooks protect sensitive paths. Completion hooks demand verification evidence.
Git hooks enforce repository safety independently from agent instructions.

## 🧪 Quality system

1. Write a failing test or counterexample first.
2. Implement the smallest change that satisfies it.
3. Run type checking, linting, tests, and targeted security checks.
4. Inspect the final diff and metadata.
5. Run an independent review against acceptance criteria.
6. Escalate consequential action to the human approval gate.

## 🔐 Data discipline

- Send the minimum useful context to a model.
- Scan for secrets and personal data before model calls.
- Keep credentials, private code, prompts, transcripts, and hidden reasoning out of logs.
- Fail closed when structured AI output is missing or invalid.
- Record provider and prompt metadata only when it improves auditability without leaking
  protected content.
