---
sidebar_position: 4
---

# Backup and Restore

This guide covers backing up and restoring KalyChain nodes to protect against data loss and enable disaster recovery.

## Why Backup?

In a decentralized network, blockchain data replicates across all nodes. However, backups are still valuable for:

- **Faster recovery** — Avoid full resync after failures.
- **Configuration preservation** — Maintain node identity and settings.
- **Disaster recovery** — Recover from corrupted data.
- **Migration** — Move nodes between machines.

## What to Backup

### Critical Files

| File/Directory | Description | Frequency |
|----------------|-------------|-----------|
| Genesis file | Network configuration | Once (store in VCS) |
| Node key (`key`) | Node identity | Once (secure storage) |
| Config files | Node settings | After changes |

### Optional Files

| File/Directory | Description | Frequency |
|----------------|-------------|-----------|
| `database/` | Blockchain data | Periodic |
| Logs | Historical records | As needed |

### What NOT to Backup

- `node_modules/`, dependencies (reinstall instead)
- Temporary files, caches

## Genesis File

The genesis file defines your network and must be identical across all nodes.

:::important
Store the genesis file in **source control** (Git) to ensure:
- Version tracking
- Easy distribution to new nodes
- Recovery capability
:::

## Node Key Backup

The node key is critical for maintaining node identity:

```bash
# Location
<data-path>/key        # Private key (SECRET!)
<data-path>/key.pub    # Public key

# Secure backup
tar -czf node-keys.tar.gz key key.pub
# Encrypt and store securely
gpg -c node-keys.tar.gz
```

:::warning Protect Private Keys
- Never store unencrypted keys in version control.
- Use secrets management (Vault, AWS Secrets, etc.).
- Restrict file permissions: `chmod 600 key`
:::

## Data Backup

### Periodic Database Backup

For faster recovery, periodically backup the blockchain database:

```bash
# Stop the node first (recommended)
systemctl stop kalychain

# Create backup
tar -czf kaly-db-$(date +%Y%m%d).tar.gz <data-path>/database/

# Restart
systemctl start kalychain
```

### Hot Backups

If downtime isn't acceptable, use filesystem snapshots (LVM, ZFS, or cloud provider snapshots).

### Backup Schedule

| Node Type | Frequency | Retention |
|-----------|-----------|-----------|
| Validator | Daily | 7 days |
| RPC Node | Weekly | 4 weeks |
| Archive | Weekly | 4 weeks |

## Restore Procedure

### Full Restore

1. **Stop the node** (if running):
   ```bash
   systemctl stop kalychain
   ```

2. **Move corrupted data**:
   ```bash
   mv <data-path> <data-path>.corrupted
   ```

3. **Restore from backup**:
   ```bash
   mkdir <data-path>
   tar -xzf kaly-db-backup.tar.gz -C <data-path>
   ```

4. **Verify permissions**:
   ```bash
   chown -R kalychain:kalychain <data-path>
   chmod 600 <data-path>/key
   ```

5. **Restart**:
   ```bash
   systemctl start kalychain
   ```

### Key-Only Restore

If only the node key is preserved, the database will sync from peers:

1. Restore the node key to `<data-path>/key`
2. Start the node with `--data-path=<data-path>`
3. Wait for synchronization to complete

## Handling Corrupted Data

If you encounter database corruption:

### Option 1: Restore from Backup

```bash
# Stop node
systemctl stop kalychain

# Remove corrupted database
rm -rf <data-path>/database

# Restore from backup
tar -xzf latest-backup.tar.gz -C <data-path>/

# Start node
systemctl start kalychain
```

### Option 2: Resync from Peers

```bash
# Stop node
systemctl stop kalychain

# Remove database (keep keys!)
rm -rf <data-path>/database

# Start node (will sync from peers)
systemctl start kalychain
```

## Finding Peers After Restart

After restoring a node, peer discovery resumes automatically. To speed up:

- Ensure bootnodes are correctly configured.
- Check that P2P port (30303) is accessible.
- Verify the node key wasn't replaced (would change enode).

## Monitoring Backup Health

Regularly verify your backups:

```bash
# Test restore to temporary location
mkdir /tmp/kaly-test
tar -xzf backup.tar.gz -C /tmp/kaly-test
ls -la /tmp/kaly-test/database/

# Clean up
rm -rf /tmp/kaly-test
```

## Automation Example

Cron job for daily backups:

```bash
# /etc/cron.d/kalychain-backup
0 2 * * * root /opt/scripts/backup-kalychain.sh
```

Backup script:

```bash
#!/bin/bash
# /opt/scripts/backup-kalychain.sh

DATA_PATH="/var/lib/kalychain"
BACKUP_DIR="/backup/kalychain"
DATE=$(date +%Y%m%d)

# Create backup
tar -czf $BACKUP_DIR/kaly-db-$DATE.tar.gz $DATA_PATH/database/

# Keep last 7 days
find $BACKUP_DIR -name "kaly-db-*.tar.gz" -mtime +7 -delete

# Report
echo "Backup completed: kaly-db-$DATE.tar.gz"
```

## Further Reading

- [Quick Start](../quick-start/) — Initial node setup.
- [Data Storage Formats](./data-storage-formats) — Storage options.
- [Validators](../consensus/validators) — Validator-specific considerations.
