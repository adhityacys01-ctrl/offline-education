import { useState, useCallback } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/database'
import { retryOutboxItem, retryAllOutboxItems } from '@/services/syncEngine'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { useManualSync } from '@/hooks/useSyncEngine'
import { formatRelativeTime } from '@/lib/utils'
import { RefreshCw, CheckCircle, Clock, AlertCircle, Wifi, WifiOff, RotateCcw, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { OutboxItem } from '@/db/types'

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_UI: Record<OutboxItem['status'], { label: string; badgeCls: string; iconCls: string }> = {
  PENDING:          { label: 'Pending sync',       badgeCls: 'badge-warning', iconCls: 'bg-warning/10 text-warning-dark' },
  SENDING:          { label: 'Syncing…',            badgeCls: 'badge-syncing', iconCls: 'bg-syncing/10 text-syncing-dark' },
  SENT:             { label: 'Synced',              badgeCls: 'badge-success', iconCls: 'bg-success/10 text-success-dark' },
  FAILED_RETRYABLE: { label: 'Sync interrupted',   badgeCls: 'badge-danger',  iconCls: 'bg-danger/10 text-danger' },
  FAILED_FATAL:     { label: 'Needs attention',     badgeCls: 'badge-danger',  iconCls: 'bg-danger/10 text-danger' },
}

function StatusIcon({ status }: { status: OutboxItem['status'] }) {
  const cls = STATUS_UI[status].iconCls
  if (status === 'SENDING')          return <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', cls)}><RefreshCw size={15} className="animate-spin" /></div>
  if (status === 'SENT')             return <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', cls)}><CheckCircle size={15} /></div>
  if (status === 'PENDING')          return <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', cls)}><Clock size={15} /></div>
  return                                    <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', cls)}><AlertCircle size={15} /></div>
}

export function SyncStatusPage() {
  const isOnline          = useOnlineStatus()
  const { syncNow }       = useManualSync()
  const [syncing, setSyncing] = useState(false)

  // Live data from IndexedDB
  const outbox    = useLiveQuery(() => db.outbox.orderBy('createdAt').reverse().toArray(), [], []) as OutboxItem[]
  const receipts  = useLiveQuery(() => db.syncReceipts.toArray(), [], [])
  const attempts  = useLiveQuery(() => db.attempts.toArray(), [], [])

  const pending   = outbox.filter((o) => o.status === 'PENDING').length
  const sending   = outbox.filter((o) => o.status === 'SENDING').length
  const failed    = outbox.filter((o) => o.status === 'FAILED_RETRYABLE' || o.status === 'FAILED_FATAL').length
  const synced    = receipts?.length ?? 0

  const handleSyncNow = useCallback(async () => {
    if (!isOnline || syncing) return
    setSyncing(true)
    try { await syncNow() }
    finally { setTimeout(() => setSyncing(false), 1000) }
  }, [isOnline, syncing, syncNow])

  const handleRetryAll = useCallback(async () => {
    await retryAllOutboxItems()
  }, [])

  const handleRetryItem = useCallback(async (outboxId: string) => {
    await retryOutboxItem(outboxId)
  }, [])

  // Find quiz title from attempts store
  const getAttemptLabel = (clientAttemptId: string) => {
    const attempt = attempts?.find((a) => a.clientAttemptId === clientAttemptId)
    return attempt?.quizTitle ?? 'Quiz Submission'
  }

  return (
    <div className="space-y-5 max-w-2xl animate-fade-in">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Sync Status</h1>
        </div>
        <div className="flex items-center gap-2">
          {failed > 0 && (
            <button onClick={handleRetryAll} className="btn-outline text-sm gap-1.5 py-2">
              <RotateCcw size={13} /> Retry All
            </button>
          )}
          <button
            onClick={handleSyncNow}
            disabled={!isOnline || syncing}
            className="btn-primary text-sm gap-1.5 py-2 disabled:opacity-50"
          >
            <RefreshCw size={13} className={syncing ? 'animate-spin' : ''} />
            {syncing ? 'Syncing…' : 'Sync Now'}
          </button>
        </div>
      </div>

      {/* ── Connectivity banner ───────────────────────────────────────────── */}
      <div className={cn(
        'flex items-center gap-3 p-3 rounded-xl text-sm font-medium',
        isOnline ? 'bg-success/10 text-success-dark' : 'bg-warning/10 text-warning-dark'
      )}>
        {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
        <span>
          {isOnline
            ? 'You are online — submissions will sync automatically.'
            : 'You are offline — answers are saved and will sync when connection is restored.'}
        </span>
      </div>

      {/* ── Summary stats ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Pending',    value: pending,  cls: 'text-warning-dark',  bg: 'bg-warning/10' },
          { label: 'Syncing',    value: sending,  cls: 'text-syncing-dark',  bg: 'bg-syncing/10' },
          { label: 'Failed',     value: failed,   cls: 'text-danger',        bg: 'bg-danger/10'  },
          { label: 'Synced',     value: synced,   cls: 'text-success-dark',  bg: 'bg-success/10' },
        ].map(({ label, value, cls, bg }) => (
          <div key={label} className={cn('card-sm text-center rounded-xl py-3', bg)}>
            <p className={cn('text-2xl font-extrabold', cls)}>{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Outbox list ───────────────────────────────────────────────────── */}
      {outbox.length === 0 ? (
        <div className="card text-center py-12">
          <CheckCircle size={36} className="text-success mx-auto mb-3" />
          <p className="font-semibold text-slate-700">All caught up!</p>
          <p className="text-sm text-slate-500 mt-1">No pending submissions.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-700">Outbox Queue</h2>
          {outbox.map((item) => {
            const ui = STATUS_UI[item.status]
            return (
              <div key={item.outboxId} className="card flex items-center gap-3">
                <StatusIcon status={item.status} />

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate">
                    {getAttemptLabel(item.clientAttemptId)}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap mt-0.5">
                    <span className={cn('badge text-xs', ui.badgeCls)}>{ui.label}</span>
                    {item.retryCount > 0 && (
                      <span className="text-xs text-slate-400">Attempt #{item.retryCount + 1}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    ID: {item.clientAttemptId.slice(0, 12)}…
                  </p>
                  {item.lastError && item.status !== 'SENT' && (
                    <p className="text-xs text-danger mt-0.5 truncate">{item.lastError}</p>
                  )}
                  {item.status === 'FAILED_RETRYABLE' && item.nextRetryAt > Date.now() && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      Next retry {formatRelativeTime(new Date(item.nextRetryAt).toISOString())}
                    </p>
                  )}
                </div>

                {/* Actions */}
                {(item.status === 'FAILED_RETRYABLE' || item.status === 'FAILED_FATAL') && (
                  <button
                    onClick={() => handleRetryItem(item.outboxId)}
                    className="btn-primary text-xs px-3 py-2 gap-1 flex-shrink-0"
                  >
                    <RotateCcw size={11} /> Retry
                  </button>
                )}
                {item.status === 'SENT' && (
                  <CheckCircle size={18} className="text-success flex-shrink-0" />
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* ── Synced receipts ───────────────────────────────────────────────── */}
      {(receipts?.length ?? 0) > 0 && (
        <div>
          <h2 className="text-sm font-bold text-slate-700 mb-3">Sync Receipts</h2>
          <div className="space-y-2">
            {receipts?.map((r) => (
              <div key={r.clientAttemptId} className="card-sm flex items-center gap-3 bg-success/5 border border-success/20">
                <CheckCircle size={16} className="text-success flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    Submission #{r.submissionId.slice(0, 8)}…
                  </p>
                  <p className="text-xs text-slate-500">
                    Server accepted at {formatRelativeTime(r.acceptedAt)}
                    {r.score !== undefined && ` · Score: ${r.score}/${r.totalQuestions}`}
                  </p>
                  <p className="text-xs text-slate-400 font-mono">
                    Receipt: {r.receiptHash.slice(0, 16)}…
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Reassurance ───────────────────────────────────────────────────── */}
      <div className="p-4 bg-[#E1F0FA] border border-[#CBE4F6] rounded-xl text-xs text-[#1465A3] flex items-start gap-2 shadow-xs">
        <ShieldCheck size={18} className="flex-shrink-0 text-[#1B7FC9] mt-0.5" />
        <div>
          <strong>Your answers are safe.</strong> All submissions are durably stored on this device
          and will retry automatically — even if you close the app or restart your device.
        </div>
      </div>
    </div>
  )
}
