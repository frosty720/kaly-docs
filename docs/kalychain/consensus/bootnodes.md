---
sidebar_position: 4
---

# Bootnodes

Bootnodes are specialized nodes used for initial peer discovery. They help new nodes find and connect to other peers on the network.

## Overview

When a node starts, it needs to discover other nodes on the network. Bootnodes serve as known entry points that nodes can connect to for initial peer discovery.

:::info Bootnodes vs Static Nodes
**Bootnodes** help discover peers dynamically. **Static nodes** define a fixed set of peer connections. You can use either or both depending on your needs.
:::

## Bootnode Configuration

### Specifying Bootnodes

Add bootnodes using the `--bootnodes` command-line option:

```bash
kaly --genesis-file=genesis.json \
     --data-path=/var/kaly/data \
     --bootnodes=enode://pubkey1@ip1:port1,enode://pubkey2@ip2:port2
```

### Enode URL Format

```
enode://<node-public-key>@<host>:<port>
```

Example:
```
enode://c35c3ec90a8a51fd5703594c6303382f3ae6b2ecb99bab2c04b3794f2bc3fc2631dabb0c08af795787a6c004d8f532230ae6e9925cbbefb0b28b79295d615f@192.168.1.100:30303
```

### P2P Configuration

Configure how your node advertises itself to peers:

| Option | Description | Default |
|--------|-------------|---------|
| `--p2p-host` | IP address to advertise | `127.0.0.1` |
| `--p2p-port` | Port for P2P connections | `30303` |
| `--p2p-interface` | Network interface to bind | All interfaces |

Example for a publicly accessible node:

```bash
kaly --p2p-host=203.0.113.50 \
     --p2p-port=30303 \
     --bootnodes=<bootnode-enodes>
```

## Production Bootnode Configuration

### High Availability

For production networks, configure **at least two bootnodes** to ensure availability:

- Distribute bootnodes geographically.
- Use separate cloud providers or data centers.
- Monitor bootnode health continuously.

### Static IP Addresses

Bootnodes should have stable, unchanging enode URLs:

1. **Create node keys first** — Generate the private/public key pair before starting.
2. **Assign static IPs**:
   - Public networks: Use elastic IPs.
   - Private networks: Reserve private IP addresses.

### Key Generation

Generate bootnode keys before first start:

```bash
kaly --data-path=/var/kaly/bootnode public-key export --to=bootnode.pub
```

The enode URL becomes:
```
enode://<contents-of-bootnode.pub>@<static-ip>:30303
```

:::warning Don't Use Load Balancers
**Never place bootnodes behind a load balancer.** The enode URL includes the node's public key, IP, and port. Load balancers would break the identity linkage.
:::

### Bootnode Redundancy

Have each bootnode list all other bootnodes:

```bash
# Bootnode 1
kaly --bootnodes=enode://bootnode2@ip2:30303,enode://bootnode3@ip3:30303

# Bootnode 2  
kaly --bootnodes=enode://bootnode1@ip1:30303,enode://bootnode3@ip3:30303

# Bootnode 3
kaly --bootnodes=enode://bootnode1@ip1:30303,enode://bootnode2@ip2:30303
```

Nodes automatically ignore their own enode in the bootnode list, so you can use an identical list for all nodes.

## Adding and Removing Bootnodes

### Adding Bootnodes

1. Set up the new bootnode with static configuration.
2. Start the bootnode and verify it's synced.
3. Update the `--bootnodes` option on all nodes.
4. Restart nodes to connect to the new bootnode.

:::tip No Immediate Restart Required
You can update `--bootnodes` config and restart nodes gradually. Nodes will connect to new bootnodes on their next restart.
:::

### Removing Bootnodes

1. Ensure sufficient bootnodes remain for discovery.
2. Update `--bootnodes` on all nodes to remove the old bootnode.
3. Restart nodes to apply the change.
4. Shut down the removed bootnode.

## Development vs Production

### Development

For local development or testing, a single bootnode is sufficient:

```bash
# Start first node (acts as bootnode)
kaly --network=dev --data-path=/tmp/node1

# Get enode URL
curl -X POST --data '{
  "jsonrpc":"2.0",
  "method":"admin_nodeInfo",
  "params":[],
  "id":1
}' http://localhost:8545

# Start second node with bootnode
kaly --network=dev --data-path=/tmp/node2 \
     --bootnodes=<enode-from-node1>
```

### Production Checklist

- [ ] At least 2 bootnodes configured
- [ ] Static IP addresses assigned
- [ ] Node keys generated and backed up
- [ ] Bootnodes list each other
- [ ] Monitoring configured
- [ ] Documentation updated with enode URLs

## Troubleshooting

### Node Not Finding Peers

1. Verify bootnode enode URLs are correct.
2. Check network connectivity to bootnode IPs/ports.
3. Confirm bootnode is running and synced.
4. Check firewall rules allow P2P port (default 30303).

### Peer Discovery Slow

- Add more bootnodes.
- Ensure bootnodes are geographically distributed.
- Consider using static nodes for critical peers.

## Further Reading

- [Validators](./validators) — Validators can also serve as bootnodes.
- [Quick Start](../quick-start/) — Node installation and startup.
- [Hyperledger Besu Networking](https://besu.hyperledger.org/private-networks/how-to/configure/configure-peer-discovery) — Detailed P2P configuration.
