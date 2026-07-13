import { useState, useEffect } from 'react'
import { Plus, Trash2, Check, ShoppingCart, BookOpen, ClipboardList, Wallet } from 'lucide-react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/database'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Modal } from '../components/ui/Modal'
import { useToast } from '../components/ui/Toast'
import { generateId } from '../utils/date'
import { toISODate } from '../utils/date'
import type { ShoppingTemplate } from '../types'

interface ShoppingItem {
  id: string
  name: string
  quantity: string
  checked: boolean
  fromRecipe?: string
  price?: number
}

const BUILTIN_TEMPLATES: ShoppingTemplate[] = [
  {
    id: 'tpl-basic',
    name: 'Базовий набір',
    isBuiltIn: true,
    items: [
      { name: 'Сіль', quantity: '1 кг' },
      { name: 'Цукор', quantity: '2 кг' },
      { name: 'Оцет 9%', quantity: '1 л' },
      { name: 'Перець горошком', quantity: '100 г' },
      { name: 'Лавровий лист', quantity: '50 г' },
    ],
  },
  {
    id: 'tpl-canning',
    name: 'Для консервації',
    isBuiltIn: true,
    items: [
      { name: 'Банки 1л', quantity: '10 шт' },
      { name: 'Кришки', quantity: '20 шт' },
      { name: 'Сіль', quantity: '2 кг' },
      { name: 'Цукор', quantity: '3 кг' },
      { name: 'Оцет 9%', quantity: '2 л' },
      { name: 'Лимонна кислота', quantity: '100 г' },
    ],
  },
  {
    id: 'tpl-weekly',
    name: 'Щотижня',
    isBuiltIn: true,
    items: [
      { name: 'Хліб', quantity: '2 шт' },
      { name: 'Молоко', quantity: '2 л' },
      { name: 'Яйця', quantity: '30 шт' },
      { name: 'Картопля', quantity: '5 кг' },
      { name: 'Цибуля', quantity: '2 кг' },
    ],
  },
]

export function ShoppingListPage() {
  const { show } = useToast()
  const [showAdd, setShowAdd] = useState(false)
  const [showRecipePicker, setShowRecipePicker] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showBudget, setShowBudget] = useState(false)
  const [form, setForm] = useState({ name: '', quantity: '1 шт', price: '' })
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([])
  const [budget, setBudget] = useState<number | null>(null)
  const [budgetInput, setBudgetInput] = useState('')

  const items = useLiveQuery(() => db.shoppingItems?.toArray() || [])
  const recipes = useLiveQuery(() => db.recipes.toArray())
  const customTemplates = useLiveQuery(() => db.shoppingTemplates?.toArray() || [])

  useEffect(() => {
    const stored = localStorage.getItem('komora-budget')
    if (stored) setBudget(Number(stored))
  }, [])

  const allTemplates = [...BUILTIN_TEMPLATES, ...(customTemplates || [])]

  if (!items || !recipes) {
    return <div className="flex justify-center py-8">Завантаження...</div>
  }

  const sorted = [...items].sort((a, b) => Number(a.checked) - Number(b.checked))
  const checkedCount = items.filter((i) => i.checked).length
  const progress = items.length > 0 ? (checkedCount / items.length) * 100 : 0
  const totalCost = items.filter((i) => !i.checked && i.price).reduce((sum, i) => sum + (i.price || 0), 0)
  const budgetUsed = budget ? (totalCost / budget) * 100 : 0

  const addItem = async (item: Omit<ShoppingItem, 'id'>) => {
    await db.shoppingItems?.add({ ...item, id: generateId() })
    if (item.price) {
      await db.priceHistory?.add({
        id: generateId(),
        productName: item.name,
        date: toISODate(new Date()),
        price: item.price,
      })
    }
    show('Додано до списку', 'success')
  }

  const toggleChecked = async (id: string) => {
    const item = items.find((i) => i.id === id)
    await db.shoppingItems?.update(id, { checked: !item?.checked })
  }

  const deleteItem = async (id: string) => {
    await db.shoppingItems?.delete(id)
  }

  const clearChecked = async () => {
    const checked = items.filter((i) => i.checked)
    for (const item of checked) {
      await db.shoppingItems?.delete(item.id)
    }
    show(`Видалено ${checked.length} позицій`, 'success')
  }

  const handleAddFromRecipes = async () => {
    const recipeObjs = recipes.filter((r) => selectedRecipes.includes(r.id))
    const newItems: ShoppingItem[] = []
    for (const recipe of recipeObjs) {
      for (const ing of recipe.ingredients) {
        const existing = items.find((i) => i.name.toLowerCase() === ing.name.toLowerCase() && !i.checked)
        if (existing) continue
        newItems.push({
          id: generateId(),
          name: ing.name,
          quantity: `${ing.amount} ${ing.unit || ''}`.trim(),
          checked: false,
          fromRecipe: recipe.name,
        })
      }
    }
    if (newItems.length > 0) {
      await db.shoppingItems?.bulkAdd(newItems)
      show(`Додано ${newItems.length} позицій з рецептів`, 'success')
    } else {
      show('Усі інгредієнти вже в списку', 'info')
    }
    setSelectedRecipes([])
    setShowRecipePicker(false)
  }

  const handleAddFromTemplate = async (template: ShoppingTemplate) => {
    const newItems: ShoppingItem[] = template.items
      .filter((ti) => !items.find((i) => i.name.toLowerCase() === ti.name.toLowerCase() && !i.checked))
      .map((ti) => ({
        id: generateId(),
        name: ti.name,
        quantity: ti.quantity,
        checked: false,
      }))
    if (newItems.length > 0) {
      await db.shoppingItems?.bulkAdd(newItems)
      show(`Додано ${newItems.length} з шаблону "${template.name}"`, 'success')
    } else {
      show('Усі позиції вже в списку', 'info')
    }
    setShowTemplates(false)
  }

  const saveBudget = () => {
    const val = Number(budgetInput)
    if (val > 0) {
      setBudget(val)
      localStorage.setItem('komora-budget', String(val))
      show('Бюджет збережено', 'success')
    }
    setShowBudget(false)
    setBudgetInput('')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Список покупок</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setShowTemplates(true)} className="flex items-center gap-2">
            <ClipboardList size={18} />
            <span className="hidden sm:inline">Шаблони</span>
          </Button>
          <Button variant="secondary" onClick={() => setShowRecipePicker(true)} className="flex items-center gap-2">
            <BookOpen size={18} />
            <span className="hidden sm:inline">З рецептів</span>
          </Button>
          <Button onClick={() => setShowAdd(true)} className="flex items-center gap-2">
            <Plus size={18} />
            <span className="hidden sm:inline">Додати</span>
          </Button>
        </div>
      </div>

      {items.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-stone-500 dark:text-stone-400">{checkedCount} / {items.length} куплено</span>
            <div className="flex items-center gap-3">
              {totalCost > 0 && (
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">{totalCost.toFixed(0)} грн</span>
              )}
              {checkedCount > 0 && (
                <button onClick={clearChecked} className="text-xs text-komora-600 hover:text-komora-700">
                  Очистити куплені
                </button>
              )}
            </div>
          </div>
          <div className="bg-stone-100 dark:bg-stone-700 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-komora-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>

          {budget && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <button onClick={() => setShowBudget(true)} className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 hover:text-komora-600">
                  <Wallet size={14} />
                  Бюджет: {budget} грн
                </button>
                <span className={`text-xs font-medium ${budgetUsed > 100 ? 'text-red-500' : budgetUsed > 80 ? 'text-amber-500' : 'text-green-500'}`}>
                  {budgetUsed.toFixed(0)}%
                </span>
              </div>
              <div className="bg-stone-100 dark:bg-stone-700 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${budgetUsed > 100 ? 'bg-red-500' : budgetUsed > 80 ? 'bg-amber-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                />
              </div>
            </div>
          )}
          {!budget && (
            <button onClick={() => setShowBudget(true)} className="mt-2 flex items-center gap-1.5 text-xs text-stone-400 hover:text-komora-600">
              <Wallet size={14} /> Встановити бюджет
            </button>
          )}
        </div>
      )}

      {sorted.length === 0 ? (
        <div className="card text-center py-12">
          <ShoppingCart size={48} className="mx-auto text-stone-300 mb-4" />
          <p className="text-stone-500 dark:text-stone-400 mb-3">Список покупок порожній</p>
          <div className="flex justify-center gap-2 flex-wrap">
            <Button onClick={() => setShowAdd(true)} variant="secondary">Додати товар</Button>
            <Button onClick={() => setShowTemplates(true)} variant="secondary">З шаблону</Button>
            <Button onClick={() => setShowRecipePicker(true)} variant="secondary">З рецептів</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.map((item) => (
            <div
              key={item.id}
              className={`card flex items-center gap-3 ${item.checked ? 'opacity-50' : ''}`}
            >
              <button
                onClick={() => toggleChecked(item.id)}
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  item.checked ? 'bg-komora-500 border-komora-500' : 'border-stone-300 dark:border-stone-600 hover:border-komora-400'
                }`}
              >
                {item.checked && <Check size={16} className="text-white" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className={`font-medium ${item.checked ? 'line-through text-stone-400' : 'text-stone-900 dark:text-stone-100'}`}>
                  {item.name}
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400">
                  {item.quantity}
                  {item.price && <span className="ml-2 font-medium">{item.price} грн</span>}
                  {item.fromRecipe && <span className="ml-2 text-komora-600">📖 {item.fromRecipe}</span>}
                </div>
              </div>
              <button
                onClick={() => deleteItem(item.id)}
                className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-stone-400 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Додати товар">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (form.name) {
              addItem({
                name: form.name,
                quantity: form.quantity,
                checked: false,
                price: form.price ? Number(form.price) : undefined,
              })
              setForm({ name: '', quantity: '1 шт', price: '' })
              setShowAdd(false)
            }
          }}
          className="space-y-3"
        >
          <Input
            label="Назва *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Напр.: Цукор"
            required
            autoFocus
          />
          <Input
            label="Кількість"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            placeholder="2 кг"
          />
          <Input
            label="Ціна (грн)"
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="0"
          />
          <Button type="submit" className="w-full">Додати</Button>
        </form>
      </Modal>

      <Modal isOpen={showRecipePicker} onClose={() => setShowRecipePicker(false)} title="Додати з рецептів">
        <div className="space-y-3">
          <p className="text-sm text-stone-500 dark:text-stone-400">Оберіть рецепти — інгредієнти будуть додані до списку</p>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {recipes.map((r) => (
              <label
                key={r.id}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  selectedRecipes.includes(r.id)
                    ? 'border-komora-500 bg-komora-50 dark:bg-komora-900/30'
                    : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedRecipes.includes(r.id)}
                  onChange={() => {
                    setSelectedRecipes((prev) =>
                      prev.includes(r.id) ? prev.filter((id) => id !== r.id) : [...prev, r.id]
                    )
                  }}
                  className="w-5 h-5 accent-komora-600"
                />
                <div className="flex-1">
                  <div className="font-medium text-sm">{r.name}</div>
                  <div className="text-xs text-stone-500">{r.ingredients.length} інгредієнтів</div>
                </div>
              </label>
            ))}
          </div>
          <Button
            onClick={handleAddFromRecipes}
            disabled={selectedRecipes.length === 0}
            className="w-full"
          >
            Додати {selectedRecipes.length > 0 && `(${selectedRecipes.length})`}
          </Button>
        </div>
      </Modal>

      <Modal isOpen={showTemplates} onClose={() => setShowTemplates(false)} title="Шаблони списків">
        <div className="space-y-2">
          {allTemplates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => handleAddFromTemplate(tpl)}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors text-left"
            >
              <div>
                <div className="font-medium text-sm">{tpl.name}</div>
                <div className="text-xs text-stone-500">{tpl.items.length} позицій</div>
              </div>
              <ClipboardList size={20} className="text-stone-400" />
            </button>
          ))}
        </div>
      </Modal>

      <Modal isOpen={showBudget} onClose={() => setShowBudget(false)} title="Бюджет на покупки">
        <div className="space-y-3">
          <p className="text-sm text-stone-500 dark:text-stone-400">Встановіть ліміт витрат на поточний список</p>
          <Input
            label="Сума (грн)"
            type="number"
            min={0}
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            placeholder="1000"
            autoFocus
          />
          {budget && (
            <Button variant="secondary" onClick={() => { setBudget(null); localStorage.removeItem('komora-budget'); setShowBudget(false); show('Бюджет видалено', 'info') }} className="w-full">
              Видалити бюджет
            </Button>
          )}
          <Button onClick={saveBudget} disabled={!budgetInput} className="w-full">Зберегти</Button>
        </div>
      </Modal>
    </div>
  )
}
