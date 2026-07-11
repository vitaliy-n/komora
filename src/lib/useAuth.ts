import { useState, useEffect, useCallback } from 'react'
import { api, setToken, clearToken, isAuthenticated, type AuthUser } from './api'

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) {
      setLoading(false)
      return
    }
    api.getMe()
      .then(res => setUser(res.user))
      .catch(() => {
        clearToken()
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    const res = await api.login(username, password)
    setToken(res.token)
    setUser(res.user)
    return res.user
  }, [])

  const register = useCallback(async (username: string, email: string, password: string) => {
    const res = await api.register(username, email, password)
    setToken(res.token)
    setUser(res.user)
    return res.user
  }, [])

  const logout = useCallback(() => {
    clearToken()
    setUser(null)
  }, [])

  return { user, loading, login, register, logout, isAuthenticated: !!user }
}
