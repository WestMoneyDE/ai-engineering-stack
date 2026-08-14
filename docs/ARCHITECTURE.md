# Architecture

## Autonomous engineering loop

```mermaid
flowchart LR
    A["Request"] --> H["Hermes Supervisor"]
    S["Persistent state"] <--> H
    H --> P["Planner"]
    P --> B["Builder"]
    B --> V["Deterministic verification"]
    V --> R["Independent review"]
    R -->|"changes requested"| B
    R -->|"pass"| G{"Consequential action?"}
    G -->|"safe and reversible"| C["Complete with evidence"]
    G -->|"external or irreversible"| M["Mobile human approval"]
    M -->|"approved"| C
    M -->|"rejected or expired"| X["Stop with evidence"]
```

Hermes coordinates state transitions and role hand-offs. It does not replace the
specialized agents, deterministic checks, or human authority.

## Extension boundaries

```mermaid
flowchart TD
    K["Versioned rules and state"] --> H["Hermes Supervisor"]
    H --> A["Engineering agents"]
    SK["Scope-routed skills"] --> A
    MCP["Least-privilege MCP connectors"] --> A
    A --> E["Tests, evals, and review evidence"]
    E --> H
    H --> U["Human authority"]

    SK -. "cannot override local rules" .-> K
    MCP -. "never owns workflow truth" .-> K
```

## Authority model

- Routine and reversible local work may continue autonomously.
- A model may propose a consequential action but cannot grant its own approval.
- A mobile approval is scoped to one exact action, identity, target, and expiry.
- Rejection, expiry, stale state, or changed content results in denial.
- Every completion claim is backed by fresh verification evidence.
