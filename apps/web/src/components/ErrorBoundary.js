import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Unhandled React Error:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-slate-50 p-6", children: _jsxs("div", { className: "card max-w-lg w-full text-center p-8 bg-white shadow-xl rounded-2xl border border-slate-200", children: [_jsx("div", { className: "w-14 h-14 rounded-2xl bg-[#E1F0FA] text-[#1B7FC9] border border-[#CBE4F6] flex items-center justify-center mx-auto mb-4 shadow-xs", children: _jsx(AlertTriangle, { size: 28 }) }), _jsx("h2", { className: "text-xl font-bold text-slate-900 mb-2", children: "Something went wrong" }), _jsx("p", { className: "text-sm text-slate-500 mb-6", children: this.state.error?.message || 'An unexpected error occurred while loading this view.' }), _jsxs("div", { className: "flex gap-3 justify-center", children: [_jsx("button", { onClick: () => window.location.reload(), className: "btn-primary text-xs py-2.5 px-4 font-bold", children: "Reload Page" }), _jsx("button", { onClick: () => { window.location.href = '/dashboard'; }, className: "btn-outline text-xs py-2.5 px-4 font-bold", children: "Return to Dashboard" })] })] }) }));
        }
        return this.props.children;
    }
}
//# sourceMappingURL=ErrorBoundary.js.map