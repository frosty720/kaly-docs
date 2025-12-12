---
sidebar_position: 1
---

# Quick Start

Get up and running with a KalyChain node quickly. This section covers installation, configuration, and launching your first node.

## Overview

Running a KalyChain node allows you to:

- **Validate Transactions** — Participate in network consensus (if approved as a validator).
- **Access the Network Directly** — Query blockchain data without relying on third-party RPC providers.
- **Deploy and Test Smart Contracts** — Run a local development environment.
- **Support the Network** — Contribute to network decentralization and resilience.

## Prerequisites

Before installing KalyChain, ensure you have:

- **Java 17+** — KalyChain is built on Hyperledger Besu which requires Java 17 or higher.
  - Download from [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or use OpenJDK.
  - Verify installation: `java --version`

- **Sufficient Resources**:
  - **CPU**: 4+ cores recommended for validators
  - **RAM**: 8GB minimum, 16GB recommended
  - **Storage**: SSD with 500GB+ for full sync
  - **Network**: Stable internet connection

## Installation

### Download Binary Distribution

1. Download the latest release from [KalyChain Releases](https://github.com/Kaly-Chain/kalychain/releases):

```bash
wget https://github.com/Kaly-Chain/kalychain/releases/download/v<version>/kaly-<version>.tar.gz
```

2. Extract the archive and navigate to the directory:

```bash
tar -xzf kaly-<version>.tar.gz
cd kaly-<version>
```

3. Verify the installation:

```bash
bin/kaly --help
```

You should see the KalyChain command-line options displayed.

### Build from Source

For the latest development features or custom modifications, you can build from source. Refer to the [KalyChain GitHub repository](https://github.com/Kaly-Chain/kalychain) for build instructions.

## Starting a Node

### Connect to Mainnet

To run a node connected to KalyChain mainnet:

```bash
kaly --genesis-file=<path>/genesis.json \
     --data-path=<data-directory> \
     --rpc-http-enabled \
     --bootnodes=<bootnode-enode-urls>
```

### Connect to Testnet

For development and testing, connect to the testnet:

```bash
kaly --genesis-file=<path>/testnet-genesis.json \
     --data-path=<testnet-data-directory> \
     --rpc-http-enabled \
     --bootnodes=<testnet-bootnode-enode-urls>
```

### Run a Development Node

For local testing with mining enabled:

```bash
kaly --network=dev \
     --miner-enabled \
     --miner-coinbase=0xfe3b557e8fb62b89f4916b721be55ceb828dbd73 \
     --rpc-http-enabled \
     --rpc-ws-enabled \
     --rpc-http-cors-origins="all" \
     --host-allowlist="*" \
     --data-path=/tmp/kaly-dev
```

:::warning Development Mode Only
The `--network=dev` option and permissive CORS/host settings shown above are for development only. Never use these settings in production.
:::

### Using a Configuration File

Instead of command-line arguments, you can use a TOML configuration file:

```toml title="config.toml"
network="dev"
miner-enabled=true
miner-coinbase="0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"
rpc-http-cors-origins=["all"]
host-allowlist=["*"]
rpc-ws-enabled=true
rpc-http-enabled=true
data-path="/var/kaly/data"
```

Start the node with:

```bash
kaly --config-file=config.toml
```

## Verify Node is Running

After starting your node with `--rpc-http-enabled`, verify it's running using cURL:

### Check Chain ID

```bash
curl -X POST \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' \
  -H "Content-Type: application/json" \
  http://localhost:8545
```

Expected response for mainnet:

```json
{"jsonrpc":"2.0","id":1,"result":"0xf30"}
```

The result `0xf30` is the hexadecimal representation of Chain ID `3888`.

### Check Sync Status

```bash
curl -X POST \
  --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' \
  -H "Content-Type: application/json" \
  http://localhost:8545
```

While syncing, you'll see the starting, current, and highest blocks:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x2d0",
    "highestBlock": "0x66c0"
  }
}
```

When fully synced, the result will be `false`.

## Local Block Data

When switching networks or encountering sync issues, you may need to clear local block data:

```bash
# Stop the node first
# Then delete the database directory
rm -rf <data-path>/database

# Restart the node
```

Alternatively, specify a different `--data-path` for each network.

## Next Steps

- [Genesis File](./genesis-file) — Understand the network configuration.
- [Consensus Configuration](../consensus/) — Learn about QBFT and validators.
- [API Access](../api/) — Enable and use the JSON-RPC API.
