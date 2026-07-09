import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useDatabase } from '../hooks/useDatabase'
import { SearchBar } from '../components/common/SearchBar'
import { FilterChips } from '../components/common/FilterChips'
import { EmptyState } from '../components/common/EmptyState'
import { Badge } from '../components/ui/Badge'
import type { Recipe, Category, Product } from '../types'
import { DIFFICULTY_LABELS } from '../types'

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

  const filtered = recipes.filter((r) => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false
    if (filterCategory && r.categoryId !== filterCategory) return false
    if (filterDifficulty && r.difficulty !== filterDifficulty) return false
    if (filterProductIds.length > 0 && !filterProductIds.every((pid) => r.productIds.includes(pid))) return false
    return true
  })

  const toggleProduct = (productId: string) => {
    setFilterProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Рецепти</h1>
        <Badge variant="info">{filtered.length} / {recipes.length}</Badge>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Шукати рецепти..." />

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

      <div className="flex gap-2 flex-wrap">
        {(['easy', 'medium', 'hard'] as const).map((d) => (
          <button
            key={d}
            onClick={() => setFilterDifficulty(d === filterDifficulty ? '' : d)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filterDifficulty === d ? 'bg-komora-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
          >
            {DIFFICULTY_LABELS[d]}
          </button>
        ))}

        <button
          onClick={() => setShowProductFilter(!showProductFilter)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${
            filterProductIds.length > 0 ? 'bg-komora-600 text-white' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
          }`}
        >
          🥕 За продуктами {filterProductIds.length > 0 && `(${filterProductIds.length})`}
          {showProductFilter ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {showProductFilter && (
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-stone-700">Оберіть продукти:</h3>
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
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
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
              <Link key={recipe.id} to={`/app/recipes/${recipe.id}`} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{cat?.icon || '📦'}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-stone-900">{recipe.name}</h3>
                    <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">{recipe.description}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge variant={recipe.difficulty === 'easy' ? 'success' : recipe.difficulty === 'medium' ? 'warning' : 'danger'}>
                        {DIFFICULTY_LABELS[recipe.difficulty]}
                      </Badge>
                      {recipe.prepTime && <Badge>🕐 {(recipe.prepTime || 0) + (recipe.cookTime || 0)} хв</Badge>}
                      <Badge>🫙 {recipe.baseJars} × {recipe.baseJarSize}л</Badge>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
