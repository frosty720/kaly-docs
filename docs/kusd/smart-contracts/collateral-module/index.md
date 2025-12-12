---
sidebar_position: 1
---

# Collateral Module

- **Module Name:** Collateral Module
- **Type/Category:** DSS → join.sol, clip.sol
- **Contract Sources:**
  - [**Join**](https://github.com/kalycoinproject/KUSD/blob/main/kusd-core/src/join.sol)
  - [**Clip**](https://github.com/kalycoinproject/KUSD/blob/main/kusd-core/src/clip.sol)

## 1. Introduction

The Collateral Module is deployed for every new `ilk` (collateral type) added to the Vat. It contains all the adapters and auction contracts for one specific collateral type.

## 2. Module Components

### Join Adapters

The purpose of join adapters is to retain security, allowing only trusted smart contracts to add/remove value to/from the Vat.

| Variant | Use Case | Decimals |
|---------|----------|----------|
| `GemJoin` | Standard ERC-20 tokens | 18 |
| `ETHJoin` | Native KLC wrapped | 18 |
| `GemJoin5` | USDC/USDT-like tokens | 6 (no return value) |
| `KUSDJoin` | KUSD token adapter | 18 |

### How Join Adapters Work

```solidity
// Deposit collateral into the system
function join(address usr, uint256 wad) external {
    gem.transferFrom(msg.sender, address(this), wad);
    vat.slip(ilk, usr, int256(wad));
}

// Withdraw collateral from the system
function exit(address usr, uint256 wad) external {
    vat.slip(ilk, msg.sender, -int256(wad));
    gem.transfer(usr, wad);
}
```

### Clipper (Liquidation Auctions)

The `Clip` contract handles Dutch auctions for liquidated collateral. See [Liquidation Module](../liquidation-module) for details.

## 3. Key Mechanisms

- **Join** — Adapters used to deposit/withdraw unlocked collateral into the Vat
- **Collateral Location** — Deposited collateral is held in the respective Join adapter contract
- **Security** — Only the Vat can call the internal slip function that tracks collateral

## 4. Gotchas (Potential User Errors)

:::warning
When users want to interact with the system, they must use one of the join contracts.
:::

- If a user accidentally calls `join`, they can always retrieve tokens via the corresponding `exit` call
- **Phishing Attacks** — Malicious join contracts could send tokens to external wallets instead of the Vat

## 5. Failure Modes

### Vat Upgrade
A Vat upgrade would require new join contracts to be created and authorized.

### Token Freeze/Upgrade
If a collateral token undergoes a freeze or upgrade while user collateral is in the system, users may temporarily be unable to redeem their collateral.

## Related Documentation

- [Core Module](../core-module)
- [Liquidation Module](../liquidation-module)
- [KUSD Module](../kusd-module)
