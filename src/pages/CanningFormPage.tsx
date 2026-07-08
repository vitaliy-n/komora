import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Camera, X } from 'lucide-react'
import { useDatabase } from '../hooks/useDatabase'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import type { CanningEntry, Category, Recipe } from '../types'
import { JAR_SIZES, STORAGE_LOCATIONS } from '../types'
import { toISODate } from '../utils/date'

export function CanningFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addCanning, updateCanning, getCanningById, getAllCategories, getAllRecipes } = useDatabase()
  const [categories, setCategories] = useState<Category[]>([])
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [form, setForm] = useState({
    name: '',
    categoryId: '',
    recipeId: '',
    date: toISODate(new Date()),
    expiryDate: '',
    jarSize: 1,
    totalJars: 1,
    consumedJars: 0,
    storageLocation: '',
    photos: [] as string[],
    notes: '',
    tags: [] as string[],
    tagInput: '',
  })

  const isEditing = !!id

  useEffect(() => {
    const load = async () => {
      const [cats, recs] = await Promise.all([getAllCategories(), getAllRecipes()])
      setCategories(cats)
      setRecipes(recs)

      if (id) {
        const entry = await getCanningById(id)
        if (entry) {
          setForm({
            name: entry.name,
            categoryId: entry.categoryId,
            recipeId: entry.recipeId || '',
            date: entry.date.split('T')[0],
            expiryDate: entry.expiryDate?.split('T')[0] || '',
            jarSize: entry.jarSize,
            totalJars: entry.totalJars,
            consumedJars: entry.consumedJars,
            storageLocation: entry.storageLocation,
            photos: entry.photos,
            notes: entry.notes || '',
            tags: entry.tags,
            tagInput: '',
          })
        }
      }
    }
    load()
  }, [id, getAllCategories, getAllRecipes, getCanningById])

  const handlePhotoAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        setForm((prev) => ({ ...prev, photos: [...prev.photos, reader.result as string] }))
      }
      reader.readAsDataURL(file)
    })
  }

  const handlePhotoRemove = (index: number) => {
    setForm((prev) => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }))
  }

  const handleAddTag = () => {
    const tag = form.tagInput.trim()
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag], tagInput: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.categoryId) return

    const data: Omit<CanningEntry, 'id' | 'createdAt' | 'updatedAt'> = {
      name: form.name,
      categoryId: form.categoryId,
      recipeId: form.recipeId || undefined,
      date: form.date,
      expiryDate: form.expiryDate || undefined,
      jarSize: form.jarSize,
      totalJars: form.totalJars,
      consumedJars: form.consumedJars,
      storageLocation: form.storageLocation,
      photos: form.photos,
      notes: form.notes || undefined,
      tags: form.tags,
      rating: undefined,
      review: undefined,
    }

    if (isEditing) {
      await updateCanning(id!, data)
      navigate(`/cannings/${id}`)
    } else {
      const entry = await addCanning(data)
      navigate(`/cannings/${entry.id}`)
    }
  }

  const handleRecipeSelect = (recipeId: string) => {
    const recipe = recipes.find((r) => r.id === recipeId)
    if (recipe) {
      setForm((prev) => ({
        ...prev,
        recipeId,
        name: prev.name || recipe.name,
        categoryId: prev.categoryId || recipe.categoryId,
        jarSize: recipe.baseJarSize,
        totalJars: recipe.baseJars,
      }))
    } else {
      setForm((prev) => ({ ...prev, recipeId: '' }))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-stone-100">
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">{isEditing ? 'Редагувати' : 'Нова закрутка'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="card space-y-3">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Рецепт (необов'язково)</label>
            <select
              value={form.recipeId}
              onChange={(e) => handleRecipeSelect(e.target.value)}
              className="input"
            >
              <option value="">Без рецепту</option>
              {recipes.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>

          <Input
            label="Назва *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Напр.: Огірки мариновані"
            required
          />

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Категорія *</label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="input"
              required
            >
              <option value="">Оберіть категорію</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="card space-y-3">
          <h2 className="font-semibold">Банки</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Розмір банки (л)</label>
              <select value={form.jarSize} onChange={(e) => setForm({ ...form, jarSize: Number(e.target.value) })} className="input">
                {JAR_SIZES.map((size) => (
                  <option key={size} value={size}>{size} л</option>
                ))}
              </select>
            </div>
            <Input
              label="Кількість банок"
              type="number"
              min={1}
              value={form.totalJars}
              onChange={(e) => setForm({ ...form, totalJars: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="card space-y-3">
          <h2 className="font-semibold">Дати</h2>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Дата закрутки"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <Input
              label="Термін придатності"
              type="date"
              value={form.expiryDate}
              onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
            />
          </div>
        </div>

        <div className="card space-y-3">
          <h2 className="font-semibold">Зберігання</h2>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Місце зберігання</label>
            <select
              value={form.storageLocation}
              onChange={(e) => setForm({ ...form, storageLocation: e.target.value })}
              className="input"
            >
              <option value="">Оберіть місце</option>
              {STORAGE_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="card space-y-3">
          <h2 className="font-semibold">Фото</h2>
          {form.photos.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {form.photos.map((photo, i) => (
                <div key={i} className="relative flex-shrink-0">
                  <img src={photo} alt="" className="h-24 w-24 rounded-xl object-cover" />
                  <button
                    type="button"
                    onClick={() => handlePhotoRemove(i)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <label className="flex items-center justify-center gap-2 py-8 border-2 border-dashed border-stone-300 rounded-xl cursor-pointer hover:border-komora-400 hover:bg-komora-50/30 transition-colors">
            <Camera size={20} className="text-stone-400" />
            <span className="text-sm text-stone-500">Додати фото</span>
            <input type="file" accept="image/*" multiple onChange={handlePhotoAdd} className="hidden" capture="environment" />
          </label>
        </div>

        <div className="card space-y-3">
          <h2 className="font-semibold">Додатково</h2>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Нотатки</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Ваші нотатки..."
              className="input min-h-[80px] resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Теги</label>
            <div className="flex gap-2">
              <input
                value={form.tagInput}
                onChange={(e) => setForm({ ...form, tagInput: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Додати тег..."
                className="input flex-1"
              />
              <Button type="button" variant="secondary" onClick={handleAddTag}>+</Button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {form.tags.map((tag) => (
                  <span key={tag} className="badge bg-komora-100 text-komora-700">
                    {tag}
                    <button type="button" onClick={() => setForm({ ...form, tags: form.tags.filter((t) => t !== tag) })}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="button" variant="secondary" onClick={() => navigate(-1)} className="flex-1">Скасувати</Button>
          <Button type="submit" className="flex-1">{isEditing ? 'Зберегти' : 'Створити'}</Button>
        </div>
      </form>
    </div>
  )
}
