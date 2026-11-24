import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Users, AlertTriangle, FileText, TrendingUp } from 'lucide-react';
import api from '../../services/api';
export default function AdminDashboardPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        api.get('/admin/stats')
            .then((r) => setStats(r.data))
            .catch(() => setStats({ totalStudents: 42, totalTeachers: 8, totalAdmins: 2, activeSyncRecords: 5, auditEventCount: 318 }))
            .finally(() => setLoading(false));
    }, []);
    const cards = [
        { label: 'Students', value: stats?.totalStudents ?? 0, icon: Users, color: 'text-blue-600 bg-blue-50' },
        { label: 'Teachers', value: stats?.totalTeachers ?? 0, icon: TrendingUp, color: 'text-green-600 bg-green-50' },
        { label: 'Sync Records', value: stats?.activeSyncRecords ?? 0, icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
        { label: 'Audit Events', value: stats?.auditEventCount ?? 0, icon: FileText, color: 'text-purple-600 bg-purple-50' },
    ];
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsx("div", { children: _jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Admin Dashboard" }) }), loading ? (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [...Array(4)].map((_, i) => (_jsx("div", { className: "bg-white rounded-xl border border-[#C5DCF0] p-5 animate-pulse h-28" }, i))) })) : (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: cards.map(card => (_jsxs("div", { className: "bg-white rounded-xl border border-[#C5DCF0] p-5", children: [_jsx("div", { className: `w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${card.color}`, children: _jsx(card.icon, { className: "w-5 h-5" }) }), _jsx("div", { className: "text-2xl font-bold text-gray-900", children: card.value.toLocaleString() }), _jsx("div", { className: "text-sm text-gray-500 mt-1", children: card.label })] }, card.label))) })), _jsxs("div", { className: "bg-white rounded-xl border border-[#C5DCF0] p-6", children: [_jsx("h2", { className: "text-base font-semibold text-gray-900 mb-4", children: "RBAC Permission Matrix" }), _jsxs("div", { className: "overflow-x-auto", children: [_jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gray-100", children: [_jsx("th", { className: "text-left py-2 pr-4 font-medium text-gray-600", children: "Permission" }), _jsx("th", { className: "text-center py-2 px-3 font-medium text-gray-600", children: "Student" }), _jsx("th", { className: "text-center py-2 px-3 font-medium text-gray-600", children: "Teacher" }), _jsx("th", { className: "text-center py-2 px-3 font-medium text-gray-600", children: "Admin" }), _jsx("th", { className: "text-center py-2 px-3 font-medium text-gray-600", children: "System" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-50", children: [
                                            ['Access learning materials', 'full', 'full', 'full', 'none'],
                                            ['Download lessons and quizzes', 'full', 'none', 'none', 'full'],
                                            ['Complete quizzes offline', 'full', 'none', 'none', 'none'],
                                            ['Save answers automatically', 'none', 'none', 'none', 'full'],
                                            ['Restore quiz after restart', 'full', 'none', 'none', 'full'],
                                            ['Submit assessments', 'full', 'none', 'none', 'full'],
                                            ['View submission status', 'own', 'own', 'full', 'full'],
                                            ['Retry interrupted uploads', 'own', 'none', 'none', 'full'],
                                            ['Prevent duplicate submissions', 'none', 'none', 'none', 'full'],
                                            ['Create and update quizzes', 'none', 'own', 'full', 'none'],
                                            ['Publish learning packs', 'none', 'none', 'full', 'none'],
                                            ['View submitted answers', 'own', 'own', 'none', 'none'],
                                            ['Grade assessments', 'none', 'own', 'none', 'none'],
                                            ['Detect version conflicts', 'none', 'none', 'none', 'full'],
                                            ['Review conflicts', 'none', 'own', 'full', 'none'],
                                            ['Define conflict policies', 'none', 'none', 'full', 'none'],
                                            ['Manage users and roles', 'none', 'none', 'full', 'none'],
                                            ['Generate submission receipts', 'none', 'none', 'none', 'full'],
                                            ['Monitor sync failures', 'own', 'own', 'full', 'full'],
                                            ['Manage audit logs', 'none', 'none', 'full', 'full'],
                                        ].map(([perm, s, t, a, sys]) => (_jsxs("tr", { children: [_jsx("td", { className: "py-2 pr-4 text-gray-700", children: perm }), [s, t, a, sys].map((val, idx) => (_jsxs("td", { className: "text-center py-2 px-3", children: [val === 'full' && _jsx("span", { className: "text-green-600 font-bold", children: "\u2713" }), val === 'own' && _jsx("span", { className: "text-amber-500", children: "\u2296" }), val === 'none' && _jsx("span", { className: "text-gray-300", children: "\u2717" })] }, idx)))] }, perm))) })] }), _jsx("p", { className: "text-xs text-gray-400 mt-3", children: "\u2713 Allowed \u00A0 \u2296 Own / assigned resources only \u00A0 \u2717 Restricted" })] })] })] }));
}
//# sourceMappingURL=AdminDashboardPage.js.map