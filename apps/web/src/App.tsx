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
import SubmissionDetailPage from '@/pages/teacher/SubmissionDetailPage'
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
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/quiz/:quizVersionId" element={<QuizPlayerPage />} />
            <Route path="/courses/:courseId/quiz/:quizVersionId" element={<QuizPlayerPage />} />
            <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonViewerPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/sync" element={<SyncStatusPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* Teacher Portal */}
            <Route path="/teacher/dashboard" element={<TeacherDashboardPage />} />
            <Route path="/teacher/submissions/:submissionId" element={<SubmissionDetailPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </ErrorBoundary>
  )
}
