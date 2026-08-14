# GitHub Pages GEO SEO Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and deploy an English-first, public-only GitHub Pages landing page for the AI Engineering Stack with a Canvas loop visual, original ChatGPT Image assets, GEO/SEO metadata, accessible navigation, and non-blocking repository Star CTAs.

**Architecture:** Keep the repository dependency-light: semantic static HTML, one CSS file, one progressively-enhancing JavaScript module, and a deterministic Node build/check script. The `site/` directory is the Pages artifact; source/provenance imagery remains under `assets/` and is copied into `site/assets/` by the build script. GitHub Actions validates and deploys `site/` without a framework runtime.

**Tech Stack:** HTML5, CSS (OKLCH custom properties), vanilla JavaScript Canvas API, Node.js 20+ built-in test runner, GitHub Pages Actions.

## Global Constraints

- English-first landing page; link to `README.de.md` for German content.
- Do not expose private repositories, ADRs, internal paths, customer data, secrets, prompts, raw provider messages, or business decisions.
- Use native Canvas only for enhancement; semantic HTML fallback must remain complete without JavaScript.
- Use original ChatGPT Image assets; do not rehost Refero screenshots or 21st marketplace previews.
- Adapt 21st code only when the individual component license permits it and record a visible source link.
- Use Refero as design research; do not copy its screenshots, logos, or copy.
- Star CTAs are visible but never access-blocking; no OAuth, GitHub API, cookies, analytics, or tracking.
- Meet WCAG AA fundamentals: keyboard navigation, focus states, alt text, contrast, skip link, reduced-motion behavior, and 44px interactive targets.
- Run `npm test`, `npm run verify`, `npm run site:build`, and `npm run site:check` before any push.

---

### Task 1: Add failing public-site and privacy contract tests

**Files:**
- Create: `tests/site.test.mjs`
- Modify: `tests/privacy.test.mjs`
- Modify: `scripts/verify-install.mjs`
- Modify: `package.json`

**Interfaces:**
- `site.test.mjs` reads the static artifact from `site/` and invokes `scripts/build-site.mjs` through the public `site:build` script.
- The privacy test allowlist accepts only the approved public sources: GitHub Pages repo, Loop Engineering, Reddit, GEO reference, Refero, 21st, and documented primary sources.

- [ ] **Step 1: Write the failing site contract tests**

  Add tests that require:

  ```js
  const required = [
    "site/index.html",
    "site/styles.css",
    "site/main.js",
    "site/robots.txt",
    "site/sitemap.xml",
    "site/llms.txt",
  ];
  ```

  Assert that `site/index.html` contains `lang="en"`, one `h1`, the section IDs
  `loop`, `hermes`, `capabilities`, `skills`, `seo`, and `star`, a canonical link,
  `og:image`, the public GitHub Star URL, and JSON-LD types `Person`, `WebSite`, and
  `SoftwareSourceCode`. Assert `site/main.js` references a canvas fallback and reduced
  motion; assert `site/styles.css` contains a reduced-motion media query. Assert the
  text files contain only public URLs and no Windows paths, internal state-folder paths, or
  architecture-decision references,
  or secrets.

- [ ] **Step 2: Extend the existing public verification contract**

  Add `site/index.html`, `site/styles.css`, `site/main.js`, `site/robots.txt`,
  `site/sitemap.xml`, `site/llms.txt`, `scripts/build-site.mjs`, and
  `scripts/site-check.mjs` to the verification list. Add scripts:

  ```json
  "site:build": "node scripts/build-site.mjs",
  "site:check": "node scripts/site-check.mjs"
  ```

- [ ] **Step 3: Run the focused test and verify RED**

  Run `node --test tests/site.test.mjs`. It must fail because the site files do not
  exist yet, not because of a test syntax error.

- [ ] **Step 4: Commit the test contract**

  ```bash
  git add tests/site.test.mjs tests/privacy.test.mjs scripts/verify-install.mjs package.json
  git commit -m "test: define public GitHub Pages contract"
  ```

### Task 2: Implement deterministic static-site build and checks

**Files:**
- Create: `scripts/build-site.mjs`
- Create: `scripts/site-check.mjs`

**Interfaces:**
- `build-site.mjs` copies the approved and generated source images from `assets/` into
  `site/assets/`, creates the destination directory if needed, and exits non-zero when
  a required source asset is missing. It must not fetch from the network.
- `site-check.mjs` validates required files, public URL policy, metadata markers, and
  the absence of private paths/secrets; it prints one deterministic summary line.

- [ ] **Step 1: Implement the minimal copy script**

  Use `node:fs/promises` and `node:path` only. Copy these source files when present:
  `assets/ai-engineering-stack-loop-hero.png`,
  `assets/site-hermes-atmosphere.png`,
  `assets/site-evidence-ledger.png`, and
  `assets/site-mobile-approval.png`. The first file is mandatory; generated siblings
  become mandatory after Task 4.

- [ ] **Step 2: Implement the deterministic static checker**

  Read all `site/` text files, assert the required metadata and URL allowlist, check PNG
  signatures for site images, and reject absolute local paths, internal state folders,
  architecture-decision markers, `@icloud`, raw provider
  messages, and private repository URLs. Do not call an external service.

- [ ] **Step 3: Run focused tests**

  Run `npm run site:build` and `npm run site:check`; they should fail only until the
  required HTML/CSS/JS and generated image inputs exist.

- [ ] **Step 4: Commit the build/check foundation**

  ```bash
  git add scripts/build-site.mjs scripts/site-check.mjs
  git commit -m "build: add deterministic GitHub Pages site checks"
  ```

### Task 3: Build the semantic landing page shell and GEO/SEO documents

**Files:**
- Create: `site/index.html`
- Create: `site/robots.txt`
- Create: `site/sitemap.xml`
- Create: `site/llms.txt`

**Interfaces:**
- `site/index.html` is a standalone page that works with CSS/JS disabled.
- JSON-LD uses the public author name, public GitHub URL, Loop Engineering URL, and
  Reddit URL only. The canonical URL is the project Pages URL.

- [ ] **Step 1: Add the semantic document structure**

  Include a skip link, header/nav with `button`-based mobile menu, `main`, `section`
  landmarks, one `h1`, ordered loop steps, visible source links, and a footer with the
  German README link. Every icon-only control must have an accessible name.

- [ ] **Step 2: Add the answer-first GEO sections**

  Use concise, citation-friendly text for Hermes, Loop Engineering, provider-wait
  recovery, append-only evidence, MCP boundaries, hooks, and mobile approvals. Include
  a compact FAQ with stable IDs. Link to existing public docs instead of reproducing
  private architecture.

- [ ] **Step 3: Add the metadata and machine-readable files**

  Add canonical, description, Open Graph/Twitter cards, `Person`, `WebSite`, and
  `SoftwareSourceCode` JSON-LD, then create `robots.txt`, `sitemap.xml`, and `llms.txt`
  containing only the Pages URL and public documentation URLs.

- [ ] **Step 4: Run the focused test and verify GREEN for the shell**

  Run `node --test tests/site.test.mjs`. It may still fail on visual behavior and image
  requirements, but the HTML/metadata assertions must pass.

- [ ] **Step 5: Commit the shell**

  ```bash
  git add site/index.html site/robots.txt site/sitemap.xml site/llms.txt
  git commit -m "feat: add public GEO SEO landing page shell"
  ```

### Task 4: Generate and register original ChatGPT Image assets

**Files:**
- Create: `assets/site-hermes-atmosphere.png`
- Create: `assets/site-evidence-ledger.png`
- Create: `assets/site-mobile-approval.png`
- Modify: `assets/AI-IMAGE.md`

**Interfaces:**
- Each image is text-free, contains no logos or private data, and is referenced by
  `site/index.html` with descriptive alt text and explicit dimensions.
- `assets/AI-IMAGE.md` records date, author, use case, exact prompt, and the fact that
  ChatGPT Image built-in mode was used.

- [ ] **Step 1: Generate the hero atmosphere**

  Use the built-in image tool with a wide `ads-marketing`/`stylized-concept` prompt for
  an indigo/graphite engineering control-room atmosphere with amber signal points and
  generous negative space. Require no text, logos, people, screenshots, or watermark.

- [ ] **Step 2: Generate the evidence-ledger and mobile-gate variants**

  Generate two separate square/landscape assets with the same constraints: abstract
  durable evidence/linked checkpoints, and an abstract phone approval gate. Save the
  selected outputs under the exact filenames above; do not overwrite the approved hero.

- [ ] **Step 3: Inspect and register assets**

  Inspect each output, verify dimensions/signature, add alt text and provenance, then
  run `npm run site:build` so the deployment artifact contains the files.

- [ ] **Step 4: Run the focused tests and commit**

  Run `node --test tests/hero-image.test.mjs tests/site.test.mjs`. Commit only after the
  new image assertions pass:

  ```bash
  git add assets/site-*.png assets/AI-IMAGE.md site/assets
  git commit -m "feat: add original landing page image assets"
  ```

### Task 5: Implement Canvas enhancement, styling, navigation, and Star CTAs

**Files:**
- Create: `site/styles.css`
- Create: `site/main.js`
- Modify: `site/index.html`
- Modify: `README.md`
- Modify: `README.de.md`
- Modify: `docs/SOURCES.md`

**Interfaces:**
- `main.js` exposes no global API; on DOM ready it wires the mobile menu, section active
  state, and optional canvas renderer. It exits cleanly when Canvas is unavailable.
- The loop fallback remains visible in `ol[data-loop-fallback]` and mirrors the canvas
  labels exactly.

- [ ] **Step 1: Add the failing interaction/style assertions**

  Extend `site.test.mjs` to require a visible skip link, `aria-expanded`, canvas fallback,
  `prefers-reduced-motion`, Star URLs in page and both READMEs, and no emoji used as
  structural icon markup.

- [ ] **Step 2: Implement the visual system in CSS**

  Add OKLCH semantic variables, responsive mobile-first layout, 44px targets, visible
  focus rings, balanced heading wrapping, accessible contrast, and a reduced-motion
  override. Use one signature canvas stage rather than repeated decorative cards.

- [ ] **Step 3: Implement progressive-enhancement JavaScript**

  Wire the menu button, close-on-link behavior, `IntersectionObserver` active state, and
  a `requestAnimationFrame` Canvas loop with a static first frame. Disable animation when
  `prefers-reduced-motion: reduce` is true; never hide content while waiting for JS.

- [ ] **Step 4: Add README Star requests and source notes**

  Add a non-blocking “If this stack helps, star the repository” link to both README
  variants. Add Refero and 21st as design research/source notes, plus the GEO reference,
  without adding private URLs.

- [ ] **Step 5: Run focused tests and commit**

  Run `node --test tests/site.test.mjs tests/privacy.test.mjs tests/profile.test.mjs` and
  commit the page behavior and documentation:

  ```bash
  git add site README.md README.de.md docs/SOURCES.md
  git commit -m "feat: style and animate the Pages landing page"
  ```

### Task 6: Add the least-privilege GitHub Pages workflow

**Files:**
- Create: `.github/workflows/pages.yml`
- Modify: `package.json` (only if a workflow script is needed)

**Interfaces:**
- The workflow runs on pushes to `main` and manual dispatch, uses `contents: read` and
  `pages: write`/`id-token: write` only where required by the official Pages actions,
  builds `site/`, runs tests/checks, uploads the artifact, and deploys it.

- [ ] **Step 1: Add the workflow**

  Use official GitHub Pages actions, pin each action to a stable major or immutable
  version already accepted by the repository policy, and set `environment: github-pages`.
  Do not include tokens, analytics keys, or third-party deploy services.

- [ ] **Step 2: Validate locally**

  Run `npm run site:build`, `npm run site:check`, `npm test`, and `npm run verify`.

- [ ] **Step 3: Commit the deployment workflow**

  ```bash
  git add .github/workflows/pages.yml package.json
  git commit -m "ci: deploy landing page to GitHub Pages"
  ```

### Task 7: Full verification and handoff

**Files:**
- Modify: `docs/SETUP.md` (document Pages URL and local preview commands)
- Create a mirrored session report only if the repository workflow requires one.

- [ ] **Step 1: Run the complete verification set**

  ```bash
  npm run site:build
  npm run site:check
  npm test
  npm run verify
  git diff --check
  ```

  Record exact pass counts and any skipped platform checks.

- [ ] **Step 2: Review the public diff**

  Confirm `git diff --stat`, `git diff --check`, and a recursive public-link scan show no
  private paths, ADRs, secrets, unapproved screenshots, or internal repository links.

- [ ] **Step 3: Verify the Pages artifact**

  Inspect `site/` as a standalone artifact, check mobile breakpoints and reduced-motion
  behavior in a browser if available, and confirm the green Pages deployment after the
  user-authorized push.

- [ ] **Step 4: Prepare the single push**

  Before pushing, show `git status` and `git log --oneline -3`. Use the repository's
  push helper for exactly one attempt; never retry a failed push automatically.

- [ ] **Step 5: Update the session report and hand off**

  Document changed files, decisions, legal/privacy checks, test evidence, deployment
  URL, and open points. Do not claim completion until all verification output is fresh.

## Self-review against the approved spec

- Design direction, Canvas fallback, generated imagery, Refero/21st boundaries, GEO/SEO,
  Star CTA, privacy constraints, GitHub Pages, accessibility, and verification all have
  dedicated tasks.
- No task relies on a placeholder or an unlisted function; file paths and commands are
  explicit.
- The plan keeps the static repository dependency-light and avoids an unnecessary React
  migration.
