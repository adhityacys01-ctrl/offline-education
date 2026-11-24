import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Maximize2, ChevronLeft, ChevronRight, CheckCircle, BookOpen, AlertCircle } from 'lucide-react';
import { getLocalLesson, getLocalLessonsForCourse } from '@/services/downloadEngine';
import { fetchCourse } from '@/lib/api';
import { markLessonComplete } from '@/db/database';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';
export function LessonViewerPage() {
    const { lessonId, courseId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [lesson, setLesson] = useState(null);
    const [siblings, setSiblings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tab, setTab] = useState('content');
    const [completed, setCompleted] = useState(false);
    useEffect(() => {
        if (!lessonId || !courseId)
            return;
        async function load() {
            try {
                setLoading(true);
                const local = await getLocalLesson(lessonId);
                if (!local) {
                    setError('Lesson not downloaded. Please download the course first.');
                    return;
                }
                setLesson(local);
                // Load siblings for prev/next navigation
                const allItems = await getLocalLessonsForCourse(courseId);
                if (allItems && allItems.length > 0) {
                    setSiblings(allItems
                        .filter((i) => i.type === 'lesson')
                        .map((i) => ({ id: i.id, title: i.title, order: i.order })));
                }
                else {
                    try {
                        const courseData = await fetchCourse(courseId);
                        if (courseData.lessons) {
                            setSiblings(courseData.lessons.map((l) => ({ id: l.id, title: l.title, order: l.order })));
                        }
                    }
                    catch { }
                }
            }
            catch (e) {
                setError(e instanceof Error ? e.message : 'Failed to load lesson');
            }
            finally {
                setLoading(false);
            }
        }
        load();
    }, [lessonId, courseId]);
    const handleMarkComplete = async () => {
        if (!lesson || !user)
            return;
        await markLessonComplete(user.id, lesson.id, lesson.courseId);
        setCompleted(true);
    };
    const currentIdx = siblings.findIndex((s) => s.id === lessonId);
    const prevLesson = currentIdx > 0 ? siblings[currentIdx - 1] : null;
    const nextLesson = currentIdx < siblings.length - 1 ? siblings[currentIdx + 1] : null;
    if (loading)
        return (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" }), _jsx("p", { className: "text-sm text-slate-500", children: "Loading lesson\u2026" })] }) }));
    if (error)
        return (_jsxs("div", { className: "bg-white rounded-2xl border border-[#D7E5F0] text-center py-12 max-w-md mx-auto shadow-xs", children: [_jsx(AlertCircle, { className: "w-12 h-12 text-rose-500 mx-auto mb-3" }), _jsx("p", { className: "font-bold text-slate-900 mb-1", children: "Lesson Unavailable" }), _jsx("p", { className: "text-xs text-slate-500 mb-4", children: error }), _jsx("button", { onClick: () => navigate('/courses'), className: "bg-[#1B7FC9] hover:bg-[#1465A3] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-xs", children: "Go to Downloads" })] }));
    if (!lesson)
        return null;
    return (_jsxs("div", { className: "max-w-3xl mx-auto space-y-4 animate-fade-in pb-8", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: () => navigate(-1), className: "p-2 hover:bg-white rounded-xl border border-[#D7E5F0] transition-colors", children: _jsx(ArrowLeft, { size: 16, className: "text-slate-600" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-bold text-slate-900 truncate", children: lesson.title }), _jsxs("p", { className: "text-xs text-slate-500", children: [lesson.courseTitle, " \u00B7 Chapter ", lesson.order] })] }), _jsx("button", { className: "p-2 hover:bg-white rounded-xl border border-[#D7E5F0] transition-colors", title: "Download PDF", children: _jsx(Download, { size: 16, className: "text-slate-500" }) }), _jsx("button", { className: "p-2 hover:bg-white rounded-xl border border-[#D7E5F0] transition-colors", title: "Fullscreen", children: _jsx(Maximize2, { size: 16, className: "text-slate-500" }) })] }), _jsx("div", { className: "w-full h-52 md:h-64 rounded-2xl overflow-hidden bg-[#E1F0FA] border border-[#CBE4F6] flex items-center justify-center", children: lesson.mediaUrl ? (_jsx("img", { src: lesson.mediaUrl, alt: lesson.title, className: "w-full h-full object-cover" })) : (_jsx(BookOpen, { size: 48, className: "text-[#1B7FC9]" })) }), _jsxs("div", { className: "card", children: [_jsx("div", { className: "flex border-b border-slate-100 mb-5 -mx-5 px-5", children: ['content', 'notes'].map((t) => (_jsx("button", { onClick: () => setTab(t), className: cn('pb-3 px-4 text-sm font-semibold capitalize border-b-2 -mb-px transition-all', tab === t
                                ? 'border-brand-600 text-brand-700'
                                : 'border-transparent text-slate-500 hover:text-slate-700'), children: t === 'content' ? 'Lesson Content' : 'Notes' }, t))) }), tab === 'content' && (_jsxs("div", { children: [lesson.keyPoints.length > 0 && (_jsxs("div", { className: "mb-5 p-4 bg-brand-50 rounded-xl", children: [_jsx("p", { className: "text-xs font-bold text-brand-700 uppercase tracking-wide mb-2", children: "Key Points" }), _jsx("ul", { className: "space-y-1.5", children: lesson.keyPoints.map((kp, i) => (_jsxs("li", { className: "flex items-start gap-2 text-sm text-brand-800", children: [_jsx(CheckCircle, { size: 14, className: "text-brand-500 mt-0.5 flex-shrink-0" }), kp] }, i))) })] })), _jsx("div", { className: "prose prose-sm prose-slate max-w-none", dangerouslySetInnerHTML: { __html: lesson.contentHtml } })] })), tab === 'notes' && (_jsxs("div", { children: [_jsx("textarea", { className: "w-full h-48 input resize-none text-sm", placeholder: "Write your notes here\u2026 (stored locally)" }), _jsx("p", { className: "text-xs text-slate-400 mt-2", children: "Notes are stored on this device only." })] }))] }), _jsx("button", { onClick: handleMarkComplete, disabled: completed, className: cn('w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all', completed
                    ? 'bg-success/15 text-success-dark cursor-default'
                    : 'btn-primary'), children: completed ? (_jsxs(_Fragment, { children: [_jsx(CheckCircle, { size: 16 }), " Lesson Completed"] })) : ('✓ Mark as Complete') }), _jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsxs("button", { onClick: () => prevLesson && navigate(`/courses/${courseId}/lessons/${prevLesson.id}`), disabled: !prevLesson, className: "btn-outline gap-1.5 disabled:opacity-40", children: [_jsx(ChevronLeft, { size: 16 }), " Previous"] }), _jsxs("button", { onClick: () => nextLesson && navigate(`/courses/${courseId}/lessons/${nextLesson.id}`), disabled: !nextLesson, className: "btn-primary gap-1.5 disabled:opacity-40", children: ["Next ", _jsx(ChevronRight, { size: 16 })] })] })] }));
}
//# sourceMappingURL=LessonViewerPage.js.map