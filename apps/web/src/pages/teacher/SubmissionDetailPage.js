import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
export default function SubmissionDetailPage() {
    const { submissionId } = useParams();
    const { accessToken } = useAuthStore();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`/api/v1/teacher/submissions/${submissionId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                if (!res.ok)
                    throw new Error(await res.text());
                setDetail(await res.json());
            }
            catch (e) {
                setError(String(e));
            }
            finally {
                setLoading(false);
            }
        };
        load();
    }, [submissionId, accessToken]);
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsx("div", { className: "w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" }) }));
    }
    if (error || !detail) {
        return _jsx("div", { className: "text-danger text-center p-10", children: error ?? 'Not found' });
    }
    const pct = detail.score != null && detail.totalQuestions
        ? Math.round((detail.score / detail.totalQuestions) * 100)
        : null;
    return (_jsxs("div", { className: "space-y-6 max-w-4xl mx-auto", children: [_jsx(Link, { to: "/teacher/dashboard", className: "inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700", children: "\u2190 Back to Dashboard" }), _jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-6", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsx("div", { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h1", { className: "text-xl font-bold text-gray-900", children: detail.quizTitle }), _jsxs("span", { className: "px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium", children: ["v", detail.quizVersion] })] }) }), _jsx("span", { className: `px-3 py-1 rounded-full text-sm font-medium ${detail.status === 'GRADED' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`, children: detail.status })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-6", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-500", children: "Student" }), _jsx("p", { className: "font-semibold text-gray-900 mt-0.5", children: detail.student.name }), _jsx("p", { className: "text-xs text-gray-400", children: detail.student.email })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-500", children: "Score" }), _jsxs("p", { className: "font-semibold text-gray-900 mt-0.5", children: [detail.score ?? '—', "/", detail.totalQuestions ?? '—', ' ', pct != null && _jsxs("span", { className: "text-brand-600", children: ["(", pct, "%)"] })] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-500", children: "Submitted" }), _jsx("p", { className: "font-semibold text-gray-900 mt-0.5", children: detail.acceptedAt ? new Date(detail.acceptedAt).toLocaleString() : '—' })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-500", children: "Duplicate Suppression" }), _jsx("p", { className: "font-semibold text-success mt-0.5 text-sm", children: "\u2713 No duplicate records" })] })] })] }), _jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-6", children: [_jsx("h2", { className: "font-semibold text-gray-900 mb-4", children: "Integrity Verification" }), _jsxs("div", { className: "space-y-3 font-mono text-xs text-gray-600", children: [_jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: "text-gray-400 font-sans text-xs font-medium", children: "Submission ID" }), _jsx("code", { className: "bg-gray-50 px-3 py-1.5 rounded-lg break-all", children: detail.submissionId })] }), _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: "text-gray-400 font-sans text-xs font-medium", children: "Client Attempt ID" }), _jsx("code", { className: "bg-gray-50 px-3 py-1.5 rounded-lg break-all", children: detail.clientAttemptId })] }), _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: "text-gray-400 font-sans text-xs font-medium", children: "Payload Hash (SHA-256)" }), _jsx("code", { className: "bg-gray-50 px-3 py-1.5 rounded-lg break-all", children: detail.payloadHash })] }), _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: "text-gray-400 font-sans text-xs font-medium", children: "Idempotency Key" }), _jsx("code", { className: "bg-gray-50 px-3 py-1.5 rounded-lg break-all", children: detail.idempotencyKey })] })] })] }), _jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-6", children: [_jsxs("h2", { className: "font-semibold text-gray-900 mb-4", children: ["Answers (", detail.answers.length, " questions)"] }), _jsx("div", { className: "space-y-4", children: detail.answers.map((a, i) => (_jsx("div", { className: `p-4 rounded-xl border-2 ${a.isCorrect ? 'border-success/30 bg-success/5' : 'border-danger/30 bg-danger/5'}`, children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("span", { className: `w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${a.isCorrect ? 'bg-success text-white' : 'bg-danger text-white'}`, children: i + 1 }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-medium text-gray-900 text-sm", children: a.prompt }), _jsxs("div", { className: "mt-2 grid grid-cols-1 md:grid-cols-2 gap-2", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-500 mb-0.5", children: "Student answered" }), _jsx("p", { className: `text-sm font-medium ${a.isCorrect ? 'text-success' : 'text-danger'}`, children: a.selectedOptionText })] }), !a.isCorrect && (_jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-500 mb-0.5", children: "Correct answer" }), _jsx("p", { className: "text-sm font-medium text-success", children: a.correctOptionText })] }))] })] }), _jsx("span", { className: `text-lg ${a.isCorrect ? 'text-success' : 'text-danger'}`, children: a.isCorrect ? '✓' : '✗' })] }) }, a.questionId))) })] })] }));
}
//# sourceMappingURL=SubmissionDetailPage.js.map