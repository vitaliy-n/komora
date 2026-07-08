import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, AlertTriangle, TrendingUp, Calendar } from 'lucide-react'
import { useDatabase } from '../hooks/useDatabase'
import { useNotifications } from '../hooks/useNotifications'
import { Badge } from '../components/ui/Badge'
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">🫙 Комора</h1>
          <p className="text-stone-500 text-sm mt-1">Ваші домашні закрутки та запаси</p>
        </div>
        <Link to="/cannings/new" className="btn-primary flex items-center gap-2">
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
                to={alert.type === 'canning' ? `/cannings/${alert.id}` : '/inventory'}
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
                    to={`/cannings?category=${catId}`}
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
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={18} className="text-komora-600" />
          <h2 className="font-semibold">Зараз сезон ({getMonthName(currentMonth)})</h2>
        </div>
        <p className="text-sm text-stone-500">
          Перегляньте <Link to="/products" className="text-komora-600 underline">довідник продуктів</Link> щоб дізнатися, що зараз найкраще консервувати.
        </p>
      </div>
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
