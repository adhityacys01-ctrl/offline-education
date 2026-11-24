import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen, Users, FileText, AlertTriangle, ArrowRight,
  CheckCircle2, MessageSquare, RefreshCw
} from 'lucide-react'

interface CourseItem {
  id: string
  title: string
  grade: string
  students: number
  avgScore: number
  image: string
}

const ASSIGNED_COURSES: CourseItem[] = [
  {
    id: 'seed-course-math',
    title: 'Mathematics - Class 10',
    grade: 'Class 10',
    students: 120,
    avgScore: 85,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'seed-course-science',
    title: 'Science - Class 10',
    grade: 'Class 10',
    students: 110,
    avgScore: 82,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'seed-course-history',
    title: 'History - Class 10',
    grade: 'Class 10',
    students: 95,
    avgScore: 78,
    image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=400&q=80',
  },
]

export default function TeacherDashboardPage() {
  const navigate = useNavigate()
  const [hoveredDay, setHoveredDay] = useState<string | null>(null)

  // Chart data points
  const days = [
    { label: 'Mon', current: 35, last: 55 },
    { label: 'Tue', current: 52, last: 48 },
    { label: 'Wed', current: 65, last: 42 },
    { label: 'Thu', current: 80, last: 52 },
    { label: 'Fri', current: 70, last: 45 },
    { label: 'Sat', current: 75, last: 58 },
    { label: 'Sun', current: 92, last: 65 },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* ── Page Header (Strictly NO descriptive subheadings) ────────────────── */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Teacher Dashboard
        </h1>
      </div>

      {/* ── 4 Top Stat Cards (Exactly Matching Image 1) ─────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Courses */}
        <div
          onClick={() => navigate('/teacher/courses')}
          className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-5 flex items-center gap-4 cursor-pointer hover:border-[#1B7FC9] hover:shadow-xs transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-[#E1EEF8] text-[#1B7FC9] flex items-center justify-center flex-shrink-0">
            <BookOpen size={22} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">5</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Courses</p>
          </div>
        </div>

        {/* Card 2: Students */}
        <div
          onClick={() => navigate('/teacher/progress')}
          className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-5 flex items-center gap-4 cursor-pointer hover:border-emerald-500 hover:shadow-xs transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Users size={22} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">120</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Students</p>
          </div>
        </div>

        {/* Card 3: Submissions */}
        <div
          onClick={() => navigate('/teacher/assessments')}
          className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-5 flex items-center gap-4 cursor-pointer hover:border-amber-500 hover:shadow-xs transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center flex-shrink-0">
            <FileText size={22} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">85</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Submissions</p>
          </div>
        </div>

        {/* Card 4: Pending Review */}
        <div
          onClick={() => navigate('/teacher/assessments')}
          className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-5 flex items-center gap-4 cursor-pointer hover:border-rose-500 hover:shadow-xs transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={22} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">12</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pending Review</p>
          </div>
        </div>
      </div>

      {/* ── Middle Section: Course Performance & Recent Activity ─────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Course Performance (Image 1 Chart) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Course Performance
            </h2>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-[#1B7FC9]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1B7FC9]" />
                This Month
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full border border-slate-400" />
                Last Month
              </span>
            </div>
          </div>

          {/* Line Chart Visual with SVG Curves & Hoverable Points */}
          <div className="relative pt-4 pb-2">
            <div className="flex">
              {/* Y-axis Labels */}
              <div className="flex flex-col justify-between text-[11px] text-slate-400 font-medium pr-3 h-48 select-none">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>

              {/* Chart Grid & SVG Path */}
              <div className="relative flex-1 h-48">
                {/* Horizontal Guide Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <div className="w-full border-b border-dashed border-[#E5EEF6] dark:border-[#1E2D48]" />
                  <div className="w-full border-b border-dashed border-[#E5EEF6] dark:border-[#1E2D48]" />
                  <div className="w-full border-b border-dashed border-[#E5EEF6] dark:border-[#1E2D48]" />
                  <div className="w-full border-b border-dashed border-[#E5EEF6] dark:border-[#1E2D48]" />
                  <div className="w-full border-b border-[#D7E5F0] dark:border-[#223652]" />
                </div>

                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 200">
                  {/* Subtle Gradient fill for This Month */}
                  <defs>
                    <linearGradient id="performanceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1B7FC9" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#1B7FC9" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Last Month Line (Muted Gray-Blue) */}
                  <path
                    d="M 20 90 Q 110 110 200 120 T 380 110 T 580 70"
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />

                  {/* This Month Line (Primary Blue Curve) */}
                  <path
                    d="M 20 130 Q 110 90 200 70 T 380 50 T 580 15"
                    fill="none"
                    stroke="#1B7FC9"
                    strokeWidth="3.2"
                  />

                  {/* Filled Area */}
                  <path
                    d="M 20 130 Q 110 90 200 70 T 380 50 T 580 15 L 580 200 L 20 200 Z"
                    fill="url(#performanceGrad)"
                  />
                </svg>

                {/* Interactive Points on Line */}
                <div className="absolute inset-0 flex justify-between items-end px-2 pointer-events-auto">
                  {days.map((d) => (
                    <div
                      key={d.label}
                      onMouseEnter={() => setHoveredDay(d.label)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className="flex flex-col items-center relative group cursor-pointer"
                      style={{ height: '100%', justifyContent: 'flex-end' }}
                    >
                      {hoveredDay === d.label && (
                        <div className="absolute top-2 -translate-y-full bg-slate-900 text-white text-[10px] py-1 px-2 rounded-md shadow-lg pointer-events-none whitespace-nowrap z-20">
                          {d.label}: {d.current}% Avg
                        </div>
                      )}
                      <div
                        className="w-3 h-3 rounded-full bg-white border-2 border-[#1B7FC9] shadow-xs mb-1 hover:scale-125 transition-transform"
                        style={{ marginBottom: `${d.current * 1.8}px` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* X-axis Labels */}
            <div className="flex justify-between pl-10 pr-2 pt-2 text-xs font-semibold text-slate-500 select-none">
              {days.map((d) => (
                <span key={d.label}>{d.label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Recent Activity (Image 1 List) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-5 flex flex-col justify-between shadow-xs">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4">
              Recent Activity
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E1EEF8] dark:bg-[#1A2E46] text-[#1B7FC9] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileText size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">New submission</p>
                  <p className="text-[11px] text-slate-400">5 min ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E1EEF8] dark:bg-[#1A2E46] text-[#1B7FC9] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageSquare size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Feedback added</p>
                  <p className="text-[11px] text-slate-400">5 min ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E1EEF8] dark:bg-[#1A2E46] text-[#1B7FC9] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Quiz completed</p>
                  <p className="text-[11px] text-slate-400">10 min ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <RefreshCw size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Offline batch synced</p>
                  <p className="text-[11px] text-slate-400">25 min ago</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/teacher/assessments')}
            className="w-full mt-4 py-2 text-xs font-semibold text-[#1465A3] bg-[#E1EEF8] dark:bg-[#1A2E46] hover:bg-[#D2E5F5] rounded-xl transition-all text-center"
          >
            View All Activity
          </button>
        </div>
      </div>

      {/* ── Bottom Section: Assigned Courses (Exactly Matching Image 1) ─────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Assigned Courses
          </h2>
          <button
            onClick={() => navigate('/teacher/courses')}
            className="text-xs font-bold text-[#1B7FC9] hover:text-[#1465A3] flex items-center gap-1 transition-colors"
          >
            View All <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ASSIGNED_COURSES.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-4 flex items-center justify-between gap-4 shadow-xs hover:border-[#1B7FC9] transition-all"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-[#D7E5F0] dark:border-[#1E2D48]"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {course.students} Students • {course.avgScore}% Avg Score
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/teacher/courses')}
                className="px-4 py-2 rounded-xl bg-[#E1EEF8] dark:bg-[#1A2E46] text-[#1465A3] dark:text-[#38BDF8] text-xs font-bold hover:bg-[#1B7FC9] hover:text-white transition-all flex-shrink-0"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
