import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Globe, Upload, Tag, X, CheckCircle, AlertCircle, AlertTriangle, Send, RefreshCw, FileText, BookOpen, Languages, Edit3, Save, History, Volume2, Plus, } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { AudioPlayer } from '@/components/AudioPlayer';
const LANGUAGE_LABELS = { en: 'English', hi: 'हिन्दी', mr: 'मराठी' };
const API_BASE = '/api/v1';
export default function TranslationStudioPage() {
    const { lessonId: routeLessonId } = useParams();
    const { accessToken: token } = useAuthStore();
    const [availableLessons, setAvailableLessons] = useState([]);
    const [lessonId, setLessonId] = useState(routeLessonId || 'seed-lesson-biology-3');
    const [sourceTitle, setSourceTitle] = useState('');
    const [sourceContent, setSourceContent] = useState('');
    const [protectedTerms, setProtectedTerms] = useState([]);
    const [termInput, setTermInput] = useState('');
    const [targetLangs, setTargetLangs] = useState(['hi', 'mr']);
    const [generating, setGenerating] = useState(false);
    const [translations, setTranslations] = useState([]);
    const [glossary, setGlossary] = useState([]);
    const [history, setHistory] = useState([]);
    const [activeTab, setActiveTab] = useState('en');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);
    // Correction editor state
    const [editing, setEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    // Add glossary modal/inline form
    const [newTerm, setNewTerm] = useState('');
    const [newEnDef, setNewEnDef] = useState('');
    const [newHiDef, setNewHiDef] = useState('');
    const [newMrDef, setNewMrDef] = useState('');
    const fileInputRef = useRef(null);
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
    useEffect(() => {
        if (!token)
            return;
        fetch(`${API_BASE}/multilingual/lessons`, { headers })
            .then((r) => (r.ok ? r.json() : []))
            .then((list) => {
            if (Array.isArray(list) && list.length > 0) {
                setAvailableLessons(list);
                const initial = list.find((l) => l.id === lessonId) || list[0];
                if (initial && !sourceContent) {
                    setLessonId(initial.id);
                    setSourceTitle(initial.title);
                    setSourceContent(initial.contentHtml);
                }
            }
        })
            .catch(() => { });
    }, [token]);
    useEffect(() => {
        if (!token || !lessonId)
            return;
        loadTranslations();
        loadGlossary();
    }, [lessonId, token]);
    const loadTranslations = async () => {
        if (!lessonId || !token)
            return;
        try {
            const res = await fetch(`${API_BASE}/multilingual/translations/${lessonId}`, { headers });
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data))
                    setTranslations(data);
            }
        }
        catch { }
    };
    const loadGlossary = async () => {
        if (!lessonId || !token)
            return;
        try {
            const res = await fetch(`${API_BASE}/multilingual/glossary/${lessonId}`, { headers });
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data))
                    setGlossary(data);
            }
        }
        catch { }
    };
    const loadHistory = async (translationId) => {
        if (!token)
            return;
        try {
            const res = await fetch(`${API_BASE}/multilingual/history/${translationId}`, { headers });
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data))
                    setHistory(data);
            }
        }
        catch { }
    };
    const handleSelectLesson = (id) => {
        setLessonId(id);
        setEditing(false);
        const found = availableLessons.find((l) => l.id === id);
        if (found) {
            setSourceTitle(found.title);
            setSourceContent(found.contentHtml);
        }
    };
    const addProtectedTerm = () => {
        if (termInput.trim() && !protectedTerms.includes(termInput.trim())) {
            setProtectedTerms([...protectedTerms, termInput.trim()]);
            setTermInput('');
        }
    };
    const removeProtectedTerm = (term) => setProtectedTerms(protectedTerms.filter((t) => t !== term));
    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const text = await file.text();
        setSourceContent(text);
        if (!sourceTitle)
            setSourceTitle(file.name.replace(/\.(txt|md|html)$/, ''));
    };
    const handleGenerate = async () => {
        if (!sourceContent.trim()) {
            setError('Paste or upload content first');
            return;
        }
        if (!lessonId.trim()) {
            setError('Enter or select a Lesson ID');
            return;
        }
        setGenerating(true);
        setError(null);
        setSuccess(null);
        setEditing(false);
        try {
            const res = await fetch(`${API_BASE}/multilingual/generate`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ lessonId, sourceTitle, sourceContent, targetLanguages: targetLangs, protectedTerms }),
            });
            const data = await res.json();
            if (!res.ok)
                throw new Error(data.message || 'Generation failed');
            if (Array.isArray(data.translations))
                setTranslations(data.translations);
            if (Array.isArray(data.glossary))
                setGlossary(data.glossary);
            setSuccess('Translations generated. Review validation status before approving.');
            await loadTranslations();
        }
        catch (e) {
            setError(e.message);
        }
        finally {
            setGenerating(false);
        }
    };
    const startEditing = (t) => {
        setEditTitle(t.translatedTitle);
        setEditContent(t.translatedContent);
        setEditing(true);
    };
    const handleSaveEdit = async (id) => {
        setActionLoading(`save-${id}`);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/multilingual/translation/${id}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({
                    translatedTitle: editTitle,
                    translatedContent: editContent,
                    originalContent: sourceContent,
                }),
            });
            const data = await res.json();
            if (!res.ok)
                throw new Error(data.message || 'Save failed');
            setEditing(false);
            setSuccess(`Saved revision ${data.revision} and revalidated tokens.`);
            await loadTranslations();
            await loadHistory(id);
        }
        catch (e) {
            setError(e.message);
        }
        finally {
            setActionLoading(null);
        }
    };
    const handleRevalidate = async (id) => {
        setActionLoading(`val-${id}`);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/multilingual/translation/${id}/validate`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ originalContent: sourceContent }),
            });
            const data = await res.json();
            if (!res.ok)
                throw new Error(data.message || 'Revalidation failed');
            setSuccess(`Validation status: ${data.validationStatus}`);
            await loadTranslations();
        }
        catch (e) {
            setError(e.message);
        }
        finally {
            setActionLoading(null);
        }
    };
    const handleApprove = async (id) => {
        setActionLoading(`approve-${id}`);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/multilingual/translation/${id}/approve`, { method: 'POST', headers });
            const data = await res.json();
            if (!res.ok)
                throw new Error(data.message || 'Approval failed');
            setSuccess('Translation approved');
            await loadTranslations();
            await loadHistory(id);
        }
        catch (e) {
            setError(e.message);
        }
        finally {
            setActionLoading(null);
        }
    };
    const handlePublish = async (id) => {
        setActionLoading(`publish-${id}`);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/multilingual/translation/${id}/publish`, { method: 'POST', headers });
            const data = await res.json();
            if (!res.ok)
                throw new Error(data.message || 'Publish failed');
            setSuccess('Translation published — students can now view it');
            await loadTranslations();
            await loadHistory(id);
        }
        catch (e) {
            setError(e.message);
        }
        finally {
            setActionLoading(null);
        }
    };
    const handleGenerateAudio = async (id) => {
        setActionLoading(`audio-${id}`);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/multilingual/audio/generate/${id}`, { method: 'POST', headers });
            const data = await res.json();
            if (!res.ok)
                throw new Error(data.message || 'Audio generation failed');
            setSuccess(`Audio ready (${data.ttsLangCode}, ${data.mode === 'google_tts' ? 'MP3 generated' : 'browser speech synthesis'})`);
        }
        catch (e) {
            setError(e.message);
        }
        finally {
            setActionLoading(null);
        }
    };
    const handleApproveGlossary = async (entryId) => {
        try {
            const res = await fetch(`${API_BASE}/multilingual/glossary/${entryId}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ approvalStatus: 'APPROVED' }),
            });
            if (res.ok) {
                setSuccess('Glossary term approved');
                await loadGlossary();
            }
        }
        catch { }
    };
    const handleAddGlossaryTerm = async () => {
        if (!newTerm.trim() || !newEnDef.trim() || !lessonId)
            return;
        try {
            const res = await fetch(`${API_BASE}/multilingual/glossary/${lessonId}`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    translationId: currentTranslation?.id || '',
                    term: newTerm.trim(),
                    enDef: newEnDef.trim(),
                    hiDef: newHiDef.trim(),
                    mrDef: newMrDef.trim(),
                }),
            });
            if (res.ok) {
                setNewTerm('');
                setNewEnDef('');
                setNewHiDef('');
                setNewMrDef('');
                await loadGlossary();
            }
        }
        catch { }
    };
    const getTranslationForLang = (lang) => translations.find((t) => t.language === lang);
    const currentTranslation = getTranslationForLang(activeTab);
    useEffect(() => {
        setEditing(false);
        if (currentTranslation?.id) {
            loadHistory(currentTranslation.id);
        }
        else {
            setHistory([]);
        }
    }, [activeTab, currentTranslation?.id]);
    const statusIcon = (status) => {
        if (status === 'PASSED')
            return _jsx(CheckCircle, { size: 14, className: "text-emerald-500" });
        if (status === 'FAILED')
            return _jsx(AlertCircle, { size: 14, className: "text-rose-500" });
        if (status === 'WARNINGS')
            return _jsx(AlertTriangle, { size: 14, className: "text-amber-500" });
        return _jsx(RefreshCw, { size: 14, className: "text-slate-400" });
    };
    const approvalBadge = (status) => {
        const map = {
            DRAFT: 'bg-slate-100 text-slate-600',
            GENERATED: 'bg-blue-50 text-blue-700',
            VALIDATED: 'bg-sky-50 text-sky-700',
            REVIEW: 'bg-amber-50 text-amber-700',
            APPROVED: 'bg-emerald-50 text-emerald-700',
            PUBLISHED: 'bg-[#1B7FC9]/10 text-[#1B7FC9] font-semibold',
        };
        return _jsx("span", { className: `text-[10px] px-2 py-0.5 rounded-full ${map[status] || 'bg-slate-100 text-slate-600'}`, children: status });
    };
    return (_jsxs("div", { className: "max-w-6xl mx-auto space-y-5 pb-10", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { children: _jsx("h1", { className: "text-xl font-bold text-slate-900", children: "Translation Studio" }) }), _jsxs("div", { className: "flex items-center gap-1.5 text-xs text-slate-500 bg-white border border-[#D7E5F0] px-3 py-1.5 rounded-xl", children: [_jsx(Globe, { size: 13 }), _jsx("span", { children: "English \u00B7 \u0939\u093F\u0928\u094D\u0926\u0940 \u00B7 \u092E\u0930\u093E\u0920\u0940" })] })] }), error && (_jsxs("div", { className: "flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs px-4 py-3 rounded-xl", children: [_jsx(AlertCircle, { size: 14, className: "flex-shrink-0" }), _jsx("span", { children: error }), _jsx("button", { onClick: () => setError(null), className: "ml-auto", children: _jsx(X, { size: 12 }) })] })), success && (_jsxs("div", { className: "flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-4 py-3 rounded-xl", children: [_jsx(CheckCircle, { size: 14, className: "flex-shrink-0" }), _jsx("span", { children: success }), _jsx("button", { onClick: () => setSuccess(null), className: "ml-auto", children: _jsx(X, { size: 12 }) })] })), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-white rounded-2xl border border-[#D7E5F0] p-5 space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2 border-b border-slate-100 pb-3", children: [_jsx(FileText, { size: 15, className: "text-[#1B7FC9]" }), _jsx("h2", { className: "text-sm font-bold text-slate-900", children: "Source Content" })] }), _jsxs("div", { className: "space-y-3", children: [availableLessons.length > 0 && (_jsxs("div", { children: [_jsx("label", { className: "text-xs font-semibold text-slate-700 block mb-1", children: "Course Lesson" }), _jsx("select", { value: lessonId, onChange: (e) => handleSelectLesson(e.target.value), className: "w-full px-3 py-2 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9] text-slate-800 bg-white", children: availableLessons.map((l) => (_jsxs("option", { value: l.id, children: [l.subject, " \u2014 Ch ", l.order, ": ", l.title] }, l.id))) })] })), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-semibold text-slate-700 block mb-1", children: "Lesson ID" }), _jsx("input", { value: lessonId, onChange: (e) => setLessonId(e.target.value), placeholder: "seed-lesson-biology-3", className: "w-full px-3 py-2 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9] focus:ring-1 focus:ring-[#1B7FC9] text-slate-800" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-semibold text-slate-700 block mb-1", children: "Title" }), _jsx("input", { value: sourceTitle, onChange: (e) => setSourceTitle(e.target.value), placeholder: "e.g. Ohm's Law", className: "w-full px-3 py-2 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9] focus:ring-1 focus:ring-[#1B7FC9] text-slate-800" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("label", { className: "text-xs font-semibold text-slate-700", children: "Technical Passage" }), _jsxs("button", { onClick: () => fileInputRef.current?.click(), className: "flex items-center gap-1 text-[10px] text-[#1B7FC9] hover:underline font-semibold", children: [_jsx(Upload, { size: 11 }), " Upload TXT"] })] }), _jsx("input", { ref: fileInputRef, type: "file", accept: ".txt,.md,.html", className: "hidden", onChange: handleFileUpload }), _jsx("textarea", { value: sourceContent, onChange: (e) => setSourceContent(e.target.value), rows: 8, placeholder: "Paste or type the English technical content here. Formulas like V = I \u00D7 R, 220 V, 10 \u03A9 will be auto-protected.", className: "w-full px-3 py-2 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9] focus:ring-1 focus:ring-[#1B7FC9] text-slate-800 resize-none font-mono" })] })] })] }), _jsxs("div", { className: "bg-white rounded-2xl border border-[#D7E5F0] p-5", children: [_jsxs("div", { className: "flex items-center gap-2 border-b border-slate-100 pb-3 mb-4", children: [_jsx(Languages, { size: 15, className: "text-[#1B7FC9]" }), _jsx("h2", { className: "text-sm font-bold text-slate-900", children: "Target Languages" })] }), _jsx("div", { className: "flex gap-4", children: ['hi', 'mr'].map((lang) => (_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: targetLangs.includes(lang), onChange: (e) => setTargetLangs(e.target.checked ? [...targetLangs, lang] : targetLangs.filter((l) => l !== lang)), className: "rounded accent-[#1B7FC9]" }), _jsx("span", { className: "text-sm font-medium text-slate-800", children: LANGUAGE_LABELS[lang] })] }, lang))) })] }), _jsxs("div", { className: "bg-white rounded-2xl border border-[#D7E5F0] p-5", children: [_jsxs("div", { className: "flex items-center gap-2 border-b border-slate-100 pb-3 mb-4", children: [_jsx(Tag, { size: 15, className: "text-[#1B7FC9]" }), _jsx("h2", { className: "text-sm font-bold text-slate-900", children: "Protected Terms" })] }), _jsxs("div", { className: "flex gap-2 mb-3", children: [_jsx("input", { value: termInput, onChange: (e) => setTermInput(e.target.value), onKeyDown: (e) => e.key === 'Enter' && addProtectedTerm(), placeholder: "e.g. Machine Learning, API", className: "flex-1 px-3 py-2 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9] text-slate-800" }), _jsx("button", { onClick: addProtectedTerm, className: "px-3 py-2 bg-[#1B7FC9] text-white text-xs font-semibold rounded-xl hover:bg-[#1465A3] transition-colors", children: "Add" })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [protectedTerms.map((term) => (_jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#E1EEF8] text-[#1B7FC9] text-xs rounded-lg font-medium", children: [term, _jsx("button", { onClick: () => removeProtectedTerm(term), children: _jsx(X, { size: 11 }) })] }, term))), protectedTerms.length === 0 && _jsx("p", { className: "text-xs text-slate-400", children: "Auto-detection active \u2014 formulas, units, acronyms preserved automatically." })] })] }), _jsx("button", { onClick: handleGenerate, disabled: generating, className: "w-full py-3 bg-[#1B7FC9] hover:bg-[#1465A3] disabled:opacity-60 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm", children: generating ? _jsxs(_Fragment, { children: [_jsx(RefreshCw, { size: 15, className: "animate-spin" }), " Generating Translations..."] }) : _jsxs(_Fragment, { children: [_jsx(Globe, { size: 15 }), " Generate Translations"] }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-white rounded-2xl border border-[#D7E5F0] overflow-hidden", children: [_jsx("div", { className: "flex border-b border-slate-100", children: ['en', 'hi', 'mr'].map((lang) => {
                                            const t = getTranslationForLang(lang);
                                            return (_jsx("button", { onClick: () => setActiveTab(lang), className: `flex-1 py-3 px-4 text-xs font-semibold transition-all border-b-2 ${activeTab === lang
                                                    ? 'border-[#1B7FC9] text-[#1B7FC9] bg-[#F0F5FA]'
                                                    : 'border-transparent text-slate-500 hover:text-slate-800'}`, children: _jsxs("div", { className: "flex items-center justify-center gap-1.5", children: [t?.validationStatus && t.validationStatus !== 'PENDING' && statusIcon(t.validationStatus), LANGUAGE_LABELS[lang]] }) }, lang));
                                        }) }), _jsx("div", { className: "p-5", children: activeTab === 'en' ? (_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-bold text-slate-900 mb-3", children: sourceTitle || 'Source Title' }), _jsx("div", { className: "text-xs text-slate-700 leading-relaxed whitespace-pre-wrap min-h-32 bg-[#F8FAFC] rounded-xl p-3 border border-[#D7E5F0]", children: sourceContent || _jsx("span", { className: "text-slate-400", children: "Source content will appear here." }) })] })) : currentTranslation ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsx("h3", { className: "text-sm font-bold text-slate-900 truncate", children: currentTranslation.translatedTitle }), _jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [_jsxs("span", { className: "text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full", children: ["Rev ", currentTranslation.revision || 1] }), currentTranslation.approvalStatus && approvalBadge(currentTranslation.approvalStatus)] })] }), currentTranslation.validationReport && (_jsxs("div", { className: `p-3 rounded-xl border text-xs ${currentTranslation.validationStatus === 'PASSED' ? 'bg-emerald-50 border-emerald-200' :
                                                        currentTranslation.validationStatus === 'FAILED' ? 'bg-rose-50 border-rose-200' :
                                                            'bg-amber-50 border-amber-200'}`, children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsxs("div", { className: "flex items-center gap-1.5 font-semibold", children: [statusIcon(currentTranslation.validationStatus), "Validation ", currentTranslation.validationStatus] }), _jsxs("button", { onClick: () => handleRevalidate(currentTranslation.id), disabled: actionLoading === `val-${currentTranslation.id}`, className: "text-[11px] font-semibold text-[#1B7FC9] hover:underline flex items-center gap-1", children: [_jsx(RefreshCw, { size: 11 }), " Revalidate"] })] }), currentTranslation.validationReport.errors?.map((e, i) => (_jsxs("p", { className: "text-rose-700", children: ["\u2022 ", e] }, i))), currentTranslation.validationReport.warnings?.map((w, i) => (_jsxs("p", { className: "text-amber-700", children: ["\u2022 ", w] }, i))), currentTranslation.validationReport.passed && (_jsx("p", { className: "text-emerald-700", children: "All protected tokens preserved correctly." })), Array.isArray(currentTranslation.validationReport.preservedTokens) &&
                                                            currentTranslation.validationReport.preservedTokens.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-1.5 mt-2", children: currentTranslation.validationReport.preservedTokens.map((tok, idx) => (_jsx("span", { className: `px-2 py-0.5 rounded-md text-[10px] font-mono border ${tok.found
                                                                    ? 'bg-white text-[#1465A3] border-[#C5DCF0]'
                                                                    : 'bg-rose-100 text-rose-700 border-rose-300'}`, children: tok.original }, idx))) }))] })), editing ? (_jsxs("div", { className: "space-y-3", children: [_jsx("input", { value: editTitle, onChange: (e) => setEditTitle(e.target.value), className: "w-full px-3 py-2 text-xs font-semibold border border-[#1B7FC9] rounded-xl focus:outline-none text-slate-800" }), _jsx("textarea", { value: editContent, onChange: (e) => setEditContent(e.target.value), rows: 7, className: "w-full px-3 py-2 text-xs border border-[#1B7FC9] rounded-xl focus:outline-none text-slate-800 font-mono" }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("button", { onClick: () => handleSaveEdit(currentTranslation.id), disabled: actionLoading === `save-${currentTranslation.id}`, className: "flex-1 py-2 bg-[#1B7FC9] hover:bg-[#1465A3] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5", children: [_jsx(Save, { size: 13 }), " Save & Revalidate"] }), _jsx("button", { onClick: () => setEditing(false), className: "px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl", children: "Cancel" })] })] })) : (_jsx("div", { className: "text-xs text-slate-700 leading-relaxed whitespace-pre-wrap min-h-32 bg-[#F8FAFC] rounded-xl p-3 border border-[#D7E5F0]", children: currentTranslation.translatedContent })), _jsx(AudioPlayer, { text: `${currentTranslation.translatedTitle}. ${currentTranslation.translatedContent}`, language: activeTab }), _jsxs("div", { className: "flex flex-wrap gap-2 pt-1", children: [!editing && (_jsxs("button", { onClick: () => startEditing(currentTranslation), className: "px-3.5 py-2 bg-[#F0F5FA] hover:bg-[#E1EEF8] text-[#1465A3] border border-[#C5DCF0] text-xs font-semibold rounded-xl flex items-center gap-1.5", children: [_jsx(Edit3, { size: 13 }), " Edit"] })), _jsxs("button", { onClick: () => handleGenerateAudio(currentTranslation.id), disabled: actionLoading === `audio-${currentTranslation.id}`, className: "px-3.5 py-2 bg-[#F0F5FA] hover:bg-[#E1EEF8] text-[#1465A3] border border-[#C5DCF0] text-xs font-semibold rounded-xl flex items-center gap-1.5", children: [_jsx(Volume2, { size: 13 }), " Cache Audio"] }), currentTranslation.approvalStatus !== 'APPROVED' && currentTranslation.approvalStatus !== 'PUBLISHED' && (_jsxs("button", { onClick: () => handleApprove(currentTranslation.id), disabled: actionLoading === `approve-${currentTranslation.id}` || currentTranslation.validationStatus === 'FAILED', className: "flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors", children: [_jsx(CheckCircle, { size: 13 }), " Approve"] })), currentTranslation.approvalStatus === 'APPROVED' && (_jsxs("button", { onClick: () => handlePublish(currentTranslation.id), disabled: actionLoading === `publish-${currentTranslation.id}` || currentTranslation.validationStatus === 'FAILED', className: "flex-1 py-2 bg-[#1B7FC9] hover:bg-[#1465A3] disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors", children: [_jsx(Send, { size: 13 }), " Publish"] })), currentTranslation.approvalStatus === 'PUBLISHED' && (_jsxs("span", { className: "flex-1 py-2 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 border border-emerald-200", children: [_jsx(CheckCircle, { size: 13 }), " Published"] }))] })] })) : (_jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [_jsx(Globe, { size: 40, className: "text-slate-200 mb-3" }), _jsx("p", { className: "text-sm font-semibold text-slate-700", children: "No translation yet" })] })) })] }), _jsxs("div", { className: "bg-white rounded-2xl border border-[#D7E5F0] p-5 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-slate-100 pb-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(BookOpen, { size: 15, className: "text-[#1B7FC9]" }), _jsx("h2", { className: "text-sm font-bold text-slate-900", children: "Glossary" })] }), _jsxs("span", { className: "text-[11px] text-slate-400", children: [glossary.length, " terms"] })] }), glossary.length > 0 && (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-xs", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-100", children: [_jsx("th", { className: "text-left pb-2 text-slate-500 font-semibold pr-3", children: "Term" }), _jsx("th", { className: "text-left pb-2 text-slate-500 font-semibold pr-3", children: "English" }), _jsx("th", { className: "text-left pb-2 text-slate-500 font-semibold pr-3", children: "\u0939\u093F\u0928\u094D\u0926\u0940" }), _jsx("th", { className: "text-left pb-2 text-slate-500 font-semibold pr-3", children: "\u092E\u0930\u093E\u0920\u0940" }), _jsx("th", { className: "text-right pb-2 text-slate-500 font-semibold", children: "Status" })] }) }), _jsx("tbody", { children: glossary.map((entry) => (_jsxs("tr", { className: "border-b border-slate-50", children: [_jsx("td", { className: "py-2 pr-3 font-semibold text-slate-900", children: entry.term }), _jsx("td", { className: "py-2 pr-3 text-slate-700", children: entry.enDef }), _jsx("td", { className: "py-2 pr-3 text-slate-700", children: entry.hiDef || '—' }), _jsx("td", { className: "py-2 pr-3 text-slate-700", children: entry.mrDef || '—' }), _jsx("td", { className: "py-2 text-right", children: entry.approvalStatus === 'APPROVED' ? (_jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold", children: "Approved" })) : (_jsx("button", { onClick: () => handleApproveGlossary(entry.id), className: "text-[10px] px-2.5 py-1 rounded-lg bg-[#1B7FC9] text-white font-semibold hover:bg-[#1465A3]", children: "Approve" })) })] }, entry.id))) })] }) })), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100", children: [_jsx("input", { value: newTerm, onChange: (e) => setNewTerm(e.target.value), placeholder: "Term (e.g. Resistance)", className: "px-3 py-1.5 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9]" }), _jsx("input", { value: newEnDef, onChange: (e) => setNewEnDef(e.target.value), placeholder: "English definition", className: "px-3 py-1.5 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9]" }), _jsx("input", { value: newHiDef, onChange: (e) => setNewHiDef(e.target.value), placeholder: "\u0939\u093F\u0928\u094D\u0926\u0940 \u092A\u0930\u093F\u092D\u093E\u0937\u093E", className: "px-3 py-1.5 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9]" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { value: newMrDef, onChange: (e) => setNewMrDef(e.target.value), placeholder: "\u092E\u0930\u093E\u0920\u0940 \u0935\u094D\u092F\u093E\u0916\u094D\u092F\u093E", className: "flex-1 px-3 py-1.5 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9]" }), _jsxs("button", { onClick: handleAddGlossaryTerm, className: "px-3 py-1.5 bg-[#1B7FC9] hover:bg-[#1465A3] text-white text-xs font-semibold rounded-xl flex items-center gap-1", children: [_jsx(Plus, { size: 12 }), " Add"] })] })] })] }), history.length > 0 && (_jsxs("div", { className: "bg-white rounded-2xl border border-[#D7E5F0] p-5", children: [_jsxs("div", { className: "flex items-center gap-2 border-b border-slate-100 pb-3 mb-3", children: [_jsx(History, { size: 15, className: "text-[#1B7FC9]" }), _jsx("h2", { className: "text-sm font-bold text-slate-900", children: "Revision History" })] }), _jsx("div", { className: "space-y-2 text-xs", children: history.map((h) => (_jsxs("div", { className: "flex items-center justify-between bg-[#F8FAFC] px-3 py-2 rounded-xl border border-[#D7E5F0]", children: [_jsx("span", { className: "font-semibold text-slate-800 capitalize", children: h.action }), _jsx("span", { className: "text-slate-500", children: h.prevRevision ? `Rev ${h.prevRevision} → ${h.newRevision}` : `Rev ${h.newRevision}` }), _jsx("span", { className: "text-slate-400", children: new Date(h.createdAt).toLocaleString() })] }, h.id))) })] }))] })] })] }));
}
//# sourceMappingURL=TranslationStudioPage.js.map