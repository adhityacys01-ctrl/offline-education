import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db/database';
import { deleteCoursePack, downloadCourseTranslations } from '@/services/downloadEngine';
import { useDownloadManager } from '@/hooks/useDownload';
import { Check, MoreVertical, Trash2, FolderOpen, RefreshCw, Globe, Download } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
const DEFAULT_DOWNLOADS = [
    {
        id: 'dl-1',
        courseId: 'seed-course-computer-science',
        title: 'Environmental Science',
        chapter: 'Chapter 1 - Climate Change',
        downloadedDate: 'Nov 23, 2025',
        sizeMb: 12,
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=240&auto=format&fit=crop&q=80',
        status: 'AVAILABLE_OFFLINE',
    },
    {
        id: 'dl-2',
        courseId: 'seed-course-mathematics',
        title: 'Mathematics',
        chapter: 'Chapter 3 - Algebra',
        downloadedDate: 'Nov 22, 2025',
        sizeMb: 14,
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=240&auto=format&fit=crop&q=80',
        status: 'AVAILABLE_OFFLINE',
    },
    {
        id: 'dl-3',
        courseId: 'seed-course-biology',
        title: 'Biology Fundamentals',
        chapter: 'Chapter 3 - Photosynthesis',
        downloadedDate: 'Nov 20, 2025',
        sizeMb: 11,
        image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=240&auto=format&fit=crop&q=80',
        status: 'AVAILABLE_OFFLINE',
    },
];
export function DownloadsPage() {
    const navigate = useNavigate();
    const { t, translateCourseTitle } = useI18n();
    const { startDownload, removeDownload } = useDownloadManager();
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [downloadAllActive, setDownloadAllActive] = useState(false);
    const [selectedLangs, setSelectedLangs] = useState(['hi', 'mr']);
    const [langDownloadingCourse, setLangDownloadingCourse] = useState(null);
    const [langNotice, setLangNotice] = useState(null);
    const packs = useLiveQuery(() => db.coursePacks.toArray(), [], []);
    const cachedTranslations = useLiveQuery(() => db.lessonTranslations.toArray(), [], []);
    const items = DEFAULT_DOWNLOADS.map((def) => {
        const livePack = packs?.find((p) => p.courseId === def.courseId);
        if (livePack) {
            return {
                ...def,
                status: livePack.status === 'AVAILABLE_OFFLINE' ? 'AVAILABLE_OFFLINE' : livePack.status,
                progressPct: livePack.progressPct,
                sizeMb: livePack.totalSizeMb || def.sizeMb,
            };
        }
        return def;
    });
    if (packs) {
        packs.forEach((p) => {
            if (!items.some((i) => i.courseId === p.courseId)) {
                items.push({
                    id: p.id,
                    courseId: p.courseId,
                    title: p.courseTitle,
                    chapter: `${p.subject} Offline Pack`,
                    downloadedDate: p.downloadedAt ? new Date(p.downloadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently',
                    sizeMb: p.totalSizeMb,
                    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=240&auto=format&fit=crop&q=80',
                    status: p.status === 'AVAILABLE_OFFLINE' ? 'AVAILABLE_OFFLINE' : p.status,
                    progressPct: p.progressPct,
                });
            }
        });
    }
    const toggleLang = (lang) => {
        setSelectedLangs((prev) => (prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]));
    };
    const handleDownloadLanguages = async (courseId) => {
        if (selectedLangs.length === 0)
            return;
        setLangDownloadingCourse(courseId);
        setLangNotice(null);
        try {
            const res = await downloadCourseTranslations(courseId, selectedLangs);
            setLangNotice(`Cached ${res.translationCount} translated lessons and ${res.glossaryCount} glossary entries offline.`);
        }
        catch (e) {
            setLangNotice(e.message || 'Could not download language pack');
        }
        finally {
            setLangDownloadingCourse(null);
        }
    };
    const handleDownloadAll = async () => {
        setDownloadAllActive(true);
        const coursesToDownload = [
            { id: 'seed-course-computer-science', title: 'Environmental Science', subject: 'Environmental Science', description: 'Chapter 1 - Climate Change', offlinePackageSizeMb: 12, lessonCount: 10, quizCount: 3 },
            { id: 'seed-course-mathematics', title: 'Mathematics', subject: 'Mathematics', description: 'Chapter 3 - Algebra', offlinePackageSizeMb: 14, lessonCount: 10, quizCount: 3 },
            { id: 'seed-course-biology', title: 'Biology Fundamentals', subject: 'Biology', description: 'Chapter 3 - Photosynthesis', offlinePackageSizeMb: 11, lessonCount: 10, quizCount: 3 },
            { id: 'seed-course-history', title: 'History of India', subject: 'History', description: 'Chapter 2 - Ancient India', offlinePackageSizeMb: 15, lessonCount: 10, quizCount: 3 },
        ];
        for (const c of coursesToDownload) {
            startDownload(c);
            if (selectedLangs.length > 0) {
                downloadCourseTranslations(c.id, selectedLangs).catch(() => { });
            }
        }
        setTimeout(() => setDownloadAllActive(false), 2000);
    };
    const getCourseCachedLangs = (courseId) => {
        const list = (cachedTranslations || []).filter((t) => t.courseId === courseId);
        return {
            hi: list.some((t) => t.language === 'hi'),
            mr: list.some((t) => t.language === 'mr'),
        };
    };
    return (_jsxs("div", { className: "space-y-6 animate-fade-in pb-12", onClick: () => setActiveMenuId(null), children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [_jsx("div", { children: _jsx("h1", { className: "text-2xl font-bold text-slate-900 tracking-tight", children: t('downloadsTitle') }) }), _jsx("button", { onClick: (e) => {
                            e.stopPropagation();
                            handleDownloadAll();
                        }, disabled: downloadAllActive, className: "bg-[#1B7FC9] hover:bg-[#1465A3] active:scale-[0.98] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-xs transition-all self-start sm:self-auto flex items-center gap-1.5", children: downloadAllActive ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { size: 13, className: "animate-spin" }), "Downloading All..."] })) : ('Download All') })] }), _jsxs("div", { className: "bg-gradient-to-r from-[#F0F7FD] via-[#E1F0FA] to-[#CBE4F6] rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#CBE4F6] shadow-xs", children: [_jsxs("div", { className: "flex items-center gap-5 z-10", children: [_jsx("div", { className: "w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#1B7FC9] flex items-center justify-center text-white shadow-xs flex-shrink-0", children: _jsx(Check, { size: 32, strokeWidth: 3 }) }), _jsx("div", { children: _jsx("h2", { className: "text-base md:text-xl font-bold text-slate-900 tracking-tight", children: "Your content is ready for offline use!" }) })] }), _jsx("div", { className: "relative w-48 h-28 md:w-56 md:h-32 flex-shrink-0 flex items-center justify-center self-end md:self-center", children: _jsxs("svg", { viewBox: "0 0 200 120", className: "w-full h-full drop-shadow-xs", children: [_jsx("circle", { cx: "150", cy: "50", r: "35", fill: "#E1F0FA", opacity: "0.6" }), _jsx("circle", { cx: "60", cy: "60", r: "25", fill: "#CBE4F6", opacity: "0.5" }), _jsx("path", { d: "M 40 98 L 160 98 L 175 106 L 25 106 Z", fill: "#94A3B8" }), _jsx("rect", { x: "25", y: "105", width: "150", height: "4", rx: "2", fill: "#64748B" }), _jsx("rect", { x: "88", y: "98", width: "24", height: "3", rx: "1.5", fill: "#CBD5E1" }), _jsx("rect", { x: "50", y: "24", width: "100", height: "74", rx: "6", fill: "#1E293B" }), _jsx("rect", { x: "54", y: "28", width: "92", height: "66", rx: "3", fill: "#FFFFFF" }), _jsxs("g", { transform: "translate(76, 40)", children: [_jsx("path", { d: "M 12 28 Q 4 28 4 21 Q 4 15 11 14 Q 14 6 24 6 Q 32 6 36 12 Q 44 11 44 19 Q 44 28 35 28 Z", fill: "#E1F0FA", stroke: "#CBE4F6", strokeWidth: "1.5" }), _jsxs("g", { transform: "translate(18, 12)", children: [_jsx("path", { d: "M 6 3 L 6 12 M 3 9 L 6 12 L 9 9", stroke: "#1B7FC9", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }), _jsx("line", { x1: "2", y1: "14", x2: "10", y2: "14", stroke: "#1B7FC9", strokeWidth: "2", strokeLinecap: "round" })] })] })] }) })] }), _jsxs("div", { className: "bg-white rounded-2xl p-4 border border-[#D7E5F0] shadow-xs flex flex-wrap items-center justify-between gap-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Globe, { size: 16, className: "text-[#1B7FC9]" }), _jsx("span", { className: "text-xs font-bold text-slate-800", children: "Offline Languages" })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-4 text-xs", children: [_jsxs("label", { className: "flex items-center gap-1.5 text-slate-600 font-semibold", children: [_jsx("input", { type: "checkbox", checked: true, disabled: true, className: "accent-[#1B7FC9]" }), "English"] }), _jsxs("label", { className: "flex items-center gap-1.5 text-slate-700 font-semibold cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: selectedLangs.includes('hi'), onChange: () => toggleLang('hi'), className: "accent-[#1B7FC9]" }), "\u0939\u093F\u0928\u094D\u0926\u0940"] }), _jsxs("label", { className: "flex items-center gap-1.5 text-slate-700 font-semibold cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: selectedLangs.includes('mr'), onChange: () => toggleLang('mr'), className: "accent-[#1B7FC9]" }), "\u092E\u0930\u093E\u0920\u0940"] })] })] }), langNotice && (_jsx("div", { className: "bg-[#E1EEF8] border border-[#C5DCF0] text-[#1465A3] text-xs font-medium px-4 py-2.5 rounded-xl", children: langNotice })), _jsxs("div", { children: [_jsx("h2", { className: "text-base font-bold text-slate-900 tracking-tight mb-4", children: "Downloaded Content" }), _jsx("div", { className: "space-y-3.5", children: items.map((item) => {
                            const cachedLangs = getCourseCachedLangs(item.courseId);
                            return (_jsxs("div", { onClick: () => navigate(`/courses/${item.courseId}`), className: "bg-white rounded-2xl p-4 md:p-5 border border-[#D7E5F0] shadow-xs hover:border-[#1B7FC9] hover:shadow-card transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group relative", children: [_jsxs("div", { className: "flex items-center gap-4 min-w-0", children: [_jsx("div", { className: "w-20 h-16 md:w-24 md:h-18 rounded-xl overflow-hidden flex-shrink-0 bg-[#F0F5FA] border border-[#D7E5F0] relative shadow-xs", children: _jsx("img", { src: item.image, alt: item.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500", onError: (e) => {
                                                        const parent = e.target.parentElement;
                                                        if (parent) {
                                                            parent.className = 'w-20 h-16 md:w-24 md:h-18 rounded-xl flex items-center justify-center bg-[#E1F0FA] text-[#1B7FC9] mb-0';
                                                            parent.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>';
                                                        }
                                                    } }) }), _jsxs("div", { className: "min-w-0", children: [_jsx("h3", { className: "font-bold text-sm md:text-base text-slate-900 group-hover:text-[#1B7FC9] transition-colors truncate", children: translateCourseTitle(item.title) }), _jsx("p", { className: "text-xs text-slate-500 font-medium mt-0.5 truncate", children: item.chapter }), _jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-1.5", children: [_jsxs("span", { className: "text-xs text-slate-400 font-medium", children: [item.downloadedDate, " \u2022 ", item.sizeMb, " MB"] }), _jsx("span", { className: "px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200", children: "EN Offline" }), _jsxs("span", { className: `px-2 py-0.5 rounded-md text-[10px] font-semibold border ${cachedLangs.hi ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`, children: ["\u0939\u093F\u0928\u094D\u0926\u0940 ", cachedLangs.hi ? 'Offline' : 'Required'] }), _jsxs("span", { className: `px-2 py-0.5 rounded-md text-[10px] font-semibold border ${cachedLangs.mr ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`, children: ["\u092E\u0930\u093E\u0920\u0940 ", cachedLangs.mr ? 'Offline' : 'Required'] })] })] })] }), _jsxs("div", { className: "flex items-center gap-2.5 flex-shrink-0", onClick: (e) => e.stopPropagation(), children: [_jsxs("button", { onClick: () => handleDownloadLanguages(item.courseId), disabled: langDownloadingCourse === item.courseId || selectedLangs.length === 0, className: "px-3 py-1.5 rounded-xl bg-[#F0F5FA] hover:bg-[#E1EEF8] text-[#1B7FC9] border border-[#C5DCF0] text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50", title: "Download selected regional languages offline", children: [langDownloadingCourse === item.courseId ? (_jsx(RefreshCw, { size: 12, className: "animate-spin" })) : (_jsx(Download, { size: 12 })), "Sync Langs"] }), item.status === 'DOWNLOADING' ? (_jsxs("div", { className: "flex items-center gap-1.5 bg-[#E1F0FA] text-[#1465A3] px-3 py-1 rounded-full text-xs font-bold border border-[#CBE4F6]", children: [_jsx(RefreshCw, { size: 12, className: "animate-spin" }), _jsxs("span", { children: [item.progressPct || 0, "%"] })] })) : (_jsx("span", { className: "bg-[#E1F0FA] text-[#1465A3] border border-[#CBE4F6] px-3 py-1 rounded-full text-xs font-bold tracking-wide", children: "Ready" })), _jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setActiveMenuId(activeMenuId === item.id ? null : item.id), className: "p-1.5 text-slate-400 hover:text-slate-700 hover:bg-[#F0F5FA] rounded-xl transition-colors", title: "Options", children: _jsx(MoreVertical, { size: 18 }) }), activeMenuId === item.id && (_jsxs("div", { className: "absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-card border border-[#D7E5F0] py-1.5 z-30 animate-in fade-in zoom-in-95", children: [_jsxs("button", { onClick: () => {
                                                                    setActiveMenuId(null);
                                                                    navigate(`/courses/${item.courseId}`);
                                                                }, className: "w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-[#F0F5FA] flex items-center gap-2", children: [_jsx(FolderOpen, { size: 14, className: "text-[#1B7FC9]" }), " Open Course"] }), _jsxs("button", { onClick: () => {
                                                                    setActiveMenuId(null);
                                                                    deleteCoursePack(item.courseId);
                                                                    removeDownload(item.courseId);
                                                                }, className: "w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2", children: [_jsx(Trash2, { size: 14 }), " Remove Download"] })] }))] })] })] }, item.id));
                        }) })] })] }));
}
//# sourceMappingURL=DownloadsPage.js.map