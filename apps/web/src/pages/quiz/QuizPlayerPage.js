import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, ChevronLeft, ChevronRight, XCircle, Wifi, WifiOff, BookOpen, RefreshCw, RotateCcw, Award, HelpCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { getLocalQuiz } from '@/services/downloadEngine';
import { processOutbox } from '@/services/syncEngine';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db/database';
import { getOrCreateAttempt, saveAnswerTransactionally, loadAttemptWithAnswers, finalizeAttempt, } from '@/services/attemptManager';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { cn } from '@/lib/utils';
function SaveStatusBadge({ status }) {
    if (status === 'saving')
        return (_jsxs("span", { className: "flex items-center gap-1 text-xs text-syncing-dark font-medium animate-pulse", children: [_jsx("span", { className: "w-1.5 h-1.5 bg-syncing rounded-full animate-pulse-dot" }), " Saving\u2026"] }));
    if (status === 'saved')
        return (_jsxs("span", { className: "flex items-center gap-1 text-xs text-success-dark font-medium", children: [_jsx(CheckCircle, { size: 12 }), " Saved on this device"] }));
    if (status === 'error')
        return (_jsxs("span", { className: "flex items-center gap-1 text-xs text-danger font-medium", children: [_jsx(XCircle, { size: 12 }), " Save failed \u2014 retrying"] }));
    return null;
}
// ── Timer hook ────────────────────────────────────────────────────────────────
function useTimer(startMs) {
    const [elapsed, setElapsed] = useState(0);
    useEffect(() => {
        if (!startMs)
            return;
        const update = () => setElapsed(Math.max(0, Math.floor((Date.now() - startMs) / 1000)));
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, [startMs]);
    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');
    return `${mins}:${secs}`;
}
// ── Question Navigator ────────────────────────────────────────────────────────
function QuestionNavigator({ current, answers, questions, onGoto, }) {
    return (_jsx("div", { className: "flex gap-1.5 flex-wrap", children: questions.map((q, i) => {
            const isAnswered = !!answers[q.id]?.selectedOptionId;
            const isCurrent = i === current;
            return (_jsx("button", { onClick: () => onGoto(i), className: cn('w-8 h-8 rounded-lg text-xs font-bold transition-all', isCurrent ? 'bg-brand-600 text-white shadow-md scale-110' :
                    isAnswered ? 'bg-success/20 text-success-dark border border-success/40' :
                        'bg-slate-100 text-slate-500 hover:bg-brand-50 hover:text-brand-700'), children: i + 1 }, q.id));
        }) }));
}
// ── Quiz Completion Modal ─────────────────────────────────────────────────────
function QuizCompleteModal({ quizTitle, answeredCount, totalCount, receipt, isOnline, onRetake, onNavigateCourse, onNavigateQuizzes, onNavigateDashboard, }) {
    const score = receipt?.score;
    const total = receipt?.totalQuestions ?? totalCount;
    const pct = score !== undefined ? Math.round((score / total) * 100) : null;
    const isGreat = pct !== null && pct >= 70;
    return (_jsx("div", { className: "fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in", children: _jsxs("div", { className: "bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-md w-full text-center animate-slide-up border border-slate-100 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-success via-brand-500 to-indigo-500" }), _jsx("div", { className: "relative mx-auto w-16 h-16 mb-3 flex items-center justify-center", children: _jsx("div", { className: "w-16 h-16 bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] rounded-2xl flex items-center justify-center shadow-xs", children: _jsx(Award, { size: 32, strokeWidth: 2.2 }) }) }), _jsx("span", { className: "bg-[#E1F0FA] text-[#1465A3] border border-[#CBE4F6] text-[11px] font-bold px-3 py-1 rounded-full mb-3 inline-block", children: "Quiz Completed" }), _jsx("h2", { className: "text-xl md:text-2xl font-bold text-slate-900 mb-1 leading-snug", children: "You have successfully completed the quiz!" }), _jsxs("p", { className: "text-slate-500 text-xs mb-4", children: ["Great job! Your answers for ", _jsx("strong", { className: "text-slate-700", children: quizTitle }), " have been submitted."] }), score !== undefined ? (_jsxs("div", { className: "bg-[#F0F7FD] rounded-2xl p-4 border border-[#CBE4F6] mb-4 text-left", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("span", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider", children: "Your Score" }), _jsxs("span", { className: "text-xs font-bold text-[#1465A3] bg-[#E1F0FA] px-2.5 py-0.5 rounded-full border border-[#CBE4F6]", children: [pct, "%"] })] }), _jsxs("div", { className: "flex items-baseline gap-2 mb-1.5", children: [_jsx("span", { className: "text-3xl font-black text-[#1B7FC9]", children: score }), _jsxs("span", { className: "text-base text-slate-400 font-semibold", children: ["/ ", total, " correct"] })] }), _jsx("p", { className: "text-xs text-slate-700 font-medium", children: isGreat ? 'Outstanding performance! You demonstrated strong mastery.' : 'Good effort! Review the lessons to boost your understanding.' })] })) : (_jsxs("div", { className: "bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70 mb-4 text-xs text-slate-600", children: ["You answered ", _jsxs("strong", { className: "text-slate-900", children: [answeredCount, " of ", totalCount] }), " questions."] })), _jsx("div", { className: cn('text-xs font-medium p-3 rounded-xl mb-5 flex items-center gap-2.5 text-left', receipt
                        ? 'bg-success/10 text-success-dark border border-success/20'
                        : isOnline
                            ? 'bg-syncing/10 text-syncing-dark border border-syncing/20'
                            : 'bg-warning/10 text-warning-dark border border-warning/20'), children: receipt ? (_jsxs(_Fragment, { children: [_jsx(CheckCircle, { size: 16, className: "text-success flex-shrink-0" }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "font-bold", children: "\u2713 Synced & Verified by Server" }), _jsxs("p", { className: "text-[10px] text-slate-500 truncate font-mono", children: ["Receipt: ", receipt.receiptHash.slice(0, 16), "\u2026"] })] })] })) : isOnline ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { size: 14, className: "animate-spin text-syncing-dark flex-shrink-0" }), _jsx("span", { children: "Answers queued and syncing to server\u2026" })] })) : (_jsxs(_Fragment, { children: [_jsx(WifiOff, { size: 14, className: "text-warning-dark flex-shrink-0" }), _jsx("span", { children: "Answers saved safely on this device. Will auto-sync when online." })] })) }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs("button", { onClick: onRetake, className: "btn-outline text-xs py-2.5 font-bold flex items-center justify-center gap-1.5 hover:border-brand-500 hover:text-brand-600", children: [_jsx(RotateCcw, { size: 13 }), " Retake Quiz"] }), _jsxs("button", { onClick: onNavigateCourse, className: "btn-primary text-xs py-2.5 shadow-sm font-bold flex items-center justify-center gap-1.5", children: [_jsx(BookOpen, { size: 13 }), " Back to Course"] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx("button", { onClick: onNavigateQuizzes, className: "btn-secondary text-xs py-2 font-semibold", children: "All Quizzes" }), _jsx("button", { onClick: onNavigateDashboard, className: "btn-outline text-xs py-2 font-semibold", children: "Dashboard" })] })] })] }) }));
}
// ── Main Quiz Player ──────────────────────────────────────────────────────────
export function QuizPlayerPage() {
    const { quizVersionId, courseId: routeCourseId } = useParams();
    const navigate = useNavigate();
    const isOnline = useOnlineStatus();
    // State
    const [quiz, setQuiz] = useState(null);
    const [courseId, setCourseId] = useState(routeCourseId || '');
    const [attempt, setAttempt] = useState(null);
    const [answers, setAnswers] = useState({});
    const [currentIdx, setCurrentIdx] = useState(0);
    const [saveStatus, setSaveStatus] = useState('idle');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showComplete, setShowComplete] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const saveStatusTimer = useRef(null);
    const elapsed = useTimer(attempt?.startedAt);
    // ── Live Receipt from IndexedDB (Hook must be at top-level) ───────────────
    const liveReceipt = useLiveQuery(() => (attempt?.clientAttemptId ? db.syncReceipts.get(attempt.clientAttemptId) : undefined), [attempt?.clientAttemptId]);
    // ── Load quiz from IndexedDB, API, or Catalog ──────────────────────────────
    useEffect(() => {
        if (!quizVersionId)
            return;
        async function load() {
            try {
                setLoading(true);
                setError(null);
                // 1. Load quiz content from local store / cache / catalog
                const localQuiz = await getLocalQuiz(quizVersionId);
                if (!localQuiz || !localQuiz.questions || localQuiz.questions.length === 0) {
                    setError('Quiz could not be loaded. Please ensure you are online or have downloaded this course.');
                    return;
                }
                setQuiz(localQuiz);
                const activeCourseId = (routeCourseId && routeCourseId !== 'undefined')
                    ? routeCourseId
                    : localQuiz.courseId || 'general';
                setCourseId(activeCourseId);
                // 2. Create or resume attempt (crash recovery built-in)
                const att = await getOrCreateAttempt(quizVersionId, activeCourseId, localQuiz.title);
                setAttempt(att);
                // 3. Load all previously saved answers (crash recovery)
                const loaded = await loadAttemptWithAnswers(att.clientAttemptId);
                if (loaded) {
                    setAnswers(loaded.answers);
                    // Resume from last unanswered question
                    const questions = localQuiz.questions;
                    const lastAnsweredIdx = questions.findIndex((q) => !loaded.answers[q.id]);
                    if (lastAnsweredIdx > 0)
                        setCurrentIdx(lastAnsweredIdx);
                }
            }
            catch (e) {
                setError(e instanceof Error ? e.message : 'Failed to load quiz');
            }
            finally {
                setLoading(false);
            }
        }
        load();
    }, [quizVersionId, routeCourseId]);
    // ── Select an answer (transactional write-before-confirm) ──────────────────
    const handleSelectOption = useCallback(async (questionId, optionId) => {
        if (!attempt || attempt.status !== 'DRAFT')
            return;
        // Show "saving" immediately in UI
        setSaveStatus('saving');
        if (saveStatusTimer.current)
            clearTimeout(saveStatusTimer.current);
        try {
            // DURABILITY: write to IndexedDB first, then update React state
            const saved = await saveAnswerTransactionally(attempt.clientAttemptId, questionId, optionId);
            // Only update UI state after DB commit succeeds
            setAnswers((prev) => ({ ...prev, [questionId]: saved }));
            setSaveStatus('saved');
        }
        catch {
            setSaveStatus('error');
        }
        finally {
            // Reset to idle after 3s
            saveStatusTimer.current = setTimeout(() => setSaveStatus('idle'), 3000);
        }
    }, [attempt]);
    // ── Clear answer ──────────────────────────────────────────────────────────
    const handleClearAnswer = useCallback(async () => {
        if (!attempt || !quiz)
            return;
        const qId = quiz.questions[currentIdx]?.id;
        if (!qId)
            return;
        setSaveStatus('saving');
        try {
            const saved = await saveAnswerTransactionally(attempt.clientAttemptId, qId, null);
            setAnswers((prev) => ({ ...prev, [qId]: saved }));
            setSaveStatus('saved');
        }
        catch {
            setSaveStatus('error');
        }
        finally {
            saveStatusTimer.current = setTimeout(() => setSaveStatus('idle'), 3000);
        }
    }, [attempt, quiz, currentIdx]);
    // ── Submit (finalize → outbox → immediate sync) ───────────────────────────
    const handleSubmit = useCallback(async () => {
        if (!attempt || submitting)
            return;
        setSubmitting(true);
        try {
            await finalizeAttempt(attempt.clientAttemptId);
            setAttempt((prev) => prev ? { ...prev, status: 'QUEUED' } : prev);
            // Trigger immediate background sync
            try {
                await processOutbox(true);
            }
            catch (err) {
                console.warn('[Quiz] Initial sync notice:', err);
            }
            setShowComplete(true);
        }
        catch (e) {
            alert(e instanceof Error ? e.message : 'Failed to submit');
        }
        finally {
            setSubmitting(false);
        }
    }, [attempt, submitting]);
    // ── Retake Quiz (Fresh Attempt) ──────────────────────────────────────────
    const handleRetake = useCallback(async () => {
        if (!quiz)
            return;
        const activeCourseId = courseId || quiz.courseId || 'general';
        const newAttempt = {
            clientAttemptId: uuidv4(),
            quizVersionId: quiz.id,
            courseId: activeCourseId,
            quizTitle: quiz.title,
            status: 'DRAFT',
            startedAt: Date.now(),
            lastLocalSaveAt: Date.now(),
        };
        await db.attempts.put(newAttempt);
        setAttempt(newAttempt);
        setAnswers({});
        setCurrentIdx(0);
        setShowComplete(false);
    }, [quiz, courseId]);
    // ── Loading state ─────────────────────────────────────────────────────────
    if (loading || !quiz || !attempt)
        return (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-10 h-10 border-4 border-[#1B7FC9] border-t-transparent rounded-full animate-spin mx-auto mb-3" }), _jsx("p", { className: "text-sm text-slate-500 font-medium", children: "Loading quiz questions\u2026" })] }) }));
    if (error)
        return (_jsxs("div", { className: "bg-white rounded-2xl border border-[#D7E5F0] text-center py-12 max-w-md mx-auto shadow-xs", children: [_jsx(XCircle, { className: "w-12 h-12 text-rose-500 mx-auto mb-3" }), _jsx("p", { className: "font-bold text-slate-900 mb-1", children: "Quiz Unavailable" }), _jsx("p", { className: "text-xs text-slate-500 mb-4", children: error }), _jsx("button", { onClick: () => navigate('/quizzes'), className: "bg-[#1B7FC9] hover:bg-[#1465A3] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-xs", children: "Browse Quizzes" })] }));
    const questions = quiz.questions || [];
    const totalQ = questions.length;
    if (totalQ === 0)
        return (_jsxs("div", { className: "bg-white rounded-2xl border border-[#D7E5F0] text-center py-12 max-w-md mx-auto shadow-xs", children: [_jsx(HelpCircle, { className: "w-12 h-12 text-slate-300 mx-auto mb-3" }), _jsx("p", { className: "font-bold text-slate-900 mb-1", children: "No Questions Found" }), _jsx("p", { className: "text-xs text-slate-500 mb-4", children: "This quiz doesn't have any questions configured." }), _jsx("button", { onClick: () => navigate('/quizzes'), className: "bg-[#1B7FC9] hover:bg-[#1465A3] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-xs", children: "Browse Quizzes" })] }));
    const currentQ = questions[currentIdx] || questions[0];
    const currentAnswer = answers[currentQ?.id]?.selectedOptionId;
    const answeredCount = Object.values(answers).filter((a) => a.selectedOptionId).length;
    const isLast = currentIdx === totalQ - 1;
    const isAlreadyDone = attempt.status !== 'DRAFT';
    return (_jsxs("div", { className: "max-w-2xl mx-auto space-y-4 animate-fade-in", children: [showComplete && (_jsx(QuizCompleteModal, { quizTitle: quiz.title, answeredCount: answeredCount, totalCount: totalQ, receipt: liveReceipt, isOnline: isOnline, onRetake: handleRetake, onNavigateCourse: () => navigate(`/courses/${courseId}`), onNavigateQuizzes: () => navigate('/quizzes'), onNavigateDashboard: () => navigate('/dashboard') })), _jsxs("div", { className: "card flex items-center gap-3 py-3", children: [_jsx("button", { onClick: () => navigate(-1), className: "p-2 hover:bg-slate-100 rounded-xl transition-colors", children: _jsx(ArrowLeft, { size: 18, className: "text-slate-600" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-bold text-slate-900 text-sm truncate", children: quiz.title }), _jsxs("p", { className: "text-xs text-slate-500", children: ["Question ", currentIdx + 1, " of ", totalQ] })] }), _jsxs("div", { className: cn('flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-xl', isOnline ? 'bg-success/10 text-success-dark' : 'bg-warning/10 text-warning-dark'), children: [isOnline ? _jsx(Wifi, { size: 11 }) : _jsx(WifiOff, { size: 11 }), isOnline ? 'Online' : 'Offline Mode'] }), _jsxs("div", { className: "flex items-center gap-1 text-xs text-slate-500 font-mono bg-slate-50 px-2.5 py-1 rounded-xl", children: [_jsx(Clock, { size: 11 }), " ", elapsed] })] }), _jsx("div", { className: "progress-track", children: _jsx("div", { className: "progress-fill transition-all duration-500", style: { width: `${((currentIdx + 1) / totalQ) * 100}%` } }) }), isAlreadyDone && (_jsxs("div", { className: "card bg-amber-50 border border-amber-200 p-4 flex items-center justify-between gap-3 animate-fade-in", children: [_jsxs("div", { className: "text-xs text-amber-900", children: [_jsx("p", { className: "font-bold", children: "You previously submitted this quiz." }), _jsx("p", { className: "text-amber-700", children: "Options are locked. Click \"Retake Quiz\" anytime to practice again!" })] }), _jsxs("button", { onClick: handleRetake, className: "btn-primary text-xs py-2 px-3 font-bold flex items-center gap-1.5 flex-shrink-0", children: [_jsx(RotateCcw, { size: 13 }), " Retake Quiz"] })] })), _jsxs("div", { className: "card", children: [_jsxs("div", { className: "flex items-start justify-between gap-4 mb-5", children: [_jsx("h2", { className: "text-base font-semibold text-slate-900 leading-snug flex-1", children: currentQ.prompt }), _jsx(SaveStatusBadge, { status: saveStatus })] }), _jsx("div", { className: "space-y-2.5", children: currentQ.options.map((option) => {
                            const isSelected = currentAnswer === option.id;
                            return (_jsxs("button", { onClick: () => !isAlreadyDone && handleSelectOption(currentQ.id, option.id), disabled: isAlreadyDone, className: cn('quiz-option w-full text-left', isSelected && 'selected', isAlreadyDone && 'cursor-not-allowed opacity-70'), children: [_jsx("span", { className: cn('w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all', isSelected
                                            ? 'bg-brand-600 border-brand-600 text-white'
                                            : 'border-slate-300 text-slate-500'), children: option.label }), _jsx("span", { className: "flex-1", children: option.text }), isSelected && _jsx(CheckCircle, { size: 15, className: "text-brand-600 flex-shrink-0" })] }, option.id));
                        }) }), currentAnswer && !isAlreadyDone && (_jsxs("button", { onClick: handleClearAnswer, className: "mt-3 text-xs text-slate-400 hover:text-danger transition-colors flex items-center gap-1", children: [_jsx(XCircle, { size: 12 }), " Clear Answer"] }))] }), _jsxs("div", { className: "card", children: [_jsxs("p", { className: "text-xs text-slate-500 font-medium mb-2", children: ["Question Navigator \u00B7 ", answeredCount, "/", totalQ, " answered"] }), _jsx(QuestionNavigator, { current: currentIdx, answers: answers, questions: questions, onGoto: setCurrentIdx })] }), _jsxs("div", { className: "flex items-center justify-between gap-3 pb-4", children: [_jsxs("button", { onClick: () => setCurrentIdx((i) => Math.max(0, i - 1)), disabled: currentIdx === 0, className: "btn-outline gap-1.5 disabled:opacity-40", children: [_jsx(ChevronLeft, { size: 16 }), " Previous"] }), _jsxs("div", { className: "text-xs text-slate-400 text-center", children: [answeredCount, " of ", totalQ, " answered"] }), isLast ? (_jsx("button", { onClick: handleSubmit, disabled: submitting || isAlreadyDone, className: "btn-primary gap-1.5 disabled:opacity-50", children: submitting ? 'Submitting…' : isAlreadyDone ? 'Submitted ✓' : 'Submit Quiz →' })) : (_jsxs("button", { onClick: () => setCurrentIdx((i) => Math.min(totalQ - 1, i + 1)), className: "btn-primary gap-1.5", children: ["Next ", _jsx(ChevronRight, { size: 16 })] }))] })] }));
}
//# sourceMappingURL=QuizPlayerPage.js.map