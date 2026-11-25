import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  HelpCircle, CheckCircle, Clock, BookOpen,
  ArrowRight, Award, RotateCcw
} from 'lucide-react'
import { fetchAllQuizzes, type QuizListItem } from '@/lib/api'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/database'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { getQuizTranslation } from '@/data/quiz-translations'

export function QuizzesPage() {
  const navigate = useNavigate()
  const isOnline = useOnlineStatus()
  const { language, t, translateSubject } = useI18n()
  const [selectedSubject, setSelectedSubject] = useState<string>('All')

  // 1. Fetch server quizzes if online
  const { data: serverQuizzes = [], isLoading } = useQuery({
    queryKey: ['all-quizzes'],
    queryFn: fetchAllQuizzes,
    enabled: isOnline,
    staleTime: 5 * 60 * 1000,
  })

  // 2. Fetch offline quizzes from IndexedDB
  const localItems = useLiveQuery(
    () => db.contentItems.where('type').equals('quiz').toArray(),
    [],
    [],
  )

  // 3. Completed sync receipts & attempts
  const receipts = useLiveQuery(() => db.syncReceipts.toArray(), [], [])
  const attempts = useLiveQuery(() => db.attempts.toArray(), [], [])

  // Map quizVersionId -> receipt
  const receiptByQuiz = new Map<string, any>()
  if (attempts && receipts) {
    const receiptByAttempt = new Map(receipts.map((r) => [r.clientAttemptId, r]))
    for (const a of attempts) {
      const r = receiptByAttempt.get(a.clientAttemptId)
      if (r) receiptByQuiz.set(a.quizVersionId, r)
    }
  }

  const attemptByQuiz = new Map(attempts?.map((a) => [a.quizVersionId, a]))

  // Combine online & offline quiz list
  const quizList: QuizListItem[] = []
  const seenIds = new Set<string>()

  // From server
  for (const q of serverQuizzes) {
    if (!seenIds.has(q.quizVersionId)) {
      seenIds.add(q.quizVersionId)
      quizList.push(q)
    }
  }

  // From local IndexedDB
  for (const item of localItems || []) {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id)
      let parsed: any = null
      try { parsed = JSON.parse(item.contentJson) } catch { }
      quizList.push({
        quizVersionId: item.id,
        courseId: item.courseId,
        courseTitle: parsed?.courseTitle || 'Offline Course',
        subject: parsed?.subject || 'General',
        title: item.title,
        version: parsed?.version || 1,
        questionCount: parsed?.questions?.length || 5,
        timeLimitMins: 15,
      })
    }
  }

  const subjects = ['All', ...Array.from(new Set(quizList.map((q) => q.subject)))]
  const filtered = selectedSubject === 'All'
    ? quizList
    : quizList.filter((q) => q.subject === selectedSubject)

  const completedCount = receiptByQuiz.size

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* ── Page Header (Without descriptive subtext below heading) ────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#F0F7FD] via-[#E1F0FA] to-[#CBE4F6] p-6 md:p-8 text-slate-900 border border-[#CBE4F6] shadow-xs">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#CBE4F6] text-xs font-bold text-[#1465A3] mb-3">
            <HelpCircle size={14} /> {t('interactiveQuizzes')}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{t('quizzesTitle')}</h1>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="bg-white px-3.5 py-1.5 rounded-xl border border-[#D7E5F0] shadow-xs flex items-center gap-2">
              <BookOpen size={14} className="text-[#1B7FC9]" />
              <span><strong>{quizList.length}</strong> {t('quizzesAvailable')}</span>
            </div>
            <div className="bg-white px-3.5 py-1.5 rounded-xl border border-[#D7E5F0] shadow-xs flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-600" />
              <span><strong>{completedCount}</strong> {t('completed')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {subjects.map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap',
              selectedSubject === sub
                ? 'bg-[#1B7FC9] text-white shadow-xs'
                : 'bg-white border border-[#D7E5F0] text-slate-700 hover:border-[#1B7FC9]'
            )}
          >
            <span>{sub === 'All' ? t('allSubjects') : translateSubject(sub)}</span>
          </button>
        ))}
      </div>

      {/* Quiz Grid */}
      {isLoading && quizList.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-[#1B7FC9] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#D7E5F0] p-12 text-center max-w-md mx-auto shadow-xs">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-bold text-slate-800 text-base mb-4">No quizzes found</p>
          <button onClick={() => navigate('/courses')} className="bg-[#1B7FC9] hover:bg-[#1465A3] text-white text-xs font-bold py-2.5 px-5 rounded-xl mx-auto shadow-xs">
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((quiz) => {
            const receipt = receiptByQuiz.get(quiz.quizVersionId)
            const attempt = attemptByQuiz.get(quiz.quizVersionId)
            const isCompleted = !!receipt || attempt?.status === 'SYNCED'

            const translatedTitle = getQuizTranslation(quiz.title, language)?.title || quiz.title

            return (
              <div
                key={quiz.quizVersionId}
                className={cn(
                  'bg-white rounded-2xl p-5 border shadow-xs hover:border-[#1B7FC9] hover:shadow-card transition-all flex flex-col justify-between',
                  isCompleted ? 'border-emerald-200' : 'border-[#D7E5F0]'
                )}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#E1F0FA] text-[#1465A3] border border-[#CBE4F6]">
                      {translateSubject(quiz.subject)}
                    </span>
                    {isCompleted ? (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle size={11} /> {t('completed')}
                      </span>
                    ) : attempt?.status === 'DRAFT' ? (
                      <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                        {t('inProgress')}
                      </span>
                    ) : (
                      <span className="bg-[#E1F0FA] text-[#1465A3] border border-[#CBE4F6] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                        {t('offlineReady')}
                      </span>
                    )}
                  </div>

                  {/* Title & Course */}
                  <h3 className="font-bold text-slate-900 text-base mb-1 leading-snug line-clamp-2">
                    {translatedTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3 truncate flex items-center gap-1">
                    <BookOpen size={12} className="text-slate-400" />
                    <span>{quiz.courseTitle}</span>
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 bg-[#F8FAFC] p-2.5 rounded-xl mb-4 border border-[#D7E5F0]">
                    <span className="flex items-center gap-1">
                      <HelpCircle size={13} className="text-[#1B7FC9]" />
                      <strong>{quiz.questionCount}</strong> {t('questionCount')}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-slate-400" />
                      {quiz.timeLimitMins} {t('timeLimitMins')}
                    </span>
                  </div>

                  {/* Score if completed */}
                  {receipt && receipt.score !== undefined && (
                    <div className="mb-4 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs font-semibold text-emerald-800">
                      <span className="flex items-center gap-1">
                        <Award size={14} /> {t('yourScore')}:
                      </span>
                      <span className="text-sm font-bold">{receipt.score} / {receipt.totalQuestions ?? quiz.questionCount}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#D7E5F0]">
                  <button
                    onClick={() => {
                      const target = quiz.courseId && quiz.courseId !== 'undefined'
                        ? `/courses/${quiz.courseId}/quiz/${quiz.quizVersionId}`
                        : `/quiz/${quiz.quizVersionId}`
                      navigate(target)
                    }}
                    className={cn(
                      'flex-1 text-xs py-2 px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs',
                      isCompleted
                        ? 'bg-[#E1F0FA] text-[#1465A3] hover:bg-[#CBE4F6]'
                        : 'bg-[#1B7FC9] hover:bg-[#1465A3] text-white active:scale-[0.98]'
                    )}
                  >
                    {isCompleted ? (
                      <>
                        <RotateCcw size={12} /> {t('retakeQuiz')}
                      </>
                    ) : (
                      <>
                        <HelpCircle size={12} /> {t('startAssessment')}
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => navigate(`/courses/${quiz.courseId}`)}
                    className="p-2 border border-[#D7E5F0] hover:border-[#1B7FC9] rounded-xl text-slate-600 hover:text-[#1B7FC9] transition-colors"
                    title="View Course Details"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
