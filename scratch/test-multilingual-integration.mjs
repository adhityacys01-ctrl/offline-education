import { readFileSync } from 'fs'
import { join } from 'path'

console.log('--- Verifying Multilingual & Settings Integration ---')

// 1. Read i18n.ts
const i18nPath = join(process.cwd(), 'apps/web/src/lib/i18n.ts')
const i18nContent = readFileSync(i18nPath, 'utf8')

const hasEn = i18nContent.includes('en: {')
const hasHi = i18nContent.includes('hi: {')
const hasMr = i18nContent.includes('mr: {')
const hasApply = i18nContent.includes("apply: 'Apply'") && i18nContent.includes("apply: 'लागू करें'") && i18nContent.includes("apply: 'लागू करा'")

console.log('1. i18n.ts Languages supported:', { hasEn, hasHi, hasMr, hasApply })
if (!hasEn || !hasHi || !hasMr || !hasApply) {
  console.error('FAIL: Missing language dictionary or apply keys in i18n.ts')
  process.exit(1)
}

// 2. Read SettingsPage.tsx
const settingsPath = join(process.cwd(), 'apps/web/src/pages/settings/SettingsPage.tsx')
const settingsContent = readFileSync(settingsPath, 'utf8')
const hasRadioGroup = settingsContent.includes("type=\"radio\"") && settingsContent.includes("name=\"preferredLang\"") && settingsContent.includes("setSelectedLang(lang)")
const hasApplyButton = settingsContent.includes("handleApplyLanguage") && settingsContent.includes("t('apply')")

console.log('2. SettingsPage.tsx radio & Apply button:', { hasRadioGroup, hasApplyButton })
if (!hasRadioGroup || !hasApplyButton) {
  console.error('FAIL: SettingsPage.tsx does not have language radios or Apply button')
  process.exit(1)
}

// 3. Import and test quiz-translations.ts
const quizTransPath = join(process.cwd(), 'apps/web/src/data/quiz-translations.ts')
const quizTransContent = readFileSync(quizTransPath, 'utf8')
const quizMatches = quizTransContent.match(/"([^"]+Quiz[^"]+)": \{/g) || []
const quizzesCount = quizMatches.length
const hasFormulaPreservation = quizTransContent.includes('F = m × a') || quizTransContent.includes('20 N') || quizTransContent.includes('5 kg')

console.log('3. Quiz translations:', { quizzesCount, hasFormulaPreservation })
if (quizzesCount < 18) {
  console.error('FAIL: Expected at least 18 quizzes in quiz-translations.ts, found:', quizzesCount)
  process.exit(1)
}

// 4. Verify Dashboards and Layout have useI18n
const appLayout = readFileSync(join(process.cwd(), 'apps/web/src/layouts/AppLayout.tsx'), 'utf8')
const dashboardPage = readFileSync(join(process.cwd(), 'apps/web/src/pages/dashboard/DashboardPage.tsx'), 'utf8')
const teacherDashboard = readFileSync(join(process.cwd(), 'apps/web/src/pages/teacher/TeacherDashboardPage.tsx'), 'utf8')
const adminDashboard = readFileSync(join(process.cwd(), 'apps/web/src/pages/admin/AdminDashboardPage.tsx'), 'utf8')
const quizPlayerPage = readFileSync(join(process.cwd(), 'apps/web/src/pages/quiz/QuizPlayerPage.tsx'), 'utf8')
const syncPage = readFileSync(join(process.cwd(), 'apps/web/src/pages/sync/SyncStatusPage.tsx'), 'utf8')

const checks = {
  appLayout: appLayout.includes('useI18n') && appLayout.includes("t(item.labelKey)"),
  studentDashboard: dashboardPage.includes('useI18n') && dashboardPage.includes("t('goodMorning')"),
  teacherDashboard: teacherDashboard.includes('useI18n') && teacherDashboard.includes("t('teacherDashboardTitle')"),
  adminDashboard: adminDashboard.includes('useI18n') && adminDashboard.includes("t('adminDashboardTitle')"),
  quizPlayer: quizPlayerPage.includes('getQuizTranslation') && quizPlayerPage.includes('useI18n'),
  syncCenter: syncPage.includes('useI18n') && syncPage.includes("t('syncTitle')"),
}

console.log('4. useI18n connected across layout, dashboards, quizzes & sync center:', checks)

if (!Object.values(checks).every(Boolean)) {
  console.error('FAIL: Not all views connected to useI18n')
  process.exit(1)
}

console.log('\n>>> SUCCESS: ALL MULTILINGUAL INTEGRATION CHECKS PASSED PERFECTLY! <<<')
