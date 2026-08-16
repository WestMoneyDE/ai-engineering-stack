# LOGOS-1 extension threat model

## Threats addressed in the reference layer
- unknown effect kind
- stale/changed content after approval
- self-created authority
- execution-token replay
- research/CPV state accidentally treated as permission
- silent evidence mutation
- `OUTCOME_UNKNOWN` treated as success

## Explicitly not solved by an in-process JS library
- compromised OS/runtime
- hidden network/filesystem/subprocess side channels
- compromised human identity channel
- malicious provider infrastructure
- correct semantics of every real-world action
- mediation closure outside declared adapters

These remain deployment/system-security responsibilities.
