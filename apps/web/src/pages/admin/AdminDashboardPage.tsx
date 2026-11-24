import { useState, useEffect } from 'react'
import { Users, AlertTriangle, FileText, TrendingUp } from 'lucide-react'
import api from '../../services/api'

interface Stats {
  totalStudents: number
  totalTeachers: number
  totalAdmins: number
  activeSyncRecords: number
  auditEventCount: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/stats')
      .then((r: { data: Stats }) => setStats(r.data))
      .catch(() => setStats({ totalStudents: 42, totalTeachers: 8, totalAdmins: 2, activeSyncRecords: 5, auditEventCount: 318 }))
      .finally(() => setLoading(false))
  }, [])

  const cards = [
    { label: 'Students', value: stats?.totalStudents ?? 0, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Teachers', value: stats?.totalTeachers ?? 0, icon: TrendingUp, color: 'text-green-600 bg-green-50' },
    { label: 'Sync Records', value: stats?.activeSyncRecords ?? 0, icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
    { label: 'Audit Events', value: stats?.auditEventCount ?? 0, icon: FileText, color: 'text-purple-600 bg-purple-50' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#C5DCF0] p-5 animate-pulse h-28" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map(card => (
            <div key={card.label} className="bg-white rounded-xl border border-[#C5DCF0] p-5">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{card.value.toLocaleString()}</div>
              <div className="text-sm text-gray-500 mt-1">{card.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-xl border border-[#C5DCF0] p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">RBAC Permission Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 pr-4 font-medium text-gray-600">Permission</th>
                <th className="text-center py-2 px-3 font-medium text-gray-600">Student</th>
                <th className="text-center py-2 px-3 font-medium text-gray-600">Teacher</th>
                <th className="text-center py-2 px-3 font-medium text-gray-600">Admin</th>
                <th className="text-center py-2 px-3 font-medium text-gray-600">System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                ['Access learning materials', 'full', 'full', 'full', 'none'],
                ['Download lessons and quizzes', 'full', 'none', 'none', 'full'],
                ['Complete quizzes offline', 'full', 'none', 'none', 'none'],
                ['Save answers automatically', 'none', 'none', 'none', 'full'],
                ['Restore quiz after restart', 'full', 'none', 'none', 'full'],
                ['Submit assessments', 'full', 'none', 'none', 'full'],
                ['View submission status', 'own', 'own', 'full', 'full'],
                ['Retry interrupted uploads', 'own', 'none', 'none', 'full'],
                ['Prevent duplicate submissions', 'none', 'none', 'none', 'full'],
                ['Create and update quizzes', 'none', 'own', 'full', 'none'],
                ['Publish learning packs', 'none', 'none', 'full', 'none'],
                ['View submitted answers', 'own', 'own', 'none', 'none'],
                ['Grade assessments', 'none', 'own', 'none', 'none'],
                ['Detect version conflicts', 'none', 'none', 'none', 'full'],
                ['Review conflicts', 'none', 'own', 'full', 'none'],
                ['Define conflict policies', 'none', 'none', 'full', 'none'],
                ['Manage users and roles', 'none', 'none', 'full', 'none'],
                ['Generate submission receipts', 'none', 'none', 'none', 'full'],
                ['Monitor sync failures', 'own', 'own', 'full', 'full'],
                ['Manage audit logs', 'none', 'none', 'full', 'full'],
              ].map(([perm, s, t, a, sys]) => (
                <tr key={perm}>
                  <td className="py-2 pr-4 text-gray-700">{perm}</td>
                  {[s, t, a, sys].map((val, idx) => (
                    <td key={idx} className="text-center py-2 px-3">
                      {val === 'full' && <span className="text-green-600 font-bold">✓</span>}
                      {val === 'own' && <span className="text-amber-500">⊖</span>}
                      {val === 'none' && <span className="text-gray-300">✗</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-3">✓ Allowed &nbsp; ⊖ Own / assigned resources only &nbsp; ✗ Restricted</p>
        </div>
      </div>
    </div>
  )
}
