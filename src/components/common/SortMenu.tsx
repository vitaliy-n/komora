import { useState, useRef, useEffect } from 'react'
import { ArrowUpDown, Check } from 'lucide-react'

export type SortOption<T> = {
  value: string
  label: string
  compare: (a: T, b: T) => number
}

interface SortMenuProps<T> {
  options: SortOption<T>[]
  value: string
  onChange: (value: string) => void
}

export function SortMenu<T>({ options, value, onChange }: SortMenuProps<T>) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = options.find((o) => o.value === value)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
      >
        <ArrowUpDown size={16} />
        <span className="hidden sm:inline">{current?.label || 'Сортувати'}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-52 bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 py-1 z-20 animate-slide-up">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${
                value === opt.value
                  ? 'text-komora-600 dark:text-komora-400 font-medium'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700'
              }`}
            >
              {opt.label}
              {value === opt.value && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
