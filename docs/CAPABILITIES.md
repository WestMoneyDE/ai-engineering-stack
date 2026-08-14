# Architecture capabilities

These are **general architecture capabilities** I use to design reliable software and
agent systems. They describe engineering competence, not the internals of any private
application.

## 📒 Append-only Ledger

Model important facts as immutable entries. Corrections become new compensating facts
instead of silent mutation, preserving chronology, attribution, and auditability.

## 📡 Event Sourcing

Represent meaningful state changes as events and derive views from them. Use explicit
schemas, versioning, replay rules, and idempotent consumers so history remains usable.

## 🚦 State Machines

Define valid states, transitions, guards, evidence requirements, and terminal outcomes.
Invalid transitions fail closed instead of relying on agent interpretation.

## 🏢 Multi-Tenancy

Make tenant ownership explicit at every storage and execution boundary. Test isolation
negatively: prove that one tenant cannot observe or mutate another tenant's data.

## 🐘 PostgreSQL RLS

Enforce tenant and role visibility in the database with Row Level Security. Policies,
helper functions, indexes, and tests are designed together rather than delegated to UI
filtering.

## 🔑 Auth and RBAC

Separate identity, authentication, session handling, authorization, and capability
assignment. Default deny, minimize privilege, and test both allowed and forbidden paths.

## 🔂 Idempotency

Bind retried commands and external events to stable keys. Repetition returns the recorded
result or a safe conflict instead of duplicating effects.

## 🧾 Audit Trails

Record who or what acted, when, against which version, with which result and evidence.
Exclude secrets, personal content, prompts, transcripts, and hidden reasoning.

## 🔌 Provider Abstraction

Place external providers behind narrow interfaces with capability checks and test fakes.
Provider failure is explicit; unsupported behavior is refused rather than silently
degraded.

## 🧯 Fail-closed AI

Treat model output as untrusted structured input. Invalid schemas, unavailable providers,
missing evidence, or uncertain consequential decisions stop safely.

## 👤 Human-in-the-loop

Models propose and deterministic systems validate. Humans retain authority over legal,
financial, production, destructive, external, and difficult-to-reverse outcomes.

## 📱 Mobile Approvals

Bind a mobile approval to one exact actor, action, target, content version, and expiry.
Changed state, rejection, replay, or timeout produces denial.

## 💾 Durable Agent Memory

Persist tasks, decisions, attempts, current state, reviews, and evidence outside temporary
chat context. A new agent should be able to reconstruct the next valid action after a
restart.

## 🔁 Loop Engineering

Run bounded cycles of plan, build, verify, independent review, and improvement. Each cycle
must leave evidence and reach a verified exit, human gate, or documented stop.

## 🧩 Skills, MCP, Hooks, and Evals

Use skills for scoped knowledge, MCP for least-privilege connectivity, hooks for
deterministic policy enforcement, and evals for repeatable measurement. None of these
layers may override human authority or core invariants.

## Capability map

| Concern | Architectural response |
|---|---|
| Trustworthy history | Append-only Ledger · Event Sourcing · Audit Trails |
| Controlled progress | State Machines · Loop Engineering · Durable Agent Memory |
| Isolation and access | Multi-Tenancy · PostgreSQL RLS · Auth and RBAC |
| Reliable effects | Idempotency · Fail-closed AI · Mobile Approvals |
| Replaceable integrations | Provider Abstraction · MCP · test fakes |
| Agent quality | Specialized roles · Hooks · Evals · independent review |
| Consequential authority | Human-in-the-loop · scoped approvals · explicit stop states |

Explore the complete [AI Engineering Stack](https://github.com/WestMoneyDE/ai-engineering-stack).
