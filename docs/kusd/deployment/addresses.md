---
sidebar_position: 1
---

# Deployment Addresses

Contract addresses for KUSD Protocol deployments.

## KalyChain Mainnet (Chain ID: 3888)

:::info Live Deployment
KUSD is live on KalyChain mainnet. Deployed December 2025.
:::

### Core Contracts

| Contract | Address | Description |
|----------|---------|-------------|
| Vat | `0xd3f7d3fdb52bc3ae7c69e12c2a87af49b632505c` | Core CDP engine |
| Kusd | `0xcd02480926317748e95c5bbbbb7d1070b2327f1a` | KUSD stablecoin token |
| sKLC | `0x86c0ea2bf60f86c88a227b00308cac07b38deb2c` | Staked KLC (auction token) |
| KusdJoin | `0x90fdfd47dfaf84ccd568a596dc70ec2c0d80c571` | KUSD adapter |
| Spotter | `0xf76f2447fbe15582e47218d0510216f835a80db7` | Oracle price feed interface |
| Jug | `0x70806c83da93635a452e3c395cfde55e283ed1a4` | Stability fee collector |
| Pot | `0x2268c2da9f04230d6ba451afece52c244f235c44` | KUSD Savings Rate (DSR) |
| Dog | `0xae50bf432f64a77f0bea6961458da4e486e997b9` | Liquidation engine |
| Vow | `0x334f479678cc6c8017743effef22818aca9ff7ef` | System surplus/debt manager |
| Flapper | `0x40475623957bccf0ac55b9ac7f6ebe472852aa0c` | Surplus auctions |
| Flopper | `0x4d611877b59543caa972359bc4def7775b22ec58` | Debt auctions |
| End | `0x71b342a953fbd6483f8d520d841665f8d7b2a619` | Emergency shutdown |
| Cure | `0x609317bfa3007e0c57a4a750d82f8733f890c9ac` | Shutdown helper |

### Proxy Infrastructure

| Contract | Address | Description |
|----------|---------|-------------|
| DSProxyFactory | `0x7dBd86439CcFfA5b0883667631FdE919f0184B27` | Proxy factory |
| DSProxyRegistry | `0x5649cfb8fca0657b6b33461a2d2ac26e62713c49` | Proxy registry |
| KssProxyActions | `0x888c259ed3740a7f79e3c443d5e731389c4c98f3` | Vault actions |
| KssCdpManager | `0x99defc4b35b5a7422cd2a892df40b41f4a9391d2` | CDP manager |

### Oracle Contracts

| Asset | Address |
|-------|---------|
| BTC Oracle | `0x28f51A114Ffcf36FB77D6ded40807a6415782f5d` |
| ETH Oracle | `0x80E64f28656e1C95F4dF231536D8dC411822053c` |
| USDT Oracle | `0xC5342aDDbecabF78d92Ca3c218879d4F767a0D30` |
| USDC Oracle | `0xF89dE104147bb36f5473c30eC1d2C067c81ff04E` |
| DAI Oracle | `0x7Ef8fe406191CB2a7C2671FF724f2eAbCbbd22cF` |

### Collateral Adapters (GemJoin)

| Collateral | GemJoin Address | Clipper Address |
|------------|-----------------|-----------------|
| WBTC-A | `0xb1c48ad6d623a72c07e7ece7b141f548c35ae6fb` | `0x13e96f537709f7a79d4fc9be0e3e4d863232f63e` |
| WETH-A | `0x632e9740d63b7c88a2cb42105ccc264b1038cf6c` | `0xa6bb3dc8bd773080f23afe4248e8d47f85f359a6` |
| USDT-A | `0xade482e0abf693d4a4f02ffe90756288cfd5e720` | `0x3b0eedaa0a6cb7d3a5b3e59b76c261fb5d738eaa` |
| USDC-A | `0x0eb899b93f9a97d13878dcb785675222fb8948a5` | `0xe658b15137f3081cd62a25873bb7d3d73e9d3233` |
| DAI-A | `0xcdb96345acc74000211b5235dd1b4da97e130108` | `0xfb9fd22a23953a50e0f49d1e4eb64653560118db` |

### Collateral Token Addresses (via KalyBridge)

| Token | Address | Decimals |
|-------|---------|----------|
| WBTC | `0xaA77D4a26d432B82DB07F8a47B7f7F623fd92455` | 8 |
| WETH | `0xfdbB253753dDE60b11211B169dC872AaE672879b` | 18 |
| USDT | `0x2CA775C77B922A51FcF3097F52bFFdbc0250D99A` | 6 |
| USDC | `0x9cAb0c396cF0F4325913f2269a0b72BD4d46E3A9` | 6 |
| DAI | `0x6E92CAC380F7A7B86f4163fad0df2F277B16Edc6` | 18 |

### Collateral Parameters

| Collateral | Liquidation Ratio | Stability Fee | Dust (Min Debt) |
|------------|-------------------|---------------|-----------------|
| WBTC-A | 150% | 2% APY | 100 KUSD |
| WETH-A | 150% | 2% APY | 100 KUSD |
| USDT-A | 105% | 0% APY | 100 KUSD |
| USDC-A | 105% | 0% APY | 100 KUSD |
| DAI-A | 102% | 0% APY | 100 KUSD |

---

## KalyChain Testnet (Chain ID: 3889)

:::info Testnet Deployment
These addresses are from the latest testnet deployment. Always verify before interacting.
:::

### Core Contracts

| Contract | Address |
|----------|---------|
| Vat | `0x0f41476b9fe5280e0f743474d93e01b1d0d7c0fa` |
| Kusd | `0x6c52f4afb0f23296d8d1c32485207a1e7c9aa3c3` |
| sKLC | `0x618e9fa8bb2efea686e685dee8bf931cd1a0e5bf` |
| KusdJoin | `0xd5267014b37dd785c3553be7916296e9acec9069` |
| Spotter | `0x706e2f83ecc695e7d00f0356dd58a6da01b6948a` |
| Jug | `0x680cdebf55d3a57944e014d16f7c28915655f276` |
| Pot | `0xf27421765637f916dbe67f015f5ecacbac097ec6` |
| Dog | `0x186e740d2aabf58124c17ded3cbea92c0e38c9a1` |
| Vow | `0x0b24d04ddb8c897ca49c5109b23ae1127d7ac578` |

### Proxy Infrastructure

| Contract | Address |
|----------|---------|
| DSProxyFactory | `0xe89f8dbb853cdda3a1c898e2d9b26e98a946fa15` |
| DSProxyRegistry | `0x2c5d1daa0281ed54f3d8e068e1e1f4bc6df81a1a` |
| KssProxyActions | `0x14fe92de07f50c6cb8f1e42f8874a55b04457686` |

### Mock Collateral Tokens (Testnet Only)

| Token | Address |
|-------|---------|
| MockUSDC | `0x148d19609F3Ad595F8455225510f89cF0F121013` |
| MockUSDT | `0xeE9940240B94821937812c43a6264e5aA417f161` |
| MockWBTC | `0x92631B8Be684d41d0dF9eb473D9E3995CDb2a797` |
| MockWETH | `0x68E7492e64FF0592a6D82E5C0323b8a8DDBfB884` |
| MockDAI | `0x7BE7a4338143C417D2D71C96eA8560767c6E4477` |

---

## Network Configuration

### Testnet

```bash
RPC_URL=https://testnetrpc.kalychain.io/rpc
CHAIN_ID=3889
EXPLORER=https://testnet.kalyscan.io
```

### Mainnet

```bash
RPC_URL=https://rpc.kalychain.io/rpc
CHAIN_ID=3888
EXPLORER=https://kalyscan.io
```

## Explorer Links

- **Mainnet Explorer**: [kalyscan.io](https://kalyscan.io)
- **Testnet Explorer**: [testnet.kalyscan.io](https://testnet.kalyscan.io)
