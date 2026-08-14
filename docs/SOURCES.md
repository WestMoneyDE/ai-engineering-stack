# Public sources

Only public primary documentation and public upstream projects are cited here. This page
does not link to private implementation evidence.

## Agent hosts and orchestration features

- [OpenAI Codex documentation](https://developers.openai.com/codex/) — official Codex
  documentation and engineering workflows.
- [Claude Code overview](https://code.claude.com/docs/en/overview) — official description
  of repository-aware coding, tool use, commands, and review workflows.
- [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) — official
  agentic loop covering context gathering, action, and verification.
- [Claude Code extension overview](https://code.claude.com/docs/en/features-overview) —
  official guidance for project rules, skills, subagents, hooks, MCP, and plugins.

Hermes Supervisor is my personal control-plane design. It is described here as an
engineering architecture, not presented as a publicly installable upstream package.

## Model Context Protocol

- [What is MCP?](https://modelcontextprotocol.io/docs/getting-started/intro) — official
  introduction to MCP as an open standard connecting AI applications to tools, data, and
  workflows.
- [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture) — official
  host, client, server, transport, and data-layer model.

My least-privilege and human-gate policies are choices of this stack. MCP itself defines
the connection protocol, not the authority model of an application.

## Public skill upstreams

- [Supabase Agent Skills](https://github.com/supabase/agent-skills) — public skills for
  Supabase and Postgres engineering.
- [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills) — public agent-skills
  ecosystem and web engineering guidance.
- [OWASP Secure Agent Playbook](https://github.com/OWASP/secure-agent-playbook) — public,
  structured security procedures for code and agent-system review.
- [Softaworks Agent Toolkit](https://github.com/softaworks/agent-toolkit) — public agent
  skills including OpenAPI-to-TypeScript contract generation.
- [Hookdeck Webhook Skills](https://github.com/hookdeck/webhook-skills) — public skills for
  signature verification, idempotency, retries, and provider webhook handling.
- [ECC](https://github.com/affaan-m/ECC) — public engineering skill collection including
  specialized reference workflows.
- [Useful AI Prompts](https://github.com/aj-geddes/useful-ai-prompts) — public prompt and
  skill collection including property-based testing guidance.

Upstream guidance remains subordinate to the architecture, constraints, and executable
tests of the repository where it is used.

## Loop engineering and public-site research

- [Loop Engineering](https://github.com/cobusgreyling/loop-engineering) — public reference
  for bounded engineering loops and review-driven continuation.
- [GEO SEO Claude](https://github.com/zubair-trabzada/geo-seo-claude) — public reference
  for answer-first discoverability, citation readiness, crawler analysis, and structured
  reports. The landing page adapts those principles without exposing private project
  evidence.
- [Refero](https://refero.design/) — design research for real product screens and flows;
  no Refero screenshots, logos, or copy are rehosted here.
- [21st.dev](https://21st.dev/) and its [Terms](https://21st.dev/terms) — component
  marketplace reference. No marketplace preview media is reused; any future component
  adaptation must retain a visible source link and comply with the individual component
  license.
