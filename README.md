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
