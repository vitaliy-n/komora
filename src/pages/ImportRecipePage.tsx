import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { CheckCircle2, AlertCircle, BookOpen } from 'lucide-react'
import { db } from '../db/database'
import { decodeRecipeFromUrl } from '../utils/recipe-share'
import { Button } from '../components/ui/Button'
import { DIFFICULTY_LABELS, type Recipe } from '../types'

export function ImportRecipePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [imported, setImported] = useState(false)

  useEffect(() => {
    const data = searchParams.get('data')
    if (!data) {
      setError('Посилання не містить даних рецепту')
      return
    }
    const decoded = decodeRecipeFromUrl(data)
    if (!decoded) {
      setError('Не вдалося розкодувати рецепт з посилання')
      return
    }
    setRecipe(decoded)
  }, [searchParams])

  const handleImport = async () => {
    if (!recipe) return
    await db.recipes.put(recipe)
    setImported(true)
    setTimeout(() => navigate(`/app/recipes/${recipe.id}`), 1500)
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="card text-center py-12">
          <AlertCircle size={48} className="mx-auto text-red-400 mb-3" />
          <p className="text-stone-600 dark:text-stone-400">{error}</p>
          <Button onClick={() => navigate('/app/recipes')} className="mt-4">До рецептів</Button>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="w-8 h-8 border-3 border-komora-200 border-t-komora-600 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <BookOpen size={28} className="text-komora-600" />
        <h1 className="page-title">Імпорт рецепту</h1>
      </div>

      {imported ? (
        <div className="card text-center py-12">
          <CheckCircle2 size={48} className="mx-auto text-green-500 mb-3" />
          <h2 className="font-semibold text-stone-800 dark:text-stone-200 mb-1">Рецепт імпортовано!</h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">Перенаправлення...</p>
        </div>
      ) : (
        <>
          <div className="card space-y-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">{recipe.name}</h2>
              {recipe.description && (
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">{recipe.description}</p>
              )}
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-stone-500 dark:text-stone-400">
              <span>📊 {recipe.baseJars} банок по {recipe.baseJarSize} л</span>
              <span>⏱️ {recipe.prepTime || 30}+{recipe.cookTime || 60} хв</span>
              <span>📝 {DIFFICULTY_LABELS[recipe.difficulty]}</span>
            </div>

            <div>
              <h3 className="font-medium text-stone-700 dark:text-stone-300 mb-2">Інгредієнти:</h3>
              <ul className="space-y-1">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="text-sm text-stone-600 dark:text-stone-400">
                    • {ing.name} — {ing.amount} {ing.unit}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-stone-700 dark:text-stone-300 mb-2">Кроки:</h3>
              <ol className="space-y-2">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="text-sm text-stone-600 dark:text-stone-400">
                    {i + 1}. {step}
                  </li>
                ))}
              </ol>
            </div>

            <Button onClick={handleImport} className="w-full">
              <CheckCircle2 size={18} className="mr-2" />
              Імпортувати в мою колекцію
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
