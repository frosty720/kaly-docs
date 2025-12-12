---
sidebar_position: 1
---

# KalyChain Network

**KalyChain** is a high-performance, enterprise-grade blockchain built on [Hyperledger Besu](https://besu.hyperledger.org/) that combines the power of Ethereum compatibility with the security and speed of Proof of Authority (PoA) consensus.

## Overview

KalyChain provides a robust platform for decentralized finance (DeFi) and enterprise applications, offering:

- **Full EVM Compatibility** — Deploy existing Ethereum smart contracts without modification using standard tools like MetaMask, Remix, Hardhat, Foundry, and Truffle.
- **High Performance** — Fast block times (2 seconds) with immediate finality through QBFT consensus.
- **Low Transaction Costs** — Near-zero gas fees compared to Ethereum mainnet.
- **Enterprise-Grade Security** — Battle-tested Proof of Authority consensus with a vetted validator set.

## Architecture

KalyChain is powered by a customized implementation of Hyperledger Besu, an enterprise-grade Ethereum client. The network uses **QBFT (Quorum Byzantine Fault Tolerant)** consensus, which provides:

- **Immediate Finality** — Blocks are final once added to the chain; no reorganizations or forks.
- **Byzantine Fault Tolerance** — The network tolerates up to one-third of validators being faulty or malicious.
- **Deterministic Block Production** — Validators take turns proposing blocks, ensuring predictable performance.

:::info Based on Hyperledger Besu
KalyChain inherits all the enterprise features of Besu, including comprehensive JSON-RPC APIs, GraphQL support, monitoring capabilities, and robust data storage options.
:::

## Network Information

### Mainnet

| Parameter | Value |
|-----------|-------|
| **Network Name** | KalyChain Mainnet |
| **RPC URL** | `https://rpc.kalychain.io/rpc` |
| **Chain ID** | `3888` |
| **Currency Symbol** | `KLC` |
| **Block Time** | ~2 seconds |
| **Block Explorer** | [kalyscan.io](https://kalyscan.io) |

### Testnet

| Parameter | Value |
|-----------|-------|
| **Network Name** | KalyChain Testnet |
| **RPC URL** | `https://testnetrpc.kalychain.io/rpc` |
| **Chain ID** | `3889` |
| **Currency Symbol** | `KLC` |
| **Block Explorer** | [testnet.kalyscan.io](https://testnet.kalyscan.io) |

:::tip Getting Started
New to KalyChain? Start with the [Wallet Setup](../getting-started/wallet-setup) guide to connect your wallet.
:::

## What's in This Section

This technical documentation covers running and operating KalyChain nodes:

- **[Quick Start](./quick-start/)** — Installation and running your first node.
- **[Consensus](./consensus/)** — QBFT configuration, validators, and bootnodes.
- **[Transactions](./transactions/)** — Transaction types, pool management, and validation.
- **[Node Operations](./node-operations/)** — Data storage, backup/restore, and monitoring.
- **[API Reference](./api/)** — JSON-RPC, GraphQL, and WebSocket APIs.

## Ecosystem

KalyChain powers a growing ecosystem of decentralized applications:

- **[KUSD](../kusd/overview)** — Native decentralized stablecoin protocol.
- **[KalyBridge](../kalybridge/overview)** — Cross-chain bridge to BSC and other networks.
- **[KalyDAO](../kalydao/overview)** — Governance and community decision-making.
- **[KalySwap](https://kalyswap.io)** — Decentralized exchange and AMM.

## External Resources

- [GitHub](https://github.com/KalyCoinProject) — Source code and repositories
- [Hyperledger Besu Documentation](https://besu.hyperledger.org/) — Underlying client documentation
- [Block Explorer](https://kalyscan.io) — View transactions and blocks
