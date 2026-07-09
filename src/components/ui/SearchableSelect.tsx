import { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown, X } from 'lucide-react'

interface Option {
  value: string
  label: string
  icon?: string
}

interface SearchableSelectProps {
  label?: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  clearText?: string
}

export function SearchableSelect({
  label,
  options,
  value,
  onChange,
  placeholder = 'Оберіть...',
  searchPlaceholder = 'Пошук...',
  emptyText = 'Нічого не знайдено',
  clearText = 'Довільний продукт',
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase()),
  )

  useEffect(() => {
    if (!isOpen) {
      setSearch('')
      return
    }

    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen])

  const handleSelect = (newValue: string) => {
    onChange(newValue)
    setIsOpen(false)
    setSearch('')
  }

  return (
    <div className="space-y-1 relative" ref={containerRef}>
      {label && <label className="block text-sm font-medium text-stone-700">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="input w-full flex items-center justify-between gap-2 text-left"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 truncate">
          {selected ? (
            <>
              {selected.icon && <span>{selected.icon}</span>}
              <span className="truncate">{selected.label}</span>
            </>
          ) : (
            <span className="text-stone-400">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          size={18}
          className={`text-stone-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-xl border border-stone-200 shadow-xl overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-stone-100 p-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                autoFocus
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:border-komora-500 focus:ring-1 focus:ring-komora-500"
              />
            </div>
          </div>
          <div className="max-h-[260px] overflow-y-auto p-1">
            <button
              type="button"
              onClick={() => handleSelect('')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                !value ? 'bg-komora-50 text-komora-700' : 'hover:bg-stone-50 text-stone-700'
              }`}
            >
              <X size={16} className="text-stone-400" />
              {clearText}
            </button>
            {filtered.length === 0 ? (
              <div className="px-3 py-4 text-sm text-stone-400 text-center">{emptyText}</div>
            ) : (
              filtered.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                    value === option.value
                      ? 'bg-komora-50 text-komora-700'
                      : 'hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                  <span className="truncate">{option.label}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
