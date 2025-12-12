---
sidebar_position: 2
---

# Data Storage Formats

KalyChain offers two formats for storing blockchain state: **Forest of Tries** and **Bonsai Tries**. Each has different performance characteristics and storage requirements.

## Overview

The world state is a mapping of all accounts and their storage. How this data is organized affects:

- **Storage size** — Disk space requirements
- **Read performance** — Speed of data access
- **Write performance** — Speed of state updates
- **Sync time** — Initial synchronization duration

## Forest of Tries

**Forest of Tries** (forest mode) is the traditional storage format.

### How It Works

- Each trie node is stored by its **hash** in a key-value store.
- For each block, new nodes are added for changed state.
- Old nodes remain in storage (no automatic cleanup).
- Data is accessed by traversing the trie structure.

```
Block N State Root
        │
    ┌───┴───┐
    ▼       ▼
  Branch  Branch
    │       │
    ▼       ▼
  Leaf    Leaf
```

### Characteristics

| Aspect | Forest Mode |
|--------|-------------|
| Storage Growth | Linear with chain growth |
| Read Speed | Moderate (hash-based lookup) |
| Historical Access | All history available |
| Pruning | Optional, reduces size |

### Pruning

Enable pruning to remove unreachable state trie nodes:

```bash
kaly --pruning-enabled
```

:::note
Pruning is being deprecated in favor of Bonsai Tries and may not receive updates.
:::

## Bonsai Tries

**Bonsai Tries** is a newer storage format designed for efficiency.

### How It Works

- Leaf values stored in a **trie log**, separate from branches.
- Nodes stored by **location**, not hash.
- Account data accessed directly via account key.
- Orphaned nodes automatically pruned.

```
Account Key → Direct Lookup → Leaf Value
                   │
           Trie Log (history)
```

### Configuration

Enable Bonsai mode:

```bash
kaly --data-storage-format=BONSAI
```

### Characteristics

| Aspect | Bonsai Mode |
|--------|-------------|
| Storage Size | Significantly smaller |
| Read Speed | Fast (direct key access) |
| Historical Access | Limited (configurable) |
| Pruning | Automatic |

### Historical Data Limits

Bonsai limits how far back it can reconstruct historical state:

```bash
kaly --bonsai-maximum-back-layers-to-load=512
```

| Setting | Effect |
|---------|--------|
| Default (512) | ~17 minutes of history at 2s blocks |
| Higher values | More history, slower performance |
| Lower values | Less history, faster performance |

:::warning Resource Usage
Accessing very old state in Bonsai mode becomes increasingly resource-intensive. Set appropriate limits for your use case.
:::

## Comparison

| Feature | Forest | Bonsai |
|---------|--------|--------|
| **Disk Usage** | High | Low |
| **Recent State Read** | Moderate | Fast |
| **Historical State Read** | Consistent | Degrades with age |
| **Memory Usage** | Higher | Lower |
| **Automatic Pruning** | No | Yes |
| **Good For** | Full archives | Most use cases |

## Choosing a Format

### Use Bonsai When:

- Running a validator or RPC node
- Disk space is limited
- Mostly accessing recent state
- Performance is a priority

### Use Forest When:

- Running an archive node
- Need full historical state access
- Running analytics on historical data
- Debugging historical transactions

## Migration

:::warning
Switching storage formats requires a full resync. There is no in-place migration.
:::

To switch formats:

1. Stop the node.
2. Delete (or move) the data directory.
3. Start with the new format option.
4. Wait for full synchronization.

## Client Configuration

### Bonsai Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `--data-storage-format=BONSAI` | Enable Bonsai mode | FOREST |
| `--bonsai-maximum-back-layers-to-load` | Historical depth | 512 |

### Forest Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `--data-storage-format=FOREST` | Enable Forest mode | FOREST |
| `--pruning-enabled` | Enable state pruning | false |

## Further Reading

- [Backup and Restore](./backup) — Data protection procedures.
- [Quick Start](../quick-start/) — Node configuration.
- [Hyperledger Besu Data Storage](https://besu.hyperledger.org/public-networks/concepts/data-storage-formats) — Detailed storage documentation.
