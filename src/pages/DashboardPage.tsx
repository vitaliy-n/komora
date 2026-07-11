import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { Plus, AlertTriangle, TrendingUp, Calendar, BookOpen, Leaf, Package } from 'lucide-react'
import { useDatabase } from '../hooks/useDatabase'
import { useNotifications } from '../hooks/useNotifications'
import { Badge } from '../components/ui/Badge'
import { db } from '../db/database'
import type { CanningEntry, InventoryItem, Category } from '../types'
import type { ExpiryAlert } from '../utils/expiry-checker'
import { formatDate, getCurrentMonth, getMonthName } from '../utils/date'

export function DashboardPage() {
  const { getAllCannings, getAllInventory, getAllCategories } = useDatabase()
  const { checkExpiries } = useNotifications()
  const [cannings, setCannings] = useState<CanningEntry[]>([])
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [alerts, setAlerts] = useState<ExpiryAlert[]>([])

  const products = useLiveQuery(() => db.products.toArray())
  const recipes = useLiveQuery(() => db.recipes.toArray())

  useEffect(() => {
    const load = async () => {
      const [c, i, cats] = await Promise.all([getAllCannings(), getAllInventory(), getAllCategories()])
      setCannings(c)
      setInventory(i)
      setCategories(cats)
      setAlerts(checkExpiries(c, i))
    }
    load()
  }, [getAllCannings, getAllInventory, getAllCategories, checkExpiries])

  const totalJars = cannings.reduce((sum, c) => sum + (c.totalJars - c.consumedJars), 0)
  const totalConsumed = cannings.reduce((sum, c) => sum + c.consumedJars, 0)
  const currentYear = new Date().getFullYear()
  const thisYearCannings = cannings.filter((c) => c.date.startsWith(String(currentYear)))
  const currentMonth = getCurrentMonth()

  const categoryCounts = cannings.reduce<Record<string, number>>((acc, c) => {
    const remaining = c.totalJars - c.consumedJars
    if (remaining > 0) {
      acc[c.categoryId] = (acc[c.categoryId] || 0) + remaining
    }
    return acc
  }, {})

  const seasonalProducts = (products || []).filter((p) => p.seasonMonths.includes(currentMonth))
  const seasonalByCategory = seasonalProducts.reduce<Record<string, typeof seasonalProducts>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = []
    acc[p.category].push(p)
    return acc
  }, {})
  const topSeasonalCategories = Object.entries(seasonalByCategory)
    .sort(([, a], [, b]) => b.length - a.length)
    .slice(0, 4)

  const hasUserData = cannings.length > 0 || inventory.length > 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">🫙 Комора</h1>
          <p className="text-stone-500 text-sm mt-1">Ваші домашні закрутки та запаси</p>
        </div>
        <Link to="/app/cannings/new" className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          <span className="hidden sm:inline">Нова закрутка</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon="🫙" label="Банок на полиці" value={totalJars} />
        <StatCard icon="✅" label="Вжито цього року" value={totalConsumed} />
        <StatCard icon="📝" label="Закруток за рік" value={thisYearCannings.length} />
        <StatCard icon="📦" label="Продуктів в запасі" value={inventory.length} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <InfoCard
          icon={<Package size={20} className="text-komora-600" />}
          label="Продуктів у базі"
          value={products?.length ?? 0}
          link="/app/products"
          linkLabel="Каталог →"
        />
        <InfoCard
          icon={<BookOpen size={20} className="text-komora-600" />}
          label="Рецептів"
          value={recipes?.length ?? 0}
          link="/app/recipes"
          linkLabel="Рецепти →"
        />
        <InfoCard
          icon={<Leaf size={20} className="text-komora-600" />}
          label="Сезонних продуктів"
          value={seasonalProducts.length}
          link="/app/calendar"
          linkLabel="Календар →"
        />
      </div>

      {alerts.length > 0 && (
        <div className="card border-amber-200 bg-amber-50/50">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-amber-600" />
            <h2 className="font-semibold text-amber-800">Потребують уваги</h2>
            <Badge variant="warning">{alerts.length}</Badge>
          </div>
          <div className="space-y-2">
            {alerts.slice(0, 5).map((alert) => (
              <Link
                key={alert.id}
                to={alert.type === 'canning' ? `/app/cannings/${alert.id}` : '/app/inventory'}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-amber-100/50 transition-colors"
              >
                <div>
                  <span className="text-sm font-medium text-stone-800">{alert.name}</span>
                  <span className="text-xs text-stone-500 ml-2">{formatDate(alert.expiryDate)}</span>
                </div>
                <Badge variant={alert.status === 'expired' ? 'danger' : alert.status === 'danger' ? 'danger' : 'warning'}>
                  {alert.status === 'expired' ? 'Прострочено' : `${alert.daysLeft} дн.`}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {Object.keys(categoryCounts).length > 0 && (
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-komora-600" />
            <h2 className="font-semibold">По категоріях</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(categoryCounts)
              .sort(([, a], [, b]) => b - a)
              .map(([catId, count]) => {
                const cat = categories.find((c) => c.id === catId)
                return (
                  <Link
                    key={catId}
                    to={`/app/cannings?category=${catId}`}
                    className="flex items-center gap-2 p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors"
                  >
                    <span className="text-xl">{cat?.icon || '📦'}</span>
                    <div>
                      <div className="text-sm font-medium text-stone-800">{cat?.name || 'Інше'}</div>
                      <div className="text-xs text-stone-500">{count} банок</div>
                    </div>
                  </Link>
                )
              })}
          </div>
        </div>
      )}

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-komora-600" />
            <h2 className="font-semibold">Сезонні продукти — {getMonthName(currentMonth)}</h2>
          </div>
          <Link to="/app/calendar" className="text-sm font-medium text-komora-600 hover:text-komora-700">
            Усі →
          </Link>
        </div>
        {topSeasonalCategories.length > 0 ? (
          <div className="space-y-4">
            {topSeasonalCategories.map(([category, items]) => (
              <div key={category}>
                <div className="text-xs font-medium text-stone-400 mb-2">
                  {category} <span className="text-stone-300">({items.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.slice(0, 10).map((p) => (
                    <Link
                      key={p.id}
                      to={`/app/products/${p.id}`}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
                    >
                      <span className="text-base">{p.icon}</span>
                      <span className="text-xs font-medium text-stone-700">{p.name}</span>
                    </Link>
                  ))}
                  {items.length > 10 && (
                    <Link
                      to="/app/calendar"
                      className="flex items-center px-2.5 py-1.5 rounded-lg bg-komora-50 hover:bg-komora-100 transition-colors text-xs font-medium text-komora-700"
                    >
                      +{items.length - 10} ще
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-stone-500">
            Перегляньте <Link to="/app/calendar" className="text-komora-600 underline">сезонний календар</Link>, щоб дізнатися, що зараз найкраще консервувати.
          </p>
        )}
      </div>

      {!hasUserData && (
        <div className="card bg-komora-50/50 border-komora-200">
          <h2 className="font-semibold text-komora-800 mb-2">👋 Ласкаво просимо!</h2>
          <p className="text-sm text-stone-600 mb-3">
            Це ваша цифрова комора. Додавайте закрутки, ведіть інвентар продуктів, використовуйте рецепти та сезонний календар.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to="/app/cannings/new" className="btn-primary text-sm flex items-center gap-1.5">
              <Plus size={16} /> Перша закрутка
            </Link>
            <Link to="/app/recipes" className="btn-secondary text-sm">
              📖 Переглянути рецепти
            </Link>
            <Link to="/app/products" className="btn-secondary text-sm">
              🥕 Каталог продуктів
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <div className="card text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold text-stone-900">{value}</div>
      <div className="text-xs text-stone-500">{label}</div>
    </div>
  )
}

function InfoCard({
  icon,
  label,
  value,
  link,
  linkLabel,
}: {
  icon: React.ReactNode
  label: string
  value: number
  link: string
  linkLabel: string
}) {
  return (
    <Link to={link} className="card flex items-center gap-3 hover:bg-stone-50 transition-colors">
      <div className="flex-shrink-0">{icon}</div>
      <div className="min-w-0">
        <div className="text-xl font-bold text-stone-900">{value}</div>
        <div className="text-xs text-stone-500 truncate">{label}</div>
        <div className="text-xs font-medium text-komora-600 mt-0.5">{linkLabel}</div>
      </div>
    </Link>
  )
}
