# TEST_MATRIX.md

## Canonical Test Matrix — MedIntel & NeuroGrid Core

**Status:** Mandatory  
**Applies To:** NeuroGrid Core · MedIntel · Governance · Cross-Chain Interfaces  
**Objective:** Prove deterministic correctness, permission safety, and state integrity.

This matrix defines **what must be tested**, **why it matters**, and **what constitutes success**.  
No test listed here is optional.

---

## 1. Test Philosophy

All tests are classified into three non-negotiable categories:

1. **Happy Path** – Expected correct behavior  
2. **Permission Failure** – Unauthorized or invalid access attempts  
3. **State Guard** – Prevention of invalid or unsafe state transitions  

Each test must:
- Be deterministic
- Be repeatable
- Produce identical results across environments

---

## 2. Legend

| Column | Meaning |
|---|---|
| ID | Unique test identifier |
| Component | Contract / Module under test |
| Category | Happy / Permission / State |
| Trigger | Action performed |
| Expected Result | Deterministic outcome |
| Fault Code | Expected fault code (if any) |

---

## 3. NeuroGridKernel Tests

### Happy Path

| ID | Category | Trigger | Expected Result |
|---|---|---|---|
| NGK-H-01 | Happy | Initialize kernel | Kernel initialized, admin set |
| NGK-H-02 | Happy | Register compute node | Node registered successfully |
| NGK-H-03 | Happy | Emit telemetry | Event emitted deterministically |

### Permission Failure

| ID | Category | Trigger | Expected Result | Fault Code |
|---|---|---|---|---|
| NGK-P-01 | Permission | Non-admin init | Revert | ID-ROLE-HIGH-002 |
| NGK-P-02 | Permission | Unauthorized config change | Revert | GOV-EXEC-HIGH-001 |

### State Guard

| ID | Category | Trigger | Expected Result | Fault Code |
|---|---|---|---|---|
| NGK-S-01 | State | Double initialization | Revert | SYS-CONFIG-MED-003 |
| NGK-S-02 | State | Invalid kernel version | Revert | INF-VERSION-MED-004 |

---

## 4. ComputeRegistry Tests

### Happy Path

| ID | Trigger | Expected Result |
|---|---|---|
| CR-H-01 | Register compute node | Node active |
| CR-H-02 | Update node metadata | Metadata updated |

### Permission Failure

| ID | Trigger | Expected Result | Fault Code |
|---|---|---|---|
| CR-P-01 | Non-owner register | Revert | ID-ROLE-HIGH-002 |
| CR-P-02 | Unauthorized slashing | Revert | GOV-EXEC-HIGH-001 |

### State Guard

| ID | Trigger | Expected Result | Fault Code |
|---|---|---|---|
| CR-S-01 | Duplicate node ID | Revert | ART-DUP-MED-003 |
| CR-S-02 | Slash inactive node | Revert | SYS-CONFIG-MED-003 |

---

## 5. ArtifactRegistry Tests

### Happy Path

| ID | Trigger | Expected Result |
|---|---|---|
| AR-H-01 | Submit valid artifact | Artifact stored |
| AR-H-02 | Verify artifact hash | Verification passes |

### Permission Failure

| ID | Trigger | Expected Result | Fault Code |
|---|---|---|---|
| AR-P-01 | Submit unsigned artifact | Revert | ART-NOPROOF-CRIT-001 |
| AR-P-02 | Unauthorized verification | Revert | ID-ROLE-HIGH-002 |

### State Guard

| ID | Trigger | Expected Result | Fault Code |
|---|---|---|---|
| AR-S-01 | Replay artifact | Revert | ART-DUP-MED-003 |
| AR-S-02 | Expired artifact | Revert | ART-EXPIRE-LOW-004 |

---

## 6. ValidatorManager Tests

### Happy Path

| ID | Trigger | Expected Result |
|---|---|---|
| VM-H-01 | Register validator | Validator active |
| VM-H-02 | Slash validator | Stake reduced |

### Permission Failure

| ID | Trigger | Expected Result | Fault Code |
|---|---|---|---|
| VM-P-01 | Unauthorized slash | Revert | GOV-EXEC-HIGH-001 |
| VM-P-02 | Invalid validator ID | Revert | ID-SIG-CRIT-001 |

### State Guard

| ID | Trigger | Expected Result | Fault Code |
|---|---|---|---|
| VM-S-01 | Double registration | Revert | SYS-CONFIG-MED-003 |
| VM-S-02 | Slash zero stake | Revert | SYS-RESOURCE-HIGH-002 |

---

## 7. Governance (NeuroDAO & ProposalExecutor)

### Happy Path

| ID | Trigger | Expected Result |
|---|---|---|
| GOV-H-01 | Submit proposal | Proposal created |
| GOV-H-02 | Execute approved proposal | State updated |

### Permission Failure

| ID | Trigger | Expected Result | Fault Code |
|---|---|---|---|
| GOV-P-01 | Execute without quorum | Revert | GOV-QUORUM-MED-002 |
| GOV-P-02 | Non-member voting | Revert | ID-ROLE-HIGH-002 |

### State Guard

| ID | Trigger | Expected Result | Fault Code |
|---|---|---|---|
| GOV-S-01 | Replay proposal | Revert | GOV-REPLAY-CRIT-003 |
| GOV-S-02 | Modify executed proposal | Revert | SYS-CONFIG-MED-003 |

---

## 8. Token (ABSToken / MedToken)

### Happy Path

| ID | Trigger | Expected Result |
|---|---|---|
| TK-H-01 | Transfer tokens | Balance updated |
| TK-H-02 | Approve allowance | Allowance set |

### Permission Failure

| ID | Trigger | Expected Result | Fault Code |
|---|---|---|---|
| TK-P-01 | Transfer without balance | Revert | SYS-RESOURCE-HIGH-002 |
| TK-P-02 | Unauthorized mint | Revert | ID-ROLE-HIGH-002 |

### State Guard

| ID | Trigger | Expected Result | Fault Code |
|---|---|---|---|
| TK-S-01 | Overflow transfer | Revert | SYS-PANIC-CRIT-004 |
| TK-S-02 | Double mint | Revert | SYS-CONFIG-MED-003 |

---

## 9. Cross-Chain Telemetry Tests

### Happy Path

| ID | Trigger | Expected Result |
|---|---|---|
| XCH-H-01 | Valid attestation | Accepted |
| XCH-H-02 | Finalized proof | Stored |

### Failure & Guard

| ID | Trigger | Expected Result | Fault Code |
|---|---|---|---|
| XCH-F-01 | Missing attestation | Revert | XCH-ATTEST-HIGH-001 |
| XCH-F-02 | Replay proof | Revert | XCH-REPLAY-CRIT-004 |

---

## 10. Coverage Requirements

| Layer | Minimum Coverage |
|---|---|
| Smart Contracts | ≥ 85% |
| Governance Logic | 100% critical paths |
| Fault Handling | 100% |

---

## 11. Execution Order

1. Happy Path tests  
2. Permission Failures  
3. State Guard tests  
4. Cross-chain validation  

No phase may be skipped.
