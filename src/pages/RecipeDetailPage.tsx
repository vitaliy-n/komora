import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ChefHat, Clock, Minus, Plus } from 'lucide-react'
import { useDatabase } from '../hooks/useDatabase'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import type { Recipe, Category, Ingredient } from '../types'
import { DIFFICULTY_LABELS } from '../types'
import { scaleIngredients, formatAmount } from '../utils/recipe-scaler'

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getRecipeById, getAllCategories } = useDatabase()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [targetJars, setTargetJars] = useState(1)
  const [scaledIngredients, setScaledIngredients] = useState<Ingredient[]>([])

  useEffect(() => {
    const load = async () => {
      if (!id) return
      const rec = await getRecipeById(id)
      if (!rec) { navigate('/recipes'); return }
      setRecipe(rec)
      setTargetJars(rec.baseJars)
      setScaledIngredients(rec.ingredients)
      const cats = await getAllCategories()
      setCategory(cats.find((c) => c.id === rec.categoryId) || null)
    }
    load()
  }, [id, getRecipeById, getAllCategories, navigate])

  useEffect(() => {
    if (!recipe) return
    setScaledIngredients(scaleIngredients(recipe.ingredients, recipe.baseJars, targetJars))
  }, [targetJars, recipe])

  if (!recipe) return null

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-stone-100">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="page-title flex items-center gap-2">
            <span>{category?.icon || '📦'}</span>
            {recipe.name}
          </h1>
          <p className="text-sm text-stone-500">{category?.name}</p>
        </div>
      </div>

      <p className="text-stone-600">{recipe.description}</p>

      <div className="flex gap-2 flex-wrap">
        <Badge variant={recipe.difficulty === 'easy' ? 'success' : recipe.difficulty === 'medium' ? 'warning' : 'danger'}>
          <ChefHat size={14} />
          {DIFFICULTY_LABELS[recipe.difficulty]}
        </Badge>
        {totalTime > 0 && (
          <Badge variant="info">
            <Clock size={14} />
            {totalTime} хв
          </Badge>
        )}
        {recipe.prepTime && <Badge>Підготовка: {recipe.prepTime} хв</Badge>}
        {recipe.cookTime && <Badge>Готування: {recipe.cookTime} хв</Badge>}
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Інгредієнти</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-stone-500">На</span>
            <button
              onClick={() => setTargetJars(Math.max(1, targetJars - 1))}
              className="p-1 rounded-lg border border-stone-300 hover:bg-stone-50"
            >
              <Minus size={16} />
            </button>
            <span className="font-semibold w-8 text-center">{targetJars}</span>
            <button
              onClick={() => setTargetJars(targetJars + 1)}
              className="p-1 rounded-lg border border-stone-300 hover:bg-stone-50"
            >
              <Plus size={16} />
            </button>
            <span className="text-sm text-stone-500">банок ({recipe.baseJarSize}л)</span>
          </div>
        </div>
        <ul className="space-y-2">
          {scaledIngredients.map((ing, i) => (
            <li key={i} className="flex items-center justify-between py-1 border-b border-stone-50 last:border-0">
              <span className="text-stone-800">{ing.name}</span>
              <span className="text-stone-600 font-medium">{formatAmount(ing.amount)} {ing.unit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2 className="font-semibold mb-3">Покрокова інструкція</h2>
        <ol className="space-y-3">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-komora-100 text-komora-700 flex items-center justify-center text-sm font-semibold">
                {i + 1}
              </span>
              <p className="text-stone-700 pt-0.5">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {recipe.tips && recipe.tips.length > 0 && (
        <div className="card bg-amber-50 border-amber-200">
          <h2 className="font-semibold text-amber-800 mb-2">💡 Поради</h2>
          <ul className="space-y-1">
            {recipe.tips.map((tip, i) => (
              <li key={i} className="text-sm text-amber-700 flex gap-2">
                <span>•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link to="/cannings/new" state={{ recipeId: recipe.id }}>
        <Button className="w-full">🫙 Створити закрутку за цим рецептом</Button>
      </Link>
    </div>
  )
}
