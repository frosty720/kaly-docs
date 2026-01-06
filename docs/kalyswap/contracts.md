---
sidebar_position: 3
---

# Smart Contracts

KalySwap uses the standard Uniswap V2 protocol for its AMM functionality. Below are the deployed contract addresses on the **KalyChain Mainnet**.

## Core Contracts

| Contract Name | Address |
| :--- | :--- |
| **UniswapV2Factory** | `0xD42Af909d323D88e0E933B6c50D3e91c279004ca` |
| **UniswapV2Router02** | `0x183F288BF7EEBe1A3f318F4681dF4a70ef32B2f3` |

### Init Code Hash
The pair initialization code hash (used for computing pair addresses):
```
0x91b0fa855886c040a2fba5b67e7149d8d4d774e27c10798019a4ae8e3e83c5e0
```

## Developer Resources

### Source Code
The smart contract source code is open source and available for verification and review.

- **Repository**: [KalyCoinProject/exchange-contracts](https://github.com/KalyCoinProject/exchange-contracts)

### Accessing ABIs
You can install the artifacts via npm to access the ABIs for your dApps:

```bash
npm install --dev @kalycoinproject/exchange-contracts
```

**Importing ABI in JavaScript/TypeScript:**
```javascript
import { abi as IKalyswapPairABI } from '@kalycoinproject/exchange-contracts/artifacts/contracts/kalyswap-core/interfaces/IKalyswapPair.sol/IKalyswapPair.json'
```

### Attribution
These contracts are based on the [Uniswap V2 Core](https://github.com/Uniswap/uniswap-v2-core) and [Periphery](https://github.com/Uniswap/uniswap-v2-periphery) repositories.
