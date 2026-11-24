import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthLayout } from '@/layouts/AuthLayout';
import { AppLayout } from '@/layouts/AppLayout';
import { LoginPage } from '@/pages/auth/LoginPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { CoursesPage } from '@/pages/courses/CoursesPage';
import { CourseDetailPage } from '@/pages/courses/CourseDetailPage';
import { QuizzesPage } from '@/pages/quizzes/QuizzesPage';
import { DownloadsPage } from '@/pages/downloads/DownloadsPage';
import { ProgressPage } from '@/pages/progress/ProgressPage';
import { SyncStatusPage } from '@/pages/sync/SyncStatusPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';
import { QuizPlayerPage } from '@/pages/quiz/QuizPlayerPage';
import { LessonViewerPage } from '@/pages/lesson/LessonViewerPage';
import TeacherDashboardPage from '@/pages/teacher/TeacherDashboardPage';
import TeacherCoursesPage from '@/pages/teacher/TeacherCoursesPage';
import TeacherProgressPage from '@/pages/teacher/TeacherProgressPage';
import TeacherAssessmentReviewPage from '@/pages/teacher/TeacherAssessmentReviewPage';
import TeacherSyncMonitoringPage from '@/pages/teacher/TeacherSyncMonitoringPage';
import TeacherReportsPage from '@/pages/teacher/TeacherReportsPage';
import SubmissionDetailPage from '@/pages/teacher/SubmissionDetailPage';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useAuthStore } from '@/store/authStore';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});
function ProtectedRoute({ children }) {
    const { user } = useAuthStore();
    if (!user)
        return _jsx(Navigate, { to: "/login", replace: true });
    return _jsx(_Fragment, { children: children });
}
function RoleBasedDashboard() {
    const { user } = useAuthStore();
    if (user?.role === 'teacher')
        return _jsx(TeacherDashboardPage, {});
    return _jsx(DashboardPage, {});
}
function RoleBasedCourses() {
    const { user } = useAuthStore();
    if (user?.role === 'teacher')
        return _jsx(TeacherCoursesPage, {});
    return _jsx(CoursesPage, {});
}
function RoleBasedProgress() {
    const { user } = useAuthStore();
    if (user?.role === 'teacher')
        return _jsx(TeacherProgressPage, {});
    return _jsx(ProgressPage, {});
}
function RoleBasedSync() {
    const { user } = useAuthStore();
    if (user?.role === 'teacher')
        return _jsx(TeacherSyncMonitoringPage, {});
    return _jsx(SyncStatusPage, {});
}
export default function App() {
    return (_jsx(ErrorBoundary, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(AuthLayout, {}), children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/signup", element: _jsx(LoginPage, { initialSignup: true }) })] }), _jsxs(Route, { element: _jsx(ProtectedRoute, { children: _jsx(AppLayout, {}) }), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { to: "/dashboard", replace: true }) }), _jsx(Route, { path: "/dashboard", element: _jsx(RoleBasedDashboard, {}) }), _jsx(Route, { path: "/courses", element: _jsx(RoleBasedCourses, {}) }), _jsx(Route, { path: "/courses/:courseId", element: _jsx(CourseDetailPage, {}) }), _jsx(Route, { path: "/quizzes", element: _jsx(QuizzesPage, {}) }), _jsx(Route, { path: "/quiz/:quizVersionId", element: _jsx(QuizPlayerPage, {}) }), _jsx(Route, { path: "/courses/:courseId/quiz/:quizVersionId", element: _jsx(QuizPlayerPage, {}) }), _jsx(Route, { path: "/courses/:courseId/lessons/:lessonId", element: _jsx(LessonViewerPage, {}) }), _jsx(Route, { path: "/downloads", element: _jsx(DownloadsPage, {}) }), _jsx(Route, { path: "/progress", element: _jsx(RoleBasedProgress, {}) }), _jsx(Route, { path: "/sync", element: _jsx(RoleBasedSync, {}) }), _jsx(Route, { path: "/settings", element: _jsx(SettingsPage, {}) }), _jsx(Route, { path: "/teacher/dashboard", element: _jsx(TeacherDashboardPage, {}) }), _jsx(Route, { path: "/teacher/courses", element: _jsx(TeacherCoursesPage, {}) }), _jsx(Route, { path: "/teacher/progress", element: _jsx(TeacherProgressPage, {}) }), _jsx(Route, { path: "/teacher/assessments", element: _jsx(TeacherAssessmentReviewPage, {}) }), _jsx(Route, { path: "/teacher/submissions", element: _jsx(TeacherAssessmentReviewPage, {}) }), _jsx(Route, { path: "/teacher/submissions/:submissionId", element: _jsx(SubmissionDetailPage, {}) }), _jsx(Route, { path: "/teacher/sync", element: _jsx(TeacherSyncMonitoringPage, {}) }), _jsx(Route, { path: "/teacher/reports", element: _jsx(TeacherReportsPage, {}) })] }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/dashboard", replace: true }) })] }) }) }) }));
}
//# sourceMappingURL=App.js.map