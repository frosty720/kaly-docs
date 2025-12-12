---
sidebar_position: 1
sidebar_label: Core Module
---

# Core Module

- **Module Name:** Vault Core Module
- **Type/Category:** Vault Core Module → (Vat.sol, Spot.sol)
- **Contract Sources:**
  - [**Vat**](https://github.com/KalyChain/KUSD/blob/main/kusd-core/src/vat.sol)
  - [**Spot**](https://github.com/KalyChain/KUSD/blob/main/kusd-core/src/spot.sol)

## 1. Introduction

The **Core Module** is the foundation of the KUSD Protocol. It contains the entire state of the system and controls the central mechanisms during normal operation.

## 2. Module Details

### Core Components

| Component | Description |
|-----------|-------------|
| Vat | Core accounting engine |
| Spot | Price feed integration |

## 3. Key Mechanisms and Concepts

### Vat

The `Vat` is the core Vault, KUSD, and collateral state keeper. It maintains the central "Accounting Invariants" of KUSD:

```solidity
// Core accounting equation
sum(all KUSD debt) == sum(all KUSD in existence)
```

Key functions:
- `slip(ilk, usr, wad)` — Modify collateral balance
- `flux(ilk, src, dst, wad)` — Transfer collateral
- `move(src, dst, rad)` — Transfer KUSD
- `frob(ilk, u, v, w, dink, dart)` — Modify Vault (core operation)
- `fork(ilk, src, dst, dink, dart)` — Split Vault
- `grab(ilk, u, v, w, dink, dart)` — Liquidate Vault
- `suck(u, v, rad)` — Mint unbacked KUSD
- `fold(ilk, u, rate)` — Modify stability fee rate

### Spot

The `Spot` contract integrates price feeds with the core system:

```solidity
// Update collateral price
function poke(bytes32 ilk) external {
    (bytes32 val, bool has) = ilks[ilk].pip.peek();
    uint256 spot = rdiv(rdiv(mul(uint(val), 10 ** 9), par), ilks[ilk].mat);
    vat.file(ilk, "spot", spot);
}
```

Key functions:
- `poke(ilk)` — Update collateral price from oracle

## 4. Gotchas (Potential User Errors)

:::warning
The methods in the `Vat` are written to be generic and have verbose interfaces. Care should be taken to not mix parameter order.
:::

- **Root Access**: Any module `auth`ed against the `Vat` has full access and can steal all collateral. Adding new collateral types carries considerable risk.
- **Spotter Access**: Modules `auth`ed against `Spot` can add/remove which collateral types can be "poked."

## 5. Failure Modes

### Coding Errors

| Contract | Impact |
|----------|--------|
| `Vat` | Catastrophic — could lead to loss/locking of all KUSD and collateral |
| `Spot` | Moderate — prices stop updating, requires new authorized spotter |

### Oracle Failures

Both `Vat` and `Spot` rely on trusted oracles. If price feeds fail:
- Unbacked KUSD could be minted
- Safe Vaults could be unfairly liquidated

### Governance Risks

Governance can authorize new modules against the `Vat`, allowing them to:
- Steal collateral via `slip`
- Mint unbacked KUSD via `suck`

## Related Documentation

- [Collateral Module](../collateral-module)
- [KUSD Module](../kusd-module)
