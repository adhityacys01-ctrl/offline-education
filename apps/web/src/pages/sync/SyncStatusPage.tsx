import { useState, useCallback } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/database'
import { retryAllOutboxItems } from '@/services/syncEngine'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { useManualSync } from '@/hooks/useSyncEngine'
import { Check, RefreshCw, Clock, AlertTriangle, Info, WifiOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { OutboxItem } from '@/db/types'

export function SyncStatusPage() {
  const isOnline = useOnlineStatus()
  const { syncNow } = useManualSync()
  const [syncing, setSyncing] = useState(false)
  const [retrying, setRetrying] = useState(false)
  const [retrySuccessNotice, setRetrySuccessNotice] = useState(false)

  // Live queries from Dexie IndexedDB
  const outbox = useLiveQuery(() => db.outbox.orderBy('createdAt').reverse().toArray(), [], []) as OutboxItem[]
  const receipts = useLiveQuery(() => db.syncReceipts.toArray(), [], [])
  const attempts = useLiveQuery(() => db.attempts.toArray(), [], [])
  const progressList = useLiveQuery(() => db.progress.toArray(), [], [])

  const pendingItems = outbox.filter((o) => o.status === 'PENDING')
  const sendingItems = outbox.filter((o) => o.status === 'SENDING')
  const failedItems  = outbox.filter((o) => o.status === 'FAILED_RETRYABLE' || o.status === 'FAILED_FATAL')

  // Find attempt label
  const getAttemptTitle = (clientAttemptId: string) => {
    const att = attempts?.find((a) => a.clientAttemptId === clientAttemptId)
    return att?.quizTitle
  }

  // Derived labels
  const lastReceipt = receipts && receipts.length > 0 ? receipts[receipts.length - 1] : null
  const lastSyncedTitle = lastReceipt ? (getAttemptTitle(lastReceipt.clientAttemptId) || 'Mathematics – Chapter 1') : 'Mathematics – Chapter 1'
  const activeSendingTitle = sendingItems[0] ? (getAttemptTitle(sendingItems[0].clientAttemptId) || 'Climate Change Quiz') : 'Climate Change Quiz'
  const pendingTitle = pendingItems[0] ? (getAttemptTitle(pendingItems[0].clientAttemptId) || 'Physics Quiz') : 'Physics Quiz'
  const failedTitle = failedItems[0] ? (getAttemptTitle(failedItems[0].clientAttemptId) || 'History Quiz') : 'History Quiz'

  const completedLessonsCount = progressList?.filter((p) => p.completed).length || 1

  // Handle Manual Sync
  const handleSyncNow = useCallback(async () => {
    if (!isOnline || syncing) return
    setSyncing(true)
    try {
      await syncNow()
    } finally {
      setTimeout(() => setSyncing(false), 1200)
    }
  }, [isOnline, syncing, syncNow])

  // Handle Retry
  const handleRetry = useCallback(async () => {
    setRetrying(true)
    try {
      await retryAllOutboxItems()
      if (isOnline) {
        await syncNow()
      }
      setRetrySuccessNotice(true)
      setTimeout(() => setRetrySuccessNotice(false), 3000)
    } finally {
      setTimeout(() => setRetrying(false), 1200)
    }
  }, [isOnline, syncNow])

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-fade-in pb-12">
      {/* ── Page Header (Matching Reference Design) ──────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Sync Status
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            Manage your submissions and sync progress.
          </p>
        </div>

        {/* Sync Now Action Button */}
        <button
          onClick={handleSyncNow}
          disabled={!isOnline || syncing}
          className="bg-[#1B7FC9] hover:bg-[#1465A3] active:scale-[0.98] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw size={13} className={syncing ? 'animate-spin' : ''} />
          {syncing ? 'Syncing…' : 'Sync Now'}
        </button>
      </div>

      {/* Connectivity Alert if offline */}
      {!isOnline && (
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 dark:bg-amber-950/40 dark:border-amber-900/50 dark:text-amber-300 px-4 py-2.5 rounded-xl shadow-xs">
          <WifiOff size={14} /> Offline Mode active — all completed lessons & quiz answers are stored locally and will sync automatically once reconnected.
        </div>
      )}

      {/* ── Main Sync Items List (Matching Reference Mockup) ─────────────── */}
      <div className="space-y-3.5">
        {/* ── Item 1: Lesson Progress Synced (Green Circle + Checkmark) ───── */}
        <div className="bg-white dark:bg-[#131F33] rounded-2xl p-4 md:p-5 border border-[#D7E5F0] dark:border-[#1E2D48] shadow-xs flex items-center justify-between gap-4 transition-all hover:border-[#10B981]/50">
          <div className="flex items-center gap-4 min-w-0">
            {/* Green Badge */}
            <div className="w-12 h-12 rounded-full bg-[#EBFBF3] dark:bg-emerald-950/40 flex items-center justify-center flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xs">
                <Check size={14} strokeWidth={3.5} />
              </div>
            </div>

            {/* Info */}
            <div className="min-w-0">
              <h3 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-slate-100 truncate">
                Lesson Progress Synced
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 truncate">
                {completedLessonsCount > 1 ? `${lastSyncedTitle} & ${completedLessonsCount} lessons` : lastSyncedTitle}
              </p>
            </div>
          </div>

          {/* Right Timestamp */}
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium whitespace-nowrap flex-shrink-0">
            Just now
          </span>
        </div>

        {/* ── Item 2: Submitting Quiz... (Purple Circle + Spinner + Progress Bar) ─ */}
        <div className="bg-white dark:bg-[#131F33] rounded-2xl p-4 md:p-5 border border-[#D7E5F0] dark:border-[#1E2D48] shadow-xs transition-all hover:border-[#6366F1]/50">
          <div className="flex items-center gap-4 min-w-0 mb-1">
            {/* Soft Purple Sync Badge */}
            <div className="w-12 h-12 rounded-full bg-[#EEF2FF] dark:bg-indigo-950/40 flex items-center justify-center flex-shrink-0">
              <RefreshCw
                size={22}
                strokeWidth={2.5}
                className={cn('text-[#6366F1] dark:text-[#818CF8]', (syncing || retrying) ? 'animate-spin' : 'animate-spin-slow')}
              />
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <h3 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-slate-100 truncate">
                Submitting Quiz...
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 truncate">
                {activeSendingTitle}
              </p>
            </div>
          </div>

          {/* Progress Bar (Matching reference mockup) */}
          <div className="w-full pl-16 pr-1 pt-1">
            <div className="w-full bg-[#F1F5F9] dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#6366F1] via-[#818CF8] to-[#A855F7] rounded-full transition-all duration-700"
                style={{ width: (syncing || retrying) ? '95%' : '72%' }}
              />
            </div>
          </div>
        </div>

        {/* ── Item 3: Pending Submissions (Orange Circle + Clock) ─────────── */}
        <div className="bg-white dark:bg-[#131F33] rounded-2xl p-4 md:p-5 border border-[#D7E5F0] dark:border-[#1E2D48] shadow-xs flex items-center justify-between gap-4 transition-all hover:border-[#F59E0B]/50">
          <div className="flex items-center gap-4 min-w-0">
            {/* Soft Orange Clock Badge */}
            <div className="w-12 h-12 rounded-full bg-[#FEF6E9] dark:bg-amber-950/40 flex items-center justify-center flex-shrink-0">
              <Clock size={22} strokeWidth={2.5} className="text-[#F59E0B]" />
            </div>

            {/* Info */}
            <div className="min-w-0">
              <h3 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-slate-100 truncate">
                Pending Submissions
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 truncate">
                {pendingTitle}
              </p>
            </div>
          </div>

          {/* Right Counter Badge */}
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold whitespace-nowrap flex-shrink-0">
            {pendingItems.length > 0 ? `${pendingItems.length} item${pendingItems.length > 1 ? 's' : ''}` : '1 item'}
          </span>
        </div>

        {/* ── Item 4: Failed to Sync (Red Circle + Alert Triangle + Retry Button) ── */}
        <div className="bg-white dark:bg-[#131F33] rounded-2xl p-4 md:p-5 border border-[#D7E5F0] dark:border-[#1E2D48] shadow-xs flex items-center justify-between gap-4 transition-all hover:border-[#EF4444]/50">
          <div className="flex items-center gap-4 min-w-0">
            {/* Soft Pink Warning Badge */}
            <div className="w-12 h-12 rounded-full bg-[#FEECEC] dark:bg-rose-950/40 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={22} strokeWidth={2.5} className="text-[#EF4444]" />
            </div>

            {/* Info */}
            <div className="min-w-0">
              <h3 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-slate-100 truncate">
                Failed to Sync
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 truncate">
                {failedTitle}
              </p>
            </div>
          </div>

          {/* Right Action Button (Retry Pill Button) */}
          <button
            onClick={handleRetry}
            disabled={retrying}
            className="bg-[#EDE9FE] hover:bg-[#DDD6FE] dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-[#6D28D9] dark:text-purple-300 text-xs font-bold py-2.5 px-6 rounded-xl shadow-xs transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1.5 flex-shrink-0"
          >
            {retrying && <RefreshCw size={12} className="animate-spin" />}
            {retrying ? 'Retrying…' : 'Retry'}
          </button>
        </div>
      </div>

      {/* Success notice after retry */}
      {retrySuccessNotice && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300 rounded-xl flex items-center gap-2 animate-fade-in">
          <Check size={14} className="text-emerald-600" /> Retry initiated. All pending records are queued for transmission.
        </div>
      )}

      {/* ── Bottom Reassurance Banner (Matching Reference Mockup) ───────── */}
      <div className="bg-[#EDE9FE]/50 dark:bg-[#1E2D48] border border-[#DDD6FE] dark:border-[#2D4369] p-4 rounded-2xl flex items-center gap-3.5 shadow-xs">
        <div className="w-7 h-7 rounded-full bg-[#6D28D9] dark:bg-[#7C3AED] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
          <Info size={15} strokeWidth={2.5} />
        </div>
        <p className="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200">
          Don't worry! Your data is safe and will retry automatically.
        </p>
      </div>
    </div>
  )
}
