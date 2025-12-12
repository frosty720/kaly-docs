---
sidebar_position: 1
---

# Transactions

This section covers how KalyChain processes transactions, including different transaction types, the transaction pool, and validation rules.

## Overview

Transactions are cryptographically signed instructions from accounts that modify the blockchain state. On KalyChain, transactions can:

- **Transfer KLC** — Send native currency between accounts.
- **Deploy Smart Contracts** — Create new contract instances.
- **Call Contract Functions** — Execute contract methods.
- **Interact with DeFi Protocols** — Use KUSD, KalySwap, and other ecosystem applications.

## Transaction Lifecycle

```
User Signs Transaction
        ↓
Submit to Node (RPC)
        ↓
Transaction Pool (mempool)
        ↓
Validator Includes in Block
        ↓
Block Validated & Finalized
        ↓
State Updated
```

## Key Concepts

### Gas and Fees

Every transaction requires **gas** to execute:

- **Gas Limit** — Maximum gas units the transaction can use.
- **Gas Price** — Fee per gas unit (in wei).
- **Transaction Fee** — `gasUsed × gasPrice`

KalyChain's low gas prices make transactions inexpensive compared to Ethereum mainnet.

### Nonce

Each account has a **nonce** — a sequential counter of transactions sent from that account:

- Transactions must use the correct nonce.
- Nonce prevents replay attacks.
- Gaps in nonce sequence block subsequent transactions.

### Transaction Types

KalyChain supports multiple transaction formats:

| Type | Description |
|------|-------------|
| [Legacy (FRONTIER)](./types#frontier-transactions-legacy) | Original Ethereum transaction format |
| [EIP-2930 (ACCESS_LIST)](./types#access_list-transactions-eip-2930) | Includes access list for gas optimization |
| [EIP-1559](./types#eip-1559-transactions) | Dynamic fee market with base fee + priority fee |

## Submitting Transactions

### Using eth_sendRawTransaction

KalyChain requires pre-signed transactions:

```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"eth_sendRawTransaction",
  "params":["0xf86c...signed-transaction-hex"],
  "id":1
}' http://localhost:8545
```

:::warning No Account Management
KalyChain nodes don't store private keys. Use `eth_sendRawTransaction` with transactions signed by external wallets, not `eth_sendTransaction`.
:::

### Transaction Parameters

| Parameter | Description |
|-----------|-------------|
| `nonce` | Transaction sequence number |
| `to` | Recipient address (null for contract deployment) |
| `value` | Amount of KLC to send (in wei) |
| `data` | Contract call data or deployment bytecode |
| `gas` | Gas limit |
| `gasPrice` | Gas price (legacy) or `maxFeePerGas`/`maxPriorityFeePerGas` (EIP-1559) |

## In This Section

- **[Transaction Pool](./pool)** — How pending transactions are managed.
- **[Transaction Types](./types)** — Detailed format for each transaction type.
- **[Transaction Validation](./validation)** — How transactions are validated.

## Further Reading

- [API Reference](../api/) — JSON-RPC methods for transaction submission.
- [Events and Logs](../node-operations/events-and-logs) — Smart contract event handling.
