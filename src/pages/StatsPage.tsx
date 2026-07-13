import { useEffect, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { TrendingUp, Award, Calendar, Package, AlertTriangle, BarChart3 } from 'lucide-react'
import { db } from '../db/database'
import { useDatabase } from '../hooks/useDatabase'
import type { Category } from '../types'

const MONTHS = ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру']
const COLORS = ['#16a34a', '#22c55e', '#86efac', '#bbf7d0', '#f0fdf4', '#15803d', '#166534', '#14532d', '#4ade80', '#dcfce7']

export function StatsPage() {
  const { getAllCategories } = useDatabase()
  const [categories, setCategories] = useState<Category[]>([])
  const cannings = useLiveQuery(() => db.canningEntries.toArray())
  const recipes = useLiveQuery(() => db.recipes.toArray())
  const inventory = useLiveQuery(() => db.inventory.toArray())

  useEffect(() => {
    getAllCategories().then(setCategories)
  }, [getAllCategories])

  if (!cannings || !recipes || !inventory) {
    return <div className="flex justify-center py-8">Завантаження...</div>
  }

  const currentYear = new Date().getFullYear()
  const lastYear = currentYear - 1
  const yearCannings = cannings.filter((c) => c.date.startsWith(String(currentYear)))
  const lastYearCannings = cannings.filter((c) => c.date.startsWith(String(lastYear)))

  const monthlyData = MONTHS.map((month, i) => {
    const count = yearCannings.filter((c) => new Date(c.date).getMonth() === i).length
    return { month, count }
  })

  const categoryData = categories
    .map((cat) => ({
      name: cat.name,
      value: cannings.filter((c) => c.categoryId === cat.id).length,
      icon: cat.icon,
    }))
    .filter((d) => d.value > 0)

  const consumptionData = MONTHS.map((month, i) => {
    const consumed = cannings
      .filter((c) => new Date(c.date).getMonth() === i)
      .reduce((sum, c) => sum + c.consumedJars, 0)
    return { month, consumed }
  })

  const topRated = cannings
    .filter((c) => c.rating && c.rating >= 4)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5)

  const totalJars = cannings.reduce((sum, c) => sum + c.totalJars, 0)
  const totalConsumed = cannings.reduce((sum, c) => sum + c.consumedJars, 0)
  const totalSpoiled = cannings.reduce((sum, c) => sum + (c.spoiledJars || 0), 0)
  const remaining = totalJars - totalConsumed

  const wasteRate = totalJars > 0 ? ((totalSpoiled / totalJars) * 100).toFixed(1) : '0'

  const seasonComparison = MONTHS.map((month, i) => ({
    month,
    [currentYear]: yearCannings.filter((c) => new Date(c.date).getMonth() === i).length,
    [lastYear]: lastYearCannings.filter((c) => new Date(c.date).getMonth() === i).length,
  }))

  const recipePopularity = recipes
    .map((r) => {
      const count = cannings.filter((c) => c.recipeId === r.id).length
      const avgRating = cannings
        .filter((c) => c.recipeId === r.id && c.rating)
        .reduce((sum, c, _, arr) => sum + (c.rating || 0) / arr.length, 0)
      return { name: r.name, count, rating: avgRating }
    })
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const expiredInventory = inventory.filter((i) => {
    if (!i.expiryDate) return false
    return new Date(i.expiryDate) < new Date()
  })

  return (
    <div className="space-y-6">
      <h1 className="page-title">Статистика</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card text-center">
          <div className="text-2xl mb-1">🫙</div>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">{totalJars}</div>
          <div className="text-xs text-stone-500">Всього банок</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl mb-1">✅</div>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">{totalConsumed}</div>
          <div className="text-xs text-stone-500">Вжито</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl mb-1">📦</div>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">{remaining}</div>
          <div className="text-xs text-stone-500">Залишилось</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl mb-1">📝</div>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">{cannings.length}</div>
          <div className="text-xs text-stone-500">Закруток</div>
        </div>
      </div>

      {cannings.length === 0 ? (
        <div className="card text-center py-12">
          <TrendingUp size={48} className="mx-auto text-stone-300 mb-4" />
          <p className="text-stone-500 dark:text-stone-400">Поки що немає даних для статистики. Додайте першу закрутку!</p>
        </div>
      ) : (
        <>
          {(totalSpoiled > 0 || expiredInventory.length > 0) && (
            <div className="card border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={18} className="text-red-600 dark:text-red-400" />
                <h2 className="font-semibold text-red-800 dark:text-red-400">Відходи та втрати</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600 dark:text-red-400">{totalSpoiled}</div>
                  <div className="text-xs text-stone-500">Зіпсовано банок</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600 dark:text-red-400">{wasteRate}%</div>
                  <div className="text-xs text-stone-500">Відсоток відходів</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600 dark:text-red-400">{expiredInventory.length}</div>
                  <div className="text-xs text-stone-500">Прострочених продуктів</div>
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={18} className="text-komora-600" />
              <h2 className="font-semibold dark:text-stone-200">Закрутки по місяцях ({currentYear})</h2>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e7e5e4' }} />
                <Bar dataKey="count" fill="#16a34a" radius={[8, 8, 0, 0]} name="Закруток" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {lastYearCannings.length > 0 && (
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 size={18} className="text-komora-600" />
                <h2 className="font-semibold dark:text-stone-200">Порівняння з минулим роком</h2>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={seasonComparison}>
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e7e5e4' }} />
                  <Bar dataKey={String(lastYear)} fill="#d6d3d1" radius={[4, 4, 0, 0]} name={String(lastYear)} />
                  <Bar dataKey={String(currentYear)} fill="#16a34a" radius={[4, 4, 0, 0]} name={String(currentYear)} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {categoryData.length > 0 && (
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Package size={18} className="text-komora-600" />
                <h2 className="font-semibold dark:text-stone-200">По категоріях</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={(e: any) => `${e.name}`}>
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e7e5e4' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-komora-600" />
              <h2 className="font-semibold dark:text-stone-200">Швидкість споживання</h2>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={consumptionData}>
                <defs>
                  <linearGradient id="consumedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e7e5e4' }} />
                <Area type="monotone" dataKey="consumed" stroke="#16a34a" strokeWidth={2} fill="url(#consumedGradient)" name="Вжито банок" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {topRated.length > 0 && (
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Award size={18} className="text-komora-600" />
                <h2 className="font-semibold dark:text-stone-200">Найкраще оцінені</h2>
              </div>
              <div className="space-y-2">
                {topRated.map((c) => {
                  const cat = categories.find((cat) => cat.id === c.categoryId)
                  return (
                    <div key={c.id} className="flex items-center gap-3 p-2 rounded-xl bg-stone-50 dark:bg-stone-700/50">
                      <span className="text-xl">{cat?.icon || '📦'}</span>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{c.name}</div>
                        <div className="text-xs text-amber-500">{'★'.repeat(c.rating || 0)}{'☆'.repeat(5 - (c.rating || 0))}</div>
                      </div>
                      {c.review && <p className="text-xs text-stone-500 italic max-w-xs truncate">{c.review}</p>}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {recipePopularity.length > 0 && (
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 size={18} className="text-komora-600" />
                <h2 className="font-semibold dark:text-stone-200">Популярні рецепти</h2>
              </div>
              <div className="space-y-2">
                {recipePopularity.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-stone-50 dark:bg-stone-700/50">
                    <span className="text-lg font-bold text-stone-400 w-6">{i + 1}</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{r.name}</div>
                      <div className="text-xs text-stone-500">{r.count} закруток</div>
                    </div>
                    {r.rating > 0 && (
                      <div className="text-xs text-amber-500">{'★'.repeat(Math.round(r.rating))}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
