import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthLayout } from '@/layouts/AuthLayout'
import { AppLayout } from '@/layouts/AppLayout'
import { LoginPage } from '@/pages/auth/LoginPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { CoursesPage } from '@/pages/courses/CoursesPage'
import { CourseDetailPage } from '@/pages/courses/CourseDetailPage'
import { QuizzesPage } from '@/pages/quizzes/QuizzesPage'
import { DownloadsPage } from '@/pages/downloads/DownloadsPage'
import { ProgressPage } from '@/pages/progress/ProgressPage'
import { SyncStatusPage } from '@/pages/sync/SyncStatusPage'
import { SettingsPage } from '@/pages/settings/SettingsPage'
import { QuizPlayerPage } from '@/pages/quiz/QuizPlayerPage'
import { LessonViewerPage } from '@/pages/lesson/LessonViewerPage'
import TeacherDashboardPage from '@/pages/teacher/TeacherDashboardPage'
import TeacherCoursesPage from '@/pages/teacher/TeacherCoursesPage'
import TeacherProgressPage from '@/pages/teacher/TeacherProgressPage'
import TeacherAssessmentReviewPage from '@/pages/teacher/TeacherAssessmentReviewPage'
import TeacherSyncMonitoringPage from '@/pages/teacher/TeacherSyncMonitoringPage'
import TeacherReportsPage from '@/pages/teacher/TeacherReportsPage'
import SubmissionDetailPage from '@/pages/teacher/SubmissionDetailPage'
import TranslationStudioPage from '@/pages/teacher/TranslationStudioPage'
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'
import AdminUsersPage from '@/pages/admin/AdminUsersPage'
import AdminSyncMonitorPage from '@/pages/admin/AdminSyncMonitorPage'
import AdminAuditLogPage from '@/pages/admin/AdminAuditLogPage'
import AdminConflictPoliciesPage from '@/pages/admin/AdminConflictPoliciesPage'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { useAuthStore } from '@/store/authStore'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore()
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore()
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

function RoleBasedDashboard() {
  const { user } = useAuthStore()
  if (user?.role === 'admin')   return <Navigate to="/admin" replace />
  if (user?.role === 'teacher') return <TeacherDashboardPage />
  return <DashboardPage />
}

function RoleBasedCourses() {
  const { user } = useAuthStore()
  if (user?.role === 'teacher') return <TeacherCoursesPage />
  return <CoursesPage />
}

function RoleBasedProgress() {
  const { user } = useAuthStore()
  if (user?.role === 'teacher') return <TeacherProgressPage />
  return <ProgressPage />
}

function RoleBasedSync() {
  const { user } = useAuthStore()
  if (user?.role === 'teacher') return <TeacherSyncMonitoringPage />
  return <SyncStatusPage />
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
          {/* Auth */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<LoginPage initialSignup={true} />} />
          </Route>

          {/* Protected App */}
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<RoleBasedDashboard />} />
            <Route path="/courses" element={<RoleBasedCourses />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/quiz/:quizVersionId" element={<QuizPlayerPage />} />
            <Route path="/courses/:courseId/quiz/:quizVersionId" element={<QuizPlayerPage />} />
            <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonViewerPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/progress" element={<RoleBasedProgress />} />
            <Route path="/sync" element={<RoleBasedSync />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Teacher Portal */}
            <Route path="/teacher/dashboard"   element={<TeacherDashboardPage />} />
            <Route path="/teacher/courses"     element={<TeacherCoursesPage />} />
            <Route path="/teacher/progress"    element={<TeacherProgressPage />} />
            <Route path="/teacher/assessments" element={<TeacherAssessmentReviewPage />} />
            <Route path="/teacher/submissions" element={<TeacherAssessmentReviewPage />} />
            <Route path="/teacher/submissions/:submissionId" element={<SubmissionDetailPage />} />
            <Route path="/teacher/sync"        element={<TeacherSyncMonitoringPage />} />
            <Route path="/teacher/reports"     element={<TeacherReportsPage />} />
            <Route path="/teacher/translations" element={<TranslationStudioPage />} />
            <Route path="/teacher/translations/:lessonId" element={<TranslationStudioPage />} />

            {/* Admin Portal */}
            <Route path="/admin"                   element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
            <Route path="/admin/users"             element={<AdminRoute><AdminUsersPage /></AdminRoute>} />
            <Route path="/admin/sync-monitor"      element={<AdminRoute><AdminSyncMonitorPage /></AdminRoute>} />
            <Route path="/admin/audit-logs"        element={<AdminRoute><AdminAuditLogPage /></AdminRoute>} />
            <Route path="/admin/conflict-policies" element={<AdminRoute><AdminConflictPoliciesPage /></AdminRoute>} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </ErrorBoundary>
  )
}
