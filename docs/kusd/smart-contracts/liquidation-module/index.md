---
sidebar_position: 3
---

# Liquidation Module

- **Module Name:** Liquidation 2.0 Module
- **Type/Category:** DSS → Dog.sol, Clip.sol, Abaci.sol
- **Contract Sources:**
  - [**Dog**](https://github.com/kalycoinproject/KUSD/blob/main/kusd-core/src/dog.sol)
  - [**Clip**](https://github.com/kalycoinproject/KUSD/blob/main/kusd-core/src/clip.sol)
  - [**Abaci**](https://github.com/kalycoinproject/KUSD/blob/main/kusd-core/src/abaci.sol)

## 1. Introduction

A **liquidation** is the automatic transfer of collateral from an insufficiently collateralized Vault to the protocol. The `Dog` contract triggers liquidations and the `Clipper` runs Dutch auctions to sell collateral for KUSD.

## 2. Key Features

### Instant Settlement (Dutch Auctions)
Unlike English auctions where capital is locked until outbid, Dutch auctions settle instantly at a price calculated from initial price and elapsed time.

### Flash Lending of Collateral
Participants can purchase collateral with zero capital by directing the sale into other protocols in exchange for KUSD within a single transaction.

### Price Decrease Functions

| Function | Description |
|----------|-------------|
| `LinearDecrease` | Price reaches zero after `tau` seconds |
| `StairstepExponentialDecrease` | Drops by `cut` percent every `step` seconds |
| `ExponentialDecrease` | Continuous exponential decay |

## 3. Core Functions

### Dog.bark() — Trigger Liquidation

```solidity
function bark(bytes32 ilk, address urn, address kpr) 
    external returns (uint256 id);
```

- Checks if Vault is undercollateralized
- Transfers collateral to the Clipper
- Initiates auction via `Clipper.kick()`

### Clipper.take() — Purchase Collateral

```solidity
function take(
    uint256 id,   // Auction ID
    uint256 amt,  // Max collateral to buy [wad]
    uint256 max,  // Max price per unit [ray]
    address who,  // Recipient of collateral
    bytes calldata data  // Callback data
) external;
```

### Clipper.redo() — Reset Expired Auction

```solidity
function redo(uint256 id, address kpr) external;
```

Resets auctions that:
- Have exceeded `tail` seconds
- Have fallen below `cusp` percent of initial price

## 4. Parameters

### Dog Parameters

| Parameter | Description |
|-----------|-------------|
| `Hole` | Max KUSD for all active auctions |
| `ilk.hole` | Max KUSD per collateral type |
| `ilk.chop` | Liquidation penalty (e.g., 1.13 = 13%) |

### Clipper Parameters

| Parameter | Description |
|-----------|-------------|
| `buf` | Starting price multiplier (e.g., 1.2 = 20% above OSM) |
| `tail` | Seconds before auction must reset |
| `cusp` | Price drop percentage before reset |
| `chip` | Percent of debt as keeper incentive |
| `tip` | Flat KUSD incentive for keepers |

## 5. Circuit Breaker

Four-stage safety mechanism:

| Level | Effect |
|-------|--------|
| 0 | All functions enabled |
| 1 | No new liquidations (`kick`) |
| 2 | No liquidations or resets (`redo`) |
| 3 | All auction functions disabled |

## 6. Gotchas

:::warning Price Changes
Auction parameters can change during running auctions. Use the `max` parameter in `take()` to set maximum acceptable price.
:::

- **Front-Running Risk** — Use authorized proxy contracts and provide some capital
- **OSM Risk** — Initial price uses 1-hour delayed oracle price

## Related Documentation

- [Core Module](../core-module)
- [Collateral Module](../collateral-module)
- [Keepers Overview](../../keepers/overview)
