## INTEGRATION_GUIDE.md

Deterministic Medical Intelligence → NeuroGrid Core

---

## 1. Purpose

This document defines exactly how MedIntel integrates with NeuroGrid Core, validators, governance layers, and downstream consumers.

It is written to be:

Hackathon-judge readable

Engineer executable

## 2. Production-aligned

There are no implied steps.
Every integration surface is explicit.

## 3. Integration Scope

MedIntel integrates with the following system layers:

NeuroGrid Core Smart Contracts

Compute Nodes / Validators

Telemetry & Artifact Indexers

Governance & Slashing Enforcement

(Future) Medical IoT & Wearable Pipelines

MedIntel does not integrate directly with end users or wallets.

## High-Level Integration Flow
[ External Data Source ]
          ↓
     MedIntel
          ↓
[ Deterministic Inference ]
          ↓
[ Artifact + Telemetry ]
          ↓
NeuroGrid Core Contracts
          ↓
Governance / Validators / Indexers

Integration Preconditions

Before integration, the following must be true:

MedIntel instance is running a fixed model version

Deterministic inference mode is enabled

Signing keys are provisioned and isolated

Compute Node is registered on-chain

Contract addresses are known and pinned

If any precondition fails, integration must be halted.

On-Chain Contract Interfaces

MedIntel interacts with read-only and write-restricted contract methods.

Primary Contracts

ArtifactRegistry

ComputeRegistry

ValidatorManager

GovernanceExecutor

MedIntel never bypasses these layers.

Compute Node Registration

Before emitting artifacts, MedIntel must be registered as a compute node.

Required Fields

Node public key

Operator address

Capability flags (Inference / Telemetry)

Deterministic execution hash

Registration is a one-time on-chain action per deployment.

Artifact Submission Integration
Artifact Payload

Each submission contains:

Artifact ID (hash)

Model version

Pipeline version

Input commitment hash

Output commitment hash

Execution fingerprint

Signature

Submission Rules

Submissions are atomic

Duplicate artifacts are rejected

Invalid signatures are rejected

Version mismatches are rejected

Artifacts are append-only.

Telemetry Emission Integration

Telemetry is submitted alongside artifacts or batched separately.

Telemetry Fields

Execution timestamp

Node identifier

Resource metrics

Fault codes (if any)

Deterministic checksum

Telemetry is non-mutable and cross-chain compatible.

Governance Integration

MedIntel does not execute governance actions.
It feeds governance with verifiable signals.

Governance can:

Slash misbehaving nodes

Freeze artifact acceptance

Update trust thresholds

Revoke compute privileges

All governance actions are external to MedIntel.

Slashing & Fault Propagation

If MedIntel emits:

Invalid artifacts

Non-deterministic outputs

Unsigned telemetry

Replayed or forged data

Then:

Fault codes are recorded

Slashing eligibility is triggered

Validator review is enforced

MedIntel cannot suppress faults.

Permission & Role Boundaries
Role	Capability
MedIntel	Inference + emission
Validator	Verification
Governance	Enforcement
Indexer	Observation

No role escalation is permitted.

Environment Configuration

MedIntel requires the following environment bindings:

Chain RPC endpoint

Contract addresses

Node private signing key

Artifact emission endpoint

Telemetry buffer limits

Misconfiguration results in hard failure, not fallback.

Integration Testing Checklist

Before declaring integration complete:

Deterministic replay validated

Artifact hashes verified on-chain

Telemetry indexed correctly

Fault injection tested

Permission boundaries enforced

Slashing simulation executed

If any item fails, integration is not valid.

Hackathon Deployment Notes

For hackathon environments:

Testnet deployments only

Placeholder tokens may be used

Production keys are forbidden

All emissions remain verifiable

Judges can independently replay inference results.

Future Extensions

This integration path is intentionally compatible with:

Medical wearables

IoT biosensors

Companion mobile applications

Regulated clinical environments

No redesign is required to scale.

Integration Philosophy

## MedIntel integrates under one rule:

If it cannot be verified independently, it does not integrate.

Final Assertion

This guide defines the only supported integration path.

---

## Any deviation breaks determinism, trust, or safety
and is therefore considered invalid by design.


