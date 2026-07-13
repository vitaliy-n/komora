import { useState, useRef, useCallback } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/database'
import { Plus, Trash2, Move } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { STORAGE_METHOD_LABELS, type StorageLocation, type CanningEntry } from '../types'
import { useHaptic } from '../hooks/useHaptic'

const DEFAULT_LOCATIONS: StorageLocation[] = [
  { id: 'loc-basement', name: 'Підвал', type: 'basement', icon: '🏚️', capacity: 100, position: { x: 50, y: 50 }, color: '#8b5cf6' },
  { id: 'loc-pantry', name: 'Комора', type: 'room', icon: '🚪', capacity: 80, position: { x: 300, y: 50 }, color: '#f59e0b' },
  { id: 'loc-fridge', name: 'Холодильник', type: 'fridge', icon: '❄️', capacity: 40, position: { x: 50, y: 250 }, color: '#3b82f6' },
  { id: 'loc-freezer', name: 'Морозилка', type: 'freezer', icon: '🧊', capacity: 30, position: { x: 300, y: 250 }, color: '#06b6d4' },
]

export function StorageMapPage() {
  const locations = useLiveQuery(() => db.storageLocations.toArray())
  const cannings = useLiveQuery(() => db.canningEntries.toArray())
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [addingNew, setAddingNew] = useState(false)
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState<StorageLocation['type']>('room')
  const containerRef = useRef<HTMLDivElement>(null)
  const { medium, heavy } = useHaptic()

  const initLocations = useCallback(async () => {
    for (const loc of DEFAULT_LOCATIONS) {
      await db.storageLocations.put(loc)
    }
  }, [])

  if (locations && locations.length === 0) {
    initLocations()
  }

  const handleMouseDown = (e: React.MouseEvent, loc: StorageLocation) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left - loc.position.x,
      y: e.clientY - rect.top - loc.position.y,
    })
    setDraggingId(loc.id)
    medium()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(rect.width - 120, e.clientX - rect.left - dragOffset.x))
    const y = Math.max(0, Math.min(rect.height - 100, e.clientY - rect.top - dragOffset.y))
    db.storageLocations.update(draggingId, { position: { x, y } })
  }

  const handleMouseUp = () => {
    if (draggingId) {
      setDraggingId(null)
      heavy()
    }
  }

  const handleAddLocation = async () => {
    if (!newName.trim()) return
    const id = `loc-${Date.now()}`
    const icons: Record<string, string> = { room: '🚪', fridge: '❄️', basement: '🏚️', freezer: '🧊' }
    const colors: Record<string, string> = { room: '#f59e0b', fridge: '#3b82f6', basement: '#8b5cf6', freezer: '#06b6d4' }
    await db.storageLocations.put({
      id,
      name: newName,
      type: newType,
      icon: icons[newType],
      capacity: 50,
      position: { x: 150, y: 150 },
      color: colors[newType],
    })
    setNewName('')
    setAddingNew(false)
  }

  const handleDelete = async (id: string) => {
    await db.storageLocations.delete(id)
  }

  const canningsByLocation = (cannings || []).reduce<Record<string, CanningEntry[]>>((acc, c) => {
    const locId = locations?.find((l) => l.name === c.storageLocation)?.id
    if (locId) {
      (acc[locId] ||= []).push(c)
    }
    return acc
  }, {})

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Карта зберігання</h1>
        <Button onClick={() => setAddingNew(!addingNew)} className="flex items-center gap-2">
          <Plus size={18} />
          <span className="hidden sm:inline">Локація</span>
        </Button>
      </div>

      {addingNew && (
        <div className="card flex flex-wrap items-end gap-3">
          <div>
            <label className="text-xs text-stone-500 dark:text-stone-400 block mb-1">Назва</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Шафа, балкон..."
              className="input w-40"
            />
          </div>
          <div>
            <label className="text-xs text-stone-500 dark:text-stone-400 block mb-1">Тип</label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as StorageLocation['type'])}
              className="input w-40"
            >
              {Object.entries(STORAGE_METHOD_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <Button onClick={handleAddLocation}>Додати</Button>
        </div>
      )}

      <div
        ref={containerRef}
        className="relative w-full h-[500px] bg-stone-100 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="absolute top-2 left-2 text-xs text-stone-400 flex items-center gap-1">
          <Move size={12} /> Перетягуйте локації для переставлення
        </div>

        {(locations || []).map((loc) => {
          const items = canningsByLocation[loc.id] || []
          const fillPercent = Math.min(100, (items.reduce((s, c) => s + c.totalJars - c.consumedJars, 0) / loc.capacity) * 100)
          return (
            <div
              key={loc.id}
              className="absolute w-[120px] rounded-xl border-2 shadow-lg cursor-move select-none bg-white dark:bg-stone-800"
              style={{
                left: loc.position.x,
                top: loc.position.y,
                borderColor: loc.color,
                opacity: draggingId === loc.id ? 0.8 : 1,
              }}
              onMouseDown={(e) => handleMouseDown(e, loc)}
            >
              <div
                className="rounded-t-lg px-2 py-1 flex items-center justify-between text-white text-xs font-medium"
                style={{ backgroundColor: loc.color }}
              >
                <span>{loc.icon} {loc.name}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(loc.id) }}
                  className="hover:bg-white/20 rounded p-0.5"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              <div className="p-2">
                <div className="text-xs text-stone-500 dark:text-stone-400 mb-1">
                  {items.length} закруток
                </div>
                <div className="h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${fillPercent}%`,
                      backgroundColor: fillPercent > 80 ? '#ef4444' : loc.color,
                    }}
                  />
                </div>
                <div className="text-[10px] text-stone-400 mt-1">
                  {Math.round(fillPercent)}% заповнено
                </div>
              </div>
              {items.length > 0 && (
                <div className="px-2 pb-2 flex flex-wrap gap-1">
                  {items.slice(0, 4).map((c) => (
                    <span key={c.id} className="text-lg" title={c.name}>🫙</span>
                  ))}
                  {items.length > 4 && (
                    <span className="text-[10px] text-stone-400 self-center">+{items.length - 4}</span>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
