# GitHub Pages GEO/SEO Landing Page — Design & Implementation Plan

**Status:** Draft for founder review  
**Date:** 2026-08-14  
**Repository:** `WestMoneyDE/ai-engineering-stack`  
**Surface:** Project GitHub Pages site for the public, sanitized AI Engineering Stack

## Goal

Create an English-first, responsive GitHub Pages landing page that makes Ömer Hüseyin
Coskun's public AI Engineering Stack understandable in one visit and useful as a
shareable profile. The page should explain Hermes, Loop Engineering, durable evidence,
provider-wait recovery, skills, MCP boundaries, hooks, mobile approvals, and the public
setup without exposing private repositories, ADRs, customer data, business rules, or
secrets.

The page will live in the existing public repository and deploy from a static site
directory through GitHub Actions. The current README remains the canonical long-form
profile; the page is a visual, linkable entry point into that material.

## Design direction

### Selected direction: Hermes Control Room / Loop Signal

Physical scene: an engineer reviews a running orchestration loop at night, with a quiet
dark control surface, indigo execution traces, amber human-gate markers, and teal
provider recovery signals. The page should feel precise and calm under pressure, not
like a generic AI SaaS template.

Signature element: a native HTML `<canvas>` visualizes the bounded loop
`Plan → Build → Verify → Review → Recover`. The same sequence is rendered as semantic
HTML so the page remains understandable to screen readers, keyboard users, crawlers,
and users who disable motion.

### Design tokens (proposal)

Use OKLCH semantic tokens rather than component-level raw hex values:

- `--bg`: near-black neutral, the architectural ground
- `--surface`: graphite panel for evidence and capability excerpts
- `--ink`: high-contrast near-white body text
- `--primary`: deep indigo/violet for Hermes/orchestration signals
- `--accent-human`: saturated amber for approval gates and consequential actions
- `--accent-recovery`: saturated teal for provider-wait/recovery states
- `--muted`: readable secondary text with a measured contrast floor

Typography proposal: `Bricolage Grotesque` for display headlines, `Source Sans 3` for
body copy, and `Fira Code` only for commands/state labels. If the selected fonts cannot
be self-hosted legally, use a system fallback stack rather than adding a runtime font
dependency.

The page avoids gradient text, decorative CSS grid overlays, repeated eyebrow labels,
identical card grids, oversized rounded cards, and shadow-plus-border ghost cards.

## Information architecture

```text
┌─────────────────────────────────────────────────────────────────┐
│ Ömer / AI Engineering Stack     Overview  Loop  Stack  Skills  ★ │
├─────────────────────────────────────────────────────────────────┤
│ HERO                                                            │
│  Governed AI engineering for autonomous loops with human gates  │
│  [Explore the stack]   [★ Star on GitHub]       Canvas loop     │
├─────────────────────────────────────────────────────────────────┤
│ Proof strip: Hermes · Loop Engineering · Provider recovery      │
├─────────────────────────────────────────────────────────────────┤
│ LOOP ENGINEERING         [canvas + accessible ordered fallback] │
├─────────────────────────────────────────────────────────────────┤
│ HERMES / CAPABILITIES     original generated visual             │
├─────────────────────────────────────────────────────────────────┤
│ SKILLS · MCP · HOOKS      source links and public boundaries     │
├─────────────────────────────────────────────────────────────────┤
│ GEO/SEO reference blocks · setup · public sources                │
├─────────────────────────────────────────────────────────────────┤
│ FINAL STAR CTA · Reddit profile · German README · footer         │
└─────────────────────────────────────────────────────────────────┘
```

Navigation uses visible text labels, active-section state, a skip link, and a mobile
menu that is a real button with `aria-expanded` and keyboard support. The page remains
usable without JavaScript; the menu and canvas enhance the semantic baseline rather
than being required for navigation.

## Asset strategy

### Existing approved asset

Keep `assets/ai-engineering-stack-loop-hero.png` as the approved hero reference. Do not
overwrite it. If a new variant is needed, use a versioned sibling filename.

### ChatGPT Image assets (to generate after implementation approval)

Generate three original, text-free raster assets:

1. **Hero atmosphere** — wide indigo/graphite control-room texture with amber signal
   points, negative space for copy, no logos, no UI screenshots, no text.
2. **Evidence / ledger detail** — abstract close-up of durable run evidence and linked
   checkpoints, editorial technical photography/illustration, no readable text.
3. **Mobile human gate** — abstract phone silhouette with a single approval state in an
   indigo/amber environment, no brand logos, no people identifiable, no text.

Prompts will use the `imagegen` built-in mode and each final image will be copied into
`assets/` with a provenance note in `assets/AI-IMAGE.md`. Generated images remain
original project assets; no private repository names or internal documents are supplied
to the image tool.

### Refero.design

Use Refero for research into landing-page composition, workflow storytelling, active
navigation, and product-screenshot rhythm. Refero is a curated research library of real
product screens and flows, so its screenshots are inspiration inputs only; do not
download or rehost third-party screenshots, logos, or copy in this public repo.

### 21st.dev

Use 21st.dev to identify accessible interaction patterns (nav, CTA, status chip,
section transitions) and, where appropriate, adapt source code into the static page.
Do not reuse 21st demo screenshots, GIFs, thumbnails, or marketplace media. Every
adapted component must have a checked component-level license and a visible source link
in `docs/SOURCES.md`; if the license or attribution is unclear, implement the pattern
from scratch instead. The page will not add a React runtime solely to consume a
component catalog.

## GEO and SEO scope

The GEO layer follows the answer-first and citability principles of
[`geo-seo-claude`](https://github.com/zubair-trabzada/geo-seo-claude), without copying
its code or private workflow data.

### Technical SEO

- `site/index.html` with one descriptive `h1`, sequential headings, semantic landmarks,
  canonical URL, description, language metadata, and viewport metadata.
- Open Graph and Twitter card metadata pointing to a public image asset.
- `site/robots.txt`, `site/sitemap.xml`, and `site/llms.txt` with only public URLs.
- JSON-LD for `Person`, `WebSite`, and `SoftwareSourceCode`; use `sameAs` only for the
  public GitHub repo, the public Loop Engineering reference, and Ömer's Reddit profile.
- Stable section IDs for deep links and citation-friendly passages.
- Explicit alt text, image dimensions, responsive formats, and lazy loading below the
  fold to protect Core Web Vitals.

### GEO content

- A concise answer block defining Hermes, Loop Engineering, provider-wait recovery,
  append-only evidence, MCP boundaries, and mobile approval gates.
- Short quotable capability statements followed by links to the public README/docs.
- A source register that distinguishes original project material, public upstream links,
  and design references.
- A small FAQ written for direct retrieval by AI search systems; no claims about private
  production systems or unsupported autonomy.

## Star CTA

Add a clear, non-blocking request in the hero, the final CTA, `README.md`, and
`README.de.md`:

> If this stack helps your work, star the repository and follow the public sources.

Link directly to `https://github.com/WestMoneyDE/ai-engineering-stack`. Do not add OAuth,
GitHub API calls, cookies, analytics, or an access gate: a GitHub Pages site cannot
reliably verify a star without adding identity and privacy scope. The CTA is a request,
not a technical prerequisite.

## GitHub Pages delivery

Add a minimal workflow under `.github/workflows/pages.yml`:

1. Checkout the repository.
2. Validate the static site and public-link/privacy invariants.
3. Configure Pages.
4. Upload the `site/` artifact.
5. Deploy with the Pages deployment action on the repository's default branch.

The workflow must use least-privilege permissions, never print secrets, and avoid
external build services. The repository settings must select GitHub Actions as the
Pages source after the workflow is merged. The first deployment will be verified from
the green Pages deployment shown in the supplied reference image.

## Privacy and legal boundaries

- No links to private workspace paths, private ADRs, internal brain files, customer data,
  or business decisions.
- No secrets, tokens, prompts, model responses, raw provider messages, or private Git
  remotes.
- No personal selection, employment, remuneration, payment, or mass-outreach claims.
- Only original/generated imagery and explicitly licensed/adapted code are shipped.
- Public references are labelled as references, not endorsements.

## Verification plan

Before publishing:

- Existing `npm test` and `npm run verify` remain green.
- Add deterministic tests for required metadata, JSON-LD entities, `robots.txt`,
  `sitemap.xml`, `llms.txt`, star links, public-only link policy, and no-secret/no-private
  path policy.
- Run a static HTML/accessibility check: heading order, landmarks, skip link, focus
  visibility, button labels, alt text, reduced-motion fallback, and keyboard menu.
- Check 375px, 768px, 1024px, and 1440px layouts; verify no horizontal overflow.
- Verify canvas is optional: disabling JavaScript still leaves loop steps and CTAs.
- Run link checks for all first-party and cited external URLs used by the page.
- Inspect the built Pages artifact and confirm the deployment URL before any push.

## Non-goals

- No private repository synthesis or ADR publication.
- No React/Next.js migration of the existing profile repository.
- No GitHub OAuth, star enforcement, analytics, cookie banner, or user tracking.
- No automatic copying of Refero or 21st screenshots/media.
- No force push or remote mutation during the plan/spec phase.

## Acceptance criteria

1. The page is English-first, responsive, keyboard-operable, and understandable without
   JavaScript or motion.
2. The approved hero and newly generated original images are used with provenance and
   accessible alt text.
3. Canvas loop visualization and semantic fallback describe the same bounded workflow.
4. GEO/SEO files and structured data expose only public, accurate claims.
5. Star CTAs appear in the page and both README variants without blocking access.
6. Refero/21st are credited as research or component sources only where applicable;
   no restricted third-party media is rehosted.
7. GitHub Actions produces a green GitHub Pages deployment from the existing repo.
8. All existing tests plus the new site/privacy checks pass.

## Open decision before implementation

Founder approval is requested for this design/spec and the non-blocking Star CTA. Once
approved, the implementation plan will be expanded into a build task, then the site and
assets will be created and verified before the single authorized push.
