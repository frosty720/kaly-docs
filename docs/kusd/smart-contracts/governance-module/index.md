---
sidebar_position: 5
---

# Governance Module

- **Module Name:** Governance Module
- **Type/Category:** Governance → Pause.sol, End.sol
- **Contract Sources:**
  - [**End**](https://github.com/KalyChain/KUSD/blob/main/kusd-core/src/end.sol)

## 1. Introduction

The Governance Module contains contracts that facilitate voting, proposal execution, and voting security. On KalyChain, governance is managed through KLC staking and multisig controls.

## 2. Module Components

### Pause

The `Pause` contract provides a delay mechanism for governance actions:

- **Delegatecall-based proxy** with enforced delay
- Scheduled function calls can only execute after waiting period
- Protects against flash governance attacks

### End (Emergency Shutdown)

The `End` contract handles emergency shutdown of the KUSD Protocol:

- Freezes all protocol operations
- Allows users to claim collateral
- Cancels all active auctions

### ESM (Emergency Shutdown Module)

Allows emergency shutdown to be triggered when sufficient governance tokens are deposited.

## 3. Key Mechanisms

### Governance Delay

```
Proposal → Wait Period → Execution
              ↓
         (e.g., 48 hours)
```

All parameter changes must pass through the delay, giving users time to exit if they disagree.

### Emergency Shutdown Process

1. `End.cage()` — Freeze the system
2. `End.cage(ilk)` — Set final price for each collateral
3. `End.skim(ilk, urn)` — Cancel Vault positions
4. `End.free(ilk)` — Allow users to withdraw excess collateral
5. `End.thaw()` — Finalize outstanding KUSD calculation
6. `End.flow(ilk)` — Calculate collateral per KUSD
7. `End.pack(wad)` — Deposit KUSD for redemption
8. `End.cash(ilk, wad)` — Claim collateral

## 4. Gotchas

### Pause Contract
- **Identity & Trust**: Plans execute with the identity of the pause's **proxy**, not the pause itself
- Trust the proxy address for auth schemes

### Emergency Shutdown
- Once triggered, shutdown is **irreversible**
- All running auctions are cancelled via `End.snip()`
- Vault owners receive debt back including liquidation penalty already charged

## 5. Failure Modes

### Governance Risks
- **Voting Gap**: When votes move between proposals, small amounts can momentarily control the system
- **Uncast Spells**: Proposals with accumulated votes become attractive targets

### Pause Limitations
- No way to bypass the delay
- Cannot modify pause storage from delegatecall
- Pause always retains ownership of its proxy

## Related Documentation

- [Core Module](../core-module)
- [Rates Module](../rates-module)
