---
sidebar_position: 1
---

# API Reference

KalyChain provides comprehensive APIs for interacting with the blockchain. This section covers available access methods and API endpoints.

## Access Methods

KalyChain supports multiple API protocols:

| Protocol | Transport | Use Case |
|----------|-----------|----------|
| [JSON-RPC](./json-rpc) | HTTP, WebSocket, IPC | General blockchain interaction |
| [RPC Pub/Sub](./rpc-pubsub) | WebSocket | Real-time event subscriptions |
| [GraphQL](./graphql) | HTTP | Complex queries, reduced overhead |

## Enabling API Access

Enable APIs using command-line options when starting your node:

```bash
kaly --rpc-http-enabled \
     --rpc-ws-enabled \
     --graphql-http-enabled \
     --rpc-http-host=0.0.0.0 \
     --rpc-http-port=8545
```

### Available Options

| Option | Description | Default |
|--------|-------------|---------|
| `--rpc-http-enabled` | Enable JSON-RPC over HTTP | false |
| `--rpc-ws-enabled` | Enable JSON-RPC over WebSocket | false |
| `--graphql-http-enabled` | Enable GraphQL over HTTP | false |
| `--rpc-http-host` | HTTP API host | 127.0.0.1 |
| `--rpc-ws-host` | WebSocket API host | 127.0.0.1 |
| `--graphql-http-host` | GraphQL API host | 127.0.0.1 |
| `--rpc-http-port` | HTTP API port | 8545 |
| `--rpc-ws-port` | WebSocket API port | 8546 |
| `--graphql-http-port` | GraphQL API port | 8547 |

## Default Ports

| Service | Port |
|---------|------|
| JSON-RPC HTTP | 8545 |
| JSON-RPC WebSocket | 8546 |
| GraphQL HTTP | 8547 |

## Security

### Host Allowlist

By default, KalyChain only accepts connections from `localhost` and `127.0.0.1`. To allow other hosts:

```bash
kaly --host-allowlist=example.com,api.example.com
```

For development only (not recommended for production):

```bash
kaly --host-allowlist="*"
```

### CORS Configuration

Configure Cross-Origin Resource Sharing for browser access:

```bash
kaly --rpc-http-cors-origins="https://app.example.com"
```

### Authentication

For production APIs, enable authentication:

```bash
kaly --rpc-http-authentication-enabled \
     --rpc-http-authentication-credentials-file=auth.toml
```

See [Hyperledger Besu Authentication](https://besu.hyperledger.org/public-networks/how-to/use-besu-api/authenticate) for detailed configuration.

:::warning Remote Access
When exposing APIs remotely, always:
- Use a firewall to restrict access
- Enable authentication
- Use HTTPS via a reverse proxy
- Set specific host allowlists
:::

## API Method Categories

### Ethereum Standard Methods

| Namespace | Description |
|-----------|-------------|
| `eth_` | Core Ethereum operations |
| `net_` | Network information |
| `web3_` | Client utilities |

### KalyChain Methods

| Namespace | Description |
|-----------|-------------|
| `qbft_` | QBFT consensus operations |
| `txpool_` | Transaction pool queries |
| `admin_` | Node administration |
| `debug_` | Debugging utilities |

## Quick Examples

### Get Block Number

```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"eth_blockNumber",
  "params":[],
  "id":1
}' -H "Content-Type: application/json" http://localhost:8545
```

### Get Balance

```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"eth_getBalance",
  "params":["0xYourAddress", "latest"],
  "id":1
}' -H "Content-Type: application/json" http://localhost:8545
```

### Send Raw Transaction

```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"eth_sendRawTransaction",
  "params":["0xSignedTransactionHex"],
  "id":1
}' -H "Content-Type: application/json" http://localhost:8545
```

## Not Supported

KalyChain (like Besu) does not support:

- **Account Management** — No private key storage. Use `eth_sendRawTransaction` with externally signed transactions.
- **Whisper Protocol** — Peer-to-peer messaging (deprecated).
- **Swarm Protocol** — Distributed storage.

## In This Section

- [JSON-RPC](./json-rpc) — HTTP and WebSocket JSON-RPC.
- [GraphQL](./graphql) — GraphQL queries.
- [RPC Pub/Sub](./rpc-pubsub) — WebSocket subscriptions.

## Further Reading

- [Hyperledger Besu API Reference](https://besu.hyperledger.org/public-networks/reference/api) — Complete method documentation.
- [Events and Logs](../node-operations/events-and-logs) — Working with contract events.
