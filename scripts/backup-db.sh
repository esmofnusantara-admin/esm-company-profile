#!/bin/bash
set -e

# ===================================================================
# AUTOMATED POSTGRESQL BACKUP SCRIPT FOR ESM
# ===================================================================

BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
FILENAME="$BACKUP_DIR/esm_db_backup_$TIMESTAMP.sql.gz"

mkdir -p "$BACKUP_DIR"

echo "💾 Memulai backup database esm_db dari container esm_postgres..."
docker exec -t esm_postgres pg_dump -U esm_user esm_db | gzip > "$FILENAME"

echo "✅ Backup selesai: $FILENAME"

# Hapus backup yang lebih tua dari 14 hari
find "$BACKUP_DIR" -type f -name "esm_db_backup_*.sql.gz" -mtime +14 -delete
echo "🧹 Rotasi backup selesai (retensi 14 hari)."
