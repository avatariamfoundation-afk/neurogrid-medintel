# MedIntel API Documentation

## Overview
The MedIntel API provides endpoints for AI-driven medical predictions on BNB Chain.

## Endpoints
- `POST /predict`: Submit medical data for AI prediction.
  - Body: `{ "data": "symptoms description" }`
  - Response: `{ "prediction": "AI result" }`

## Setup
1. Start the server: `node api/index.js`
2. Use tools like Postman to test.

## Security
Data is encrypted using the config key. For full privacy, integrate ZKPs later.

For issues, see README.
