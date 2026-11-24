import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Maximize2, ChevronLeft, ChevronRight, CheckCircle, BookOpen, AlertCircle } from 'lucide-react'
import { getLocalLesson, getLocalLessonsForCourse } from '@/services/downloadEngine'
import { fetchCourse } from '@/lib/api'
import { markLessonComplete } from '@/db/database'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/utils'

interface LessonData {
  id: string; courseId: string; courseTitle: string; subject: string
  title: string; order: number; contentHtml: string; keyPoints: string[]
  mediaUrl?: string; mediaType?: string; contentHash: string; updatedAt: string
}

interface SiblingLesson { id: string; title: string; order: number }

type Tab = 'content' | 'notes'

export function LessonViewerPage() {
  const { lessonId, courseId } = useParams<{ lessonId: string; courseId: string }>()
  const navigate = useNavigate()
  const { user }  = useAuthStore()

  const [lesson, setLesson]       = useState<LessonData | null>(null)
  const [siblings, setSiblings]   = useState<SiblingLesson[]>([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState<string | null>(null)
  const [tab, setTab]             = useState<Tab>('content')
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (!lessonId || !courseId) return

    async function load() {
      try {
        setLoading(true)
        const local = await getLocalLesson(lessonId!)
        if (!local) {
          setError('Lesson not downloaded. Please download the course first.')
          return
        }
        setLesson(local as LessonData)

        // Load siblings for prev/next navigation
        const allItems = await getLocalLessonsForCourse(courseId!)
        if (allItems && allItems.length > 0) {
          setSiblings(
            allItems
              .filter((i) => i.type === 'lesson')
              .map((i) => ({ id: i.id, title: i.title, order: i.order }))
          )
        } else {
          try {
            const courseData = await fetchCourse(courseId!)
            if (courseData.lessons) {
              setSiblings(courseData.lessons.map((l) => ({ id: l.id, title: l.title, order: l.order })))
            }
          } catch {}
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load lesson')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [lessonId, courseId])

  const handleMarkComplete = async () => {
    if (!lesson || !user) return
    await markLessonComplete(user.id, lesson.id, lesson.courseId)
    setCompleted(true)
  }

  const currentIdx = siblings.findIndex((s) => s.id === lessonId)
  const prevLesson = currentIdx > 0 ? siblings[currentIdx - 1] : null
  const nextLesson = currentIdx < siblings.length - 1 ? siblings[currentIdx + 1] : null

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-slate-500">Loading lesson…</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="bg-white rounded-2xl border border-[#D7E5F0] text-center py-12 max-w-md mx-auto shadow-xs">
      <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
      <p className="font-bold text-slate-900 mb-1">Lesson Unavailable</p>
      <p className="text-xs text-slate-500 mb-4">{error}</p>
      <button onClick={() => navigate('/courses')} className="bg-[#1B7FC9] hover:bg-[#1465A3] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-xs">Go to Downloads</button>
    </div>
  )

  if (!lesson) return null

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fade-in pb-8">
      {/* Top bar */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-xl border border-[#D7E5F0] transition-colors">
          <ArrowLeft size={16} className="text-slate-600" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-900 truncate">{lesson.title}</p>
          <p className="text-xs text-slate-500">{lesson.courseTitle} · Chapter {lesson.order}</p>
        </div>
        <button className="p-2 hover:bg-white rounded-xl border border-[#D7E5F0] transition-colors" title="Download PDF">
          <Download size={16} className="text-slate-500" />
        </button>
        <button className="p-2 hover:bg-white rounded-xl border border-[#D7E5F0] transition-colors" title="Fullscreen">
          <Maximize2 size={16} className="text-slate-500" />
        </button>
      </div>

      {/* Media / Cover */}
      <div className="w-full h-52 md:h-64 rounded-2xl overflow-hidden bg-[#E1F0FA] border border-[#CBE4F6] flex items-center justify-center">
        {lesson.mediaUrl ? (
          <img src={lesson.mediaUrl} alt={lesson.title} className="w-full h-full object-cover" />
        ) : (
          <BookOpen size={48} className="text-[#1B7FC9]" />
        )}
      </div>

      {/* Content card */}
      <div className="card">
        {/* Tabs */}
        <div className="flex border-b border-slate-100 mb-5 -mx-5 px-5">
          {(['content', 'notes'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'pb-3 px-4 text-sm font-semibold capitalize border-b-2 -mb-px transition-all',
                tab === t
                  ? 'border-brand-600 text-brand-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              )}
            >
              {t === 'content' ? 'Lesson Content' : 'Notes'}
            </button>
          ))}
        </div>

        {tab === 'content' && (
          <div>
            {/* Key Points */}
            {lesson.keyPoints.length > 0 && (
              <div className="mb-5 p-4 bg-brand-50 rounded-xl">
                <p className="text-xs font-bold text-brand-700 uppercase tracking-wide mb-2">Key Points</p>
                <ul className="space-y-1.5">
                  {lesson.keyPoints.map((kp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-brand-800">
                      <CheckCircle size={14} className="text-brand-500 mt-0.5 flex-shrink-0" />
                      {kp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content HTML */}
            <div
              className="prose prose-sm prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.contentHtml }}
            />
          </div>
        )}

        {tab === 'notes' && (
          <div>
            <textarea
              className="w-full h-48 input resize-none text-sm"
              placeholder="Write your notes here… (stored locally)"
            />
            <p className="text-xs text-slate-400 mt-2">Notes are stored on this device only.</p>
          </div>
        )}
      </div>

      {/* Mark Complete */}
      <button
        onClick={handleMarkComplete}
        disabled={completed}
        className={cn(
          'w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all',
          completed
            ? 'bg-success/15 text-success-dark cursor-default'
            : 'btn-primary'
        )}
      >
        {completed ? (
          <><CheckCircle size={16} /> Lesson Completed</>
        ) : (
          '✓ Mark as Complete'
        )}
      </button>

      {/* Prev / Next */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => prevLesson && navigate(`/courses/${courseId}/lessons/${prevLesson.id}`)}
          disabled={!prevLesson}
          className="btn-outline gap-1.5 disabled:opacity-40"
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <button
          onClick={() => nextLesson && navigate(`/courses/${courseId}/lessons/${nextLesson.id}`)}
          disabled={!nextLesson}
          className="btn-primary gap-1.5 disabled:opacity-40"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
