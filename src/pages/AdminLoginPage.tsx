import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, User, ArrowLeft } from 'lucide-react'
import { api, setToken, isAuthenticated } from '../lib/api'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated()) {
    navigate('/admin/dashboard')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token } = await api.login(username, password)
      setToken(token)
      navigate('/admin/dashboard')
    } catch (err: any) {
      setError(err.message || 'Помилка входу')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 mb-6">
          <ArrowLeft size={16} />
          На головну
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
          <div className="text-center mb-6">
            <div className="text-3xl mb-2">🫙</div>
            <h1 className="text-xl font-bold text-stone-800">Адмін-панель</h1>
            <p className="text-sm text-stone-500 mt-1">Вхід в панель управління</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Логін</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none"
                  placeholder="admin"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Пароль</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-komora-600 text-white font-semibold hover:bg-komora-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Вхід...' : 'Увійти'}
            </button>
          </form>

          <p className="text-xs text-stone-400 text-center mt-4">
            Стандартний логін: <b>admin</b> / пароль: <b>admin123</b>
          </p>
        </div>
      </div>
    </div>
  )
}
