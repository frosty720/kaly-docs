---
sidebar_position: 1
---

# KUSD Protocol 101

## Introduction

The KUSD Protocol is a decentralized credit system deployed on KalyChain that allows users to generate the KUSD stablecoin by depositing collateral assets into Vaults.

## How KUSD Works

### Collateralized Debt Positions (Vaults)

Users lock collateral in smart contracts called **Vaults**. Against this collateral, users can generate (borrow) KUSD up to a certain collateralization ratio.

### Supported Collateral Types

| Collateral | Symbol | Type | Decimals |
|------------|--------|------|----------|
| Wrapped Bitcoin | WBTC | Crypto | 8 |
| Wrapped Ethereum | WETH | Crypto | 18 |
| USD Coin | USDC | Stablecoin (PSM) | 6 |
| Tether | USDT | Stablecoin | 6 |
| DAI | DAI | Stablecoin | 18 |

:::tip Multi-Collateral System
KUSD is a **multi-collateral** stablecoin. Unlike single-collateral systems, users can choose from various approved assets to generate KUSD, each with its own risk parameters.
:::

### Example Vault

```
User deposits 0.5 WBTC → Vault → User borrows 15,000 KUSD
                              (at 150% collateralization)
```

### Collateralization Ratio

Each collateral type has a minimum **Liquidation Ratio**. For example, if the ratio is 150%, a user must maintain at least $150 worth of collateral for every $100 of KUSD borrowed.

| Collateral | Typical Liquidation Ratio |
|------------|---------------------------|
| WBTC | 150% |
| WETH | 150% |
| Stablecoins (PSM) | 100% |

### Stability Fee

Vaults accrue a **Stability Fee** over time — an annual interest rate on the borrowed KUSD. This fee must be paid when closing a Vault or repaying KUSD.

### Liquidation

If a Vault's collateralization ratio falls below the minimum (due to collateral price drops), it becomes eligible for **Liquidation**. Keepers can trigger Dutch auctions to sell the collateral and repay the debt.

## Peg Stability Module (PSM)

The PSM allows for direct 1:1 swaps between KUSD and USDC, helping maintain KUSD's peg to the US Dollar.

| Operation | Fee | Description |
|-----------|-----|-------------|
| `sellGem` | ~0.1% | Swap USDC → KUSD |
| `buyGem` | ~0.1% | Swap KUSD → USDC |

## Key System Parameters

| Parameter | Description |
|-----------|-------------|
| **Debt Ceiling** | Maximum KUSD that can be generated per collateral type |
| **Liquidation Ratio** | Minimum collateralization required |
| **Stability Fee** | Annual interest rate on borrowed KUSD |
| **Liquidation Penalty** | Fee charged during liquidation |

## System Contracts Overview

| Contract | Purpose |
|----------|---------|
| `Vat` | Core accounting engine |
| `Jug` | Stability fee accumulation |
| `Spot` | Collateral pricing integration |
| `Dog` | Liquidation triggering |
| `Clipper` | Dutch auction liquidations |
| `KUSD` | ERC-20 stablecoin token |
| `PSM` | Peg Stability Module (USDC) |

## Next Steps

- [Smart Contract Modules](../smart-contracts/core-module) — Detailed contract documentation
- [Keepers](../keepers/overview) — Running keeper bots
- [Deployment Addresses](../deployment/addresses) — Contract addresses on KalyChain
