---
sidebar_position: 4
---

# Rates Module

- **Module Name:** Rates Module
- **Type/Category:** Rates → Jug.sol, Pot.sol
- **Contract Sources:**
  - [**Jug**](https://github.com/KalyCoinProject/kusd-core/blob/main/src/jug.sol)
  - [**Pot**](https://github.com/KalyCoinProject/kusd-core/blob/main/src/pot.sol)

## 1. Introduction

The Rates Module accumulates stability fees on Vault debt and (optionally) interest on savings deposits. It uses a **cumulative rate** mechanism that updates all positions in constant time.

## 2. Module Components

### Jug — Stability Fee Accumulation

The `Jug` computes and updates stability fees for each collateral type.

```solidity
// Accumulate stability fees for a collateral type
function drip(bytes32 ilk) external returns (uint256 rate);
```

### Pot — KUSD Savings Rate (Optional)

The `Pot` allows KUSD holders to earn interest on deposited KUSD.

```solidity
// Deposit KUSD
function join(uint256 wad) external;

// Withdraw KUSD with interest  
function exit(uint256 wad) external;
```

## 3. Key Mechanisms

### Stability Fee Calculation

Fees are stored as a per-second rate. For example, a 2% annual fee:

```
Per-second rate = (1.02)^(1/31536000) ≈ 1.000000000627937192...
```

The cumulative rate `R(t)` at time `t`:

```
R(t) = R₀ × F₁ × F₂ × ... × Fₜ
```

Total Vault debt = `normalized_debt × rate`

### Jug.drip() Flow

1. Calculate time elapsed since last `drip`
2. Compute rate change based on `base + duty`
3. Update `rate` in Vat for the collateral type
4. Credit accumulated fees to Vow (surplus buffer)

### Rate Parameters

| Parameter | Description |
|-----------|-------------|
| `base` | Global base rate (applies to all collateral) |
| `duty` | Per-collateral additional rate |
| `rho` | Timestamp of last `drip` call |

## 4. Who Calls drip()?

The system relies on external actors to call `drip`:

- **Keepers** — Seeking to liquidate Vaults (fees push ratios unsafe)
- **Vault owners** — Before drawing KUSD (to avoid backdated fees)
- **Governance** — Ensuring proper system operation

:::tip
If `drip` isn't called, debt drawn and wiped between updates has no fees assessed.
:::

## 5. Setting Rates

To set a 0.5% annual rate:

```
r^(365×24×60×60) = 1.005

r = 1.000000000158153903837946258...

// As a ray (27 decimals):
Jug.file(ilk, "duty", 1000000000158153903837946258)
```

## 6. Failure Modes

- **Infrequent drip calls** — Slight discrepancies from ideal rate values
- **Fee changes between drips** — Can cause over/under-collection
- **Governance** should call `drip` prior to fee changes

## Related Documentation

- [Core Module](../core-module)
- [Governance Module](../governance-module)
