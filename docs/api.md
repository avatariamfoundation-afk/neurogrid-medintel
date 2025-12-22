# MedIntel API Documentation

## Overview
The MedIntel API provides secure endpoints for AI agent assessments and DeSci research verification in post-operative care on BNB Chain. It integrates NeuroGrid features for decentralized intelligence.

## Endpoints
- `POST /agent/assess`: Assign assessment to agent.
  - Body: `{ "agentId": "string", "data": "post-op data" }`
  - Response: `{ "status": "Assessment task assigned" }`
- `POST /research/verify`: Verify computation.
  - Body: `{ "computation": "string", "data": "biomed data" }`
  - Response: `{ "receipt": "Reproducibility receipt" }`

## Setup
Start server: `node api/index.js`. Use Postman for testing.
