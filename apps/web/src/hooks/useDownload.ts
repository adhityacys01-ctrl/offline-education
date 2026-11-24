import { useState, useEffect, useCallback } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/database'
import {
  downloadCoursePack,
  deleteCoursePack,
} from '@/services/downloadEngine'
import type { CoursePack } from '@/db/types'
import type { CourseListItem } from '@/lib/api'

// ── Live hook: watch all course pack statuses from IndexedDB ──────────────────
export function useCoursePacks() {
  return useLiveQuery(() => db.coursePacks.toArray(), [], []) as CoursePack[]
}

export function useCoursePackStatus(courseId: string) {
  return useLiveQuery(
    () => db.coursePacks.get(`pack-${courseId}-v1`),
    [courseId],
  ) as CoursePack | undefined
}

// ── Download hook with real-time progress ─────────────────────────────────────
export function useDownloadManager() {
  const [downloading, setDownloading] = useState<Record<string, number>>({}) // courseId → pct
  const [errors, setErrors] = useState<Record<string, string>>({})

  const startDownload = useCallback(
    async (course: CourseListItem) => {
      if (downloading[course.id] !== undefined) return // already in progress

      setDownloading((prev) => ({ ...prev, [course.id]: 0 }))
      setErrors((prev) => { const n = { ...prev }; delete n[course.id]; return n })

      try {
        await downloadCoursePack(
          course.id,
          course.title,
          course.subject,
          (pct) => setDownloading((prev) => ({ ...prev, [course.id]: pct })),
        )
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          [course.id]: err instanceof Error ? err.message : 'Download failed',
        }))
      } finally {
        setDownloading((prev) => { const n = { ...prev }; delete n[course.id]; return n })
      }
    },
    [downloading],
  )

  const removeDownload = useCallback(async (courseId: string) => {
    await deleteCoursePack(courseId)
  }, [])

  return { downloading, errors, startDownload, removeDownload }
}

// ── Storage estimate ──────────────────────────────────────────────────────────
export function useStorageEstimate() {
  const [usedGb, setUsedGb] = useState(0)
  const [quotaGb, setQuotaGb] = useState(5)

  useEffect(() => {
    if (!navigator.storage?.estimate) return
    navigator.storage.estimate().then(({ usage = 0, quota = 5e9 }) => {
      setUsedGb(parseFloat((usage / 1e9).toFixed(2)))
      setQuotaGb(parseFloat((quota / 1e9).toFixed(2)))
    })
  }, [])

  return { usedGb, quotaGb, usedPct: Math.round((usedGb / quotaGb) * 100) }
}
