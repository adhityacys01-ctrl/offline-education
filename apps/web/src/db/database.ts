import Dexie, { type Table } from 'dexie'
import type {
  CoursePack,
  ContentItem,
  Attempt,
  Answer,
  OutboxItem,
  SyncReceipt,
  LessonProgress,
} from './types'

export class OfflineLearningDB extends Dexie {
  // ── Tables ─────────────────────────────────────────────────────────────────
  coursePacks!:   Table<CoursePack,     string>
  contentItems!:  Table<ContentItem,    string>
  attempts!:      Table<Attempt,        string>
  answers!:       Table<Answer,         string>
  outbox!:        Table<OutboxItem,     string>
  syncReceipts!:  Table<SyncReceipt,    string>
  progress!:      Table<LessonProgress, string>

  constructor() {
    super('OfflineLearningPlatform')

    this.version(1).stores({
      // Primary key first, then indexed fields
      coursePacks:  'id, courseId, status',
      contentItems: 'id, courseId, packId, type, [courseId+type]',
      attempts:     'clientAttemptId, quizVersionId, courseId, status',
      answers:      'id, clientAttemptId, questionId, [clientAttemptId+questionId]',
      outbox:       'outboxId, clientAttemptId, status, nextRetryAt',
      syncReceipts: 'clientAttemptId, submissionId',
      progress:     'id, studentId, lessonId, courseId, [studentId+courseId]',
    })
  }
}

// Singleton instance
export const db = new OfflineLearningDB()

// ── Convenience helpers ────────────────────────────────────────────────────────

/** Save or update a course pack entry */
export async function upsertCoursePack(pack: CoursePack): Promise<void> {
  await db.coursePacks.put(pack)
}

/** Atomically save an answer, incrementing revision */
export async function saveAnswer(answer: Answer): Promise<void> {
  await db.transaction('rw', [db.attempts, db.answers], async () => {
    await db.answers.put(answer)
    await db.attempts.where('clientAttemptId').equals(answer.clientAttemptId).modify({
      lastLocalSaveAt: Date.now(),
    })
  })
}

/** Get all answers for an attempt, ordered by questionId */
export async function getAnswersForAttempt(clientAttemptId: string): Promise<Answer[]> {
  return db.answers.where('clientAttemptId').equals(clientAttemptId).toArray()
}

/** Mark a lesson as completed (monotonic — cannot un-complete) */
export async function markLessonComplete(
  studentId: string,
  lessonId: string,
  courseId: string,
): Promise<void> {
  const id = `${studentId}::${lessonId}`
  const existing = await db.progress.get(id)
  if (existing?.completed) return // already complete, monotonic
  await db.progress.put({
    id, studentId, lessonId, courseId,
    completed: true,
    updatedAt: Date.now(),
  })
}
