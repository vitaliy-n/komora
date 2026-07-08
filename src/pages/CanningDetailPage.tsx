import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Edit, Trash2, Minus, Plus, Star } from 'lucide-react'
import { useDatabase } from '../hooks/useDatabase'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import type { CanningEntry, Category, Recipe } from '../types'
import { formatDate, getExpiryStatus, daysUntil } from '../utils/date'

export function CanningDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getCanningById, updateCanning, deleteCanning, getAllCategories, getRecipeById } = useDatabase()
  const [canning, setCanning] = useState<CanningEntry | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [showDelete, setShowDelete] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  useEffect(() => {
    const load = async () => {
      if (!id) return
      const entry = await getCanningById(id)
      if (!entry) { navigate('/cannings'); return }
      setCanning(entry)
      setRating(entry.rating || 0)
      setReview(entry.review || '')

      const cats = await getAllCategories()
      setCategory(cats.find((c) => c.id === entry.categoryId) || null)

      if (entry.recipeId) {
        const rec = await getRecipeById(entry.recipeId)
        if (rec) setRecipe(rec)
      }
    }
    load()
  }, [id, getCanningById, getAllCategories, getRecipeById, navigate])

  if (!canning) return null

  const remaining = canning.totalJars - canning.consumedJars
  const expiryStatus = canning.expiryDate ? getExpiryStatus(canning.expiryDate) : null

  const handleConsume = async (delta: number) => {
    const newConsumed = Math.max(0, Math.min(canning.totalJars, canning.consumedJars + delta))
    await updateCanning(canning.id, { consumedJars: newConsumed })
    setCanning({ ...canning, consumedJars: newConsumed })
  }

  const handleDelete = async () => {
    await deleteCanning(canning.id)
    navigate('/cannings')
  }

  const handleSaveRating = async () => {
    await updateCanning(canning.id, { rating, review })
    setCanning({ ...canning, rating, review })
    setShowRating(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-stone-100">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="page-title flex items-center gap-2">
            <span>{category?.icon || '📦'}</span>
            {canning.name}
          </h1>
          <p className="text-sm text-stone-500">{category?.name} · {formatDate(canning.date)}</p>
        </div>
        <Link to={`/cannings/${canning.id}/edit`} className="p-2 rounded-xl hover:bg-stone-100 text-stone-600">
          <Edit size={20} />
        </Link>
        <button onClick={() => setShowDelete(true)} className="p-2 rounded-xl hover:bg-red-50 text-red-500">
          <Trash2 size={20} />
        </button>
      </div>

      {canning.photos.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {canning.photos.map((photo, i) => (
            <img key={i} src={photo} alt="" className="h-48 rounded-xl object-cover flex-shrink-0" />
          ))}
        </div>
      )}

      <div className="card">
        <h2 className="font-semibold mb-3">Трекінг банок</h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-komora-600">{remaining}</div>
            <div className="text-sm text-stone-500">з {canning.totalJars} залишилось</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleConsume(-1)}
              disabled={canning.consumedJars <= 0}
              className="p-2 rounded-xl border border-stone-300 hover:bg-stone-50 disabled:opacity-30"
            >
              <Plus size={20} />
            </button>
            <span className="text-lg font-semibold w-12 text-center">{canning.consumedJars}</span>
            <button
              onClick={() => handleConsume(1)}
              disabled={remaining <= 0}
              className="p-2 rounded-xl border border-stone-300 hover:bg-stone-50 disabled:opacity-30"
            >
              <Minus size={20} />
            </button>
          </div>
        </div>
        <div className="mt-3 bg-stone-100 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-komora-500 rounded-full transition-all duration-300"
            style={{ width: `${((canning.totalJars - remaining) / canning.totalJars) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="card">
          <div className="text-sm text-stone-500">Розмір банки</div>
          <div className="text-lg font-semibold">{canning.jarSize} л</div>
        </div>
        <div className="card">
          <div className="text-sm text-stone-500">Місце зберігання</div>
          <div className="text-lg font-semibold">{canning.storageLocation || '—'}</div>
        </div>
        {canning.expiryDate && (
          <div className="card col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-stone-500">Термін придатності</div>
                <div className="text-lg font-semibold">{formatDate(canning.expiryDate)}</div>
              </div>
              {expiryStatus && (
                <Badge variant={expiryStatus === 'expired' ? 'danger' : expiryStatus === 'danger' ? 'danger' : expiryStatus === 'warning' ? 'warning' : 'success'}>
                  {expiryStatus === 'expired' ? 'Прострочено' : expiryStatus === 'ok' ? 'В нормі' : `${daysUntil(canning.expiryDate)} дн.`}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">Оцінка</h2>
          <button onClick={() => setShowRating(true)} className="text-sm text-komora-600">
            {canning.rating ? 'Змінити' : 'Оцінити'}
          </button>
        </div>
        {canning.rating ? (
          <div>
            <div className="text-amber-400 text-xl">{'★'.repeat(canning.rating)}{'☆'.repeat(5 - canning.rating)}</div>
            {canning.review && <p className="text-sm text-stone-600 mt-1">{canning.review}</p>}
          </div>
        ) : (
          <p className="text-sm text-stone-400">Ще не оцінено. Відкрийте банку та оцініть!</p>
        )}
      </div>

      {recipe && (
        <Link to={`/recipes/${recipe.id}`} className="card block hover:shadow-md transition-shadow">
          <h2 className="font-semibold mb-1">📖 Рецепт</h2>
          <p className="text-sm text-komora-600">{recipe.name}</p>
        </Link>
      )}

      {canning.notes && (
        <div className="card">
          <h2 className="font-semibold mb-1">Нотатки</h2>
          <p className="text-sm text-stone-600 whitespace-pre-wrap">{canning.notes}</p>
        </div>
      )}

      {canning.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {canning.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </div>
      )}

      <Modal isOpen={showDelete} onClose={() => setShowDelete(false)} title="Видалити закрутку?">
        <p className="text-stone-600 mb-4">Ви впевнені, що хочете видалити "{canning.name}"? Цю дію не можна скасувати.</p>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setShowDelete(false)} className="flex-1">Скасувати</Button>
          <Button variant="danger" onClick={handleDelete} className="flex-1">Видалити</Button>
        </div>
      </Modal>

      <Modal isOpen={showRating} onClose={() => setShowRating(false)} title="Оцінити закрутку">
        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)} className="p-1">
                <Star size={32} className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'} />
              </button>
            ))}
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Ваш відгук (необов'язково)..."
            className="input min-h-[80px] resize-none"
          />
          <Button onClick={handleSaveRating} className="w-full">Зберегти</Button>
        </div>
      </Modal>
    </div>
  )
}
