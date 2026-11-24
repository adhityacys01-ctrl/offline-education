import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { CheckCircle, Shield } from 'lucide-react';
import api from '../../services/api';
const FALLBACK = [
    { id: '1', name: 'Server Wins on Version Mismatch', strategy: 'server-wins', description: 'When a submission references a quiz version that has since been superseded, the server records the submission and flags it for conflict review. The student\'s answers are preserved; the teacher reviews them against the current version.', status: 'active' },
    { id: '2', name: 'Idempotent Retry Allowed', strategy: 'idempotent-retry', description: 'If a submission upload is interrupted, the client may resend the identical payload with the same idempotency key. The server replays the cached receipt without creating a duplicate record.', status: 'active' },
    { id: '3', name: 'First Commit Wins on Duplicate Key Conflict', strategy: 'first-commit-wins', description: 'If two requests arrive with different payloads but the same idempotency key, the second request is rejected with IDEMPOTENCY_KEY_REUSE. Only the first committed submission stands.', status: 'active' },
    { id: '4', name: 'Finalized Answers Are Immutable', strategy: 'immutable-finalized', description: 'Once a submission is accepted (status RECEIVED or GRADED), no actor — including administrators — may alter the submitted answers. Changes are rejected at the API layer and logged to the audit trail.', status: 'active' },
    { id: '5', name: 'Offline Content Conflict Notification', strategy: 'notify-on-version-delta', description: 'When the client syncs and the server detects that the downloaded quiz version differs from the current published version, a conflict notification is returned. The student is prompted to re-download the latest pack before starting a new attempt.', status: 'active' },
];
export default function AdminConflictPoliciesPage() {
    const [policies, setPolicies] = useState(FALLBACK);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        api.get('/admin/conflict-policies')
            .then((r) => { if (r.data?.length > 0)
            setPolicies(r.data); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsx("div", { children: _jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Conflict Policies" }) }), _jsxs("div", { className: "bg-white rounded-xl border border-[#C5DCF0] p-4 flex items-start gap-3", children: [_jsx(Shield, { className: "w-5 h-5 text-[#1B7FC9] mt-0.5 flex-shrink-0" }), _jsx("p", { className: "text-sm text-gray-600", children: "These rules govern how the system resolves conflicts between offline client data and server state. All rules are enforced automatically by the synchronization engine." })] }), loading ? (_jsx("div", { className: "space-y-4", children: [...Array(5)].map((_, i) => _jsx("div", { className: "bg-white rounded-xl border border-[#C5DCF0] p-5 h-28 animate-pulse" }, i)) })) : (_jsx("div", { className: "space-y-4", children: policies.map((policy, idx) => (_jsx("div", { className: "bg-white rounded-xl border border-[#C5DCF0] p-5", children: _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex items-start gap-4 flex-1", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-[#E1EEF8] flex items-center justify-center text-[#1B7FC9] font-bold text-sm flex-shrink-0", children: idx + 1 }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: policy.name }), _jsx("code", { className: "text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded", children: policy.strategy })] }), _jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: policy.description })] })] }), _jsxs("span", { className: "flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium flex-shrink-0", children: [_jsx(CheckCircle, { className: "w-3 h-3" }), "Active"] })] }) }, policy.id))) }))] }));
}
//# sourceMappingURL=AdminConflictPoliciesPage.js.map