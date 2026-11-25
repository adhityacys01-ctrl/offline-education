import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, Award, Clock, ArrowRight, Download, Play } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db/database';
import { useI18n } from '@/lib/i18n';
export function ProgressPage() {
    const navigate = useNavigate();
    const { t, translateSubject } = useI18n();
    // Real offline data from Dexie
    const packs = useLiveQuery(() => db.coursePacks.toArray(), [], []);
    const receipts = useLiveQuery(() => db.syncReceipts.toArray(), [], []);
    const courseCount = packs?.length || 5;
    const quizzesCompleted = receipts?.length || 18;
    // Average quiz score calculation
    let avgScore = 87;
    if (receipts && receipts.length > 0) {
        const scores = receipts.filter((r) => r.score !== undefined);
        if (scores.length > 0) {
            const sumPct = scores.reduce((acc, r) => acc + (r.score / (r.totalQuestions || 4)) * 100, 0);
            avgScore = Math.round(sumPct / scores.length);
        }
    }
    // Circular gauge calculations for 78% (r=58, circumference=364.4)
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    const overallPct = 78;
    const strokeDashoffset = circumference - (circumference * overallPct) / 100;
    // Subject-wise progress data
    const subjects = [
        { name: 'Mathematics', pct: 92, courseId: 'seed-course-mathematics' },
        { name: 'Biology', pct: 78, courseId: 'seed-course-biology' },
        { name: 'History', pct: 70, courseId: 'seed-course-history' },
        { name: 'Science', pct: 65, courseId: 'seed-course-computer-science' },
    ];
    // Recent activity entries
    const activities = [
        {
            id: 1,
            type: 'quiz',
            text: 'Completed: Mathematics Quiz - Chapter 3',
            time: '2 hours ago',
            icon: CheckCircle2,
        },
        {
            id: 2,
            type: 'download',
            text: 'Downloaded: Environmental Science - Chapter 1',
            time: '3 hours ago',
            icon: Download,
        },
        {
            id: 3,
            type: 'lesson',
            text: 'Started: Biology Lesson - Chapter 3',
            time: '1 day ago',
            icon: Play,
        },
    ];
    return (_jsxs("div", { className: "space-y-6 animate-fade-in pb-12", children: [_jsx("div", { children: _jsx("h1", { className: "text-2xl font-bold text-slate-900 tracking-tight", children: t('progress') }) }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5", children: [_jsxs("div", { className: "bg-white rounded-2xl p-5 border border-[#D7E5F0] shadow-xs text-center flex flex-col items-center justify-center", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center mb-2.5 shadow-xs", children: _jsx(BookOpen, { size: 22, strokeWidth: 2.2 }) }), _jsx("p", { className: "text-2xl md:text-3xl font-black text-slate-900 tracking-tight", children: courseCount }), _jsx("p", { className: "text-xs text-slate-500 font-medium mt-0.5", children: t('coursesTitle') })] }), _jsxs("div", { className: "bg-white rounded-2xl p-5 border border-[#D7E5F0] shadow-xs text-center flex flex-col items-center justify-center", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center mb-2.5 shadow-xs", children: _jsx(CheckCircle2, { size: 22, strokeWidth: 2.2 }) }), _jsx("p", { className: "text-2xl md:text-3xl font-black text-slate-900 tracking-tight", children: quizzesCompleted }), _jsxs("p", { className: "text-xs text-slate-500 font-medium mt-0.5", children: [t('quizzes'), " ", t('completed')] })] }), _jsxs("div", { className: "bg-white rounded-2xl p-5 border border-[#D7E5F0] shadow-xs text-center flex flex-col items-center justify-center", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center mb-2.5 shadow-xs", children: _jsx(Award, { size: 22, strokeWidth: 2.2 }) }), _jsxs("p", { className: "text-2xl md:text-3xl font-black text-slate-900 tracking-tight", children: [avgScore, "%"] }), _jsx("p", { className: "text-xs text-slate-500 font-medium mt-0.5", children: t('averageScore') })] }), _jsxs("div", { className: "bg-white rounded-2xl p-5 border border-[#D7E5F0] shadow-xs text-center flex flex-col items-center justify-center", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center mb-2.5 shadow-xs", children: _jsx(Clock, { size: 22, strokeWidth: 2.2 }) }), _jsx("p", { className: "text-2xl md:text-3xl font-black text-slate-900 tracking-tight", children: "12.5 h" }), _jsx("p", { className: "text-xs text-slate-500 font-medium mt-0.5", children: "Learning Time" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6", children: [_jsxs("div", { className: "md:col-span-5 bg-white rounded-2xl p-6 border border-[#D7E5F0] shadow-xs flex flex-col items-center justify-between text-center min-h-[300px]", children: [_jsx("h2", { className: "text-base font-bold text-slate-900 tracking-tight self-start", children: "Overall Progress" }), _jsxs("div", { className: "relative w-40 h-40 my-2 flex items-center justify-center", children: [_jsxs("svg", { className: "w-full h-full transform -rotate-90", viewBox: "0 0 140 140", children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "progressGrad", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "#1B7FC9" }), _jsx("stop", { offset: "100%", stopColor: "#1465A3" })] }) }), _jsx("circle", { cx: "70", cy: "70", r: radius, stroke: "#E8F2FA", strokeWidth: "12", fill: "none" }), _jsx("circle", { cx: "70", cy: "70", r: radius, stroke: "url(#progressGrad)", strokeWidth: "12", strokeDasharray: circumference, strokeDashoffset: strokeDashoffset, strokeLinecap: "round", fill: "none", className: "transition-all duration-1000 ease-out" })] }), _jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: _jsxs("span", { className: "text-3xl font-black text-slate-900 tracking-tight", children: [overallPct, "%"] }) })] }), _jsxs("button", { onClick: () => navigate('/courses'), className: "w-full bg-[#1B7FC9] hover:bg-[#1465A3] active:scale-[0.98] text-white text-xs font-bold py-2.5 px-6 rounded-xl shadow-xs inline-flex items-center justify-center gap-1.5 transition-all mt-2", children: ["View Details ", _jsx(ArrowRight, { size: 13 })] })] }), _jsx("div", { className: "md:col-span-7 bg-white rounded-2xl p-6 border border-[#D7E5F0] shadow-xs flex flex-col justify-between", children: _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-5", children: [_jsx("h2", { className: "text-base font-bold text-slate-900 tracking-tight", children: "Subject-wise Progress" }), _jsx("button", { onClick: () => navigate('/courses'), className: "text-xs font-bold text-[#1B7FC9] hover:text-[#1465A3] transition-colors", children: "All Subjects \u2192" })] }), _jsx("div", { className: "space-y-4", children: subjects.map((subj) => (_jsxs("div", { onClick: () => navigate(`/courses/${subj.courseId}`), className: "cursor-pointer group", children: [_jsxs("div", { className: "flex items-center justify-between text-xs mb-1.5", children: [_jsx("span", { className: "font-semibold text-slate-700 group-hover:text-[#1B7FC9] transition-colors", children: translateSubject(subj.name) }), _jsxs("span", { className: "font-bold text-slate-900", children: [subj.pct, "%"] })] }), _jsx("div", { className: "w-full bg-[#E8F2FA] h-2.5 rounded-full overflow-hidden border border-[#D7E5F0]", children: _jsx("div", { className: "h-full rounded-full transition-all duration-700 bg-[#1B7FC9]", style: { width: `${subj.pct}%` } }) })] }, subj.name))) })] }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between px-1", children: [_jsx("h2", { className: "text-base font-bold text-slate-900 tracking-tight", children: "Recent Activity" }), _jsx("button", { onClick: () => navigate('/sync'), className: "text-xs font-bold text-[#1B7FC9] hover:text-[#1465A3] transition-colors", children: "View All \u2192" })] }), _jsx("div", { className: "bg-white rounded-2xl p-5 md:p-6 border border-[#D7E5F0] shadow-xs divide-y divide-[#D7E5F0]", children: activities.map((act) => {
                            const Icon = act.icon;
                            return (_jsxs("div", { className: "flex items-center justify-between py-3.5 first:pt-0 last:pb-0 gap-4", children: [_jsxs("div", { className: "flex items-center gap-3.5 min-w-0", children: [_jsx("div", { className: "w-9 h-9 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center flex-shrink-0 shadow-xs", children: _jsx(Icon, { size: 16, strokeWidth: 2.4 }) }), _jsx("span", { className: "text-xs md:text-sm font-semibold text-slate-800 truncate", children: act.text })] }), _jsx("span", { className: "text-xs text-slate-400 font-medium whitespace-nowrap flex-shrink-0", children: act.time })] }, act.id));
                        }) })] })] }));
}
//# sourceMappingURL=ProgressPage.js.map