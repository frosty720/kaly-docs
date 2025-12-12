---
sidebar_position: 3
---

# Validators

This guide covers configuring and managing validators in a KalyChain production network.

## Overview

Validators are nodes authorized to:

- **Propose Blocks** — Create new blocks containing transactions.
- **Vote on Blocks** — Sign proposed blocks to reach consensus.
- **Manage Validator Set** — Vote to add or remove other validators.

## Production Requirements

### Infrastructure

When deploying validators in production:

1. **Generate Node Keys First** — Create the private/public key pair before starting the validator. This ensures the node identity remains consistent.

2. **Use Static IP Addresses**:
   - **Public Networks** — Assign elastic/static IP addresses.
   - **Private Networks** — Specify private IPs during instance creation.

3. **Store Configuration in Version Control** — Track validator configurations, genesis files, and deployment scripts.

### Hardware Requirements

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| CPU | 4 cores | 8+ cores |
| RAM | 8 GB | 16+ GB |
| Storage | 500 GB SSD | 1+ TB NVMe |
| Network | 100 Mbps | 1 Gbps |

### Security Considerations

- Run validators on dedicated machines.
- Use hardware security modules (HSMs) for key storage when possible.
- Implement network firewalls allowing only P2P and essential ports.
- Monitor node health and set up alerting.

## Number of Validators

QBFT tolerates `f = (n-1)/3` faulty validators:

| Total Validators (n) | Faulty Tolerance (f) | Minimum Online |
|---------------------|---------------------|----------------|
| 4 | 1 | 3 |
| 7 | 2 | 5 |
| 10 | 3 | 7 |
| 13 | 4 | 9 |

:::tip Redundancy Planning
Configure enough validators to tolerate:
- Planned maintenance (rolling upgrades)
- Unplanned outages (hardware failures)
- Geographic distribution (regional failures)
:::

## Adding and Removing Validators

### Using Block Header Voting

Existing validators propose and vote on changes:

**Propose adding a validator:**

```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"qbft_proposeValidatorVote",
  "params":["0xNewValidator_Address", true],
  "id":1
}' http://localhost:8545
```

**Propose removing a validator:**

```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"qbft_proposeValidatorVote",
  "params":["0xValidator_Address", false],
  "id":1
}' http://localhost:8545
```

**Check pending votes:**

```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"qbft_getPendingVotes",
  "params":[],
  "id":1
}' http://localhost:8545
```

**Discard your vote:**

```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"qbft_discardValidatorVote",
  "params":["0xValidator_Address"],
  "id":1
}' http://localhost:8545
```

### Vote Requirements

- **To Add**: >50% of current validators must vote `true`.
- **To Remove**: >50% of current validators must vote `false`.
- **Vote Reset**: All votes reset at each epoch (every `epochlength` blocks).

### Using Smart Contracts

For more sophisticated validator management, use a validator contract that implements the required interface. This allows:

- Automated validator rotation
- Staking/slashing mechanisms  
- Governance-based additions

See [QBFT Configuration](./qbft#contract-validator-selection) for contract validator setup.

## Validators as Bootnodes

Validators can also serve as bootnodes with no additional configuration. However:

:::warning
When removing a validator that is also a bootnode, ensure sufficient bootnodes remain on the network for peer discovery.
:::

## Node Key Management

Each validator has a unique node key pair:

### Generate Node Keys

```bash
kaly --data-path=<path> public-key export --to=<keyfile>
```

### Key Files

| File | Description |
|------|-------------|
| `key` | Private key (keep secure!) |
| `key.pub` | Public key |

The **enode URL** format is:
```
enode://<public-key>@<host>:<port>
```

### Key Security

- Never share or expose private keys.
- Back up keys securely (encrypted, offsite).
- Use HSMs for production validators when possible.

## Monitoring Validators

### Signer Metrics

Track block proposal statistics:

```bash
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"qbft_getSignerMetrics",
  "params":[],
  "id":1
}' http://localhost:8545
```

Returns metrics per validator including:
- Proposed block counts
- Last proposed block number

### Health Monitoring

Monitor these metrics:

| Metric | Alert Threshold |
|--------|-----------------|
| Peer count | < 3 peers |
| Block height | > 10 blocks behind |
| Last block time | > 30 seconds ago |
| Memory usage | > 80% |
| Disk usage | > 80% |

## Further Reading

- [Proof of Authority](./) — PoA consensus overview.
- [QBFT Configuration](./qbft) — Detailed consensus setup.
- [Bootnodes](./bootnodes) — Peer discovery configuration.
