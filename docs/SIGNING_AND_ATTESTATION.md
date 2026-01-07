# SIGNING_AND_ATTESTATION.md

## MedIntel Signing & Attestation Model — Cryptographic Truth, Deterministic Trust

**Status:** Mandatory  
**Scope:** MedIntel Inference, Telemetry, Artifact Emission, Cross-Chain Proofs  
**Principle:** Nothing exists unless it is signed, attestable, and verifiable.

---

## 1. Purpose

This document defines the **canonical signing and attestation framework** for MedIntel.

Its purpose is to ensure that every computation, artifact, telemetry event, and governance action is:

- Cryptographically authenticated  
- Non-repudiable  
- Deterministically verifiable  
- Auditable across time and chains  

Unsigned or improperly attested actions are **invalid by protocol design**.

---

## 2. Core Principles

1. **Signature-First Design**  
   Every action MUST be signed before it is processed.

2. **Attestation Before Trust**  
   No output is trusted without attestation.

3. **Deterministic Reproducibility**  
   Attestations must bind execution inputs, code version, and output.

4. **Chain-Agnostic Verification**  
   Signatures and attestations must be verifiable on any supported chain.

---

## 3. Cryptographic Standards

### 3.1 Supported Signature Schemes

| Scheme | Use Case |
|------|---------|
| Ed25519 | Off-chain inference nodes |
| secp256k1 | On-chain & EVM compatibility |
| EIP-712 | Structured governance messages |

---

### 3.2 Hashing

- **Primary:** SHA-256  
- **Canonical Serialization:** Deterministic JSON / CBOR  

Hashes MUST be computed over canonicalized payloads only.

---

## 4. Identity Binding

Each signer is bound to:

- Public key
- Deterministic Node ID
- Role (inference, validator, governance)
- Registry entry (on-chain or verifiable off-chain)

Identity binding is immutable once registered.

---

## 5. Signing Requirements by Action

### 5.1 Inference Execution

Each inference MUST be signed over:

- Input hash
- Model identifier + version
- Execution parameters
- Output hash
- Timestamp
- Node ID

Unsigned inference outputs are discarded.

---

### 5.2 Artifact Emission

Artifacts MUST include:

- Artifact payload hash
- Inference signature reference
- Node signature
- Optional validator co-signature

Artifacts without valid signatures are non-existent.

---

### 5.3 Telemetry Events

Telemetry MUST be signed and include:

- Event type
- Deterministic event ID
- Referenced artifact ID
- Emitting node ID
- Timestamp

Telemetry is rejected if unsigned.

---

### 5.4 Governance Actions

Governance proposals and executions MUST use:

- EIP-712 structured signing
- Multi-signature or DAO quorum validation
- Deterministic execution receipts

Emergency unsigned actions are disallowed.

---

## 6. Attestation Model

### 6.1 What Is Attestation

An attestation is a **verifiable cryptographic statement** asserting:

> “This output was produced by this code, with these inputs, by this signer.”

---

### 6.2 Attestation Payload

Each attestation MUST bind:

- Input hash
- Output hash
- Code hash (model or contract)
- Execution environment ID
- Signer identity
- Timestamp

---

### 6.3 Attestation Types

| Type | Description |
|----|------------|
| Inference Attestation | Proves model execution |
| Validator Attestation | Confirms determinism |
| Cross-Chain Attestation | Confirms origin chain |
| Governance Attestation | Confirms DAO action |

---

## 7. Deterministic Verification

Attestations MUST be:

- Reproducible
- Independently verifiable
- Replay-resistant
- Order-independent

Failure to verify deterministically invalidates the action.

---

## 8. Multi-Signature & Co-Attestation

Certain actions require co-attestation:

- Validator confirmation of inference
- Cross-chain relay acceptance
- Governance execution

Co-attestation thresholds are protocol-defined.

---

## 9. Cross-Chain Signing

Cross-chain messages MUST include:

- Source chain ID
- Source block hash
- Original attestation
- Relay signature

Bridged messages without original attestations are rejected.

---

## 10. Slashing & Fault Attribution

Invalid signatures or attestations trigger:

- Deterministic fault codes
- Slashing eligibility
- Governance review

Fault attribution is cryptographically provable.

---

## 11. Key Management Assumptions

- Private keys are never shared
- Key rotation requires governance approval
- Compromised keys are immediately slashed and revoked

---

## 12. Auditability

Auditors can independently verify:

- Who signed what
- When it was signed
- What was attested
- Whether it was valid

No off-chain trust is required.

---

## 13. Non-Negotiable Rule

**If an action cannot be signed and attested, it does not exist.**

---

## 14. File Location
/medintel/security/SIGNING_AND_ATTESTATION.md

---

**End of Document**

