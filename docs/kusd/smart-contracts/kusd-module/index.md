---
sidebar_position: 1
sidebar_label: KUSD Module
---

# KUSD Module

- **Module Name:** KUSD Module
- **Type/Category:** Token → KUSD.sol and KUSDJoin.sol
- **Contract Sources:**
  - [**KUSD**](https://github.com/kalycoinproject/KUSD/blob/main/kusd-core/src/kusd.sol)
  - [**KUSDJoin**](https://github.com/kalycoinproject/KUSD/blob/main/kusd-core/src/join.sol)

## 1. Introduction

The **KUSD Module** contains the KUSD token contract and the KUSDJoin adapter. KUSD is designed to represent a token that the core system considers equal in value to its internal debt unit (1 USD).

## 2. Module Details

### KUSD Token Functions

| Function | Description |
|----------|-------------|
| `mint(usr, wad)` | Mint KUSD to an address |
| `burn(usr, wad)` | Burn KUSD from an address |
| `transfer(dst, wad)` | Transfer KUSD |
| `transferFrom(src, dst, wad)` | Transfer From |
| `approve(usr, wad)` | Approve transfers |
| `permit(...)` | Approve by signature (EIP-2612) |

### KUSD Token Properties

| Property | Value |
|----------|-------|
| `name` | KUSD Stablecoin |
| `symbol` | KUSD |
| `version` | 1 |
| `decimals` | 18 |

### KUSDJoin Adapter

The `KUSDJoin` contract allows users to withdraw KUSD from the system into the standard ERC-20 token:

```solidity
// Exit internal KUSD to ERC-20
function exit(address usr, uint256 wad) external {
    vat.move(msg.sender, address(this), rad);
    kusd.mint(usr, wad);
}

// Join ERC-20 KUSD to internal system
function join(address usr, uint256 wad) external {
    kusd.burn(msg.sender, wad);
    vat.move(address(this), usr, rad);
}
```

## 3. Key Mechanisms

### Why is the KUSD Module Important?

The `KUSD` contract is the user-facing ERC-20 contract maintaining the accounting for external KUSD balances. Key features:

- **Standard ERC-20** with changing supply
- **EIP-2612 Permit** — Approvals via signed messages (gasless approvals)
- **Mint/Burn** — Only authorized contracts can mint/burn

### KUSDJoin Flow

```
┌──────────────┐     join()     ┌──────────────┐
│   ERC-20     │ ───────────────▶│   Internal   │
│    KUSD      │                 │     KUSD     │
│  (External)  │ ◀───────────────│    (Vat)     │
└──────────────┘     exit()      └──────────────┘
```

## 4. Gotchas (Potential User Errors)

:::caution ERC-20 Race Condition
KUSD is susceptible to the known [ERC20 race condition](https://github.com/0xProject/0x-monorepo/issues/850). This is mitigated with unlimited approvals. Users approving specific amounts should be aware of this issue.
:::

### Join Contract Risks

- **Phishing Attacks**: Malicious join contracts could steal funds instead of sending tokens to the Vat
- **Reversibility**: Users who accidentally call `join` can always recover tokens via `exit`

## 5. Failure Modes

### Vat Upgrade

A Vat upgrade may require new Join contracts to be deployed and authorized.

### Collateral Token Issues

If a collateral token undergoes:
- Token upgrade
- Token freeze

Users may temporarily be unable to redeem collateral. Token issuers typically coordinate with the KUSD community for such changes.

## Contract Addresses

| Network | KUSD | KUSDJoin |
|---------|------|----------|
| Testnet | `TBD` | `TBD` |
| Mainnet | `TBD` | `TBD` |

## Related Documentation

- [Core Module](../core-module)
- [Collateral Module](../collateral-module)
- [Deployment Addresses](../../deployment/addresses)
