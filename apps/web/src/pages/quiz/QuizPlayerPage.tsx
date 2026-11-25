import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, CheckCircle, ChevronLeft, ChevronRight, XCircle, Wifi, WifiOff, BookOpen, RefreshCw, RotateCcw, Award, HelpCircle } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { getLocalQuiz } from '@/services/downloadEngine'
import { processOutbox } from '@/services/syncEngine'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/database'
import {
  getOrCreateAttempt,
  saveAnswerTransactionally,
  loadAttemptWithAnswers,
  finalizeAttempt,
} from '@/services/attemptManager'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { cn } from '@/lib/utils'
import type { Answer, Attempt, SyncReceipt } from '@/db/types'
import { useI18n } from '@/lib/i18n'
import { getQuizTranslation } from '@/data/quiz-translations'

// ── Types matching local quiz content ─────────────────────────────────────────
interface Option { id: string; label: string; text: string }
interface Question { id: string; order: number; prompt: string; options: Option[] }
interface QuizData { id: string; courseId: string; title: string; version: number; contentHash: string; questions: Question[] }

// ── Save status indicator ─────────────────────────────────────────────────────
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

  function SaveStatusBadge({ status, t }: { status: SaveStatus; t: (k: string) => string }) {
    if (status === 'saving') return (
      <span className="flex items-center gap-1 text-xs text-syncing-dark font-medium animate-pulse">
        <span className="w-1.5 h-1.5 bg-syncing rounded-full animate-pulse-dot" /> {t('saving')}
      </span>
    )
    if (status === 'saved') return (
      <span className="flex items-center gap-1 text-xs text-success-dark font-medium">
        <CheckCircle size={12} /> {t('savedOnDevice')}
      </span>
    )
    if (status === 'error') return (
      <span className="flex items-center gap-1 text-xs text-danger font-medium">
        <XCircle size={12} /> {t('saveFailed')}
      </span>
    )
    return null
  }

  // ── Timer hook ────────────────────────────────────────────────────────────────
  function useTimer(startMs?: number) {
    const [elapsed, setElapsed] = useState(0)
    useEffect(() => {
      if (!startMs) return
      const update = () => setElapsed(Math.max(0, Math.floor((Date.now() - startMs) / 1000)))
      update()
      const id = setInterval(update, 1000)
      return () => clearInterval(id)
    }, [startMs])
    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0')
    const secs = String(elapsed % 60).padStart(2, '0')
    return `${mins}:${secs}`
  }

  // ── Question Navigator ────────────────────────────────────────────────────────
  function QuestionNavigator({
    current,
    answers,
    questions,
    onGoto,
  }: {
    current: number
    answers: Record<string, Answer>
    questions: Question[]
    onGoto: (idx: number) => void
  }) {
    return (
      <div className="flex gap-1.5 flex-wrap">
        {questions.map((q, i) => {
          const isAnswered = !!answers[q.id]?.selectedOptionId
          const isCurrent = i === current
          return (
            <button
              key={q.id}
              onClick={() => onGoto(i)}
              className={cn(
                'w-8 h-8 rounded-lg text-xs font-bold transition-all',
                isCurrent ? 'bg-brand-600 text-white shadow-md scale-110' :
                  isAnswered ? 'bg-success/20 text-success-dark border border-success/40' :
                    'bg-slate-100 text-slate-500 hover:bg-brand-50 hover:text-brand-700'
              )}
            >
              {i + 1}
            </button>
          )
        })}
      </div>
    )
  }

  // ── Quiz Completion Modal ─────────────────────────────────────────────────────
  function QuizCompleteModal({
    quizTitle,
    answeredCount,
    totalCount,
    receipt,
    isOnline,
    t,
    onRetake,
    onNavigateCourse,
    onNavigateQuizzes,
    onNavigateDashboard,
  }: {
    quizTitle: string
    answeredCount: number
    totalCount: number
    receipt: SyncReceipt | null | undefined
    isOnline: boolean
    t: (k: string) => string
    onRetake: () => void
    onNavigateCourse: () => void
    onNavigateQuizzes: () => void
    onNavigateDashboard: () => void
  }) {
    const score = receipt?.score
    const total = receipt?.totalQuestions ?? totalCount
    const pct = score !== undefined ? Math.round((score / total) * 100) : null
    const isGreat = pct !== null && pct >= 70

    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-md w-full text-center animate-slide-up border border-slate-100 relative overflow-hidden">
          {/* Top color bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-success via-brand-500 to-indigo-500" />

          {/* Celebration icon badge */}
          <div className="relative mx-auto w-16 h-16 mb-3 flex items-center justify-center">
            <div className="w-16 h-16 bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] rounded-2xl flex items-center justify-center shadow-xs">
              <Award size={32} strokeWidth={2.2} />
            </div>
          </div>

          {/* Title */}
          <span className="bg-[#E1F0FA] text-[#1465A3] border border-[#CBE4F6] text-[11px] font-bold px-3 py-1 rounded-full mb-3 inline-block">
            {t('quizCompleted')}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1 leading-snug">
            {t('quizCompletedHeading')}
          </h2>
          <p className="text-slate-500 text-xs mb-4">
            <strong className="text-slate-700">{quizTitle}</strong>
          </p>

          {/* Score & Evaluation card */}
          {score !== undefined ? (
            <div className="bg-[#F0F7FD] rounded-2xl p-4 border border-[#CBE4F6] mb-4 text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('yourScore')}</span>
                <span className="text-xs font-bold text-[#1465A3] bg-[#E1F0FA] px-2.5 py-0.5 rounded-full border border-[#CBE4F6]">
                  {pct}%
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-3xl font-black text-[#1B7FC9]">{score}</span>
                <span className="text-base text-slate-400 font-semibold">/ {total}</span>
              </div>
              <p className="text-xs text-slate-700 font-medium">
                {isGreat ? t('passed') : t('reviewNeeded')}
              </p>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70 mb-4 text-xs text-slate-600">
              {answeredCount} / {totalCount}
            </div>
          )}

          {/* Sync Status Banner */}
          <div className={cn(
            'text-xs font-medium p-3 rounded-xl mb-5 flex items-center gap-2.5 text-left',
            receipt
              ? 'bg-success/10 text-success-dark border border-success/20'
              : isOnline
                ? 'bg-syncing/10 text-syncing-dark border border-syncing/20'
                : 'bg-warning/10 text-warning-dark border border-warning/20'
          )}>
            {receipt ? (
              <>
                <CheckCircle size={16} className="text-success flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{t('synchronized')}</p>
                  <p className="text-[10px] text-slate-500 truncate font-mono">{receipt.receiptHash.slice(0, 16)}…</p>
                </div>
              </>
            ) : isOnline ? (
              <>
                <RefreshCw size={14} className="animate-spin text-syncing-dark flex-shrink-0" />
                <span>{t('saving')}</span>
              </>
            ) : (
              <>
                <WifiOff size={14} className="text-warning-dark flex-shrink-0" />
                <span>{t('savedOnDevice')}</span>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onRetake}
                className="btn-outline text-xs py-2.5 font-bold flex items-center justify-center gap-1.5 hover:border-brand-500 hover:text-brand-600"
              >
                <RotateCcw size={13} /> {t('retakeQuiz')}
              </button>
              <button
                onClick={onNavigateCourse}
                className="btn-primary text-xs py-2.5 shadow-sm font-bold flex items-center justify-center gap-1.5"
              >
                <BookOpen size={13} /> {t('backToCourse')}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onNavigateQuizzes}
                className="btn-secondary text-xs py-2 font-semibold"
              >
                {t('viewAllQuizzes')}
              </button>
              <button
                onClick={onNavigateDashboard}
                className="btn-outline text-xs py-2 font-semibold"
              >
                {t('goToDashboard')}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Main Quiz Player ──────────────────────────────────────────────────────────
  export function QuizPlayerPage() {
    const { quizVersionId, courseId: routeCourseId } = useParams<{ quizVersionId: string; courseId: string }>()
    const navigate = useNavigate()
    const isOnline = useOnlineStatus()
    const { language, t } = useI18n()

    // State
    const [isQuizOffline, setIsQuizOffline] = useState(true)
    const [quiz, setQuiz] = useState<QuizData | null>(null)
    const [courseId, setCourseId] = useState<string>(routeCourseId || '')
    const [attempt, setAttempt] = useState<Attempt | null>(null)
    const [answers, setAnswers] = useState<Record<string, Answer>>({})
    const [currentIdx, setCurrentIdx] = useState(0)
    const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showComplete, setShowComplete] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const saveStatusTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    const elapsed = useTimer(attempt?.startedAt)

    // ── Live Receipt from IndexedDB (Hook must be at top-level) ───────────────
    const liveReceipt = useLiveQuery(
      () => (attempt?.clientAttemptId ? db.syncReceipts.get(attempt.clientAttemptId) : undefined),
      [attempt?.clientAttemptId],
    )

    // ── Load quiz from IndexedDB, API, or Catalog ──────────────────────────────
    useEffect(() => {
      if (!quizVersionId) return

      async function load() {
        try {
          setLoading(true)
          setError(null)

          // 1. Load quiz content from local store / cache / catalog
          const localQuiz = await getLocalQuiz(quizVersionId!)
          if (!localQuiz || !localQuiz.questions || localQuiz.questions.length === 0) {
            setError('Quiz could not be loaded. Please ensure you are online or have downloaded this course.')
            return
          }
          setQuiz(localQuiz as QuizData)

          const activeCourseId = (routeCourseId && routeCourseId !== 'undefined')
            ? routeCourseId
            : (localQuiz as QuizData).courseId || 'general'
          setCourseId(activeCourseId)

          // 2. Create or resume attempt (crash recovery built-in)
          const att = await getOrCreateAttempt(
            quizVersionId!,
            activeCourseId,
            (localQuiz as QuizData).title,
          )
          setAttempt(att)

          // 3. Load all previously saved answers (crash recovery)
          const loaded = await loadAttemptWithAnswers(att.clientAttemptId)
          if (loaded) {
            setAnswers(loaded.answers)

            // Resume from last unanswered question
            const questions = (localQuiz as QuizData).questions
            const lastAnsweredIdx = questions.findIndex((q) => !loaded.answers[q.id])
            if (lastAnsweredIdx > 0) setCurrentIdx(lastAnsweredIdx)
          }
        } catch (e) {
          setError(e instanceof Error ? e.message : 'Failed to load quiz')
        } finally {
          setLoading(false)
        }
      }

      load()
    }, [quizVersionId, routeCourseId])

    // ── Select an answer (transactional write-before-confirm) ──────────────────
    const handleSelectOption = useCallback(async (questionId: string, optionId: string) => {
      if (!attempt || attempt.status !== 'DRAFT') return

      // Show "saving" immediately in UI
      setSaveStatus('saving')
      if (saveStatusTimer.current) clearTimeout(saveStatusTimer.current)

      try {
        // DURABILITY: write to IndexedDB first, then update React state
        const saved = await saveAnswerTransactionally(
          attempt.clientAttemptId,
          questionId,
          optionId,
        )

        // Only update UI state after DB commit succeeds
        setAnswers((prev) => ({ ...prev, [questionId]: saved }))
        setSaveStatus('saved')
      } catch {
        setSaveStatus('error')
      } finally {
        // Reset to idle after 3s
        saveStatusTimer.current = setTimeout(() => setSaveStatus('idle'), 3000)
      }
    }, [attempt])

    // ── Clear answer ──────────────────────────────────────────────────────────
    const handleClearAnswer = useCallback(async () => {
      if (!attempt || !quiz) return
      const qId = quiz.questions[currentIdx]?.id
      if (!qId) return
      setSaveStatus('saving')
      try {
        const saved = await saveAnswerTransactionally(attempt.clientAttemptId, qId, null)
        setAnswers((prev) => ({ ...prev, [qId]: saved }))
        setSaveStatus('saved')
      } catch {
        setSaveStatus('error')
      } finally {
        saveStatusTimer.current = setTimeout(() => setSaveStatus('idle'), 3000)
      }
    }, [attempt, quiz, currentIdx])

    // ── Submit (finalize → outbox → immediate sync) ───────────────────────────
    const handleSubmit = useCallback(async () => {
      if (!attempt || submitting) return
      setSubmitting(true)
      try {
        await finalizeAttempt(attempt.clientAttemptId)
        setAttempt((prev) => prev ? { ...prev, status: 'QUEUED' } : prev)

        // Trigger immediate background sync only if online and not in offline quiz mode
        if (!isQuizOffline && isOnline) {
          try {
            await processOutbox(true)
          } catch (err) {
            console.warn('[Quiz] Initial sync notice:', err)
          }
        }

        setShowComplete(true)
      } catch (e) {
        alert(e instanceof Error ? e.message : 'Failed to submit')
      } finally {
        setSubmitting(false)
      }
    }, [attempt, submitting])

    // ── Retake Quiz (Fresh Attempt) ──────────────────────────────────────────
    const handleRetake = useCallback(async () => {
      if (!quiz) return
      const activeCourseId = courseId || quiz.courseId || 'general'
      const newAttempt: Attempt = {
        clientAttemptId: uuidv4(),
        quizVersionId: quiz.id,
        courseId: activeCourseId,
        quizTitle: quiz.title,
        status: 'DRAFT',
        startedAt: Date.now(),
        lastLocalSaveAt: Date.now(),
      }
      await db.attempts.put(newAttempt)
      setAttempt(newAttempt)
      setAnswers({})
      setCurrentIdx(0)
      setShowComplete(false)
    }, [quiz, courseId])

    // ── Loading state ─────────────────────────────────────────────────────────
    if (loading || !quiz || !attempt) return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#1B7FC9] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500 font-medium">Loading quiz questions…</p>
        </div>
      </div>
    )

    if (error) return (
      <div className="bg-white rounded-2xl border border-[#D7E5F0] text-center py-12 max-w-md mx-auto shadow-xs">
        <XCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <p className="font-bold text-slate-900 mb-1">Quiz Unavailable</p>
        <p className="text-xs text-slate-500 mb-4">{error}</p>
        <button onClick={() => navigate('/quizzes')} className="bg-[#1B7FC9] hover:bg-[#1465A3] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-xs">Browse Quizzes</button>
      </div>
    )

    const questions = quiz.questions || []
    const totalQ = questions.length

    if (totalQ === 0) return (
      <div className="bg-white rounded-2xl border border-[#D7E5F0] text-center py-12 max-w-md mx-auto shadow-xs">
        <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="font-bold text-slate-900 mb-1">No Questions Found</p>
        <p className="text-xs text-slate-500 mb-4">This quiz doesn't have any questions configured.</p>
        <button onClick={() => navigate('/quizzes')} className="bg-[#1B7FC9] hover:bg-[#1465A3] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-xs">Browse Quizzes</button>
      </div>
    )

    const currentQ = questions[currentIdx] || questions[0]
    const currentAnswer = answers[currentQ?.id]?.selectedOptionId
    const answeredCount = Object.values(answers).filter((a) => a.selectedOptionId).length
    const isLast = currentIdx === totalQ - 1
    const isAlreadyDone = attempt.status !== 'DRAFT'

    const quizTranslation = quiz ? getQuizTranslation(quiz.title, language) : null
    const displayQuizTitle = quizTranslation?.title || quiz.title
    const translatedQ = quizTranslation?.questions[currentIdx]
    const displayPrompt = translatedQ?.prompt || currentQ.prompt

    return (
      <div className="max-w-2xl mx-auto space-y-4 animate-fade-in">
        {/* Completion celebration modal */}
        {showComplete && (
          <QuizCompleteModal
            quizTitle={displayQuizTitle}
            answeredCount={answeredCount}
            totalCount={totalQ}
            receipt={liveReceipt}
            isOnline={!isQuizOffline && isOnline}
            t={t}
            onRetake={handleRetake}
            onNavigateCourse={() => navigate(`/courses/${courseId}`)}
            onNavigateQuizzes={() => navigate('/quizzes')}
            onNavigateDashboard={() => navigate('/dashboard')}
          />
        )}

        {/* ── Top bar ───────────────────────────────────────────────────────── */}
        <div className="card flex items-center gap-3 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft size={18} className="text-slate-600" />
          </button>

          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-900 text-sm truncate">{displayQuizTitle}</p>
            <p className="text-xs text-slate-500">{t('question')} {currentIdx + 1} {t('of')} {totalQ}</p>
          </div>

          {/* Offline / Online badge */}
          <button
            type="button"
            onClick={() => setIsQuizOffline(!isQuizOffline)}
            title="Toggle offline / online mode"
            className={cn(
              'flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-xl transition-all shadow-xs cursor-pointer',
              isQuizOffline
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            )}
          >
            {isQuizOffline ? <WifiOff size={11} strokeWidth={2.2} /> : <Wifi size={11} strokeWidth={2.2} />}
            <span>{isQuizOffline ? t('offline') : t('online')}</span>
          </button>

          {/* Timer */}
          <div className="flex items-center gap-1 text-xs text-slate-500 font-mono bg-slate-50 px-2.5 py-1 rounded-xl">
            <Clock size={11} /> {elapsed}
          </div>
        </div>

        {/* ── Progress bar ──────────────────────────────────────────────────── */}
        <div className="progress-track">
          <div
            className="progress-fill transition-all duration-500"
            style={{ width: `${((currentIdx + 1) / totalQ) * 100}%` }}
          />
        </div>

        {/* Completed Attempt Notice */}
        {isAlreadyDone && (
          <div className="card bg-amber-50 border border-amber-200 p-4 flex items-center justify-between gap-3 animate-fade-in">
            <div className="text-xs text-amber-900">
              <p className="font-bold">{t('previouslySubmitted')}</p>
              <p className="text-amber-700">{t('optionsLocked')}</p>
            </div>
            <button
              onClick={handleRetake}
              className="btn-primary text-xs py-2 px-3 font-bold flex items-center gap-1.5 flex-shrink-0"
            >
              <RotateCcw size={13} /> {t('retakeQuiz')}
            </button>
          </div>
        )}

        {/* ── Question card ─────────────────────────────────────────────────── */}
        <div className="card">
          <div className="flex items-start justify-between gap-4 mb-5">
            <h2 className="text-base font-semibold text-slate-900 leading-snug flex-1">
              {displayPrompt}
            </h2>
            <SaveStatusBadge status={saveStatus} t={t} />
          </div>

          {/* Options */}
          <div className="space-y-2.5">
              {
                currentQ.options.map((option, optIdx) => {
                  const isSelected = currentAnswer === option.id
                  const displayOptionText = translatedQ?.options[optIdx] || option.text

                  return (
                    <button
                      key={option.id}
                      onClick={() => !isAlreadyDone && handleSelectOption(currentQ.id, option.id)}
                      disabled={isAlreadyDone}
                      className={cn(
                        'quiz-option w-full text-left',
                        isSelected && 'selected',
                        isAlreadyDone && 'cursor-not-allowed opacity-70',
                      )}
                    >
                      {/* Option label circle */}
                      <span className={cn(
                        'w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all',
                        isSelected
                          ? 'bg-brand-600 border-brand-600 text-white'
                          : 'border-slate-300 text-slate-500'
                      )}>
                        {option.label}
                      </span>
                      <span className="flex-1">{displayOptionText}</span>
                      {isSelected && <CheckCircle size={15} className="text-brand-600 flex-shrink-0" />}
                    </button>
                  )
                })
              }
        </div>

          {/* Clear answer */}
          {currentAnswer && !isAlreadyDone && (
            <button
              onClick={handleClearAnswer}
              className="mt-3 text-xs text-slate-400 hover:text-danger transition-colors flex items-center gap-1"
            >
              <XCircle size={12} /> {t('clearAnswer')}
            </button>
          )}
        </div>

        {/* ── Navigator ─────────────────────────────────────────────────────── */}
        <div className="card">
          <p className="text-xs text-slate-500 font-medium mb-2">
            {t('question')} · {answeredCount}/{totalQ}
          </p>
          <QuestionNavigator
            current={currentIdx}
            answers={answers}
            questions={questions}
            onGoto={setCurrentIdx}
          />
        </div>

        {/* ── Footer navigation ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-3 pb-4">
          <button
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            disabled={currentIdx === 0}
            className="btn-outline gap-1.5 disabled:opacity-40"
          >
            <ChevronLeft size={16} /> {t('previous')}
          </button>

          <div className="text-xs text-slate-400 text-center">
            {answeredCount} {t('of')} {totalQ}
          </div>

          {isLast ? (
            <button
              onClick={handleSubmit}
              disabled={submitting || isAlreadyDone}
              className="btn-primary gap-1.5 disabled:opacity-50"
            >
              {submitting ? t('submitting') : isAlreadyDone ? `${t('completed')} ✓` : `${t('submitAssessment')} →`}
            </button>
          ) : (
            <button
              onClick={() => setCurrentIdx((i) => Math.min(totalQ - 1, i + 1))}
              className="btn-primary gap-1.5"
            >
              {t('next')} <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    )
  }
