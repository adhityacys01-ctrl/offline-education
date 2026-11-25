import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { useI18n, type SupportedLanguage, LANGUAGE_LABELS } from '@/lib/i18n'
import { getInitials } from '@/lib/utils'
import { User, Bell, Wifi, Moon, LogOut, Key, Globe, Check } from 'lucide-react'

export function SettingsPage() {
  const { user, clearAuth } = useAuthStore()
  const { theme, setTheme } = useUIStore()
  const { language, setLanguage, t } = useI18n()

  const [wifiOnly, setWifiOnly] = useState(true)
  const [autoSync, setAutoSync] = useState(true)
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(language)
  const [showAppliedToast, setShowAppliedToast] = useState(false)

  const isDarkMode = theme === 'dark'

  const handleToggleDark = (enabled: boolean) => {
    setTheme(enabled ? 'dark' : 'light')
  }

    const handleApplyLanguage = () => {
      setLanguage(selectedLang)
      setShowAppliedToast(true)
      setTimeout(() => setShowAppliedToast(false), 3000)
    }

    return (
      <div className="space-y-5 max-w-2xl animate-fade-in pb-12">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            {t('settings')}
          </h1>
        </div>

        {/* Account Card */}
            <div className="bg-white dark:bg-[#131F33] rounded-2xl p-5 border border-[#D7E5F0] dark:border-[#1E2D48] shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <User size={15} className="text-[#1B7FC9]" /> {t('account')}
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#E1F0FA] text-[#1465A3] border border-[#CBE4F6] flex items-center justify-center text-xl font-bold shadow-xs">
                  {user ? getInitials(user.name) : 'U'}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100">{user?.name ?? '—'}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email ?? '—'}</p>
                </div>
                  <button className="ml-auto bg-white dark:bg-[#18263E] border border-[#D7E5F0] dark:border-[#223D61] hover:border-[#1B7FC9] text-slate-700 dark:text-slate-300 text-xs font-bold py-1.5 px-3 rounded-xl transition-all shadow-xs">
                    {t('editProfile')}
                  </button>
              </div>
                  <div className="pt-2 border-t border-[#D7E5F0] dark:border-[#1E2D48] flex flex-col gap-2">
                    <button className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#1B7FC9] py-1.5 text-left transition-colors flex items-center gap-1.5">
                      <Key size={14} className="text-slate-400" /> {t('changePassword')}
                    </button>
                  </div>
              </div>

              {/* App Preferences */}
                  <div className="bg-white dark:bg-[#131F33] rounded-2xl p-5 border border-[#D7E5F0] dark:border-[#1E2D48] shadow-xs space-y-4">
                    <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Bell size={15} className="text-[#1B7FC9]" /> {t('appPreferences')}
                    </h2>

                    {/* Preference 1: Wifi */}
                    <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                          <Wifi size={15} className="text-slate-400" /> {t('wifiOnly')}
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
                          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                            <Wifi size={15} className="text-slate-400" /> {t('autoSync')}
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
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                              <Moon size={15} className="text-slate-400" /> {t('darkMode')}
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
                            <div className="bg-white dark:bg-[#131F33] rounded-2xl p-5 border border-[#D7E5F0] dark:border-[#1E2D48] shadow-xs">
                              <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">{t('storageUsage')}</h2>
                              <div className="w-full bg-[#E8F2FA] dark:bg-[#18263E] h-2 rounded-full overflow-hidden border border-[#D7E5F0] dark:border-[#1E2D48] mb-2">
                                <div className="bg-[#1B7FC9] h-full rounded-full" style={{ width: '24%' }} />
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('usedOfStorage')}</p>
                            </div>

                            {/* Logout */}
                            <button
                              onClick={clearAuth}
                              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                            >
                              <LogOut size={16} /> {t('logOut')}
                            </button>

                                {/* Learning Language with Apply Button */}
                                <div className="bg-white dark:bg-[#131F33] rounded-2xl p-5 border border-[#D7E5F0] dark:border-[#1E2D48] shadow-xs">
                                  <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-4">
                                    <Globe size={15} className="text-[#1B7FC9]" /> {t('learningLanguage')}
                                  </h2>
                                    <div className="flex gap-6 mb-5">
                                      {(['en', 'hi', 'mr'] as SupportedLanguage[]).map(lang => (
                                        <label key={lang} className="flex items-center gap-2 cursor-pointer">
                                          <input
                                            type="radio"
                                            name="preferredLang"
                                            value={lang}
                                            checked={selectedLang === lang}
                                            onChange={() => setSelectedLang(lang)}
                                            className="accent-[#1B7FC9] w-4 h-4 cursor-pointer"
                                          />
                                          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{LANGUAGE_LABELS[lang]}</span>
                                        </label>
                                      ))}
                                    </div>

                                    {/* Apply Button */}
                                    <div className="flex items-center gap-3 pt-2 border-t border-[#D7E5F0] dark:border-[#1E2D48]">
                                      <button
                                        onClick={handleApplyLanguage}
                                        className="px-6 py-2.5 bg-[#1B7FC9] hover:bg-[#1465A3] active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
                                      >
                                        <Check size={14} /> {t('apply')}
                                      </button>

                                      {showAppliedToast && (
                                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-fade-in flex items-center gap-1.5">
                                          <Check size={14} /> {t('appliedSuccess')}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                )
}
