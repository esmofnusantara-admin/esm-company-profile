#!/bin/bash
set -e

# ===================================================================
# SCRIPT PENGGANTI AKUN GITHUB (ESM / YUSUF / AKUN LAIN)
# ===================================================================

ENV_FILE="git-credentials.env"
USERNAME="$1"
TOKEN="$2"

if [ -z "$USERNAME" ] || [ -z "$TOKEN" ]; then
  if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' $ENV_FILE | xargs)
    USERNAME="$GITHUB_USERNAME"
    TOKEN="$GITHUB_TOKEN"
  fi
fi

if [ -z "$USERNAME" ] || [ -z "$TOKEN" ] || [ "$TOKEN" = "ghp_masukkan_token_github_disini" ]; then
  echo "❌ Silakan isi GITHUB_USERNAME dan GITHUB_TOKEN di file 'git-credentials.env'!"
  echo "Contoh pemakaian:"
  echo "  ./scripts/switch-git-account.sh esmofnusantara-admin ghp_xxx"
  exit 1
fi

# 1. Pastikan credential helper diset ke local file
git config --local credential.helper "store --file=.git/credentials"

# 2. Tulis kredensial ke .git/credentials
echo "https://${USERNAME}:${TOKEN}@github.com" > .git/credentials

# 3. Sesuaikan user.name lokal
git config --local user.name "$USERNAME"

echo "✅ Kredensial Git berhasil dialihkan ke akun: $USERNAME"
echo "Sekarang Anda dapat menjalankan: git push origin main"
