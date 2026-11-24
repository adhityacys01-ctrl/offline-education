import { useState } from 'react'
import { RefreshCw, CheckCircle2, Clock, AlertTriangle, Search, X } from 'lucide-react'

interface StudentSyncItem {
  id: string
  studentName: string
  grade: string
  course: string
  quizTitle: string
  status: 'Synchronized' | 'Pending' | 'Action Required'
  clientAttemptId: string
  receiptHash: string
  lastSyncAt: string
  retryCount: number
}

const SYNC_ITEMS: StudentSyncItem[] = [
  {
    id: 'sync-1',
    studentName: 'Aarav Sharma',
    grade: 'Class 10',
    course: 'Mathematics',
    quizTitle: 'Algebraic Expressions & Polynomials',
    status: 'Synchronized',
    clientAttemptId: 'ca-8472-aarav-math',
    receiptHash: 'sha256-receipt-a749bf841bce82e9',
    lastSyncAt: '10 min ago',
    retryCount: 0,
  },
  {
    id: 'sync-2',
    studentName: 'Diya Patel',
    grade: 'Class 10',
    course: 'Science',
    quizTitle: 'Cell Biology & Living Systems',
    status: 'Synchronized',
    clientAttemptId: 'ca-9214-diya-science',
    receiptHash: 'sha256-receipt-f923b7194a2b9183',
    lastSyncAt: '25 min ago',
    retryCount: 0,
  },
  {
    id: 'sync-3',
    studentName: 'Rohan Mehta',
    grade: 'Class 10',
    course: 'History',
    quizTitle: 'Ancient Civilizations of India',
    status: 'Pending',
    clientAttemptId: 'ca-1082-rohan-history',
    receiptHash: 'Pending server response',
    lastSyncAt: 'Offline queued (2 hrs ago)',
    retryCount: 1,
  },
  {
    id: 'sync-4',
    studentName: 'Sneha Iyer',
    grade: 'Class 10',
    course: 'Environmental Science',
    quizTitle: 'Ecology & Natural Habitats',
    status: 'Action Required',
    clientAttemptId: 'ca-4102-sneha-envs',
    receiptHash: 'Network socket closed',
    lastSyncAt: 'Retrying with backoff (5s)',
    retryCount: 3,
  },
]

export default function TeacherSyncMonitoringPage() {
  const [filter, setFilter] = useState<'All' | 'Synchronized' | 'Pending' | 'Action Required'>('All')
  const [search, setSearch] = useState('')
  const [items, setItems] = useState<StudentSyncItem[]>(SYNC_ITEMS)
  const [inspectItem, setInspectItem] = useState<StudentSyncItem | null>(null)
  const [reconcilingId, setReconcilingId] = useState<string | null>(null)

  const filteredItems = items.filter((item) => {
    const matchesFilter = filter === 'All' || item.status === filter
    const matchesSearch =
      item.studentName.toLowerCase().includes(search.toLowerCase()) ||
      item.course.toLowerCase().includes(search.toLowerCase()) ||
      item.quizTitle.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const syncCounts = {
    all: items.length,
    synced: items.filter((i) => i.status === 'Synchronized').length,
    pending: items.filter((i) => i.status === 'Pending').length,
    attention: items.filter((i) => i.status === 'Action Required').length,
  }

  const handleForceReconcile = (id: string) => {
    setReconcilingId(id)
    setTimeout(() => {
      setItems((prev) =>
        prev.map((i) =>
          i.id === id
            ? {
                ...i,
                status: 'Synchronized',
                receiptHash: `sha256-receipt-reconciled-${Date.now().toString(16)}`,
                lastSyncAt: 'Just now',
                retryCount: 0,
              }
            : i
        )
      )
      setReconcilingId(null)
    }, 1000)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* ── Page Header (Strictly NO subheadings) ─────────────────────────── */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Sync Monitoring
        </h1>
        <button
          onClick={() => {
            setItems((prev) =>
              prev.map((i) => (i.status === 'Pending' ? { ...i, lastSyncAt: 'Refreshed' } : i))
            )
          }}
          className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#131F33] border border-[#D7E5F0] dark:border-[#1E2D48] text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-[#1B7FC9] flex items-center gap-1.5 shadow-xs transition-all"
        >
          <RefreshCw size={14} />
          Refresh Sync State
        </button>
      </div>

      {/* ── Top Status Cards ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Synchronized */}
        <div
          onClick={() => setFilter('Synchronized')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            filter === 'Synchronized'
              ? 'bg-emerald-50/80 border-emerald-500 shadow-xs'
              : 'bg-white dark:bg-[#131F33] border-[#D7E5F0] dark:border-[#1E2D48] hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Synchronized</span>
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">{syncCounts.synced}</p>
        </div>

        {/* Pending Upload */}
        <div
          onClick={() => setFilter('Pending')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            filter === 'Pending'
              ? 'bg-amber-50/80 border-amber-500 shadow-xs'
              : 'bg-white dark:bg-[#131F33] border-[#D7E5F0] dark:border-[#1E2D48] hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Pending Upload</span>
            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">{syncCounts.pending}</p>
        </div>

        {/* Requires Attention */}
        <div
          onClick={() => setFilter('Action Required')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            filter === 'Action Required'
              ? 'bg-rose-50/80 border-rose-500 shadow-xs'
              : 'bg-white dark:bg-[#131F33] border-[#D7E5F0] dark:border-[#1E2D48] hover:border-rose-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Requires Attention</span>
            <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">{syncCounts.attention}</p>
        </div>
      </div>

      {/* ── Filter Pills & Search ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {(['All', 'Synchronized', 'Pending', 'Action Required'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === tab
                  ? 'bg-[#1B7FC9] text-white shadow-xs'
                  : 'bg-white dark:bg-[#131F33] border border-[#D7E5F0] dark:border-[#1E2D48] text-slate-600 dark:text-slate-300 hover:border-[#1B7FC9]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search student or quiz..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 bg-white dark:bg-[#131F33] border border-[#D7E5F0] dark:border-[#1E2D48] rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]"
          />
        </div>
      </div>

      {/* ── Sync Table ────────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#D7E5F0] dark:border-[#1E2D48] bg-[#F8FAFC] dark:bg-[#0E1726]/50">
                <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Student
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Assessment
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Sync Status
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Last Sync
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBF2F7] dark:divide-[#1A2E46]">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#F0F5FA] dark:hover:bg-[#1A2E46]/40 transition-colors">
                  {/* Student */}
                  <td className="py-4 px-5">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {item.studentName}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {item.grade} • {item.course}
                    </p>
                  </td>

                  {/* Assessment */}
                  <td className="py-4 px-5">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {item.quizTitle}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5">
                    {item.status === 'Synchronized' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 size={12} />
                        Synchronized
                      </span>
                    )}
                    {item.status === 'Pending' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                        <Clock size={12} />
                        Pending Upload
                      </span>
                    )}
                    {item.status === 'Action Required' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400">
                        <AlertTriangle size={12} />
                        Action Required
                      </span>
                    )}
                  </td>

                  {/* Last Sync */}
                  <td className="py-4 px-5 text-xs text-slate-500 font-medium">
                    {item.lastSyncAt}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-5 text-right space-x-2">
                    <button
                      onClick={() => setInspectItem(item)}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg border border-[#D7E5F0] hover:border-[#1B7FC9] text-[#1465A3] dark:text-[#38BDF8] transition-all"
                    >
                      Inspect
                    </button>
                    {item.status !== 'Synchronized' && (
                      <button
                        onClick={() => handleForceReconcile(item.id)}
                        disabled={reconcilingId === item.id}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#1B7FC9] hover:bg-[#1465A3] text-white transition-all"
                      >
                        {reconcilingId === item.id ? 'Reconciling...' : 'Reconcile'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Inspect Modal ─────────────────────────────────────────────────── */}
      {inspectItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] max-w-md w-full p-6 shadow-xl animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#D7E5F0] dark:border-[#1E2D48]">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Sync Item Verification
              </h2>
              <button
                onClick={() => setInspectItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0E1726] border border-[#D7E5F0]">
                <p className="font-sans font-bold text-slate-700 dark:text-slate-300 text-[11px] mb-1">
                  Student & Course
                </p>
                <p className="font-sans text-xs text-slate-900 dark:text-slate-100 font-semibold">
                  {inspectItem.studentName} ({inspectItem.grade})
                </p>
                <p className="font-sans text-xs text-slate-500">{inspectItem.quizTitle}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0E1726] border border-[#D7E5F0]">
                <p className="font-sans font-bold text-slate-700 dark:text-slate-300 text-[11px] mb-1">
                  Client Attempt ID
                </p>
                <p className="break-all text-slate-600 dark:text-slate-300">{inspectItem.clientAttemptId}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0E1726] border border-[#D7E5F0]">
                <p className="font-sans font-bold text-slate-700 dark:text-slate-300 text-[11px] mb-1">
                  Receipt Hash (SHA-256)
                </p>
                <p className="break-all text-slate-600 dark:text-slate-300">{inspectItem.receiptHash}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0E1726] border border-[#D7E5F0]">
                <p className="font-sans font-bold text-slate-700 dark:text-slate-300 text-[11px] mb-1">
                  Retry Attempts
                </p>
                <p className="font-sans text-slate-600 dark:text-slate-300 font-bold">{inspectItem.retryCount} Retries</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D7E5F0] dark:border-[#1E2D48] flex justify-end">
              <button
                onClick={() => setInspectItem(null)}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-[#1B7FC9] hover:bg-[#1465A3] text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
