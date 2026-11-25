import { X, BookOpen } from 'lucide-react'

export interface GlossaryItem {
  id?: string
  term: string
  enDef: string
  hiDef?: string | null
  mrDef?: string | null
  enEquiv?: string | null
  hiEquiv?: string | null
  mrEquiv?: string | null
}

interface GlossaryPopoverProps {
  entry: GlossaryItem
  onClose: () => void
}

export function GlossaryPopover({ entry, onClose }: GlossaryPopoverProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-[1px] p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl border border-[#C5DCF0] shadow-lg max-w-md w-full p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#E1EEF8] text-[#1B7FC9] flex items-center justify-center">
              <BookOpen size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{entry.term}</h3>
              <p className="text-[11px] text-slate-500">Multilingual Glossary</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Close"
          >
            <X size={15} />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="bg-[#F0F5FA] rounded-xl p-3 border border-[#D7E5F0]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[#1B7FC9]">English</span>
              {entry.enEquiv && <span className="text-slate-600 font-medium">{entry.enEquiv}</span>}
            </div>
            <p className="text-slate-700 leading-relaxed">{entry.enDef}</p>
          </div>

          <div className="bg-[#F8FAFC] rounded-xl p-3 border border-[#D7E5F0]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[#1B7FC9]">हिन्दी</span>
              {entry.hiEquiv && <span className="text-slate-600 font-medium">{entry.hiEquiv}</span>}
            </div>
            <p className="text-slate-700 leading-relaxed">{entry.hiDef || '—'}</p>
          </div>

          <div className="bg-[#F8FAFC] rounded-xl p-3 border border-[#D7E5F0]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[#1B7FC9]">मराठी</span>
              {entry.mrEquiv && <span className="text-slate-600 font-medium">{entry.mrEquiv}</span>}
            </div>
            <p className="text-slate-700 leading-relaxed">{entry.mrDef || '—'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
