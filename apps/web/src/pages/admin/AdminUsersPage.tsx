import { useState, useEffect } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import api from '../../services/api'

interface AdminUser {
  id: string
  email: string
  name: string
  role: 'student' | 'teacher' | 'admin'
  createdAt: string
}

const ROLE_COLORS: Record<string, string> = {
  student: 'bg-blue-100 text-blue-700',
  teacher: 'bg-green-100 text-green-700',
  admin: 'bg-purple-100 text-purple-700',
}

const MOCK_USERS: AdminUser[] = [
  { id: '1', name: 'Aarav Sharma', email: 'aarav@student.com', role: 'student', createdAt: '2024-11-01T00:00:00Z' },
  { id: '2', name: 'Diya Patel', email: 'diya@student.com', role: 'student', createdAt: '2024-11-02T00:00:00Z' },
  { id: '3', name: 'Rohan Mehta', email: 'teacher@school.com', role: 'teacher', createdAt: '2024-10-15T00:00:00Z' },
  { id: '4', name: 'Admin User', email: 'admin@school.com', role: 'admin', createdAt: '2024-10-01T00:00:00Z' },
  { id: '5', name: 'Priya Singh', email: 'priya@student.com', role: 'student', createdAt: '2024-11-10T00:00:00Z' },
  { id: '6', name: 'Arjun Kumar', email: 'arjun@student.com', role: 'student', createdAt: '2024-11-12T00:00:00Z' },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_USERS)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [updating, setUpdating] = useState<string | null>(null)
  const [showDropdown, setShowDropdown] = useState<string | null>(null)

  useEffect(() => {
    api.get('/admin/users')
      .then((r: { data: AdminUser[] }) => setUsers(r.data))
      .catch(() => {/* use mock */})
  }, [])

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    return matchSearch && matchRole
  })

  const updateRole = async (userId: string, newRole: 'student' | 'teacher' | 'admin') => {
    setUpdating(userId)
    setShowDropdown(null)
    try {
      await api.patch(`/admin/users/${userId}/role`, { role: newRole })
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
    } catch {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            className="w-full pl-9 pr-3 py-2 border border-[#C5DCF0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1B7FC9]/30"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 border border-[#C5DCF0] rounded-lg text-sm bg-white focus:outline-none"
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="student">Students</option>
          <option value="teacher">Teachers</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-[#C5DCF0] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F0F5FA] border-b border-[#C5DCF0]">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Role</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Joined</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(user => (
              <tr key={user.id} className="hover:bg-[#F8FBFF]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1B7FC9] flex items-center justify-center text-white text-xs font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${ROLE_COLORS[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(showDropdown === user.id ? null : user.id)}
                      disabled={updating === user.id}
                      className="flex items-center gap-1 px-3 py-1.5 border border-[#C5DCF0] rounded-lg text-xs text-gray-700 hover:bg-[#F0F5FA] transition-colors"
                    >
                      Change Role <ChevronDown className="w-3 h-3" />
                    </button>
                    {showDropdown === user.id && (
                      <div className="absolute right-0 mt-1 w-36 bg-white border border-[#C5DCF0] rounded-lg shadow-lg z-10 overflow-hidden">
                        {(['student', 'teacher', 'admin'] as const).filter(r => r !== user.role).map(role => (
                          <button
                            key={role}
                            onClick={() => updateRole(user.id, role)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-[#F0F5FA] capitalize"
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">No users found</div>
        )}
      </div>
    </div>
  )
}
