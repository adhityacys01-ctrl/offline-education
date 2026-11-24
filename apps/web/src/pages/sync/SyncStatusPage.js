import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db/database';
import { retryOutboxItem, retryAllOutboxItems } from '@/services/syncEngine';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useManualSync } from '@/hooks/useSyncEngine';
import { formatRelativeTime } from '@/lib/utils';
import { RefreshCw, CheckCircle, Clock, AlertCircle, Wifi, WifiOff, RotateCcw, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_UI = {
    PENDING: { label: 'Pending sync', badgeCls: 'badge-warning', iconCls: 'bg-warning/10 text-warning-dark' },
    SENDING: { label: 'Syncing…', badgeCls: 'badge-syncing', iconCls: 'bg-syncing/10 text-syncing-dark' },
    SENT: { label: 'Synced', badgeCls: 'badge-success', iconCls: 'bg-success/10 text-success-dark' },
    FAILED_RETRYABLE: { label: 'Sync interrupted', badgeCls: 'badge-danger', iconCls: 'bg-danger/10 text-danger' },
    FAILED_FATAL: { label: 'Needs attention', badgeCls: 'badge-danger', iconCls: 'bg-danger/10 text-danger' },
};
function StatusIcon({ status }) {
    const cls = STATUS_UI[status].iconCls;
    if (status === 'SENDING')
        return _jsx("div", { className: cn('w-9 h-9 rounded-xl flex items-center justify-center', cls), children: _jsx(RefreshCw, { size: 15, className: "animate-spin" }) });
    if (status === 'SENT')
        return _jsx("div", { className: cn('w-9 h-9 rounded-xl flex items-center justify-center', cls), children: _jsx(CheckCircle, { size: 15 }) });
    if (status === 'PENDING')
        return _jsx("div", { className: cn('w-9 h-9 rounded-xl flex items-center justify-center', cls), children: _jsx(Clock, { size: 15 }) });
    return _jsx("div", { className: cn('w-9 h-9 rounded-xl flex items-center justify-center', cls), children: _jsx(AlertCircle, { size: 15 }) });
}
export function SyncStatusPage() {
    const isOnline = useOnlineStatus();
    const { syncNow } = useManualSync();
    const [syncing, setSyncing] = useState(false);
    // Live data from IndexedDB
    const outbox = useLiveQuery(() => db.outbox.orderBy('createdAt').reverse().toArray(), [], []);
    const receipts = useLiveQuery(() => db.syncReceipts.toArray(), [], []);
    const attempts = useLiveQuery(() => db.attempts.toArray(), [], []);
    const pending = outbox.filter((o) => o.status === 'PENDING').length;
    const sending = outbox.filter((o) => o.status === 'SENDING').length;
    const failed = outbox.filter((o) => o.status === 'FAILED_RETRYABLE' || o.status === 'FAILED_FATAL').length;
    const synced = receipts?.length ?? 0;
    const handleSyncNow = useCallback(async () => {
        if (!isOnline || syncing)
            return;
        setSyncing(true);
        try {
            await syncNow();
        }
        finally {
            setTimeout(() => setSyncing(false), 1000);
        }
    }, [isOnline, syncing, syncNow]);
    const handleRetryAll = useCallback(async () => {
        await retryAllOutboxItems();
    }, []);
    const handleRetryItem = useCallback(async (outboxId) => {
        await retryOutboxItem(outboxId);
    }, []);
    // Find quiz title from attempts store
    const getAttemptLabel = (clientAttemptId) => {
        const attempt = attempts?.find((a) => a.clientAttemptId === clientAttemptId);
        return attempt?.quizTitle ?? 'Quiz Submission';
    };
    return (_jsxs("div", { className: "space-y-5 max-w-2xl animate-fade-in", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsx("div", { children: _jsx("h1", { className: "text-xl font-bold text-slate-900", children: "Sync Status" }) }), _jsxs("div", { className: "flex items-center gap-2", children: [failed > 0 && (_jsxs("button", { onClick: handleRetryAll, className: "btn-outline text-sm gap-1.5 py-2", children: [_jsx(RotateCcw, { size: 13 }), " Retry All"] })), _jsxs("button", { onClick: handleSyncNow, disabled: !isOnline || syncing, className: "btn-primary text-sm gap-1.5 py-2 disabled:opacity-50", children: [_jsx(RefreshCw, { size: 13, className: syncing ? 'animate-spin' : '' }), syncing ? 'Syncing…' : 'Sync Now'] })] })] }), _jsxs("div", { className: cn('flex items-center gap-3 p-3 rounded-xl text-sm font-medium', isOnline ? 'bg-success/10 text-success-dark' : 'bg-warning/10 text-warning-dark'), children: [isOnline ? _jsx(Wifi, { size: 16 }) : _jsx(WifiOff, { size: 16 }), _jsx("span", { children: isOnline
                            ? 'You are online — submissions will sync automatically.'
                            : 'You are offline — answers are saved and will sync when connection is restored.' })] }), _jsx("div", { className: "grid grid-cols-4 gap-3", children: [
                    { label: 'Pending', value: pending, cls: 'text-warning-dark', bg: 'bg-warning/10' },
                    { label: 'Syncing', value: sending, cls: 'text-syncing-dark', bg: 'bg-syncing/10' },
                    { label: 'Failed', value: failed, cls: 'text-danger', bg: 'bg-danger/10' },
                    { label: 'Synced', value: synced, cls: 'text-success-dark', bg: 'bg-success/10' },
                ].map(({ label, value, cls, bg }) => (_jsxs("div", { className: cn('card-sm text-center rounded-xl py-3', bg), children: [_jsx("p", { className: cn('text-2xl font-extrabold', cls), children: value }), _jsx("p", { className: "text-xs text-slate-500 mt-0.5", children: label })] }, label))) }), outbox.length === 0 ? (_jsxs("div", { className: "card text-center py-12", children: [_jsx(CheckCircle, { size: 36, className: "text-success mx-auto mb-3" }), _jsx("p", { className: "font-semibold text-slate-700", children: "All caught up!" }), _jsx("p", { className: "text-sm text-slate-500 mt-1", children: "No pending submissions." })] })) : (_jsxs("div", { className: "space-y-3", children: [_jsx("h2", { className: "text-sm font-bold text-slate-700", children: "Outbox Queue" }), outbox.map((item) => {
                        const ui = STATUS_UI[item.status];
                        return (_jsxs("div", { className: "card flex items-center gap-3", children: [_jsx(StatusIcon, { status: item.status }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-semibold text-slate-900 text-sm truncate", children: getAttemptLabel(item.clientAttemptId) }), _jsxs("div", { className: "flex items-center gap-2 flex-wrap mt-0.5", children: [_jsx("span", { className: cn('badge text-xs', ui.badgeCls), children: ui.label }), item.retryCount > 0 && (_jsxs("span", { className: "text-xs text-slate-400", children: ["Attempt #", item.retryCount + 1] }))] }), _jsxs("p", { className: "text-xs text-slate-400 font-mono mt-0.5", children: ["ID: ", item.clientAttemptId.slice(0, 12), "\u2026"] }), item.lastError && item.status !== 'SENT' && (_jsx("p", { className: "text-xs text-danger mt-0.5 truncate", children: item.lastError })), item.status === 'FAILED_RETRYABLE' && item.nextRetryAt > Date.now() && (_jsxs("p", { className: "text-xs text-slate-400 mt-0.5", children: ["Next retry ", formatRelativeTime(new Date(item.nextRetryAt).toISOString())] }))] }), (item.status === 'FAILED_RETRYABLE' || item.status === 'FAILED_FATAL') && (_jsxs("button", { onClick: () => handleRetryItem(item.outboxId), className: "btn-primary text-xs px-3 py-2 gap-1 flex-shrink-0", children: [_jsx(RotateCcw, { size: 11 }), " Retry"] })), item.status === 'SENT' && (_jsx(CheckCircle, { size: 18, className: "text-success flex-shrink-0" }))] }, item.outboxId));
                    })] })), (receipts?.length ?? 0) > 0 && (_jsxs("div", { children: [_jsx("h2", { className: "text-sm font-bold text-slate-700 mb-3", children: "Sync Receipts" }), _jsx("div", { className: "space-y-2", children: receipts?.map((r) => (_jsxs("div", { className: "card-sm flex items-center gap-3 bg-success/5 border border-success/20", children: [_jsx(CheckCircle, { size: 16, className: "text-success flex-shrink-0" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("p", { className: "text-sm font-semibold text-slate-900", children: ["Submission #", r.submissionId.slice(0, 8), "\u2026"] }), _jsxs("p", { className: "text-xs text-slate-500", children: ["Server accepted at ", formatRelativeTime(r.acceptedAt), r.score !== undefined && ` · Score: ${r.score}/${r.totalQuestions}`] }), _jsxs("p", { className: "text-xs text-slate-400 font-mono", children: ["Receipt: ", r.receiptHash.slice(0, 16), "\u2026"] })] })] }, r.clientAttemptId))) })] })), _jsxs("div", { className: "p-4 bg-[#E1F0FA] border border-[#CBE4F6] rounded-xl text-xs text-[#1465A3] flex items-start gap-2 shadow-xs", children: [_jsx(ShieldCheck, { size: 18, className: "flex-shrink-0 text-[#1B7FC9] mt-0.5" }), _jsxs("div", { children: [_jsx("strong", { children: "Your answers are safe." }), " All submissions are durably stored on this device and will retry automatically \u2014 even if you close the app or restart your device."] })] })] }));
}
//# sourceMappingURL=SyncStatusPage.js.map