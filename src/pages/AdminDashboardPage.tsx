import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LogOut, Package, BookOpen, Users, ArrowLeft, Upload, RefreshCw, KeyRound, CheckCircle, Plus } from 'lucide-react'
import { api, clearToken, isAuthenticated } from '../lib/api'
import { builtInProducts } from '../data/products-db'
import { builtInRecipes } from '../data/recipes-db'

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<{ products: number; recipes: number; users: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin')
      return
    }
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const s = await api.getStats()
      setStats(s)
    } catch {
      clearToken()
      navigate('/admin')
    }
  }

  const handleLogout = () => {
    clearToken()
    navigate('/admin')
  }

  const syncProducts = async () => {
    setLoading(true)
    setMessage('')
    try {
      const result = await api.bulkProducts(builtInProducts)
      setMessage(`Синхронізовано ${result.count} продуктів у SQLite`)
      loadStats()
    } catch (err: any) {
      setMessage(`Помилка: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const syncRecipes = async () => {
    setLoading(true)
    setMessage('')
    try {
      const result = await api.bulkRecipes(builtInRecipes)
      setMessage(`Синхронізовано ${result.count} рецептів у SQLite`)
      loadStats()
    } catch (err: any) {
      setMessage(`Помилка: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    try {
      await api.changePassword(currentPassword, newPassword)
      setMessage('Пароль змінено успішно')
      setShowPasswordForm(false)
      setCurrentPassword('')
      setNewPassword('')
    } catch (err: any) {
      setMessage(`Помилка: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🫙</span>
            <span className="font-bold text-stone-800">Адмін-панель Комора</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-stone-500 hover:text-stone-700 flex items-center gap-1">
              <ArrowLeft size={16} />
              На сайт
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <LogOut size={16} />
              Вийти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {message && (
          <div className="flex items-center gap-2 text-sm text-komora-700 bg-komora-50 rounded-xl px-4 py-3 border border-komora-200">
            <CheckCircle size={18} />
            {message}
          </div>
        )}

        <section>
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Статистика SQLite бази</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard icon={Package} value={stats?.products ?? '—'} label="Продуктів у БД" />
            <StatCard icon={BookOpen} value={stats?.recipes ?? '—'} label="Рецептів у БД" />
            <StatCard icon={Users} value={stats?.users ?? '—'} label="Користувачів" />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Синхронізація даних</h2>
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
            <p className="text-sm text-stone-600">
              Завантажити вбудовані продукти та рецепти з коду у серверну SQLite базу.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={syncProducts}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-komora-600 text-white font-medium hover:bg-komora-700 transition-colors disabled:opacity-50"
              >
                <Upload size={18} />
                Завантажити {builtInProducts.length} продуктів
              </button>
              <button
                onClick={syncRecipes}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-komora-600 text-white font-medium hover:bg-komora-700 transition-colors disabled:opacity-50"
              >
                <Upload size={18} />
                Завантажити {builtInRecipes.length} рецептів
              </button>
              <button
                onClick={loadStats}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 transition-colors"
              >
                <RefreshCw size={18} />
                Оновити статистику
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Управління</h2>
          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <Link
              to="/admin/recipes"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-komora-50 flex items-center justify-center">
                <BookOpen size={20} className="text-komora-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-stone-800">Рецепти</div>
                <div className="text-sm text-stone-500">Створюйте, редагуйте та видаляйте рецепти</div>
              </div>
              <Plus size={20} className="text-stone-400" />
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-komora-50 flex items-center justify-center">
                <Users size={20} className="text-komora-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-stone-800">Користувачі</div>
                <div className="text-sm text-stone-500">Управляйте користувачами та їх ролями</div>
              </div>
              <Plus size={20} className="text-stone-400" />
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Налаштування</h2>
          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            {!showPasswordForm ? (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 transition-colors"
              >
                <KeyRound size={18} />
                Змінити пароль
              </button>
            ) : (
              <form onSubmit={handleChangePassword} className="space-y-3 max-w-sm">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Поточний пароль</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Новий пароль</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none"
                    required
                    minLength={6}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-komora-600 text-white font-medium hover:bg-komora-700 transition-colors"
                  >
                    Зберегти
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasswordForm(false)}
                    className="px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 transition-colors"
                  >
                    Скасувати
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Швидкі посилання</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/app" className="px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 transition-colors">
              Відкрити додаток
            </Link>
            <a href="https://github.com/vitaliy-n/komora" target="_blank" rel="noopener" className="px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 transition-colors">
              GitHub репозиторій
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

function StatCard({ icon: Icon, value, label }: { icon: any; value: number | string; label: string }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-komora-50 flex items-center justify-center">
          <Icon size={20} className="text-komora-600" />
        </div>
        <div className="text-2xl font-bold text-stone-800">{value}</div>
      </div>
      <div className="text-sm text-stone-500">{label}</div>
    </div>
  )
}
