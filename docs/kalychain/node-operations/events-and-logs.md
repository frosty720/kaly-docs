---
sidebar_position: 3
---

# Events and Logs

Smart contracts emit events during execution, which are recorded as logs on the blockchain. This page explains how events work and how to access them.

## Overview

Events provide a way for smart contracts to communicate what happened during execution. They are:

- **Stored on-chain** — Permanently recorded in the blockchain.
- **Not accessible to contracts** — Only external applications can read logs.
- **Cheaper than storage** — Lower gas cost than contract storage.
- **Filterable** — Can be queried by topic.

## Log Structure

Each log entry contains:

| Field | Description |
|-------|-------------|
| `address` | Contract that emitted the event |
| `topics` | Array of indexed parameters (max 4) |
| `data` | Non-indexed parameters (ABI-encoded) |
| `blockNumber` | Block containing the log |
| `transactionHash` | Transaction that produced the log |
| `logIndex` | Position in the block's logs |

### Example Log Entry

```json
{
  "logIndex": "0x0",
  "removed": false,
  "blockNumber": "0x4d6",
  "blockHash": "0x7d0ac7c12ac...",
  "transactionHash": "0xe994022ada...",
  "transactionIndex": "0x0",
  "address": "0x43d1f9096674b5722d359b6402381816d5b22f28",
  "data": "0x0000000000000000000000000000000000000000000000000000000000000007",
  "topics": [
    "0xd3610b1c54575b7f4f0dc03d210b8ac55624ae007679b7a928a4f25a709331a8",
    "0x0000000000000000000000000000000000000000000000000000000000000005"
  ]
}
```

## Topics

Topics enable efficient log filtering. A log can have up to 4 topics.

### Topic 0: Event Signature

The first topic is always the **event signature hash** — a keccak-256 hash of the event name and parameter types:

```
Event1(uint256 indexed valueA)
→ keccak256("Event1(uint256)")
→ 0x04474795f5b996ff80cb47c148d4c5ccdbe09ef27551820caa9c2f8ed149cce3
```

### Topics 1-3: Indexed Parameters

Solidity events can have up to 3 **indexed** parameters, which become additional topics:

```solidity
event Transfer(
    address indexed from,    // topic[1]
    address indexed to,      // topic[2]  
    uint256 value           // in data, not a topic
);
```

:::note Array Types
For arrays, strings, and bytes, the topic contains the keccak-256 hash of the value, not the value itself. This allows filtering but not value recovery directly from the topic.
:::

## Event Parameters

### Indexed vs Non-Indexed

| Type | Stored In | Searchable | Size Limit |
|------|-----------|------------|------------|
| Indexed | Topics | Yes | 32 bytes (or hash) |
| Non-indexed | Data | No | Unlimited |

### Example Contract

```solidity
pragma solidity ^0.8.0;

contract Example {
    event ValueSet(
        uint256 indexed id,      // searchable, topic[1]
        address indexed setter,  // searchable, topic[2]
        uint256 value           // not searchable, in data
    );
    
    function setValue(uint256 id, uint256 value) public {
        emit ValueSet(id, msg.sender, value);
    }
}
```

## Topic Filters

Filter logs by topic patterns using `eth_getLogs` or filter methods.

### Filter Syntax

```json
{
  "topics": [
    "0x...",          // topic[0] must match
    ["0x...", "0x..."], // topic[1] must match ANY
    null              // topic[2] can be anything
  ]
}
```

### Matching Rules

| Filter | Matches |
|--------|---------|
| `[]` | All logs |
| `[A]` | topic[0] = A |
| `[A, B]` | topic[0] = A AND topic[1] = B |
| `[[A, B]]` | topic[0] = A OR topic[0] = B |
| `[null, B]` | Any topic[0], topic[1] = B |

### Example Filter

Get all `Transfer` events to a specific address:

```json
{
  "fromBlock": "0x0",
  "toBlock": "latest",
  "topics": [
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    null,
    "0x000000000000000000000000YOUR_ADDRESS_HERE"
  ]
}
```

## Accessing Logs

### Using eth_getLogs

Query logs directly:

```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"eth_getLogs",
  "params":[{
    "fromBlock": "0x0",
    "toBlock": "latest",
    "address": "0xContractAddress",
    "topics": ["0xEventSignatureHash"]
  }],
  "id":1
}' http://localhost:8545
```

### Using Filters

Create a filter and poll for changes:

**1. Create filter:**
```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"eth_newFilter",
  "params":[{
    "fromBlock": "latest",
    "toBlock": "latest",
    "topics": []
  }],
  "id":1
}' http://localhost:8545
```

Returns: `{"result": "0x1"}` (filter ID)

**2. Poll for changes:**
```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"eth_getFilterChanges",
  "params":["0x1"],
  "id":1
}' http://localhost:8545
```

**3. Uninstall when done:**
```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"eth_uninstallFilter",
  "params":["0x1"],
  "id":1
}' http://localhost:8545
```

### Using WebSocket Subscriptions

Subscribe to logs in real-time:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscribe",
  "params": ["logs", {
    "address": "0xContractAddress",
    "topics": ["0xEventSignatureHash"]
  }],
  "id": 1
}
```

## Use Cases

| Use Case | Implementation |
|----------|----------------|
| Track token transfers | Filter by Transfer event signature |
| Monitor specific contract | Filter by contract address |
| Follow user activity | Filter by indexed address parameter |
| Build event history | Query eth_getLogs with block range |

## Further Reading

- [API Reference](../api/) — Full JSON-RPC documentation.
- [RPC Pub/Sub](../api/rpc-pubsub) — Real-time subscriptions.
- [Transaction Validation](../transactions/validation) — How events are generated.
