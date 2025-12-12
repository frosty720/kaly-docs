---
sidebar_position: 3
---

# GraphQL API

GraphQL provides an efficient alternative to JSON-RPC for querying blockchain data, especially for complex queries that would require multiple RPC calls.

## Overview

Benefits of GraphQL:

- **Reduced Overhead** — Get exactly the data you need in one request.
- **Efficient Queries** — Fetch related data without multiple round trips.
- **Self-Documenting** — Schema describes available queries.

## Enabling GraphQL

```bash
kaly --graphql-http-enabled \
     --graphql-http-host=0.0.0.0 \
     --graphql-http-port=8547
```

Default endpoint: `http://localhost:8547/graphql`

:::note
GraphQL is only available over HTTP, not WebSocket.
:::

## Making Requests

### Using cURL

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  --data '{"query": "{syncing{startingBlock currentBlock highestBlock}}"}' \
  http://localhost:8547/graphql
```

### Using GraphQL Client

```javascript
const response = await fetch('http://localhost:8547/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `{
      block(number: "latest") {
        number
        hash
        timestamp
      }
    }`
  })
});
```

## Example Queries

### Get Sync Status

```graphql
{
  syncing {
    startingBlock
    currentBlock
    highestBlock
  }
}
```

Response:

```json
{
  "data": {
    "syncing": {
      "startingBlock": "0x0",
      "currentBlock": "0x2d0",
      "highestBlock": "0x66c0"
    }
  }
}
```

### Get Block Details

```graphql
{
  block(number: "latest") {
    number
    hash
    timestamp
    gasUsed
    gasLimit
    transactions {
      hash
      from {
        address
      }
      to {
        address
      }
      value
    }
  }
}
```

### Get Account Information

```graphql
{
  account(address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD2b") {
    address
    balance
    transactionCount
    code
  }
}
```

### Get Transaction with Receipt

```graphql
{
  transaction(hash: "0x...") {
    hash
    nonce
    from {
      address
    }
    to {
      address
    }
    value
    gasPrice
    gas
    status
    logs {
      topics
      data
    }
  }
}
```

### Get Multiple Blocks

```graphql
{
  block1: block(number: "0x100") {
    number
    hash
  }
  block2: block(number: "0x101") {
    number
    hash
  }
}
```

## Pending Transactions

Query pending transactions in the transaction pool:

### Pending Transaction Count

```graphql
{
  pending {
    transactionCount
  }
}
```

### Pending Transaction Hashes

```graphql
{
  pending {
    transactions {
      hash
      from {
        address
      }
      gasPrice
    }
  }
}
```

:::important
KalyChain doesn't execute pending transactions, so `account`, `call`, and `estimateGas` for `pending` don't reflect pending state.
:::

## Using GraphiQL

[GraphiQL](https://github.com/graphql/graphiql) is an interactive GraphQL IDE:

1. Open GraphiQL app or browser extension.
2. Connect to `http://localhost:8547/graphql`.
3. Explore the schema and run queries interactively.

Features:

- Schema exploration
- Auto-completion
- Query history
- Response formatting

## Schema

The GraphQL schema defines available types and queries. Key types include:

### Block

```graphql
type Block {
  number: Long!
  hash: Bytes32!
  parent: Block
  timestamp: Long!
  gasLimit: Long!
  gasUsed: Long!
  transactions: [Transaction!]!
  # ... more fields
}
```

### Transaction

```graphql
type Transaction {
  hash: Bytes32!
  nonce: Long!
  from: Account!
  to: Account
  value: BigInt!
  gasPrice: BigInt!
  gas: Long!
  status: Long
  # ... more fields
}
```

### Account

```graphql
type Account {
  address: Address!
  balance: BigInt!
  transactionCount: Long!
  code: Bytes!
}
```

## Comparison with JSON-RPC

| Scenario | Recommended |
|----------|-------------|
| Get block with all transactions | GraphQL |
| Simple balance check | JSON-RPC |
| Aggregate data queries | GraphQL |
| Real-time subscriptions | JSON-RPC (Pub/Sub) |
| Contract calls | JSON-RPC |

## Further Reading

- [API Overview](./) — Enabling and securing APIs.
- [JSON-RPC](./json-rpc) — Traditional RPC interface.
- [Hyperledger Besu GraphQL](https://besu.hyperledger.org/public-networks/how-to/use-besu-api/graphql) — Complete reference.
