---
sidebar_position: 1
---

# Proof of Authority Consensus

KalyChain uses **Proof of Authority (PoA)** consensus, specifically the **QBFT (Quorum Byzantine Fault Tolerant)** protocol. This pages provides an overview of PoA and why it's ideal for enterprise and consortium blockchains.

## What is Proof of Authority?

In Proof of Authority consensus, a set of approved accounts called **validators** are responsible for validating transactions and proposing new blocks. Unlike Proof of Work (PoW) or Proof of Stake (PoS), PoA relies on the identity and reputation of validators rather than computational power or economic stake.

### When to Use PoA

PoA is ideal for networks where:

- Participants are known and trusted to some degree.
- High transaction throughput and low latency are required.
- Energy efficiency is important.
- Immediate transaction finality is needed.

## QBFT Overview

KalyChain implements **QBFT**, a Byzantine Fault Tolerant (BFT) consensus protocol derived from PBFT (Practical Byzantine Fault Tolerance) and IBFT (Istanbul Byzantine Fault Tolerance). QBFT is the recommended enterprise-grade consensus for Hyperledger Besu networks.

### How QBFT Works

1. **Validator Selection** — A set of known validators participate in consensus.
2. **Block Proposal** — Validators take turns proposing new blocks in a round-robin fashion.
3. **Voting** — Other validators vote on the proposed block.
4. **Supermajority Consensus** — A block is committed when ⅔+ majority (at least `2f + 1` validators where `f` is the number of faulty nodes) sign the block.
5. **Immediate Finality** — Once committed, the block is final—no forks or reorganizations.

### Key Properties

| Property | Description |
|----------|-------------|
| **Immediate Finality** | Blocks are final once added; no chain reorganizations. |
| **Byzantine Fault Tolerance** | Tolerates up to ⅓ of validators being faulty or malicious. |
| **Deterministic Block Production** | Validators take turns in a predictable manner. |
| **Fast Block Times** | Configurable block periods (2 seconds on KalyChain mainnet). |

## Validator Requirements

### Minimum Validators

QBFT requires a minimum of **4 validators** to be Byzantine fault tolerant:

| Validators | Faulty Tolerance | Notes |
|------------|------------------|-------|
| 4–5 | 1 faulty node | Minimum for production |
| 6–8 | 2 faulty nodes | Improved resilience |
| 9–11 | 3 faulty nodes | Recommended for public networks |

:::warning
Networks with 3 or fewer validators can produce blocks but **do not guarantee finality** in adversarial environments. This configuration is only suitable for development and testing.
:::

### Liveness Requirements

QBFT requires **at least ⅔ of validators** to be online and responsive to produce blocks:

| Validators | Minimum Online |
|------------|----------------|
| 4 | 3 |
| 7 | 5 |
| 10 | 7 |

If fewer than ⅔ of validators are online, block production halts until sufficient validators rejoin.

## Validator Management

Validators can be added or removed from the network through:

1. **Block Header Voting** — Existing validators vote to add/remove validators using JSON-RPC API methods.
2. **Smart Contract** — A validator management contract controls the validator set.

See [Validators](./validators) for detailed configuration.

## Speed Considerations

QBFT block production time is affected by:

- **Block Period** — Minimum time between blocks (configurable, default 2 seconds).
- **Network Latency** — Geographic distribution of validators affects voting rounds.
- **Validator Count** — More validators increases voting overhead slightly.

With well-connected validators, the time from block proposal to finalization is typically around 1 second, even with globally distributed validators.

## Comparison with Other Consensus Mechanisms

| Feature | QBFT (PoA) | PoW | PoS |
|---------|------------|-----|-----|
| Finality | Immediate | Probabilistic | Varies |
| Energy Use | Minimal | High | Low |
| Throughput | High | Low | Medium |
| Validators | Known, permissioned | Anonymous miners | Token stakers |
| Fault Tolerance | Byzantine (⅓) | 51% attack | Varies |

## Further Reading

- [QBFT Configuration](./qbft) — Detailed consensus configuration.
- [Validators](./validators) — Managing the validator set.
- [Bootnodes](./bootnodes) — Peer discovery configuration.
- [Hyperledger Besu QBFT Documentation](https://besu.hyperledger.org/private-networks/how-to/configure/consensus/qbft) — Complete reference.
