import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Star, ChevronDown, ChevronUp, Share2 } from 'lucide-react'
import { useDatabase } from '../hooks/useDatabase'
import { SearchBar } from '../components/common/SearchBar'
import { FilterChips } from '../components/common/FilterChips'
import { SortMenu, type SortOption } from '../components/common/SortMenu'
import { EmptyState } from '../components/common/EmptyState'
import { Badge } from '../components/ui/Badge'
import { db } from '../db/database'
import { shareRecipe } from '../utils/recipe-share'
import type { Recipe, Category, Product } from '../types'
import { DIFFICULTY_LABELS } from '../types'

type SortValue = 'name' | 'difficulty' | 'time' | 'jars' | 'favorites'

const sortOptions: SortOption<Recipe>[] = [
  { value: 'name', label: 'За назвою', compare: (a, b) => a.name.localeCompare(b.name, 'uk') },
  { value: 'difficulty', label: 'За складністю', compare: (a, b) => a.difficulty.localeCompare(b.difficulty) },
  { value: 'time', label: 'За часом', compare: (a, b) => ((a.prepTime || 0) + (a.cookTime || 0)) - ((b.prepTime || 0) + (b.cookTime || 0)) },
  { value: 'jars', label: 'За кількістю банок', compare: (a, b) => b.baseJars - a.baseJars },
  { value: 'favorites', label: 'Улюблені спочатку', compare: (a, b) => Number(b.isFavorite || 0) - Number(a.isFavorite || 0) },
]

export function RecipesPage() {
  const { getAllRecipes, getAllCategories, getAllProducts } = useDatabase()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterDifficulty, setFilterDifficulty] = useState('')
  const [filterProductIds, setFilterProductIds] = useState<string[]>([])
  const [showProductFilter, setShowProductFilter] = useState(false)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [sortBy, setSortBy] = useState<SortValue>('name')

  useEffect(() => {
    const load = async () => {
      const [r, c, p] = await Promise.all([getAllRecipes(), getAllCategories(), getAllProducts()])
      setRecipes(r)
      setCategories(c)
      setProducts(p)
    }
    load()
  }, [getAllRecipes, getAllCategories, getAllProducts])

  const usedProductIds = [...new Set(recipes.flatMap((r) => r.productIds))]
  const usedProducts = products
    .filter((p) => usedProductIds.includes(p.id))
    .sort((a, b) => a.name.localeCompare(b.name, 'uk'))

  const categoryCounts = recipes.reduce<Record<string, number>>((acc, r) => {
    acc[r.categoryId] = (acc[r.categoryId] || 0) + 1
    return acc
  }, {})

  const filtered = useMemo(() => {
    let result = recipes.filter((r) => {
      if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false
      if (filterCategory && r.categoryId !== filterCategory) return false
      if (filterDifficulty && r.difficulty !== filterDifficulty) return false
      if (filterProductIds.length > 0 && !filterProductIds.every((pid) => r.productIds.includes(pid))) return false
      if (showFavoritesOnly && !r.isFavorite) return false
      return true
    })
    const sortOpt = sortOptions.find((o) => o.value === sortBy)
    if (sortOpt) result = [...result].sort(sortOpt.compare)
    return result
  }, [recipes, search, filterCategory, filterDifficulty, filterProductIds, showFavoritesOnly, sortBy])

  const toggleProduct = (productId: string) => {
    setFilterProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const toggleFavorite = async (e: React.MouseEvent, recipe: Recipe) => {
    e.preventDefault()
    e.stopPropagation()
    await db.recipes.update(recipe.id, { isFavorite: !recipe.isFavorite })
    setRecipes((prev) =>
      prev.map((r) => r.id === recipe.id ? { ...r, isFavorite: !r.isFavorite } : r)
    )
  }

  const handleShare = async (e: React.MouseEvent, recipe: Recipe) => {
    e.preventDefault()
    e.stopPropagation()
    await shareRecipe(recipe)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Рецепти</h1>
        <div className="flex items-center gap-2">
          <SortMenu options={sortOptions} value={sortBy} onChange={(v) => setSortBy(v as SortValue)} />
          <Badge variant="info">{filtered.length} / {recipes.length}</Badge>
        </div>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Шукати рецепти..." />

      <div className="flex gap-2 flex-wrap items-center">
        <FilterChips
          chips={categories.map((cat) => ({
            value: cat.id,
            label: cat.name,
            icon: cat.icon,
            count: categoryCounts[cat.id] || 0,
          }))}
          selected={filterCategory}
          onSelect={setFilterCategory}
          allLabel="Всі категорії"
        />
      </div>

      <div className="flex gap-2 flex-wrap items-center">
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
            showFavoritesOnly
              ? 'bg-amber-400 text-white'
              : 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400'
          }`}
        >
          <Star size={14} className={showFavoritesOnly ? 'fill-white' : ''} />
          Улюблені
        </button>

        {(['easy', 'medium', 'hard'] as const).map((d) => (
          <button
            key={d}
            onClick={() => setFilterDifficulty(d === filterDifficulty ? '' : d)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filterDifficulty === d
                ? 'bg-komora-600 text-white'
                : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600'
            }`}
          >
            {DIFFICULTY_LABELS[d]}
          </button>
        ))}

        <button
          onClick={() => setShowProductFilter(!showProductFilter)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${
            filterProductIds.length > 0
              ? 'bg-komora-600 text-white'
              : 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/50'
          }`}
        >
          🥕 За продуктами {filterProductIds.length > 0 && `(${filterProductIds.length})`}
          {showProductFilter ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {showProductFilter && (
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-stone-700 dark:text-stone-300">Оберіть продукти:</h3>
            {filterProductIds.length > 0 && (
              <button onClick={() => setFilterProductIds([])} className="text-xs text-komora-600">
                Скинути
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
            {usedProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => toggleProduct(product.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  filterProductIds.includes(product.id)
                    ? 'bg-komora-600 text-white'
                    : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600'
                }`}
              >
                {product.icon} {product.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon="📖"
          title="Рецепти не знайдено"
          description="Спробуйте змінити фільтри або пошуковий запит"
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((recipe) => {
            const cat = categories.find((c) => c.id === recipe.categoryId)
            return (
              <Link key={recipe.id} to={`/app/recipes/${recipe.id}`} className="card hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{cat?.icon || '📦'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-stone-900 dark:text-stone-100 truncate">{recipe.name}</h3>
                      <button
                        onClick={(e) => toggleFavorite(e, recipe)}
                        className="flex-shrink-0 p-1 -mr-1 -mt-1"
                      >
                        <Star
                          size={18}
                          className={
                            recipe.isFavorite
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-300 hover:text-amber-400 transition-colors'
                          }
                        />
                      </button>
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-2">{recipe.description}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge variant={recipe.difficulty === 'easy' ? 'success' : recipe.difficulty === 'medium' ? 'warning' : 'danger'}>
                        {DIFFICULTY_LABELS[recipe.difficulty]}
                      </Badge>
                      {recipe.prepTime && <Badge>🕐 {(recipe.prepTime || 0) + (recipe.cookTime || 0)} хв</Badge>}
                      <Badge>🫙 {recipe.baseJars} × {recipe.baseJarSize}л</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleShare(e, recipe)}
                    className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-400 hover:text-komora-600"
                    title="Поділитися"
                  >
                    <Share2 size={14} />
                  </button>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
