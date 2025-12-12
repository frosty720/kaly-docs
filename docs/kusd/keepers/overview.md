---
sidebar_position: 1
---

# Keepers Overview

**Keepers** are external actors (bots) that perform critical functions to maintain the health of the KUSD Protocol. They are incentivized through arbitrage opportunities and fees.

## Types of Keepers

| Keeper | Purpose | Repository |
|--------|---------|------------|
| **KUSD Keeper** | Liquidations, arbitrage, peg maintenance | [kusd-keeper](https://github.com/KalyChain/KUSD/tree/main/kusd-keeper) |
| **PSM Keeper** | PSM arbitrage and monitoring | [psm-keeper](https://github.com/KalyChain/KUSD/tree/main/psm-keeper) |

## KUSD Keeper

The KUSD Keeper bot performs multiple functions:

### Liquidation Service
- Monitors Vaults approaching liquidation threshold
- Triggers `Dog.bark()` to initiate liquidations
- Participates in Dutch auctions via `Clipper`

### Peg Keeper Service
- Monitors KUSD price on DEXes
- Executes PSM swaps when profitable
- Helps maintain the $1 peg

### Arbitrage Service
- Identifies price discrepancies across markets
- Executes profitable trades
- Uses flash loans when beneficial

## PSM Keeper

The PSM Keeper focuses specifically on Peg Stability Module operations:

- Monitors KUSD/USDC price ratio
- Executes `sellGem`/`buyGem` for arbitrage
- Reports peg deviation metrics

## Running a Keeper

### Prerequisites

- Node.js 20+
- Private key with KLC for gas
- Access to KalyChain RPC

### Quick Start

```bash
# Clone repository
git clone https://github.com/KalyChain/KUSD.git
cd KUSD/kusd-keeper

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Run keeper
npm start
```

### Configuration

```env
# .env configuration
RPC_URL=https://rpc.kalychain.io
PRIVATE_KEY=your_private_key_here

# Contract addresses
VAT_ADDRESS=0x...
DOG_ADDRESS=0x...
PSM_ADDRESS=0x...

# Keeper settings
MIN_PROFIT_THRESHOLD=10  # Minimum profit in KUSD
GAS_PRICE_MULTIPLIER=1.2
POLL_INTERVAL_MS=5000
```

## Profit Opportunities

| Operation | Profit Source |
|-----------|---------------|
| Liquidation | Keeper incentive + auction discount |
| PSM Arbitrage | Price deviation from peg |
| DEX Arbitrage | Price differences across exchanges |

## Gas Considerations

Keepers must balance:
- ⛽ **Gas costs** on KalyChain (low compared to Ethereum)
- 💰 **Profit margins** per operation
- ⏱️ **Speed** to beat competitors

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     KUSD Keeper                          │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Liquidation  │  │  Peg Keeper  │  │  Arbitrage   │   │
│  │   Service    │  │   Service    │  │   Service    │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         │                 │                 │            │
│         └─────────────────┼─────────────────┘            │
│                           ▼                              │
│              ┌──────────────────────┐                    │
│              │    Wallet Service    │                    │
│              │ (Transaction Manager)│                    │
│              └──────────────────────┘                    │
└─────────────────────────────────────────────────────────┘
```

## Next Steps

- [KUSD Keeper Setup](./kusd-keeper) — Detailed setup guide
- [PSM Keeper Setup](./psm-keeper) — PSM-specific keeper
- [Smart Contracts](../smart-contracts/core-module) — Contract documentation
