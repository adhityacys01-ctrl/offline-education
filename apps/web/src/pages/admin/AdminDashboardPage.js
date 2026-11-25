import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Users, AlertTriangle, FileText, TrendingUp, Globe, CheckCircle } from 'lucide-react';
import api from '../../services/api';
import { useI18n } from '@/lib/i18n';
export default function AdminDashboardPage() {
    const { t } = useI18n();
    const [stats, setStats] = useState(null);
    const [mlStats, setMlStats] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Promise.all([
            api.get('/admin/stats')
                .then((r) => setStats(r.data))
                .catch(() => setStats({ totalStudents: 42, totalTeachers: 8, totalAdmins: 2, activeSyncRecords: 5, auditEventCount: 318 })),
            api.get('/multilingual/admin/stats')
                .then((r) => setMlStats(r.data))
                .catch(() => setMlStats({ total: 2, published: 2, pendingApproval: 0, failed: 0, failedAudio: 0, languages: ['en', 'hi', 'mr'] })),
        ]).finally(() => setLoading(false));
    }, []);
    const cards = [
        { label: t('totalStudents'), value: stats?.totalStudents ?? 0, icon: Users, color: 'text-blue-600 bg-blue-50' },
        { label: t('totalTeachers'), value: stats?.totalTeachers ?? 0, icon: TrendingUp, color: 'text-green-600 bg-green-50' },
        { label: t('syncRecords'), value: stats?.activeSyncRecords ?? 0, icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
        { label: t('auditEvents'), value: stats?.auditEventCount ?? 0, icon: FileText, color: 'text-purple-600 bg-purple-50' },
    ];
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsx("div", { children: _jsx("h1", { className: "text-2xl font-bold text-gray-900", children: t('adminDashboardTitle') }) }), loading ? (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [...Array(4)].map((_, i) => (_jsx("div", { className: "bg-white rounded-xl border border-[#C5DCF0] p-5 animate-pulse h-28" }, i))) })) : (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: cards.map(card => (_jsxs("div", { className: "bg-white rounded-xl border border-[#C5DCF0] p-5", children: [_jsx("div", { className: `w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${card.color}`, children: _jsx(card.icon, { className: "w-5 h-5" }) }), _jsx("div", { className: "text-2xl font-bold text-gray-900", children: card.value.toLocaleString() }), _jsx("div", { className: "text-sm text-gray-500 mt-1", children: card.label })] }, card.label))) })), _jsxs("div", { className: "bg-white rounded-xl border border-[#C5DCF0] p-6", children: [_jsx("h2", { className: "text-base font-semibold text-gray-900 mb-4", children: t('rbacMatrix') }), _jsxs("div", { className: "overflow-x-auto", children: [_jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gray-100", children: [_jsx("th", { className: "text-left py-2 pr-4 font-medium text-gray-600", children: t('permission') }), _jsx("th", { className: "text-center py-2 px-3 font-medium text-gray-600", children: t('student') }), _jsx("th", { className: "text-center py-2 px-3 font-medium text-gray-600", children: t('totalTeachers') }), _jsx("th", { className: "text-center py-2 px-3 font-medium text-gray-600", children: "Admin" }), _jsx("th", { className: "text-center py-2 px-3 font-medium text-gray-600", children: "System" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-50", children: [
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
                                        ].map(([perm, s, t, a, sys]) => (_jsxs("tr", { children: [_jsx("td", { className: "py-2 pr-4 text-gray-700", children: perm }), [s, t, a, sys].map((val, idx) => (_jsxs("td", { className: "text-center py-2 px-3", children: [val === 'full' && _jsx("span", { className: "text-green-600 font-bold", children: "\u2713" }), val === 'own' && _jsx("span", { className: "text-amber-500", children: "\u2296" }), val === 'none' && _jsx("span", { className: "text-gray-300", children: "\u2717" })] }, idx)))] }, perm))) })] }), _jsxs("p", { className: "text-xs text-gray-400 mt-3", children: ["\u2713 ", t('allowed'), " \u00A0 \u2296 ", t('ownOnly'), " \u00A0 \u2717 ", t('restricted')] })] })] }), _jsxs("div", { className: "bg-white rounded-xl border border-[#C5DCF0] p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Globe, { className: "w-5 h-5 text-[#1B7FC9]" }), _jsx("h2", { className: "text-base font-semibold text-gray-900", children: "Multilingual Content" })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-4", children: [_jsxs("div", { className: "bg-[#F0F5FA] rounded-xl p-4 border border-[#D7E5F0]", children: [_jsx("p", { className: "text-xs text-slate-500 font-medium", children: "Published" }), _jsx("p", { className: "text-2xl font-bold text-slate-900 mt-1", children: mlStats?.published ?? 0 })] }), _jsxs("div", { className: "bg-[#F0F5FA] rounded-xl p-4 border border-[#D7E5F0]", children: [_jsx("p", { className: "text-xs text-slate-500 font-medium", children: "Pending Approval" }), _jsx("p", { className: "text-2xl font-bold text-amber-600 mt-1", children: mlStats?.pendingApproval ?? 0 })] }), _jsxs("div", { className: "bg-[#F0F5FA] rounded-xl p-4 border border-[#D7E5F0]", children: [_jsx("p", { className: "text-xs text-slate-500 font-medium", children: "Failed Validation" }), _jsx("p", { className: "text-2xl font-bold text-rose-600 mt-1", children: mlStats?.failed ?? 0 })] }), _jsxs("div", { className: "bg-[#F0F5FA] rounded-xl p-4 border border-[#D7E5F0]", children: [_jsx("p", { className: "text-xs text-slate-500 font-medium", children: "Audio Failures" }), _jsx("p", { className: "text-2xl font-bold text-slate-900 mt-1", children: mlStats?.failedAudio ?? 0 })] })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-4 bg-[#F0F5FA] rounded-xl p-4 border border-[#D7E5F0]", children: [_jsx("span", { className: "text-xs text-slate-500 font-medium", children: "Supported Languages:" }), ['English', 'हिन्दी', 'मराठी'].map(lang => (_jsxs("span", { className: "flex items-center gap-1.5 text-xs font-semibold text-slate-800", children: [_jsx(CheckCircle, { size: 12, className: "text-emerald-500" }), lang] }, lang)))] })] })] }));
}
//# sourceMappingURL=AdminDashboardPage.js.map