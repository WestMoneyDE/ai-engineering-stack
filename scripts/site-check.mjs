import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = join(root, "site");
const required = ["index.html", "styles.css", "main.js", "robots.txt", "sitemap.xml", "llms.txt"];
const textExtensions = new Set([".html", ".css", ".js", ".txt", ".xml"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (textExtensions.has(extname(entry.name))) files.push(path);
  }
  return files;
}

const html = await readFile(join(site, "index.html"), "utf8");
for (const file of required) await access(join(site, file));

assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
for (const id of ["loop", "hermes", "capabilities", "skills", "seo", "star"]) {
  assert.match(html, new RegExp(`id="${id}"`));
}
assert.match(html, /rel="canonical"/i);
assert.match(html, /"@type"\s*:\s*"Person"/);
assert.match(html, /"@type"\s*:\s*"WebSite"/);
assert.match(html, /"@type"\s*:\s*"SoftwareSourceCode"/);

const text = (await Promise.all((await walk(site)).map((path) => readFile(path, "utf8")))).join("\n");
assert.doesNotMatch(text, /[A-Z]:[\\/]/);
assert.doesNotMatch(text, /\bbrain[\\/]/i);
assert.doesNotMatch(text, /\bADR-?\d+/i);
assert.doesNotMatch(text, /@icloud\.com/i);
assert.doesNotMatch(text, /retry_after\s*:\s*null/i);

const allowed = [
  /^https:\/\/github\.com\/WestMoneyDE\/ai-engineering-stack(?:[\/?#]|$)/,
  /^https:\/\/github\.com\/cobusgreyling\/loop-engineering(?:\/|$)/,
  /^https:\/\/github\.com\/zubair-trabzada\/geo-seo-claude(?:\/|$)/,
  /^https:\/\/www\.reddit\.com\/user\/WASSUCHICHHIER(?:\/|$)/,
  /^https:\/\/westmoneyde\.github\.io\/ai-engineering-stack(?:\/|$)/,
  /^https:\/\/refero\.design(?:\/|$)/,
  /^https:\/\/21st\.dev(?:\/|$)/,
  /^https:\/\/opensource\.org\/license\/mit\/?$/,
  /^https:\/\/schema\.org\/?$/,
  /^http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9$/,
  /^https:\/\/developers\.openai\.com\/codex(?:\/|$)/,
  /^https:\/\/docs\.anthropic\.com\//,
  /^https:\/\/code\.claude\.com\/docs\//,
  /^https:\/\/modelcontextprotocol\.io\//,
];
const urls = text.match(/https?:\/\/[^\s)<>'"`*]+/g) ?? [];
for (const url of urls) assert.ok(allowed.some((pattern) => pattern.test(url)), `unapproved URL: ${url}`);

for (const image of [
  "ai-engineering-stack-loop-hero.png",
  "site-hermes-atmosphere.png",
  "site-evidence-ledger.png",
  "site-mobile-approval.png",
]) {
  const png = await readFile(join(site, "assets", image));
  assert.deepEqual(png.subarray(0, 8), Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  assert.equal(png.subarray(12, 16).toString("ascii"), "IHDR");
  assert.ok(png.readUInt32BE(16) >= 900 && png.readUInt32BE(20) >= 600, `${image} dimensions`);
}

console.log(`Public Pages artifact verified: ${relative(root, site)} (${urls.length} approved URLs).`);
