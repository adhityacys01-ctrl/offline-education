import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useSyncEngine } from '@/hooks/useSyncEngine';
import { getInitials } from '@/lib/utils';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db/database';
import { LayoutDashboard, BookOpen, Download, TrendingUp, RefreshCw, Settings, Bell, Search, ClipboardList, CheckSquare, Sun, Moon, ChevronDown, WifiOff, GraduationCap, Compass } from 'lucide-react';
const STUDENT_NAV = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/courses', icon: BookOpen, label: 'My Courses' },
    { to: '/progress', icon: TrendingUp, label: 'Progress' },
    { to: '/quizzes', icon: CheckSquare, label: 'Assessments' },
    { to: '/downloads', icon: Download, label: 'Downloads' },
    { to: '/sync', icon: RefreshCw, label: 'Sync Status', hasDot: true },
    { to: '/settings', icon: Settings, label: 'Settings' },
];
const TEACHER_NAV = [
    { to: '/teacher/dashboard', icon: ClipboardList, label: 'Submissions' },
    { to: '/courses', icon: BookOpen, label: 'Courses' },
    { to: '/settings', icon: Settings, label: 'Settings' },
];
export function AppLayout() {
    const { user, clearAuth } = useAuthStore();
    const { theme, setTheme } = useUIStore();
    const isOnline = useOnlineStatus();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    // ── Start the sync engine for the entire authenticated session ────────────
    useSyncEngine();
    // ── Live pending sync count for sidebar badge ─────────────────────────────
    const pendingCount = useLiveQuery(() => db.outbox.where('status').anyOf(['PENDING', 'SENDING', 'FAILED_RETRYABLE']).count(), [], 0);
    const handleLogout = () => {
        clearAuth();
        navigate('/login');
    };
    const isTeacher = user?.role === 'teacher';
    const NAV_ITEMS = isTeacher ? TEACHER_NAV : STUDENT_NAV;
    return (_jsxs("div", { className: "flex h-dvh overflow-hidden bg-[#F0F5FA]", children: [_jsxs("aside", { className: "w-64 bg-[#F4F8FC] border-r border-[#D7E5F0] flex flex-col flex-shrink-0 overflow-y-auto hide-scrollbar select-none", children: [_jsxs("div", { className: "p-5 pb-4 flex items-center gap-3", children: [_jsx("div", { className: "w-9 h-9 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center shadow-xs", children: _jsx(GraduationCap, { size: 18, strokeWidth: 2.2 }) }), _jsx("div", { children: _jsx("h1", { className: "text-slate-900 font-bold text-sm tracking-tight", children: "LearnHub" }) })] }), _jsx("nav", { className: "flex-1 px-3 py-2 space-y-1", children: NAV_ITEMS.map((item, idx) => {
                            const Icon = item.icon;
                            return (_jsxs(NavLink, { to: item.to, end: item.to === '/dashboard', className: ({ isActive }) => `
                  flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all
                  ${isActive
                                    ? 'bg-[#E1F0FA] text-[#1465A3] font-bold shadow-xs border border-[#CBE4F6]'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-[#E8F2FA]'}
                `, children: [_jsx(Icon, { size: 16, className: "flex-shrink-0" }), _jsx("span", { className: "flex-1 truncate", children: item.label }), item.hasDot && (_jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500 shadow-xs" })), item.badge && (_jsx("span", { className: "px-1.5 py-0.5 rounded-full bg-[#1B7FC9] text-white text-[10px] font-bold", children: item.badge })), item.to === '/sync' && pendingCount > 0 && (_jsx("span", { className: "bg-[#1B7FC9] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center", children: pendingCount }))] }, `${item.to}-${item.label}-${idx}`));
                        }) }), _jsxs("div", { className: "mx-3 my-2 p-4 rounded-xl bg-white border border-[#D7E5F0] text-center shadow-xs", children: [_jsx("div", { className: "w-9 h-9 rounded-xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center mx-auto mb-2 shadow-xs", children: _jsx(Compass, { size: 18, strokeWidth: 2.2 }) }), _jsx("p", { className: "text-slate-900 font-bold text-xs mb-3", children: "Keep Learning Anywhere!" }), _jsx("button", { onClick: () => navigate('/downloads'), className: "w-full py-2 px-3 rounded-lg bg-[#1B7FC9] hover:bg-[#1465A3] active:scale-[0.98] text-white text-xs font-semibold shadow-xs transition-all", children: "Go Offline" })] }), _jsxs("div", { className: "p-3 mx-2 mb-2 border-t border-[#D7E5F0] flex items-center gap-2.5", children: [_jsxs("div", { className: "relative flex-shrink-0", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-[#E1F0FA] text-[#1465A3] font-bold flex items-center justify-center text-xs border border-[#CBE4F6]", children: getInitials(user?.name || 'Aarav Sharma') }), _jsx("span", { className: `w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-amber-500'} border-2 border-white absolute -bottom-0.5 -right-0.5 shadow-xs` })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-slate-900 text-xs font-semibold truncate", children: user?.name || 'Aarav Sharma' }), _jsx("p", { className: "text-slate-500 text-[10px] truncate capitalize", children: user?.role || 'Student' })] }), _jsx("button", { onClick: handleLogout, className: "p-1 text-slate-400 hover:text-slate-700 transition-colors", title: "Log out", children: _jsx(ChevronDown, { size: 14 }) })] })] }), _jsxs("div", { className: "flex-1 flex flex-col overflow-hidden", children: [_jsxs("header", { className: "h-14 bg-white border-b border-[#D7E5F0] flex items-center justify-between gap-4 px-6 md:px-8 flex-shrink-0", children: [_jsxs("div", { className: "relative max-w-md w-full", children: [_jsx(Search, { size: 14, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search courses, topics...", className: "w-full pl-9 pr-16 py-2 text-xs bg-[#F8FAFC] border border-[#D7E5F0] rounded-xl shadow-xs focus:outline-none focus:border-[#1B7FC9] focus:ring-1 focus:ring-[#1B7FC9] text-slate-800 placeholder:text-slate-400 transition-all" }), _jsx("span", { className: "absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-md bg-white text-[10px] font-medium text-slate-500 border border-slate-200 select-none pointer-events-none", children: "Ctrl + K" })] }), _jsxs("div", { className: "flex items-center gap-2.5", children: [!isOnline && (_jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold", children: [_jsx(WifiOff, { size: 12 }), " Offline Mode"] })), _jsxs("button", { onClick: () => navigate('/sync'), className: "relative w-8 h-8 rounded-xl bg-white border border-[#D7E5F0] shadow-xs flex items-center justify-center text-slate-600 hover:text-[#1B7FC9] hover:border-[#1B7FC9] transition-all", title: "Notifications", children: [_jsx(Bell, { size: 15 }), _jsx("span", { className: "absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#1B7FC9] text-white text-[9px] font-bold flex items-center justify-center border-2 border-white", children: "3" })] }), _jsxs("div", { className: "flex items-center bg-[#F8FAFC] border border-[#D7E5F0] p-0.5 rounded-xl gap-0.5", children: [_jsx("button", { onClick: () => setTheme('light'), className: `w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-all ${theme === 'light' ? 'bg-white text-[#1B7FC9] shadow-xs font-bold' : 'text-slate-400 hover:text-slate-600'}`, title: "Light Theme", children: _jsx(Sun, { size: 12 }) }), _jsx("button", { onClick: () => setTheme('dark'), className: `w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-all ${theme === 'dark' ? 'bg-white text-[#1B7FC9] shadow-xs font-bold' : 'text-slate-400 hover:text-slate-600'}`, title: "Dark Theme", children: _jsx(Moon, { size: 12 }) })] })] })] }), _jsx("main", { className: "flex-1 overflow-y-auto px-6 md:px-8 pb-8 pt-4 hide-scrollbar", children: _jsx(Outlet, {}) })] })] }));
}
//# sourceMappingURL=AppLayout.js.map