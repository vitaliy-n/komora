import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Plus, Filter } from 'lucide-react'
import { useDatabase } from '../hooks/useDatabase'
import { SearchBar } from '../components/common/SearchBar'
import { EmptyState } from '../components/common/EmptyState'
import { Badge } from '../components/ui/Badge'
import type { CanningEntry, Category } from '../types'
import { formatDate, getExpiryStatus, daysUntil } from '../utils/date'

export function CanningListPage() {
  const { getAllCannings, getAllCategories } = useDatabase()
  const [cannings, setCannings] = useState<CanningEntry[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [search, setSearch] = useState('')
  const [searchParams] = useSearchParams()
  const [filterCategory, setFilterCategory] = useState(searchParams.get('category') || '')
  const [filterLocation, setFilterLocation] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const load = async () => {
      const [c, cats] = await Promise.all([getAllCannings(), getAllCategories()])
      setCannings(c)
      setCategories(cats)
    }
    load()
  }, [getAllCannings, getAllCategories])

  const filtered = cannings.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
    if (filterCategory && c.categoryId !== filterCategory) return false
    if (filterLocation && c.storageLocation !== filterLocation) return false
    return true
  })

  const locations = [...new Set(cannings.map((c) => c.storageLocation).filter(Boolean))]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Закрутки</h1>
        <Link to="/cannings/new" className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          <span className="hidden sm:inline">Додати</span>
        </Link>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Шукати закрутки..." />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2.5 rounded-xl border transition-colors ${showFilters ? 'bg-komora-50 border-komora-300 text-komora-700' : 'border-stone-300 text-stone-600 hover:bg-stone-50'}`}
        >
          <Filter size={20} />
        </button>
      </div>

      {showFilters && (
        <div className="card flex flex-wrap gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="input w-auto text-sm"
          >
            <option value="">Всі категорії</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
            ))}
          </select>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="input w-auto text-sm"
          >
            <option value="">Всі місця</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          {(filterCategory || filterLocation) && (
            <button onClick={() => { setFilterCategory(''); setFilterLocation('') }} className="text-sm text-komora-600 px-3">
              Скинути
            </button>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon="🫙"
          title="Поки немає закруток"
          description="Додайте вашу першу закрутку, щоб почати вести облік"
          action={<Link to="/cannings/new" className="btn-primary">Додати закрутку</Link>}
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((canning) => {
            const cat = categories.find((c) => c.id === canning.categoryId)
            const remaining = canning.totalJars - canning.consumedJars
            const expiryStatus = canning.expiryDate ? getExpiryStatus(canning.expiryDate) : null
            const days = canning.expiryDate ? daysUntil(canning.expiryDate) : null

            return (
              <Link key={canning.id} to={`/cannings/${canning.id}`} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat?.icon || '📦'}</span>
                    <div>
                      <h3 className="font-semibold text-stone-900">{canning.name}</h3>
                      <p className="text-xs text-stone-500">{cat?.name} · {formatDate(canning.date)}</p>
                    </div>
                  </div>
                  {canning.rating && (
                    <div className="text-amber-400 text-sm">{'★'.repeat(canning.rating)}</div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={remaining > 0 ? 'success' : 'default'}>
                      {remaining > 0 ? `${remaining} з ${canning.totalJars} банок` : 'Все з\'їдено'}
                    </Badge>
                    <Badge>{canning.jarSize}л</Badge>
                  </div>

                  {expiryStatus && expiryStatus !== 'ok' && (
                    <Badge variant={expiryStatus === 'expired' ? 'danger' : expiryStatus === 'danger' ? 'danger' : 'warning'}>
                      {expiryStatus === 'expired' ? 'Прострочено' : `${days} дн.`}
                    </Badge>
                  )}
                </div>

                {canning.storageLocation && (
                  <p className="text-xs text-stone-400 mt-2">📍 {canning.storageLocation}</p>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
