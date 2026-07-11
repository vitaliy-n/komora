import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '../lib/useAuth'

export function AuthPage() {
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(username, password)
      } else {
        await register(username, email, password)
      }
      navigate('/app')
    } catch (err: any) {
      setError(err.message)
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

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
          <div className="text-center">
            <span className="text-4xl">🫙</span>
            <h1 className="text-xl font-bold text-stone-800 mt-2">Комора</h1>
            <p className="text-sm text-stone-500">
              {mode === 'login' ? 'Увійдіть до свого акаунту' : 'Створіть новий акаунт'}
            </p>
          </div>

          <div className="flex gap-2 p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'login' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
              }`}
            >
              Вхід
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'register' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
              }`}
            >
              Реєстрація
            </button>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Логін</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none"
                placeholder="Ваш логін"
                required
                autoFocus
              />
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email (необов'язково)</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none"
                  placeholder="email@example.com"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none"
                placeholder="••••••"
                required
                minLength={6}
              />
              {mode === 'register' && (
                <p className="text-xs text-stone-400 mt-1">Мінімум 6 символів</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-komora-600 text-white font-medium hover:bg-komora-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Зачекайте...' : mode === 'login' ? 'Увійти' : 'Зареєструватись'}
            </button>
          </form>

          {mode === 'login' && (
            <p className="text-xs text-center text-stone-400">
              Немає акаунту?{' '}
              <button onClick={() => setMode('register')} className="text-komora-600 hover:text-komora-700 font-medium">
                Зареєструватись
              </button>
            </p>
          )}
          {mode === 'register' && (
            <p className="text-xs text-center text-stone-400">
              Вже є акаунт?{' '}
              <button onClick={() => setMode('login')} className="text-komora-600 hover:text-komora-700 font-medium">
                Увійти
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
