// Minimal API client wrapper for admin pages
const BASE = '/api/v1'

function getToken(): string | null {
  try {
    const raw = localStorage.getItem('auth-storage')
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed?.state?.token ?? null
  } catch {
    return null
  }
}

function headers(): HeadersInit {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

const api = {
  async get(path: string) {
    const res = await fetch(`${BASE}${path}`, { headers: headers() })
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    return { data: await res.json() }
  },

  async patch(path: string, body: unknown) {
    const res = await fetch(`${BASE}${path}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    return { data: await res.json() }
  },

  async post(path: string, body?: unknown) {
    const res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: headers(),
      body: body ? JSON.stringify(body) : undefined,
    })
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    return { data: await res.json() }
  },
}

export default api
