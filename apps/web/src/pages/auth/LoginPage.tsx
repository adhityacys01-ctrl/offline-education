import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'

type Role = 'student' | 'teacher'

interface LoginPageProps {
  initialSignup?: boolean
}

export function LoginPage({ initialSignup = false }: LoginPageProps) {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const [isSignup, setIsSignup] = useState(initialSignup)
  const [role, setRole]         = useState<Role>('student')
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('aarav@student.com')
  const [password, setPassword] = useState('password123')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)

  const handleRoleChange = (selectedRole: Role) => {
    setRole(selectedRole)
    setError(null)
    if (!isSignup) {
      if (selectedRole === 'teacher') {
        setEmail('teacher@school.com')
        setPassword('password123')
      } else {
        setEmail('aarav@student.com')
        setPassword('password123')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const endpoint = isSignup ? '/api/v1/auth/signup' : '/api/v1/auth/login'
    const payload = isSignup
      ? { name, email, password, role }
      : { email, password, role }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        let msg = 'Authentication failed'
        try {
          const data = await res.json()
          msg = Array.isArray(data.message) ? data.message.join(', ') : (data.message || msg)
        } catch {
          msg = res.statusText || msg
        }
        throw new Error(msg)
      }

      const data = await res.json()
      setAuth(data.user, data.accessToken)
      navigate(data.user.role === 'teacher' ? '/teacher/dashboard' : '/dashboard')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-slate-900 mb-5">
        {isSignup ? 'Create Account' : 'Welcome Back'}
      </h2>

      {/* Role tabs */}
      <div className="flex bg-[#F4F8FC] border border-[#D7E5F0] rounded-xl p-1 mb-5">
        {(['student', 'teacher'] as Role[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => handleRoleChange(r)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg capitalize transition-all ${
              role === r
                ? 'bg-white shadow-xs text-[#1465A3] font-bold border border-[#CBE4F6]'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-danger/10 border border-danger/20 rounded-xl text-xs text-danger-dark font-medium">
            {error}
          </div>
        )}

        {/* Full Name for Signup */}
        {isSignup && (
          <div className="relative">
            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input pl-10"
            />
          </div>
        )}

        {/* Email */}
        <div className="relative">
          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input pl-10"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type={showPw ? 'text' : 'password'}
            required
            minLength={6}
            placeholder={isSignup ? 'Password (min. 6 characters)' : 'Password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>

        {!isSignup && (
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600">
              <input type="checkbox" className="rounded accent-[#1B7FC9]" />
              <span>Remember Me</span>
            </label>
            <button type="button" className="text-[#1B7FC9] hover:underline font-semibold">
              Forgot Password?
            </button>
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
          {loading
            ? (isSignup ? 'Creating Account...' : 'Signing in...')
            : (isSignup ? 'Create Account' : 'Sign In')}
        </button>
      </form>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#D7E5F0]" />
        </div>
        <div className="relative flex justify-center text-xs text-slate-400">
          <span className="bg-white px-2">Or continue with</span>
        </div>
      </div>

      {/* OAuth buttons without emoji */}
      <div className="grid grid-cols-2 gap-3">
        {['Google', 'Microsoft'].map((label) => (
          <button key={label} type="button" className="btn-outline text-xs py-2">
            {label}
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-slate-500 mt-6">
        {isSignup ? (
          <>
            Already have an account?{' '}
            <span
              onClick={() => { setIsSignup(false); setError(null); }}
              className="text-[#1B7FC9] font-semibold cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <span
              onClick={() => { setIsSignup(true); setError(null); }}
              className="text-[#1B7FC9] font-semibold cursor-pointer hover:underline"
            >
              Create Account
            </span>
          </>
        )}
      </p>
    </div>
  )
}
