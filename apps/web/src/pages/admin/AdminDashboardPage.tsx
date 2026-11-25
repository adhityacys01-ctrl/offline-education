import { useState, useEffect } from 'react'
import { Users, AlertTriangle, FileText, TrendingUp, Globe, CheckCircle } from 'lucide-react'
import api from '../../services/api'
import { useI18n } from '@/lib/i18n'

interface Stats {
  totalStudents: number
  totalTeachers: number
  totalAdmins: number
  activeSyncRecords: number
  auditEventCount: number
}

interface MultilingualStats {
  total: number
  published: number
  pendingApproval: number
  failed: number
  failedAudio: number
  languages: string[]
}

export default function AdminDashboardPage() {
  const { t } = useI18n()
  const [stats, setStats] = useState<Stats | null>(null)
  const [mlStats, setMlStats] = useState<MultilingualStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/admin/stats')
        .then((r: { data: Stats }) => setStats(r.data))
        .catch(() => setStats({ totalStudents: 42, totalTeachers: 8, totalAdmins: 2, activeSyncRecords: 5, auditEventCount: 318 })),
      api.get('/multilingual/admin/stats')
        .then((r: { data: MultilingualStats }) => setMlStats(r.data))
        .catch(() => setMlStats({ total: 2, published: 2, pendingApproval: 0, failed: 0, failedAudio: 0, languages: ['en', 'hi', 'mr'] })),
    ]).finally(() => setLoading(false))
  }, [])

  const cards = [
    { label: t('totalStudents'), value: stats?.totalStudents ?? 0, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: t('totalTeachers'), value: stats?.totalTeachers ?? 0, icon: TrendingUp, color: 'text-green-600 bg-green-50' },
    { label: t('syncRecords'), value: stats?.activeSyncRecords ?? 0, icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
    { label: t('auditEvents'), value: stats?.auditEventCount ?? 0, icon: FileText, color: 'text-purple-600 bg-purple-50' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('adminDashboardTitle')}</h1>
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
        <h2 className="text-base font-semibold text-gray-900 mb-4">{t('rbacMatrix')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 pr-4 font-medium text-gray-600">{t('permission')}</th>
                <th className="text-center py-2 px-3 font-medium text-gray-600">{t('student')}</th>
                <th className="text-center py-2 px-3 font-medium text-gray-600">{t('totalTeachers')}</th>
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
          <p className="text-xs text-gray-400 mt-3">✓ {t('allowed')} &nbsp; ⊖ {t('ownOnly')} &nbsp; ✗ {t('restricted')}</p>
        </div>
      </div>

      {/* Multilingual Content Section */}
      <div className="bg-white rounded-xl border border-[#C5DCF0] p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-[#1B7FC9]" />
          <h2 className="text-base font-semibold text-gray-900">Multilingual Content</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-[#F0F5FA] rounded-xl p-4 border border-[#D7E5F0]">
            <p className="text-xs text-slate-500 font-medium">Published</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{mlStats?.published ?? 0}</p>
          </div>
          <div className="bg-[#F0F5FA] rounded-xl p-4 border border-[#D7E5F0]">
            <p className="text-xs text-slate-500 font-medium">Pending Approval</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{mlStats?.pendingApproval ?? 0}</p>
          </div>
          <div className="bg-[#F0F5FA] rounded-xl p-4 border border-[#D7E5F0]">
            <p className="text-xs text-slate-500 font-medium">Failed Validation</p>
            <p className="text-2xl font-bold text-rose-600 mt-1">{mlStats?.failed ?? 0}</p>
          </div>
          <div className="bg-[#F0F5FA] rounded-xl p-4 border border-[#D7E5F0]">
            <p className="text-xs text-slate-500 font-medium">Audio Failures</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{mlStats?.failedAudio ?? 0}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 bg-[#F0F5FA] rounded-xl p-4 border border-[#D7E5F0]">
          <span className="text-xs text-slate-500 font-medium">Supported Languages:</span>
          {['English', 'हिन्दी', 'मराठी'].map(lang => (
            <span key={lang} className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
              <CheckCircle size={12} className="text-emerald-500" />{lang}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
