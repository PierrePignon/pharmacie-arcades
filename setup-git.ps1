# Setup Git + GitHub repo pour Pharmacie des Arcades
# À lancer depuis PowerShell dans le dossier pharmacie-arcades-app
# Usage : .\setup-git.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "=== 1. Init Git ===" -ForegroundColor Cyan
if (Test-Path .git) {
  Write-Host "  .git existe déjà, on saute l'init" -ForegroundColor Yellow
} else {
  git init -b main
}
git config user.email "pierre.pignon09@gmail.com"
git config user.name "Pierre Pignon"

Write-Host "`n=== 2. Add + Commit ===" -ForegroundColor Cyan
git add .
git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
  Write-Host "  Rien à commit" -ForegroundColor Yellow
} else {
  git commit -m "Initial commit — site Pharmacie des Arcades v1"
}

Write-Host "`n=== 3. Création du repo GitHub via gh CLI ===" -ForegroundColor Cyan
$ghAvailable = Get-Command gh -ErrorAction SilentlyContinue
if ($ghAvailable) {
  Write-Host "  gh CLI détecté"
  # Login si besoin
  $authStatus = & gh auth status 2>&1
  if ($LASTEXITCODE -ne 0) {
    Write-Host "  Login GitHub d'abord :" -ForegroundColor Yellow
    gh auth login --web --git-protocol https
  }
  # Création du repo si pas déjà existant
  $exists = & gh repo view PierrePignon/pharmacie-arcades 2>&1
  if ($LASTEXITCODE -ne 0) {
    Write-Host "  Création du repo privé pharmacie-arcades..."
    gh repo create pharmacie-arcades --private --source=. --remote=origin --push --description "Site web Pharmacie des Arcades — Châteauneuf-le-Rouge"
  } else {
    Write-Host "  Repo déjà existant. Push..."
    if (-not (git remote get-url origin 2>$null)) {
      git remote add origin https://github.com/PierrePignon/pharmacie-arcades.git
    }
    git push -u origin main
  }
  Write-Host "`n✓ Repo créé : https://github.com/PierrePignon/pharmacie-arcades" -ForegroundColor Green
} else {
  Write-Host "  gh CLI absent. Installe-le avec :" -ForegroundColor Yellow
  Write-Host "    winget install --id GitHub.cli" -ForegroundColor White
  Write-Host "  Ou crée le repo manuellement :"
  Write-Host "    1. Va sur https://github.com/new" -ForegroundColor White
  Write-Host "    2. Nom : pharmacie-arcades — Private — surtout ne coche RIEN (pas de README, .gitignore, etc.)" -ForegroundColor White
  Write-Host "    3. Reviens ici et lance :" -ForegroundColor White
  Write-Host "       git remote add origin https://github.com/PierrePignon/pharmacie-arcades.git" -ForegroundColor White
  Write-Host "       git push -u origin main" -ForegroundColor White
}

Write-Host "`n=== Prochaine étape : Vercel ===" -ForegroundColor Cyan
Write-Host "  npm i -g vercel"
Write-Host "  vercel login"
Write-Host "  vercel"
Write-Host "(voir DEPLOY.md pour le détail)`n"
