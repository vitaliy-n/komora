import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ChefHat, Clock, Flame, TrendingDown, ShoppingCart, Calculator } from 'lucide-react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/database'
import { useDatabase } from '../hooks/useDatabase'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { getCurrentMonth } from '../utils/date'
import { generateShoppingListFromDeficit, type ShoppingListItem } from '../utils/cost-calculator'
import { DIFFICULTY_LABELS, type Recipe } from '../types'

export function PantryChefPage() {
  const { getAllInventory } = useDatabase()
  const [inventory, setInventory] = useState<import('../types').InventoryItem[]>([])
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [jarCount, setJarCount] = useState(5)
  const [jarSize, setJarSize] = useState(1)

  const recipes = useLiveQuery(() => db.recipes.toArray())
  const products = useLiveQuery(() => db.products.toArray())

  useMemo(() => {
    getAllInventory().then(setInventory)
  }, [getAllInventory])

  const currentMonth = getCurrentMonth()
  const productMap = new Map((products || []).map((p) => [p.id, p]))

  const seasonalRecipes = (recipes || []).filter((r) =>
    r.productIds.some((pid) => {
      const product = productMap.get(pid)
      return product?.seasonMonths.includes(currentMonth)
    }),
  )

  const scoredRecipes = seasonalRecipes.map((recipe) => {
    const inStock = recipe.productIds.filter((pid) => {
      const product = productMap.get(pid)
      return inventory.some((i) => i.name.toLowerCase() === product?.name.toLowerCase())
    }).length
    const score = inStock / Math.max(recipe.productIds.length, 1)
    return { recipe, score, inStock, total: recipe.productIds.length }
  }).sort((a, b) => b.score - a.score)

  const shoppingList: ShoppingListItem[] = useMemo(() => {
    if (!selectedRecipe) return []
    return generateShoppingListFromDeficit(selectedRecipe, jarCount, jarSize, inventory)
  }, [selectedRecipe, jarCount, jarSize, inventory])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ChefHat size={28} className="text-komora-600" />
        <div>
          <h1 className="page-title">Шеф-комори</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">Рецепти на основі ваших запасів</p>
        </div>
      </div>

      <div className="card">
        <h2 className="font-semibold mb-3 dark:text-stone-200 flex items-center gap-2">
          <Flame size={18} className="text-orange-500" />
          Сезонні рецепти зараз
        </h2>
        {scoredRecipes.length > 0 ? (
          <div className="space-y-2">
            {scoredRecipes.slice(0, 10).map(({ recipe, score, inStock, total }) => (
              <button
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className={`w-full text-left card hover:shadow-md transition-all ${
                  selectedRecipe?.id === recipe.id ? 'ring-2 ring-komora-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-stone-900 dark:text-stone-100">{recipe.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-stone-500 dark:text-stone-400">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {recipe.prepTime || 30}+{recipe.cookTime || 60} хв
                      </span>
                      <span>{DIFFICULTY_LABELS[recipe.difficulty]}</span>
                      <span>{recipe.baseJars} банок</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={score > 0.7 ? 'success' : score > 0.3 ? 'warning' : 'info'}>
                      {inStock}/{total}
                    </Badge>
                    <span className="text-xs text-stone-400">{Math.round(score * 100)}% в наявності</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Поки що немає сезонних рецептів. Додайте продукти в інвентар, щоб отримати рекомендації.
          </p>
        )}
      </div>

      {selectedRecipe && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold dark:text-stone-200">{selectedRecipe.name}</h2>
            <Link to={`/app/recipes/${selectedRecipe.id}`} className="text-sm text-komora-600 hover:underline">
              Переглянути рецепт →
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="text-xs text-stone-500 dark:text-stone-400 block mb-1">Кількість банок</label>
              <input
                type="number"
                value={jarCount}
                onChange={(e) => setJarCount(Math.max(1, Number(e.target.value)))}
                className="input w-24"
                min={1}
              />
            </div>
            <div>
              <label className="text-xs text-stone-500 dark:text-stone-400 block mb-1">Розмір банки (л)</label>
              <select
                value={jarSize}
                onChange={(e) => setJarSize(Number(e.target.value))}
                className="input w-24"
              >
                {[0.5, 1, 1.5, 2, 3].map((s) => (
                  <option key={s} value={s}>{s} л</option>
                ))}
              </select>
            </div>
          </div>

          {shoppingList.length > 0 ? (
            <div>
              <h3 className="font-medium text-stone-700 dark:text-stone-300 mb-2 flex items-center gap-2">
                <TrendingDown size={16} className="text-red-500" />
                Не вистачає продуктів
              </h3>
              <div className="space-y-1">
                {shoppingList.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-700/50">
                    <div>
                      <span className="text-sm font-medium text-stone-800 dark:text-stone-200">{item.name}</span>
                      <span className="text-xs text-stone-400 ml-2">
                        є: {item.haveAmount} {item.unit} / треба: {item.needAmount} {item.unit}
                      </span>
                    </div>
                    <Badge variant="danger">
                      +{item.deficit} {item.unit}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button
                className="mt-3 w-full"
                onClick={() => {
                  for (const item of shoppingList) {
                    db.shoppingItems.add({
                      id: `shop-${Date.now()}-${item.name}`,
                      name: `${item.name} (${item.deficit} ${item.unit})`,
                      checked: false,
                    })
                  }
                }}
              >
                <ShoppingCart size={18} className="mr-2" />
                Додати в список покупок
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <Calculator size={32} className="mx-auto text-green-500 mb-2" />
              <p className="text-sm text-stone-600 dark:text-stone-400">
                У вас є всі продукти для цього рецепту! 🎉
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
