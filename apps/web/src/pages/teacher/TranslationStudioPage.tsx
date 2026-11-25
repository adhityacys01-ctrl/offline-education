import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import {
  Globe, Upload, Tag, X, CheckCircle, AlertCircle, AlertTriangle,
  Send, RefreshCw, FileText, BookOpen, Languages, Edit3, Save, History, Volume2, Plus,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { AudioPlayer } from '@/components/AudioPlayer'

type SupportedLanguage = 'en' | 'hi' | 'mr'
const LANGUAGE_LABELS: Record<SupportedLanguage, string> = { en: 'English', hi: 'हिन्दी', mr: 'मराठी' }

interface AvailableLesson {
  id: string
  courseId: string
  courseTitle: string
  subject: string
  title: string
  order: number
  contentHtml: string
}

interface Translation {
  id: string
  lessonId: string
  language: SupportedLanguage
  translatedTitle: string
  translatedContent: string
  revision: number
  validationStatus: 'PASSED' | 'FAILED' | 'WARNINGS' | 'PENDING'
  validationReport?: any
  approvalStatus: string
  publishedAt?: string | null
}

interface GlossaryEntry {
  id: string
  term: string
  enDef: string
  hiDef?: string
  mrDef?: string
  enEquiv?: string
  hiEquiv?: string
  mrEquiv?: string
  approvalStatus: string
}

interface AuditEntry {
  id: string
  action: string
  actorId: string
  prevRevision?: number | null
  newRevision: number
  createdAt: string
}

const API_BASE = '/api/v1'

export default function TranslationStudioPage() {
  const { lessonId: routeLessonId } = useParams<{ lessonId?: string }>()
  const { accessToken: token } = useAuthStore()

  const [availableLessons, setAvailableLessons] = useState<AvailableLesson[]>([])
  const [lessonId, setLessonId]                 = useState(routeLessonId || 'seed-lesson-biology-3')
  const [sourceTitle, setSourceTitle]           = useState('')
  const [sourceContent, setSourceContent]       = useState('')
  const [protectedTerms, setProtectedTerms]     = useState<string[]>([])
  const [termInput, setTermInput]               = useState('')
  const [targetLangs, setTargetLangs]           = useState<SupportedLanguage[]>(['hi', 'mr'])
  const [generating, setGenerating]             = useState(false)
  const [translations, setTranslations]         = useState<Translation[]>([])
  const [glossary, setGlossary]                 = useState<GlossaryEntry[]>([])
  const [history, setHistory]                   = useState<AuditEntry[]>([])
  const [activeTab, setActiveTab]               = useState<SupportedLanguage>('en')
  const [error, setError]                       = useState<string | null>(null)
  const [success, setSuccess]                   = useState<string | null>(null)
  const [actionLoading, setActionLoading]       = useState<string | null>(null)

  // Correction editor state
  const [editing, setEditing]           = useState(false)
  const [editTitle, setEditTitle]       = useState('')
  const [editContent, setEditContent]   = useState('')

  // Add glossary modal/inline form
  const [newTerm, setNewTerm]   = useState('')
  const [newEnDef, setNewEnDef] = useState('')
  const [newHiDef, setNewHiDef] = useState('')
  const [newMrDef, setNewMrDef] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

  useEffect(() => {
    if (!token) return
    fetch(`${API_BASE}/multilingual/lessons`, { headers })
      .then((r) => (r.ok ? r.json() : []))
      .then((list: AvailableLesson[]) => {
        if (Array.isArray(list) && list.length > 0) {
          setAvailableLessons(list)
          const initial = list.find((l) => l.id === lessonId) || list[0]
          if (initial && !sourceContent) {
            setLessonId(initial.id)
            setSourceTitle(initial.title)
            setSourceContent(initial.contentHtml)
          }
        }
      })
      .catch(() => {})
  }, [token])

  useEffect(() => {
    if (!token || !lessonId) return
    loadTranslations()
    loadGlossary()
  }, [lessonId, token])

  const loadTranslations = async () => {
    if (!lessonId || !token) return
    try {
      const res = await fetch(`${API_BASE}/multilingual/translations/${lessonId}`, { headers })
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) setTranslations(data)
      }
    } catch {}
  }

  const loadGlossary = async () => {
    if (!lessonId || !token) return
    try {
      const res = await fetch(`${API_BASE}/multilingual/glossary/${lessonId}`, { headers })
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) setGlossary(data)
      }
    } catch {}
  }

  const loadHistory = async (translationId: string) => {
    if (!token) return
    try {
      const res = await fetch(`${API_BASE}/multilingual/history/${translationId}`, { headers })
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) setHistory(data)
      }
    } catch {}
  }

  const handleSelectLesson = (id: string) => {
    setLessonId(id)
    setEditing(false)
    const found = availableLessons.find((l) => l.id === id)
    if (found) {
      setSourceTitle(found.title)
      setSourceContent(found.contentHtml)
    }
  }

  const addProtectedTerm = () => {
    if (termInput.trim() && !protectedTerms.includes(termInput.trim())) {
      setProtectedTerms([...protectedTerms, termInput.trim()])
      setTermInput('')
    }
  }

  const removeProtectedTerm = (term: string) => setProtectedTerms(protectedTerms.filter((t) => t !== term))

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    setSourceContent(text)
    if (!sourceTitle) setSourceTitle(file.name.replace(/\.(txt|md|html)$/, ''))
  }

  const handleGenerate = async () => {
    if (!sourceContent.trim()) { setError('Paste or upload content first'); return }
    if (!lessonId.trim()) { setError('Enter or select a Lesson ID'); return }
    setGenerating(true)
    setError(null)
    setSuccess(null)
    setEditing(false)
    try {
      const res = await fetch(`${API_BASE}/multilingual/generate`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ lessonId, sourceTitle, sourceContent, targetLanguages: targetLangs, protectedTerms }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Generation failed')
      if (Array.isArray(data.translations)) setTranslations(data.translations)
      if (Array.isArray(data.glossary)) setGlossary(data.glossary)
      setSuccess('Translations generated. Review validation status before approving.')
      await loadTranslations()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setGenerating(false)
    }
  }

  const startEditing = (t: Translation) => {
    setEditTitle(t.translatedTitle)
    setEditContent(t.translatedContent)
    setEditing(true)
  }

  const handleSaveEdit = async (id: string) => {
    setActionLoading(`save-${id}`)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/multilingual/translation/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          translatedTitle: editTitle,
          translatedContent: editContent,
          originalContent: sourceContent,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Save failed')
      setEditing(false)
      setSuccess(`Saved revision ${data.revision} and revalidated tokens.`)
      await loadTranslations()
      await loadHistory(id)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleRevalidate = async (id: string) => {
    setActionLoading(`val-${id}`)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/multilingual/translation/${id}/validate`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ originalContent: sourceContent }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Revalidation failed')
      setSuccess(`Validation status: ${data.validationStatus}`)
      await loadTranslations()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleApprove = async (id: string) => {
    setActionLoading(`approve-${id}`)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/multilingual/translation/${id}/approve`, { method: 'POST', headers })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Approval failed')
      setSuccess('Translation approved')
      await loadTranslations()
      await loadHistory(id)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handlePublish = async (id: string) => {
    setActionLoading(`publish-${id}`)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/multilingual/translation/${id}/publish`, { method: 'POST', headers })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Publish failed')
      setSuccess('Translation published — students can now view it')
      await loadTranslations()
      await loadHistory(id)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleGenerateAudio = async (id: string) => {
    setActionLoading(`audio-${id}`)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/multilingual/audio/generate/${id}`, { method: 'POST', headers })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Audio generation failed')
      setSuccess(`Audio ready (${data.ttsLangCode}, ${data.mode === 'google_tts' ? 'MP3 generated' : 'browser speech synthesis'})`)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleApproveGlossary = async (entryId: string) => {
    try {
      const res = await fetch(`${API_BASE}/multilingual/glossary/${entryId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ approvalStatus: 'APPROVED' }),
      })
      if (res.ok) {
        setSuccess('Glossary term approved')
        await loadGlossary()
      }
    } catch {}
  }

  const handleAddGlossaryTerm = async () => {
    if (!newTerm.trim() || !newEnDef.trim() || !lessonId) return
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
      })
      if (res.ok) {
        setNewTerm('')
        setNewEnDef('')
        setNewHiDef('')
        setNewMrDef('')
        await loadGlossary()
      }
    } catch {}
  }

  const getTranslationForLang = (lang: SupportedLanguage) => translations.find((t) => t.language === lang)
  const currentTranslation = getTranslationForLang(activeTab)

  useEffect(() => {
    setEditing(false)
    if (currentTranslation?.id) {
      loadHistory(currentTranslation.id)
    } else {
      setHistory([])
    }
  }, [activeTab, currentTranslation?.id])

  const statusIcon = (status: string) => {
    if (status === 'PASSED') return <CheckCircle size={14} className="text-emerald-500" />
    if (status === 'FAILED') return <AlertCircle size={14} className="text-rose-500" />
    if (status === 'WARNINGS') return <AlertTriangle size={14} className="text-amber-500" />
    return <RefreshCw size={14} className="text-slate-400" />
  }

  const approvalBadge = (status: string) => {
    const map: Record<string, string> = {
      DRAFT: 'bg-slate-100 text-slate-600',
      GENERATED: 'bg-blue-50 text-blue-700',
      VALIDATED: 'bg-sky-50 text-sky-700',
      REVIEW: 'bg-amber-50 text-amber-700',
      APPROVED: 'bg-emerald-50 text-emerald-700',
      PUBLISHED: 'bg-[#1B7FC9]/10 text-[#1B7FC9] font-semibold',
    }
    return <span className={`text-[10px] px-2 py-0.5 rounded-full ${map[status] || 'bg-slate-100 text-slate-600'}`}>{status}</span>
  }

  return (
    <div className="max-w-6xl mx-auto space-y-5 pb-10">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Translation Studio</h1>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-white border border-[#D7E5F0] px-3 py-1.5 rounded-xl">
          <Globe size={13} />
          <span>English · हिन्दी · मराठी</span>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs px-4 py-3 rounded-xl">
          <AlertCircle size={14} className="flex-shrink-0" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto"><X size={12} /></button>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-4 py-3 rounded-xl">
          <CheckCircle size={14} className="flex-shrink-0" />
          <span>{success}</span>
          <button onClick={() => setSuccess(null)} className="ml-auto"><X size={12} /></button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Import Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#D7E5F0] p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileText size={15} className="text-[#1B7FC9]" />
              <h2 className="text-sm font-bold text-slate-900">Source Content</h2>
            </div>

            <div className="space-y-3">
              {availableLessons.length > 0 && (
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Course Lesson</label>
                  <select
                    value={lessonId}
                    onChange={(e) => handleSelectLesson(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9] text-slate-800 bg-white"
                  >
                    {availableLessons.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.subject} — Ch {l.order}: {l.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Lesson ID</label>
                <input
                  value={lessonId}
                  onChange={(e) => setLessonId(e.target.value)}
                  placeholder="seed-lesson-biology-3"
                  className="w-full px-3 py-2 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9] focus:ring-1 focus:ring-[#1B7FC9] text-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Title</label>
                <input
                  value={sourceTitle}
                  onChange={(e) => setSourceTitle(e.target.value)}
                  placeholder="e.g. Ohm's Law"
                  className="w-full px-3 py-2 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9] focus:ring-1 focus:ring-[#1B7FC9] text-slate-800"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">Technical Passage</label>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 text-[10px] text-[#1B7FC9] hover:underline font-semibold"
                  >
                    <Upload size={11} /> Upload TXT
                  </button>
                </div>
                <input ref={fileInputRef} type="file" accept=".txt,.md,.html" className="hidden" onChange={handleFileUpload} />
                <textarea
                  value={sourceContent}
                  onChange={(e) => setSourceContent(e.target.value)}
                  rows={8}
                  placeholder="Paste or type the English technical content here. Formulas like V = I × R, 220 V, 10 Ω will be auto-protected."
                  className="w-full px-3 py-2 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9] focus:ring-1 focus:ring-[#1B7FC9] text-slate-800 resize-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Target Languages */}
          <div className="bg-white rounded-2xl border border-[#D7E5F0] p-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
              <Languages size={15} className="text-[#1B7FC9]" />
              <h2 className="text-sm font-bold text-slate-900">Target Languages</h2>
            </div>
            <div className="flex gap-4">
              {(['hi', 'mr'] as SupportedLanguage[]).map((lang) => (
                <label key={lang} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={targetLangs.includes(lang)}
                    onChange={(e) => setTargetLangs(e.target.checked ? [...targetLangs, lang] : targetLangs.filter((l) => l !== lang))}
                    className="rounded accent-[#1B7FC9]"
                  />
                  <span className="text-sm font-medium text-slate-800">{LANGUAGE_LABELS[lang]}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Protected Terms */}
          <div className="bg-white rounded-2xl border border-[#D7E5F0] p-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
              <Tag size={15} className="text-[#1B7FC9]" />
              <h2 className="text-sm font-bold text-slate-900">Protected Terms</h2>
            </div>
            <div className="flex gap-2 mb-3">
              <input
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addProtectedTerm()}
                placeholder="e.g. Machine Learning, API"
                className="flex-1 px-3 py-2 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9] text-slate-800"
              />
              <button onClick={addProtectedTerm} className="px-3 py-2 bg-[#1B7FC9] text-white text-xs font-semibold rounded-xl hover:bg-[#1465A3] transition-colors">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {protectedTerms.map((term) => (
                <span key={term} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#E1EEF8] text-[#1B7FC9] text-xs rounded-lg font-medium">
                  {term}
                  <button onClick={() => removeProtectedTerm(term)}><X size={11} /></button>
                </span>
              ))}
              {protectedTerms.length === 0 && <p className="text-xs text-slate-400">Auto-detection active — formulas, units, acronyms preserved automatically.</p>}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full py-3 bg-[#1B7FC9] hover:bg-[#1465A3] disabled:opacity-60 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            {generating ? <><RefreshCw size={15} className="animate-spin" /> Generating Translations...</> : <><Globe size={15} /> Generate Translations</>}
          </button>
        </div>

        {/* Right: Side-by-side Translation View */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#D7E5F0] overflow-hidden">
            <div className="flex border-b border-slate-100">
              {(['en', 'hi', 'mr'] as SupportedLanguage[]).map((lang) => {
                const t = getTranslationForLang(lang)
                return (
                  <button
                    key={lang}
                    onClick={() => setActiveTab(lang)}
                    className={`flex-1 py-3 px-4 text-xs font-semibold transition-all border-b-2 ${
                      activeTab === lang
                        ? 'border-[#1B7FC9] text-[#1B7FC9] bg-[#F0F5FA]'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      {t?.validationStatus && t.validationStatus !== 'PENDING' && statusIcon(t.validationStatus)}
                      {LANGUAGE_LABELS[lang]}
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="p-5">
              {activeTab === 'en' ? (
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-3">{sourceTitle || 'Source Title'}</h3>
                  <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap min-h-32 bg-[#F8FAFC] rounded-xl p-3 border border-[#D7E5F0]">
                    {sourceContent || <span className="text-slate-400">Source content will appear here.</span>}
                  </div>
                </div>
              ) : currentTranslation ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{currentTranslation.translatedTitle}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        Rev {currentTranslation.revision || 1}
                      </span>
                      {currentTranslation.approvalStatus && approvalBadge(currentTranslation.approvalStatus)}
                    </div>
                  </div>

                  {/* Validation Report */}
                  {currentTranslation.validationReport && (
                    <div className={`p-3 rounded-xl border text-xs ${
                      currentTranslation.validationStatus === 'PASSED' ? 'bg-emerald-50 border-emerald-200' :
                      currentTranslation.validationStatus === 'FAILED' ? 'bg-rose-50 border-rose-200' :
                      'bg-amber-50 border-amber-200'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5 font-semibold">
                          {statusIcon(currentTranslation.validationStatus)}
                          Validation {currentTranslation.validationStatus}
                        </div>
                        <button
                          onClick={() => handleRevalidate(currentTranslation.id)}
                          disabled={actionLoading === `val-${currentTranslation.id}`}
                          className="text-[11px] font-semibold text-[#1B7FC9] hover:underline flex items-center gap-1"
                        >
                          <RefreshCw size={11} /> Revalidate
                        </button>
                      </div>
                      {currentTranslation.validationReport.errors?.map((e: string, i: number) => (
                        <p key={i} className="text-rose-700">• {e}</p>
                      ))}
                      {currentTranslation.validationReport.warnings?.map((w: string, i: number) => (
                        <p key={i} className="text-amber-700">• {w}</p>
                      ))}
                      {currentTranslation.validationReport.passed && (
                        <p className="text-emerald-700">All protected tokens preserved correctly.</p>
                      )}
                      {Array.isArray(currentTranslation.validationReport.preservedTokens) &&
                        currentTranslation.validationReport.preservedTokens.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {currentTranslation.validationReport.preservedTokens.map((tok: any, idx: number) => (
                              <span
                                key={idx}
                                className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${
                                  tok.found
                                    ? 'bg-white text-[#1465A3] border-[#C5DCF0]'
                                    : 'bg-rose-100 text-rose-700 border-rose-300'
                                }`}
                              >
                                {tok.original}
                              </span>
                            ))}
                          </div>
                        )}
                    </div>
                  )}

                  {/* Content or Inline Editor */}
                  {editing ? (
                    <div className="space-y-3">
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-semibold border border-[#1B7FC9] rounded-xl focus:outline-none text-slate-800"
                      />
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={7}
                        className="w-full px-3 py-2 text-xs border border-[#1B7FC9] rounded-xl focus:outline-none text-slate-800 font-mono"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(currentTranslation.id)}
                          disabled={actionLoading === `save-${currentTranslation.id}`}
                          className="flex-1 py-2 bg-[#1B7FC9] hover:bg-[#1465A3] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5"
                        >
                          <Save size={13} /> Save & Revalidate
                        </button>
                        <button
                          onClick={() => setEditing(false)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap min-h-32 bg-[#F8FAFC] rounded-xl p-3 border border-[#D7E5F0]">
                      {currentTranslation.translatedContent}
                    </div>
                  )}

                  {/* Audio Preview */}
                  <AudioPlayer
                    text={`${currentTranslation.translatedTitle}. ${currentTranslation.translatedContent}`}
                    language={activeTab}
                  />

                  {/* Workflow Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {!editing && (
                      <button
                        onClick={() => startEditing(currentTranslation)}
                        className="px-3.5 py-2 bg-[#F0F5FA] hover:bg-[#E1EEF8] text-[#1465A3] border border-[#C5DCF0] text-xs font-semibold rounded-xl flex items-center gap-1.5"
                      >
                        <Edit3 size={13} /> Edit
                      </button>
                    )}

                    <button
                      onClick={() => handleGenerateAudio(currentTranslation.id)}
                      disabled={actionLoading === `audio-${currentTranslation.id}`}
                      className="px-3.5 py-2 bg-[#F0F5FA] hover:bg-[#E1EEF8] text-[#1465A3] border border-[#C5DCF0] text-xs font-semibold rounded-xl flex items-center gap-1.5"
                    >
                      <Volume2 size={13} /> Cache Audio
                    </button>

                    {currentTranslation.approvalStatus !== 'APPROVED' && currentTranslation.approvalStatus !== 'PUBLISHED' && (
                      <button
                        onClick={() => handleApprove(currentTranslation.id)}
                        disabled={actionLoading === `approve-${currentTranslation.id}` || currentTranslation.validationStatus === 'FAILED'}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <CheckCircle size={13} /> Approve
                      </button>
                    )}

                    {currentTranslation.approvalStatus === 'APPROVED' && (
                      <button
                        onClick={() => handlePublish(currentTranslation.id)}
                        disabled={actionLoading === `publish-${currentTranslation.id}` || currentTranslation.validationStatus === 'FAILED'}
                        className="flex-1 py-2 bg-[#1B7FC9] hover:bg-[#1465A3] disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Send size={13} /> Publish
                      </button>
                    )}

                    {currentTranslation.approvalStatus === 'PUBLISHED' && (
                      <span className="flex-1 py-2 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 border border-emerald-200">
                        <CheckCircle size={13} /> Published
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Globe size={40} className="text-slate-200 mb-3" />
                  <p className="text-sm font-semibold text-slate-700">No translation yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Glossary Management Table */}
          <div className="bg-white rounded-2xl border border-[#D7E5F0] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen size={15} className="text-[#1B7FC9]" />
                <h2 className="text-sm font-bold text-slate-900">Glossary</h2>
              </div>
              <span className="text-[11px] text-slate-400">{glossary.length} terms</span>
            </div>

            {glossary.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left pb-2 text-slate-500 font-semibold pr-3">Term</th>
                      <th className="text-left pb-2 text-slate-500 font-semibold pr-3">English</th>
                      <th className="text-left pb-2 text-slate-500 font-semibold pr-3">हिन्दी</th>
                      <th className="text-left pb-2 text-slate-500 font-semibold pr-3">मराठी</th>
                      <th className="text-right pb-2 text-slate-500 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {glossary.map((entry) => (
                      <tr key={entry.id} className="border-b border-slate-50">
                        <td className="py-2 pr-3 font-semibold text-slate-900">{entry.term}</td>
                        <td className="py-2 pr-3 text-slate-700">{entry.enDef}</td>
                        <td className="py-2 pr-3 text-slate-700">{entry.hiDef || '—'}</td>
                        <td className="py-2 pr-3 text-slate-700">{entry.mrDef || '—'}</td>
                        <td className="py-2 text-right">
                          {entry.approvalStatus === 'APPROVED' ? (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                              Approved
                            </span>
                          ) : (
                            <button
                              onClick={() => handleApproveGlossary(entry.id)}
                              className="text-[10px] px-2.5 py-1 rounded-lg bg-[#1B7FC9] text-white font-semibold hover:bg-[#1465A3]"
                            >
                              Approve
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Add Glossary Term */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <input
                value={newTerm}
                onChange={(e) => setNewTerm(e.target.value)}
                placeholder="Term (e.g. Resistance)"
                className="px-3 py-1.5 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9]"
              />
              <input
                value={newEnDef}
                onChange={(e) => setNewEnDef(e.target.value)}
                placeholder="English definition"
                className="px-3 py-1.5 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9]"
              />
              <input
                value={newHiDef}
                onChange={(e) => setNewHiDef(e.target.value)}
                placeholder="हिन्दी परिभाषा"
                className="px-3 py-1.5 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9]"
              />
              <div className="flex gap-2">
                <input
                  value={newMrDef}
                  onChange={(e) => setNewMrDef(e.target.value)}
                  placeholder="मराठी व्याख्या"
                  className="flex-1 px-3 py-1.5 text-xs border border-[#D7E5F0] rounded-xl focus:outline-none focus:border-[#1B7FC9]"
                />
                <button
                  onClick={handleAddGlossaryTerm}
                  className="px-3 py-1.5 bg-[#1B7FC9] hover:bg-[#1465A3] text-white text-xs font-semibold rounded-xl flex items-center gap-1"
                >
                  <Plus size={12} /> Add
                </button>
              </div>
            </div>
          </div>

          {/* Revision History */}
          {history.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#D7E5F0] p-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-3">
                <History size={15} className="text-[#1B7FC9]" />
                <h2 className="text-sm font-bold text-slate-900">Revision History</h2>
              </div>
              <div className="space-y-2 text-xs">
                {history.map((h) => (
                  <div key={h.id} className="flex items-center justify-between bg-[#F8FAFC] px-3 py-2 rounded-xl border border-[#D7E5F0]">
                    <span className="font-semibold text-slate-800 capitalize">{h.action}</span>
                    <span className="text-slate-500">
                      {h.prevRevision ? `Rev ${h.prevRevision} → ${h.newRevision}` : `Rev ${h.newRevision}`}
                    </span>
                    <span className="text-slate-400">{new Date(h.createdAt).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
