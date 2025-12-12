---
sidebar_position: 1
---

# PSM Module

- **Module Name:** Peg Stability Module
- **Type/Category:** Stability → KssLitePsm.sol
- **Contract Sources:**
  - [**KssLitePsm**](https://github.com/kalycoinproject/KUSD/blob/main/kss-lite-psm/src/KssLitePsm.sol)
  - [**GemJoin**](https://github.com/kalycoinproject/KUSD/blob/main/kss-lite-psm/src/join-5-usdc.sol)

## 1. Introduction

The **Peg Stability Module (PSM)** enables direct 1:1 swaps between KUSD and a stablecoin collateral (USDC). This mechanism helps maintain KUSD's peg to $1 USD by providing:

- **Arbitrage Opportunities** — Traders profit from peg deviations
- **Liquidity** — Users can swap directly without slippage
- **Price Floor/Ceiling** — Bounds KUSD price within fee ranges

## 2. How PSM Works

```
┌─────────────────────────────────────────────────────────────┐
│                    PSM Swap Mechanism                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   KUSD > $1.001                   KUSD < $0.999             │
│   ┌─────────┐                     ┌─────────┐               │
│   │  USDC   │ ──sellGem──▶ KUSD   │  KUSD   │ ──buyGem──▶   │
│   └─────────┘                     └─────────┘    USDC       │
│   Users buy cheap KUSD            Users sell expensive KUSD │
│   → Price drops                   → Price rises             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 3. Key Functions

### sellGem (Swap Stablecoin → KUSD)

```solidity
function sellGem(address usr, uint256 gemAmt) external {
    uint256 gemAmt18 = gemAmt * to18ConversionFactor;
    uint256 fee = gemAmt18 * tin / WAD;
    uint256 kusdAmt = gemAmt18 - fee;
    
    gem.transferFrom(msg.sender, address(this), gemAmt);
    gemJoin.join(address(this), gemAmt);
    vat.move(address(this), usr, kusdAmt * RAY);
}
```

| Parameter | Description |
|-----------|-------------|
| `usr` | Address to receive KUSD |
| `gemAmt` | Amount of stablecoin to sell |

### buyGem (Swap KUSD → Stablecoin)

```solidity
function buyGem(address usr, uint256 gemAmt) external {
    uint256 gemAmt18 = gemAmt * to18ConversionFactor;
    uint256 fee = gemAmt18 * tout / WAD;
    uint256 kusdAmt = gemAmt18 + fee;
    
    vat.move(msg.sender, address(this), kusdAmt * RAY);
    gemJoin.exit(usr, gemAmt);
}
```

## 4. Fee Structure

| Parameter | Description | Typical Value |
|-----------|-------------|---------------|
| `tin` | Fee on `sellGem` (stablecoin → KUSD) | 0.1% (0.001) |
| `tout` | Fee on `buyGem` (KUSD → stablecoin) | 0.1% (0.001) |

### Fee Impact on Peg

| KUSD Price | Action | Effect |
|------------|--------|--------|
| > $1.001 | `sellGem` profitable | Increases KUSD supply → Price drops |
| < $0.999 | `buyGem` profitable | Decreases KUSD supply → Price rises |
| $0.999 - $1.001 | No arbitrage | Peg maintained |

## 5. USDC Adapter

The PSM uses a specialized adapter for USDC (6 decimals):

```solidity
// The KssLitePsm handles decimal conversion internally
contract KssLitePsm {
    uint256 public immutable to18ConversionFactor;
    
    constructor(...) {
        // For USDC with 6 decimals: 10^(18-6) = 10^12
        to18ConversionFactor = 10 ** (18 - gem.decimals());
    }
}
```

## 6. Deployment Configuration

```solidity
// Initialize PSM
psm.file("tin", 0.001 * WAD);   // 0.1% sell fee
psm.file("tout", 0.001 * WAD);  // 0.1% buy fee

// Set debt ceiling in Vat
vat.file(ilk, "line", 10_000_000 * RAD);  // 10M KUSD ceiling
```

## 7. Gotchas

:::warning Decimal Handling
USDC uses 6 decimals while KUSD uses 18. The PSM handles this conversion, but external integrations must account for this.
:::

- **Debt Ceiling** — PSM is limited by the collateral type's debt ceiling
- **Fee Changes** — Only governance can modify `tin`/`tout`
- **Emergency Shutdown** — PSM may be disabled during shutdown

## Related Documentation

- [Keepers: PSM Keeper](../../keepers/psm-keeper)
- [Core Module](../core-module)
- [Deployment Addresses](../../deployment/addresses)
