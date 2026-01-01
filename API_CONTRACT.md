# MedIntel API Contract

## Design Rules
- Read-only unless explicitly stated
- No direct Core writes
- Deterministic responses only

## Mandatory Endpoints
- GET /health
- POST /inference/submit
- GET /inference/{requestId}
- POST /validation/submit
- GET /registry/records

## Authentication
- API key via Authorization header
- Read/write scopes enforced

## Versioning
- /v1 namespace
- Breaking changes require new version

