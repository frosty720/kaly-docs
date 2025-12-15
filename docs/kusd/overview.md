---
sidebar_position: 1
---

# KUSD Technical Documentation

Welcome to the **KUSD Protocol** technical documentation. KUSD is a decentralized, collateral-backed stablecoin built on KalyChain, forked from the battle-tested MakerDAO system.

![KUSD Protocol Home](/img/kusd/kusd_home_1765832149599.png)

## What is KUSD?

KUSD is a crypto-collateralized stablecoin soft-pegged to the US Dollar. Users can generate KUSD by depositing collateral assets into Vaults within the KUSD Protocol. This enables:

- **Decentralized Borrowing** — Generate KUSD against your crypto collateral
- **Peg Stability Module (PSM)** — Direct 1:1 swaps between KUSD and other stablecoins
- **Transparent Governance** — Protocol parameters managed through KalyChain governance

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        KUSD Protocol                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Vaults    │  │     PSM     │  │   Oracles   │              │
│  │  (kusd-core)│  │ (kss-lite)  │  │  (oracle)   │              │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │
│         │                │                │                      │
│         └────────────────┼────────────────┘                      │
│                          ▼                                       │
│                   ┌─────────────┐                                │
│                   │     Vat     │                                │
│                   │ (Core State)│                                │
│                   └─────────────┘                                │
└─────────────────────────────────────────────────────────────────┘
```

## Quick Links

| Section | Description |
|---------|-------------|
| [**Getting Started**](./getting-started/kusd-protocol-101) | Protocol fundamentals |
| [**Smart Contracts**](./smart-contracts/core-module) | Contract documentation |
| [**Keepers**](./keepers/overview) | Keeper bot setup guides |
| [**Deployment**](./deployment/addresses) | Contract addresses |
| [**CLI Tools**](./cli/overview) | Command-line utilities |

## Key Components

### Core Contracts (kusd-core)
- **Vat** — Central accounting engine maintaining vault and KUSD state
- **Jug** — Stability fee accumulation
- **Spot** — Collateral price feed integration
- **KUSD Token** — ERC-20 stablecoin

### Peg Stability Module (kss-lite-psm)
- **PSM** — 1:1 stablecoin swaps with configurable fees
- **GemJoin** — Collateral adapter for USDC

### Oracles
- **Median** — Aggregated price feeds
- **OSM** — Oracle Security Module with price delay

### Keepers
- **KUSD Keeper** — Liquidation and arbitrage bot
- **PSM Keeper** — Peg maintenance operations

## Network Information

| Network | Chain ID | Explorer |
|---------|----------|----------|
| KalyChain Mainnet | 3888 | [kalyscan.io](https://kalyscan.io) |
| KalyChain Testnet | 3889 | [testnet.kalyscan.io](https://testnet.kalyscan.io) |

## Getting Help

- **GitHub**: [KalyChain/KUSD](https://github.com/kalycoinproject/KUSD)
- **Telegram**: [t.me/KalyChain](https://t.me/+yj8Ae9lNXmg1Yzkx)
- **Twitter**: [@KalyChain](https://twitter.com/KalyChain)
