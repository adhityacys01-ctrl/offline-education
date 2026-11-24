import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { useSyncEngine } from '@/hooks/useSyncEngine'
import { getInitials } from '@/lib/utils'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/database'
import {
  LayoutDashboard, BookOpen, Download, TrendingUp,
  RefreshCw, Settings, Bell, Search,
  ClipboardList, CheckSquare, Users, BarChart3,
  Sun, Moon, ChevronDown, WifiOff, GraduationCap, Compass,
  Shield, UserCog, FileText, AlertTriangle
} from 'lucide-react'

interface NavItem {
  to: string
  icon: any
  label: string
  hasDot?: boolean
  badge?: string
}

const STUDENT_NAV: NavItem[] = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/courses',   icon: BookOpen,        label: 'My Courses' },
  { to: '/progress',  icon: TrendingUp,      label: 'Progress' },
  { to: '/quizzes',   icon: CheckSquare,     label: 'Assessments' },
  { to: '/downloads', icon: Download,        label: 'Downloads' },
  { to: '/sync',      icon: RefreshCw,       label: 'Sync Status', hasDot: true },
  { to: '/settings',  icon: Settings,        label: 'Settings' },
]

const TEACHER_NAV: NavItem[] = [
  { to: '/teacher/dashboard',   icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/teacher/courses',     icon: BookOpen,        label: 'My Courses' },
  { to: '/teacher/progress',    icon: Users,           label: 'Student Progress' },
  { to: '/teacher/assessments', icon: ClipboardList,   label: 'Assessment Review' },
  { to: '/teacher/sync',        icon: RefreshCw,       label: 'Sync Monitoring', hasDot: true },
  { to: '/teacher/reports',     icon: BarChart3,       label: 'Reports & Analytics' },
  { to: '/settings',            icon: Settings,        label: 'Settings' },
]

const ADMIN_NAV: NavItem[] = [
  { to: '/admin',                  icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/users',            icon: UserCog,         label: 'User Management' },
  { to: '/admin/sync-monitor',     icon: AlertTriangle,   label: 'Sync Monitor' },
  { to: '/admin/audit-logs',       icon: FileText,        label: 'Audit Logs' },
  { to: '/admin/conflict-policies',icon: Shield,          label: 'Conflict Policies' },
  { to: '/settings',               icon: Settings,        label: 'Settings' },
]

export function AppLayout() {
  const { user, clearAuth } = useAuthStore()
  const { theme, setTheme } = useUIStore()
  const isOnline = useOnlineStatus()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  // ── Start the sync engine for the entire authenticated session ────────────
  useSyncEngine()

  // ── Live pending sync count for sidebar badge ─────────────────────────────
  const pendingCount = useLiveQuery(
    () => db.outbox.where('status').anyOf(['PENDING', 'SENDING', 'FAILED_RETRYABLE']).count(),
    [],
    0,
  ) as number

  const handleLogout = () => {
    clearAuth()
    navigate('/login')
  }

  const isTeacher = user?.role === 'teacher'
  const isAdmin   = user?.role === 'admin'
  const NAV_ITEMS = isAdmin ? ADMIN_NAV : isTeacher ? TEACHER_NAV : STUDENT_NAV

  return (
    <div className="flex h-dvh overflow-hidden bg-[#F0F5FA]">
      {/* ── Sidebar (Distinct Light Pale Blue) ───────────────────────────── */}
      <aside className="w-64 bg-[#E1EEF8] dark:bg-[#0E1726] border-r border-[#C5DCF0] dark:border-[#1E2D48] flex flex-col flex-shrink-0 overflow-y-auto hide-scrollbar select-none transition-colors">
        {/* Brand Header without subtext below heading */}
        <div className="p-5 pb-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white text-[#1B7FC9] border border-[#BFDCF2] flex items-center justify-center shadow-xs">
            <GraduationCap size={18} strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-slate-900 dark:text-slate-100 font-bold text-sm tracking-tight">LearnHub</h1>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {NAV_ITEMS.map((item, idx) => {
            const Icon = item.icon
            return (
              <NavLink
                key={`${item.to}-${item.label}-${idx}`}
                to={item.to}
                end={item.to === '/dashboard'}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all
                  ${isActive
                    ? 'bg-white dark:bg-[#162C46] text-[#1465A3] dark:text-[#38BDF8] font-bold shadow-xs border border-[#BFDCF2] dark:border-[#223D61]'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-[#D2E5F5] dark:hover:bg-[#18263E]'
                  }
                `}
              >
                <Icon size={16} className="flex-shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>

                {/* Green active dot for Sync Status */}
                {item.hasDot && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs" />
                )}

                {/* Message count badge */}
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#1B7FC9] text-white text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}

                {/* Pending outbox badge */}
                {item.to === '/sync' && pendingCount > 0 && (
                  <span className="bg-[#1B7FC9] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {pendingCount}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Promo Card */}
        <div className="mx-3 my-2 p-4 rounded-xl bg-white dark:bg-[#131F33] border border-[#BFDCF2] dark:border-[#1E2D48] text-center shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-[#E1EEF8] text-[#1B7FC9] border border-[#BFDCF2] flex items-center justify-center mx-auto mb-2 shadow-xs">
            <Compass size={18} strokeWidth={2.2} />
          </div>
          <p className="text-slate-900 dark:text-slate-100 font-bold text-xs mb-3">
            {isAdmin ? 'System Control' : isTeacher ? 'Class Sync Status' : 'Keep Learning Anywhere!'}
          </p>
          <button
            onClick={() => navigate(isAdmin ? '/admin/sync-monitor' : isTeacher ? '/teacher/sync' : '/downloads')}
            className="w-full py-2 px-3 rounded-lg bg-[#1B7FC9] hover:bg-[#1465A3] active:scale-[0.98] text-white text-xs font-semibold shadow-xs transition-all"
          >
            {isAdmin ? 'Sync Monitor' : isTeacher ? 'Sync Monitoring' : 'Go Offline'}
          </button>
        </div>

        {/* Bottom: User Profile Strip */}
        <div className="p-3 mx-2 mb-2 border-t border-[#C5DCF0] dark:border-[#1E2D48] flex items-center gap-2.5">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#162C46] text-[#1465A3] dark:text-[#38BDF8] font-bold flex items-center justify-center text-xs border border-[#BFDCF2] dark:border-[#223D61] shadow-xs">
              {getInitials(user?.name || 'Aarav Sharma')}
            </div>
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-amber-500'} border-2 border-white absolute -bottom-0.5 -right-0.5 shadow-xs`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-slate-900 dark:text-slate-100 text-xs font-semibold truncate">{user?.name || 'Aarav Sharma'}</p>
            <p className="text-slate-600 dark:text-slate-400 text-[10px] truncate capitalize">{user?.role || 'Student'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            title="Log out"
          >
            <ChevronDown size={14} />
          </button>
        </div>
      </aside>

      {/* ── Main Area ───────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-14 bg-white border-b border-[#D7E5F0] flex items-center justify-between gap-4 px-6 md:px-8 flex-shrink-0">
          {/* Search Bar */}
          <div className="relative max-w-md w-full">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, topics..."
              className="w-full pl-9 pr-16 py-2 text-xs bg-[#F8FAFC] border border-[#D7E5F0] rounded-xl shadow-xs focus:outline-none focus:border-[#1B7FC9] focus:ring-1 focus:ring-[#1B7FC9] text-slate-800 placeholder:text-slate-400 transition-all"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-md bg-white text-[10px] font-medium text-slate-500 border border-slate-200 select-none pointer-events-none">
              Ctrl + K
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5">
            {!isOnline && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
                <WifiOff size={12} /> Offline Mode
              </span>
            )}
            {/* Notification Bell */}
            <button
              onClick={() => navigate('/sync')}
              className="relative w-8 h-8 rounded-xl bg-white border border-[#D7E5F0] shadow-xs flex items-center justify-center text-slate-600 hover:text-[#1B7FC9] hover:border-[#1B7FC9] transition-all"
              title="Notifications"
            >
              <Bell size={15} />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#1B7FC9] text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                3
              </span>
            </button>

            {/* Sun / Moon Theme Switcher */}
            <div className="flex items-center bg-[#F8FAFC] border border-[#D7E5F0] p-0.5 rounded-xl gap-0.5">
              <button
                onClick={() => setTheme('light')}
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-all ${theme === 'light' ? 'bg-white text-[#1B7FC9] shadow-xs font-bold' : 'text-slate-400 hover:text-slate-600'}`}
                title="Light Theme"
              >
                <Sun size={12} />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-all ${theme === 'dark' ? 'bg-white text-[#1B7FC9] shadow-xs font-bold' : 'text-slate-400 hover:text-slate-600'}`}
                title="Dark Theme"
              >
                <Moon size={12} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-6 md:px-8 pb-8 pt-4 hide-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
