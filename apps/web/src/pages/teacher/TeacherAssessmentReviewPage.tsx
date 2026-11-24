import { useState } from 'react'
import { Eye, ChevronDown, X, Check } from 'lucide-react'

interface SubmissionItem {
  id: string
  studentName: string
  studentEmail: string
  course: string
  quizTitle: string
  attemptDate: string
  score: number
  totalQuestions: number
  status: 'Reviewed' | 'Pending'
  feedback?: string
  answers: {
    questionId: string
    prompt: string
    selectedOption: string
    correctOption: string
    isCorrect: boolean
  }[]
  clientAttemptId: string
  payloadHash: string
  idempotencyKey: string
}

const SUBMISSIONS_DATA: SubmissionItem[] = [
  {
    id: 'sub-1',
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav@student.com',
    course: 'Mathematics - Class 10',
    quizTitle: 'Algebraic Expressions & Polynomials',
    attemptDate: '24 Nov, 10:24 AM',
    score: 95,
    totalQuestions: 5,
    status: 'Reviewed',
    feedback: 'Excellent mastery of polynomial factorization and quadratic roots!',
    clientAttemptId: 'ca-8472-aarav-math',
    payloadHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    idempotencyKey: 'idemp-550e8400-e29b-41d4-a716-446655440000',
    answers: [
      { questionId: 'q1', prompt: 'What is the degree of the zero polynomial?', selectedOption: 'Not defined', correctOption: 'Not defined', isCorrect: true },
      { questionId: 'q2', prompt: 'Factorize: 6x^2 + 17x + 5', selectedOption: '(2x + 5)(3x + 1)', correctOption: '(2x + 5)(3x + 1)', isCorrect: true },
      { questionId: 'q3', prompt: 'Find the discriminant of 2x^2 - 4x + 3 = 0', selectedOption: '-8', correctOption: '-8', isCorrect: true },
      { questionId: 'q4', prompt: 'Which of the following is not a polynomial?', selectedOption: 'x + 1/x', correctOption: 'x + 1/x', isCorrect: true },
      { questionId: 'q5', prompt: 'Sum of roots of ax^2 + bx + c = 0 is:', selectedOption: '-b/a', correctOption: '-b/a', isCorrect: true },
    ],
  },
  {
    id: 'sub-2',
    studentName: 'Diya Patel',
    studentEmail: 'diya@student.com',
    course: 'Mathematics - Class 10',
    quizTitle: 'Algebraic Expressions & Polynomials',
    attemptDate: '24 Nov, 09:50 AM',
    score: 90,
    totalQuestions: 5,
    status: 'Reviewed',
    feedback: 'Very thorough solutions. Review discriminant definitions.',
    clientAttemptId: 'ca-9214-diya-math',
    payloadHash: '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945',
    idempotencyKey: 'idemp-770e8400-e29b-41d4-a716-446655440111',
    answers: [
      { questionId: 'q1', prompt: 'What is the degree of the zero polynomial?', selectedOption: 'Not defined', correctOption: 'Not defined', isCorrect: true },
      { questionId: 'q2', prompt: 'Factorize: 6x^2 + 17x + 5', selectedOption: '(2x + 5)(3x + 1)', correctOption: '(2x + 5)(3x + 1)', isCorrect: true },
      { questionId: 'q3', prompt: 'Find the discriminant of 2x^2 - 4x + 3 = 0', selectedOption: '8', correctOption: '-8', isCorrect: false },
      { questionId: 'q4', prompt: 'Which of the following is not a polynomial?', selectedOption: 'x + 1/x', correctOption: 'x + 1/x', isCorrect: true },
      { questionId: 'q5', prompt: 'Sum of roots of ax^2 + bx + c = 0 is:', selectedOption: '-b/a', correctOption: '-b/a', isCorrect: true },
    ],
  },
  {
    id: 'sub-3',
    studentName: 'Rohan Mehta',
    studentEmail: 'rohan@student.com',
    course: 'Mathematics - Class 10',
    quizTitle: 'Algebraic Expressions & Polynomials',
    attemptDate: '24 Nov, 09:12 AM',
    score: 75,
    totalQuestions: 5,
    status: 'Pending',
    feedback: '',
    clientAttemptId: 'ca-1082-rohan-math',
    payloadHash: '9a53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b999',
    idempotencyKey: 'idemp-990e8400-e29b-41d4-a716-446655440222',
    answers: [
      { questionId: 'q1', prompt: 'What is the degree of the zero polynomial?', selectedOption: '0', correctOption: 'Not defined', isCorrect: false },
      { questionId: 'q2', prompt: 'Factorize: 6x^2 + 17x + 5', selectedOption: '(2x + 5)(3x + 1)', correctOption: '(2x + 5)(3x + 1)', isCorrect: true },
      { questionId: 'q3', prompt: 'Find the discriminant of 2x^2 - 4x + 3 = 0', selectedOption: '-8', correctOption: '-8', isCorrect: true },
      { questionId: 'q4', prompt: 'Which of the following is not a polynomial?', selectedOption: 'x^2 + 5', correctOption: 'x + 1/x', isCorrect: false },
      { questionId: 'q5', prompt: 'Sum of roots of ax^2 + bx + c = 0 is:', selectedOption: '-b/a', correctOption: '-b/a', isCorrect: true },
    ],
  },
]

export default function TeacherAssessmentReviewPage() {
  const [activeTab, setActiveTab] = useState<'submissions' | 'analytics'>('submissions')
  const [courseFilter, setCourseFilter] = useState('Mathematics - Class 10')
  const [submissions, setSubmissions] = useState<SubmissionItem[]>(SUBMISSIONS_DATA)
  const [selectedSubId, setSelectedSubId] = useState<string>(SUBMISSIONS_DATA[0].id)
  
  // Modals
  const [viewAnswersModal, setViewAnswersModal] = useState(false)
  const [feedbackModal, setFeedbackModal] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackScore, setFeedbackScore] = useState<number>(95)
  const [feedbackSaved, setFeedbackSaved] = useState(false)

  const activeSubmission = submissions.find((s) => s.id === selectedSubId) || submissions[0]

  const handleOpenFeedback = () => {
    setFeedbackText(activeSubmission.feedback || '')
    setFeedbackScore(activeSubmission.score)
    setFeedbackSaved(false)
    setFeedbackModal(true)
  }

  const handleSaveFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === activeSubmission.id
          ? { ...s, score: feedbackScore, feedback: feedbackText, status: 'Reviewed' }
          : s
      )
    )
    setFeedbackSaved(true)
    setTimeout(() => {
      setFeedbackModal(false)
      setFeedbackSaved(false)
    }, 1000)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* ── Page Header (Strictly NO subheadings) ─────────────────────────── */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Assessment Review
        </h1>
      </div>

      {/* ── Tabs (Matching Image 4) ───────────────────────────────────────── */}
      <div className="flex items-center gap-6 border-b border-[#D7E5F0] dark:border-[#1E2D48]">
        <button
          onClick={() => setActiveTab('submissions')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === 'submissions'
              ? 'text-[#1B7FC9]'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          Submissions
          {activeTab === 'submissions' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1B7FC9] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === 'analytics'
              ? 'text-[#1B7FC9]'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          Analytics
          {activeTab === 'analytics' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1B7FC9] rounded-full" />
          )}
        </button>
      </div>

      {/* ── Filter Dropdown (Matching Image 4) ────────────────────────────── */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="appearance-none pl-4 pr-9 py-2 bg-white dark:bg-[#131F33] border border-[#D7E5F0] dark:border-[#1E2D48] rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]"
          >
            <option value="Mathematics - Class 10">Mathematics - Class 10</option>
            <option value="Science - Class 10">Science - Class 10</option>
            <option value="History - Class 10">History - Class 10</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {activeTab === 'submissions' ? (
        <>
          {/* ── Submissions Table (Matching Image 4) ───────────────────────── */}
          <div className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#D7E5F0] dark:border-[#1E2D48] bg-[#F8FAFC] dark:bg-[#0E1726]/50">
                    <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                      Student
                    </th>
                    <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                      Attempt Date
                    </th>
                    <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                      Score
                    </th>
                    <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBF2F7] dark:divide-[#1A2E46]">
                  {submissions.map((sub) => {
                    const isSelected = sub.id === selectedSubId
                    return (
                      <tr
                        key={sub.id}
                        onClick={() => setSelectedSubId(sub.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#EBF4FA] dark:bg-[#162842]'
                            : 'hover:bg-[#F0F5FA] dark:hover:bg-[#1A2E46]/40'
                        }`}
                      >
                        {/* Student */}
                        <td className="py-4 px-5">
                          <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {sub.studentName}
                          </p>
                        </td>

                        {/* Attempt Date */}
                        <td className="py-4 px-5">
                          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                            {sub.attemptDate}
                          </span>
                        </td>

                        {/* Score */}
                        <td className="py-4 px-5">
                          <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {sub.score}%
                          </span>
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-5">
                          {sub.status === 'Reviewed' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                              Reviewed
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Bottom Action Banner (Exactly Matching Image 4) ───────────── */}
          <div className="bg-[#EBF4FA] dark:bg-[#132035] rounded-2xl border border-[#C5DCF0] dark:border-[#1E2D48] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#1B7FC9] rounded-full" />
              <button
                onClick={() => setViewAnswersModal(true)}
                className="flex items-center gap-2 text-xs font-bold text-[#1465A3] dark:text-[#38BDF8] hover:text-[#1B7FC9] transition-colors"
              >
                <Eye size={16} />
                View Answers ({activeSubmission.studentName})
              </button>
            </div>

            <button
              onClick={handleOpenFeedback}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white dark:bg-[#1A2E46] text-[#1465A3] dark:text-[#38BDF8] border border-[#BFDCF2] dark:border-[#223D61] text-xs font-bold hover:bg-[#1B7FC9] hover:text-white transition-all shadow-xs"
            >
              Provide Feedback
            </button>
          </div>
        </>
      ) : (
        /* ── Analytics Tab ─────────────────────────────────────────────────── */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-5">
              <p className="text-xs font-semibold text-slate-500">Class Average</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">86.6%</p>
            </div>
            <div className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-5">
              <p className="text-xs font-semibold text-slate-500">Pass Rate</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">100%</p>
            </div>
            <div className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-5">
              <p className="text-xs font-semibold text-slate-500">Completion Time (Avg)</p>
              <p className="text-2xl font-bold text-[#1465A3] dark:text-[#38BDF8] mt-1">14.2 min</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-6">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4">
              Question Difficulty Breakdown
            </h2>
            <div className="space-y-3">
              {[
                { q: 'Q1: Degree of zero polynomial', passRate: 75, correct: 3, total: 4 },
                { q: 'Q2: Quadratic factorization', passRate: 100, correct: 4, total: 4 },
                { q: 'Q3: Discriminant formula', passRate: 75, correct: 3, total: 4 },
                { q: 'Q4: Polynomial terms identification', passRate: 80, correct: 4, total: 5 },
                { q: 'Q5: Sum of quadratic roots', passRate: 100, correct: 4, total: 4 },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">{item.q}</span>
                    <span className="text-[#1465A3] font-bold">{item.passRate}% Correct</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E5EEF6] dark:bg-[#1E2D48] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#1B7FC9] to-emerald-500"
                      style={{ width: `${item.passRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── View Answers Modal (Question-by-Question + Hash Verification) ─── */}
      {viewAnswersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] max-w-2xl w-full p-6 shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#D7E5F0] dark:border-[#1E2D48]">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {activeSubmission.studentName} — Answer Sheet
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  {activeSubmission.quizTitle} • Score: {activeSubmission.score}%
                </p>
              </div>
              <button
                onClick={() => setViewAnswersModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {/* Questions List */}
            <div className="mt-5 space-y-4">
              {activeSubmission.answers.map((ans, idx) => (
                <div
                  key={ans.questionId}
                  className={`p-4 rounded-xl border ${
                    ans.isCorrect
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                      : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      Q{idx + 1}. {ans.prompt}
                    </p>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        ans.isCorrect
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300'
                      }`}
                    >
                      {ans.isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <div className="mt-2.5 text-xs space-y-1">
                    <p className="text-slate-600 dark:text-slate-400">
                      Student Choice:{' '}
                      <span className={`font-bold ${ans.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {ans.selectedOption}
                      </span>
                    </p>
                    {!ans.isCorrect && (
                      <p className="text-slate-600 dark:text-slate-400">
                        Correct Answer:{' '}
                        <span className="font-bold text-emerald-700">{ans.correctOption}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Cryptographic Verification Hashes */}
            <div className="mt-5 p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0E1726] border border-[#D7E5F0] dark:border-[#1E2D48] text-xs space-y-1.5 font-mono">
              <p className="font-sans font-bold text-slate-700 dark:text-slate-300 text-[11px]">
                Cryptographic Submission Integrity
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                Client Attempt ID: {activeSubmission.clientAttemptId}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                Payload SHA-256: {activeSubmission.payloadHash}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                Idempotency Key: {activeSubmission.idempotencyKey}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D7E5F0] dark:border-[#1E2D48] flex justify-end">
              <button
                onClick={() => setViewAnswersModal(false)}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-[#1B7FC9] hover:bg-[#1465A3] text-white"
              >
                Close Answer Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Provide Feedback Modal ────────────────────────────────────────── */}
      {feedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] max-w-md w-full p-6 shadow-xl animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#D7E5F0] dark:border-[#1E2D48]">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Provide Feedback — {activeSubmission.studentName}
              </h2>
              <button
                onClick={() => setFeedbackModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {feedbackSaved ? (
              <div className="py-8 text-center text-emerald-600 font-bold text-sm flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Check size={20} />
                </div>
                Feedback Saved & Sent to Student
              </div>
            ) : (
              <form onSubmit={handleSaveFeedback} className="space-y-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Score / Marks (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={feedbackScore}
                    onChange={(e) => setFeedbackScore(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D7E5F0] dark:border-[#1E2D48] bg-white dark:bg-[#0E1726] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Teacher Feedback & Recommendations
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write constructive notes for the student..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D7E5F0] dark:border-[#1E2D48] bg-white dark:bg-[#0E1726] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setFeedbackModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-[#1B7FC9] hover:bg-[#1465A3] text-white transition-all"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
