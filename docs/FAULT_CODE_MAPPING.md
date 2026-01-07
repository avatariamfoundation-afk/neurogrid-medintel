# FAULT_CODE_MAPPING.md

## Deterministic Fault Code Mapping — MedIntel & NeuroGrid Core

**Status:** Canonical  
**Scope:** MedIntel AI Pipeline, NeuroGrid Core, Governance, Cross-Chain Telemetry  
**Principle:** Every failure must resolve to a **single deterministic fault code**.

No ambiguous, dynamic, or contextual fault codes are permitted.

---

## 1. Purpose

This document defines the **authoritative fault code registry** for the NeuroGrid / MedIntel system.

Fault codes are:
- Deterministic
- Immutable
- Globally unique
- Machine-readable
- Governance-enforceable

They are used for:
- Telemetry
- Slashing
- Governance review
- Cross-chain verification
- Audit trails

---

## 2. Fault Code Structure

All fault codes follow this structure:

<DOMAIN>-<CATEGORY>-<SEVERITY>-<ID>

### Example

INF-DET-HIGH-001

| Field | Meaning |
|---|---|
| DOMAIN | System domain |
| CATEGORY | Failure class |
| SEVERITY | Impact level |
| ID | Deterministic index |

---

## 3. Severity Levels

| Level | Meaning |
|---|---|
| LOW | Informational / recoverable |
| MED | Degraded operation |
| HIGH | Protocol violation |
| CRIT | Slashing / governance action |

---

## 4. Domain Codes

| Domain | Description |
|---|---|
| INF | Inference |
| TEL | Telemetry |
| ART | Artifact |
| ID | Identity |
| GOV | Governance |
| XCH | Cross-chain |
| SYS | Infrastructure |

---

## 5. Inference Fault Codes (INF)

| Code | Description | Severity |
|---|---|---|
| INF-DET-HIGH-001 | Non-deterministic inference output | HIGH |
| INF-HASH-HIGH-002 | Model hash mismatch | HIGH |
| INF-SIG-CRIT-003 | Missing or invalid inference signature | CRIT |
| INF-VERSION-MED-004 | Unsupported model version | MED |
| INF-INPUT-LOW-005 | Invalid input format | LOW |

---

## 6. Telemetry Fault Codes (TEL)

| Code | Description | Severity |
|---|---|---|
| TEL-SIG-HIGH-001 | Unsigned telemetry event | HIGH |
| TEL-ORDER-MED-002 | Invalid event ordering | MED |
| TEL-REPLAY-CRIT-003 | Telemetry replay detected | CRIT |
| TEL-TIME-MED-004 | Timestamp drift exceeded | MED |

---

## 7. Artifact Fault Codes (ART)

| Code | Description | Severity |
|---|---|---|
| ART-NOPROOF-CRIT-001 | Artifact missing inference proof | CRIT |
| ART-HASH-HIGH-002 | Artifact hash mismatch | HIGH |
| ART-DUP-MED-003 | Duplicate artifact submission | MED |
| ART-EXPIRE-LOW-004 | Artifact expired | LOW |

---

## 8. Identity Fault Codes (ID)

| Code | Description | Severity |
|---|---|---|
| ID-SIG-CRIT-001 | Invalid cryptographic signature | CRIT |
| ID-ROLE-HIGH-002 | Unauthorized role usage | HIGH |
| ID-REVOKE-CRIT-003 | Revoked key used | CRIT |
| ID-EXPIRE-MED-004 | Credential expired | MED |

---

## 9. Governance Fault Codes (GOV)

| Code | Description | Severity |
|---|---|---|
| GOV-EXEC-HIGH-001 | Unauthorized proposal execution | HIGH |
| GOV-QUORUM-MED-002 | Quorum not met | MED |
| GOV-REPLAY-CRIT-003 | Proposal replay attempt | CRIT |
| GOV-PARAM-LOW-004 | Invalid proposal parameter | LOW |

---

## 10. Cross-Chain Fault Codes (XCH)

| Code | Description | Severity |
|---|---|---|
| XCH-ATTEST-HIGH-001 | Missing source-chain attestation | HIGH |
| XCH-FINALITY-MED-002 | Finality not reached | MED |
| XCH-REORG-CRIT-003 | Chain reorg invalidated proof | CRIT |
| XCH-REPLAY-CRIT-004 | Cross-chain replay detected | CRIT |

---

## 11. Infrastructure Fault Codes (SYS)

| Code | Description | Severity |
|---|---|---|
| SYS-DEP-MED-001 | Dependency unavailable | MED |
| SYS-RESOURCE-HIGH-002 | Resource exhaustion | HIGH |
| SYS-CONFIG-MED-003 | Invalid configuration | MED |
| SYS-PANIC-CRIT-004 | Unrecoverable runtime failure | CRIT |

---

## 12. Slashing Eligibility Matrix

| Severity | Slashing Eligible |
|---|---|
| LOW | ❌ No |
| MED | ⚠ Governance review |
| HIGH | ✅ Conditional |
| CRIT | ✅ Mandatory |

---

## 13. Governance Enforcement

- CRIT faults **must** trigger:
  - Automatic node suspension
  - Governance review
- HIGH faults:
  - Accumulate reputation penalties
- MED faults:
  - Logged for trend analysis

---

## 14. Cross-Chain Consistency

Fault codes are:
- Identical across BNB Chain & Ethereum
- Encoded as fixed-length bytes32
- Verified at bridge boundaries

---

## 15. Extension Rules

- New fault codes require governance approval
- Existing codes are immutable
- Deprecation is forbidden

---

## 16. File Location
/medintel/faults/FAULT_CODE_MAPPING.md

---

**End of Document**

