import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { getInitials } from '@/lib/utils'
import { User, Bell, Wifi, Moon, LogOut, Key } from 'lucide-react'

export function SettingsPage() {
  const { user, clearAuth } = useAuthStore()
  const { theme, setTheme } = useUIStore()

  const [wifiOnly, setWifiOnly] = useState(true)
  const [autoSync, setAutoSync] = useState(true)

  const isDarkMode = theme === 'dark'

  const handleToggleDark = (enabled: boolean) => {
    setTheme(enabled ? 'dark' : 'light')
  }

  return (
    <div className="space-y-5 max-w-2xl animate-fade-in pb-12">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Settings</h1>
      </div>

      {/* Account Card */}
      <div className="bg-white rounded-2xl p-5 border border-[#D7E5F0] shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2">
          <User size={15} className="text-[#1B7FC9]" /> Account
        </h2>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E1F0FA] text-[#1465A3] border border-[#CBE4F6] flex items-center justify-center text-xl font-bold shadow-xs">
            {user ? getInitials(user.name) : 'U'}
          </div>
          <div>
            <p className="font-bold text-slate-900">{user?.name ?? '—'}</p>
            <p className="text-xs text-slate-500">{user?.email ?? '—'}</p>
          </div>
          <button className="ml-auto bg-white border border-[#D7E5F0] hover:border-[#1B7FC9] text-slate-700 text-xs font-bold py-1.5 px-3 rounded-xl transition-all shadow-xs">
            Edit Profile
          </button>
        </div>
        <div className="pt-2 border-t border-[#D7E5F0] flex flex-col gap-2">
          <button className="text-xs font-semibold text-slate-600 hover:text-[#1B7FC9] py-1.5 text-left transition-colors flex items-center gap-1.5">
            <Key size={14} className="text-slate-400" /> Change Password
          </button>
        </div>
      </div>

      {/* App Preferences */}
      <div className="bg-white rounded-2xl p-5 border border-[#D7E5F0] shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2">
          <Bell size={15} className="text-[#1B7FC9]" /> App Preferences
        </h2>
        
        {/* Preference 1: Wifi */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Wifi size={15} className="text-slate-400" /> Download on Wi-Fi Only
          </div>
          <input
            type="checkbox"
            checked={wifiOnly}
            onChange={(e) => setWifiOnly(e.target.checked)}
            className="w-4 h-4 rounded accent-[#1B7FC9] cursor-pointer"
          />
        </div>

        {/* Preference 2: Auto Sync */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Wifi size={15} className="text-slate-400" /> Auto Sync When Online
          </div>
          <input
            type="checkbox"
            checked={autoSync}
            onChange={(e) => setAutoSync(e.target.checked)}
            className="w-4 h-4 rounded accent-[#1B7FC9] cursor-pointer"
          />
        </div>

        {/* Preference 3: Dark Mode */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Moon size={15} className="text-slate-400" /> Dark Mode
          </div>
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={(e) => handleToggleDark(e.target.checked)}
            className="w-4 h-4 rounded accent-[#1B7FC9] cursor-pointer"
          />
        </div>
      </div>

      {/* Storage */}
      <div className="bg-white rounded-2xl p-5 border border-[#D7E5F0] shadow-xs">
        <h2 className="text-sm font-bold text-slate-700 mb-3">Storage Usage</h2>
        <div className="w-full bg-[#E8F2FA] h-2 rounded-full overflow-hidden border border-[#D7E5F0] mb-2">
          <div className="bg-[#1B7FC9] h-full rounded-full" style={{ width: '24%' }} />
        </div>
        <p className="text-xs text-slate-500 font-medium">1.2 GB used of 5 GB available</p>
      </div>

      {/* Logout */}
      <button
        onClick={clearAuth}
        className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
      >
        <LogOut size={16} /> Log Out
      </button>
    </div>
  )
}
