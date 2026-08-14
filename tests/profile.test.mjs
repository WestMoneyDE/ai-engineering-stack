import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFile(join(root, path), "utf8");

test("the English README presents the approved personal AI engineering profile", async () => {
  const english = await read("README.md");
  const requiredMarkers = ["👋", "⚡", "📱", "🤖", "🧭", "💾", "🧩", "🔌", "🪝", "🧪", "🔐", "🛠", "📦", "📬"];

  assert.match(english, /^# Ömer Hüseyin Coskun — AI Engineering Stack/m);
  assert.match(english, /Hermes Supervisor/);
  assert.match(english, /Built for fully autonomous orchestration with secure mobile approvals/);
  assert.match(english, /Claude Code/);
  assert.match(english, /OpenAI Codex/);
  assert.match(
    english,
    /## 🔁 Loop Engineering[\s\S]*\[Explore Loop Engineering\]\(https:\/\/github\.com\/cobusgreyling\/loop-engineering\)/,
  );
  assert.match(english, /reddit\.com\/user\/WASSUCHICHHIER\//);
  assert.match(english, /\[Deutsch\]\(README\.de\.md\)/);
  assert.doesNotMatch(english, /currently running fully autonomously/i);
  assert.doesNotMatch(english, /case stud(?:y|ies)/i);
  for (const marker of requiredMarkers) assert.match(english, new RegExp(marker, "u"));
});

test("the German README mirrors the honest target-state claim", async () => {
  const german = await read("README.de.md");

  assert.match(german, /^# Ömer Hüseyin Coskun — AI-Engineering-Stack/m);
  assert.match(german, /Hermes Supervisor/);
  assert.match(german, /Ausgelegt für vollautonome Orchestrierung mit sicheren Handyfreigaben/);
  assert.match(german, /Claude Code/);
  assert.match(german, /OpenAI Codex/);
  assert.match(
    german,
    /## 🔁 Loop Engineering[\s\S]*\[Loop Engineering von Cobus Greyling\]\(https:\/\/github\.com\/cobusgreyling\/loop-engineering\)/,
  );
  assert.match(german, /reddit\.com\/user\/WASSUCHICHHIER\//);
  assert.doesNotMatch(german, /läuft bereits dauerhaft vollautonom/i);
});

test("the Reddit file provides a short bio and a copy-ready profile", async () => {
  const reddit = await read("REDDIT_PROFILE.md");
  const shortBio = reddit.match(/<!-- short-bio:start -->\s*([^\r\n]+)\s*<!-- short-bio:end -->/);

  assert.ok(shortBio, "short bio markers and one-line bio are required");
  assert.ok([...shortBio[1]].length <= 200, "short bio must fit within 200 characters");
  assert.match(reddit, /Hermes Supervisor/);
  assert.match(reddit, /Built for fully autonomous orchestration with secure mobile approvals/);
  assert.match(reddit, /🔁 \*\*Loop Engineering\*\*[\s\S]*github\.com\/cobusgreyling\/loop-engineering/);
  assert.match(reddit, /reddit\.com\/user\/WASSUCHICHHIER\//);
});
