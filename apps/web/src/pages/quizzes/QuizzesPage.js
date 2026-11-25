import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { HelpCircle, CheckCircle, Clock, BookOpen, ArrowRight, Award, RotateCcw } from 'lucide-react';
import { fetchAllQuizzes } from '@/lib/api';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db/database';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
import { getQuizTranslation } from '@/data/quiz-translations';
export function QuizzesPage() {
    const navigate = useNavigate();
    const isOnline = useOnlineStatus();
    const { language, t, translateSubject } = useI18n();
    const [selectedSubject, setSelectedSubject] = useState('All');
    // 1. Fetch server quizzes if online
    const { data: serverQuizzes = [], isLoading } = useQuery({
        queryKey: ['all-quizzes'],
        queryFn: fetchAllQuizzes,
        enabled: isOnline,
        staleTime: 5 * 60 * 1000,
    });
    // 2. Fetch offline quizzes from IndexedDB
    const localItems = useLiveQuery(() => db.contentItems.where('type').equals('quiz').toArray(), [], []);
    // 3. Completed sync receipts & attempts
    const receipts = useLiveQuery(() => db.syncReceipts.toArray(), [], []);
    const attempts = useLiveQuery(() => db.attempts.toArray(), [], []);
    // Map quizVersionId -> receipt
    const receiptByQuiz = new Map();
    if (attempts && receipts) {
        const receiptByAttempt = new Map(receipts.map((r) => [r.clientAttemptId, r]));
        for (const a of attempts) {
            const r = receiptByAttempt.get(a.clientAttemptId);
            if (r)
                receiptByQuiz.set(a.quizVersionId, r);
        }
    }
    const attemptByQuiz = new Map(attempts?.map((a) => [a.quizVersionId, a]));
    // Combine online & offline quiz list
    const quizList = [];
    const seenIds = new Set();
    // From server
    for (const q of serverQuizzes) {
        if (!seenIds.has(q.quizVersionId)) {
            seenIds.add(q.quizVersionId);
            quizList.push(q);
        }
    }
    // From local IndexedDB
    for (const item of localItems || []) {
        if (!seenIds.has(item.id)) {
            seenIds.add(item.id);
            let parsed = null;
            try {
                parsed = JSON.parse(item.contentJson);
            }
            catch { }
            quizList.push({
                quizVersionId: item.id,
                courseId: item.courseId,
                courseTitle: parsed?.courseTitle || 'Offline Course',
                subject: parsed?.subject || 'General',
                title: item.title,
                version: parsed?.version || 1,
                questionCount: parsed?.questions?.length || 5,
                timeLimitMins: 15,
            });
        }
    }
    const subjects = ['All', ...Array.from(new Set(quizList.map((q) => q.subject)))];
    const filtered = selectedSubject === 'All'
        ? quizList
        : quizList.filter((q) => q.subject === selectedSubject);
    const completedCount = receiptByQuiz.size;
    return (_jsxs("div", { className: "space-y-6 animate-fade-in pb-12", children: [_jsx("div", { className: "relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#F0F7FD] via-[#E1F0FA] to-[#CBE4F6] p-6 md:p-8 text-slate-900 border border-[#CBE4F6] shadow-xs", children: _jsxs("div", { className: "relative z-10 max-w-xl", children: [_jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#CBE4F6] text-xs font-bold text-[#1465A3] mb-3", children: [_jsx(HelpCircle, { size: 14 }), " ", t('interactiveQuizzes')] }), _jsx("h1", { className: "text-2xl md:text-3xl font-bold tracking-tight mb-4", children: t('quizzesTitle') }), _jsxs("div", { className: "flex flex-wrap gap-4 text-xs", children: [_jsxs("div", { className: "bg-white px-3.5 py-1.5 rounded-xl border border-[#D7E5F0] shadow-xs flex items-center gap-2", children: [_jsx(BookOpen, { size: 14, className: "text-[#1B7FC9]" }), _jsxs("span", { children: [_jsx("strong", { children: quizList.length }), " ", t('quizzesAvailable')] })] }), _jsxs("div", { className: "bg-white px-3.5 py-1.5 rounded-xl border border-[#D7E5F0] shadow-xs flex items-center gap-2", children: [_jsx(CheckCircle, { size: 14, className: "text-emerald-600" }), _jsxs("span", { children: [_jsx("strong", { children: completedCount }), " ", t('completed')] })] })] })] }) }), _jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar", children: subjects.map((sub) => (_jsx("button", { onClick: () => setSelectedSubject(sub), className: cn('px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap', selectedSubject === sub
                        ? 'bg-[#1B7FC9] text-white shadow-xs'
                        : 'bg-white border border-[#D7E5F0] text-slate-700 hover:border-[#1B7FC9]'), children: _jsx("span", { children: sub === 'All' ? t('allSubjects') : translateSubject(sub) }) }, sub))) }), isLoading && quizList.length === 0 ? (_jsx("div", { className: "flex justify-center items-center py-20", children: _jsx("div", { className: "w-8 h-8 border-4 border-[#1B7FC9] border-t-transparent rounded-full animate-spin" }) })) : filtered.length === 0 ? (_jsxs("div", { className: "bg-white rounded-2xl border border-[#D7E5F0] p-12 text-center max-w-md mx-auto shadow-xs", children: [_jsx(HelpCircle, { className: "w-12 h-12 text-slate-300 mx-auto mb-3" }), _jsx("p", { className: "font-bold text-slate-800 text-base mb-4", children: "No quizzes found" }), _jsx("button", { onClick: () => navigate('/courses'), className: "bg-[#1B7FC9] hover:bg-[#1465A3] text-white text-xs font-bold py-2.5 px-5 rounded-xl mx-auto shadow-xs", children: "Browse Courses" })] })) : (_jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map((quiz) => {
                    const receipt = receiptByQuiz.get(quiz.quizVersionId);
                    const attempt = attemptByQuiz.get(quiz.quizVersionId);
                    const isCompleted = !!receipt || attempt?.status === 'SYNCED';
                    const translatedTitle = getQuizTranslation(quiz.title, language)?.title || quiz.title;
                    return (_jsxs("div", { className: cn('bg-white rounded-2xl p-5 border shadow-xs hover:border-[#1B7FC9] hover:shadow-card transition-all flex flex-col justify-between', isCompleted ? 'border-emerald-200' : 'border-[#D7E5F0]'), children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between gap-2 mb-3", children: [_jsx("span", { className: "text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#E1F0FA] text-[#1465A3] border border-[#CBE4F6]", children: translateSubject(quiz.subject) }), isCompleted ? (_jsxs("span", { className: "bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1", children: [_jsx(CheckCircle, { size: 11 }), " ", t('completed')] })) : attempt?.status === 'DRAFT' ? (_jsx("span", { className: "bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold", children: t('inProgress') })) : (_jsx("span", { className: "bg-[#E1F0FA] text-[#1465A3] border border-[#CBE4F6] px-2.5 py-0.5 rounded-full text-[10px] font-bold", children: t('offlineReady') }))] }), _jsx("h3", { className: "font-bold text-slate-900 text-base mb-1 leading-snug line-clamp-2", children: translatedTitle }), _jsxs("p", { className: "text-xs text-slate-500 mb-3 truncate flex items-center gap-1", children: [_jsx(BookOpen, { size: 12, className: "text-slate-400" }), _jsx("span", { children: quiz.courseTitle })] }), _jsxs("div", { className: "flex items-center gap-3 text-xs text-slate-500 bg-[#F8FAFC] p-2.5 rounded-xl mb-4 border border-[#D7E5F0]", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(HelpCircle, { size: 13, className: "text-[#1B7FC9]" }), _jsx("strong", { children: quiz.questionCount }), " ", t('questionCount')] }), _jsx("span", { className: "text-slate-300", children: "|" }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { size: 13, className: "text-slate-400" }), quiz.timeLimitMins, " ", t('timeLimitMins')] })] }), receipt && receipt.score !== undefined && (_jsxs("div", { className: "mb-4 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs font-semibold text-emerald-800", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Award, { size: 14 }), " ", t('yourScore'), ":"] }), _jsxs("span", { className: "text-sm font-bold", children: [receipt.score, " / ", receipt.totalQuestions ?? quiz.questionCount] })] }))] }), _jsxs("div", { className: "flex items-center gap-2 pt-2 border-t border-[#D7E5F0]", children: [_jsx("button", { onClick: () => {
                                            const target = quiz.courseId && quiz.courseId !== 'undefined'
                                                ? `/courses/${quiz.courseId}/quiz/${quiz.quizVersionId}`
                                                : `/quiz/${quiz.quizVersionId}`;
                                            navigate(target);
                                        }, className: cn('flex-1 text-xs py-2 px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs', isCompleted
                                            ? 'bg-[#E1F0FA] text-[#1465A3] hover:bg-[#CBE4F6]'
                                            : 'bg-[#1B7FC9] hover:bg-[#1465A3] text-white active:scale-[0.98]'), children: isCompleted ? (_jsxs(_Fragment, { children: [_jsx(RotateCcw, { size: 12 }), " ", t('retakeQuiz')] })) : (_jsxs(_Fragment, { children: [_jsx(HelpCircle, { size: 12 }), " ", t('startAssessment')] })) }), _jsx("button", { onClick: () => navigate(`/courses/${quiz.courseId}`), className: "p-2 border border-[#D7E5F0] hover:border-[#1B7FC9] rounded-xl text-slate-600 hover:text-[#1B7FC9] transition-colors", title: "View Course Details", children: _jsx(ArrowRight, { size: 14 }) })] })] }, quiz.quizVersionId));
                }) }))] }));
}
//# sourceMappingURL=QuizzesPage.js.map