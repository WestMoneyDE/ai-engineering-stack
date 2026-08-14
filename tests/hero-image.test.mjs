import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const imagePath = join(root, "assets", "ai-engineering-stack-loop-hero.png");

test("the hero is a wide GitHub-ready PNG", async () => {
  const png = await readFile(imagePath);
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  assert.deepEqual(png.subarray(0, 8), signature);
  assert.equal(png.subarray(12, 16).toString("ascii"), "IHDR");
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  assert.ok(width >= 1200, `expected width >= 1200, received ${width}`);
  assert.ok(height >= 630, `expected height >= 630, received ${height}`);
  assert.ok(width > height, `expected landscape image, received ${width}x${height}`);
});

test("both READMEs embed the same hero with localized alt text", async () => {
  const [english, german] = await Promise.all([
    readFile(join(root, "README.md"), "utf8"),
    readFile(join(root, "README.de.md"), "utf8"),
  ]);

  assert.match(english, /!\[[^\]]*Hermes[^\]]*\]\(assets\/ai-engineering-stack-loop-hero\.png\)/i);
  assert.match(german, /!\[[^\]]*Hermes[^\]]*\]\(assets\/ai-engineering-stack-loop-hero\.png\)/i);
});

test("image provenance is public, generic, and reproducible", async () => {
  const provenance = await readFile(join(root, "assets", "AI-IMAGE.md"), "utf8");

  assert.match(provenance, /ChatGPT Image/i);
  assert.match(provenance, /2026-08-14/);
  assert.match(provenance, /Ömer Hüseyin Coskun/);
  assert.match(provenance, /## Current hero prompt/);
  assert.match(provenance, /WAITING_FOR_PROVIDER/);
  assert.doesNotMatch(provenance, /private code|private project|source codebase/i);
});
