---
sidebar_position: 2
---

# Genesis File

The genesis file defines the initial state and configuration of a blockchain network. It's the starting point for all nodes and must be identical across the network.

## Overview

Every KalyChain node requires access to the genesis file to:

- Initialize the blockchain with the correct chain ID and configuration.
- Configure the consensus mechanism (QBFT) parameters.
- Set initial account balances and contract deployments.
- Ensure compatibility with other nodes on the network.

:::important Store Under Version Control
We recommend storing the genesis file in source control to ensure all nodes use the identical configuration and to track any network upgrades.
:::

## KalyChain Mainnet Genesis

The official KalyChain mainnet genesis file:

```json
{
  "config" : {
    "chainId" : 3888,
    "homesteadBlock" : 0,
    "eip150Block" : 0,
    "eip155Block" : 0,
    "eip158Block" : 0,
    "byzantiumBlock" : 0,
    "constantinopleBlock" : 0,
    "petersburgBlock" : 0,
    "istanbulBlock" : 0,
    "berlinBlock" : 0,
    "londonBlock" : 0,
    "parisBlock" : 37628629,
    "shanghaiBlock" : 37638629,
    "cancunBlock" : 37648629,
    "pragueBlock" : 37658629,
    "qbft" : {
      "blockperiodseconds" : 2,
      "epochlength" : 28800,
      "requesttimeoutseconds" : 4,
      "blockreward" : "3000000000000000000",
      "baseFeePerGas" : "0x834"
    },
    "transitions" : {
      "qbft" : [ {
        "block" : 9434168,
        "blockreward" : "750000000000000000"
      }, {
        "block" : 13728000,
        "blockreward" : "375000000000000000"
      }, {
        "block" : 18304000,
        "blockreward" : "187500000000000000"
      }, {
        "block" : 22880000,
        "blockreward" : "93750000000000000"
      }, {
        "block" : 27456000,
        "blockreward" : "46875000000000000"
      }, {
        "block" : 32032000,
        "blockreward" : "23437500000000000"
      }, {
        "block" : 36608000,
        "blockreward" : "11718750000000000"
      }, {
        "block" : 41184000,
        "blockreward" : "5859375000000000"
      }, {
        "block" : 45760000,
        "blockreward" : "2929687500000000"
      }, {
        "block" : 50336000,
        "blockreward" : "1464843750000000"
      }, {
        "block" : 54912000,
        "blockreward" : "732421875000000"
      }, {
        "block" : 59488000,
        "blockreward" : "366210937500000"
      }, {
        "block" : 64064000,
        "blockreward" : "183105468750000"
      }, {
        "block" : 68640000,
        "blockreward" : "91552734375000"
      }, {
        "block" : 73216000,
        "blockreward" : "45776367187500"
      }, {
        "block" : 77792000,
        "blockreward" : "22888183593750"
      }, {
        "block" : 82368000,
        "blockreward" : "11444091796875"
      }, {
        "block" : 86944000,
        "blockreward" : "57220458984375"
      }, {
        "block" : 91520000,
        "blockreward" : "28610229492187"
      }, {
        "block" : 96096000,
        "blockreward" : "14305114746093"
      }, {
        "block" : 100672000,
        "blockreward" : "7152557373046"
      }, {
        "block" : 105248000,
        "blockreward" : "3576278686523"
      }, {
        "block" : 109824000,
        "blockreward" : "1788139343261"
      }, {
        "block" : 114400000,
        "blockreward" : "894069671630"
      }, {
        "block" : 118976000,
        "blockreward" : "447034835815"
      }, {
        "block" : 123552000,
        "blockreward" : "223517417907"
      }, {
        "block" : 128128000,
        "blockreward" : "111758708953"
      }, {
        "block" : 132704000,
        "blockreward" : "55879354476"
      }, {
        "block" : 137280000,
        "blockreward" : "0"
      } ]
    }
  },
  "nonce" : "0x0",
  "timestamp" : "0x0",
  "gasLimit" : "0x1fffffffffffff",
  "difficulty" : "0x1",
  "mixHash" : "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
  "coinbase" : "0x0000000000000000000000000000000000000000",
  "alloc" : {
    "0xaE51f2EfE70e57b994BE8F7f97C4dC824c51802a" : {
      "balance" : "3570000000000000000000000000"
    }
  },
  "extraData" : "0xf87aa00000000000000000000000000000000000000000000000000000000000000000f85494ad4ea9b483fb8a4ed177186174ba44a41c2f36c3943e5fee8e8cb007611d6e8bab73b1368a1098674094018f86e22cc26e0318e7c00c3a738df1e5f183ac947366f751aa0fcf4d457dc52bdc9d5cd750533943c080c0"
}
```

### Genesis State

| Parameter | Value | Description |
|-----------|-------|-------------|
| `nonce` | `0x0` | Arbitrary value (0 for PoA) |
| `timestamp` | `0x0` | Unix timestamp of block 0 |
| `gasLimit` | `0x1fffffffffffff` | Maximum gas per block |
| `difficulty` | `0x1` | Mining difficulty (minimal for PoA) |

## Block Reward Schedule

KalyChain uses a halving schedule for block rewards:

| Block | Reward (Wei) | Reward (KLC) |
|-------|-------------|--------------|
| 0 | 3,000,000,000,000,000,000 | 3.0 KLC |
| 9,434,168 | 750,000,000,000,000,000 | 0.75 KLC |
| 13,728,000 | 375,000,000,000,000,000 | 0.375 KLC |
| 18,304,000 | 187,500,000,000,000,000 | 0.1875 KLC |
| ... | ... | ... |
| 137,280,000 | 0 | 0 KLC (end of rewards) |

The complete reward schedule is defined in the `transitions.qbft` section and includes 29 halvings until block 137,280,000 when rewards end.

## Extra Data

The `extraData` field encodes the initial validator set:

- **32 bytes vanity data** — Arbitrary identifier
- **Validator addresses** — Initial block producers
- **Round information** — Set to 0 for genesis
- **Seal list** — Empty for genesis block

## Using the Genesis File

Specify the genesis file when starting a node:

```bash
kaly --genesis-file=/path/to/genesis.json --data-path=/var/kaly/data
```

:::warning Network Consistency
All nodes on the same network **must** use identical genesis files. Mismatched genesis configurations will prevent nodes from syncing with the network.
:::

## Download

Get the official genesis file:

```bash
curl -o genesis.json https://raw.githubusercontent.com/KalyCoinProject/node-install/main/configs/rpc/genesis.json
```

## Further Reading

- [QBFT Configuration](../consensus/qbft) — Detailed QBFT consensus setup.
- [Validators](../consensus/validators) — Managing the validator set.
- [Hyperledger Besu Genesis File Reference](https://besu.hyperledger.org/private-networks/reference/genesis-items) — Complete genesis file specification.

