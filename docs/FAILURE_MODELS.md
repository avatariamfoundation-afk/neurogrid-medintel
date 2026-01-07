# FAILURE_MODES.md

## MedIntel Failure Modes — Deterministic Classification & Containment

**Status:** Mandatory  
**Scope:** MedIntel AI Pipeline, Telemetry, Artifact Emission, Cross-Chain Integration  
**Principle:** Failures must be deterministic, attributable, and survivable.

---

## 1. Purpose

This document defines the **complete failure taxonomy** for MedIntel.

Its goal is to ensure that **every failure** is:
- Predictable
- Deterministically classified
- Cryptographically attributable
- Contained without cascading system damage

Undefined failure states are not permitted.

---

## 2. Failure Design Philosophy

1. **Fail Closed, Not Open**  
   Invalid actions halt, never auto-recover silently.

2. **Deterministic Classification**  
   Every failure maps to a fixed fault code.

3. **Attribution Over Assumption**  
   Blame is proven cryptographically, not inferred.

4. **Containment Over Continuity**  
   The system survives even if progress halts.

---

## 3. Failure Domains

Failures are classified into the following domains:

| Domain | Description |
|-----|------------|
| Inference | AI execution & determinism |
| Telemetry | Event emission & signing |
| Artifact | Artifact creation & integrity |
| Identity | Keys, roles, permissions |
| Governance | Proposal & execution |
| Cross-Chain | Bridge & relay |
| Infrastructure | Runtime & dependencies |

---

## 4. Inference Failure Modes

### 4.1 Non-Deterministic Output

**Cause**
- Floating-point drift
- Non-seeded randomness
- Hardware inconsistency

**Effect**
- Output mismatch
- Validator rejection

**Handling**
- Inference discarded
- Node flagged
- Deterministic fault code emitted

---

### 4.2 Invalid Model Hash

**Cause**
- Modified model binary
- Version mismatch

**Effect**
- Attestation invalid

**Handling**
- Immediate rejection
- Slashing eligibility

---

### 4.3 Unsigned Inference

**Cause**
- Missing signature
- Corrupted payload

**Effect**
- Output ignored

**Handling**
- No artifact emitted
- Telemetry fault logged

---

## 5. Telemetry Failure Modes

### 5.1 Unsigned Telemetry Event

**Cause**
- Node malfunction
- Malicious emission

**Effect**
- Event rejected

**Handling**
- Event dropped
- Node reliability score reduced

---

### 5.2 Invalid Event Ordering

**Cause**
- Replay attempt
- Timestamp manipulation

**Effect**
- Determinism violation

**Handling**
- Event invalidated
- Replay flag set

---

## 6. Artifact Failure Modes

### 6.1 Artifact Without Inference Proof

**Cause**
- Bypassed pipeline
- Malicious emission

**Effect**
- Artifact invalid

**Handling**
- Artifact rejected
- Slashing consideration

---

### 6.2 Hash Mismatch

**Cause**
- Payload corruption
- Tampering

**Effect**
- Verification failure

**Handling**
- Artifact burned (logical)
- Fault telemetry emitted

---

## 7. Identity Failure Modes

### 7.1 Invalid Signature

**Cause**
- Wrong private key
- Forged message

**Effect**
- Identity mismatch

**Handling**
- Immediate rejection
- High-severity fault

---

### 7.2 Revoked Key Usage

**Cause**
- Compromised key reuse

**Effect**
- Unauthorized action

**Handling**
- Action rejected
- Slashing enforced

---

## 8. Governance Failure Modes

### 8.1 Unauthorized Proposal Execution

**Cause**
- Role bypass
- Incorrect quorum

**Effect**
- Invalid state change

**Handling**
- Execution reverted
- Governance fault logged

---

### 8.2 Proposal Replay

**Cause**
- Duplicate execution attempt

**Effect**
- State inconsistency risk

**Handling**
- Deterministic rejection
- Replay telemetry emitted

---

## 9. Cross-Chain Failure Modes

### 9.1 Missing Source Attestation

**Cause**
- Relay failure
- Forged message

**Effect**
- Invalid cross-chain state

**Handling**
- Message rejected
- Bridge fault logged

---

### 9.2 Chain Reorg Mismatch

**Cause**
- Finality assumptions broken

**Effect**
- Invalid origin proof

**Handling**
- Delayed processing
- Re-validation required

---

## 10. Infrastructure Failure Modes

### 10.1 Dependency Unavailability

**Cause**
- Network outage
- Oracle failure

**Effect**
- Execution halted

**Handling**
- Graceful pause
- No fallback execution

---

### 10.2 Resource Exhaustion

**Cause**
- Compute overload
- Memory pressure

**Effect**
- Node failure

**Handling**
- Node deregistration
- No partial outputs accepted

---

## 11. Failure Containment Rules

- No partial writes
- No state mutation on failure
- No auto-retries without validation
- No silent recovery

---

## 12. Failure → Fault Code Mapping

Every failure maps to a deterministic fault code defined in:
FAULT_CODE_MAPPING.md

---
**End of Document**
