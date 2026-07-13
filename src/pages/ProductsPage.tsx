import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDatabase } from '../hooks/useDatabase'
import { SearchBar } from '../components/common/SearchBar'
import { FilterChips } from '../components/common/FilterChips'
import { Badge } from '../components/ui/Badge'
import type { Product } from '../types'
import { getCurrentMonth, getSeasonLabel } from '../utils/date'

const PAGE_SIZE = 60

export function ProductsPage() {
  const { getAllProducts } = useDatabase()
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [showSeasonalOnly, setShowSeasonalOnly] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getAllProducts().then(setProducts)
  }, [getAllProducts])

  const productCategories = [...new Set(products.map((p) => p.category))].sort((a, b) =>
    a.localeCompare(b, 'uk'),
  )
  const currentMonth = getCurrentMonth()

  const categoryCounts = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})

  const filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    if (filterCategory && p.category !== filterCategory) return false
    if (showSeasonalOnly && !p.seasonMonths.includes(currentMonth)) return false
    return true
  })

  const grouped = filtered.reduce<Record<string, Product[]>>((acc, p) => {
    (acc[p.category] ||= []).push(p)
    return acc
  }, {})

  const visibleCategories = Object.entries(grouped).slice(0, Math.ceil(visibleCount / 20))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + PAGE_SIZE)
        }
      },
      { rootMargin: '200px' },
    )
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Довідник продуктів</h1>
        <Badge variant="info">{filtered.length} / {products.length}</Badge>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Шукати продукт..." />

      <FilterChips
        chips={productCategories.map((cat) => ({
          value: cat,
          label: cat,
          count: categoryCounts[cat] || 0,
        }))}
        selected={filterCategory}
        onSelect={setFilterCategory}
        allLabel="Всі категорії"
      />

      <button
        onClick={() => setShowSeasonalOnly(!showSeasonalOnly)}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${showSeasonalOnly ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-600 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50'}`}
      >
        🌿 Зараз сезон ({products.filter((p) => p.seasonMonths.includes(currentMonth)).length})
      </button>

      {visibleCategories.map(([category, items]) => (
        <div key={category}>
          <h2 className="section-title mb-2 dark:text-stone-200">{category}</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product) => {
              const inSeason = product.seasonMonths.includes(currentMonth)
              return (
                <Link key={product.id} to={`/app/products/${product.id}`} className="card hover:shadow-md transition-shadow flex items-center gap-3">
                  <span className="text-2xl">{product.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-stone-900 dark:text-stone-100">{product.name}</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 truncate">{getSeasonLabel(product.seasonMonths)}</p>
                  </div>
                  {inSeason && <Badge variant="success">Сезон</Badge>}
                </Link>
              )
            })}
          </div>
        </div>
      ))}

      {visibleCategories.length < Object.keys(grouped).length && (
        <div ref={sentinelRef} className="py-4 text-center text-sm text-stone-400">
          Завантаження...
        </div>
      )}
    </div>
  )
}
