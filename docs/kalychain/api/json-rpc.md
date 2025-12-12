---
sidebar_position: 2
---

# JSON-RPC API

KalyChain provides a JSON-RPC 2.0 API for blockchain interactions over HTTP, WebSocket, and IPC.

## Overview

JSON-RPC is the primary interface for:

- Querying blockchain state
- Submitting transactions
- Managing node administration
- Accessing consensus information

## Transport Options

### HTTP

Most common for single requests:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  http://localhost:8545
```

Enable with: `--rpc-http-enabled`

### WebSocket

Better for subscriptions and persistent connections:

```javascript
const ws = new WebSocket('ws://localhost:8546');
ws.send(JSON.stringify({
  jsonrpc: "2.0",
  method: "eth_blockNumber",
  params: [],
  id: 1
}));
```

Enable with: `--rpc-ws-enabled`

### IPC

For local communication (lowest latency, highest security):

Enable with: `--Xrpc-ipc-enabled`

Default socket path: `<data-path>/kaly.ipc`

## Request Format

```json
{
  "jsonrpc": "2.0",
  "method": "method_name",
  "params": [],
  "id": 1
}
```

| Field | Description |
|-------|-------------|
| `jsonrpc` | Always "2.0" |
| `method` | API method name |
| `params` | Method parameters (array or object) |
| `id` | Request identifier (returned in response) |

## Response Format

### Success

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x10"
}
```

### Error

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32602,
    "message": "Invalid params"
  }
}
```

## Common Methods

### Block Queries

| Method | Description |
|--------|-------------|
| `eth_blockNumber` | Current block number |
| `eth_getBlockByNumber` | Block by number |
| `eth_getBlockByHash` | Block by hash |

### Account Queries

| Method | Description |
|--------|-------------|
| `eth_getBalance` | Account balance |
| `eth_getTransactionCount` | Account nonce |
| `eth_getCode` | Contract code |

### Transaction Operations

| Method | Description |
|--------|-------------|
| `eth_sendRawTransaction` | Submit signed transaction |
| `eth_getTransactionByHash` | Transaction by hash |
| `eth_getTransactionReceipt` | Transaction receipt |

### QBFT Methods

| Method | Description |
|--------|-------------|
| `qbft_getValidatorsByBlockNumber` | Validators at block |
| `qbft_proposeValidatorVote` | Vote on validator |
| `qbft_getPendingVotes` | Pending votes |
| `qbft_getSignerMetrics` | Validator metrics |

## Block Parameters

Many methods accept a block parameter:

| Value | Description |
|-------|-------------|
| `"latest"` | Most recent block |
| `"earliest"` | Genesis block |
| `"pending"` | Pending state |
| `"finalized"` | Latest finalized block |
| `"safe"` | Latest safe block |
| `"0x..."` | Specific block number (hex) |

Example:

```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"eth_getBalance",
  "params":["0xAddress", "latest"],
  "id":1
}' http://localhost:8545
```

## Readiness and Liveness

Check node health:

### Liveness

```bash
curl http://localhost:8545/liveness
```

Returns `200 OK` if the node is running.

### Readiness

```bash
curl http://localhost:8545/readiness
```

Returns `200 OK` if the node is synced and ready to accept requests.

## API Methods Enabled by Default

Not all methods are enabled by default. Use `--rpc-http-api` and `--rpc-ws-api` to specify:

```bash
kaly --rpc-http-enabled \
     --rpc-http-api=ETH,NET,WEB3,QBFT
```

### Available APIs

| API | Description |
|-----|-------------|
| `ETH` | Ethereum methods |
| `NET` | Network methods |
| `WEB3` | Utility methods |
| `ADMIN` | Node administration |
| `DEBUG` | Debugging methods |
| `TXPOOL` | Transaction pool |
| `QBFT` | QBFT consensus |

## Batch Requests

Send multiple requests in one HTTP call:

```bash
curl -X POST --data '[
  {"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1},
  {"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":2}
]' http://localhost:8545
```

Response:

```json
[
  {"jsonrpc":"2.0","id":1,"result":"0x100"},
  {"jsonrpc":"2.0","id":2,"result":"0xf30"}
]
```

## Using Geth Console

Connect using Geth's JavaScript console:

```bash
geth attach http://localhost:8545
```

Then use JavaScript:

```javascript
> eth.blockNumber
256
> eth.getBalance("0xAddress")
"1000000000000000000"
```

## Error Codes

| Code | Meaning |
|------|---------|
| -32700 | Parse error |
| -32600 | Invalid request |
| -32601 | Method not found |
| -32602 | Invalid params |
| -32603 | Internal error |

## Further Reading

- [API Overview](./) — Enabling and securing APIs.
- [GraphQL](./graphql) — Alternative query method.
- [RPC Pub/Sub](./rpc-pubsub) — Real-time subscriptions.
- [Hyperledger Besu JSON-RPC](https://besu.hyperledger.org/public-networks/reference/api) — Complete reference.
