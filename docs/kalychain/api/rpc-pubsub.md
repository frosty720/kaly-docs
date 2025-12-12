---
sidebar_position: 4
---

# RPC Pub/Sub

RPC Pub/Sub provides real-time notifications for blockchain events over WebSocket connections.

## Overview

Instead of polling for updates, subscribe to events and receive notifications when they occur:

- **New block headers** — Get notified of each new block.
- **Log events** — Receive contract events as they happen.
- **Pending transactions** — Monitor incoming transactions.
- **Synchronization status** — Track sync progress.

## Enabling Pub/Sub

Enable WebSocket RPC:

```bash
kaly --rpc-ws-enabled \
     --rpc-ws-host=0.0.0.0 \
     --rpc-ws-port=8546
```

## Connection

Connect via WebSocket:

```javascript
const ws = new WebSocket('ws://localhost:8546');

ws.onmessage = (event) => {
  console.log(JSON.parse(event.data));
};
```

## Subscriptions

### Subscribe

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscribe",
  "params": ["subscriptionType", options],
  "id": 1
}
```

Response includes a subscription ID:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x1"
}
```

### Unsubscribe

```json
{
  "jsonrpc": "2.0",
  "method": "eth_unsubscribe",
  "params": ["0x1"],
  "id": 2
}
```

### Notification Format

All notifications use this format:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "subscription": "0x1",
    "result": { /* event data */ }
  }
}
```

## Subscription Types

### New Headers

Subscribe to new block headers:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscribe",
  "params": ["newHeads"],
  "id": 1
}
```

Notification:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "subscription": "0x1",
    "result": {
      "number": "0x100",
      "hash": "0x...",
      "parentHash": "0x...",
      "timestamp": "0x5e8d3f00",
      "gasLimit": "0x1c9c380",
      "gasUsed": "0x5208",
      "miner": "0x..."
    }
  }
}
```

### Logs

Subscribe to contract events:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscribe",
  "params": [
    "logs",
    {
      "address": "0xContractAddress",
      "topics": ["0xEventSignature"]
    }
  ],
  "id": 1
}
```

Filter options:

| Option | Description |
|--------|-------------|
| `address` | Contract address(es) |
| `topics` | Event topic filters |

Notification:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "subscription": "0x2",
    "result": {
      "address": "0x...",
      "topics": ["0x..."],
      "data": "0x...",
      "blockNumber": "0x100",
      "transactionHash": "0x..."
    }
  }
}
```

### Pending Transactions

Subscribe to new pending transactions:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscribe",
  "params": ["newPendingTransactions"],
  "id": 1
}
```

Notification includes transaction hash only:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "subscription": "0x3",
    "result": "0xTransactionHash"
  }
}
```

### Dropped Transactions

Subscribe to transactions dropped from the pool:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscribe",
  "params": ["droppedPendingTransactions"],
  "id": 1
}
```

### Sync Status

Subscribe to synchronization status changes:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscribe",
  "params": ["syncing"],
  "id": 1
}
```

When syncing starts:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "subscription": "0x4",
    "result": {
      "startingBlock": "0x0",
      "currentBlock": "0x100",
      "highestBlock": "0x500"
    }
  }
}
```

When syncing completes:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "subscription": "0x4",
    "result": false
  }
}
```

## JavaScript Example

Complete example using `ethers.js`:

```javascript
const { ethers } = require('ethers');

const provider = new ethers.providers.WebSocketProvider(
  'ws://localhost:8546'
);

// Subscribe to new blocks
provider.on('block', (blockNumber) => {
  console.log('New block:', blockNumber);
});

// Subscribe to contract events
const contract = new ethers.Contract(
  '0xContractAddress',
  abi,
  provider
);

contract.on('Transfer', (from, to, value) => {
  console.log(`Transfer: ${from} -> ${to}: ${value}`);
});
```

## Error Handling

Handle WebSocket disconnections:

```javascript
ws.onclose = () => {
  console.log('Connection closed, reconnecting...');
  setTimeout(connect, 5000);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};
```

## Best Practices

1. **Reconnect Logic** — Implement automatic reconnection.
2. **Subscription Management** — Track and clean up subscriptions.
3. **Error Handling** — Handle network failures gracefully.
4. **Rate Limiting** — Be aware of high-volume subscriptions.
5. **Connection Pooling** — Reuse connections when possible.

## Further Reading

- [API Overview](./) — Enabling and securing APIs.
- [Events and Logs](../node-operations/events-and-logs) — Understanding log topics.
- [JSON-RPC](./json-rpc) — Standard RPC methods.
