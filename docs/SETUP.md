# Setup guide

The repository is a conservative starter for governed agent workflows. It installs
examples, not universal policy.

## Requirements

- Git
- Git Bash on Windows, or a POSIX shell on Linux/macOS
- PowerShell 7 for the Windows-native installer
- Node.js 20 or newer for tests
- Claude Code, OpenAI Codex, or another compatible agent host configured separately

No model API key is required to clone, inspect, install, or test the starter.

## 1. Clone and inspect

```bash
git clone https://github.com/WestMoneyDE/ai-engineering-stack.git
cd ai-engineering-stack
bash scripts/install.sh --dry-run
```

The default mode writes nothing. Review every file under `templates/` first.

## 2. Apply examples

Git Bash, Linux, or macOS:

```bash
bash scripts/install.sh --target ../my-project --apply
```

PowerShell:

```powershell
pwsh -File scripts/install.ps1 -Target ../my-project -Apply
```

The installer checks every destination before copying and refuses to merge or overwrite
an existing policy file.

## 3. Adapt deliberately

1. Merge the example agent contract into existing project rules.
2. Review every allow/ask/deny pattern for the actual operating system and agent host.
3. Exercise the sensitive-path hook with harmless fixtures before activation.
4. Replace the example skill lock with reviewed, pinned sources.
5. Define which actions are routine, externally visible, production-facing, or
   irreversible for the project.
6. Keep credentials outside the repository.

The complete public skill inventory and upstream links are documented in
[`docs/SKILLS.md`](SKILLS.md).

## 4. MCP

Configure MCP only for capabilities the project needs. Begin read-only, scope every
credential narrowly, and grant writes separately. A connector must not become the source
of workflow state or bypass a human approval gate.

## 5. Verify

```bash
npm test
npm run verify
git diff --check
```

The test suite uses the Node.js standard library. No package installation is required.

## 6. Preview and publish the public Pages site

The English-first landing page is built from `site/` and published at
<https://westmoneyde.github.io/ai-engineering-stack/>. Build and check it locally with:

```bash
npm run site:build
npm run site:check
python -m http.server 4173 --directory site
```

Open <http://localhost:4173> while the local server is running. The GitHub Actions Pages
workflow repeats the build, public-content check, and test suite before deployment; it
does not require analytics keys, OAuth, or repository write tokens.

## Hermes note

Hermes Supervisor is a personal orchestration layer described by this profile, not an
installable package in this public starter. The templates remain useful with or without
that control plane.
