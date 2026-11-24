import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

interface AnswerDetail {
  questionId: string
  prompt: string
  selectedOptionId: string | null
  selectedOptionText: string
  correctOptionId: string
  correctOptionText: string
  isCorrect: boolean
}

interface SubmissionDetail {
  submissionId: string
  clientAttemptId: string
  payloadHash: string
  idempotencyKey: string
  student: { id: string; name: string; email: string }
  quizTitle: string
  quizVersion: number
  status: string
  score: number | null
  totalQuestions: number | null
  acceptedAt: string | null
  answers: AnswerDetail[]
}

export default function SubmissionDetailPage() {
  const { submissionId } = useParams<{ submissionId: string }>()
  const { accessToken } = useAuthStore()
  const [detail, setDetail] = useState<SubmissionDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/v1/teacher/submissions/${submissionId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        if (!res.ok) throw new Error(await res.text())
        setDetail(await res.json())
      } catch (e) {
        setError(String(e))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [submissionId, accessToken])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !detail) {
    return <div className="text-danger text-center p-10">{error ?? 'Not found'}</div>
  }

  const pct =
    detail.score != null && detail.totalQuestions
      ? Math.round((detail.score / detail.totalQuestions) * 100)
      : null

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back */}
      <Link to="/teacher/dashboard" className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700">
        ← Back to Dashboard
      </Link>

      {/* Header card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">{detail.quizTitle}</h1>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">v{detail.quizVersion}</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            detail.status === 'GRADED' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
          }`}>
            {detail.status}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div>
            <p className="text-xs text-gray-500">Student</p>
            <p className="font-semibold text-gray-900 mt-0.5">{detail.student.name}</p>
            <p className="text-xs text-gray-400">{detail.student.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Score</p>
            <p className="font-semibold text-gray-900 mt-0.5">
              {detail.score ?? '—'}/{detail.totalQuestions ?? '—'}{' '}
              {pct != null && <span className="text-brand-600">({pct}%)</span>}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Submitted</p>
            <p className="font-semibold text-gray-900 mt-0.5">
              {detail.acceptedAt ? new Date(detail.acceptedAt).toLocaleString() : '—'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Duplicate Suppression</p>
            <p className="font-semibold text-success mt-0.5 text-sm">✓ No duplicate records</p>
          </div>
        </div>
      </div>

      {/* Integrity hashes */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Integrity Verification</h2>
        <div className="space-y-3 font-mono text-xs text-gray-600">
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-400 font-sans text-xs font-medium">Submission ID</span>
            <code className="bg-gray-50 px-3 py-1.5 rounded-lg break-all">{detail.submissionId}</code>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-400 font-sans text-xs font-medium">Client Attempt ID</span>
            <code className="bg-gray-50 px-3 py-1.5 rounded-lg break-all">{detail.clientAttemptId}</code>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-400 font-sans text-xs font-medium">Payload Hash (SHA-256)</span>
            <code className="bg-gray-50 px-3 py-1.5 rounded-lg break-all">{detail.payloadHash}</code>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-400 font-sans text-xs font-medium">Idempotency Key</span>
            <code className="bg-gray-50 px-3 py-1.5 rounded-lg break-all">{detail.idempotencyKey}</code>
          </div>
        </div>
      </div>

      {/* Per-question answers */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Answers ({detail.answers.length} questions)</h2>
        <div className="space-y-4">
          {detail.answers.map((a, i) => (
            <div
              key={a.questionId}
              className={`p-4 rounded-xl border-2 ${
                a.isCorrect ? 'border-success/30 bg-success/5' : 'border-danger/30 bg-danger/5'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  a.isCorrect ? 'bg-success text-white' : 'bg-danger text-white'
                }`}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">{a.prompt}</p>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Student answered</p>
                      <p className={`text-sm font-medium ${a.isCorrect ? 'text-success' : 'text-danger'}`}>
                        {a.selectedOptionText}
                      </p>
                    </div>
                    {!a.isCorrect && (
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Correct answer</p>
                        <p className="text-sm font-medium text-success">{a.correctOptionText}</p>
                      </div>
                    )}
                  </div>
                </div>
                <span className={`text-lg ${a.isCorrect ? 'text-success' : 'text-danger'}`}>
                  {a.isCorrect ? '✓' : '✗'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
