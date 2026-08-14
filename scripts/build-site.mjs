import { access, copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteAssets = join(root, "site", "assets");
const requiredSourceAssets = [
  "assets/ai-engineering-stack-loop-hero.png",
  "assets/site-hermes-atmosphere.png",
  "assets/site-evidence-ledger.png",
  "assets/site-mobile-approval.png",
];

await mkdir(siteAssets, { recursive: true });

for (const relativePath of requiredSourceAssets) {
  const source = join(root, relativePath);
  await access(source);
  await copyFile(source, join(siteAssets, relativePath.split("/").at(-1)));
}

for (const relativePath of requiredSourceAssets.slice(1)) {
  const source = join(root, relativePath);
  await access(source);
  await copyFile(source, join(siteAssets, relativePath.split("/").at(-1)));
}

console.log("Static Pages assets built without network access.");
