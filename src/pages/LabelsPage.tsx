import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Loader2 } from 'lucide-react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/database'
import { Button } from '../components/ui/Button'
import { downloadLabelPDF, type LabelTemplate } from '../utils/label-generator'
import { formatDate } from '../utils/date'
import { useHaptic } from '../hooks/useHaptic'

export function LabelsPage() {
  const navigate = useNavigate()
  const cannings = useLiveQuery(() => db.canningEntries.toArray())
  const recipes = useLiveQuery(() => db.recipes.toArray())
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [template, setTemplate] = useState<LabelTemplate>('medium')
  const [generating, setGenerating] = useState(false)
  const { success, error: hapticError } = useHaptic()

  const recipeMap = (recipes || []).reduce<Record<string, string>>((acc, r) => {
    acc[r.id] = r.name
    return acc
  }, {})

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectAll = () => {
    if (cannings) setSelected(new Set(cannings.map((c) => c.id)))
  }

  const selectNone = () => setSelected(new Set())

  const handleDownload = async () => {
    if (!cannings || selected.size === 0) return
    setGenerating(true)
    try {
      const items = cannings
        .filter((c) => selected.has(c.id))
        .map((c) => ({
          id: c.id,
          name: c.name,
          date: formatDate(c.date),
          jarSize: c.jarSize,
          recipeName: c.recipeId ? recipeMap[c.recipeId] : undefined,
        }))
      await downloadLabelPDF(items, template)
      success()
    } catch {
      hapticError()
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700">
            <ArrowLeft size={20} />
          </button>
          <h1 className="page-title">Етикетки</h1>
        </div>
        <Button onClick={handleDownload} disabled={selected.size === 0 || generating}>
          {generating ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
          <span className="ml-2">{generating ? 'Генерування...' : `Завантажити (${selected.size})`}</span>
        </Button>
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Розмір етикетки:</span>
          {(['small', 'medium', 'large'] as LabelTemplate[]).map((t) => (
            <button
              key={t}
              onClick={() => setTemplate(t)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                template === t
                  ? 'bg-komora-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600'
              }`}
            >
              {t === 'small' ? 'Малі' : t === 'medium' ? 'Середні' : 'Великі'}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={selectAll} className="text-sm text-komora-600 hover:underline">
            Виділити всі
          </button>
          <button onClick={selectNone} className="text-sm text-stone-400 hover:underline">
            Скинути
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {(cannings || []).map((canning) => (
          <label
            key={canning.id}
            className="card flex items-center gap-3 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors"
          >
            <input
              type="checkbox"
              checked={selected.has(canning.id)}
              onChange={() => toggleSelect(canning.id)}
              className="w-5 h-5 rounded text-komora-600 focus:ring-komora-500"
            />
            <span className="text-2xl">🫙</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-stone-900 dark:text-stone-100">{canning.name}</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {formatDate(canning.date)} · {canning.jarSize} л · {canning.totalJars} банок
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
