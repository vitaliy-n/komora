import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  LayoutDashboard, Cookie, BookOpen, Apple, Package, Settings, Calendar,
  LogOut, User, BarChart3, ShoppingCart, ChefHat, QrCode, Tag, Map, Download,
  Menu, X, Plus, BookMarked,
} from 'lucide-react'
import { useAuth } from '../../lib/useAuth'
import { OfflineIndicator } from '../common/OfflineIndicator'
import { OnboardingModal } from '../common/OnboardingModal'

interface NavSection {
  title: string
  items: { to: string; icon: typeof LayoutDashboard; label: string }[]
}

const navSections: NavSection[] = [
  {
    title: 'Огляд',
    items: [
      { to: '/app', icon: LayoutDashboard, label: 'Головна' },
      { to: '/app/calendar', icon: Calendar, label: 'Календар' },
      { to: '/app/stats', icon: BarChart3, label: 'Статистика' },
    ],
  },
  {
    title: 'Кухня',
    items: [
      { to: '/app/cannings', icon: Cookie, label: 'Закрутки' },
      { to: '/app/recipes', icon: BookOpen, label: 'Рецепти' },
      { to: '/app/chef', icon: ChefHat, label: 'Шеф' },
    ],
  },
  {
    title: 'Продукти',
    items: [
      { to: '/app/products', icon: Apple, label: 'Каталог' },
      { to: '/app/inventory', icon: Package, label: 'Запаси' },
      { to: '/app/shopping', icon: ShoppingCart, label: 'Покупки' },
    ],
  },
  {
    title: 'Інструменти',
    items: [
      { to: '/app/labels', icon: Tag, label: 'Етикетки' },
      { to: '/app/scan', icon: QrCode, label: 'Сканер' },
      { to: '/app/storage-map', icon: Map, label: 'Карта' },
      { to: '/app/guides', icon: BookMarked, label: 'Гіди' },
      { to: '/app/export', icon: Download, label: 'Експорт' },
    ],
  },
]

const bottomNavItems = [
  { to: '/app', icon: LayoutDashboard, label: 'Головна' },
  { to: '/app/cannings', icon: Cookie, label: 'Закрутки' },
  { to: '/app/recipes', icon: BookOpen, label: 'Рецепти' },
  { to: '/app/inventory', icon: Package, label: 'Запаси' },
  { to: '/app/shopping', icon: ShoppingCart, label: 'Покупки' },
]

export function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-900">
      <OfflineIndicator />
      <OnboardingModal />

      <header className="bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors lg:hidden"
            >
              <Menu size={22} />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🫙</span>
              <h1 className="text-xl font-bold text-komora-700 dark:text-komora-400 hidden sm:block">Комора</h1>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navSections.flatMap((s) => s.items).map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/app'}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-komora-50 text-komora-700 dark:bg-komora-900/30 dark:text-komora-400'
                      : 'text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-700'
                  }`
                }
              >
                <Icon size={18} />
                <span className="hidden xl:inline">{label}</span>
              </NavLink>
            ))}
            <NavLink
              to="/app/settings"
              className={({ isActive }) =>
                `p-2 rounded-xl transition-colors ${isActive ? 'bg-komora-50 text-komora-700 dark:bg-komora-900/30 dark:text-komora-400' : 'text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-700'}`
              }
            >
              <Settings size={18} />
            </NavLink>
            {user && (
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-stone-200 dark:border-stone-600">
                <div className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-stone-300">
                  <User size={16} />
                  <span className="font-medium hidden xl:inline">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="Вийти"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <NavLink
              to="/app/settings"
              className={({ isActive }) =>
                `p-2 rounded-xl transition-colors ${isActive ? 'bg-komora-50 text-komora-700 dark:bg-komora-900/30 dark:text-komora-400' : 'text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-700'}`
              }
            >
              <Settings size={20} />
            </NavLink>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-stone-800 shadow-xl overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🫙</span>
                <h2 className="text-lg font-bold text-komora-700 dark:text-komora-400">Комора</h2>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="p-3 space-y-4">
              {navSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider px-3 mb-1.5">
                    {section.title}
                  </h3>
                  <div className="space-y-0.5">
                    {section.items.map(({ to, icon: Icon, label }) => (
                      <NavLink
                        key={to}
                        to={to}
                        end={to === '/app'}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-komora-50 text-komora-700 dark:bg-komora-900/30 dark:text-komora-400'
                              : 'text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-700'
                          }`
                        }
                      >
                        <Icon size={20} />
                        {label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            {user && (
              <div className="p-3 border-t border-stone-200 dark:border-stone-700 mt-2">
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-stone-600 dark:text-stone-300">
                  <User size={18} />
                  <span className="font-medium">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
                >
                  <LogOut size={20} />
                  Вийти
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <main className="flex-1 pb-24 sm:pb-8">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
          <Outlet />
        </div>
      </main>

      <nav className="sm:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-stone-800 border-t border-stone-200 dark:border-stone-700 px-1 pb-safe z-40">
        <div className="flex justify-around items-center">
          {bottomNavItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/app'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-2 px-2 text-[10px] font-medium transition-colors ${
                  isActive ? 'text-komora-600 dark:text-komora-400' : 'text-stone-400'
                }`
              }
            >
              <Icon size={22} />
              {label}
            </NavLink>
          ))}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center gap-0.5 py-2 px-2 text-[10px] font-medium text-stone-400"
          >
            <Menu size={22} />
            Ще
          </button>
        </div>
      </nav>

      <button
        onClick={() => navigate('/app/cannings/new')}
        className="sm:hidden fixed right-4 bottom-20 w-14 h-14 rounded-full bg-komora-600 text-white shadow-lg shadow-komora-600/30 flex items-center justify-center active:scale-90 transition-transform z-30"
        aria-label="Додати закрутку"
      >
        <Plus size={26} />
      </button>
    </div>
  )
}
