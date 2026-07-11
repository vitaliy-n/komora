import { useState } from 'react'
import { Plus, Trash2, Check, ShoppingCart, BookOpen } from 'lucide-react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/database'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Modal } from '../components/ui/Modal'
import { useToast } from '../components/ui/Toast'
import { generateId } from '../utils/date'

interface ShoppingItem {
  id: string
  name: string
  quantity: string
  checked: boolean
  fromRecipe?: string
}

export function ShoppingListPage() {
  const { show } = useToast()
  const [showAdd, setShowAdd] = useState(false)
  const [showRecipePicker, setShowRecipePicker] = useState(false)
  const [form, setForm] = useState({ name: '', quantity: '1 шт' })
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([])

  const items = useLiveQuery(() => db.shoppingItems?.toArray() || [])
  const recipes = useLiveQuery(() => db.recipes.toArray())

  if (!items || !recipes) {
    return <div className="flex justify-center py-8">Завантаження...</div>
  }

  const sorted = [...items].sort((a, b) => Number(a.checked) - Number(b.checked))
  const checkedCount = items.filter(i => i.checked).length
  const progress = items.length > 0 ? (checkedCount / items.length) * 100 : 0

  const addItem = async (item: Omit<ShoppingItem, 'id'>) => {
    await db.shoppingItems?.add({ ...item, id: generateId() })
    show('Додано до списку', 'success')
  }

  const toggleChecked = async (id: string, checked: boolean) => {
    await db.shoppingItems?.update(id, { checked: !checked })
  }

  const deleteItem = async (id: string) => {
    await db.shoppingItems?.delete(id)
  }

  const clearChecked = async () => {
    const checked = items.filter(i => i.checked)
    for (const item of checked) {
      await db.shoppingItems?.delete(item.id)
    }
    show(`Видалено ${checked.length} позицій`, 'success')
  }

  const handleAddFromRecipes = async () => {
    const recipeObjs = recipes.filter(r => selectedRecipes.includes(r.id))
    const newItems: ShoppingItem[] = []
    for (const recipe of recipeObjs) {
      for (const ing of recipe.ingredients) {
        const existing = items.find(i => i.name.toLowerCase() === ing.name.toLowerCase() && !i.checked)
        if (existing) {
          continue
        }
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Список покупок</h1>
        <div className="flex gap-2">
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
            <span className="text-sm text-stone-500">{checkedCount} / {items.length} куплено</span>
            {checkedCount > 0 && (
              <button onClick={clearChecked} className="text-xs text-komora-600 hover:text-komora-700">
                Очистити куплені
              </button>
            )}
          </div>
          <div className="bg-stone-100 dark:bg-stone-700 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-komora-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {sorted.length === 0 ? (
        <div className="card text-center py-12">
          <ShoppingCart size={48} className="mx-auto text-stone-300 mb-4" />
          <p className="text-stone-500 mb-3">Список покупок порожній</p>
          <div className="flex justify-center gap-2">
            <Button onClick={() => setShowAdd(true)} variant="secondary">Додати товар</Button>
            <Button onClick={() => setShowRecipePicker(true)} variant="secondary">З рецептів</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.map(item => (
            <div
              key={item.id}
              className={`card flex items-center gap-3 ${item.checked ? 'opacity-50' : ''}`}
            >
              <button
                onClick={() => toggleChecked(item.id, item.checked)}
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  item.checked ? 'bg-komora-500 border-komora-500' : 'border-stone-300 hover:border-komora-400'
                }`}
              >
                {item.checked && <Check size={16} className="text-white" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className={`font-medium ${item.checked ? 'line-through text-stone-400' : ''}`}>
                  {item.name}
                </div>
                <div className="text-xs text-stone-500">
                  {item.quantity}
                  {item.fromRecipe && <span className="ml-2 text-komora-600">📖 {item.fromRecipe}</span>}
                </div>
              </div>
              <button
                onClick={() => deleteItem(item.id)}
                className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500"
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
              addItem({ name: form.name, quantity: form.quantity, checked: false })
              setForm({ name: '', quantity: '1 шт' })
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
          <Button type="submit" className="w-full">Додати</Button>
        </form>
      </Modal>

      <Modal isOpen={showRecipePicker} onClose={() => setShowRecipePicker(false)} title="Додати з рецептів">
        <div className="space-y-3">
          <p className="text-sm text-stone-500">Оберіть рецепти — інгредієнти будуть додані до списку</p>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {recipes.map(r => (
              <label
                key={r.id}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  selectedRecipes.includes(r.id)
                    ? 'border-komora-500 bg-komora-50'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedRecipes.includes(r.id)}
                  onChange={() => {
                    setSelectedRecipes(prev =>
                      prev.includes(r.id) ? prev.filter(id => id !== r.id) : [...prev, r.id]
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
    </div>
  )
}
