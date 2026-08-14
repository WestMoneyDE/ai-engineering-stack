# Public engineering skills

This page lists the **nine public skills** represented in my reusable engineering stack.
Every entry links to its public upstream repository. The list shows technical range and
skill governance without identifying where a skill is applied privately.

Skills are not autonomous architecture authorities. I load them only for the active
scope, pin their public upstream, review updates, and reject guidance that conflicts with
local invariants, security boundaries, or executable tests.

## 🗄 Data and database engineering

### Supabase

- **Scope:** Supabase Auth, sessions, SSR, clients, servers, middleware, storage, realtime,
  edge functions, and platform integrations.
- **Use:** Product-aware implementation and diagnosis while preserving explicit security
  and tenant boundaries.
- **Public upstream:** [supabase/agent-skills](https://github.com/supabase/agent-skills)
- **Skill path:** `skills/supabase/SKILL.md`

### Supabase Postgres Best Practices

- **Scope:** Schema design, query performance, indexing, connection management,
  concurrency, security, and Row Level Security.
- **Use:** Database design and review with PostgreSQL behavior kept explicit.
- **Public upstream:** [supabase/agent-skills](https://github.com/supabase/agent-skills)
- **Skill path:** `skills/supabase-postgres-best-practices/SKILL.md`

## ⚛ Frontend architecture

### React Best Practices

- **Scope:** React and Next.js rendering, data fetching, bundle discipline, server/client
  boundaries, and web performance.
- **Use:** Performance-aware implementation and review rather than generic component advice.
- **Public upstream:** [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)
- **Skill path:** `skills/react-best-practices/SKILL.md`

### React Composition Patterns

- **Scope:** Component APIs, compound components, context, state ownership, render props,
  and scalable composition.
- **Use:** Designing reusable interfaces without boolean-prop sprawl or hidden coupling.
- **Public upstream:** [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)
- **Skill path:** `skills/composition-patterns/SKILL.md`

## 🛡 Security and API contracts

### OWASP Code Security Review

- **Scope:** Evidence-based code review, authentication, authorization, injection,
  dependency risk, secrets, web security, and structured remediation.
- **Use:** Independent security assessment with explicit findings instead of vague advice.
- **Public upstream:** [OWASP/secure-agent-playbook](https://github.com/OWASP/secure-agent-playbook)
- **Skill path:** `plugins/code-security-skills/skills/code-review-security/SKILL.md`

### OpenAPI to TypeScript

- **Scope:** Converting OpenAPI contracts into TypeScript interfaces and runtime guards.
- **Use:** Keeping API contracts typed, reviewable, and separate from handwritten domain
  logic.
- **Public upstream:** [softaworks/agent-toolkit](https://github.com/softaworks/agent-toolkit)
- **Skill path:** `skills/openapi-to-typescript/SKILL.md`

## 🔁 Reliability and integration

### Stripe Webhooks

- **Scope:** Signature verification, raw-body handling, event parsing, idempotency,
  retries, replay safety, and observable webhook processing.
- **Use:** Designing external event ingestion that fails closed and tolerates redelivery.
- **Public upstream:** [hookdeck/webhook-skills](https://github.com/hookdeck/webhook-skills)
- **Skill path:** `skills/stripe-webhooks/SKILL.md`

### Property-based Testing

- **Scope:** Invariants, generators, shrinking, boundary exploration, and counterexamples.
- **Use:** Testing rules across a wide input space instead of relying only on selected
  examples.
- **Public upstream:** [aj-geddes/useful-ai-prompts](https://github.com/aj-geddes/useful-ai-prompts)
- **Skill path:** `skills/property-based-testing/SKILL.md`

## 🌍 Specialized public reference

### Customs and Trade Compliance

- **Scope:** Structured customs and cross-border compliance research patterns.
- **Use:** A reference workflow for identifying questions, required evidence, and human
  review boundaries; never a substitute for legal advice or an automatic legal decision.
- **Public upstream:** [affaan-m/ECC](https://github.com/affaan-m/ECC)
- **Skill path:** `skills/customs-trade-compliance/SKILL.md`

## Skill governance

```text
TASK SCOPE
  -> route only relevant skills
  -> verify public upstream and pinned path
  -> compare advice with local rules and tests
  -> accept, adapt, or reject explicitly
  -> record verification evidence
```

- A skill advises; it does not own state or approve consequences.
- Public provenance does not make every recommendation correct for every system.
- Security-sensitive skills belong in an independent review path.
- Updates are reviewed like dependency changes.
- Private context and credentials never belong in a reusable skill package.

Return to the [AI Engineering Stack](https://github.com/WestMoneyDE/ai-engineering-stack).
