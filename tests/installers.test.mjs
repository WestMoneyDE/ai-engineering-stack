import assert from "node:assert/strict";
import { access, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const expectedFiles = [
  "AGENTS.md",
  join(".claude", "settings.example.json"),
  join(".claude", "hooks", "protect-sensitive.sh"),
  "skills-lock.example.json",
];

function run(file, args) {
  const result = spawnSync(file, args, { cwd: root, encoding: "utf8" });
  return { ...result, output: `${result.stdout ?? ""}${result.stderr ?? ""}` };
}

async function absent(path) {
  await assert.rejects(access(path));
}

test("Bash dry-run reports the plan without writing", async (t) => {
  if (process.platform === "win32" && !process.env.ProgramFiles) t.skip("Git Bash location unavailable");
  const target = await mkdtemp(join(tmpdir(), "ai-stack-bash-dry-"));
  t.after(() => rm(target, { recursive: true, force: true }));
  const bash = process.platform === "win32" ? join(process.env.ProgramFiles, "Git", "bin", "bash.exe") : "bash";
  const result = run(bash, ["scripts/install.sh", "--target", target, "--dry-run"]);

  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /DRY RUN/i);
  for (const path of expectedFiles) await absent(join(target, path));
});

test("Bash apply installs templates and refuses an overwrite", async (t) => {
  if (process.platform === "win32" && !process.env.ProgramFiles) t.skip("Git Bash location unavailable");
  const target = await mkdtemp(join(tmpdir(), "ai-stack-bash-apply-"));
  t.after(() => rm(target, { recursive: true, force: true }));
  const bash = process.platform === "win32" ? join(process.env.ProgramFiles, "Git", "bin", "bash.exe") : "bash";
  const first = run(bash, ["scripts/install.sh", "--target", target, "--apply"]);

  assert.equal(first.status, 0, first.output);
  for (const path of expectedFiles) assert.ok((await readFile(join(target, path))).length > 0);

  const second = run(bash, ["scripts/install.sh", "--target", target, "--apply"]);
  assert.notEqual(second.status, 0, second.output);
  assert.match(second.output, /refus|exists/i);
});

test("PowerShell dry-run reports the plan without writing", async (t) => {
  const target = await mkdtemp(join(tmpdir(), "ai-stack-pwsh-dry-"));
  t.after(() => rm(target, { recursive: true, force: true }));
  const result = run("pwsh", ["-NoProfile", "-File", "scripts/install.ps1", "-Target", target]);
  if (result.error?.code === "ENOENT") t.skip("PowerShell 7 unavailable");

  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /DRY RUN/i);
  for (const path of expectedFiles) await absent(join(target, path));
});

test("PowerShell apply installs templates and refuses an overwrite", async (t) => {
  const target = await mkdtemp(join(tmpdir(), "ai-stack-pwsh-apply-"));
  t.after(() => rm(target, { recursive: true, force: true }));
  const first = run("pwsh", ["-NoProfile", "-File", "scripts/install.ps1", "-Target", target, "-Apply"]);
  if (first.error?.code === "ENOENT") t.skip("PowerShell 7 unavailable");

  assert.equal(first.status, 0, first.output);
  for (const path of expectedFiles) assert.ok((await readFile(join(target, path))).length > 0);

  const second = run("pwsh", ["-NoProfile", "-File", "scripts/install.ps1", "-Target", target, "-Apply"]);
  assert.notEqual(second.status, 0, second.output);
  assert.match(second.output, /refus|exists/i);
});

test("the verification script enforces the public installer contract", () => {
  const result = run(process.execPath, ["scripts/verify-install.mjs"]);
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /verified/i);
});
