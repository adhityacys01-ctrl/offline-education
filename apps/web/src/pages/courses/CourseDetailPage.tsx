import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Download, CheckCircle, PlayCircle,
  HelpCircle, Trash2, RefreshCw, BookOpen, Clock, FileText,
  Leaf, Calculator, Zap, FlaskConical, Landmark
} from 'lucide-react'
import { fetchCourse } from '@/lib/api'
import { useCoursePackStatus, useDownloadManager } from '@/hooks/useDownload'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { getLocalLessonsForCourse, getLocalQuizzesForCourse } from '@/services/downloadEngine'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/database'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

interface LessonItem {
  id: string
  title: string
  order: number
  keyPoints?: string[]
}

interface QuizItem {
  id: string
  title: string
  version: number
}

function getSubjectIcon(subject: string) {
  switch (subject) {
    case 'Biology':
      return Leaf
    case 'Mathematics':
      return Calculator
    case 'Physics':
      return Zap
    case 'Chemistry':
      return FlaskConical
    case 'History':
      return Landmark
    default:
      return BookOpen
  }
}

export function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const isOnline = useOnlineStatus()
  const { t, translateSubject, translateCourseTitle } = useI18n()
  const pack = useCoursePackStatus(courseId || '')
  const { startDownload, removeDownload, downloading } = useDownloadManager()

  const [activeTab, setActiveTab] = useState<'chapters' | 'quizzes' | 'about'>('chapters')
  const [course, setCourse] = useState<any>(null)
  const [lessons, setLessons] = useState<LessonItem[]>([])
  const [quizzes, setQuizzes] = useState<QuizItem[]>([])
  const [loading, setLoading] = useState(true)

  // Track completed lessons from IndexedDB
  const completedLessons = useLiveQuery(
    () => db.progress.where('courseId').equals(courseId || '').toArray(),
    [courseId],
    [],
  )
  const completedSet = new Set((completedLessons || []).filter((l) => l.completed).map((l) => l.lessonId))

  // Track quiz attempts / receipts
  const attempts = useLiveQuery(() => db.attempts.toArray(), [], [])
  const receipts = useLiveQuery(() => db.syncReceipts.toArray(), [], [])

  useEffect(() => {
    if (!courseId) return

    async function loadData() {
      setLoading(true)
      try {
        // 1. Try local IndexedDB first
        const localLessons = await getLocalLessonsForCourse(courseId!)
        const localQuizzes = await getLocalQuizzesForCourse(courseId!)

        if (localLessons && localLessons.length > 0) {
          setLessons(localLessons.map((l) => ({ id: l.id, title: l.title, order: l.order })))
        }
        if (localQuizzes && localQuizzes.length > 0) {
          setQuizzes(
            localQuizzes.map((q) => {
              let version = 1
              try {
                const parsed = JSON.parse(q.contentJson)
                version = parsed.version || 1
              } catch { }
              return { id: q.id, title: q.title, version }
            })
          )
        }

        // 2. Fetch fresh course detail from API if online
        if (isOnline) {
          const apiCourse = await fetchCourse(courseId!)
          setCourse(apiCourse)
          if (apiCourse.lessons && apiCourse.lessons.length > 0) {
            setLessons(apiCourse.lessons)
          }
          if (apiCourse.quizVersions && apiCourse.quizVersions.length > 0) {
            setQuizzes(apiCourse.quizVersions)
          }
        } else if (pack) {
          setCourse({
            id: pack.courseId,
            title: pack.courseTitle,
            subject: pack.subject,
            description: 'Offline course pack available on this device.',
            offlinePackageSizeMb: pack.totalSizeMb,
          })
        }
      } catch (err) {
        console.warn('Could not fetch course detail from API, using local cache:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [courseId, isOnline, pack])

  if (loading && !course) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 text-[#1B7FC9] animate-spin" />
      </div>
    )
  }

  const title = course?.title || pack?.courseTitle || 'Course Details'
  const subject = course?.subject || pack?.subject || 'Education'
  const SubjectIcon = getSubjectIcon(subject)
  const isAvailable = pack?.status === 'AVAILABLE_OFFLINE'
  const isDownloading = downloading[courseId || ''] !== undefined || pack?.status === 'DOWNLOADING'
  const pct = downloading[courseId || ''] ?? pack?.progressPct ?? 0

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-12">
      {/* Back button */}
      <button
        onClick={() => navigate('/courses')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#1B7FC9] transition-colors"
      >
        <ArrowLeft size={15} /> Back to Courses
      </button>

      {/* Hero Banner */}
      <div className="bg-white rounded-2xl p-6 md:p-8 relative overflow-hidden border border-[#D7E5F0] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Cover icon */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center shadow-xs flex-shrink-0">
            <SubjectIcon size={36} strokeWidth={2.2} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-[#E1F0FA] text-[#1465A3] border border-[#CBE4F6] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {translateSubject(subject)}
              </span>
              {isAvailable && (
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <CheckCircle size={12} /> {t('offlineReady')}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 truncate">
              {translateCourseTitle(title)}
            </h1>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-1">
                <BookOpen size={14} className="text-[#1B7FC9]" /> {lessons.length} {t('lessons')}
              </span>
              <span className="inline-flex items-center gap-1">
                <HelpCircle size={14} className="text-[#1B7FC9]" /> {quizzes.length} {t('quizzes')}
              </span>
              <span className="inline-flex items-center gap-1">
                <Download size={14} className="text-[#1B7FC9]" /> {course?.offlinePackageSizeMb || pack?.totalSizeMb || 10} MB
              </span>
            </div>
          </div>

          {/* Action button */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            {isAvailable ? (
              <div className="flex items-center gap-2">
                <span className="bg-[#E1F0FA] text-[#1465A3] border border-[#CBE4F6] py-2 px-3 text-xs font-bold rounded-xl shadow-xs">
                  ✓ {t('downloaded')}
                </span>
                <button
                  onClick={() => removeDownload(courseId!)}
                  className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors border border-rose-200"
                  title="Remove offline copy"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : isDownloading ? (
              <div className="w-48 space-y-1.5">
                <div className="w-full bg-[#E8F2FA] h-2 rounded-full overflow-hidden border border-[#D7E5F0]">
                  <div className="h-full bg-[#1B7FC9] rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-center text-slate-500 font-medium">{pct}% {t('downloading')}</p>
              </div>
            ) : (
              <button
                onClick={() => startDownload(course || { id: courseId, title, subject, offlinePackageSizeMb: 10 })}
                className="bg-[#1B7FC9] hover:bg-[#1465A3] active:scale-[0.98] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-xs flex items-center gap-2 transition-all"
              >
                <Download size={16} /> {t('download')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#D7E5F0] flex gap-6">
        {[
          { key: 'chapters', label: `${t('lessons')} (${lessons.length})`, icon: BookOpen },
          { key: 'quizzes', label: `${t('quizzes')} (${quizzes.length})`, icon: HelpCircle },
          { key: 'about', label: 'About Course', icon: FileText },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={cn(
              'pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all',
              activeTab === key
                ? 'border-[#1B7FC9] text-[#1B7FC9]'
                : 'border-transparent text-slate-500 hover:text-slate-800',
            )}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {/* Tab 1: Chapters (Lessons) */}
      {activeTab === 'chapters' && (
        <div className="space-y-3">
          {lessons.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#D7E5F0] text-center py-12 shadow-xs">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-bold text-slate-700 text-sm">No chapters found</p>
              <p className="text-xs text-slate-400 mt-1">Download this course to load offline chapters.</p>
            </div>
          ) : (
            lessons.map((lesson, idx) => {
              const isDone = completedSet.has(lesson.id)
              return (
                <div
                  key={lesson.id}
                  className="bg-white rounded-xl flex items-center justify-between p-4 hover:border-[#1B7FC9] transition-all border border-[#D7E5F0] shadow-xs"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-[#E1F0FA] text-[#1465A3] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-[#CBE4F6]">
                      {lesson.order || idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-sm truncate">{lesson.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Chapter {lesson.order || idx + 1} · Interactive Lesson
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    {isDone && (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                        <CheckCircle size={12} /> Completed
                      </span>
                    )}
                    <button
                      onClick={() => navigate(`/courses/${courseId}/lessons/${lesson.id}`)}
                      className="bg-[#1B7FC9] hover:bg-[#1465A3] active:scale-[0.98] text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
                    >
                      <PlayCircle size={14} /> Open Lesson
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* Tab 2: Quizzes */}
      {activeTab === 'quizzes' && (
        <div className="space-y-4">
          {quizzes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#D7E5F0] text-center py-12 shadow-xs">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-bold text-slate-700 text-sm">No quizzes available for this course</p>
            </div>
          ) : (
            quizzes.map((q) => {
              const matchingAttempt = attempts?.find((a) => a.quizVersionId === q.id)
              const receipt = receipts?.find((r) => r.clientAttemptId === matchingAttempt?.clientAttemptId)
              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#D7E5F0] hover:border-[#1B7FC9] shadow-xs transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center flex-shrink-0 shadow-xs">
                      <HelpCircle size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 text-sm md:text-base">{q.title}</h3>
                        <span className="bg-[#E1F0FA] text-[#1465A3] border border-[#CBE4F6] text-[10px] font-bold px-2 py-0.5 rounded-full">v{q.version}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                        <span className="inline-flex items-center gap-1">
                          <HelpCircle size={13} className="text-[#1B7FC9]" /> 5 Questions
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock size={13} className="text-slate-400" /> ~15 Mins
                        </span>
                        {receipt && receipt.score !== undefined && (
                          <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                            ✓ Last Score: {receipt.score}/{receipt.totalQuestions ?? 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => navigate(`/courses/${courseId}/quiz/${q.id}`)}
                      className="bg-[#1B7FC9] hover:bg-[#1465A3] active:scale-[0.98] text-white text-xs font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 shadow-xs transition-all"
                    >
                      <PlayCircle size={16} /> {receipt ? 'Retake Quiz' : 'Start Quiz'}
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* Tab 3: About Course */}
      {activeTab === 'about' && (
        <div className="bg-white rounded-2xl border border-[#D7E5F0] p-6 space-y-4 shadow-xs">
          <h3 className="font-bold text-slate-900 text-base">About this course</h3>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            {course?.description || 'This course is structured for offline learning. You can download all lessons and quizzes to your local device storage, study without an internet connection, and all your quiz attempts will automatically sync when you reconnect.'}
          </p>
          <div className="pt-4 border-t border-[#D7E5F0] grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <p className="text-slate-400 font-medium">Subject</p>
              <p className="font-bold text-slate-800 mt-0.5">{subject}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Offline Pack Size</p>
              <p className="font-bold text-slate-800 mt-0.5">{course?.offlinePackageSizeMb || 10} MB</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Offline Status</p>
              <p className="font-bold text-emerald-600 mt-0.5">{isAvailable ? 'Downloaded' : 'Available for download'}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Sync Guarantee</p>
              <p className="font-bold text-slate-800 mt-0.5">Idempotent (Exactly-Once)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
