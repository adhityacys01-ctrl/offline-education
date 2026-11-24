// ─── API Client ───────────────────────────────────────────────────────────────
// Thin wrapper for all HTTP requests (attaches auth token)
import { useAuthStore } from '@/store/authStore';
const API_BASE = '/api/v1';
function getToken() {
    try {
        const storeToken = useAuthStore.getState().accessToken;
        if (storeToken)
            return storeToken;
    }
    catch { }
    try {
        const raw = localStorage.getItem('olp-auth');
        if (!raw)
            return null;
        const parsed = JSON.parse(raw);
        return parsed?.state?.accessToken ?? null;
    }
    catch {
        return null;
    }
}
async function apiFetch(path, options) {
    const token = getToken();
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options?.headers,
        },
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new ApiError(res.status, err?.errorCode ?? 'UNKNOWN', err?.message ?? res.statusText);
    }
    return res.json();
}
export class ApiError extends Error {
    constructor(statusCode, errorCode, message) {
        super(message);
        Object.defineProperty(this, "statusCode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: statusCode
        });
        Object.defineProperty(this, "errorCode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: errorCode
        });
        this.name = 'ApiError';
    }
}
// ── Typed endpoints ────────────────────────────────────────────────────────────
export function fetchCourses() {
    return apiFetch('/courses');
}
export function fetchCourse(courseId) {
    return apiFetch(`/courses/${courseId}`);
}
export function fetchAllQuizzes() {
    return apiFetch('/courses/meta/quizzes');
}
export function fetchOfflineManifest(courseId) {
    return apiFetch(`/courses/${courseId}/offline-manifest`);
}
export function fetchLesson(lessonId) {
    return apiFetch(`/content/lessons/${lessonId}`);
}
export function fetchQuizVersion(quizVersionId) {
    return apiFetch(`/content/quizzes/${quizVersionId}`);
}
export function submitAttempt(payload, idempotencyKey) {
    return apiFetch('/submissions', {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey },
        body: JSON.stringify(payload),
    });
}
export function reconcileAttempt(clientAttemptId) {
    return apiFetch(`/sync/attempts/${clientAttemptId}`);
}
//# sourceMappingURL=api.js.map