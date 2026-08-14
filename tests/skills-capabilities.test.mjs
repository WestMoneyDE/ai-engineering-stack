import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFile(join(root, path), "utf8");

const expectedSkills = [
  ["supabase", "Supabase", "https://github.com/supabase/agent-skills"],
  ["supabase-postgres-best-practices", "Supabase Postgres Best Practices", "https://github.com/supabase/agent-skills"],
  ["vercel-react-best-practices", "React Best Practices", "https://github.com/vercel-labs/agent-skills"],
  ["vercel-composition-patterns", "React Composition Patterns", "https://github.com/vercel-labs/agent-skills"],
  ["code-review-security", "OWASP Code Security Review", "https://github.com/OWASP/secure-agent-playbook"],
  ["openapi-to-typescript", "OpenAPI to TypeScript", "https://github.com/softaworks/agent-toolkit"],
  ["stripe-webhooks", "Stripe Webhooks", "https://github.com/hookdeck/webhook-skills"],
  ["property-based-testing", "Property-based Testing", "https://github.com/aj-geddes/useful-ai-prompts"],
  ["customs-trade-compliance", "Customs and Trade Compliance", "https://github.com/affaan-m/ECC"],
];

test("the skills page lists every public skill with its upstream repository", async () => {
  const page = await read("docs/SKILLS.md");

  assert.match(page, /^# Public engineering skills/m);
  for (const [, title, url] of expectedSkills) {
    assert.match(page, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
    assert.ok(page.includes(url), `${title} must link to ${url}`);
  }
  assert.match(page, /nine public skills/i);
  assert.match(page, /public upstream/i);
});

test("the example lock contains exactly the nine documented skills", async () => {
  const lock = JSON.parse(await read("templates/skills-lock.example.json"));
  const names = Object.keys(lock.skills).sort();
  const expectedNames = expectedSkills.map(([name]) => name).sort();

  assert.deepEqual(names, expectedNames);
  for (const skill of Object.values(lock.skills)) {
    assert.match(skill.source, /^[\w.-]+\/[\w.-]+$/);
    assert.match(skill.skillPath, /SKILL\.md$/);
  }
});

test("the capabilities page demonstrates the approved architecture range", async () => {
  const page = await read("docs/CAPABILITIES.md");
  const capabilities = [
    "Append-only Ledger",
    "Event Sourcing",
    "State Machines",
    "Multi-Tenancy",
    "PostgreSQL RLS",
    "Auth and RBAC",
    "Idempotency",
    "Audit Trails",
    "Provider Abstraction",
    "Fail-closed AI",
    "Human-in-the-loop",
    "Mobile Approvals",
    "Durable Agent Memory",
    "Loop Engineering",
    "Skills, MCP, Hooks, and Evals",
  ];

  assert.match(page, /^# Architecture capabilities/m);
  for (const capability of capabilities) {
    assert.match(page, new RegExp(capability.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
  assert.match(page, /general architecture capabilities/i);
});

test("both READMEs link skills and capabilities from the top navigation", async () => {
  const [english, german] = await Promise.all([read("README.md"), read("README.de.md")]);

  assert.match(english, /\[Skills\]\(docs\/SKILLS\.md\)/);
  assert.match(english, /\[Capabilities\]\(docs\/CAPABILITIES\.md\)/);
  assert.match(german, /\[Skills\]\(docs\/SKILLS\.md\)/);
  assert.match(german, /\[Kompetenzen\]\(docs\/CAPABILITIES\.md\)/);
});
