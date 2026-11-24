import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, ChevronDown, Download, CheckCircle2, RefreshCw, Trash2, WifiOff } from 'lucide-react'
import { fetchCourses } from '@/lib/api'
import { useCoursePackStatus, useDownloadManager } from '@/hooks/useDownload'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/database'
import { cn } from '@/lib/utils'

interface CourseMeta {
  id: string
  title: string
  subject: string
  chapter: string
  progress: number
  image: string
  lessonCount: number
  quizCount: number
  offlinePackageSizeMb: number
}

const DEFAULT_COURSES: CourseMeta[] = [
  {
    id: 'seed-course-computer-science',
    title: 'Environmental Science',
    subject: 'Environmental Science',
    chapter: 'Chapter 1 - Climate Change',
    progress: 70,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&auto=format&fit=crop&q=80',
    lessonCount: 10,
    quizCount: 3,
    offlinePackageSizeMb: 12,
  },
  {
    id: 'seed-course-mathematics',
    title: 'Mathematics',
    subject: 'Mathematics',
    chapter: 'Chapter 3 - Algebra',
    progress: 40,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=700&auto=format&fit=crop&q=80',
    lessonCount: 10,
    quizCount: 3,
    offlinePackageSizeMb: 14,
  },
  {
    id: 'seed-course-biology',
    title: 'Biology',
    subject: 'Biology',
    chapter: 'Chapter 3 - Photosynthesis',
    progress: 60,
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=700&auto=format&fit=crop&q=80',
    lessonCount: 10,
    quizCount: 3,
    offlinePackageSizeMb: 11,
  },
  {
    id: 'seed-course-history',
    title: 'History of India',
    subject: 'History',
    chapter: 'Chapter 2 - Ancient India',
    progress: 25,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=700&auto=format&fit=crop&q=80',
    lessonCount: 10,
    quizCount: 3,
    offlinePackageSizeMb: 15,
  },
  {
    id: 'seed-course-physics',
    title: 'Physics',
    subject: 'Physics',
    chapter: 'Chapter 2 - Laws of Motion',
    progress: 95,
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=700&auto=format&fit=crop&q=80',
    lessonCount: 10,
    quizCount: 3,
    offlinePackageSizeMb: 16,
  },
  {
    id: 'seed-course-chemistry',
    title: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Chapter 1 - Chemical Reactions',
    progress: 65,
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=700&auto=format&fit=crop&q=80',
    lessonCount: 10,
    quizCount: 3,
    offlinePackageSizeMb: 13,
  },
]

function CourseCard({
  course,
  downloading,
  onDownload,
  onDelete,
}: {
  course: CourseMeta
  downloading: number | undefined
  onDownload: () => void
  onDelete: () => void
}) {
  const navigate = useNavigate()
  const pack = useCoursePackStatus(course.id)
  const isAvailable = pack?.status === 'AVAILABLE_OFFLINE'
  const isDownloading = downloading !== undefined || pack?.status === 'DOWNLOADING'

  // Query completed lessons for this course to calculate dynamic progress
  const progressItems = useLiveQuery(
    () => db.progress.where('courseId').equals(course.id).toArray(),
    [course.id],
    []
  )
  const completedCount = progressItems.filter((p) => p.completed).length
  const dynamicPct = completedCount > 0 
    ? Math.min(100, Math.round((completedCount / (course.lessonCount || 10)) * 100))
    : course.progress

  return (
    <div
      onClick={() => navigate(`/courses/${course.id}`)}
      className="bg-white rounded-2xl p-4 md:p-5 border border-[#D7E5F0] shadow-xs hover:border-[#1B7FC9] hover:shadow-card transition-all duration-200 flex flex-col justify-between group cursor-pointer relative"
    >
      <div>
        {/* Cover Photo */}
        <div className="w-full h-40 md:h-44 rounded-xl overflow-hidden mb-3.5 relative bg-[#F0F5FA] border border-[#D7E5F0]">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const parent = (e.target as HTMLElement).parentElement
              if (parent) {
                parent.className = 'w-full h-40 md:h-44 rounded-xl flex items-center justify-center bg-[#E1F0FA] text-[#1B7FC9] mb-3.5'
                parent.innerHTML = '<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>'
              }
            }}
          />

          {/* Offline Ready Badge overlay */}
          {isAvailable && (
            <div className="absolute top-2.5 right-2.5 bg-[#E1F0FA] text-[#1465A3] border border-[#CBE4F6] text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
              <CheckCircle2 size={12} strokeWidth={2.5} /> Ready Offline
            </div>
          )}
        </div>

        {/* Title & Chapter Subtitle */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1B7FC9] transition-colors tracking-tight">
          {course.title}
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5 mb-3.5">
          {course.chapter}
        </p>

        {/* Progress Bar & Percentage */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 bg-[#E8F2FA] h-2 rounded-full overflow-hidden border border-[#D7E5F0]">
            <div
              className="h-full rounded-full transition-all duration-500 bg-[#1B7FC9]"
              style={{ width: `${dynamicPct}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-600 min-w-[28px] text-right">
            {dynamicPct}%
          </span>
        </div>
      </div>

      {/* Action Row */}
      <div className="flex items-center justify-between pt-1" onClick={(e) => e.stopPropagation()}>
        {/* Offline / Download Quick Button */}
        <div className="flex items-center gap-1.5">
          {isAvailable ? (
            <button
              onClick={onDelete}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              title="Remove offline copy"
            >
              <Trash2 size={14} />
            </button>
          ) : isDownloading ? (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#1465A3] bg-[#E1F0FA] px-2 py-1 rounded-lg border border-[#CBE4F6]">
              <RefreshCw size={11} className="animate-spin" />
              <span>{downloading ?? pack?.progressPct ?? 0}%</span>
            </div>
          ) : (
            <button
              onClick={onDownload}
              className="p-2 text-slate-400 hover:text-[#1B7FC9] hover:bg-[#E1F0FA] rounded-xl transition-colors"
              title="Download for offline study"
            >
              <Download size={15} />
            </button>
          )}
        </div>

        {/* Continue Learning Pill Button */}
        <button
          onClick={() => navigate(`/courses/${course.id}`)}
          className="bg-[#1B7FC9] hover:bg-[#1465A3] active:scale-[0.98] text-white text-xs font-bold py-2.5 px-5 rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
        >
          Continue Learning <ArrowRight size={13} />
        </button>
      </div>
    </div>
  )
}

export function CoursesPage() {
  const isOnline = useOnlineStatus()
  const [selectedFilter, setSelectedFilter] = useState('All Courses')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { startDownload, removeDownload, downloading } = useDownloadManager()

  const { data: apiCourses = [] } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
    enabled: isOnline,
    staleTime: 5 * 60 * 1000,
  })

  // Merge API courses or fallback default courses seamlessly
  const courses: CourseMeta[] = DEFAULT_COURSES.map((fallback) => {
    const apiCourse = apiCourses.find((c) => c.id === fallback.id || c.title.toLowerCase().includes(fallback.subject.toLowerCase()))
    if (apiCourse) {
      return {
        ...fallback,
        title: fallback.title,
        lessonCount: apiCourse.lessonCount || fallback.lessonCount,
        quizCount: apiCourse.quizCount || fallback.quizCount,
        offlinePackageSizeMb: apiCourse.offlinePackageSizeMb || fallback.offlinePackageSizeMb,
      }
    }
    return fallback
  })

  // Filter list
  const filterOptions = ['All Courses', 'Environmental Science', 'Mathematics', 'Biology', 'History', 'Physics', 'Chemistry']

  const filteredCourses = selectedFilter === 'All Courses'
    ? courses
    : courses.filter((c) => c.subject.toLowerCase().includes(selectedFilter.toLowerCase()) || c.title.toLowerCase().includes(selectedFilter.toLowerCase()))

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* ── Page Header (Without descriptive subtext below heading) ────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            My Courses
          </h1>
        </div>

        {/* Filter Dropdown */}
        <div className="relative self-start sm:self-auto">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-white border border-[#D7E5F0] shadow-xs hover:border-[#1B7FC9] px-4 py-2 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 transition-all active:scale-95"
          >
            <span>{selectedFilter}</span>
            <ChevronDown size={14} className={cn('text-slate-400 transition-transform', dropdownOpen && 'rotate-180')} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-card border border-[#D7E5F0] py-1.5 z-30 animate-in fade-in zoom-in-95">
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSelectedFilter(opt)
                    setDropdownOpen(false)
                  }}
                  className={cn(
                    'w-full text-left px-4 py-2 text-xs font-medium transition-colors',
                    selectedFilter === opt
                      ? 'bg-[#E1F0FA] text-[#1465A3] font-bold'
                      : 'text-slate-700 hover:bg-[#F0F5FA]'
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Offline banner notification if disconnected */}
      {!isOnline && (
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl">
          <WifiOff size={14} /> Offline Mode active — courses downloaded to your device remain fully playable.
        </div>
      )}

      {/* ── Course Grid (2 Columns) ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            downloading={downloading[course.id]}
            onDownload={() => {
              const apiItem = apiCourses.find((c) => c.id === course.id)
              if (apiItem) {
                startDownload(apiItem)
              } else {
                startDownload({
                  id: course.id,
                  title: course.title,
                  subject: course.subject,
                  description: course.chapter,
                  offlinePackageSizeMb: course.offlinePackageSizeMb,
                  lessonCount: course.lessonCount,
                  quizCount: course.quizCount,
                })
              }
            }}
            onDelete={() => removeDownload(course.id)}
          />
        ))}
      </div>
    </div>
  )
}
