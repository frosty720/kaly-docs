---
sidebar_position: 2
---

# Transaction Pool

The transaction pool (also called mempool) stores pending transactions before they're included in blocks.

## Overview

When you submit a transaction, it enters the transaction pool where it waits for a validator to include it in a block. The pool manages transaction ordering, replacement, and eviction.

## Pool Configuration

Configure the transaction pool using command-line options:

| Option | Description | Default |
|--------|-------------|---------|
| `--tx-pool-max-size` | Maximum transactions in pool | 4096 |
| `--tx-pool-price-bump` | Price increase % for replacement | 10 |
| `--tx-pool-retention-hours` | Hours before eviction | 13 |

Example:

```bash
kaly --tx-pool-max-size=8192 \
     --tx-pool-price-bump=15 \
     --tx-pool-retention-hours=24
```

## Monitoring the Pool

### List Pending Transactions

```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"txpool_kalyTransactions",
  "params":[],
  "id":1
}' http://localhost:8545
```

### Subscribe to Pool Changes

Using WebSocket RPC Pub/Sub:

**New pending transactions:**
```json
{"jsonrpc":"2.0","method":"eth_subscribe","params":["newPendingTransactions"],"id":1}
```

**Dropped transactions:**
```json
{"jsonrpc":"2.0","method":"eth_subscribe","params":["droppedPendingTransactions"],"id":1}
```

## Transaction Priority

Transactions are prioritized by:

1. **Gas Price** — Higher gas price = higher priority.
2. **Nonce** — Lower nonce transactions from same account execute first.
3. **Arrival Time** — Earlier submission has priority (at same gas price).

## Replacing Transactions

You can replace a pending transaction by submitting a new transaction with:
- **Same sender address**
- **Same nonce**
- **Higher gas price** (by at least `tx-pool-price-bump` percentage)

### Legacy Transactions

For legacy transactions, the new gas price must be higher than:

```
old_gas_price × (1 + price_bump/100)
```

With default 10% bump, a transaction with 10 gwei gas price requires at least 11 gwei to replace.

### EIP-1559 Transactions

For EIP-1559 transactions, replacement requires one of:

1. **Effective gas price** higher by `price_bump` percentage AND **priority fee** ≥ existing priority fee.

2. **Effective gas price** equal AND **priority fee** higher by `price_bump` percentage.

## Pool Overflow Behavior

When the pool reaches `tx-pool-max-size`:

### Priority: Local vs Remote

The pool prefers **local transactions** (submitted directly to this node) over **remote transactions** (received from peers):

1. Remote transactions are dropped first.
2. If full of local transactions, oldest local transactions are dropped.

### Practical Implications

- Validators should accept transactions directly when possible.
- Very low gas price transactions may be dropped during congestion.
- Monitor pool size during high-traffic periods.

## Pool Size Tuning

### Memory Considerations

Larger pools use more memory:
- Each transaction: ~1-2 KB
- Pool of 4096: ~4-8 MB
- Pool of 16384: ~16-32 MB

### Recommendations

| Scenario | Pool Size | Notes |
|----------|-----------|-------|
| Validator | 8192+ | Capture more transaction fees |
| RPC Node | 4096 | Default is usually sufficient |
| Archive Node | 4096 | Pool size doesn't affect historical data |

## Transaction Eviction

Transactions are removed from the pool when:

1. **Included in a block** — Transaction confirmed.
2. **Replaced** — Higher gas price replacement submitted.
3. **Timeout** — Exceeds `tx-pool-retention-hours`.
4. **Invalid** — Nonce becomes stale, insufficient balance, etc.
5. **Pool full** — Lower priority transactions evicted.

## Troubleshooting

### Transaction Stuck in Pool

1. Check nonce sequence — ensure no gaps.
2. Verify sufficient balance for gas.
3. Consider submitting replacement with higher gas price.

### Transaction Not Appearing

1. Verify transaction hash is correct.
2. Check if evicted due to low gas price.
3. Confirm node is synced to network.

### High Pool Size

1. Monitor network congestion.
2. Consider increasing `tx-pool-max-size`.
3. Check for abnormal transaction patterns.

## Further Reading

- [Transaction Types](./types) — Different transaction formats.
- [Transaction Validation](./validation) — How transactions are validated.
- [RPC Pub/Sub](../api/rpc-pubsub) — Subscribe to pool events.
