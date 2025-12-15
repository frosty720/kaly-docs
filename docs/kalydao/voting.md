---
sidebar_position: 2
---

# Voting in KalyDAO

This guide explains how to participate in KalyDAO governance by acquiring voting power and casting votes.

## Getting Voting Power

To vote in KalyDAO, you need **gKLC** (Governance KLC) — a wrapped version of the native KLC token.

### Step 1: Wrap Your KLC

1. Go to [dao.kalychain.io](https://dao.kalychain.io)
2. Connect your wallet
3. Navigate to the "Wrap KLC" section
4. Enter the amount of KLC to wrap
5. Confirm the transaction

Your KLC is deposited into the Governance Token contract, and you receive an equal amount of gKLC.

:::info 1:1 Ratio
1 KLC = 1 gKLC. There's no conversion fee — you can unwrap anytime.
:::

### Step 2: Delegate Voting Power

After wrapping, you must **delegate** your voting power. You can:

- **Self-delegate** — Vote with your own tokens
- **Delegate to another address** — Let someone else vote on your behalf

:::warning Required Step
You must delegate (even to yourself) before your gKLC has voting power. Undelegated tokens cannot vote.
:::

## How to Vote

### 1. Find Active Proposals

![KalyDAO Voting Interface](/img/kalydao/kalydao_voting_1_1765832207017.png)

Visit [dao.kalychain.io](https://dao.kalychain.io) to view:

- **Active proposals** — Currently open for voting
- **Pending proposals** — Waiting for voting period to start
- **Passed/Failed proposals** — Historical proposals

### 2. Review the Proposal

Each proposal shows:

- **Description** — What the proposal does
- **Actions** — On-chain calls to be executed
- **Votes** — Current For/Against/Abstain counts
- **Timeline** — When voting ends

### 3. Cast Your Vote

Choose your voting option:

| Vote | Meaning |
|------|---------|
| **For** | Support the proposal |
| **Against** | Oppose the proposal |
| **Abstain** | Count toward quorum without voting yes/no |

Submit your vote transaction. Your voting power is calculated based on your gKLC balance at the **proposal creation block**.

## Voting Requirements

### Quorum

A proposal needs at least **4%** of total voting power participating to be valid.

### Voting Period

- **Delay**: ~1 week after proposal creation before voting starts
- **Duration**: ~1 week voting window

### Vote Counting

For a proposal to pass:

1. **Quorum met** — At least 4% participation
2. **Majority** — More "For" votes than "Against"

## Unwrapping gKLC

To convert back to native KLC:

1. Go to the DAO interface
2. Navigate to "Unwrap gKLC"
3. Enter the amount to unwrap
4. Confirm the transaction

Your gKLC is burned and you receive the equivalent native KLC.

## Voting Tips

- **Delegate early** — Your voting power only counts after delegation
- **Review carefully** — Understand proposals before voting
- **Check the actions** — See exactly what on-chain calls will execute
- **Note the snapshot** — Your voting power is locked at proposal creation

## Technical Details

### Direct Contract Interaction

**Wrap KLC (deposit):**
```solidity
// Send KLC directly to the governance token
// Contract: 0x4BA2369743c4249ea3f6777CaF433c76dBBa657a
(bool success, ) = GOVERNANCE_TOKEN.call{value: amount}("");
```

**Delegate:**
```solidity
IGovernanceToken(GOVERNANCE_TOKEN).delegate(yourAddress);
```

**Vote:**
```solidity
IGovernor(GOVERNOR).castVote(proposalId, support);
// support: 0=Against, 1=For, 2=Abstain
```

## Further Reading

- [Creating Proposals](./proposals) — Submit your own proposals
- [Contract Addresses](./contracts) — Technical reference
- [DAO Interface](https://dao.kalychain.io) — Start voting
