import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LogOut, ArrowLeft, Plus, Trash2, Edit, Save, X, BookOpen, CheckCircle } from 'lucide-react'
import { api, clearToken, isAuthenticated } from '../lib/api'
import { builtInCategories } from '../data/categories'
import { builtInProducts } from '../data/products-db'
import type { Recipe, Ingredient, Difficulty } from '../types'
import { DIFFICULTY_LABELS } from '../types'

interface RecipeForm {
  id: string
  name: string
  categoryId: string
  description: string
  ingredients: Ingredient[]
  steps: string[]
  baseJars: number
  baseJarSize: number
  prepTime: number
  cookTime: number
  difficulty: Difficulty
  tips: string[]
  isBuiltIn: boolean
  productIds: string[]
}

const emptyForm: RecipeForm = {
  id: '',
  name: '',
  categoryId: 'cat-marynady',
  description: '',
  ingredients: [{ name: '', amount: 1, unit: 'кг' }],
  steps: [''],
  baseJars: 1,
  baseJarSize: 1,
  prepTime: 30,
  cookTime: 60,
  difficulty: 'easy',
  tips: [],
  isBuiltIn: false,
  productIds: [],
}

export function AdminRecipesPage() {
  const navigate = useNavigate()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [editing, setEditing] = useState<RecipeForm | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin')
      return
    }
    loadRecipes()
  }, [])

  const loadRecipes = async () => {
    setLoading(true)
    try {
      const data = await api.getRecipes()
      const items = Array.isArray(data) ? data : data.items
      setRecipes(items)
    } catch {
      clearToken()
      navigate('/admin')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    clearToken()
    navigate('/admin')
  }

  const startNew = () => {
    const id = `rec-admin-${Date.now()}`
    setEditing({ ...emptyForm, id })
  }

  const startEdit = (recipe: Recipe) => {
    setEditing({
      id: recipe.id,
      name: recipe.name,
      categoryId: recipe.categoryId,
      description: recipe.description,
      ingredients: recipe.ingredients.length ? recipe.ingredients : [{ name: '', amount: 1, unit: 'кг' }],
      steps: recipe.steps.length ? recipe.steps : [''],
      baseJars: recipe.baseJars,
      baseJarSize: recipe.baseJarSize,
      prepTime: recipe.prepTime || 0,
      cookTime: recipe.cookTime || 0,
      difficulty: recipe.difficulty,
      tips: recipe.tips || [],
      isBuiltIn: recipe.isBuiltIn,
      productIds: recipe.productIds || [],
    })
  }

  const saveRecipe = async () => {
    if (!editing) return
    if (!editing.name.trim()) {
      setMessage('Введіть назву рецепту')
      return
    }
    setLoading(true)
    setMessage('')
    try {
      const cleanIngredients = editing.ingredients.filter(i => i.name.trim())
      const cleanSteps = editing.steps.filter(s => s.trim())
      const productIds = cleanIngredients
        .map(i => i.productId)
        .filter((id): id is string => !!id)

      const recipe: Recipe = {
        id: editing.id,
        name: editing.name,
        categoryId: editing.categoryId,
        description: editing.description,
        ingredients: cleanIngredients,
        steps: cleanSteps,
        baseJars: editing.baseJars,
        baseJarSize: editing.baseJarSize,
        prepTime: editing.prepTime || undefined,
        cookTime: editing.cookTime || undefined,
        difficulty: editing.difficulty,
        tips: editing.tips.length ? editing.tips : undefined,
        isBuiltIn: editing.isBuiltIn,
        productIds: [...new Set(productIds)],
        createdAt: new Date().toISOString(),
      }
      await api.saveRecipe(recipe)
      setMessage(`Рецепт "${recipe.name}" збережено`)
      setEditing(null)
      loadRecipes()
    } catch (err: any) {
      setMessage(`Помилка: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const deleteRecipe = async (id: string, name: string) => {
    if (!confirm(`Видалити рецепт "${name}"?`)) return
    try {
      await api.deleteRecipe(id)
      setMessage(`Рецепт "${name}" видалено`)
      loadRecipes()
    } catch (err: any) {
      setMessage(`Помилка: ${err.message}`)
    }
  }

  const addIngredient = () => {
    if (!editing) return
    setEditing({ ...editing, ingredients: [...editing.ingredients, { name: '', amount: 1, unit: 'кг' }] })
  }

  const updateIngredient = (i: number, field: keyof Ingredient, value: any) => {
    if (!editing) return
    const ingredients = [...editing.ingredients]
    ingredients[i] = { ...ingredients[i], [field]: value }
    setEditing({ ...editing, ingredients })
  }

  const removeIngredient = (i: number) => {
    if (!editing) return
    setEditing({ ...editing, ingredients: editing.ingredients.filter((_, idx) => idx !== i) })
  }

  const addStep = () => {
    if (!editing) return
    setEditing({ ...editing, steps: [...editing.steps, ''] })
  }

  const updateStep = (i: number, value: string) => {
    if (!editing) return
    const steps = [...editing.steps]
    steps[i] = value
    setEditing({ ...editing, steps })
  }

  const removeStep = (i: number) => {
    if (!editing) return
    setEditing({ ...editing, steps: editing.steps.filter((_, idx) => idx !== i) })
  }

  const addTip = () => {
    if (!editing) return
    setEditing({ ...editing, tips: [...editing.tips, ''] })
  }

  const updateTip = (i: number, value: string) => {
    if (!editing) return
    const tips = [...editing.tips]
    tips[i] = value
    setEditing({ ...editing, tips })
  }

  const removeTip = (i: number) => {
    if (!editing) return
    setEditing({ ...editing, tips: editing.tips.filter((_, idx) => idx !== i) })
  }

  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  )

  const catName = (id: string) => builtInCategories.find(c => c.id === id)?.name || 'Інше'
  const catIcon = (id: string) => builtInCategories.find(c => c.id === id)?.icon || '📦'

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🫙</span>
            <span className="font-bold text-stone-800">Рецепти — Адмін</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="text-sm text-stone-500 hover:text-stone-700 flex items-center gap-1">
              <ArrowLeft size={16} />
              Дашборд
            </Link>
            <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1">
              <LogOut size={16} />
              Вийти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {message && (
          <div className="flex items-center gap-2 text-sm text-komora-700 bg-komora-50 rounded-xl px-4 py-3 border border-komora-200">
            <CheckCircle size={18} />
            {message}
          </div>
        )}

        {editing ? (
          <RecipeEditor
            form={editing}
            setForm={setEditing}
            onSave={saveRecipe}
            onCancel={() => setEditing(null)}
            loading={loading}
            onAddIngredient={addIngredient}
            onUpdateIngredient={updateIngredient}
            onRemoveIngredient={removeIngredient}
            onAddStep={addStep}
            onUpdateStep={updateStep}
            onRemoveStep={removeStep}
            onAddTip={addTip}
            onUpdateTip={updateTip}
            onRemoveTip={removeTip}
          />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-stone-800">Рецепти ({recipes.length})</h2>
              <button
                onClick={startNew}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-komora-600 text-white font-medium hover:bg-komora-700 transition-colors"
              >
                <Plus size={18} />
                Новий рецепт
              </button>
            </div>

            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Пошук рецептів..."
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none"
            />

            {loading ? (
              <p className="text-stone-500 text-center py-8">Завантаження...</p>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen size={48} className="mx-auto text-stone-300 mb-3" />
                <p className="text-stone-500">Рецептів не знайдено</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map(recipe => (
                  <div key={recipe.id} className="bg-white rounded-xl border border-stone-200 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-2xl">{catIcon(recipe.categoryId)}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-stone-900 truncate">{recipe.name}</h3>
                        <p className="text-xs text-stone-500">
                          {catName(recipe.categoryId)} · {DIFFICULTY_LABELS[recipe.difficulty]} · {recipe.ingredients.length} інгр.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => startEdit(recipe)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-600">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => deleteRecipe(recipe.id, recipe.name)} className="p-2 rounded-lg hover:bg-red-50 text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

function RecipeEditor({
  form, setForm, onSave, onCancel, loading,
  onAddIngredient, onUpdateIngredient, onRemoveIngredient,
  onAddStep, onUpdateStep, onRemoveStep,
  onAddTip, onUpdateTip, onRemoveTip,
}: {
  form: RecipeForm
  setForm: (f: RecipeForm) => void
  onSave: () => void
  onCancel: () => void
  loading: boolean
  onAddIngredient: () => void
  onUpdateIngredient: (i: number, field: keyof Ingredient, value: any) => void
  onRemoveIngredient: (i: number) => void
  onAddStep: () => void
  onUpdateStep: (i: number, value: string) => void
  onRemoveStep: (i: number) => void
  onAddTip: () => void
  onUpdateTip: (i: number, value: string) => void
  onRemoveTip: (i: number) => void
}) {
  const products = builtInProducts

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-stone-800">
          {form.name ? form.name : 'Новий рецепт'}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onSave}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-komora-600 text-white font-medium hover:bg-komora-700 transition-colors disabled:opacity-50"
          >
            <Save size={18} />
            Зберегти
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 transition-colors"
          >
            <X size={18} />
            Скасувати
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Назва *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none"
              placeholder="Мариновані огірки"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Категорія</label>
            <select
              value={form.categoryId}
              onChange={e => setForm({ ...form, categoryId: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none"
            >
              {builtInCategories.map(c => (
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Опис</label>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={2}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none"
            placeholder="Короткий опис рецепту..."
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Банок</label>
            <input
              type="number"
              value={form.baseJars}
              onChange={e => setForm({ ...form, baseJars: +e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none"
              min={1}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Об'єм (л)</label>
            <select
              value={form.baseJarSize}
              onChange={e => setForm({ ...form, baseJarSize: +e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none"
            >
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
              <option value={1.5}>1.5</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Підготовка (хв)</label>
            <input
              type="number"
              value={form.prepTime}
              onChange={e => setForm({ ...form, prepTime: +e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none"
              min={0}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Готування (хв)</label>
            <input
              type="number"
              value={form.cookTime}
              onChange={e => setForm({ ...form, cookTime: +e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none"
              min={0}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Складність</label>
          <div className="flex gap-2">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map(d => (
              <button
                key={d}
                onClick={() => setForm({ ...form, difficulty: d })}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  form.difficulty === d
                    ? 'bg-komora-600 text-white'
                    : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-50'
                }`}
              >
                {DIFFICULTY_LABELS[d]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-stone-800">Інгредієнти</h3>
          <button onClick={onAddIngredient} className="flex items-center gap-1 text-sm text-komora-600 hover:text-komora-700 font-medium">
            <Plus size={16} /> Додати
          </button>
        </div>
        <div className="space-y-2">
          {form.ingredients.map((ing, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={ing.name}
                onChange={e => onUpdateIngredient(i, 'name', e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none text-sm"
                placeholder="Назва інгредієнта"
                list="product-list"
                onChangeCapture={e => {
                  const val = e.currentTarget.value
                  const found = products.find(p => p.name === val)
                  if (found) onUpdateIngredient(i, 'productId', found.id)
                }}
              />
              <input
                type="number"
                value={ing.amount}
                onChange={e => onUpdateIngredient(i, 'amount', +e.target.value)}
                className="w-20 px-3 py-2 rounded-lg border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none text-sm"
                min={0}
                step={0.1}
              />
              <input
                type="text"
                value={ing.unit}
                onChange={e => onUpdateIngredient(i, 'unit', e.target.value)}
                className="w-20 px-3 py-2 rounded-lg border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none text-sm"
                placeholder="кг"
              />
              <button onClick={() => onRemoveIngredient(i)} className="p-2 rounded-lg hover:bg-red-50 text-red-500">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
        <datalist id="product-list">
          {products.slice(0, 200).map(p => (
            <option key={p.id} value={p.name} />
          ))}
        </datalist>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-stone-800">Кроки приготування</h3>
          <button onClick={onAddStep} className="flex items-center gap-1 text-sm text-komora-600 hover:text-komora-700 font-medium">
            <Plus size={16} /> Додати
          </button>
        </div>
        <div className="space-y-2">
          {form.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-komora-50 text-komora-700 text-sm font-medium flex items-center justify-center mt-1">
                {i + 1}
              </span>
              <textarea
                value={step}
                onChange={e => onUpdateStep(i, e.target.value)}
                rows={2}
                className="flex-1 px-3 py-2 rounded-lg border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none text-sm"
                placeholder="Опис кроку..."
              />
              <button onClick={() => onRemoveStep(i)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 mt-1">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-stone-800">Поради</h3>
          <button onClick={onAddTip} className="flex items-center gap-1 text-sm text-komora-600 hover:text-komora-700 font-medium">
            <Plus size={16} /> Додати
          </button>
        </div>
        <div className="space-y-2">
          {form.tips.length === 0 ? (
            <p className="text-sm text-stone-400">Поки немає порад</p>
          ) : (
            form.tips.map((tip, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={tip}
                  onChange={e => onUpdateTip(i, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-stone-300 focus:border-komora-500 focus:ring-1 focus:ring-komora-500 outline-none text-sm"
                  placeholder="Порада..."
                />
                <button onClick={() => onRemoveTip(i)} className="p-2 rounded-lg hover:bg-red-50 text-red-500">
                  <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex gap-2 pb-6">
        <button
          onClick={onSave}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-komora-600 text-white font-medium hover:bg-komora-700 transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {loading ? 'Збереження...' : 'Зберегти рецепт'}
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 transition-colors"
        >
          Скасувати
        </button>
      </div>
    </div>
  )
}
