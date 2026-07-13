import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Edit, Trash2, Minus, Plus, Star, Lock, Unlock, AlertTriangle, History } from 'lucide-react'
import { useDatabase } from '../hooks/useDatabase'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import type { CanningEntry, Category, Recipe, JarLogEntry } from '../types'
import { formatDate, getExpiryStatus, daysUntil, toISODate } from '../utils/date'

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
  const [showTasting, setShowTasting] = useState(false)
  const [tastingNotes, setTastingNotes] = useState('')
  const [tastingRating, setTastingRating] = useState(0)
  const [tastingPaired, setTastingPaired] = useState('')
  const [showLog, setShowLog] = useState(false)

  useEffect(() => {
    const load = async () => {
      if (!id) return
      const entry = await getCanningById(id)
      if (!entry) { navigate('/app/cannings'); return }
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
  const spoiled = canning.spoiledJars || 0
  const opened = canning.openedJars || 0
  const sealed = remaining - opened - spoiled
  const expiryStatus = canning.expiryDate ? getExpiryStatus(canning.expiryDate) : null

  const logAction = (action: JarLogEntry['action'], count: number) => {
    const log = [...(canning.consumptionLog || []), { date: toISODate(new Date()), action, count }]
    return log
  }

  const handleConsume = async (delta: number) => {
    const newConsumed = Math.max(0, Math.min(canning.totalJars, canning.consumedJars + delta))
    await updateCanning(canning.id, {
      consumedJars: newConsumed,
      consumptionLog: logAction(delta > 0 ? 'consumed' : 'restored', Math.abs(delta)),
    })
    setCanning({ ...canning, consumedJars: newConsumed })
  }

  const handleOpenJar = async () => {
    if (sealed <= 0) return
    const newOpened = opened + 1
    await updateCanning(canning.id, {
      openedJars: newOpened,
      consumptionLog: logAction('opened', 1),
    })
    setCanning({ ...canning, openedJars: newOpened })
  }

  const handleSpoilJar = async () => {
    if (sealed <= 0 && opened <= 0) return
    const newSpoiled = spoiled + 1
    const newConsumed = canning.consumedJars + 1
    await updateCanning(canning.id, {
      spoiledJars: newSpoiled,
      consumedJars: newConsumed,
      consumptionLog: logAction('spoiled', 1),
    })
    setCanning({ ...canning, spoiledJars: newSpoiled, consumedJars: newConsumed })
  }

  const handleDelete = async () => {
    await deleteCanning(canning.id)
    navigate('/app/cannings')
  }

  const handleSaveRating = async () => {
    await updateCanning(canning.id, { rating, review })
    setCanning({ ...canning, rating, review })
    setShowRating(false)
  }

  const handleSaveTasting = async () => {
    const note = {
      id: `tn-${Date.now()}`,
      date: toISODate(new Date()),
      rating: tastingRating,
      notes: tastingNotes,
      pairedWith: tastingPaired || undefined,
    }
    const notes = [...(canning.tastingNotes || []), note]
    await updateCanning(canning.id, { tastingNotes: notes })
    setCanning({ ...canning, tastingNotes: notes })
    setTastingNotes('')
    setTastingRating(0)
    setTastingPaired('')
    setShowTasting(false)
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
            {canning.name}
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {category?.name} · {formatDate(canning.date)}
            {canning.batchNumber && <span className="ml-1 text-stone-400">· {canning.batchNumber}</span>}
          </p>
        </div>
        <Link to={`/app/cannings/${canning.id}/edit`} className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300">
          <Edit size={20} />
        </Link>
        <button onClick={() => setShowDelete(true)} className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500">
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
        <h2 className="font-semibold mb-3 dark:text-stone-200">Трекінг банок</h2>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 rounded-xl bg-green-50 dark:bg-green-900/20">
            <Lock size={18} className="mx-auto text-green-600 mb-1" />
            <div className="text-xl font-bold text-green-700 dark:text-green-400">{sealed}</div>
            <div className="text-xs text-stone-500">Запечатані</div>
          </div>
          <div className="text-center p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20">
            <Unlock size={18} className="mx-auto text-blue-600 mb-1" />
            <div className="text-xl font-bold text-blue-700 dark:text-blue-400">{opened}</div>
            <div className="text-xs text-stone-500">Відкриті</div>
          </div>
          <div className="text-center p-2 rounded-xl bg-red-50 dark:bg-red-900/20">
            <AlertTriangle size={18} className="mx-auto text-red-600 mb-1" />
            <div className="text-xl font-bold text-red-700 dark:text-red-400">{spoiled}</div>
            <div className="text-xs text-stone-500">Зіпсовані</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-3xl font-bold text-komora-600">{remaining}</div>
            <div className="text-sm text-stone-500">з {canning.totalJars} залишилось</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleConsume(-1)}
              disabled={canning.consumedJars <= 0}
              className="p-2 rounded-xl border border-stone-300 dark:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-700 disabled:opacity-30"
            >
              <Plus size={20} />
            </button>
            <span className="text-lg font-semibold w-12 text-center">{canning.consumedJars}</span>
            <button
              onClick={() => handleConsume(1)}
              disabled={remaining <= 0}
              className="p-2 rounded-xl border border-stone-300 dark:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-700 disabled:opacity-30"
            >
              <Minus size={20} />
            </button>
          </div>
        </div>

        <div className="bg-stone-100 dark:bg-stone-700 rounded-full h-3 overflow-hidden mb-3">
          <div
            className="h-full bg-komora-500 rounded-full transition-all duration-300"
            style={{ width: `${((canning.totalJars - remaining) / canning.totalJars) * 100}%` }}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleOpenJar} disabled={sealed <= 0} className="flex-1 flex items-center justify-center gap-1.5">
            <Unlock size={16} /> Відкрити
          </Button>
          <Button variant="danger" onClick={handleSpoilJar} disabled={sealed <= 0 && opened <= 0} className="flex-1 flex items-center justify-center gap-1.5">
            <AlertTriangle size={16} /> Зіпсовано
          </Button>
        </div>

        {canning.consumptionLog && canning.consumptionLog.length > 0 && (
          <button
            onClick={() => setShowLog(true)}
            className="mt-3 flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 hover:text-komora-600"
          >
            <History size={14} /> Історія ({canning.consumptionLog.length})
          </button>
        )}
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
          <h2 className="font-semibold dark:text-stone-200">Оцінка</h2>
          <button onClick={() => setShowRating(true)} className="text-sm text-komora-600">
            {canning.rating ? 'Змінити' : 'Оцінити'}
          </button>
        </div>
        {canning.rating ? (
          <div>
            <div className="text-amber-400 text-xl">{'★'.repeat(canning.rating)}{'☆'.repeat(5 - canning.rating)}</div>
            {canning.review && <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">{canning.review}</p>}
          </div>
        ) : (
          <p className="text-sm text-stone-400">Ще не оцінено. Відкрийте банку та оцініть!</p>
        )}
      </div>

      {canning.tastingNotes && canning.tastingNotes.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold dark:text-stone-200">🍷 Дегустаційні нотатки</h2>
            <button onClick={() => setShowTasting(true)} className="text-sm text-komora-600">Додати</button>
          </div>
          <div className="space-y-2">
            {canning.tastingNotes.map((note) => (
              <div key={note.id} className="p-2 rounded-xl bg-stone-50 dark:bg-stone-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 text-sm">{'★'.repeat(note.rating)}{'☆'.repeat(5 - note.rating)}</span>
                  <span className="text-xs text-stone-400">{formatDate(note.date)}</span>
                </div>
                {note.notes && <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">{note.notes}</p>}
                {note.pairedWith && <p className="text-xs text-stone-400 mt-1">🍽️ Подається з: {note.pairedWith}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {!canning.tastingNotes?.length && (
        <Button variant="secondary" onClick={() => setShowTasting(true)} className="w-full">
          🍷 Додати дегустаційну нотатку
        </Button>
      )}

      {recipe && (
        <Link to={`/app/recipes/${recipe.id}`} className="card block hover:shadow-md transition-shadow">
          <h2 className="font-semibold mb-1">📖 Рецепт</h2>
          <p className="text-sm text-komora-600">{recipe.name}</p>
        </Link>
      )}

      {canning.notes && (
        <div className="card">
          <h2 className="font-semibold mb-1">Нотатки</h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 whitespace-pre-wrap">{canning.notes}</p>
        </div>
      )}

      {canning.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {canning.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </div>
      )}

      <Modal isOpen={showDelete} onClose={() => setShowDelete(false)} title="Видалити закрутку?">
        <p className="text-stone-600 dark:text-stone-400 mb-4">Ви впевнені, що хочете видалити "{canning.name}"? Цю дію не можна скасувати.</p>
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

      <Modal isOpen={showTasting} onClose={() => setShowTasting(false)} title="Дегустаційна нотатка">
        <div className="space-y-3">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setTastingRating(star)} className="p-1">
                <Star size={28} className={star <= tastingRating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'} />
              </button>
            ))}
          </div>
          <textarea
            value={tastingNotes}
            onChange={(e) => setTastingNotes(e.target.value)}
            placeholder="Смак, аромат, текстура..."
            className="input min-h-[80px] resize-none"
          />
          <input
            value={tastingPaired}
            onChange={(e) => setTastingPaired(e.target.value)}
            placeholder="Подається з (необов'язково)..."
            className="input"
          />
          <Button onClick={handleSaveTasting} disabled={tastingRating === 0} className="w-full">Зберегти</Button>
        </div>
      </Modal>

      <Modal isOpen={showLog} onClose={() => setShowLog(false)} title="Історія споживання">
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {[...(canning.consumptionLog || [])].reverse().map((entry, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-stone-50 dark:bg-stone-700/50">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {entry.action === 'opened' ? '🔓' : entry.action === 'consumed' ? '✅' : entry.action === 'spoiled' ? '⚠️' : '↩️'}
                </span>
                <span className="text-sm text-stone-600 dark:text-stone-300">
                  {entry.action === 'opened' ? 'Відкрито' : entry.action === 'consumed' ? 'Спожито' : entry.action === 'spoiled' ? 'Зіпсовано' : 'Поновлено'}
                  {' '}×{entry.count}
                </span>
              </div>
              <span className="text-xs text-stone-400">{formatDate(entry.date)}</span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}
