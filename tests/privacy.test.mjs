import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const requiredPublicFiles = [
  "README.md",
  "README.de.md",
  "REDDIT_PROFILE.md",
  "assets/AI-IMAGE.md",
  "docs/ARCHITECTURE.md",
  "docs/SETUP.md",
  "docs/SOURCES.md",
  "docs/STACK.md",
];
const textExtensions = new Set([".json", ".md", ".mjs", ".ps1", ".sh", ".txt"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (textExtensions.has(extname(entry.name)) || entry.name === "LICENSE") files.push(path);
  }

  return files;
}

async function publicText() {
  const files = await walk(root);
  const sections = await Promise.all(files.map(async (path) => {
    const content = await readFile(path, "utf8");
    return `\n--- ${relative(root, path)} ---\n${content}`;
  }));
  return sections.join("");
}

test("the clean room contains every required public document", async () => {
  for (const path of requiredPublicFiles) {
    assert.equal((await stat(join(root, path))).isFile(), true, `${path} must exist`);
  }
});

test("public text contains no internal paths, private email, private repository link, or pinned product commit", async () => {
  const text = await publicText();

  assert.doesNotMatch(text, /[A-Z]:[\\/]/);
  assert.doesNotMatch(text, /\bbrain[\\/]/i);
  assert.doesNotMatch(text, /\bADR-?\d+/i);
  assert.doesNotMatch(text, /@icloud\.com/i);
  assert.doesNotMatch(text, /github\.com\/WestMoneyDE\/(?!ai-engineering-stack(?:\.git|\/|\b))/i);
  assert.doesNotMatch(text, /github\.com\/[^\s)]+\/tree\/[0-9a-f]{7,40}/i);
  assert.doesNotMatch(text, /\bsource matrix\b/i);
  assert.doesNotMatch(text, /\bproduct repositor(?:y|ies)\b/i);
});

test("every public URL stays inside the approved identity and primary-source allowlist", async () => {
  const text = await publicText();
  const urls = text.match(/https?:\/\/[^\s)<>'"`*]+/g) ?? [];
  assert.ok(urls.length > 0, "documentation must contain public source links");

  const allowed = [
    /^https:\/\/github\.com\/cobusgreyling\/loop-engineering\/?$/,
    /^https:\/\/github\.com\/WestMoneyDE(?:\/ai-engineering-stack(?:\.git|\/[^\s]*)?)?$/,
    /^https:\/\/www\.reddit\.com\/user\/WASSUCHICHHIER\/?$/,
    /^https:\/\/developers\.openai\.com\/codex\/?/,
    /^https:\/\/docs\.anthropic\.com\//,
    /^https:\/\/code\.claude\.com\/docs\//,
    /^https:\/\/modelcontextprotocol\.io\//,
    /^https:\/\/github\.com\/supabase\/agent-skills\/?/,
    /^https:\/\/github\.com\/vercel-labs\/agent-skills\/?/,
    /^https:\/\/github\.com\/OWASP\//,
    /^https:\/\/github\.com\/softaworks\/agent-toolkit\/?/,
    /^https:\/\/github\.com\/hookdeck\/webhook-skills\/?/,
    /^https:\/\/github\.com\/affaan-m\/ECC\/?/i,
    /^https:\/\/github\.com\/aj-geddes\/useful-ai-prompts\/?/,
    /^https:\/\/github\.com\/zubair-trabzada\/geo-seo-claude\/?/,
    /^https:\/\/westmoneyde\.github\.io\/ai-engineering-stack\/?/,
    /^https:\/\/refero\.design\/?/,
    /^https:\/\/21st\.dev(?:\/|$)/,
    /^http:\/\/localhost(?::\d+)?(?:\/|$)/,
  ];

  for (const url of urls) {
    assert.ok(allowed.some((pattern) => pattern.test(url)), `unapproved public URL: ${url}`);
  }
});
