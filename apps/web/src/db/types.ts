// ─── IndexedDB Type Definitions ───────────────────────────────────────────────
// All local stores used across Phase 2 → 4

// ── Course Packs ─────────────────────────────────────────────────────────────
export type CoursePack_Status =
  | 'NOT_DOWNLOADED'
  | 'DOWNLOADING'
  | 'VERIFYING'
  | 'AVAILABLE_OFFLINE'
  | 'FAILED'
  | 'STALE'

export interface CoursePack {
  id:            string   // packId from manifest
  courseId:      string
  courseTitle:   string
  subject:       string
  version:       number
  manifestHash:  string
  totalSizeMb:   number
  status:        CoursePack_Status
  downloadedAt?: number  // epoch ms
  lastVerifiedAt?: number
  progressPct:   number  // 0-100
  errorMessage?: string
}

// ── Content Items ─────────────────────────────────────────────────────────────
export interface ContentItem {
  id:          string
  courseId:    string
  packId:      string
  type:        'lesson' | 'quiz'
  title:       string
  order:       number
  contentJson: string   // serialised lesson/quiz payload
  sha256:      string
  sizeBytes:   number
  savedAt:     number   // epoch ms
}

// ── Attempts ──────────────────────────────────────────────────────────────────
export type AttemptStatus =
  | 'DRAFT'
  | 'QUEUED'
  | 'SENDING'
  | 'SYNCED'
  | 'RETRYABLE_ERROR'
  | 'ACTION_REQUIRED'

export interface Attempt {
  clientAttemptId: string   // PK — client UUID
  quizVersionId:   string
  courseId:        string
  quizTitle:       string
  status:          AttemptStatus
  idempotencyKey?: string   // frozen at QUEUED
  payloadHash?:    string   // frozen at QUEUED
  startedAt:       number
  finalizedAt?:    number
  lastLocalSaveAt: number
}

// ── Answers ───────────────────────────────────────────────────────────────────
export interface Answer {
  id:              string   // `${clientAttemptId}::${questionId}`
  clientAttemptId: string
  questionId:      string
  selectedOptionId: string | null
  revision:        number
  answerJson:      string
  savedAt:         number
}

// ── Outbox ────────────────────────────────────────────────────────────────────
export type OutboxStatus = 'PENDING' | 'SENDING' | 'SENT' | 'FAILED_RETRYABLE' | 'FAILED_FATAL'

export interface OutboxItem {
  outboxId:        string   // PK — uuid
  clientAttemptId: string
  idempotencyKey:  string
  payload:         string   // JSON string — FROZEN at creation
  payloadHash:     string
  status:          OutboxStatus
  retryCount:      number
  nextRetryAt:     number   // epoch ms
  lastError?:      string
  lockId?:         string   // cross-tab lock token
  lockExpiresAt?:  number
  createdAt:       number
}

// ── Sync Receipts ─────────────────────────────────────────────────────────────
export interface SyncReceipt {
  clientAttemptId: string   // PK
  submissionId:    string
  acceptedAt:      string   // ISO string from server
  receiptHash:     string
  score?:          number
  totalQuestions?: number
  savedAt:         number
}

// ── Progress ──────────────────────────────────────────────────────────────────
export interface LessonProgress {
  id:         string   // `${studentId}::${lessonId}`
  studentId:  string
  lessonId:   string
  courseId:   string
  completed:  boolean   // monotonic — once true, never goes back
  position?:  number    // scroll position or section index
  updatedAt:  number
}

// ── Multilingual Offline Cache ────────────────────────────────────────────────
export interface OfflineLessonTranslation {
  id:                string  // `${lessonId}::${language}`
  serverId:          string
  lessonId:          string
  courseId:          string
  language:          'en' | 'hi' | 'mr'
  translatedTitle:   string
  translatedContent: string
  revision:          number
  approvalStatus:    string
  savedAt:           number
}

export interface OfflineGlossaryEntry {
  id:             string
  lessonId:       string
  courseId:       string
  term:           string
  enDef:          string
  hiDef?:         string | null
  mrDef?:         string | null
  enEquiv?:       string | null
  hiEquiv?:       string | null
  mrEquiv?:       string | null
  approvalStatus: string
  savedAt:        number
}

export interface OfflineAudioCache {
  id:         string  // `${lessonId}::${language}`
  lessonId:   string
  language:   'en' | 'hi' | 'mr'
  fileRef?:   string | null
  blob?:      Blob
  ttsLangCode: string
  savedAt:    number
}
