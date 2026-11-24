

#!/usr/bin/env pwsh
# start-dev.ps1 — Start the full Offline Learning Platform dev environment
# Run from project root: .\start-dev.ps1

Write-Host "`n🚀 Starting Offline Learning Platform Dev Environment`n" -ForegroundColor Cyan

# 1. Start PostgreSQL via Docker Compose
Write-Host "📦 Starting PostgreSQL..." -ForegroundColor Yellow
docker compose up -d
Start-Sleep -Seconds 3

# 2. Run migrations if needed
Write-Host "`n🗄️  Running Prisma migrations..." -ForegroundColor Yellow
Push-Location apps/api
npx prisma migrate dev --name init --skip-seed 2>$null
Write-Host "✓ Migrations complete" -ForegroundColor Green

# 3. Seed database
Write-Host "`n🌱 Seeding database..." -ForegroundColor Yellow
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
Pop-Location

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "`n📋 Credentials:" -ForegroundColor Cyan
Write-Host "   Student:  aarav@student.com    / password123"
Write-Host "   Student:  diya@student.com     / password123"
Write-Host "   Teacher:  teacher@school.com   / password123"

Write-Host "`n▶️  Now start both servers in separate terminals:`n" -ForegroundColor Cyan
Write-Host "   Terminal 1 (API):"
Write-Host "     cd apps/api && npm run start:dev"
Write-Host "`n   Terminal 2 (Web):"
Write-Host "     cd apps/web && npm run dev"
Write-Host "`n   Then open: http://localhost:3000`n"
