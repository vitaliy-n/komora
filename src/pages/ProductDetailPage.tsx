import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Thermometer, Droplets, AlertTriangle, Leaf, ShieldAlert } from 'lucide-react'
import { useDatabase } from '../hooks/useDatabase'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import type { Product, Recipe } from '../types'
import { STORAGE_METHOD_LABELS } from '../types'
import { getMonthName, getCurrentMonth, getSeasonLabel } from '../utils/date'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getProductById, getRecipesByProduct, getAllProducts } = useDatabase()
  const [product, setProduct] = useState<Product | null>(null)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])

  useEffect(() => {
    const load = async () => {
      if (!id) return
      const [p, r, all] = await Promise.all([
        getProductById(id),
        getRecipesByProduct(id),
        getAllProducts(),
      ])
      if (!p) { navigate('/app/products'); return }
      setProduct(p)
      setRecipes(r)
      setAllProducts(all)
    }
    load()
  }, [id, getProductById, getRecipesByProduct, getAllProducts, navigate])

  if (!product) return null

  const currentMonth = getCurrentMonth()
  const inSeason = product.seasonMonths.includes(currentMonth)

  const getCompatibleProductName = (prodId: string) => {
    return allProducts.find((p) => p.id === prodId)?.name || prodId
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-stone-100">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="page-title flex items-center gap-2">
            <span className="text-3xl">{product.icon}</span>
            {product.name}
          </h1>
          <p className="text-sm text-stone-500">{product.category}</p>
        </div>
        {inSeason && <Badge variant="success">🌿 Зараз сезон!</Badge>}
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <Leaf size={18} className="text-komora-600" />
          <h2 className="font-semibold">Сезонність</h2>
        </div>
        <p className="text-stone-600 mb-2">{getSeasonLabel(product.seasonMonths)}</p>
        <div className="flex gap-1">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <div
              key={month}
              className={`flex-1 h-8 rounded flex items-center justify-center text-[10px] font-medium ${
                product.seasonMonths.includes(month)
                  ? month === currentMonth
                    ? 'bg-komora-600 text-white'
                    : 'bg-komora-100 text-komora-700'
                  : 'bg-stone-50 text-stone-300'
              }`}
              title={getMonthName(month)}
            >
              {getMonthName(month).substring(0, 3)}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <Thermometer size={18} className="text-komora-600" />
          <h2 className="font-semibold">Умови зберігання</h2>
        </div>
        <div className="space-y-3">
          {product.storage.map((s) => (
            <div key={s.method} className="p-3 rounded-xl bg-stone-50">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-stone-800">{STORAGE_METHOD_LABELS[s.method]}</h3>
                <Badge variant="info">{Math.floor(s.shelfLifeDays / 30) > 0 ? `${Math.floor(s.shelfLifeDays / 30)} міс.` : `${s.shelfLifeDays} дн.`}</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-stone-600">
                <span className="flex items-center gap-1">
                  <Thermometer size={14} />
                  {s.temperature.min}...{s.temperature.max}°C
                </span>
                {s.humidity && (
                  <span className="flex items-center gap-1">
                    <Droplets size={14} />
                    {s.humidity.min}–{s.humidity.max}%
                  </span>
                )}
              </div>
              {s.tips && <p className="text-xs text-stone-500 mt-1">💡 {s.tips}</p>}
            </div>
          ))}
        </div>
      </div>

      {product.compatibility.length > 0 && (
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert size={18} className="text-komora-600" />
            <h2 className="font-semibold">Сумісність</h2>
          </div>
          <div className="space-y-2">
            {product.compatibility.map((comp) => (
              <div key={comp.productId} className={`p-3 rounded-xl ${comp.compatible ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex items-center gap-2">
                  <span className={comp.compatible ? 'text-green-600' : 'text-red-600'}>
                    {comp.compatible ? '✅' : '❌'}
                  </span>
                  <span className="font-medium text-stone-800">{getCompatibleProductName(comp.productId)}</span>
                </div>
                <p className="text-xs text-stone-600 ml-6">{comp.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={18} className="text-amber-600" />
          <h2 className="font-semibold">Ознаки псування</h2>
        </div>
        <ul className="space-y-1">
          {product.spoilageSigns.map((sign, i) => (
            <li key={i} className="flex gap-2 text-sm text-stone-700">
              <span className="text-amber-500">⚠️</span>
              <span>{sign}</span>
            </li>
          ))}
        </ul>
      </div>

      {product.tips && product.tips.length > 0 && (
        <div className="card bg-blue-50 border-blue-200">
          <h2 className="font-semibold text-blue-800 mb-2">💡 Поради</h2>
          <ul className="space-y-1">
            {product.tips.map((tip, i) => (
              <li key={i} className="text-sm text-blue-700 flex gap-2">
                <span>•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {recipes.length > 0 && (
        <div className="card">
          <h2 className="font-semibold mb-3">📖 Рецепти з цим продуктом</h2>
          <div className="space-y-2">
            {recipes.map((recipe) => (
              <Link key={recipe.id} to={`/app/recipes/${recipe.id}`} className="block p-2 rounded-xl hover:bg-stone-50 transition-colors">
                <span className="text-sm font-medium text-komora-600">{recipe.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Link to="/app/inventory">
        <Button variant="secondary" className="w-full">📦 Додати до запасів</Button>
      </Link>
    </div>
  )
}
