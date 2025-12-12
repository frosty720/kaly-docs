---
sidebar_position: 1
---

# CLI Tools Overview

Command-line interfaces for interacting with the KUSD Protocol using Foundry's `cast`.

## Prerequisites

- [Foundry](https://book.getfoundry.sh/) installed
- KalyChain RPC URL
- Private key with KLC for gas

## Setup

```bash
# Set environment variables
export RPC_URL=https://testnetrpc.kalychain.io/rpc
export PRIVATE_KEY=your_private_key

# Contract addresses (testnet)
export VAT=0x30e50aD44cd1890A6bf9F09Bf6b8AfE62a6a390D
export PSM=0xF61448725934d38b7fF94f9162AEed729486de35
export KUSD=0xd15F19c457AaaCB7A389B305Dac8611Cd2294c36
export USDC=0x148d19609F3Ad595F8455225510f89cF0F121013
```

## Querying System State

### Check Total System Debt

```bash
cast call $VAT "debt()(uint256)" --rpc-url $RPC_URL
```

### Check Collateral Type Info

```bash
cast call $VAT "ilks(bytes32)(uint256,uint256,uint256,uint256,uint256)" \
  $(cast --format-bytes32-string "USDC-A") --rpc-url $RPC_URL
```

### Check Global Debt Ceiling

```bash
cast call $VAT "Line()(uint256)" --rpc-url $RPC_URL
```

## PSM Operations

### Approve USDC for PSM

```bash
cast send $USDC "approve(address,uint256)" $PSM $(cast --max-uint) \
  --private-key $PRIVATE_KEY --rpc-url $RPC_URL --legacy
```

### Sell USDC for KUSD

```bash
# Swap 100 USDC for KUSD (USDC has 6 decimals)
cast send $PSM "sellGem(address,uint256)" $YOUR_ADDRESS 100000000 \
  --private-key $PRIVATE_KEY --rpc-url $RPC_URL --legacy
```

### Buy USDC with KUSD

```bash
# First approve KUSD
cast send $KUSD "approve(address,uint256)" $PSM $(cast --max-uint) \
  --private-key $PRIVATE_KEY --rpc-url $RPC_URL --legacy

# Buy 100 USDC with KUSD
cast send $PSM "buyGem(address,uint256)" $YOUR_ADDRESS 100000000 \
  --private-key $PRIVATE_KEY --rpc-url $RPC_URL --legacy
```

### Check PSM Liquidity

```bash
# KUSD available in PSM
cast call $KUSD "balanceOf(address)(uint256)" $PSM --rpc-url $RPC_URL

# USDC available in pocket
cast call $PSM "pocket()(address)" --rpc-url $RPC_URL
```

## Vault Operations

### Check Your Vault

```bash
cast call $VAT "urns(bytes32,address)(uint256,uint256)" \
  $(cast --format-bytes32-string "USDC-A") \
  $YOUR_ADDRESS \
  --rpc-url $RPC_URL
```

### Check KUSD Balance

```bash
cast call $KUSD "balanceOf(address)(uint256)" $YOUR_ADDRESS --rpc-url $RPC_URL
```

## Useful Conversions

```bash
# Convert bytes32 to string
cast --parse-bytes32-string 0x555344432d410000...

# Format to bytes32
cast --format-bytes32-string "USDC-A"

# Convert wei to ether
cast --from-wei 1000000000000000000

# Convert to ray (27 decimals)
cast --to-uint256 1000000000000000000000000000
```

## Related Documentation

- [PSM Module](../smart-contracts/psm-module)
- [Deployment Addresses](../deployment/addresses)
- [Keepers](../keepers/overview)
