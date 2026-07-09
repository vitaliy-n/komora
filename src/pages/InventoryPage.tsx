import { useEffect, useState } from 'react'
import { Plus, Trash2, AlertTriangle } from 'lucide-react'
import { useDatabase } from '../hooks/useDatabase'
import { SearchBar } from '../components/common/SearchBar'
import { FilterChips } from '../components/common/FilterChips'
import { SearchableSelect } from '../components/ui/SearchableSelect'
import { EmptyState } from '../components/common/EmptyState'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Modal } from '../components/ui/Modal'
import { Badge } from '../components/ui/Badge'
import type { InventoryItem, Product } from '../types'
import { STORAGE_METHOD_LABELS, type StorageMethod } from '../types'
import { formatDate, getExpiryStatus, daysUntil, toISODate } from '../utils/date'

export function InventoryPage() {
  const { getAllInventory, getAllProducts, addInventory, deleteInventory } = useDatabase()
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [filterStorage, setFilterStorage] = useState('')
  const [filterExpiry, setFilterExpiry] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({
    productId: '',
    name: '',
    quantity: 1,
    unit: 'кг',
    purchaseDate: toISODate(new Date()),
    storageMethod: 'fridge' as StorageMethod,
    expiryDate: '',
    notes: '',
  })

  const reload = async () => {
    const [inv, prod] = await Promise.all([getAllInventory(), getAllProducts()])
    setInventory(inv)
    setProducts(prod)
  }

  useEffect(() => { reload() }, [getAllInventory, getAllProducts])

  const filtered = inventory.filter((item) => {
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false
    if (filterStorage && item.storageMethod !== filterStorage) return false
    if (filterExpiry) {
      const status = item.expiryDate ? getExpiryStatus(item.expiryDate) : null
      if (filterExpiry === 'expired' && status !== 'expired') return false
      if (filterExpiry === 'soon' && !(status === 'danger' || status === 'warning')) return false
      if (filterExpiry === 'ok' && status !== 'ok') return false
      if (filterExpiry === 'none' && item.expiryDate) return false
    }
    return true
  })

  const storageCounts = inventory.reduce<Record<string, number>>((acc, item) => {
    acc[item.storageMethod] = (acc[item.storageMethod] || 0) + 1
    return acc
  }, {})

  const expiryCounts = inventory.reduce<Record<string, number>>((acc, item) => {
    const status = item.expiryDate ? getExpiryStatus(item.expiryDate) : null
    if (!item.expiryDate) acc.none = (acc.none || 0) + 1
    else if (status === 'expired') acc.expired = (acc.expired || 0) + 1
    else if (status === 'danger' || status === 'warning') acc.soon = (acc.soon || 0) + 1
    else acc.ok = (acc.ok || 0) + 1
    return acc
  }, {})

  const handleProductSelect = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      const bestStorage = product.storage.reduce((best, s) => s.shelfLifeDays > best.shelfLifeDays ? s : best, product.storage[0])
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + bestStorage.shelfLifeDays)
      setForm({
        ...form,
        productId,
        name: product.name,
        storageMethod: bestStorage.method,
        expiryDate: toISODate(expiryDate),
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name) return
    await addInventory({
      productId: form.productId,
      name: form.name,
      quantity: form.quantity,
      unit: form.unit,
      purchaseDate: form.purchaseDate,
      storageMethod: form.storageMethod,
      expiryDate: form.expiryDate || undefined,
      notes: form.notes || undefined,
    })
    setShowAdd(false)
    setForm({ productId: '', name: '', quantity: 1, unit: 'кг', purchaseDate: toISODate(new Date()), storageMethod: 'fridge', expiryDate: '', notes: '' })
    await reload()
  }

  const handleDelete = async (id: string) => {
    await deleteInventory(id)
    await reload()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Запаси продуктів</h1>
        <Button onClick={() => setShowAdd(true)} className="flex items-center gap-2">
          <Plus size={18} />
          <span className="hidden sm:inline">Додати</span>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <SearchBar value={search} onChange={setSearch} placeholder="Шукати в запасах..." />
        <Badge variant="info">{filtered.length} / {inventory.length}</Badge>
      </div>

      <FilterChips
        chips={(Object.entries(STORAGE_METHOD_LABELS) as [StorageMethod, string][]).map(([key, label]) => ({
          value: key,
          label,
          count: storageCounts[key] || 0,
        }))}
        selected={filterStorage}
        onSelect={setFilterStorage}
        allLabel="Всі місця"
      />

      <FilterChips
        chips={[
          { value: 'expired', label: 'Прострочено', count: expiryCounts.expired || 0 },
          { value: 'soon', label: 'Скоро', count: expiryCounts.soon || 0 },
          { value: 'ok', label: 'В нормі', count: expiryCounts.ok || 0 },
          { value: 'none', label: 'Без терміну', count: expiryCounts.none || 0 },
        ]}
        selected={filterExpiry}
        onSelect={setFilterExpiry}
        allLabel="Всі терміни"
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon="📦"
          title="Запаси порожні"
          description="Додайте продукти, які є у вас в наявності, для відстеження термінів"
          action={<Button onClick={() => setShowAdd(true)}>Додати продукт</Button>}
        />
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => {
            const product = products.find((p) => p.id === item.productId)
            const expiryStatus = item.expiryDate ? getExpiryStatus(item.expiryDate) : null
            const days = item.expiryDate ? daysUntil(item.expiryDate) : null

            return (
              <div key={item.id} className="card flex items-center gap-3">
                <span className="text-2xl">{product?.icon || '📦'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-stone-900">{item.name}</h3>
                    {expiryStatus && expiryStatus !== 'ok' && (
                      <AlertTriangle size={14} className={expiryStatus === 'expired' ? 'text-red-500' : 'text-amber-500'} />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span>{item.quantity} {item.unit}</span>
                    <span>·</span>
                    <span>{STORAGE_METHOD_LABELS[item.storageMethod]}</span>
                    <span>·</span>
                    <span>Куплено {formatDate(item.purchaseDate)}</span>
                  </div>
                </div>
                {expiryStatus && (
                  <Badge variant={expiryStatus === 'expired' ? 'danger' : expiryStatus === 'danger' ? 'danger' : expiryStatus === 'warning' ? 'warning' : 'success'}>
                    {expiryStatus === 'expired' ? 'Прострочено' : expiryStatus === 'ok' ? `${days} дн.` : `${days} дн.`}
                  </Badge>
                )}
                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
            )
          })}
        </div>
      )}

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Додати продукт до запасів">
        <form onSubmit={handleSubmit} className="space-y-3">
          <SearchableSelect
            label="Оберіть продукт"
            placeholder="Довільний продукт"
            searchPlaceholder="Пошук продукту..."
            emptyText="Не знайдено"
            value={form.productId}
            onChange={handleProductSelect}
            options={products.map((p) => ({ value: p.id, label: p.name, icon: p.icon }))}
          />
          <Input
            label="Назва *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Напр.: Помідори"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Кількість"
              type="number"
              min={0.1}
              step={0.1}
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
            />
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Одиниця</label>
              <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="input">
                {['кг', 'г', 'л', 'мл', 'шт', 'пучок', 'пакет'].map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Спосіб зберігання</label>
            <select value={form.storageMethod} onChange={(e) => setForm({ ...form, storageMethod: e.target.value as StorageMethod })} className="input">
              {(Object.entries(STORAGE_METHOD_LABELS) as [StorageMethod, string][]).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Дата покупки"
              type="date"
              value={form.purchaseDate}
              onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })}
            />
            <Input
              label="Термін придатності"
              type="date"
              value={form.expiryDate}
              onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Нотатки</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Нотатки..."
              className="input min-h-[60px] resize-none"
            />
          </div>
          <Button type="submit" className="w-full">Додати</Button>
        </form>
      </Modal>
    </div>
  )
}
