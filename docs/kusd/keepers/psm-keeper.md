---
sidebar_position: 3
---

# PSM Keeper Setup

Guide to running the PSM-focused keeper for maintenance operations.

## Overview

The PSM Keeper performs three maintenance operations on the `kss-lite-psm`:

| Operation | Function | Purpose |
|-----------|----------|---------|
| **Fill** | `fill()` | Mint pre-minted KUSD into PSM for liquidity |
| **Trim** | `trim()` | Burn excess KUSD from PSM |
| **Chug** | `chug()` | Collect accumulated fees to Vow |

## How PSM Maintenance Works

```
┌───────────────────────────────────────────────────────────────┐
│                    PSM Keeper Operations                       │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│   rush() > 0        gush() > 0        cut() > minAmount       │
│       │                 │                    │                 │
│       ▼                 ▼                    ▼                 │
│   ┌────────┐       ┌────────┐          ┌────────┐             │
│   │  fill  │       │  trim  │          │  chug  │             │
│   │        │       │        │          │        │             │
│   └────────┘       └────────┘          └────────┘             │
│   Mint KUSD        Burn KUSD           Send fees              │
│   into PSM         from PSM            to Vow                 │
│                                                                │
└───────────────────────────────────────────────────────────────┘
```

## Installation

```bash
cd KUSD/psm-keeper
npm install
cp .env.example .env
```

## Configuration

```env
# Network
RPC_URL=https://testnetrpc.kalychain.io/rpc
CHAIN_ID=3889

# Wallet
PRIVATE_KEY=your_private_key

# Contracts
PSM_ADDRESS=0xF61448725934d38b7fF94f9162AEed729486de35

# Settings
POLL_INTERVAL_MS=30000
MIN_CHUG_AMOUNT=100000000000000000000  # 100 KUSD in wei
MAX_GAS_PRICE=50000000000              # 50 Gwei
GAS_LIMIT=500000
GAS_PRICE=21000000000                  # 21 Gwei
```

## Running

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## PSM Status Checks

The keeper calls these view functions to check status:

| Function | Returns | Triggers |
|----------|---------|----------|
| `rush()` | KUSD that can be filled | `fill()` when > 0 |
| `gush()` | KUSD that can be trimmed | `trim()` when > 0 |
| `cut()` | Fees that can be chugged | `chug()` when > minAmount |

## Operation Details

### fill() — Mint KUSD Liquidity

Called when there's room to mint more KUSD into the PSM:
- Limited by `buf` (buffer) parameter
- Limited by debt ceiling (`line`)
- Limited by global debt ceiling (`Line`)

### trim() — Burn Excess KUSD

Called when there's more KUSD than needed:
- Reduces system debt
- Triggered after `buyGem` operations

### chug() — Collect Fees

Called to move accumulated swap fees to the Vow:
- Only called when fees exceed threshold
- Fees come from `tin` and `tout` on swaps

## Gas Considerations

The keeper checks gas price before executing:

```typescript
if (currentGasPrice > this.config.maxGasPrice) {
    logger.warn('Gas price too high, skipping');
    return { success: false };
}
```

## Monitoring

Check logs for operation status:

```bash
npm start | grep -E "(fill|trim|chug)"
```

## Related Documentation

- [PSM Module](../smart-contracts/psm-module)
- [KUSD Keeper](./kusd-keeper)
- [Keepers Overview](./overview)
