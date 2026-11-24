import { useState } from 'react'
import { Download, Printer, ChevronDown } from 'lucide-react'

interface StudentReportRow {
  id: string
  studentName: string
  rollNo: string
  course: string
  completedLessons: number
  quizzesTaken: number
  avgScore: number
  grade: string
  status: string
}

const REPORT_DATA: StudentReportRow[] = [
  { id: '1', studentName: 'Aarav Sharma', rollNo: '10-A-01', course: 'Mathematics', completedLessons: 10, quizzesTaken: 3, avgScore: 92, grade: 'A+', status: 'Active' },
  { id: '2', studentName: 'Diya Patel', rollNo: '10-A-02', course: 'Science', completedLessons: 9, quizzesTaken: 3, avgScore: 88, grade: 'A', status: 'Active' },
  { id: '3', studentName: 'Rohan Mehta', rollNo: '10-A-03', course: 'History', completedLessons: 7, quizzesTaken: 2, avgScore: 68, grade: 'B', status: 'Active' },
  { id: '4', studentName: 'Sneha Iyer', rollNo: '10-A-04', course: 'Environmental Science', completedLessons: 8, quizzesTaken: 2, avgScore: 71, grade: 'B+', status: 'Active' },
  { id: '5', studentName: 'Kavya Singh', rollNo: '10-A-05', course: 'Mathematics', completedLessons: 10, quizzesTaken: 3, avgScore: 94, grade: 'A+', status: 'Active' },
  { id: '6', studentName: 'Arjun Verma', rollNo: '10-A-06', course: 'Science', completedLessons: 8, quizzesTaken: 2, avgScore: 76, grade: 'B+', status: 'Active' },
]

export default function TeacherReportsPage() {
  const [courseFilter, setCourseFilter] = useState('All Courses')
  const [termFilter, setTermFilter] = useState('Mid-Term 2026')
  const [isExporting, setIsExporting] = useState(false)

  const filteredData = REPORT_DATA.filter(
    (r) => courseFilter === 'All Courses' || r.course.toLowerCase().includes(courseFilter.toLowerCase())
  )

  const handleExportCSV = () => {
    setIsExporting(true)
    const headers = ['Roll No', 'Student Name', 'Course', 'Completed Lessons', 'Quizzes Taken', 'Average Score (%)', 'Grade', 'Status']
    const rows = filteredData.map((r) => [
      r.rollNo,
      `"${r.studentName}"`,
      `"${r.course}"`,
      r.completedLessons,
      r.quizzesTaken,
      r.avgScore,
      r.grade,
      r.status,
    ])

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `Student-Performance-Report-${courseFilter.replace(/ /g, '_')}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => setIsExporting(false), 800)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 print:p-0">
      {/* ── Page Header (Strictly NO subheadings) ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Reports & Analytics
        </h1>

        <div className="flex items-center gap-2.5 print:hidden">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#131F33] border border-[#D7E5F0] dark:border-[#1E2D48] text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-[#1B7FC9] flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Printer size={14} />
            Print Report
          </button>

          <button
            onClick={handleExportCSV}
            disabled={isExporting}
            className="px-4 py-2 rounded-xl bg-[#1B7FC9] hover:bg-[#1465A3] active:scale-[0.98] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
          >
            <Download size={14} />
            {isExporting ? 'Exporting...' : 'Export CSV'}
          </button>
        </div>
      </div>

      {/* ── Metric Summary Cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Overall Average</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">84.8%</p>
        </div>
        <div className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Total Students</p>
          <p className="text-2xl font-bold text-[#1465A3] dark:text-[#38BDF8] mt-1">120</p>
        </div>
        <div className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Passing Rate</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">96.5%</p>
        </div>
        <div className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Total Quizzes</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">85</p>
        </div>
      </div>

      {/* ── Filters ───────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3 print:hidden">
        <div className="relative">
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="appearance-none pl-4 pr-9 py-2 bg-white dark:bg-[#131F33] border border-[#D7E5F0] dark:border-[#1E2D48] rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]"
          >
            <option value="All Courses">All Courses</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Environmental Science">Environmental Science</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={termFilter}
            onChange={(e) => setTermFilter(e.target.value)}
            className="appearance-none pl-4 pr-9 py-2 bg-white dark:bg-[#131F33] border border-[#D7E5F0] dark:border-[#1E2D48] rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]"
          >
            <option value="Mid-Term 2026">Mid-Term 2026</option>
            <option value="Final Term 2025">Final Term 2025</option>
            <option value="Full Academic Year">Full Academic Year</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* ── Report Table ─────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#D7E5F0] dark:border-[#1E2D48] bg-[#F8FAFC] dark:bg-[#0E1726]/50">
                <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Roll No
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Student Name
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Course
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Lessons Done
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Quizzes
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Average
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Grade
                </th>
                <th className="py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300 text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBF2F7] dark:divide-[#1A2E46]">
              {filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-[#F0F5FA] dark:hover:bg-[#1A2E46]/40 transition-colors">
                  <td className="py-3.5 px-5 text-xs font-mono text-slate-500">
                    {row.rollNo}
                  </td>
                  <td className="py-3.5 px-5 text-xs font-bold text-slate-900 dark:text-slate-100">
                    {row.studentName}
                  </td>
                  <td className="py-3.5 px-5 text-xs font-medium text-slate-700 dark:text-slate-300">
                    {row.course}
                  </td>
                  <td className="py-3.5 px-5 text-xs font-medium text-slate-700 dark:text-slate-300">
                    {row.completedLessons}/10
                  </td>
                  <td className="py-3.5 px-5 text-xs font-medium text-slate-700 dark:text-slate-300">
                    {row.quizzesTaken}
                  </td>
                  <td className="py-3.5 px-5 text-xs font-bold text-slate-900 dark:text-slate-100">
                    {row.avgScore}%
                  </td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        row.grade.startsWith('A')
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                          : 'bg-[#E1EEF8] dark:bg-[#1A2E46] text-[#1465A3] dark:text-[#38BDF8]'
                      }`}
                    >
                      {row.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
