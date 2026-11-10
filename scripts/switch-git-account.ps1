# ===================================================================
# SCRIPT PENGGANTI AKUN GITHUB (ESM / YUSUF / AKUN LAIN)
# ===================================================================
param (
    [string]$Username,
    [string]$Token
)

$envFile = "git-credentials.env"

# Jika parameter tidak dioper, baca dari file git-credentials.env
if (-not $Username -or -not $Token) {
    if (Test-Path $envFile) {
        Get-Content $envFile | ForEach-Object {
            $line = $_.Trim()
            if ($line -and -not $line.StartsWith("#")) {
                $parts = $line.Split("=", 2)
                if ($parts.Length -eq 2) {
                    $key = $parts[0].Trim()
                    $val = $parts[1].Trim()
                    if ($key -eq "GITHUB_USERNAME") { $Username = $val }
                    if ($key -eq "GITHUB_TOKEN") { $Token = $val }
                }
            }
        }
    }
}

if (-not $Username -or -not $Token -or $Token -eq "ghp_masukkan_token_github_disini") {
    Write-Host "❌ Silakan isi GITHUB_USERNAME dan GITHUB_TOKEN di file 'git-credentials.env'!" -ForegroundColor Red
    Write-Host "Contoh pemakaian:"
    Write-Host "  .\scripts\switch-git-account.ps1 -Username esmofnusantara-admin -Token ghp_xxx"
    exit 1
}

# 1. Pastikan credential helper diset ke local file
git config --local credential.helper "store --file=.git/credentials"

# 2. Tulis kredensial ke .git/credentials
$credContent = "https://${Username}:${Token}@github.com"
Set-Content -Path ".git/credentials" -Value $credContent -Encoding UTF8

# 3. Sesuaikan user.name dan user.email lokal
git config --local user.name $Username

Write-Host "✅ Kredensial Git berhasil dialihkan ke akun: $Username" -ForegroundColor Green
Write-Host "Sekarang Anda dapat menjalankan: git push origin main" -ForegroundColor Cyan
