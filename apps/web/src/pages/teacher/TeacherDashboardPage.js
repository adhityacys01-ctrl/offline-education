import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
export default function TeacherDashboardPage() {
    const { accessToken } = useAuthStore();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/v1/teacher/submissions', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                if (!res.ok)
                    throw new Error(await res.text());
                setSubmissions(await res.json());
            }
            catch (e) {
                setError(String(e));
            }
            finally {
                setLoading(false);
            }
        };
        load();
    }, [accessToken]);
    const filtered = submissions.filter((s) => s.studentName.toLowerCase().includes(search.toLowerCase()) ||
        s.quizTitle.toLowerCase().includes(search.toLowerCase()) ||
        s.courseTitle?.toLowerCase().includes(search.toLowerCase()));
    const total = submissions.length;
    const successful = submissions.filter((s) => s.status === 'GRADED').length;
    const failed = submissions.filter((s) => s.status === 'RECEIVED').length;
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { children: _jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Teacher Dashboard" }) }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [_jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center", children: _jsx("svg", { className: "w-6 h-6 text-brand-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-gray-900", children: total }), _jsx("p", { className: "text-sm text-gray-500", children: "Total Submissions" })] })] }), _jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center", children: _jsx("svg", { className: "w-6 h-6 text-success", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-gray-900", children: successful }), _jsx("p", { className: "text-sm text-gray-500", children: "Graded" })] })] }), _jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center", children: _jsx("svg", { className: "w-6 h-6 text-warning", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-gray-900", children: failed }), _jsx("p", { className: "text-sm text-gray-500", children: "Pending Review" })] })] })] }), _jsxs("div", { className: "bg-white rounded-xl border border-gray-200 overflow-hidden", children: [_jsxs("div", { className: "p-4 border-b border-gray-100 flex items-center justify-between", children: [_jsx("h2", { className: "font-semibold text-gray-900", children: "Submissions" }), _jsx("input", { type: "text", placeholder: "Search student or quiz...", value: search, onChange: (e) => setSearch(e.target.value), className: "border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-brand-500" })] }), loading ? (_jsx("div", { className: "flex items-center justify-center h-40", children: _jsx("div", { className: "w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" }) })) : error ? (_jsx("div", { className: "p-6 text-center text-danger text-sm", children: error })) : filtered.length === 0 ? (_jsx("div", { className: "p-10 text-center text-gray-400 text-sm", children: "No submissions found." })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-gray-50 border-b border-gray-100", children: _jsx("tr", { children: ['Student', 'Course', 'Quiz', 'Version', 'Score', 'Status', 'Submitted At', ''].map((h) => (_jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide", children: h }, h))) }) }), _jsx("tbody", { className: "divide-y divide-gray-50", children: filtered.map((s) => (_jsxs("tr", { className: "hover:bg-gray-50 transition-colors", children: [_jsxs("td", { className: "px-4 py-3", children: [_jsx("div", { className: "font-medium text-gray-900", children: s.studentName }), _jsx("div", { className: "text-xs text-gray-400", children: s.studentEmail })] }), _jsx("td", { className: "px-4 py-3 text-gray-700", children: s.courseTitle || '—' }), _jsx("td", { className: "px-4 py-3 text-gray-700", children: s.quizTitle }), _jsxs("td", { className: "px-4 py-3 text-gray-500", children: ["v", s.quizVersion] }), _jsx("td", { className: "px-4 py-3", children: s.score != null && s.totalQuestions != null ? (_jsxs("span", { className: "font-semibold text-gray-900", children: [s.score, "/", s.totalQuestions] })) : (_jsx("span", { className: "text-gray-400", children: "\u2014" })) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${s.status === 'GRADED'
                                                        ? 'bg-success/10 text-success'
                                                        : 'bg-warning/10 text-warning'}`, children: s.status === 'GRADED' ? 'Graded' : 'Pending' }) }), _jsx("td", { className: "px-4 py-3 text-gray-500 text-xs", children: s.acceptedAt ? new Date(s.acceptedAt).toLocaleString() : '—' }), _jsx("td", { className: "px-4 py-3", children: _jsx(Link, { to: `/teacher/submissions/${s.submissionId}`, className: "text-brand-600 hover:text-brand-700 font-medium text-xs", children: "View \u2192" }) })] }, s.submissionId))) })] }) }))] })] }));
}
//# sourceMappingURL=TeacherDashboardPage.js.map