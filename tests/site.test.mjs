import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = join(root, "site");
const read = (path) => readFile(join(root, path), "utf8");

const requiredFiles = [
  "site/index.html",
  "site/styles.css",
  "site/main.js",
  "site/robots.txt",
  "site/sitemap.xml",
  "site/llms.txt",
  "scripts/build-site.mjs",
  "scripts/site-check.mjs",
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (new Set([".html", ".css", ".js", ".txt", ".xml"]).has(extname(entry.name))) files.push(path);
  }
  return files;
}

test("the Pages artifact contains its complete static contract", async () => {
  for (const path of requiredFiles) await access(join(root, path));
  for (const path of [
    "site/assets/ai-engineering-stack-loop-hero.png",
    "site/assets/site-hermes-atmosphere.png",
    "site/assets/site-evidence-ledger.png",
    "site/assets/site-mobile-approval.png",
  ]) await access(join(root, path));
});

test("the landing page exposes semantic GEO and SEO metadata", async () => {
  const html = await read("site/index.html");

  assert.match(html, /<html[^>]+lang="en"/i);
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, "the page has exactly one h1");
  for (const id of ["loop", "hermes", "capabilities", "skills", "seo", "star"]) {
    assert.match(html, new RegExp(`id="${id}"`), `missing section #${id}`);
  }
  assert.match(html, /rel="canonical"/i);
  assert.match(html, /property="og:image"/i);
  assert.match(html, /twitter:card/i);
  assert.match(html, /https:\/\/github\.com\/WestMoneyDE\/ai-engineering-stack/);
  assert.match(html, /"@type"\s*:\s*"Person"/);
  assert.match(html, /"@type"\s*:\s*"WebSite"/);
  assert.match(html, /"@type"\s*:\s*"SoftwareSourceCode"/);
  assert.match(html, /Ömer Hüseyin Coskun/);
});

test("progressive enhancement preserves the accessible loop and navigation", async () => {
  const [html, css, js] = await Promise.all([read("site/index.html"), read("site/styles.css"), read("site/main.js")]);

  assert.match(html, /skip/i);
  assert.match(html, /aria-expanded="false"/i);
  assert.match(html, /data-loop-fallback/);
  assert.match(html, /<canvas\b/i);
  assert.match(css, /prefers-reduced-motion\s*:\s*reduce/i);
  assert.match(css, /:focus-visible/);
  assert.match(js, /prefers-reduced-motion/);
  assert.match(js, /requestAnimationFrame/);
  assert.match(js, /canvas/i);
  assert.match(js, /aria-expanded/);
});

test("machine-readable GEO files contain only public crawl targets", async () => {
  const [robots, sitemap, llms] = await Promise.all([
    read("site/robots.txt"),
    read("site/sitemap.xml"),
    read("site/llms.txt"),
  ]);

  assert.match(robots, /Sitemap:\s*https:\/\/westmoneyde\.github\.io\/ai-engineering-stack\/sitemap\.xml/i);
  assert.match(sitemap, /<loc>https:\/\/westmoneyde\.github\.io\/ai-engineering-stack\/?<\/loc>/i);
  assert.match(llms, /Hermes Supervisor/i);
  assert.match(llms, /Loop Engineering/i);
  for (const content of [robots, sitemap, llms]) {
    assert.doesNotMatch(content, /absolute local paths|brain[\\/]|ADR-?\d+|@icloud\.com/i);
  }
});

test("the public page asks for a star without adding an access gate", async () => {
  const [html, english, german] = await Promise.all([
    read("site/index.html"),
    read("README.md"),
    read("README.de.md"),
  ]);
  const starUrl = "https://github.com/WestMoneyDE/ai-engineering-stack";

  assert.ok(html.includes(starUrl), "landing page must link to the repository");
  assert.match(html, /star the (repository|repo)/i);
  assert.match(english, /star the (repository|repo)/i);
  assert.match(german, /Repository.*Stern|Repository.*star|Repository.*Star/i);
  assert.doesNotMatch(html, /oauth|access gate|sign in with github/i);
});

test("all static site text stays free of private paths and raw provider output", async () => {
  const files = await walk(site);
  const text = (await Promise.all(files.map((path) => readFile(path, "utf8")))).join("\n");

  assert.doesNotMatch(text, /[A-Z]:[\\/]/);
  assert.doesNotMatch(text, /\bbrain[\\/]/i);
  assert.doesNotMatch(text, /\bADR-?\d+/i);
  assert.doesNotMatch(text, /@icloud\.com/i);
  assert.doesNotMatch(text, /retry_after\s*:\s*null/i);
  assert.doesNotMatch(text, /raw provider message/i);
  assert.ok(text.includes("https://github.com/zubair-trabzada/geo-seo-claude"));
  assert.ok(text.includes("https://refero.design"));
  assert.ok(text.includes("https://21st.dev"));
  assert.ok(relative(root, site).startsWith("site"));
});
