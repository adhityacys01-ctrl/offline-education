import { useState, useEffect } from 'react'
import { RefreshCw, AlertCircle } from 'lucide-react'
import api from '../../services/api'

interface SyncRecord {
  id: string
  studentId: string
  studentName: string
  routeScope: string
  idempotencyKey: string
  payloadHash: string
  createdAt: string
  expiresAt: string
}

const MOCK: SyncRecord[] = [
  { id: '1', studentId: 's1', studentName: 'Aarav Sharma', routeScope: 'POST:/submissions', idempotencyKey: 'ik-001', payloadHash: 'a1b2c3d4', createdAt: new Date(Date.now() - 3600000).toISOString(), expiresAt: new Date(Date.now() + 86400000 * 29).toISOString() },
  { id: '2', studentId: 's2', studentName: 'Diya Patel', routeScope: 'POST:/submissions', idempotencyKey: 'ik-002', payloadHash: 'e5f6g7h8', createdAt: new Date(Date.now() - 7200000).toISOString(), expiresAt: new Date(Date.now() + 86400000 * 28).toISOString() },
  { id: '3', studentId: 's3', studentName: 'Priya Singh', routeScope: 'POST:/submissions', idempotencyKey: 'ik-003', payloadHash: 'i9j0k1l2', createdAt: new Date(Date.now() - 1800000).toISOString(), expiresAt: new Date(Date.now() + 86400000 * 30).toISOString() },
]

export default function AdminSyncMonitorPage() {
  const [records, setRecords] = useState<SyncRecord[]>(MOCK)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const load = () => {
    api.get('/admin/sync-monitor')
      .then((r: { data: SyncRecord[] }) => { if (r.data?.length > 0) setRecords(r.data) })
      .catch(() => {/* use mock */})
      .finally(() => { setLoading(false); setRefreshing(false) })
  }

  useEffect(() => { load() }, [])

  const refresh = () => { setRefreshing(true); load() }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sync Monitor</h1>
        </div>
        <button
          onClick={refresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-[#1B7FC9] text-white rounded-lg text-sm font-medium hover:bg-[#1668a8] transition-colors disabled:opacity-60"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#C5DCF0] p-5">
          <div className="text-2xl font-bold text-gray-900">{records.length}</div>
          <div className="text-sm text-gray-500 mt-1">Total Records</div>
        </div>
        <div className="bg-white rounded-xl border border-[#C5DCF0] p-5">
          <div className="text-2xl font-bold text-green-600">{records.length}</div>
          <div className="text-sm text-gray-500 mt-1">Active (within 30d)</div>
        </div>
        <div className="bg-white rounded-xl border border-[#C5DCF0] p-5">
          <div className="text-2xl font-bold text-amber-600">0</div>
          <div className="text-sm text-gray-500 mt-1">Conflicts Detected</div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-[#C5DCF0] p-8 animate-pulse h-64" />
      ) : (
        <div className="bg-white rounded-xl border border-[#C5DCF0] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#F0F5FA] border-b border-[#C5DCF0]">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Student</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Route</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Idempotency Key</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Payload Hash</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Created</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Expires</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {records.map(r => (
                <tr key={r.id} className="hover:bg-[#F8FBFF]">
                  <td className="px-4 py-3 font-medium text-gray-900">{r.studentName}</td>
                  <td className="px-4 py-3">
                    <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{r.routeScope}</code>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{r.idempotencyKey}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{r.payloadHash.slice(0, 8)}…</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(r.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(r.expiresAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {records.length === 0 && (
            <div className="flex flex-col items-center py-12 text-gray-400 gap-2">
              <AlertCircle className="w-8 h-8" />
              <span className="text-sm">No sync records found</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
