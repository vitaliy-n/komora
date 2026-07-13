import { useEffect, useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Plus, CheckSquare, Square, Trash2, MapPin } from 'lucide-react'
import { useDatabase } from '../hooks/useDatabase'
import { SearchBar } from '../components/common/SearchBar'
import { FilterChips } from '../components/common/FilterChips'
import { SortMenu, type SortOption } from '../components/common/SortMenu'
import { PullToRefresh } from '../components/common/PullToRefresh'
import { EmptyState } from '../components/common/EmptyState'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { useToast } from '../components/ui/Toast'
import type { CanningEntry, Category } from '../types'
import { formatDate, getExpiryStatus, daysUntil } from '../utils/date'
import { STORAGE_LOCATIONS } from '../types'

type SortValue = 'date-desc' | 'date-asc' | 'name' | 'expiry' | 'remaining' | 'rating'

const sortOptions: SortOption<CanningEntry>[] = [
  { value: 'date-desc', label: 'Нові спочатку', compare: (a, b) => b.date.localeCompare(a.date) },
  { value: 'date-asc', label: 'Старі спочатку', compare: (a, b) => a.date.localeCompare(b.date) },
  { value: 'name', label: 'За назвою', compare: (a, b) => a.name.localeCompare(b.name, 'uk') },
  { value: 'expiry', label: 'За терміном', compare: (a, b) => (a.expiryDate || '9999').localeCompare(b.expiryDate || '9999') },
  { value: 'remaining', label: 'Більше банок', compare: (a, b) => (b.totalJars - b.consumedJars) - (a.totalJars - a.consumedJars) },
  { value: 'rating', label: 'За оцінкою', compare: (a, b) => (b.rating || 0) - (a.rating || 0) },
]

type GroupMode = 'none' | 'status' | 'category' | 'location'

export function CanningListPage() {
  const { getAllCannings, getAllCategories, updateCanning, deleteCanning } = useDatabase()
  const { show } = useToast()
  const [cannings, setCannings] = useState<CanningEntry[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [search, setSearch] = useState('')
  const [searchParams] = useSearchParams()
  const [filterCategory, setFilterCategory] = useState(searchParams.get('category') || '')
  const [filterLocation, setFilterLocation] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [sortBy, setSortBy] = useState<SortValue>('date-desc')
  const [groupMode, setGroupMode] = useState<GroupMode>('none')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [batchMode, setBatchMode] = useState(false)
  const [showBatchActions, setShowBatchActions] = useState(false)
  const [showMoveModal, setShowMoveModal] = useState(false)
  const [moveLocation, setMoveLocation] = useState('')

  const reload = async () => {
    const [c, cats] = await Promise.all([getAllCannings(), getAllCategories()])
    setCannings(c)
    setCategories(cats)
  }

  useEffect(() => { reload() }, [getAllCannings, getAllCategories])

  const filtered = useMemo(() => {
    let result = cannings.filter((c) => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
      if (filterCategory && c.categoryId !== filterCategory) return false
      if (filterLocation && c.storageLocation !== filterLocation) return false
      if (filterStatus) {
        const remaining = c.totalJars - c.consumedJars
        const expiryStatus = c.expiryDate ? getExpiryStatus(c.expiryDate) : null
        if (filterStatus === 'expired' && expiryStatus !== 'expired') return false
        if (filterStatus === 'expiring' && !(expiryStatus === 'danger' || expiryStatus === 'warning')) return false
        if (filterStatus === 'fresh' && expiryStatus !== 'ok' && c.expiryDate) return false
        if (filterStatus === 'empty' && remaining > 0) return false
      }
      return true
    })
    const sortOpt = sortOptions.find((o) => o.value === sortBy)
    if (sortOpt) result = [...result].sort(sortOpt.compare)
    return result
  }, [cannings, search, filterCategory, filterLocation, filterStatus, sortBy])

  const locations = [...new Set(cannings.map((c) => c.storageLocation).filter(Boolean))]
  const categoryCounts = cannings.reduce<Record<string, number>>((acc, c) => {
    acc[c.categoryId] = (acc[c.categoryId] || 0) + 1
    return acc
  }, {})
  const locationCounts = cannings.reduce<Record<string, number>>((acc, c) => {
    if (c.storageLocation) acc[c.storageLocation] = (acc[c.storageLocation] || 0) + 1
    return acc
  }, {})

  const statusCounts = cannings.reduce<Record<string, number>>((acc, c) => {
    const remaining = c.totalJars - c.consumedJars
    const expiryStatus = c.expiryDate ? getExpiryStatus(c.expiryDate) : null
    if (remaining <= 0) acc.empty = (acc.empty || 0) + 1
    else if (expiryStatus === 'expired') acc.expired = (acc.expired || 0) + 1
    else if (expiryStatus === 'danger' || expiryStatus === 'warning') acc.expiring = (acc.expiring || 0) + 1
    else acc.fresh = (acc.fresh || 0) + 1
    return acc
  }, {})

  const grouped = useMemo(() => {
    if (groupMode === 'none') return null
    const groups: Record<string, CanningEntry[]> = {}
    for (const c of filtered) {
      let key: string
      if (groupMode === 'status') {
        const remaining = c.totalJars - c.consumedJars
        const expiryStatus = c.expiryDate ? getExpiryStatus(c.expiryDate) : null
        key = remaining <= 0 ? 'empty' : expiryStatus === 'expired' ? 'expired' : (expiryStatus === 'danger' || expiryStatus === 'warning') ? 'expiring' : 'fresh'
      } else if (groupMode === 'category') {
        key = c.categoryId
      } else {
        key = c.storageLocation || 'Інше'
      }
      (groups[key] ||= []).push(c)
    }
    return groups
  }, [filtered, groupMode])

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleBatchDelete = async () => {
    for (const id of selected) {
      await deleteCanning(id)
    }
    show(`Видалено ${selected.size} закруток`, 'success')
    setSelected(new Set())
    setBatchMode(false)
    setShowBatchActions(false)
    await reload()
  }

  const handleBatchMove = async () => {
    for (const id of selected) {
      await updateCanning(id, { storageLocation: moveLocation })
    }
    show(`Переміщено ${selected.size} закруток у "${moveLocation}"`, 'success')
    setSelected(new Set())
    setShowMoveModal(false)
    setBatchMode(false)
    setMoveLocation('')
    await reload()
  }

  const renderCard = (canning: CanningEntry) => {
    const cat = categories.find((c) => c.id === canning.categoryId)
    const remaining = canning.totalJars - canning.consumedJars
    const spoiled = canning.spoiledJars || 0
    const expiryStatus = canning.expiryDate ? getExpiryStatus(canning.expiryDate) : null
    const days = canning.expiryDate ? daysUntil(canning.expiryDate) : null
    const isSelected = selected.has(canning.id)

    return (
      <div
        key={canning.id}
        className={`card hover:shadow-md transition-all relative ${isSelected ? 'ring-2 ring-komora-500' : ''} ${batchMode ? 'cursor-pointer' : ''}`}
        onClick={batchMode ? () => toggleSelect(canning.id) : undefined}
      >
        {batchMode && (
          <div className="absolute top-2 right-2 z-10">
            {isSelected ? (
              <CheckSquare size={20} className="text-komora-600" />
            ) : (
              <Square size={20} className="text-stone-300" />
            )}
          </div>
        )}
        <Link to={`/app/cannings/${canning.id}`} onClick={(e) => batchMode && e.preventDefault()}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{cat?.icon || '📦'}</span>
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">{canning.name}</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {cat?.name} · {formatDate(canning.date)}
                  {canning.batchNumber && <span className="ml-1 text-stone-400">· {canning.batchNumber}</span>}
                </p>
              </div>
            </div>
            {canning.rating && (
              <div className="text-amber-400 text-sm">{'★'.repeat(canning.rating)}</div>
            )}
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <Badge variant={remaining > 0 ? 'success' : 'default'}>
                {remaining > 0 ? `${remaining} з ${canning.totalJars}` : 'Все з\'їдено'}
              </Badge>
              <Badge>{canning.jarSize}л</Badge>
              {spoiled > 0 && <Badge variant="danger">⚠️ {spoiled}</Badge>}
            </div>
            {expiryStatus && expiryStatus !== 'ok' && (
              <Badge variant={expiryStatus === 'expired' ? 'danger' : 'warning'}>
                {expiryStatus === 'expired' ? 'Прострочено' : `${days} дн.`}
              </Badge>
            )}
          </div>

          {canning.storageLocation && (
            <p className="text-xs text-stone-400 dark:text-stone-500 mt-2 flex items-center gap-1">
              <MapPin size={10} /> {canning.storageLocation}
            </p>
          )}
        </Link>
      </div>
    )
  }

  const groupLabels: Record<string, string> = {
    fresh: '🟢 Свіжі',
    expiring: '🟡 Скоро термін',
    expired: '🔴 Прострочені',
    empty: '⭕ Вичерпані',
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Закрутки</h1>
        <div className="flex gap-2">
          <Button
            variant={batchMode ? 'primary' : 'secondary'}
            onClick={() => {
              setBatchMode(!batchMode)
              setSelected(new Set())
              setShowBatchActions(false)
            }}
            className="flex items-center gap-2"
          >
            <CheckSquare size={18} />
            <span className="hidden sm:inline">{batchMode ? 'Готово' : 'Вибрати'}</span>
          </Button>
          <Link to="/app/cannings/new" className="btn-primary flex items-center gap-2">
            <Plus size={18} />
            <span className="hidden sm:inline">Додати</span>
          </Link>
        </div>
      </div>

      <PullToRefresh onRefresh={reload}>
        <div className="space-y-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Шукати закрутки..." />

          <div className="flex items-center gap-2 flex-wrap">
            <FilterChips
              chips={categories.map((cat) => ({
                value: cat.id,
                label: cat.name,
                icon: cat.icon,
                count: categoryCounts[cat.id] || 0,
              }))}
              selected={filterCategory}
              onSelect={setFilterCategory}
              allLabel="Всі категорії"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <FilterChips
              chips={[
                { value: 'fresh', label: '🟢 Свіжі', count: statusCounts.fresh || 0 },
                { value: 'expiring', label: '🟡 Скоро', count: statusCounts.expiring || 0 },
                { value: 'expired', label: '🔴 Прострочені', count: statusCounts.expired || 0 },
                { value: 'empty', label: '⭕ Вичерпані', count: statusCounts.empty || 0 },
              ]}
              selected={filterStatus}
              onSelect={setFilterStatus}
              allLabel="Всі статуси"
            />
          </div>

          {locations.length > 0 && (
            <FilterChips
              chips={locations.map((loc) => ({
                value: loc,
                label: loc,
                icon: '📍',
                count: locationCounts[loc] || 0,
              }))}
              selected={filterLocation}
              onSelect={setFilterLocation}
              allLabel="Всі місця"
            />
          )}

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <SortMenu options={sortOptions} value={sortBy} onChange={(v) => setSortBy(v as SortValue)} />
              <div className="flex items-center gap-1">
                {(['none', 'status', 'category', 'location'] as GroupMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setGroupMode(mode)}
                    className={`px-2.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                      groupMode === mode
                        ? 'bg-komora-50 text-komora-700 dark:bg-komora-900/30 dark:text-komora-400'
                        : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600'
                    }`}
                  >
                    {mode === 'none' ? 'Список' : mode === 'status' ? 'Статус' : mode === 'category' ? 'Кат.' : 'Місце'}
                  </button>
                ))}
              </div>
            </div>
            <Badge variant="info">{filtered.length} / {cannings.length}</Badge>
          </div>

          {batchMode && selected.size > 0 && (
            <div className="card flex items-center justify-between animate-slide-up">
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Обрано: {selected.size}
              </span>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setShowMoveModal(true)} className="flex items-center gap-1.5">
                  <MapPin size={16} /> Перемістити
                </Button>
                <Button variant="danger" onClick={() => setShowBatchActions(true)} className="flex items-center gap-1.5">
                  <Trash2 size={16} /> Видалити
                </Button>
              </div>
            </div>
          )}

          {filtered.length === 0 ? (
            <EmptyState
              icon="🫙"
              title="Поки немає закруток"
              description="Додайте вашу першу закрутку, щоб почати вести облік"
              action={<Link to="/app/cannings/new" className="btn-primary">Додати закрутку</Link>}
            />
          ) : grouped ? (
            <div className="space-y-4">
              {Object.entries(grouped).map(([key, items]) => (
                <div key={key}>
                  <h2 className="text-sm font-semibold text-stone-500 dark:text-stone-400 mb-2 flex items-center gap-2">
                    {groupMode === 'status' ? groupLabels[key] || key : groupMode === 'category' ? categories.find((c) => c.id === key)?.name || 'Інше' : key}
                    <Badge>{items.length}</Badge>
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {items.map(renderCard)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {filtered.map(renderCard)}
            </div>
          )}
        </div>
      </PullToRefresh>

      <Modal isOpen={showBatchActions} onClose={() => setShowBatchActions(false)} title="Видалити закрутки?">
        <p className="text-stone-600 dark:text-stone-400 mb-4">
          Видалити {selected.size} закруток? Цю дію не можна скасувати.
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setShowBatchActions(false)} className="flex-1">Скасувати</Button>
          <Button variant="danger" onClick={handleBatchDelete} className="flex-1">Видалити</Button>
        </div>
      </Modal>

      <Modal isOpen={showMoveModal} onClose={() => setShowMoveModal(false)} title="Перемістити закрутки">
        <div className="space-y-3">
          <p className="text-sm text-stone-500 dark:text-stone-400">Оберіть нове місце зберігання:</p>
          <select value={moveLocation} onChange={(e) => setMoveLocation(e.target.value)} className="input">
            <option value="">— Оберіть —</option>
            {STORAGE_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
            {locations.filter((l) => !STORAGE_LOCATIONS.includes(l as typeof STORAGE_LOCATIONS[number])).map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <Button onClick={handleBatchMove} disabled={!moveLocation} className="w-full">Перемістити</Button>
        </div>
      </Modal>
    </div>
  )
}
