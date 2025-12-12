---
sidebar_position: 2
---

# KUSD Keeper Setup

Complete guide to setting up and running the KUSD Keeper bot.

## Prerequisites

- Node.js 20+
- npm or yarn
- Private key with KLC for gas
- Access to KalyChain RPC

## Installation

```bash
# Clone the repository
git clone https://github.com/KalyChain/KUSD.git
cd KUSD/kusd-keeper

# Install dependencies
npm install

# Build the project
npm run build
```

## Configuration

Create a `.env` file from the example:

```bash
cp .env.example .env
```

### Environment Variables

```env
# Network Configuration
RPC_URL=https://rpc.kalychain.io
CHAIN_ID=3888

# Wallet Configuration
PRIVATE_KEY=your_private_key_here

# Contract Addresses
VAT_ADDRESS=0x...
DOG_ADDRESS=0x...
JUG_ADDRESS=0x...
PSM_ADDRESS=0x...

# DEX Configuration
KALYSWAP_V2_ROUTER=0x...
KALYSWAP_V3_ROUTER=0x...

# Keeper Settings
MIN_PROFIT_THRESHOLD=10           # Minimum profit in KUSD
GAS_PRICE_MULTIPLIER=1.2          # Gas price buffer
POLL_INTERVAL_MS=5000             # Check interval
ENABLE_LIQUIDATIONS=true
ENABLE_PEG_KEEPER=true
ENABLE_ARBITRAGE=true

# Logging
LOG_LEVEL=info
```

## Running

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

### Using PM2

```bash
npm install -g pm2
pm2 start npm --name "kusd-keeper" -- start
pm2 logs kusd-keeper
```

## Services

### Liquidation Service

Monitors Vaults and triggers liquidations:

1. Fetches all Vaults from Vat events
2. Calculates current collateralization ratio
3. Calls `Dog.bark()` when ratio < minimum

### Peg Keeper Service

Maintains KUSD peg via PSM:

1. Fetches KUSD price from DEXes
2. Calculates arbitrage opportunity
3. Executes `sellGem` or `buyGem`

### Arbitrage Service

Finds cross-DEX opportunities:

1. Monitors KUSD pairs across exchanges
2. Calculates profitable paths
3. Executes atomic swaps

## Monitoring

The keeper exposes metrics at `/metrics` endpoint:

```bash
curl http://localhost:3000/metrics
```

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| "Insufficient gas" | Increase `GAS_PRICE_MULTIPLIER` |
| "Nonce too low" | Restart keeper to reset nonce |
| "No profitable opportunities" | Lower `MIN_PROFIT_THRESHOLD` |

## Next Steps

- [PSM Keeper](./psm-keeper) — Focused PSM operations
- [Smart Contracts](../smart-contracts/core-module) — Contract documentation
