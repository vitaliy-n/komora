import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDatabase } from '../hooks/useDatabase'
import { SearchBar } from '../components/common/SearchBar'
import { Badge } from '../components/ui/Badge'
import type { Product } from '../types'
import { getCurrentMonth, getSeasonLabel } from '../utils/date'

export function ProductsPage() {
  const { getAllProducts } = useDatabase()
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [showSeasonalOnly, setShowSeasonalOnly] = useState(false)

  useEffect(() => {
    getAllProducts().then(setProducts)
  }, [getAllProducts])

  const productCategories = [...new Set(products.map((p) => p.category))]
  const currentMonth = getCurrentMonth()

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Довідник продуктів</h1>
        <Badge variant="info">{products.length} продуктів</Badge>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Шукати продукт..." />

      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilterCategory('')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${!filterCategory ? 'bg-komora-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
        >
          Всі
        </button>
        {productCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat === filterCategory ? '' : cat)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filterCategory === cat ? 'bg-komora-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowSeasonalOnly(!showSeasonalOnly)}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${showSeasonalOnly ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'}`}
      >
        🌿 Зараз сезон
      </button>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h2 className="section-title mb-2">{category}</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product) => {
              const inSeason = product.seasonMonths.includes(currentMonth)
              return (
                <Link key={product.id} to={`/products/${product.id}`} className="card hover:shadow-md transition-shadow flex items-center gap-3">
                  <span className="text-2xl">{product.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-stone-900">{product.name}</h3>
                    <p className="text-xs text-stone-500 truncate">{getSeasonLabel(product.seasonMonths)}</p>
                  </div>
                  {inSeason && <Badge variant="success">Сезон</Badge>}
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
