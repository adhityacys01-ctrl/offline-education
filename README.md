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
| 2     | ✅ Done    | Offline manifests, download engine        |
| 3     | ✅ Done    | Local-first quiz player, IndexedDB engine |
| 4     | ✅ Done    | Outbox sync & retry protocol              |
| 5     | ✅ Done    | Idempotent backend submission             |
| 6     | ✅ Done    | Teacher portal & audit workspace          |
| 7     | ✅ Done    | Fault injection tests & demo hardening    |

---

## 🛡️ Key Guarantees & Conflict Resolution

- **Zero answer loss** — all quiz answers written to IndexedDB before UI confirms
- **Exactly-once submission** — idempotency keys + DB unique constraints prevent duplicates
- **Crash recovery** — full draft restoration after hard browser kill
- **Transparent sync UX** — live sync status badges with automatic retry & exponential backoff
- **Documented Conflict Resolution** — full specification in [CONFLICT_RESOLUTION.md](docs/CONFLICT_RESOLUTION.md):
  1. *Lesson Progress*: Monotonic CRDT Grow-Only rule (completed status never regresses).
  2. *Quiz Submissions*: Idempotent First-Commit-Wins with SHA-256 payload integrity check.
  3. *Answer Drafts*: Monotonic revision sequencing for local multi-edit consistency.
  4. *Content Integrity*: Content-addressable SHA-256 hash validation for course downloads.
  5. *Ambiguous Drops*: Reconcile-before-resend check before re-uploading dropped connections.
