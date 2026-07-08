import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Cookie, BookOpen, Apple, Package, Settings } from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Головна' },
  { to: '/cannings', icon: Cookie, label: 'Закрутки' },
  { to: '/recipes', icon: BookOpen, label: 'Рецепти' },
  { to: '/products', icon: Apple, label: 'Продукти' },
  { to: '/inventory', icon: Package, label: 'Запаси' },
]

export function Layout() {
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
                end={to === '/'}
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
              to="/settings"
              className={({ isActive }) =>
                `p-2 rounded-xl transition-colors ${isActive ? 'bg-komora-50 text-komora-700' : 'text-stone-600 hover:bg-stone-100'}`
              }
            >
              <Settings size={18} />
            </NavLink>
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
              end={to === '/'}
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
