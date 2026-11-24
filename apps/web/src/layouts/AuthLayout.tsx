import { Outlet } from 'react-router-dom'
import { GraduationCap, BookOpen, CheckCircle2 } from 'lucide-react'

export function AuthLayout() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-[#F0F5FA] p-4">
      <div className="w-full max-w-4xl bg-white border border-[#D7E5F0] rounded-2xl shadow-card-md overflow-hidden flex min-h-[540px]">
        {/* Left branding panel */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#E1F0FA] border-r border-[#CBE4F6] p-10 text-slate-900">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 bg-white rounded-xl border border-[#CBE4F6] flex items-center justify-center text-[#1B7FC9] shadow-xs">
                <GraduationCap size={18} strokeWidth={2.2} />
              </div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Offline Learning</h2>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 mb-8">
              Offline Learning<br />Without Limits
            </h1>

            <div className="space-y-3.5">
              {['Download lessons & quizzes', 'Learn without internet', 'Auto-sync when online'].map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                  <CheckCircle2 size={16} className="text-[#1B7FC9] flex-shrink-0" /> {f}
                </div>
              ))}
            </div>
          </div>

          {/* Clean minimal illustration container */}
          <div className="flex items-center justify-center">
            <div className="w-36 h-36 bg-white border border-[#CBE4F6] rounded-2xl flex items-center justify-center text-[#1B7FC9] shadow-xs">
              <BookOpen size={48} strokeWidth={1.8} />
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12 bg-white">
          <div className="w-full max-w-sm">
            {/* Mobile logo */}
            <div className="flex items-center gap-2.5 mb-6 lg:hidden">
              <div className="w-8 h-8 rounded-lg bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center">
                <GraduationCap size={16} />
              </div>
              <span className="font-bold text-slate-900 text-sm">Offline Learning</span>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
