import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Cookie, BookOpen, Apple, Package, Settings, Calendar, LogOut, User, BarChart3, ShoppingCart } from 'lucide-react'
import { useAuth } from '../../lib/useAuth'

const navItems = [
  { to: '/app', icon: LayoutDashboard, label: 'Головна' },
  { to: '/app/cannings', icon: Cookie, label: 'Закрутки' },
  { to: '/app/recipes', icon: BookOpen, label: 'Рецепти' },
  { to: '/app/products', icon: Apple, label: 'Продукти' },
  { to: '/app/inventory', icon: Package, label: 'Запаси' },
  { to: '/app/calendar', icon: Calendar, label: 'Календар' },
  { to: '/app/shopping', icon: ShoppingCart, label: 'Покупки' },
  { to: '/app/stats', icon: BarChart3, label: 'Статистика' },
]

export function Layout() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-stone-200 px-4 py-3 hidden sm:block">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🫙</span>
            <h1 className="text-xl font-bold text-komora-700">Комора</h1>
          </div>
          <nav className="flex items-center gap-1">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/app'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-komora-50 text-komora-700'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/app/settings"
              className={({ isActive }) =>
                `p-2 rounded-xl transition-colors ${isActive ? 'bg-komora-50 text-komora-700' : 'text-stone-600 hover:bg-stone-100'}`
              }
            >
              <Settings size={18} />
            </NavLink>
            {user && (
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-stone-200">
                <div className="flex items-center gap-1.5 text-sm text-stone-600">
                  <User size={16} />
                  <span className="font-medium">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Вийти"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 pb-20 sm:pb-6">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
          <Outlet />
        </div>
      </main>

      <nav className="sm:hidden fixed bottom-0 inset-x-0 bg-white border-t border-stone-200 px-2 pb-safe z-40">
        <div className="flex justify-around">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/app'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-2 px-3 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-komora-600' : 'text-stone-400'
                }`
              }
            >
              <Icon size={22} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
