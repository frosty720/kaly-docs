---
sidebar_position: 2
---

# Oracle Module

- **Module Name:** Oracle Module
- **Type/Category:** Oracles → Median.sol & OSM.sol
- **Contract Sources:**
  - [**Oracle**](https://github.com/KalyChain/KUSD/blob/main/oracle/)

## 1. Introduction

An Oracle Module is deployed for each collateral type, feeding price data to the Vat. The module uses whitelisted addresses to broadcast price updates off-chain, which are aggregated through a `Median` before being pulled into the `OSM` (Oracle Security Module).

## 2. Module Components

### Median

The **Median** provides KUSD's trusted reference price:

- Maintains a whitelist of authorized price feed contracts
- Computes the median of received prices
- Requires minimum number of prices (`bar`) to accept updates

### OSM (Oracle Security Module)

The **OSM** ensures new price values aren't used immediately:

- 1-hour price delay for security
- Reads from Median via `poke()`
- Other contracts must be whitelisted to read prices

```
┌────────────┐    poke()    ┌────────────┐    poke()    ┌────────────┐
│   Oracle   │ ───────────▶ │   Median   │ ───────────▶ │    OSM     │
│   Feeds    │              │            │              │  (1h delay)│
└────────────┘              └────────────┘              └─────┬──────┘
                                                              │
                                                              ▼
                                                        ┌────────────┐
                                                        │   Spotter  │
                                                        │            │
                                                        └─────┬──────┘
                                                              │
                                                              ▼
                                                        ┌────────────┐
                                                        │    Vat     │
                                                        └────────────┘
```

## 3. Key Mechanisms

### Price Flow

1. Oracle feeds submit prices to the **Median**
2. Median computes the middle value and stores it
3. **OSM** reads from Median when `poke()` is called
4. OSM queues value for the next `hop` period (1 hour)
5. **Spotter** reads from OSM and updates the Vat

### Price Reading

```solidity
// Get current price (reverts if invalid)
function read() external view returns (bytes32);

// Get current price with validity flag
function peek() external view returns (bytes32, bool);
```

## 4. Gotchas

### Median vs OSM

| Source | Freshness | Use Case |
|--------|-----------|----------|
| Median | Real-time | Off-chain monitoring |
| OSM | 1-hour delay | On-chain liquidations |

- Reading from Median gives more real-time prices
- OSM provides security via price delay, preventing flash price manipulation

### Spotter Relationship

The `Spotter` operates as the interface contract for retrieving market prices. The Vat reads from the Spotter, not directly from oracles.

## 5. Failure Modes

### Median Failures
- If all oracles sign a price of zero, the price becomes invalid
- `peek()` returns false, indicating the value shouldn't be trusted

### OSM Failures
- `poke()` not called promptly allows stale prices
- Authorization misconfigurations
- Price manipulation during the delay window

## Related Documentation

- [Core Module](../core-module)
- [Liquidation Module](../liquidation-module)
