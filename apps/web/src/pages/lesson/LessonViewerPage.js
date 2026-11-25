import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Maximize2, ChevronLeft, ChevronRight, CheckCircle, BookOpen, AlertCircle, BookMarked } from 'lucide-react';
import { getLocalLesson, getLocalLessonsForCourse, getOfflineTranslation, getOfflineGlossary, getOfflineAudio } from '@/services/downloadEngine';
import { fetchCourse } from '@/lib/api';
import { db, markLessonComplete } from '@/db/database';
import { useAuthStore } from '@/store/authStore';
import { AudioPlayer } from '@/components/AudioPlayer';
import { GlossaryPopover } from '@/components/GlossaryPopover';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
const LANGUAGE_LABELS = { en: 'English', hi: 'हिन्दी', mr: 'मराठी' };
const API_BASE = '/api/v1';
export function LessonViewerPage() {
    const { lessonId, courseId } = useParams();
    const navigate = useNavigate();
    const { user, accessToken: token } = useAuthStore();
    const { language, setLanguage, t } = useI18n();
    const [lesson, setLesson] = useState(null);
    const [siblings, setSiblings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tab, setTab] = useState('content');
    const [completed, setCompleted] = useState(false);
    // Multilingual state
    const [activeLang, setActiveLang] = useState(language || 'en');
    useEffect(() => {
        if (language && language !== activeLang) {
            setActiveLang(language);
        }
    }, [language]);
    const [translation, setTranslation] = useState(null);
    const [transLoading, setTransLoading] = useState(false);
    const [transUnavail, setTransUnavail] = useState(false);
    const [glossary, setGlossary] = useState([]);
    const [activeGlossary, setActiveGlossary] = useState(null);
    const [audioSource, setAudioSource] = useState({});
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
                const localLesson = local;
                setLesson(localLesson);
                // Preload translation from embedded lesson data if available
                if (activeLang !== 'en' && localLesson.translations?.[activeLang]) {
                    const emb = localLesson.translations[activeLang];
                    setTranslation({
                        translatedTitle: emb.title,
                        translatedContent: emb.contentHtml,
                        approvalStatus: 'PUBLISHED',
                        revision: 1,
                    });
                    setTransUnavail(false);
                }
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
                // Load glossary offline-first, then refresh from API if online
                const offlineG = await getOfflineGlossary(lessonId);
                if (offlineG.length > 0)
                    setGlossary(offlineG);
                if (token) {
                    try {
                        const gRes = await fetch(`${API_BASE}/multilingual/glossary/${lessonId}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        if (gRes.ok) {
                            const gList = await gRes.json();
                            if (Array.isArray(gList) && gList.length > 0) {
                                setGlossary(gList);
                                await db.glossaryEntries.bulkPut(gList.map((g) => ({
                                    ...g,
                                    courseId: courseId,
                                    savedAt: Date.now(),
                                }))).catch(() => { });
                            }
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
    }, [lessonId, courseId, token]);
    // Load translation & offline audio when language or lesson changes
    useEffect(() => {
        if (!lessonId)
            return;
        if (activeLang === 'en') {
            setTranslation(null);
            setTransUnavail(false);
            setAudioSource({});
            return;
        }
        async function loadTranslation() {
            setTransLoading(true);
            setTransUnavail(false);
            // 0. Immediate embedded translation for zero-latency local native rendering
            const embedded = lesson?.translations?.[activeLang];
            if (embedded) {
                setTranslation({
                    translatedTitle: embedded.title,
                    translatedContent: embedded.contentHtml,
                    approvalStatus: 'PUBLISHED',
                    revision: 1,
                });
                setTransUnavail(false);
            }
            // 1. Check offline IndexedDB cache next
            const cached = await getOfflineTranslation(lessonId, activeLang);
            const cachedAudio = await getOfflineAudio(lessonId, activeLang);
            if (cachedAudio) {
                setAudioSource({ url: cachedAudio.fileRef, blob: cachedAudio.blob });
            }
            else {
                setAudioSource({});
            }
            if (cached) {
                setTranslation(cached);
                setTransUnavail(false);
            }
            // 2. If online & authenticated, check server for latest published translation
            if (navigator.onLine && token) {
                try {
                    const res = await fetch(`${API_BASE}/multilingual/published/${lessonId}/${activeLang}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const data = await res.json();
                    if (data.notAvailable || !data.translatedContent) {
                        if (!cached && !embedded) {
                            setTranslation(null);
                            setTransUnavail(true);
                        }
                    }
                    else {
                        setTranslation(data);
                        setTransUnavail(false);
                        // Cache locally for future offline switching
                        await db.lessonTranslations.put({
                            id: `${lessonId}::${activeLang}`,
                            serverId: data.id,
                            lessonId: lessonId,
                            courseId: courseId || '',
                            language: activeLang,
                            translatedTitle: data.translatedTitle,
                            translatedContent: data.translatedContent,
                            revision: data.revision || 1,
                            approvalStatus: data.approvalStatus,
                            savedAt: Date.now(),
                        }).catch(() => { });
                    }
                }
                catch {
                    if (!cached && !embedded) {
                        setTranslation(null);
                        setTransUnavail(true);
                    }
                }
            }
            else if (!cached && !embedded) {
                setTranslation(null);
                setTransUnavail(true);
            }
            setTransLoading(false);
        }
        loadTranslation();
    }, [activeLang, lessonId, courseId, token]);
    const handleLangChange = (lang) => {
        setActiveLang(lang);
        setLanguage(lang);
    };
    const handleMarkComplete = async () => {
        if (!lesson || !user)
            return;
        await markLessonComplete(user.id, lesson.id, lesson.courseId);
        setCompleted(true);
    };
    const currentTranslation = (activeLang !== 'en')
        ? (translation || (lesson?.translations?.[activeLang] ? {
            translatedTitle: lesson.translations[activeLang].title,
            translatedContent: lesson.translations[activeLang].contentHtml,
            approvalStatus: 'PUBLISHED',
        } : null))
        : null;
    const displayTitle = currentTranslation ? currentTranslation.translatedTitle : lesson?.title;
    const activeKeyPoints = (activeLang !== 'en' && lesson?.translations?.[activeLang]?.keyPoints)
        ? lesson.translations[activeLang].keyPoints
        : lesson?.keyPoints || [];
    const cleanAudioContent = (currentTranslation?.translatedContent || lesson?.contentHtml || '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    const audioText = `${displayTitle || ''}. ${cleanAudioContent}`;
    const currentIdx = siblings.findIndex((s) => s.id === lessonId);
    const prevLesson = currentIdx > 0 ? siblings[currentIdx - 1] : null;
    const nextLesson = currentIdx < siblings.length - 1 ? siblings[currentIdx + 1] : null;
    if (loading)
        return (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" }), _jsx("p", { className: "text-sm text-slate-500", children: "Loading lesson\u2026" })] }) }));
    if (error)
        return (_jsxs("div", { className: "bg-white rounded-2xl border border-[#D7E5F0] text-center py-12 max-w-md mx-auto shadow-xs", children: [_jsx(AlertCircle, { className: "w-12 h-12 text-rose-500 mx-auto mb-3" }), _jsx("p", { className: "font-bold text-slate-900 mb-1", children: "Lesson Unavailable" }), _jsx("p", { className: "text-xs text-slate-500 mb-4", children: error }), _jsx("button", { onClick: () => navigate('/courses'), className: "bg-[#1B7FC9] hover:bg-[#1465A3] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-xs", children: "Go to Downloads" })] }));
    if (!lesson)
        return null;
    return (_jsxs("div", { className: "max-w-3xl mx-auto space-y-4 animate-fade-in pb-8", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: () => navigate(-1), className: "p-2 hover:bg-white rounded-xl border border-[#D7E5F0] transition-colors", children: _jsx(ArrowLeft, { size: 16, className: "text-slate-600" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-bold text-slate-900 truncate", children: displayTitle }), _jsxs("p", { className: "text-xs text-slate-500", children: [lesson.courseTitle, " \u00B7 Chapter ", lesson.order] })] }), _jsx("button", { className: "p-2 hover:bg-white rounded-xl border border-[#D7E5F0] transition-colors", title: "Download PDF", children: _jsx(Download, { size: 16, className: "text-slate-500" }) }), _jsx("button", { className: "p-2 hover:bg-white rounded-xl border border-[#D7E5F0] transition-colors", title: "Fullscreen", children: _jsx(Maximize2, { size: 16, className: "text-slate-500" }) })] }), _jsxs("div", { className: "bg-white rounded-2xl border border-[#D7E5F0] p-3 flex flex-wrap items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-xs text-slate-500 font-medium mr-1", children: "Language:" }), _jsx("div", { className: "flex gap-1.5", children: ['en', 'hi', 'mr'].map(lang => (_jsx("button", { onClick: () => handleLangChange(lang), className: cn('px-3 py-1.5 text-xs font-semibold rounded-xl transition-all', activeLang === lang
                                        ? 'bg-[#1B7FC9] text-white shadow-sm'
                                        : 'bg-[#F0F5FA] text-slate-600 hover:bg-[#E1EEF8] hover:text-[#1B7FC9]'), children: LANGUAGE_LABELS[lang] }, lang))) })] }), transLoading && _jsx("span", { className: "text-xs text-slate-400", children: "Loading translation\u2026" })] }), _jsx(AudioPlayer, { text: audioText, language: activeLang, audioUrl: audioSource.url, audioBlob: audioSource.blob }), transUnavail && activeLang !== 'en' && (_jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-xs text-amber-700 flex items-center gap-2", children: [_jsx(AlertCircle, { size: 13 }), LANGUAGE_LABELS[activeLang], " translation not yet published or downloaded offline \u2014 showing English."] })), _jsx("div", { className: "w-full h-52 md:h-64 rounded-2xl overflow-hidden bg-[#E1F0FA] border border-[#CBE4F6] flex items-center justify-center", children: lesson.mediaUrl ? (_jsx("img", { src: lesson.mediaUrl, alt: lesson.title, className: "w-full h-full object-cover" })) : (_jsx(BookOpen, { size: 48, className: "text-[#1B7FC9]" })) }), _jsxs("div", { className: "card", children: [_jsx("div", { className: "flex border-b border-slate-100 mb-5 -mx-5 px-5", children: ['content', 'notes'].map((t) => (_jsx("button", { onClick: () => setTab(t), className: cn('pb-3 px-4 text-sm font-semibold capitalize border-b-2 -mb-px transition-all', tab === t
                                ? 'border-brand-600 text-brand-700'
                                : 'border-transparent text-slate-500 hover:text-slate-700'), children: t === 'content' ? 'Lesson Content' : 'Notes' }, t))) }), tab === 'content' && (_jsxs("div", { className: "space-y-5", children: [activeKeyPoints.length > 0 && (_jsxs("div", { className: "p-4 bg-[#E1F0FA]/60 border border-[#CBE4F6] rounded-xl", children: [_jsx("p", { className: "text-xs font-bold text-[#1465A3] uppercase tracking-wide mb-2", children: activeLang === 'hi' ? 'मुख्य बिंदु' : activeLang === 'mr' ? 'महत्त्वाचे मुद्दे' : 'Key Points' }), _jsx("ul", { className: "space-y-1.5", children: activeKeyPoints.map((kp, i) => (_jsxs("li", { className: "flex items-start gap-2 text-sm text-[#0C2B47]", children: [_jsx(CheckCircle, { size: 14, className: "text-[#1B7FC9] mt-0.5 flex-shrink-0" }), _jsx("span", { children: kp })] }, i))) })] })), activeLang === 'en' || !currentTranslation ? (_jsx("div", { className: "prose prose-sm prose-slate max-w-none", dangerouslySetInnerHTML: { __html: lesson.contentHtml } })) : (_jsx("div", { className: "prose prose-sm prose-slate max-w-none", dangerouslySetInnerHTML: { __html: currentTranslation.translatedContent } })), glossary.length > 0 && (_jsxs("div", { className: "pt-4 border-t border-slate-100", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2.5", children: [_jsx(BookMarked, { size: 14, className: "text-[#1B7FC9]" }), _jsx("span", { children: "Glossary Terms" })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: glossary.map((entry, idx) => (_jsx("button", { onClick: () => setActiveGlossary(entry), className: "px-3 py-1.5 rounded-xl bg-[#E1EEF8] hover:bg-[#1B7FC9] hover:text-white text-[#1465A3] text-xs font-semibold border border-[#C5DCF0] transition-colors", children: activeLang === 'hi' && entry.hiEquiv
                                                ? entry.hiEquiv
                                                : activeLang === 'mr' && entry.mrEquiv
                                                    ? entry.mrEquiv
                                                    : entry.term }, entry.id || idx))) })] }))] })), tab === 'notes' && (_jsxs("div", { children: [_jsx("textarea", { className: "w-full h-48 input resize-none text-sm", placeholder: "Write your notes here\u2026 (stored locally)" }), _jsx("p", { className: "text-xs text-slate-400 mt-2", children: "Notes are stored on this device only." })] }))] }), _jsx("button", { onClick: handleMarkComplete, disabled: completed, className: cn('w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all', completed
                    ? 'bg-success/15 text-success-dark cursor-default'
                    : 'btn-primary'), children: completed ? (_jsxs(_Fragment, { children: [_jsx(CheckCircle, { size: 16 }), " ", t('completed')] })) : (t('markCompleted')) }), _jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsxs("button", { onClick: () => prevLesson && navigate(`/courses/${courseId}/lessons/${prevLesson.id}`), disabled: !prevLesson, className: "btn-outline gap-1.5 disabled:opacity-40", children: [_jsx(ChevronLeft, { size: 16 }), " ", t('previous')] }), _jsxs("button", { onClick: () => nextLesson && navigate(`/courses/${courseId}/lessons/${nextLesson.id}`), disabled: !nextLesson, className: "btn-primary gap-1.5 disabled:opacity-40", children: [t('next'), " ", _jsx(ChevronRight, { size: 16 })] })] }), activeGlossary && (_jsx(GlossaryPopover, { entry: activeGlossary, onClose: () => setActiveGlossary(null) }))] }));
}
//# sourceMappingURL=LessonViewerPage.js.map