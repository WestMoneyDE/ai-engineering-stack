# ai-engineering-stack + LOGOS-1 — path to 10/10

This backlog is intentionally harder than “add more agents”. It targets the remaining assurance, reproducibility and operations gaps visible in the current public stack.

## P0 — real control-plane assurance
1. External human attestation: replace boolean/logical “human rooted” assumptions with signed identity/challenge verification for one real approval channel.
2. Mediation closure prototype: run consequential connectors in an OS/process capability sandbox; prove declared side effects cannot bypass the gate.
3. Transactional state activation: authoritative Hermes/work-order head advances atomically, with stale-write and split-brain rejection.
4. External idempotency/reconciliation ledger for real providers; crash after send must recover without blind retry.
5. Typed multi-budget reservations with atomic reserve/commit/abort across concurrent workers.

## P0 — adversarial reliability
6. Chaos suite: provider outage, partial success, stale state, clock skew, duplicated callback, rollback, split brain, corrupted ledger, unavailable human gate.
7. Prompt/connector injection boundary tests proving untrusted content cannot alter Γ/effect semantics.
8. Property-based state-machine tests for all valid/invalid workflow transitions.

## P1 — evidence and observability
9. OpenTelemetry-style run/effect/evidence IDs with privacy redaction and no prompt/transcript storage.
10. Machine-readable claim registry linking README capability claims to test/eval evidence and last verification commit.
11. Release gate that fails if public docs promote HOLD/UNTESTED experimental LOGOS features.
12. Deterministic resume conformance test: fresh supervisor reconstructs the next valid action from files only.

## P1 — supply chain / deployment
13. SBOM + dependency review + signed release provenance.
14. Secret scanning and dependency audit in CI.
15. Reproducible installer fixtures on Linux/macOS/Windows.
16. Versioned JSON schemas for work order, provider wait, human grant, evidence, reconciliation and LOGOS proposal objects.

## P1 — agent quality
17. Eval matrix by role: planner/build/reviewer/security with false-positive/false-negative failure metrics.
18. Feedback-contamination controls for metacognitive/self-review evaluations.
19. Path-dependent memory evals for interference, forgetting and selective retrieval.
20. Equal-resource ablations before introducing any new “specialized cognitive primitive”.

## P2 — developer experience
21. `--logos1` installer flag with dry-run diff.
22. Example governed GitHub change flow using exact proposal digest + approval + reconciliation.
23. Architecture site page showing runtime vs research-only boundaries.
24. Public changelog with provenance and migration map.

## Kill rules
- If a feature has no concrete failure when removed: `REMOVE_CANDIDATE`.
- If a specialized mechanism is matched by a strong generic baseline: `MERGE/REJECT`.
- If a safety property requires an unenforced deployment assumption: do not market it as established.
