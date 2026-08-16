# LOGOS-1 extension for the AI Engineering Stack

The existing stack already has the right high-level ingredients: Hermes orchestration, versioned state, deterministic verification, explicit human gates, least-privilege connectors and bounded loops. LOGOS-1 adds a stricter research/assurance vocabulary around those components.

## Added concepts

### Typed causal proposals
Models/agents emit a structured proposal with explicit effect kinds. Unknown effects fail closed.

### Exact grant binding
A consequential human grant is bound to the canonical proposal digest, action/target scope and expiry. Changed content is a new proposal.

### One-shot execution token
An `ALLOW` produces a one-shot token in the reference model. Replay is rejected.

### CPV observability
Cognition-associated properties can be recorded as a 10-dimensional CPV for experiments, but the vector has no authority field and cannot approve work.

### Epistemic research ledger
`KEEP/HOLD/REJECT/UNTESTED/MERGE` states are append-only evidence records rather than prose that silently drifts.

## Architecture fit

```text
Hermes / engineering agents
        ↓
canonical proposal
        ↓
LOGOS Γ-style typed gate
        ↓
existing human gate / deterministic controls
        ↓
mediated external effect
```

The JS runtime in this repo is a **reference model**, not a production security boundary.

## Research lineage

LOGOS-1 combines/adapts prior work from workspace theories, attention schema, metacognition, world models, active inference, semantic information, causal emergence, runtime assurance and long-horizon memory. The separate LOGOS-1 research repository carries the complete 80-theory / 102-claim Atlas and provenance matrix.
