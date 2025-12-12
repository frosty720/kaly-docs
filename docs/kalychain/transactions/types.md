---
sidebar_position: 3
---

# Transaction Types

KalyChain supports multiple transaction formats, each with different features and use cases.

## Overview

Transaction types are specified by the `transactionType` parameter and affect:

- Available parameters
- Fee calculation
- Gas optimization capabilities

## FRONTIER Transactions (Legacy)

**Type identifier**: `0x0` or omitted

Legacy transactions use the original Ethereum transaction format from before [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) typed transactions.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `nonce` | Integer | Transaction sequence number |
| `gasPrice` | Integer | Wei per gas unit |
| `gasLimit` | Integer | Maximum gas units |
| `to` | Address | Recipient (null for deployment) |
| `value` | Integer | Wei to transfer |
| `data` | Bytes | Input data |
| `v`, `r`, `s` | Signature | Transaction signature |
| `chainId` | Integer | Network identifier |

### Example

```json
{
  "nonce": "0x1",
  "gasPrice": "0x3b9aca00",
  "gasLimit": "0x5208",
  "to": "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD2b",
  "value": "0xde0b6b3a7640000",
  "data": "0x",
  "chainId": "0xf30"
}
```

### Use Cases

- Simple transfers
- Compatibility with older tooling
- When gas price stability is acceptable

## ACCESS_LIST Transactions (EIP-2930)

**Type identifier**: `0x1`

Introduced in [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930), these transactions include an **access list** specifying storage slots the transaction will access.

### Parameters

All legacy parameters, plus:

| Parameter | Type | Description |
|-----------|------|-------------|
| `accessList` | Array | Addresses and storage keys to access |

### Access List Structure

```json
{
  "accessList": [
    {
      "address": "0xContractAddress",
      "storageKeys": [
        "0x0000000000000000000000000000000000000000000000000000000000000001",
        "0x0000000000000000000000000000000000000000000000000000000000000002"
      ]
    }
  ]
}
```

### Benefits

- **Gas Savings** — Pre-declaring accessed storage reduces warm access costs.
- **Predictable Execution** — Transaction specifies exactly what it will access.

### When to Use

- Complex DeFi interactions touching multiple contracts.
- Batch operations accessing known storage slots.
- Gas optimization for high-value transactions.

## EIP-1559 Transactions

**Type identifier**: `0x2`

Introduced in [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), these transactions use a dynamic fee market with a **base fee** that adjusts based on network demand.

### Parameters

Access list parameters, plus new fee parameters (replacing `gasPrice`):

| Parameter | Type | Description |
|-----------|------|-------------|
| `maxPriorityFeePerGas` | Integer | Maximum tip to validator |
| `maxFeePerGas` | Integer | Maximum total fee (base + priority) |

### Fee Calculation

The transaction pays:

```
fee = gasUsed × effectiveGasPrice

where effectiveGasPrice = min(baseFee + maxPriorityFeePerGas, maxFeePerGas)
```

| Component | Destination |
|-----------|-------------|
| Base Fee | Burned (removed from supply) |
| Priority Fee | Paid to block validator |

### Example

```json
{
  "type": "0x2",
  "nonce": "0x1",
  "maxPriorityFeePerGas": "0x3b9aca00",
  "maxFeePerGas": "0x77359400",
  "gasLimit": "0x5208",
  "to": "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD2b",
  "value": "0xde0b6b3a7640000",
  "data": "0x",
  "accessList": [],
  "chainId": "0xf30"
}
```

### Benefits

- **More Predictable Fees** — Base fee adjusts smoothly.
- **Reduced Overpayment** — Pay only what's needed.
- **Better UX** — Wallets can estimate fees more accurately.

### When to Use

- General use — recommended for most transactions.
- When fee predictability is important.
- Modern wallets default to EIP-1559.

## API Object Formats

Different API responses use transaction type-specific formats:

### Transaction Object

Returned by `eth_getTransactionByHash`, etc.

### Transaction Receipt Object

Returned by `eth_getTransactionReceipt`.

### Transaction Call Object

Used in `eth_call` and `eth_estimateGas`.

## Transaction Type Selection

| Scenario | Recommended Type | Reason |
|----------|------------------|--------|
| Simple transfer | EIP-1559 | Better fee prediction |
| Complex DeFi | EIP-2930 | Gas optimization |
| Legacy compatibility | FRONTIER | Maximum compatibility |
| High-value transaction | EIP-2930 | Optimize gas costs |

## Further Reading

- [Transaction Pool](./pool) — How transactions are queued.
- [Transaction Validation](./validation) — Validation rules.
- [EIP-1559 Specification](https://eips.ethereum.org/EIPS/eip-1559) — Fee market details.
- [EIP-2930 Specification](https://eips.ethereum.org/EIPS/eip-2930) — Access list details.
