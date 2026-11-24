# Offline Learning Platform — Demo Guide

## Quick Start

### 1. Prerequisites
- Docker Desktop running
- Node.js v18+
- npm v9+

### 2. Start Infrastructure
```bash
# Start PostgreSQL
docker compose up -d
```

### 3. Set Up API
```bash
cd apps/api
cp .env.example .env     # or create with DATABASE_URL
npx prisma migrate dev --name init
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
npm run start:dev
```

### 4. Start Web
```bash
cd apps/web
npm run dev
```

---

## Demo Flow

### Student Demo
1. Open `http://localhost:3000`
2. Login as **Student** with `aarav@student.com` / `password123`
3. Go to **My Courses** → Download **Biology Fundamentals**
4. Open Chrome DevTools → Network tab → check **Offline** (simulate no internet)
5. Go to **My Courses** → Open Biology → Take the quiz
6. Answer all 5 questions → Submit
7. See quiz complete modal — answers saved locally
8. Go to **Sync Status** → Status shows **Queued** (pending outbox)
9. Uncheck Offline in DevTools
10. Watch auto-sync kick in — status changes to **Synced Successfully**

### Teacher Demo
1. Logout from student
2. Login as **Teacher** with `teacher@school.com` / `password123`
3. See **Submissions** dashboard — Aarav's submission appears
4. Click **View →** to see full detail: score, per-question results, integrity hashes

---

## Idempotent Sync & Conflict Resolution Demo
To demonstrate exactly-once submission guarantees and conflict resolution:
1. Submit quiz (student goes online)
2. While sync is in progress, kill the browser tab (simulates dropped response)
3. Reopen the app — submission shows as "Syncing..."
4. After retry, the original receipt is replayed — **no duplicate** in DB
5. Full conflict rules documented in [docs/CONFLICT_RESOLUTION.md](docs/CONFLICT_RESOLUTION.md) (Monotonic CRDT Progress, Idempotent First-Commit-Wins, Monotonic Answer Revision Sequence).

---

## Demo Reset
```bash
# From project root:
npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/demo-reset.ts
```

This clears all submissions/answers/idempotency records while preserving users and course data.

---

## Credentials
| Role    | Email                    | Password    |
|---------|--------------------------|-------------|
| Student | aarav@student.com        | password123 |
| Student | diya@student.com         | password123 |
| Teacher | teacher@school.com       | password123 |
