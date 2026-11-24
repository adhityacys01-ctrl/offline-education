# 🎓 Offline Learning Platform

> **Learn Anytime, Anywhere.** Download lessons, take quizzes offline, sync progress automatically.

Built for HackKumbh — an offline-first educational PWA with guaranteed data durability, idempotent sync, and a production-grade distributed systems foundation.

---

## 🏗️ Monorepo Structure

```
offline-learning-platform/
├── apps/
│   ├── web/          # React + Vite + TypeScript + Tailwind CSS (PWA)
│   └── api/          # NestJS + Prisma + PostgreSQL
├── packages/
│   └── contracts/    # Shared TypeScript DTOs & types
├── docker-compose.yml
└── package.json      # Workspace root
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 20
- Docker Desktop (for PostgreSQL)
- npm ≥ 10

### 1. Start the Database
```bash
docker compose up -d postgres
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set up the API
```bash
# From repo root
cd apps/api

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed sample data
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```

### 4. Start Development Servers

**Terminal 1 — API:**
```bash
cd apps/api
npm run start:dev
```
API runs at: http://localhost:3001/api/v1  
Swagger docs: http://localhost:3001/docs

**Terminal 2 — Web:**
```bash
cd apps/web
npm run dev
```
App runs at: http://localhost:5173

---

## 🔐 Seed Credentials

| Role    | Email                   | Password     |
|---------|-------------------------|--------------|
| Student | aarav@student.com       | password123  |
| Student | diya@student.com        | password123  |
| Teacher | teacher@school.com      | password123  |

---

## 📦 Phase Roadmap

| Phase | Status    | Description                               |
|-------|-----------|-------------------------------------------|
| 1     | ✅ Done    | Monorepo, Auth, Prisma schema, DB seed    |
| 2     | 🔜 Next    | Offline manifests, download engine        |
| 3     | 🔜 Planned | Local-first quiz player, IndexedDB engine |
| 4     | 🔜 Planned | Outbox sync & retry protocol              |
| 5     | 🔜 Planned | Idempotent backend submission             |
| 6     | 🔜 Planned | Teacher portal & audit workspace          |
| 7     | 🔜 Planned | Fault injection tests & demo hardening    |

---

## 🛡️ Key Guarantees

- **Zero answer loss** — all quiz answers written to IndexedDB before UI confirms
- **Exactly-once submission** — idempotency keys + DB unique constraints prevent duplicates
- **Crash recovery** — full draft restoration after hard browser kill
- **Transparent sync UX** — never shows "Submission Failed"; always "Sync interrupted, retrying"
