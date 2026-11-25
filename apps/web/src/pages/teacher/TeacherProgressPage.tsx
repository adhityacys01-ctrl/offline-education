import { useState } from 'react'
import { ChevronDown, Search, X } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

interface StudentProgressRecord {
  id: string
  name: string
  grade: string
  course: string
  progress: number
  avgScore: number
  avatar: string
  quizzesCompleted: number
  lessonsCompleted: number
  lastActive: string
  status: 'Online' | 'Offline'
}

const STUDENTS_DATA: StudentProgressRecord[] = [
  {
    id: 'std-1',
    name: 'Aarav Sharma',
    grade: 'Class 10',
    course: 'Mathematics',
    progress: 95,
    avgScore: 92,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
    quizzesCompleted: 6,
    lessonsCompleted: 10,
    lastActive: '10 min ago',
    status: 'Online',
  },
  {
    id: 'std-2',
    name: 'Diya Patel',
    grade: 'Class 10',
    course: 'Science',
    progress: 90,
    avgScore: 88,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    quizzesCompleted: 5,
    lessonsCompleted: 9,
    lastActive: '25 min ago',
    status: 'Online',
  },
  {
    id: 'std-3',
    name: 'Rohan Mehta',
    grade: 'Class 10',
    course: 'History',
    progress: 76,
    avgScore: 68,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    quizzesCompleted: 4,
    lessonsCompleted: 7,
    lastActive: '2 hours ago',
    status: 'Offline',
  },
  {
    id: 'std-4',
    name: 'Sneha Iyer',
    grade: 'Class 10',
    course: 'Environmental Science',
    progress: 72,
    avgScore: 71,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    quizzesCompleted: 4,
    lessonsCompleted: 7,
    lastActive: '1 day ago',
    status: 'Offline',
  },
]

export default function TeacherProgressPage() {
  const { t, translateCourseTitle } = useI18n()
  const [courseFilter, setCourseFilter] = useState('All Courses')
  const [timeFilter, setTimeFilter] = useState('Last 30 Days')
  const [search, setSearch] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<StudentProgressRecord | null>(null)

  const filteredStudents = STUDENTS_DATA.filter((s) => {
    const matchesCourse = courseFilter === 'All Courses' || s.course.toLowerCase().includes(courseFilter.toLowerCase())
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.course.toLowerCase().includes(search.toLowerCase())
    return matchesCourse && matchesSearch
  })

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* ── Page Header (Strictly NO subheadings) ─────────────────────────── */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          {t('studentProgress')}
        </h1>
      </div>

      {/* ── Filters (Dropdowns Matching Image 3) ──────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Course Filter Dropdown */}
        <div className="relative">
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="appearance-none pl-4 pr-9 py-2 bg-white dark:bg-[#131F33] border border-[#D7E5F0] dark:border-[#1E2D48] rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]"
          >
            <option value="All Courses">{t('allCourses')}</option>
            <option value="Mathematics">{translateCourseTitle('Mathematics')}</option>
            <option value="Science">{translateCourseTitle('Science')}</option>
            <option value="History">{translateCourseTitle('History')}</option>
            <option value="Environmental Science">{translateCourseTitle('Environmental Science')}</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Time Period Filter Dropdown */}
        <div className="relative">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="appearance-none pl-4 pr-9 py-2 bg-white dark:bg-[#131F33] border border-[#D7E5F0] dark:border-[#1E2D48] rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]"
          >
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">{t('last30Days')}</option>
            <option value="Academic Term">Academic Term</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-white dark:bg-[#131F33] border border-[#D7E5F0] dark:border-[#1E2D48] rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]"
          />
        </div>
      </div>

      {/* ── Table (Matching Image 3 Layout) ───────────────────────────────── */}
      <div className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#D7E5F0] dark:border-[#1E2D48] bg-[#F8FAFC] dark:bg-[#0E1726]/50">
                <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  {t('student')}
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  {t('course')}
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  {t('progress')}
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300 text-right">
                  {t('averageScore')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBF2F7] dark:divide-[#1A2E46]">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className="hover:bg-[#F0F5FA] dark:hover:bg-[#1A2E46]/40 cursor-pointer transition-colors"
                >
                  {/* Student */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#D7E5F0] dark:border-[#1E2D48]"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {student.name}
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium">
                          {student.grade}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Course */}
                  <td className="py-4 px-5">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {student.course}
                    </span>
                  </td>

                  {/* Progress Bar + % */}
                  <td className="py-4 px-5 min-w-[200px]">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-[#E5EEF6] dark:bg-[#1E2D48] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#1B7FC9] to-emerald-500 transition-all duration-500"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 w-9 text-right">
                        {student.progress}%
                      </span>
                    </div>
                  </td>

                  {/* Average Score */}
                  <td className="py-4 px-5 text-right">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {student.avgScore}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Student Details Modal ─────────────────────────────────────────── */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] max-w-lg w-full p-6 shadow-xl animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#D7E5F0] dark:border-[#1E2D48]">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#D7E5F0]"
                />
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {selectedStudent.name}
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">
                    {selectedStudent.grade} • {selectedStudent.course}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#F4F8FC] dark:bg-[#0E1726] border border-[#D7E5F0] dark:border-[#1E2D48]">
                  <p className="text-[11px] font-semibold text-slate-500">Course Progress</p>
                  <p className="text-xl font-bold text-[#1465A3] dark:text-[#38BDF8] mt-0.5">
                    {selectedStudent.progress}%
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#F4F8FC] dark:bg-[#0E1726] border border-[#D7E5F0] dark:border-[#1E2D48]">
                  <p className="text-[11px] font-semibold text-slate-500">Average Score</p>
                  <p className="text-xl font-bold text-emerald-600 mt-0.5">
                    {selectedStudent.avgScore}%
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#D7E5F0] dark:border-[#1E2D48] space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Completed Lessons:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{selectedStudent.lessonsCompleted}/10 Lessons</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Completed Quizzes:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{selectedStudent.quizzesCompleted} Quizzes</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Device Status:</span>
                  <span className={`font-bold ${selectedStudent.status === 'Online' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {selectedStudent.status} (active {selectedStudent.lastActive})
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D7E5F0] dark:border-[#1E2D48] flex justify-end gap-2">
              <button
                onClick={() => setSelectedStudent(null)}
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
