import { useState, useEffect } from 'react'
import { Download, Filter } from 'lucide-react'
import api from '../../services/api'

interface AuditEntry {
  id: string
  actorId: string | null
  actorName?: string | null
  eventType: string
  correlationId: string | null
  clientAttemptId: string | null
  idempotencyKey: string | null
  metadata: unknown
  createdAt: string
}

const MOCK_EVENTS: AuditEntry[] = [
  { id: '1', actorId: 's1', actorName: 'Aarav Sharma', eventType: 'submission.created', correlationId: 'corr-001', clientAttemptId: 'ca-001', idempotencyKey: 'ik-001', metadata: { quizId: 'q1' }, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '2', actorId: 's2', actorName: 'Diya Patel', eventType: 'submission.duplicate_blocked', correlationId: 'corr-002', clientAttemptId: 'ca-002', idempotencyKey: 'ik-002', metadata: {}, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: '3', actorId: 's1', actorName: 'Aarav Sharma', eventType: 'submission.created', correlationId: 'corr-003', clientAttemptId: 'ca-003', idempotencyKey: 'ik-003', metadata: { quizId: 'q2' }, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '4', actorId: null, actorName: 'System', eventType: 'sync.retry_attempted', correlationId: 'corr-004', clientAttemptId: null, idempotencyKey: 'ik-001', metadata: { retryCount: 1 }, createdAt: new Date(Date.now() - 1800000).toISOString() },
  { id: '5', actorId: 's3', actorName: 'Priya Singh', eventType: 'submission.created', correlationId: 'corr-005', clientAttemptId: 'ca-005', idempotencyKey: 'ik-005', metadata: { quizId: 'q3' }, createdAt: new Date(Date.now() - 43200000).toISOString() },
]

const EVENT_COLORS: Record<string, string> = {
  'submission.created': 'bg-green-100 text-green-700',
  'submission.duplicate_blocked': 'bg-red-100 text-red-700',
  'sync.retry_attempted': 'bg-amber-100 text-amber-700',
}

export default function AdminAuditLogPage() {
  const [events, setEvents] = useState<AuditEntry[]>(MOCK_EVENTS)
  const [typeFilter, setTypeFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/audit-logs')
      .then((r: { data: AuditEntry[] }) => { if (r.data?.length > 0) setEvents(r.data) })
      .catch(() => {/* use mock */})
      .finally(() => setLoading(false))
  }, [])

  const eventTypes = Array.from(new Set(events.map(e => e.eventType)))

  const filtered = typeFilter === 'all' ? events : events.filter(e => e.eventType === typeFilter)

  const exportCsv = () => {
    const rows = [['ID', 'Actor', 'Event Type', 'Correlation ID', 'Created At']]
    filtered.forEach(e => rows.push([e.id, e.actorName ?? '', e.eventType, e.correlationId ?? '', e.createdAt]))
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit-log-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
        </div>
        <button
          onClick={exportCsv}
          className="flex items-center gap-2 px-4 py-2 bg-[#1B7FC9] text-white rounded-lg text-sm font-medium hover:bg-[#1668a8] transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="flex items-center gap-3">
        <Filter className="w-4 h-4 text-gray-400" />
        <select
          className="px-3 py-2 border border-[#C5DCF0] rounded-lg text-sm bg-white focus:outline-none"
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
        >
          <option value="all">All Event Types</option>
          {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <span className="text-sm text-gray-500">{filtered.length} events</span>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-[#C5DCF0] h-64 animate-pulse" />
      ) : (
        <div className="bg-white rounded-xl border border-[#C5DCF0] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#F0F5FA] border-b border-[#C5DCF0]">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Event Type</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Actor</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Correlation ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Idempotency Key</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(event => (
                <tr key={event.id} className="hover:bg-[#F8FBFF]">
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${EVENT_COLORS[event.eventType] ?? 'bg-gray-100 text-gray-700'}`}>
                      {event.eventType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{event.actorName ?? 'System'}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{event.correlationId ?? '—'}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{event.idempotencyKey ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(event.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">No audit events found</div>
          )}
        </div>
      )}
    </div>
  )
}
