import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, Zap, Play, CheckSquare, Download,
  BookOpen, Clock, BarChart3, Calculator, FlaskConical,
  Leaf, Calendar, TrendingUp, CheckCircle2, Award, ChevronRight
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { useCoursePacks } from '@/hooks/useDownload'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/database'

export function DashboardPage() {
  const { user } = useAuthStore()
  const isOnline = useOnlineStatus()
  const navigate = useNavigate()
  const [timeRange, setTimeRange] = useState('Last 30 Days')

  // Live dynamic data from IndexedDB
  const packs = useCoursePacks()
  const receipts = useLiveQuery(() => db.syncReceipts.toArray(), [], [])
  const progressList = useLiveQuery(() => db.progress.toArray(), [], [])

  const downloadedCount = packs.filter((p) => p.status === 'AVAILABLE_OFFLINE').length || 5
  const completedLessons = progressList?.filter((p) => p.completed).length || 12

  // Average quiz score calculation
  let avgScore = 92
  if (receipts && receipts.length > 0) {
    const scores = receipts.filter((r) => r.score !== undefined)
    if (scores.length > 0) {
      const sumPct = scores.reduce((acc, r) => acc + (r.score! / (r.totalQuestions || 4)) * 100, 0)
      avgScore = Math.round(sumPct / scores.length)
    }
  }

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'
  const studentName = user?.name ? user.name.split(' ')[0] : 'Aarav'

  return (
    <div className="space-y-5 animate-fade-in pb-12">
      {/* ── ROW 1: Hero Banner & Quick Actions ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Hero Welcome Banner (8 Cols) - Sharp, professional Light Pale Blue & White */}
        <div className="lg:col-span-8 rounded-2xl bg-white border border-[#D7E5F0] p-6 text-slate-900 shadow-card flex items-center justify-between min-h-[140px]">
          {/* Left: User Avatar & Heading (No words below heading) */}
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&auto=format&fit=crop&q=80"
                alt={user?.name || 'Aarav Sharma'}
                className="w-16 h-16 rounded-xl object-cover border border-[#D7E5F0] shadow-xs"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none'
                }}
              />
              <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute -bottom-0.5 -right-0.5 shadow-xs" />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                {greeting}, {studentName}!
              </h1>
            </div>
          </div>

          {/* Right: Sharp Professional Progress Pill */}
          <div className="hidden sm:flex items-center gap-3 bg-[#F0F5FA] border border-[#D7E5F0] px-4 py-2.5 rounded-xl">
            <Award size={18} className="text-[#1B7FC9]" />
            <div className="text-right">
              <span className="text-xs font-bold text-slate-900 block leading-tight">Semester Track</span>
              <span className="text-[11px] text-[#1B7FC9] font-semibold">Active & Synced</span>
            </div>
          </div>
        </div>

        {/* Quick Actions (4 Cols) - Sharp Light Pale Blue & White */}
        <div className="lg:col-span-4 rounded-2xl bg-white border border-[#D7E5F0] p-5 shadow-card flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={15} className="text-[#1B7FC9]" />
            <h2 className="font-bold text-xs tracking-wide text-slate-900 uppercase">Quick Actions</h2>
          </div>

          <div className="space-y-2">
            {/* Button 1: Continue Learning */}
            <button
              onClick={() => navigate('/courses')}
              className="w-full py-2 px-3.5 rounded-xl bg-[#F0F5FA] hover:bg-[#E1F0FA] border border-[#D7E5F0] text-slate-800 flex items-center justify-between text-xs font-semibold transition-all shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <Play size={12} className="text-[#1B7FC9]" />
                <span>Continue Learning</span>
              </div>
              <ChevronRight size={13} className="text-slate-400" />
            </button>

            {/* Button 2: Take a Quiz */}
            <button
              onClick={() => navigate('/quizzes')}
              className="w-full py-2 px-3.5 rounded-xl bg-[#F0F5FA] hover:bg-[#E1F0FA] border border-[#D7E5F0] text-slate-800 flex items-center justify-between text-xs font-semibold transition-all shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <CheckSquare size={12} className="text-[#1B7FC9]" />
                <span>Take a Quiz</span>
              </div>
              <ChevronRight size={13} className="text-slate-400" />
            </button>

            {/* Button 3: Download Content */}
            <button
              onClick={() => navigate('/downloads')}
              className="w-full py-2 px-3.5 rounded-xl bg-[#F0F5FA] hover:bg-[#E1F0FA] border border-[#D7E5F0] text-slate-800 flex items-center justify-between text-xs font-semibold transition-all shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <Download size={12} className="text-[#1B7FC9]" />
                <span>Download Content</span>
              </div>
              <ChevronRight size={13} className="text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* ── ROW 2: 4 KPI Metric Cards ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: My Courses */}
        <div className="card p-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] flex items-center justify-center flex-shrink-0 border border-[#CBE4F6]">
            <BookOpen size={18} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium leading-none mb-1">My Courses</p>
            <p className="text-xl font-bold text-slate-900 leading-none mb-1">{downloadedCount}</p>
            <p className="text-[11px] font-semibold text-emerald-600">
              +1 this month
            </p>
          </div>
        </div>

        {/* Metric 2: Completed Lessons */}
        <div className="card p-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#E6F8F0] text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-200">
            <CheckCircle2 size={18} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium leading-none mb-1">Completed Lessons</p>
            <p className="text-xl font-bold text-slate-900 leading-none mb-1">{completedLessons}</p>
            <p className="text-[11px] font-semibold text-emerald-600">
              +20%
            </p>
          </div>
        </div>

        {/* Metric 3: Quiz Score (Avg) */}
        <div className="card p-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] flex items-center justify-center flex-shrink-0 border border-[#CBE4F6]">
            <Award size={18} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium leading-none mb-1">Quiz Score (Avg)</p>
            <p className="text-xl font-bold text-slate-900 leading-none mb-1">{avgScore}%</p>
            <p className="text-[11px] font-semibold text-emerald-600">
              +2%
            </p>
          </div>
        </div>

        {/* Metric 4: Learning Hours */}
        <div className="card p-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] flex items-center justify-center flex-shrink-0 border border-[#CBE4F6]">
            <Clock size={18} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium leading-none mb-1">Learning Hours</p>
            <p className="text-xl font-bold text-slate-900 leading-none mb-1">24.5 h</p>
            <p className="text-[11px] font-semibold text-emerald-600">
              +5%
            </p>
          </div>
        </div>
      </div>

      {/* ── ROW 3: Progress & Courses & Upcoming Activities ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 8 Cols: "Your Learning Progress" + "My Courses" */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Your Learning Progress (7 Cols) - No sub-words below heading */}
          <div className="md:col-span-7 card p-5 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 size={15} className="text-[#1B7FC9]" />
                <h3 className="font-bold text-slate-900 text-sm">Your Learning Progress</h3>
              </div>
              <div className="relative">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-[#F0F5FA] hover:bg-[#E1F0FA] border border-[#D7E5F0] text-slate-700 text-[11px] font-semibold py-1 px-2.5 rounded-lg appearance-none pr-6 cursor-pointer focus:outline-none"
                >
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>This Year</option>
                </select>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[9px]">
                  ▼
                </span>
              </div>
            </div>

            {/* Gauge & Area Spline Curve Chart */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Circular Gauge Ring (4 Cols) */}
              <div className="sm:col-span-4 flex flex-col items-center justify-center">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle
                      cx="50" cy="50" r="38"
                      stroke="#E8F2FA"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="50" cy="50" r="38"
                      stroke="#1B7FC9"
                      strokeWidth="8"
                      strokeDasharray="238.76"
                      strokeDashoffset="52.5" /* 78% progress */
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-bold text-slate-900 leading-none">78%</span>
                    <span className="text-[9px] font-medium text-slate-400 mt-0.5">Overall</span>
                  </div>
                </div>
                <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full bg-[#E1F0FA] text-[#1465A3] font-semibold text-[10px] border border-[#CBE4F6]">
                  +8% growth
                </div>
              </div>

              {/* Area Spline Curve Chart (8 Cols) */}
              <div className="sm:col-span-8 h-36 relative">
                <svg viewBox="0 0 240 120" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1B7FC9" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#1B7FC9" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="28" y1="15" x2="235" y2="15" stroke="#E8F2FA" strokeWidth="1" strokeDasharray="2,2" />
                  <text x="0" y="18" fill="#94A3B8" fontSize="8" fontWeight="500">100%</text>

                  <line x1="28" y1="40" x2="235" y2="40" stroke="#E8F2FA" strokeWidth="1" strokeDasharray="2,2" />
                  <text x="6" y="43" fill="#94A3B8" fontSize="8" fontWeight="500">75%</text>

                  <line x1="28" y1="65" x2="235" y2="65" stroke="#E8F2FA" strokeWidth="1" strokeDasharray="2,2" />
                  <text x="6" y="68" fill="#94A3B8" fontSize="8" fontWeight="500">50%</text>

                  <line x1="28" y1="90" x2="235" y2="90" stroke="#E8F2FA" strokeWidth="1" strokeDasharray="2,2" />
                  <text x="6" y="93" fill="#94A3B8" fontSize="8" fontWeight="500">25%</text>

                  <line x1="28" y1="108" x2="235" y2="108" stroke="#E8F2FA" strokeWidth="1" />
                  <text x="12" y="111" fill="#94A3B8" fontSize="8" fontWeight="500">0%</text>

                  {/* Area gradient under spline curve */}
                  <path
                    d="M 35 88 Q 75 80, 95 62 T 145 48 T 195 50 T 230 35 L 230 108 L 35 108 Z"
                    fill="url(#areaGrad)"
                  />

                  {/* Spline Curve */}
                  <path
                    d="M 35 88 Q 75 80, 95 62 T 145 48 T 195 50 T 230 35"
                    fill="none"
                    stroke="#1B7FC9"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* Data Points */}
                  <circle cx="35" cy="88" r="2.5" fill="#1B7FC9" />
                  <circle cx="95" cy="62" r="2.5" fill="#1B7FC9" />
                  <circle cx="145" cy="48" r="2.5" fill="#1B7FC9" />
                  <circle cx="195" cy="50" r="2.5" fill="#1B7FC9" />

                  {/* Active Tooltip Point at Aug 30 */}
                  <circle cx="230" cy="35" r="4.5" fill="#1B7FC9" />
                  <circle cx="230" cy="35" r="1.5" fill="#FFFFFF" />

                  {/* Tooltip Card Bubble */}
                  <g transform="translate(198, 2)">
                    <rect x="0" y="0" width="38" height="20" rx="5" fill="#0C2B47" />
                    <text x="19" y="10" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">78%</text>
                    <text x="19" y="16" textAnchor="middle" fill="#BAE6FD" fontSize="6">Aug 30</text>
                  </g>

                  {/* X Axis Date labels */}
                  <text x="35" y="118" textAnchor="middle" fill="#94A3B8" fontSize="7" fontWeight="500">Aug 1</text>
                  <text x="85" y="118" textAnchor="middle" fill="#94A3B8" fontSize="7" fontWeight="500">Aug 8</text>
                  <text x="135" y="118" textAnchor="middle" fill="#94A3B8" fontSize="7" fontWeight="500">Aug 15</text>
                  <text x="185" y="118" textAnchor="middle" fill="#94A3B8" fontSize="7" fontWeight="500">Aug 22</text>
                  <text x="230" y="118" textAnchor="middle" fill="#94A3B8" fontSize="7" fontWeight="500">Aug 30</text>
                </svg>
              </div>
            </div>
          </div>

          {/* My Courses Progress List (5 Cols) - No sub-words below heading */}
          <div className="md:col-span-5 card p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm">My Courses</h3>
              <button
                onClick={() => navigate('/courses')}
                className="text-xs font-semibold text-[#1B7FC9] hover:underline"
              >
                View All →
              </button>
            </div>

            {/* Courses list with clean icons (no emoji) */}
            <div className="space-y-3">
              {/* Mathematics */}
              <div
                onClick={() => navigate('/courses/seed-course-mathematics')}
                className="flex items-center gap-3 p-1.5 -mx-1.5 rounded-xl hover:bg-[#F0F5FA] cursor-pointer transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Calculator size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-slate-800 text-xs truncate group-hover:text-[#1B7FC9] transition-colors">Mathematics</p>
                    <span className="text-[11px] font-bold text-slate-600">80%</span>
                  </div>
                  <div className="w-full bg-[#E8F2FA] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#1B7FC9] h-full rounded-full transition-all duration-500" style={{ width: '80%' }} />
                  </div>
                </div>
                <span className="text-slate-300 group-hover:text-[#1B7FC9] group-hover:translate-x-0.5 transition-all text-xs">
                  →
                </span>
              </div>

              {/* Physics */}
              <div
                onClick={() => navigate('/courses/seed-course-physics')}
                className="flex items-center gap-3 p-1.5 -mx-1.5 rounded-xl hover:bg-[#F0F5FA] cursor-pointer transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Zap size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-slate-800 text-xs truncate group-hover:text-[#1B7FC9] transition-colors">Physics</p>
                    <span className="text-[11px] font-bold text-slate-600">95%</span>
                  </div>
                  <div className="w-full bg-[#E8F2FA] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#1B7FC9] h-full rounded-full transition-all duration-500" style={{ width: '95%' }} />
                  </div>
                </div>
                <span className="text-slate-300 group-hover:text-[#1B7FC9] group-hover:translate-x-0.5 transition-all text-xs">
                  →
                </span>
              </div>

              {/* Chemistry */}
              <div
                onClick={() => navigate('/courses/seed-course-chemistry')}
                className="flex items-center gap-3 p-1.5 -mx-1.5 rounded-xl hover:bg-[#F0F5FA] cursor-pointer transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center flex-shrink-0 shadow-xs">
                  <FlaskConical size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-slate-800 text-xs truncate group-hover:text-[#1B7FC9] transition-colors">Chemistry</p>
                    <span className="text-[11px] font-bold text-slate-600">65%</span>
                  </div>
                  <div className="w-full bg-[#E8F2FA] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#1B7FC9] h-full rounded-full transition-all duration-500" style={{ width: '65%' }} />
                  </div>
                </div>
                <span className="text-slate-300 group-hover:text-[#1B7FC9] group-hover:translate-x-0.5 transition-all text-xs">
                  →
                </span>
              </div>

              {/* Biology */}
              <div
                onClick={() => navigate('/courses/seed-course-biology')}
                className="flex items-center gap-3 p-1.5 -mx-1.5 rounded-xl hover:bg-[#F0F5FA] cursor-pointer transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Leaf size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-slate-800 text-xs truncate group-hover:text-[#1B7FC9] transition-colors">Biology</p>
                    <span className="text-[11px] font-bold text-slate-600">70%</span>
                  </div>
                  <div className="w-full bg-[#E8F2FA] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#1B7FC9] h-full rounded-full transition-all duration-500" style={{ width: '70%' }} />
                  </div>
                </div>
                <span className="text-slate-300 group-hover:text-[#1B7FC9] group-hover:translate-x-0.5 transition-all text-xs">
                  →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Upcoming Activities - No sub-words below heading */}
        <div className="lg:col-span-4 card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Calendar size={15} className="text-[#1B7FC9]" />
              <h3 className="font-bold text-slate-900 text-sm">Upcoming Activities</h3>
            </div>
            <button
              onClick={() => navigate('/courses')}
              className="text-[11px] font-semibold text-[#1B7FC9] hover:underline"
            >
              Calendar →
            </button>
          </div>

          <div className="space-y-2.5">
            {/* Activity 1: Physics Quiz */}
            <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#F0F5FA] border border-[#D7E5F0]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#D7E5F0] text-center flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-slate-900 leading-none">30</span>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase leading-none mt-0.5">Aug</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-xs">Physics Quiz</p>
                  <p className="text-[10px] text-slate-500">10:00 AM</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/courses/seed-course-physics/quiz/seed-quiz-physics-q1')}
                className="btn-primary text-xs py-1 px-3"
              >
                Start
              </button>
            </div>

            {/* Activity 2: Mathematics Assignment */}
            <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#F0F5FA] border border-[#D7E5F0]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#D7E5F0] text-center flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-slate-900 leading-none">01</span>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase leading-none mt-0.5">Sep</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-xs">Mathematics Assignment</p>
                  <p className="text-[10px] text-slate-500">All Day</p>
                </div>
              </div>
            </div>

            {/* Activity 3: Chemistry Exam */}
            <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#F0F5FA] border border-[#D7E5F0]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#D7E5F0] text-center flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-slate-900 leading-none">03</span>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase leading-none mt-0.5">Sep</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-xs">Chemistry Exam</p>
                  <p className="text-[10px] text-slate-500">09:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ROW 4: Recent Activity, Offline Mode, & Motivation ───────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        {/* Card 1: Recent Activity (4 Cols) - No sub-words below heading */}
        <div className="lg:col-span-4 card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={15} className="text-[#1B7FC9]" />
              <h3 className="font-bold text-slate-900 text-sm">Recent Activity</h3>
            </div>
            <button
              onClick={() => navigate('/progress')}
              className="text-[11px] font-semibold text-[#1B7FC9] hover:underline"
            >
              View All →
            </button>
          </div>

          <div className="space-y-3">
            {/* Item 1 */}
            <div className="flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-6 h-6 rounded-lg bg-[#E6F8F0] text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={13} />
                </span>
                <p className="text-xs font-semibold text-slate-800 truncate">Completed: Biology Chapter 3</p>
              </div>
              <span className="text-[10px] text-slate-400 flex-shrink-0">2h ago</span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-6 h-6 rounded-lg bg-[#E1F0FA] text-[#1B7FC9] flex items-center justify-center flex-shrink-0">
                  <Download size={13} />
                </span>
                <p className="text-xs font-semibold text-slate-800 truncate">Downloaded: Physics Notes</p>
              </div>
              <span className="text-[10px] text-slate-400 flex-shrink-0">3h ago</span>
            </div>

            {/* Item 3 */}
            <div className="flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-6 h-6 rounded-lg bg-[#E1F0FA] text-[#1B7FC9] flex items-center justify-center flex-shrink-0">
                  <Award size={13} />
                </span>
                <p className="text-xs font-semibold text-slate-800 truncate">Score: 18/20 in Math Quiz</p>
              </div>
              <span className="text-[10px] text-slate-400 flex-shrink-0">1d ago</span>
            </div>
          </div>
        </div>

        {/* Card 2: Offline Mode (4 Cols) - No sub-words below heading */}
        <div className="lg:col-span-4 card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Download size={15} className="text-[#1B7FC9]" />
              <h3 className="font-bold text-slate-900 text-sm">Offline Mode</h3>
            </div>
            <span className={`px-2 py-0.5 rounded-full ${isOnline ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'} text-[10px] font-semibold`}>
              {isOnline ? 'Active' : 'Offline'}
            </span>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5 text-xs font-medium text-slate-700">
              <p className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 size={14} className="text-emerald-500" /> 5 courses available offline
              </p>
              <p className="flex items-center gap-2 text-slate-600">
                <CheckCircle2 size={14} className="text-slate-400" /> Last synced: 2 hours ago
              </p>
            </div>
            <button
              onClick={() => navigate('/downloads')}
              className="btn-outline w-full text-xs py-2 rounded-xl flex items-center justify-center gap-2"
            >
              <Download size={13} /> Manage Downloads
            </button>
          </div>
        </div>

        {/* Card 3: Motivation Card (4 Cols) - No sub-words below heading */}
        <div className="lg:col-span-4 rounded-2xl bg-[#E1F0FA] border border-[#CBE4F6] p-5 text-slate-900 shadow-card flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 mb-4">You're doing great!</h3>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-semibold text-[#1465A3]">Overall completion: 78%</span>
            <button
              onClick={() => navigate('/progress')}
              className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
            >
              <span>View Progress</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
