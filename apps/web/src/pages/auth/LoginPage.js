import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
export function LoginPage({ initialSignup = false }) {
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();
    const [isSignup, setIsSignup] = useState(initialSignup);
    const [role, setRole] = useState('student');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('aarav@student.com');
    const [password, setPassword] = useState('password123');
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
        setError(null);
        if (!isSignup) {
            if (selectedRole === 'admin') {
                setEmail('admin@school.com');
                setPassword('password123');
            }
            else if (selectedRole === 'teacher') {
                setEmail('teacher@school.com');
                setPassword('password123');
            }
            else {
                setEmail('aarav@student.com');
                setPassword('password123');
            }
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        const endpoint = isSignup ? '/api/v1/auth/signup' : '/api/v1/auth/login';
        const payload = isSignup
            ? { name, email, password, role }
            : { email, password, role };
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                let msg = 'Authentication failed';
                try {
                    const data = await res.json();
                    msg = Array.isArray(data.message) ? data.message.join(', ') : (data.message || msg);
                }
                catch {
                    msg = res.statusText || msg;
                }
                throw new Error(msg);
            }
            const data = await res.json();
            setAuth(data.user, data.accessToken);
            navigate(data.user.role === 'admin' ? '/admin' :
                data.user.role === 'teacher' ? '/teacher/dashboard' :
                    '/dashboard');
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Authentication failed');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "animate-fade-in", children: [_jsx("h2", { className: "text-xl font-bold text-slate-900 mb-5", children: isSignup ? 'Create Account' : 'Welcome Back' }), _jsx("div", { className: "flex bg-[#F4F8FC] border border-[#D7E5F0] rounded-xl p-1 mb-5", children: ['student', 'teacher', 'admin'].map((r) => (_jsx("button", { type: "button", onClick: () => handleRoleChange(r), className: `flex-1 py-2 text-xs font-semibold rounded-lg capitalize transition-all ${role === r
                        ? 'bg-white shadow-xs text-[#1465A3] font-bold border border-[#CBE4F6]'
                        : 'text-slate-500 hover:text-slate-700'}`, children: r }, r))) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [error && (_jsx("div", { className: "p-3 bg-danger/10 border border-danger/20 rounded-xl text-xs text-danger-dark font-medium", children: error })), isSignup && (_jsxs("div", { className: "relative", children: [_jsx(User, { size: 15, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" }), _jsx("input", { type: "text", required: true, placeholder: "Full Name", value: name, onChange: (e) => setName(e.target.value), className: "input pl-10" })] })), _jsxs("div", { className: "relative", children: [_jsx(Mail, { size: 15, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" }), _jsx("input", { type: "email", required: true, placeholder: "Email Address", value: email, onChange: (e) => setEmail(e.target.value), className: "input pl-10" })] }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { size: 15, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" }), _jsx("input", { type: showPw ? 'text' : 'password', required: true, minLength: 6, placeholder: isSignup ? 'Password (min. 6 characters)' : 'Password', value: password, onChange: (e) => setPassword(e.target.value), className: "input pl-10 pr-10" }), _jsx("button", { type: "button", onClick: () => setShowPw(!showPw), className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors", children: showPw ? _jsx(EyeOff, { size: 15 }) : _jsx(Eye, { size: 15 }) })] }), !isSignup && (_jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsxs("label", { className: "flex items-center gap-2 cursor-pointer text-slate-600", children: [_jsx("input", { type: "checkbox", className: "rounded accent-[#1B7FC9]" }), _jsx("span", { children: "Remember Me" })] }), _jsx("button", { type: "button", className: "text-[#1B7FC9] hover:underline font-semibold", children: "Forgot Password?" })] })), _jsx("button", { type: "submit", disabled: loading, className: "btn-primary w-full mt-2", children: loading
                            ? (isSignup ? 'Creating Account...' : 'Signing in...')
                            : (isSignup ? 'Create Account' : 'Sign In') })] }), _jsxs("div", { className: "relative my-5", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-[#D7E5F0]" }) }), _jsx("div", { className: "relative flex justify-center text-xs text-slate-400", children: _jsx("span", { className: "bg-white px-2", children: "Or continue with" }) })] }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: ['Google', 'Microsoft'].map((label) => (_jsx("button", { type: "button", className: "btn-outline text-xs py-2", children: label }, label))) }), _jsx("p", { className: "text-center text-xs text-slate-500 mt-6", children: isSignup ? (_jsxs(_Fragment, { children: ["Already have an account?", ' ', _jsx("span", { onClick: () => { setIsSignup(false); setError(null); }, className: "text-[#1B7FC9] font-semibold cursor-pointer hover:underline", children: "Sign In" })] })) : (_jsxs(_Fragment, { children: ["Don't have an account?", ' ', _jsx("span", { onClick: () => { setIsSignup(true); setError(null); }, className: "text-[#1B7FC9] font-semibold cursor-pointer hover:underline", children: "Create Account" })] })) })] }));
}
//# sourceMappingURL=LoginPage.js.map