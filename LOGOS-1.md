# LOGOS-1 extension

An additive LOGOS-1 integration layer for [`WestMoneyDE/ai-engineering-stack`](https://github.com/WestMoneyDE/ai-engineering-stack).

It extends the existing Hermes / Loop Engineering / mobile human-gate stack with a **research-typed effect boundary**, machine-readable epistemic status, CPV observability, and append-only evidence semantics — without allowing research-state, memory or model confidence to mint authority.

## Included

- Γ-style typed proposal/effect gate for bounded examples
- exact proposal hashing and exact-action human grants
- one-shot execution token model
- CPV functional observability (never authority)
- append-only research/evidence ledger
- work-order state model
- LOGOS-1 templates for AGENTS/current work order
- 10/10 backlog tied to the real stack
- Node tests

## Not claimed

- no mediation closure below the JS process
- no proof of human identity/attestation
- no consciousness/sentience inference
- no Γ-v0.3 promotion
- no replacement of Hermes; LOGOS-1 is a governed research/assurance extension

## Install as overlay

Copy the files into a checkout of `ai-engineering-stack`; the existing package test glob automatically picks up `tests/logos1-runtime.test.mjs`.

```bash
node --test tests/logos1-runtime.test.mjs
```

The actual GitHub integration is intended to live on a feature branch and merge through review.
