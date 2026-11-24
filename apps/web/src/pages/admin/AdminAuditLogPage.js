import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Download, Filter } from 'lucide-react';
import api from '../../services/api';
const MOCK_EVENTS = [
    { id: '1', actorId: 's1', actorName: 'Aarav Sharma', eventType: 'submission.created', correlationId: 'corr-001', clientAttemptId: 'ca-001', idempotencyKey: 'ik-001', metadata: { quizId: 'q1' }, createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: '2', actorId: 's2', actorName: 'Diya Patel', eventType: 'submission.duplicate_blocked', correlationId: 'corr-002', clientAttemptId: 'ca-002', idempotencyKey: 'ik-002', metadata: {}, createdAt: new Date(Date.now() - 7200000).toISOString() },
    { id: '3', actorId: 's1', actorName: 'Aarav Sharma', eventType: 'submission.created', correlationId: 'corr-003', clientAttemptId: 'ca-003', idempotencyKey: 'ik-003', metadata: { quizId: 'q2' }, createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: '4', actorId: null, actorName: 'System', eventType: 'sync.retry_attempted', correlationId: 'corr-004', clientAttemptId: null, idempotencyKey: 'ik-001', metadata: { retryCount: 1 }, createdAt: new Date(Date.now() - 1800000).toISOString() },
    { id: '5', actorId: 's3', actorName: 'Priya Singh', eventType: 'submission.created', correlationId: 'corr-005', clientAttemptId: 'ca-005', idempotencyKey: 'ik-005', metadata: { quizId: 'q3' }, createdAt: new Date(Date.now() - 43200000).toISOString() },
];
const EVENT_COLORS = {
    'submission.created': 'bg-green-100 text-green-700',
    'submission.duplicate_blocked': 'bg-red-100 text-red-700',
    'sync.retry_attempted': 'bg-amber-100 text-amber-700',
};
export default function AdminAuditLogPage() {
    const [events, setEvents] = useState(MOCK_EVENTS);
    const [typeFilter, setTypeFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        api.get('/admin/audit-logs')
            .then((r) => { if (r.data?.length > 0)
            setEvents(r.data); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);
    const eventTypes = Array.from(new Set(events.map(e => e.eventType)));
    const filtered = typeFilter === 'all' ? events : events.filter(e => e.eventType === typeFilter);
    const exportCsv = () => {
        const rows = [['ID', 'Actor', 'Event Type', 'Correlation ID', 'Created At']];
        filtered.forEach(e => rows.push([e.id, e.actorName ?? '', e.eventType, e.correlationId ?? '', e.createdAt]));
        const csv = rows.map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit-log-${Date.now()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { children: _jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Audit Logs" }) }), _jsxs("button", { onClick: exportCsv, className: "flex items-center gap-2 px-4 py-2 bg-[#1B7FC9] text-white rounded-lg text-sm font-medium hover:bg-[#1668a8] transition-colors", children: [_jsx(Download, { className: "w-4 h-4" }), "Export CSV"] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Filter, { className: "w-4 h-4 text-gray-400" }), _jsxs("select", { className: "px-3 py-2 border border-[#C5DCF0] rounded-lg text-sm bg-white focus:outline-none", value: typeFilter, onChange: e => setTypeFilter(e.target.value), children: [_jsx("option", { value: "all", children: "All Event Types" }), eventTypes.map(t => _jsx("option", { value: t, children: t }, t))] }), _jsxs("span", { className: "text-sm text-gray-500", children: [filtered.length, " events"] })] }), loading ? (_jsx("div", { className: "bg-white rounded-xl border border-[#C5DCF0] h-64 animate-pulse" })) : (_jsxs("div", { className: "bg-white rounded-xl border border-[#C5DCF0] overflow-hidden", children: [_jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-[#F0F5FA] border-b border-[#C5DCF0]", children: _jsxs("tr", { children: [_jsx("th", { className: "text-left px-4 py-3 font-medium text-gray-600", children: "Event Type" }), _jsx("th", { className: "text-left px-4 py-3 font-medium text-gray-600", children: "Actor" }), _jsx("th", { className: "text-left px-4 py-3 font-medium text-gray-600", children: "Correlation ID" }), _jsx("th", { className: "text-left px-4 py-3 font-medium text-gray-600", children: "Idempotency Key" }), _jsx("th", { className: "text-left px-4 py-3 font-medium text-gray-600", children: "Timestamp" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-50", children: filtered.map(event => (_jsxs("tr", { className: "hover:bg-[#F8FBFF]", children: [_jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex px-2 py-0.5 rounded text-xs font-medium ${EVENT_COLORS[event.eventType] ?? 'bg-gray-100 text-gray-700'}`, children: event.eventType }) }), _jsx("td", { className: "px-4 py-3 text-gray-700", children: event.actorName ?? 'System' }), _jsx("td", { className: "px-4 py-3 font-mono text-xs text-gray-500", children: event.correlationId ?? '—' }), _jsx("td", { className: "px-4 py-3 font-mono text-xs text-gray-500", children: event.idempotencyKey ?? '—' }), _jsx("td", { className: "px-4 py-3 text-gray-500", children: new Date(event.createdAt).toLocaleString() })] }, event.id))) })] }), filtered.length === 0 && (_jsx("div", { className: "text-center py-10 text-gray-400 text-sm", children: "No audit events found" }))] }))] }));
}
//# sourceMappingURL=AdminAuditLogPage.js.map