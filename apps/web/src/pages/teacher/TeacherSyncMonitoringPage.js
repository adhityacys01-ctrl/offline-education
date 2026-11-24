import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { RefreshCw, CheckCircle2, Clock, AlertTriangle, Search, X } from 'lucide-react';
const SYNC_ITEMS = [
    {
        id: 'sync-1',
        studentName: 'Aarav Sharma',
        grade: 'Class 10',
        course: 'Mathematics',
        quizTitle: 'Algebraic Expressions & Polynomials',
        status: 'Synchronized',
        clientAttemptId: 'ca-8472-aarav-math',
        receiptHash: 'sha256-receipt-a749bf841bce82e9',
        lastSyncAt: '10 min ago',
        retryCount: 0,
    },
    {
        id: 'sync-2',
        studentName: 'Diya Patel',
        grade: 'Class 10',
        course: 'Science',
        quizTitle: 'Cell Biology & Living Systems',
        status: 'Synchronized',
        clientAttemptId: 'ca-9214-diya-science',
        receiptHash: 'sha256-receipt-f923b7194a2b9183',
        lastSyncAt: '25 min ago',
        retryCount: 0,
    },
    {
        id: 'sync-3',
        studentName: 'Rohan Mehta',
        grade: 'Class 10',
        course: 'History',
        quizTitle: 'Ancient Civilizations of India',
        status: 'Pending',
        clientAttemptId: 'ca-1082-rohan-history',
        receiptHash: 'Pending server response',
        lastSyncAt: 'Offline queued (2 hrs ago)',
        retryCount: 1,
    },
    {
        id: 'sync-4',
        studentName: 'Sneha Iyer',
        grade: 'Class 10',
        course: 'Environmental Science',
        quizTitle: 'Ecology & Natural Habitats',
        status: 'Action Required',
        clientAttemptId: 'ca-4102-sneha-envs',
        receiptHash: 'Network socket closed',
        lastSyncAt: 'Retrying with backoff (5s)',
        retryCount: 3,
    },
];
export default function TeacherSyncMonitoringPage() {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [items, setItems] = useState(SYNC_ITEMS);
    const [inspectItem, setInspectItem] = useState(null);
    const [reconcilingId, setReconcilingId] = useState(null);
    const filteredItems = items.filter((item) => {
        const matchesFilter = filter === 'All' || item.status === filter;
        const matchesSearch = item.studentName.toLowerCase().includes(search.toLowerCase()) ||
            item.course.toLowerCase().includes(search.toLowerCase()) ||
            item.quizTitle.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });
    const syncCounts = {
        all: items.length,
        synced: items.filter((i) => i.status === 'Synchronized').length,
        pending: items.filter((i) => i.status === 'Pending').length,
        attention: items.filter((i) => i.status === 'Action Required').length,
    };
    const handleForceReconcile = (id) => {
        setReconcilingId(id);
        setTimeout(() => {
            setItems((prev) => prev.map((i) => i.id === id
                ? {
                    ...i,
                    status: 'Synchronized',
                    receiptHash: `sha256-receipt-reconciled-${Date.now().toString(16)}`,
                    lastSyncAt: 'Just now',
                    retryCount: 0,
                }
                : i));
            setReconcilingId(null);
        }, 1000);
    };
    return (_jsxs("div", { className: "space-y-6 max-w-5xl mx-auto pb-10", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight", children: "Sync Monitoring" }), _jsxs("button", { onClick: () => {
                            setItems((prev) => prev.map((i) => (i.status === 'Pending' ? { ...i, lastSyncAt: 'Refreshed' } : i)));
                        }, className: "px-3.5 py-2 rounded-xl bg-white dark:bg-[#131F33] border border-[#D7E5F0] dark:border-[#1E2D48] text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-[#1B7FC9] flex items-center gap-1.5 shadow-xs transition-all", children: [_jsx(RefreshCw, { size: 14 }), "Refresh Sync State"] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [_jsxs("div", { onClick: () => setFilter('Synchronized'), className: `p-5 rounded-2xl border transition-all cursor-pointer ${filter === 'Synchronized'
                            ? 'bg-emerald-50/80 border-emerald-500 shadow-xs'
                            : 'bg-white dark:bg-[#131F33] border-[#D7E5F0] dark:border-[#1E2D48] hover:border-emerald-300'}`, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs font-bold text-slate-600 dark:text-slate-300", children: "Synchronized" }), _jsx("div", { className: "w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center", children: _jsx(CheckCircle2, { size: 16 }) })] }), _jsx("p", { className: "text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2", children: syncCounts.synced })] }), _jsxs("div", { onClick: () => setFilter('Pending'), className: `p-5 rounded-2xl border transition-all cursor-pointer ${filter === 'Pending'
                            ? 'bg-amber-50/80 border-amber-500 shadow-xs'
                            : 'bg-white dark:bg-[#131F33] border-[#D7E5F0] dark:border-[#1E2D48] hover:border-amber-300'}`, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs font-bold text-slate-600 dark:text-slate-300", children: "Pending Upload" }), _jsx("div", { className: "w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center", children: _jsx(Clock, { size: 16 }) })] }), _jsx("p", { className: "text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2", children: syncCounts.pending })] }), _jsxs("div", { onClick: () => setFilter('Action Required'), className: `p-5 rounded-2xl border transition-all cursor-pointer ${filter === 'Action Required'
                            ? 'bg-rose-50/80 border-rose-500 shadow-xs'
                            : 'bg-white dark:bg-[#131F33] border-[#D7E5F0] dark:border-[#1E2D48] hover:border-rose-300'}`, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs font-bold text-slate-600 dark:text-slate-300", children: "Requires Attention" }), _jsx("div", { className: "w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center", children: _jsx(AlertTriangle, { size: 16 }) })] }), _jsx("p", { className: "text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2", children: syncCounts.attention })] })] }), _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [_jsx("div", { className: "flex items-center gap-2", children: ['All', 'Synchronized', 'Pending', 'Action Required'].map((tab) => (_jsx("button", { onClick: () => setFilter(tab), className: `px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filter === tab
                                ? 'bg-[#1B7FC9] text-white shadow-xs'
                                : 'bg-white dark:bg-[#131F33] border border-[#D7E5F0] dark:border-[#1E2D48] text-slate-600 dark:text-slate-300 hover:border-[#1B7FC9]'}`, children: tab }, tab))) }), _jsxs("div", { className: "relative min-w-[220px]", children: [_jsx(Search, { size: 14, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search student or quiz...", value: search, onChange: (e) => setSearch(e.target.value), className: "w-full pl-9 pr-3.5 py-1.5 bg-white dark:bg-[#131F33] border border-[#D7E5F0] dark:border-[#1E2D48] rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]" })] })] }), _jsx("div", { className: "bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] overflow-hidden shadow-xs", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-[#D7E5F0] dark:border-[#1E2D48] bg-[#F8FAFC] dark:bg-[#0E1726]/50", children: [_jsx("th", { className: "py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300", children: "Student" }), _jsx("th", { className: "py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300", children: "Assessment" }), _jsx("th", { className: "py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300", children: "Sync Status" }), _jsx("th", { className: "py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300", children: "Last Sync" }), _jsx("th", { className: "py-3.5 px-5 text-xs font-bold text-slate-600 dark:text-slate-300 text-right", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-[#EBF2F7] dark:divide-[#1A2E46]", children: filteredItems.map((item) => (_jsxs("tr", { className: "hover:bg-[#F0F5FA] dark:hover:bg-[#1A2E46]/40 transition-colors", children: [_jsxs("td", { className: "py-4 px-5", children: [_jsx("p", { className: "text-xs font-bold text-slate-900 dark:text-slate-100", children: item.studentName }), _jsxs("p", { className: "text-[11px] text-slate-400 font-medium", children: [item.grade, " \u2022 ", item.course] })] }), _jsx("td", { className: "py-4 px-5", children: _jsx("span", { className: "text-xs font-semibold text-slate-700 dark:text-slate-300", children: item.quizTitle }) }), _jsxs("td", { className: "py-4 px-5", children: [item.status === 'Synchronized' && (_jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400", children: [_jsx(CheckCircle2, { size: 12 }), "Synchronized"] })), item.status === 'Pending' && (_jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400", children: [_jsx(Clock, { size: 12 }), "Pending Upload"] })), item.status === 'Action Required' && (_jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400", children: [_jsx(AlertTriangle, { size: 12 }), "Action Required"] }))] }), _jsx("td", { className: "py-4 px-5 text-xs text-slate-500 font-medium", children: item.lastSyncAt }), _jsxs("td", { className: "py-4 px-5 text-right space-x-2", children: [_jsx("button", { onClick: () => setInspectItem(item), className: "px-2.5 py-1 text-xs font-bold rounded-lg border border-[#D7E5F0] hover:border-[#1B7FC9] text-[#1465A3] dark:text-[#38BDF8] transition-all", children: "Inspect" }), item.status !== 'Synchronized' && (_jsx("button", { onClick: () => handleForceReconcile(item.id), disabled: reconcilingId === item.id, className: "px-2.5 py-1 text-xs font-bold rounded-lg bg-[#1B7FC9] hover:bg-[#1465A3] text-white transition-all", children: reconcilingId === item.id ? 'Reconciling...' : 'Reconcile' }))] })] }, item.id))) })] }) }) }), inspectItem && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4", children: _jsxs("div", { className: "bg-white dark:bg-[#131F33] rounded-2xl border border-[#D7E5F0] dark:border-[#1E2D48] max-w-md w-full p-6 shadow-xl animate-fade-in", children: [_jsxs("div", { className: "flex items-center justify-between pb-3 border-b border-[#D7E5F0] dark:border-[#1E2D48]", children: [_jsx("h2", { className: "text-base font-bold text-slate-900 dark:text-slate-100", children: "Sync Item Verification" }), _jsx("button", { onClick: () => setInspectItem(null), className: "text-slate-400 hover:text-slate-600 p-1 rounded-lg", children: _jsx(X, { size: 18 }) })] }), _jsxs("div", { className: "mt-4 space-y-3 font-mono text-xs", children: [_jsxs("div", { className: "p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0E1726] border border-[#D7E5F0]", children: [_jsx("p", { className: "font-sans font-bold text-slate-700 dark:text-slate-300 text-[11px] mb-1", children: "Student & Course" }), _jsxs("p", { className: "font-sans text-xs text-slate-900 dark:text-slate-100 font-semibold", children: [inspectItem.studentName, " (", inspectItem.grade, ")"] }), _jsx("p", { className: "font-sans text-xs text-slate-500", children: inspectItem.quizTitle })] }), _jsxs("div", { className: "p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0E1726] border border-[#D7E5F0]", children: [_jsx("p", { className: "font-sans font-bold text-slate-700 dark:text-slate-300 text-[11px] mb-1", children: "Client Attempt ID" }), _jsx("p", { className: "break-all text-slate-600 dark:text-slate-300", children: inspectItem.clientAttemptId })] }), _jsxs("div", { className: "p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0E1726] border border-[#D7E5F0]", children: [_jsx("p", { className: "font-sans font-bold text-slate-700 dark:text-slate-300 text-[11px] mb-1", children: "Receipt Hash (SHA-256)" }), _jsx("p", { className: "break-all text-slate-600 dark:text-slate-300", children: inspectItem.receiptHash })] }), _jsxs("div", { className: "p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0E1726] border border-[#D7E5F0]", children: [_jsx("p", { className: "font-sans font-bold text-slate-700 dark:text-slate-300 text-[11px] mb-1", children: "Retry Attempts" }), _jsxs("p", { className: "font-sans text-slate-600 dark:text-slate-300 font-bold", children: [inspectItem.retryCount, " Retries"] })] })] }), _jsx("div", { className: "mt-6 pt-4 border-t border-[#D7E5F0] dark:border-[#1E2D48] flex justify-end", children: _jsx("button", { onClick: () => setInspectItem(null), className: "px-4 py-2 text-xs font-bold rounded-xl bg-[#1B7FC9] hover:bg-[#1465A3] text-white", children: "Close" }) })] }) }))] }));
}
//# sourceMappingURL=TeacherSyncMonitoringPage.js.map