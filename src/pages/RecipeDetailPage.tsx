import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ChefHat, Clock, Minus, Plus, Star, Share2, Printer, Timer, Pause, Play, Square } from 'lucide-react'
import { useDatabase } from '../hooks/useDatabase'
import { useCookingTimer } from '../hooks/useCookingTimer'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { db } from '../db/database'
import { shareRecipe } from '../utils/recipe-share'
import type { Recipe, Category, Ingredient } from '../types'
import { DIFFICULTY_LABELS } from '../types'
import { scaleIngredients, formatAmount } from '../utils/recipe-scaler'
import { convertUnit, COMMON_UNITS } from '../utils/unit-converter'

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getRecipeById, getAllCategories } = useDatabase()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [targetJars, setTargetJars] = useState(1)
  const [scaledIngredients, setScaledIngredients] = useState<Ingredient[]>([])
  const [showConverter, setShowConverter] = useState(false)
  const [convertIdx, setConvertIdx] = useState(0)
  const [convertTo, setConvertTo] = useState('г')
  const timer = useCookingTimer()

  useEffect(() => {
    const load = async () => {
      if (!id) return
      const rec = await getRecipeById(id)
      if (!rec) { navigate('/app/recipes'); return }
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
  const convertedValue = convertIdx < scaledIngredients.length
    ? convertUnit(scaledIngredients[convertIdx].amount, scaledIngredients[convertIdx].unit, convertTo)
    : null

  const toggleFavorite = async () => {
    const updated = { ...recipe, isFavorite: !recipe.isFavorite }
    setRecipe(updated)
    await db.recipes.update(recipe.id, { isFavorite: !recipe.isFavorite })
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="page-title flex items-center gap-2">
            <span>{category?.icon || '📦'}</span>
            {recipe.name}
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">{category?.name}</p>
        </div>
        <button onClick={toggleFavorite} className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700">
          <Star size={20} className={recipe.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-stone-400'} />
        </button>
        <button onClick={() => shareRecipe(recipe)} className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300">
          <Share2 size={20} />
        </button>
        <button onClick={handlePrint} className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300">
          <Printer size={20} />
        </button>
      </div>

      <p className="text-stone-600 dark:text-stone-400">{recipe.description}</p>

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

      {(timer.running || timer.secondsLeft > 0) && (
        <div className="card bg-komora-50 dark:bg-komora-900/20 border-komora-200 dark:border-komora-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Timer size={24} className="text-komora-600" />
              <div>
                <div className="text-2xl font-bold text-komora-700 dark:text-komora-400 tabular-nums">{timer.display}</div>
                <div className="text-xs text-stone-500">Таймер приготування</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {timer.running ? (
                <button onClick={timer.pause} className="p-2 rounded-xl bg-white dark:bg-stone-700 hover:bg-stone-50 dark:hover:bg-stone-600">
                  <Pause size={18} />
                </button>
              ) : (
                <button onClick={timer.resume} className="p-2 rounded-xl bg-white dark:bg-stone-700 hover:bg-stone-50 dark:hover:bg-stone-600">
                  <Play size={18} />
                </button>
              )}
              <button onClick={timer.stop} className="p-2 rounded-xl bg-white dark:bg-stone-700 hover:bg-stone-50 dark:hover:bg-stone-600">
                <Square size={18} />
              </button>
            </div>
          </div>
          <div className="mt-2 bg-stone-200 dark:bg-stone-700 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-komora-500 rounded-full transition-all" style={{ width: `${timer.progress}%` }} />
          </div>
        </div>
      )}

      {recipe.cookTime && !timer.running && timer.secondsLeft === 0 && (
        <Button variant="secondary" onClick={() => timer.start(recipe.cookTime!)} className="flex items-center gap-2 w-full">
          <Timer size={18} />
          Запустити таймер ({recipe.cookTime} хв)
        </Button>
      )}

      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold dark:text-stone-200">Інгредієнти</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowConverter(!showConverter)}
              className="text-xs text-komora-600 dark:text-komora-400 hover:underline"
            >
              ⚖️ Конвертер
            </button>
            <span className="text-sm text-stone-500 dark:text-stone-400">На</span>
            <button
              onClick={() => setTargetJars(Math.max(1, targetJars - 1))}
              className="p-1 rounded-lg border border-stone-300 dark:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-700"
            >
              <Minus size={16} />
            </button>
            <span className="font-semibold w-8 text-center">{targetJars}</span>
            <button
              onClick={() => setTargetJars(targetJars + 1)}
              className="p-1 rounded-lg border border-stone-300 dark:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-700"
            >
              <Plus size={16} />
            </button>
            <span className="text-sm text-stone-500 dark:text-stone-400">банок ({recipe.baseJarSize}л)</span>
          </div>
        </div>

        {showConverter && (
          <div className="mb-3 p-3 rounded-xl bg-stone-50 dark:bg-stone-700/50 space-y-2">
            <div className="flex items-center gap-2">
              <select
                value={convertIdx}
                onChange={(e) => setConvertIdx(Number(e.target.value))}
                className="input flex-1"
              >
                {scaledIngredients.map((ing, i) => (
                  <option key={i} value={i}>{ing.name} ({formatAmount(ing.amount)} {ing.unit})</option>
                ))}
              </select>
              <span className="text-stone-400">→</span>
              <select value={convertTo} onChange={(e) => setConvertTo(e.target.value)} className="input w-24">
                {COMMON_UNITS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            {convertedValue !== null && (
              <p className="text-sm text-komora-600 dark:text-komora-400">
                = {formatAmount(convertedValue)} {convertTo}
              </p>
            )}
            {convertedValue === null && (
              <p className="text-sm text-stone-400">Неможливо конвертувати між цими одиницями</p>
            )}
          </div>
        )}

        <ul className="space-y-2">
          {scaledIngredients.map((ing, i) => (
            <li key={i} className="flex items-center justify-between py-1 border-b border-stone-100 dark:border-stone-700 last:border-0">
              <span className="text-stone-800 dark:text-stone-200">{ing.name}</span>
              <span className="text-stone-600 dark:text-stone-400 font-medium">{formatAmount(ing.amount)} {ing.unit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2 className="font-semibold mb-3 dark:text-stone-200">Покрокова інструкція</h2>
        <ol className="space-y-3">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-komora-100 dark:bg-komora-900/30 text-komora-700 dark:text-komora-400 flex items-center justify-center text-sm font-semibold">
                {i + 1}
              </span>
              <p className="text-stone-700 dark:text-stone-300 pt-0.5">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {recipe.tips && recipe.tips.length > 0 && (
        <div className="card bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <h2 className="font-semibold text-amber-800 dark:text-amber-400 mb-2">💡 Поради</h2>
          <ul className="space-y-1">
            {recipe.tips.map((tip, i) => (
              <li key={i} className="text-sm text-amber-700 dark:text-amber-300 flex gap-2">
                <span>•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link to="/app/cannings/new" state={{ recipeId: recipe.id }}>
        <Button className="w-full">🫙 Створити закрутку за цим рецептом</Button>
      </Link>
    </div>
  )
}
