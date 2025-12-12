---
sidebar_position: 2
---

# QBFT Configuration

This guide covers the detailed configuration of QBFT (Quorum Byzantine Fault Tolerant) consensus for KalyChain nodes.

## Genesis File Configuration

QBFT consensus is configured in the `config.qbft` section of the genesis file:

```json
{
  "config": {
    "chainId": 3888,
    "qbft": {
      "blockperiodseconds": 2,
      "epochlength": 28800,
      "requesttimeoutseconds": 4,
      "blockreward": "0",
      "miningbeneficiary": "0x4E848893aA90EAF694a019C300b7E2EA2cA6a999"
    }
  }
}
```

## Configuration Parameters

### Core Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `blockperiodseconds` | Integer | Minimum seconds between blocks | 2 |
| `epochlength` | Integer | Blocks between validator vote resets | 30000 |
| `requesttimeoutseconds` | Integer | Timeout before round change | 4 |

### Reward Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `blockreward` | String | Wei reward per block (hex or decimal) |
| `miningbeneficiary` | Address | Recipient of block rewards |

### Validator Contract Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `validatorcontractaddress` | Address | Contract managing validators |

## Block Time Behavior

The relationship between `blockperiodseconds` and `requesttimeoutseconds` determines block production timing:

1. **New Chain Head** → Block time timer (`blockperiodseconds`) starts.
2. **Timer Expires** → Round timeout timer (`requesttimeoutseconds`) starts; block is proposed.
3. **Block Added** → New round starts, timers reset.
4. **Block Not Added Before Timeout** → Round change occurs with doubled timeout.

```
Block N received → Wait blockperiodseconds → Propose Block N+1
                                                    ↓
                  If not added within requesttimeoutseconds
                                                    ↓
                        Round change, timeout doubles
```

:::tip Optimal Configuration
Keep `requesttimeoutseconds` greater than `blockperiodseconds` to allow sufficient time for block proposal and voting. A ratio of 2:1 or higher works well.
:::

## Extra Data

The `extraData` field in the genesis block contains RLP-encoded validator information:

### Structure

For **block header validator selection**:
```
RLP([32 bytes Vanity, List<Validators>, No Vote, Round=0, 0 Seals])
```

For **contract validator selection**:
```
RLP([32 bytes Vanity, 0 Validators, No Vote, Round=0, 0 Seals])
```

### Components

| Component | Description |
|-----------|-------------|
| Vanity | 32 bytes of arbitrary data |
| Validators | Initial validator addresses (block header selection only) |
| Vote | Validator vote (empty in genesis) |
| Round | Block creation round (0 in genesis) |
| Seals | Validator signatures (empty in genesis) |

:::info RLP Encoding
RLP (Recursive Length Prefix) is a space-efficient serialization scheme used in Ethereum. Use tools like the `rlp` CLI or web-based encoders to generate extra data.
:::

## Add and Remove Validators

QBFT supports two methods for managing validators:

### Block Header Validator Selection

Validators vote using JSON-RPC API methods:

```bash
# Propose adding a validator
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"qbft_proposeValidatorVote",
  "params":["0xValidator_Address", true],
  "id":1
}' http://localhost:8545

# Propose removing a validator
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"qbft_proposeValidatorVote",
  "params":["0xValidator_Address", false],
  "id":1
}' http://localhost:8545
```

A validator is added/removed when >50% of existing validators vote for the change.

### Contract Validator Selection

Use a smart contract to manage validators. Configure in genesis:

```json
{
  "config": {
    "qbft": {
      "validatorcontractaddress": "0x0000000000000000000000000000000000001000"
    }
  },
  "alloc": {
    "0x0000000000000000000000000000000000001000": {
      "balance": "0",
      "code": "0x...",
      "storage": {
        "0x0": "0x..."
      }
    }
  }
}
```

### Minimum Validators

QBFT requires a minimum of 4 validators for Byzantine fault tolerance. The network tolerates `f = (n-1)/3` faulty validators where `n` is the total number.

| Validators | Faulty Tolerance |
|------------|------------------|
| 4 | 1 |
| 7 | 2 |
| 10 | 3 |

## Transitions

Modify consensus parameters at specific block heights using the `transitions` configuration:

### Change Block Rewards

```json
{
  "transitions": {
    "qbft": [
      {
        "block": 1000000,
        "blockreward": "0"
      }
    ]
  }
}
```

### Change Block Time

```json
{
  "transitions": {
    "qbft": [
      {
        "block": 1000000,
        "blockperiodseconds": 1
      }
    ]
  }
}
```

### Change Mining Beneficiary

```json
{
  "transitions": {
    "qbft": [
      {
        "block": 1000000,
        "miningbeneficiary": "0xNewBeneficiaryAddress"
      }
    ]
  }
}
```

### Swap Validator Management Methods

Switch from block header to contract validation (or vice versa):

```json
{
  "transitions": {
    "qbft": [
      {
        "block": 2000000,
        "validatorselectionmode": "contract",
        "validatorcontractaddress": "0x..."
      }
    ]
  }
}
```

:::warning Coordinate Network Upgrades
All validators must upgrade simultaneously when using transitions. Coordinate carefully to avoid network splits.
:::

## QBFT API Methods

| Method | Description |
|--------|-------------|
| `qbft_proposeValidatorVote` | Propose adding/removing a validator |
| `qbft_discardValidatorVote` | Discard your pending vote |
| `qbft_getPendingVotes` | Get pending validator votes |
| `qbft_getValidatorsByBlockNumber` | Get validators at a block number |
| `qbft_getValidatorsByBlockHash` | Get validators at a block hash |
| `qbft_getSignerMetrics` | Get block proposal metrics |

## Further Reading

- [Proof of Authority](./) — PoA consensus overview.
- [Validators](./validators) — Validator configuration in production.
- [Hyperledger Besu QBFT Reference](https://besu.hyperledger.org/private-networks/how-to/configure/consensus/qbft) — Complete documentation.
