import { useNavigate } from 'react-router-dom'
import { BookOpen, CheckCircle2, Award, Clock, ArrowRight, Download, Play } from 'lucide-react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/database'
import { useI18n } from '@/lib/i18n'

export function ProgressPage() {
  const navigate = useNavigate()
  const { t, translateSubject } = useI18n()

  // Real offline data from Dexie
  const packs = useLiveQuery(() => db.coursePacks.toArray(), [], [])
  const receipts = useLiveQuery(() => db.syncReceipts.toArray(), [], [])

  const courseCount = packs?.length || 5
  const quizzesCompleted = receipts?.length || 18

  // Average quiz score calculation
  let avgScore = 87
  if (receipts && receipts.length > 0) {
    const scores = receipts.filter((r) => r.score !== undefined)
    if (scores.length > 0) {
      const sumPct = scores.reduce((acc, r) => acc + (r.score! / (r.totalQuestions || 4)) * 100, 0)
      avgScore = Math.round(sumPct / scores.length)
    }
  }

  // Circular gauge calculations for 78% (r=58, circumference=364.4)
  const radius = 58
  const circumference = 2 * Math.PI * radius
  const overallPct = 78
  const strokeDashoffset = circumference - (circumference * overallPct) / 100

  // Subject-wise progress data
  const subjects = [
    { name: 'Mathematics', pct: 92, courseId: 'seed-course-mathematics' },
    { name: 'Biology', pct: 78, courseId: 'seed-course-biology' },
    { name: 'History', pct: 70, courseId: 'seed-course-history' },
    { name: 'Science', pct: 65, courseId: 'seed-course-computer-science' },
  ]

  // Recent activity entries
  const activities = [
    {
      id: 1,
      type: 'quiz',
      text: 'Completed: Mathematics Quiz - Chapter 3',
      time: '2 hours ago',
      icon: CheckCircle2,
    },
    {
      id: 2,
      type: 'download',
      text: 'Downloaded: Environmental Science - Chapter 1',
      time: '3 hours ago',
      icon: Download,
    },
    {
      id: 3,
      type: 'lesson',
      text: 'Started: Biology Lesson - Chapter 3',
      time: '1 day ago',
      icon: Play,
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* ── Page Header (Without descriptive subtext below heading) ────── */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {t('progress')}
        </h1>
      </div>

      {/* ── Row 1: 4 Stat KPI Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {/* Card 1: Courses Enrolled */}
        <div className="bg-white rounded-2xl p-5 border border-[#D7E5F0] shadow-xs text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center mb-2.5 shadow-xs">
            <BookOpen size={22} strokeWidth={2.2} />
          </div>
          <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            {courseCount}
          </p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {t('coursesTitle')}
          </p>
        </div>

        {/* Card 2: Quizzes Completed */}
        <div className="bg-white rounded-2xl p-5 border border-[#D7E5F0] shadow-xs text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center mb-2.5 shadow-xs">
            <CheckCircle2 size={22} strokeWidth={2.2} />
          </div>
          <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            {quizzesCompleted}
          </p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {t('quizzes')} {t('completed')}
          </p>
        </div>

        {/* Card 3: Average Score */}
        <div className="bg-white rounded-2xl p-5 border border-[#D7E5F0] shadow-xs text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center mb-2.5 shadow-xs">
            <Award size={22} strokeWidth={2.2} />
          </div>
          <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            {avgScore}%
          </p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {t('averageScore')}
          </p>
        </div>

        {/* Card 4: Learning Time */}
        <div className="bg-white rounded-2xl p-5 border border-[#D7E5F0] shadow-xs text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center mb-2.5 shadow-xs">
            <Clock size={22} strokeWidth={2.2} />
          </div>
          <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            12.5 h
          </p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Learning Time
          </p>
        </div>
      </div>

      {/* ── Row 2: Overall Progress + Subject-wise Progress ─────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
        {/* Left: Overall Progress (5 cols) */}
        <div className="md:col-span-5 bg-white rounded-2xl p-6 border border-[#D7E5F0] shadow-xs flex flex-col items-center justify-between text-center min-h-[300px]">
          <h2 className="text-base font-bold text-slate-900 tracking-tight self-start">
            Overall Progress
          </h2>

          {/* SVG Donut Ring */}
          <div className="relative w-40 h-40 my-2 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
              <defs>
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1B7FC9" />
                  <stop offset="100%" stopColor="#1465A3" />
                </linearGradient>
              </defs>

              {/* Background Track Circle */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                stroke="#E8F2FA"
                strokeWidth="12"
                fill="none"
              />

              {/* Animated / Gradient Fill Circle */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                stroke="url(#progressGrad)"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Inner Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {overallPct}%
              </span>
            </div>
          </div>

          {/* View Details Button (No redundant motivational subtitles) */}
          <button
            onClick={() => navigate('/courses')}
            className="w-full bg-[#1B7FC9] hover:bg-[#1465A3] active:scale-[0.98] text-white text-xs font-bold py-2.5 px-6 rounded-xl shadow-xs inline-flex items-center justify-center gap-1.5 transition-all mt-2"
          >
            View Details <ArrowRight size={13} />
          </button>
        </div>

        {/* Right: Subject-wise Progress (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-2xl p-6 border border-[#D7E5F0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Subject-wise Progress
              </h2>
              <button
                onClick={() => navigate('/courses')}
                className="text-xs font-bold text-[#1B7FC9] hover:text-[#1465A3] transition-colors"
              >
                All Subjects →
              </button>
            </div>

            <div className="space-y-4">
              {subjects.map((subj) => (
                <div
                  key={subj.name}
                  onClick={() => navigate(`/courses/${subj.courseId}`)}
                  className="cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-700 group-hover:text-[#1B7FC9] transition-colors">
                      {translateSubject(subj.name)}
                    </span>
                    <span className="font-bold text-slate-900">
                      {subj.pct}%
                    </span>
                  </div>
                  <div className="w-full bg-[#E8F2FA] h-2.5 rounded-full overflow-hidden border border-[#D7E5F0]">
                    <div
                      className="h-full rounded-full transition-all duration-700 bg-[#1B7FC9]"
                      style={{ width: `${subj.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 3: Recent Activity ──────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Recent Activity
          </h2>
          <button
            onClick={() => navigate('/sync')}
            className="text-xs font-bold text-[#1B7FC9] hover:text-[#1465A3] transition-colors"
          >
            View All →
          </button>
        </div>

        <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#D7E5F0] shadow-xs divide-y divide-[#D7E5F0]">
          {activities.map((act) => {
            const Icon = act.icon
            return (
              <div key={act.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Icon size={16} strokeWidth={2.4} />
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-slate-800 truncate">
                    {act.text}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium whitespace-nowrap flex-shrink-0">
                  {act.time}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
