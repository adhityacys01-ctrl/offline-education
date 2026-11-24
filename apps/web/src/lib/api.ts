// ─── API Client ───────────────────────────────────────────────────────────────
// Thin wrapper for all HTTP requests (attaches auth token)

import { useAuthStore } from '@/store/authStore'

const API_BASE = '/api/v1'

function getToken(): string | null {
  try {
    const storeToken = useAuthStore.getState().accessToken
    if (storeToken) return storeToken
  } catch {}

  try {
    const raw = localStorage.getItem('olp-auth')
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed?.state?.accessToken ?? null
  } catch {
    return null
  }
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken()
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new ApiError(res.status, err?.errorCode ?? 'UNKNOWN', err?.message ?? res.statusText)
  }
  return res.json() as Promise<T>
}

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly errorCode: string,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// ── Typed endpoints ────────────────────────────────────────────────────────────

export function fetchCourses() {
  return apiFetch<CourseListItem[]>('/courses')
}

export function fetchCourse(courseId: string) {
  return apiFetch<CourseDetail>(`/courses/${courseId}`)
}

export function fetchAllQuizzes() {
  return apiFetch<QuizListItem[]>('/courses/meta/quizzes')
}

export function fetchOfflineManifest(courseId: string) {
  return apiFetch<OfflineManifest>(`/courses/${courseId}/offline-manifest`)
}

export function fetchLesson(lessonId: string) {
  return apiFetch<LessonContent>(`/content/lessons/${lessonId}`)
}

export function fetchQuizVersion(quizVersionId: string) {
  return apiFetch<QuizContent>(`/content/quizzes/${quizVersionId}`)
}

export function submitAttempt(payload: SubmitPayload, idempotencyKey: string) {
  return apiFetch<SubmissionReceipt>('/submissions', {
    method: 'POST',
    headers: { 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify(payload),
  })
}

export function reconcileAttempt(clientAttemptId: string) {
  return apiFetch<ReconcileResponse>(`/sync/attempts/${clientAttemptId}`)
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CourseListItem {
  id: string; title: string; subject: string; description: string
  coverImageUrl?: string; lessonCount: number; quizCount: number; offlinePackageSizeMb: number
}

export interface CourseDetail {
  id: string
  title: string
  subject: string
  description: string
  coverImageUrl?: string
  offlinePackageSizeMb: number
  lessons: { id: string; title: string; order: number; keyPoints: string[] }[]
  quizVersions: { id: string; title: string; version: number }[]
}

export interface QuizListItem {
  quizVersionId: string
  courseId: string
  courseTitle: string
  subject: string
  title: string
  version: number
  questionCount: number
  timeLimitMins: number
}

export interface OfflineManifest {
  packId: string; courseId: string; courseTitle: string
  version: number; manifestHash: string; totalSizeMb: number
  contentItems: ManifestItem[]
}

export interface ManifestItem {
  id: string; type: 'lesson' | 'quiz' | 'asset'
  url: string; sha256: string; sizeBytes: number; title: string; order: number
}

export interface LessonContent {
  id: string; courseId: string; courseTitle: string; subject: string
  title: string; order: number; contentHtml: string; keyPoints: string[]
  mediaUrl?: string; mediaType?: string; contentHash: string; updatedAt: string
}

export interface QuizContent {
  id: string; courseId: string; courseTitle: string; title: string
  version: number; contentHash: string
  questions: { id: string; order: number; prompt: string; options: { id: string; label: string; text: string }[] }[]
}

export interface SubmitPayload {
  clientAttemptId: string; quizVersionId: string
  idempotencyKey: string; payloadHash: string
  answers: { questionId: string; selectedOptionId: string | null; revision: number }[]
  startedAt: string; finalizedAt: string
}

export interface SubmissionReceipt {
  submissionId: string; clientAttemptId: string; studentId: string
  quizVersionId: string; acceptedAt: string; status: string
  score?: number; totalQuestions?: number; receiptHash: string
}

export interface ReconcileResponse {
  found: boolean; submissionId?: string; status?: string
  acceptedAt?: string; receiptHash?: string
}
