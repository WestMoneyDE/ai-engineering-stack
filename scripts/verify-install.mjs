import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const required = [
  "README.md",
  "README.de.md",
  "REDDIT_PROFILE.md",
  "LICENSE",
  "assets/AI-IMAGE.md",
  "assets/ai-engineering-stack-hero.png",
  "assets/ai-engineering-stack-loop-hero.png",
  "assets/site-hermes-atmosphere.png",
  "assets/site-evidence-ledger.png",
  "assets/site-mobile-approval.png",
  "docs/ARCHITECTURE.md",
  "docs/CAPABILITIES.md",
  "docs/PROFILE-SNIPPET.md",
  "docs/SETUP.md",
  "docs/SOURCES.md",
  "docs/SKILLS.md",
  "docs/STACK.md",
  "scripts/install.ps1",
  "scripts/install.sh",
  "templates/AGENTS.md",
  "templates/.claude/hooks/protect-sensitive.sh",
  "templates/.claude/settings.example.json",
  "templates/skills-lock.example.json",
  "site/index.html",
  "site/styles.css",
  "site/main.js",
  "site/robots.txt",
  "site/sitemap.xml",
  "site/llms.txt",
  "scripts/build-site.mjs",
  "scripts/site-check.mjs",
];

for (const path of required) await access(join(root, path));

const [english, german, reddit, settings, skills, bash, powershell, png] = await Promise.all([
  readFile(join(root, "README.md"), "utf8"),
  readFile(join(root, "README.de.md"), "utf8"),
  readFile(join(root, "REDDIT_PROFILE.md"), "utf8"),
  readFile(join(root, "templates/.claude/settings.example.json"), "utf8"),
  readFile(join(root, "templates/skills-lock.example.json"), "utf8"),
  readFile(join(root, "scripts/install.sh"), "utf8"),
  readFile(join(root, "scripts/install.ps1"), "utf8"),
  readFile(join(root, "assets/ai-engineering-stack-hero.png")),
]);

JSON.parse(settings);
JSON.parse(skills);

for (const content of [english, german, reddit]) {
  assert.match(content, /Hermes Supervisor/);
  assert.match(content, /WASSUCHICHHIER/);
  assert.doesNotMatch(content, /[A-Z]:[\\/]/);
  assert.doesNotMatch(content, /@icloud\.com/i);
}

assert.match(english, /Built for fully autonomous orchestration with secure mobile approvals/);
assert.match(german, /Ausgelegt für vollautonome Orchestrierung mit sicheren Handyfreigaben/);
assert.match(bash, /dry-run/);
assert.match(bash, /Refusing to overwrite/);
assert.match(powershell, /DRY RUN/);
assert.match(powershell, /Refusing to overwrite/);

const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
assert.deepEqual(png.subarray(0, 8), signature);
assert.equal(png.subarray(12, 16).toString("ascii"), "IHDR");
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
assert.ok(width >= 1200 && height >= 630 && width > height);

console.log("Public profile and installer contract verified.");
