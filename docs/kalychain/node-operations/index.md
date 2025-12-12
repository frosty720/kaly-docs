---
sidebar_position: 1
---

# Node Operations

This section covers operational topics for running and maintaining KalyChain nodes, including data storage, backup/restore procedures, and monitoring.

## Overview

Running a reliable KalyChain node requires understanding:

- **Data Storage** — How blockchain data is stored and accessed.
- **Backup & Restore** — Protecting against data loss.
- **Events & Logs** — Monitoring contract events and system logs.
- **Performance Tuning** — Optimizing node performance.

## Node Types

Different node roles have different operational requirements:

| Role | Description | Storage | Sync Time |
|------|-------------|---------|-----------|
| **Full Node** | Validates and stores recent state | ~100 GB | Hours |
| **Archive Node** | Stores complete historical state | ~1 TB+ | Days |
| **Validator** | Participates in consensus | ~100 GB | Hours |
| **Light Node** | Minimal storage, relies on full nodes | ~1 GB | Minutes |

## Key Directories

Know where your node stores critical data:

| Directory | Contents |
|-----------|----------|
| `data-path/` | Root data directory |
| `data-path/database/` | Blockchain database |
| `data-path/key` | Node private key |
| `data-path/key.pub` | Node public key |

## Quick Maintenance Tasks

### Check Node Status

```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"eth_syncing",
  "params":[],
  "id":1
}' http://localhost:8545
```

### Get Peer Count

```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"net_peerCount",
  "params":[],
  "id":1
}' http://localhost:8545
```

### Get Node Info

```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"admin_nodeInfo",
  "params":[],
  "id":1
}' http://localhost:8545
```

## In This Section

- **[Data Storage Formats](./data-storage-formats)** — Forest vs Bonsai storage modes.
- **[Events and Logs](./events-and-logs)** — Smart contract events and filtering.
- **[Backup and Restore](./backup)** — Data protection procedures.

## Further Reading

- [Quick Start](../quick-start/) — Node installation and startup.
- [API Reference](../api/) — Complete API documentation.
- [Hyperledger Besu Operations](https://besu.hyperledger.org/private-networks/how-to/) — Advanced operational guides.
