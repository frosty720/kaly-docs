---
sidebar_position: 4
---

# DAO Contracts

Technical reference for KalyDAO smart contracts.

## Contract Addresses

### Mainnet

| Contract | Address |
|----------|---------|
| **Governance Token (gKLC)** | [`0x4BA2369743c4249ea3f6777CaF433c76dBBa657a`](https://kalyscan.io/address/0x4BA2369743c4249ea3f6777CaF433c76dBBa657a) |
| **Governor** | [`0xF6C1af62e59D3085f10ac6F782cFDaE23E6352dE`](https://kalyscan.io/address/0xF6C1af62e59D3085f10ac6F782cFDaE23E6352dE) |
| **Timelock** | [`0xA11572e9724dfeD2BCf8ecc9bfEd18CC609C4c6D`](https://kalyscan.io/address/0xA11572e9724dfeD2BCf8ecc9bfEd18CC609C4c6D) |
| **Treasury** | [`0x92564ec0d22BBd5e3FF978B977CA968e6c7d1c44`](https://kalyscan.io/address/0x92564ec0d22BBd5e3FF978B977CA968e6c7d1c44) |

### Testnet

| Contract | Address |
|----------|---------|
| **Governance Token (gKLC)** | [`0xF917BdbeFc80EC42A091F9E466C794684a95327E`](https://testnet.kalyscan.io/address/0xF917BdbeFc80EC42A091F9E466C794684a95327E) |
| **Governor** | [`0x3ce8eDA4c48635983F15af7D3Dae96C8D9Ae593d`](https://testnet.kalyscan.io/address/0x3ce8eDA4c48635983F15af7D3Dae96C8D9Ae593d) |
| **Timelock** | [`0x34AcBA229Aeaf7F1c0f442633F35E26Bc94b4e2A`](https://testnet.kalyscan.io/address/0x34AcBA229Aeaf7F1c0f442633F35E26Bc94b4e2A) |
| **Treasury** | [`0x5E65BEC7D118751c3b92BBccD1bEE8165e663b4b`](https://testnet.kalyscan.io/address/0x5E65BEC7D118751c3b92BBccD1bEE8165e663b4b) |

## Contract Architecture

### Governance Token (gKLC)

Wraps native KLC to enable voting.

**Based on**: OpenZeppelin ERC20Votes

**Key Functions**:

```solidity
// Deposit native KLC, receive gKLC
function deposit() public payable;

// Withdraw native KLC, burn gKLC
function withdraw(uint256 amount) public;

// Delegate voting power
function delegate(address delegatee) public;
```

**Features**:
- 1:1 backing with native KLC
- Voting power through delegation
- Permissionless wrap/unwrap

### Governor Contract

Manages proposals and voting.

**Based on**: OpenZeppelin Governor

**Key Functions**:

```solidity
// Create a new proposal
function propose(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    string memory description
) public returns (uint256 proposalId);

// Cast a vote
function castVote(uint256 proposalId, uint8 support) public returns (uint256);

// Queue a successful proposal
function queue(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) public returns (uint256);

// Execute after timelock
function execute(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) public returns (uint256);
```

**Parameters**:
- Quorum: 4%
- Voting Delay: 302,400 blocks (~1 week)
- Voting Period: 604,800 blocks (~1 week)

### Timelock Contract

Provides security delay between proposal approval and execution.

**Based on**: OpenZeppelin TimelockController

**Minimum Delay**: 3,600 seconds (1 hour)

### Treasury Vault

Holds community funds, controlled by governance.

**Features**:
- Holds native KLC
- Holds any ERC20 token
- Only Timelock can execute transfers

## Integration Guide

### Ethers.js Example

```javascript
import { ethers } from 'ethers';

const GOVERNANCE_TOKEN = '0x4BA2369743c4249ea3f6777CaF433c76dBBa657a';
const GOVERNOR = '0xF6C1af62e59D3085f10ac6F782cFDaE23E6352dE';

// Wrap KLC
async function wrapKLC(signer, amount) {
  const tx = await signer.sendTransaction({
    to: GOVERNANCE_TOKEN,
    value: ethers.parseEther(amount)
  });
  return tx.wait();
}

// Delegate voting power
async function delegate(signer, delegatee) {
  const token = new ethers.Contract(GOVERNANCE_TOKEN, [
    'function delegate(address delegatee)'
  ], signer);
  return token.delegate(delegatee);
}

// Get voting power
async function getVotes(provider, address) {
  const token = new ethers.Contract(GOVERNANCE_TOKEN, [
    'function getVotes(address account) view returns (uint256)'
  ], provider);
  return token.getVotes(address);
}
```

## Source Code

- [dao-contracts](https://github.com/KalyCoinProject/dao-contracts) — Smart contracts
- [KalyDAO](https://github.com/KalyCoinProject/KalyDAO) — Frontend interface

## Further Reading

- [Voting Guide](./voting) — How to participate
- [Proposals Guide](./proposals) — Creating proposals
- [OpenZeppelin Governor Docs](https://docs.openzeppelin.com/contracts/4.x/governance)
