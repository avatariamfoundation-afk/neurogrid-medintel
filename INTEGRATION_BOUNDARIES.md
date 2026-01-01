# MedIntel Integration Boundaries

## Role
MedIntel is a downstream consumer and reporter.
It is not a controller.

## May
- Read Core state
- Submit validations
- Submit safety signals

## May Not
- Execute governance
- Modify registry directly
- Trigger on-chain actions

All interactions must pass through approved interfaces.

