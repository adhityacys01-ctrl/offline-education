import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import api from '../../services/api';
const ROLE_COLORS = {
    student: 'bg-blue-100 text-blue-700',
    teacher: 'bg-green-100 text-green-700',
    admin: 'bg-purple-100 text-purple-700',
};
const MOCK_USERS = [
    { id: '1', name: 'Aarav Sharma', email: 'aarav@student.com', role: 'student', createdAt: '2024-11-01T00:00:00Z' },
    { id: '2', name: 'Diya Patel', email: 'diya@student.com', role: 'student', createdAt: '2024-11-02T00:00:00Z' },
    { id: '3', name: 'Rohan Mehta', email: 'teacher@school.com', role: 'teacher', createdAt: '2024-10-15T00:00:00Z' },
    { id: '4', name: 'Admin User', email: 'admin@school.com', role: 'admin', createdAt: '2024-10-01T00:00:00Z' },
    { id: '5', name: 'Priya Singh', email: 'priya@student.com', role: 'student', createdAt: '2024-11-10T00:00:00Z' },
    { id: '6', name: 'Arjun Kumar', email: 'arjun@student.com', role: 'student', createdAt: '2024-11-12T00:00:00Z' },
];
export default function AdminUsersPage() {
    const [users, setUsers] = useState(MOCK_USERS);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [updating, setUpdating] = useState(null);
    const [showDropdown, setShowDropdown] = useState(null);
    useEffect(() => {
        api.get('/admin/users')
            .then((r) => setUsers(r.data))
            .catch(() => { });
    }, []);
    const filtered = users.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
        const matchRole = roleFilter === 'all' || u.role === roleFilter;
        return matchSearch && matchRole;
    });
    const updateRole = async (userId, newRole) => {
        setUpdating(userId);
        setShowDropdown(null);
        try {
            await api.patch(`/admin/users/${userId}/role`, { role: newRole });
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
        }
        catch {
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
        }
        finally {
            setUpdating(null);
        }
    };
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsx("div", { children: _jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "User Management" }) }), _jsxs("div", { className: "flex gap-3", children: [_jsxs("div", { className: "relative flex-1 max-w-sm", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }), _jsx("input", { className: "w-full pl-9 pr-3 py-2 border border-[#C5DCF0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]/30", placeholder: "Search users...", value: search, onChange: e => setSearch(e.target.value) })] }), _jsxs("select", { className: "px-3 py-2 border border-[#C5DCF0] rounded-lg text-sm bg-white focus:outline-none", value: roleFilter, onChange: e => setRoleFilter(e.target.value), children: [_jsx("option", { value: "all", children: "All Roles" }), _jsx("option", { value: "student", children: "Students" }), _jsx("option", { value: "teacher", children: "Teachers" }), _jsx("option", { value: "admin", children: "Admins" })] })] }), _jsxs("div", { className: "bg-white rounded-xl border border-[#C5DCF0] overflow-hidden", children: [_jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-[#F0F5FA] border-b border-[#C5DCF0]", children: _jsxs("tr", { children: [_jsx("th", { className: "text-left px-4 py-3 font-medium text-gray-600", children: "Name" }), _jsx("th", { className: "text-left px-4 py-3 font-medium text-gray-600", children: "Email" }), _jsx("th", { className: "text-left px-4 py-3 font-medium text-gray-600", children: "Role" }), _jsx("th", { className: "text-left px-4 py-3 font-medium text-gray-600", children: "Joined" }), _jsx("th", { className: "text-left px-4 py-3 font-medium text-gray-600", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-50", children: filtered.map(user => (_jsxs("tr", { className: "hover:bg-[#F8FBFF]", children: [_jsx("td", { className: "px-4 py-3", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-[#1B7FC9] flex items-center justify-center text-white text-xs font-semibold", children: user.name.charAt(0) }), _jsx("span", { className: "font-medium text-gray-900", children: user.name })] }) }), _jsx("td", { className: "px-4 py-3 text-gray-600", children: user.email }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex px-2 py-0.5 rounded text-xs font-medium ${ROLE_COLORS[user.role]}`, children: user.role }) }), _jsx("td", { className: "px-4 py-3 text-gray-500", children: new Date(user.createdAt).toLocaleDateString() }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setShowDropdown(showDropdown === user.id ? null : user.id), disabled: updating === user.id, className: "flex items-center gap-1 px-3 py-1.5 border border-[#C5DCF0] rounded-lg text-xs text-gray-700 hover:bg-[#F0F5FA] transition-colors", children: ["Change Role ", _jsx(ChevronDown, { className: "w-3 h-3" })] }), showDropdown === user.id && (_jsx("div", { className: "absolute right-0 mt-1 w-36 bg-white border border-[#C5DCF0] rounded-lg shadow-lg z-10 overflow-hidden", children: ['student', 'teacher', 'admin'].filter(r => r !== user.role).map(role => (_jsx("button", { onClick: () => updateRole(user.id, role), className: "w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-[#F0F5FA] capitalize", children: role }, role))) }))] }) })] }, user.id))) })] }), filtered.length === 0 && (_jsx("div", { className: "text-center py-10 text-gray-400 text-sm", children: "No users found" }))] })] }));
}
//# sourceMappingURL=AdminUsersPage.js.map