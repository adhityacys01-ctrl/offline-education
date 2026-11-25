import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Maximize2, ChevronLeft, ChevronRight, CheckCircle, BookOpen, AlertCircle, BookMarked } from 'lucide-react'
import { getLocalLesson, getLocalLessonsForCourse, getOfflineTranslation, getOfflineGlossary, getOfflineAudio } from '@/services/downloadEngine'
import { fetchCourse } from '@/lib/api'
import { db, markLessonComplete } from '@/db/database'
import { useAuthStore } from '@/store/authStore'
import { AudioPlayer } from '@/components/AudioPlayer'
import { GlossaryPopover, type GlossaryItem } from '@/components/GlossaryPopover'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

interface LessonData {
  id: string; courseId: string; courseTitle: string; subject: string
  title: string; order: number; contentHtml: string; keyPoints: string[]
  mediaUrl?: string; mediaType?: string; contentHash: string; updatedAt: string
  translations?: {
    hi?: { title: string; contentHtml: string; keyPoints?: string[] }
    mr?: { title: string; contentHtml: string; keyPoints?: string[] }
  }
  glossary?: GlossaryItem[]
}

interface SiblingLesson { id: string; title: string; order: number }

type Tab = 'content' | 'notes'
type SupportedLanguage = 'en' | 'hi' | 'mr'
const LANGUAGE_LABELS: Record<SupportedLanguage, string> = { en: 'English', hi: 'हिन्दी', mr: 'मराठी' }

interface TranslationData {
  id?: string
  translatedTitle: string
  translatedContent: string
  approvalStatus: string
  revision?: number
}

const API_BASE = '/api/v1'

export function LessonViewerPage() {
  const { lessonId, courseId } = useParams<{ lessonId: string; courseId: string }>()
  const navigate = useNavigate()
  const { user, accessToken: token } = useAuthStore()
  const { language, setLanguage, t } = useI18n()

  const [lesson, setLesson] = useState<LessonData | null>(null)
  const [siblings, setSiblings] = useState<SiblingLesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('content')
  const [completed, setCompleted] = useState(false)

  // Multilingual state
  const [activeLang, setActiveLang] = useState<SupportedLanguage>(language || 'en')

  useEffect(() => {
    if (language && language !== activeLang) {
      setActiveLang(language)
    }
  }, [language])
  const [translation, setTranslation] = useState<TranslationData | null>(null)
  const [transLoading, setTransLoading] = useState(false)
  const [transUnavail, setTransUnavail] = useState(false)
  const [glossary, setGlossary] = useState<GlossaryItem[]>([])
  const [activeGlossary, setActiveGlossary] = useState<GlossaryItem | null>(null)
  const [audioSource, setAudioSource] = useState<{ url?: string | null; blob?: Blob | null }>({})

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
        const localLesson = local as LessonData
        setLesson(localLesson)

        // Preload translation from embedded lesson data if available
        if (activeLang !== 'en' && localLesson.translations?.[activeLang]) {
          const emb = localLesson.translations[activeLang]!
          setTranslation({
            translatedTitle: emb.title,
            translatedContent: emb.contentHtml,
            approvalStatus: 'PUBLISHED',
            revision: 1,
          })
          setTransUnavail(false)
        }

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
              setSiblings(courseData.lessons.map((l: any) => ({ id: l.id, title: l.title, order: l.order })))
            }
          } catch { }
        }

        // Load glossary offline-first, then refresh from API if online
        const offlineG = await getOfflineGlossary(lessonId!)
        if (offlineG.length > 0) setGlossary(offlineG)
        if (token) {
          try {
            const gRes = await fetch(`${API_BASE}/multilingual/glossary/${lessonId}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            if (gRes.ok) {
              const gList = await gRes.json()
              if (Array.isArray(gList) && gList.length > 0) {
                setGlossary(gList)
                await db.glossaryEntries.bulkPut(
                  gList.map((g: any) => ({
                    ...g,
                    courseId: courseId!,
                    savedAt: Date.now(),
                  }))
                ).catch(() => { })
              }
            }
          } catch { }
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load lesson')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [lessonId, courseId, token])

  // Load translation & offline audio when language or lesson changes
  useEffect(() => {
    if (!lessonId) return
    if (activeLang === 'en') {
      setTranslation(null)
      setTransUnavail(false)
      setAudioSource({})
      return
    }

    async function loadTranslation() {
      setTransLoading(true)
      setTransUnavail(false)

      // 0. Immediate embedded translation for zero-latency local native rendering
      const embedded = (lesson as any)?.translations?.[activeLang]
      if (embedded) {
        setTranslation({
          translatedTitle: embedded.title,
          translatedContent: embedded.contentHtml,
          approvalStatus: 'PUBLISHED',
          revision: 1,
        })
        setTransUnavail(false)
      }

      // 1. Check offline IndexedDB cache next
      const cached = await getOfflineTranslation(lessonId!, activeLang)
      const cachedAudio = await getOfflineAudio(lessonId!, activeLang)
      if (cachedAudio) {
        setAudioSource({ url: cachedAudio.fileRef, blob: cachedAudio.blob })
      } else {
        setAudioSource({})
      }

      if (cached) {
        setTranslation(cached)
        setTransUnavail(false)
      }

      // 2. If online & authenticated, check server for latest published translation
      if (navigator.onLine && token) {
        try {
          const res = await fetch(`${API_BASE}/multilingual/published/${lessonId}/${activeLang}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          const data = await res.json()
          if (data.notAvailable || !data.translatedContent) {
            if (!cached && !embedded) {
              setTranslation(null)
              setTransUnavail(true)
            }
          } else {
            setTranslation(data)
            setTransUnavail(false)
            // Cache locally for future offline switching
            await db.lessonTranslations.put({
              id: `${lessonId}::${activeLang}`,
              serverId: data.id,
              lessonId: lessonId!,
              courseId: courseId || '',
              language: activeLang,
              translatedTitle: data.translatedTitle,
              translatedContent: data.translatedContent,
              revision: data.revision || 1,
              approvalStatus: data.approvalStatus,
              savedAt: Date.now(),
            }).catch(() => { })
          }
        } catch {
          if (!cached && !embedded) {
            setTranslation(null)
            setTransUnavail(true)
          }
        }
      } else if (!cached && !embedded) {
        setTranslation(null)
        setTransUnavail(true)
      }

      setTransLoading(false)
    }

    loadTranslation()
  }, [activeLang, lessonId, courseId, token])

  const handleLangChange = (lang: SupportedLanguage) => {
    setActiveLang(lang)
    setLanguage(lang)
  }

  const handleMarkComplete = async () => {
    if (!lesson || !user) return
    await markLessonComplete(user.id, lesson.id, lesson.courseId)
    setCompleted(true)
  }

  const currentTranslation = (activeLang !== 'en')
    ? (translation || ((lesson as any)?.translations?.[activeLang] ? {
      translatedTitle: (lesson as any).translations[activeLang].title,
      translatedContent: (lesson as any).translations[activeLang].contentHtml,
      approvalStatus: 'PUBLISHED',
    } : null))
    : null

  const displayTitle = currentTranslation ? currentTranslation.translatedTitle : lesson?.title
  const activeKeyPoints = (activeLang !== 'en' && (lesson as any)?.translations?.[activeLang]?.keyPoints)
    ? (lesson as any).translations[activeLang].keyPoints
    : lesson?.keyPoints || []

  const cleanAudioContent = (currentTranslation?.translatedContent || lesson?.contentHtml || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const audioText = `${displayTitle || ''}. ${cleanAudioContent}`

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
          <p className="font-bold text-slate-900 truncate">{displayTitle}</p>
          <p className="text-xs text-slate-500">{lesson.courseTitle} · Chapter {lesson.order}</p>
        </div>
        <button className="p-2 hover:bg-white rounded-xl border border-[#D7E5F0] transition-colors" title="Download PDF">
          <Download size={16} className="text-slate-500" />
        </button>
        <button className="p-2 hover:bg-white rounded-xl border border-[#D7E5F0] transition-colors" title="Fullscreen">
          <Maximize2 size={16} className="text-slate-500" />
        </button>
      </div>

      {/* Language Selector */}
      <div className="bg-white rounded-2xl border border-[#D7E5F0] p-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium mr-1">Language:</span>
          <div className="flex gap-1.5">
            {(['en', 'hi', 'mr'] as SupportedLanguage[]).map(lang => (
              <button
                key={lang}
                onClick={() => handleLangChange(lang)}
                className={cn(
                  'px-3 py-1.5 text-xs font-semibold rounded-xl transition-all',
                  activeLang === lang
                    ? 'bg-[#1B7FC9] text-white shadow-sm'
                    : 'bg-[#F0F5FA] text-slate-600 hover:bg-[#E1EEF8] hover:text-[#1B7FC9]'
                )}
              >
                {LANGUAGE_LABELS[lang]}
              </button>
            ))}
          </div>
        </div>
        {transLoading && <span className="text-xs text-slate-400">Loading translation…</span>}
      </div>

      {/* Audio Player */}
      <AudioPlayer
        text={audioText}
        language={activeLang}
        audioUrl={audioSource.url}
        audioBlob={audioSource.blob}
      />

      {/* Translation unavailable banner */}
      {transUnavail && activeLang !== 'en' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-xs text-amber-700 flex items-center gap-2">
          <AlertCircle size={13} />
          {LANGUAGE_LABELS[activeLang]} translation not yet published or downloaded offline — showing English.
        </div>
      )}

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
          <div className="space-y-5">
            {/* Key Points */}
            {activeKeyPoints.length > 0 && (
              <div className="p-4 bg-[#E1F0FA]/60 border border-[#CBE4F6] rounded-xl">
                <p className="text-xs font-bold text-[#1465A3] uppercase tracking-wide mb-2">
                  {activeLang === 'hi' ? 'मुख्य बिंदु' : activeLang === 'mr' ? 'महत्त्वाचे मुद्दे' : 'Key Points'}
                </p>
                <ul className="space-y-1.5">
                  {activeKeyPoints.map((kp: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#0C2B47]">
                      <CheckCircle size={14} className="text-[#1B7FC9] mt-0.5 flex-shrink-0" />
                      <span>{kp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content HTML */}
            {activeLang === 'en' || !currentTranslation ? (
              <div
                className="prose prose-sm prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: lesson.contentHtml }}
              />
            ) : (
              <div
                className="prose prose-sm prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: currentTranslation.translatedContent }}
              />
            )}

            {/* Interactive Glossary Terms */}
            {glossary.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2.5">
                  <BookMarked size={14} className="text-[#1B7FC9]" />
                  <span>Glossary Terms</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {glossary.map((entry, idx) => (
                    <button
                      key={entry.id || idx}
                      onClick={() => setActiveGlossary(entry)}
                      className="px-3 py-1.5 rounded-xl bg-[#E1EEF8] hover:bg-[#1B7FC9] hover:text-white text-[#1465A3] text-xs font-semibold border border-[#C5DCF0] transition-colors"
                    >
                      {activeLang === 'hi' && entry.hiEquiv
                        ? entry.hiEquiv
                        : activeLang === 'mr' && entry.mrEquiv
                          ? entry.mrEquiv
                          : entry.term}
                    </button>
                  ))}
                </div>
              </div>
            )}
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
          <><CheckCircle size={16} /> {t('completed')}</>
        ) : (
          t('markCompleted')
        )}
      </button>

      {/* Prev / Next */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => prevLesson && navigate(`/courses/${courseId}/lessons/${prevLesson.id}`)}
          disabled={!prevLesson}
          className="btn-outline gap-1.5 disabled:opacity-40"
        >
          <ChevronLeft size={16} /> {t('previous')}
        </button>
        <button
          onClick={() => nextLesson && navigate(`/courses/${courseId}/lessons/${nextLesson.id}`)}
          disabled={!nextLesson}
          className="btn-primary gap-1.5 disabled:opacity-40"
        >
          {t('next')} <ChevronRight size={16} />
        </button>
      </div>

      {activeGlossary && (
        <GlossaryPopover entry={activeGlossary} onClose={() => setActiveGlossary(null)} />
      )}
    </div>
  )
}
