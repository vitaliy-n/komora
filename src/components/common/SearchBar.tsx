import { Search, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useDebounce } from '../../hooks/useDebounce'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  debounceMs?: number
}

export function SearchBar({ value, onChange, placeholder = 'Пошук...', debounceMs = 300 }: SearchBarProps) {
  const [focused, setFocused] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const debouncedValue = useDebounce(localValue, debounceMs)

  useEffect(() => {
    onChange(debouncedValue)
  }, [debouncedValue, onChange])

  return (
    <div className={`relative flex items-center rounded-xl border transition-all dark:border-stone-600 ${focused ? 'border-komora-500 ring-2 ring-komora-500/20' : 'border-stone-300'}`}>
      <Search size={18} className="absolute left-3 text-stone-400" />
      <input
        type="text"
        value={localValue}
        onChange={(e) => {
          setLocalValue(e.target.value)
          if (debounceMs === 0) onChange(e.target.value)
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-transparent focus:outline-none text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
      />
      {localValue && (
        <button
          onClick={() => {
            setLocalValue('')
            onChange('')
          }}
          className="absolute right-3 p-0.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-700"
        >
          <X size={16} className="text-stone-400" />
        </button>
      )}
    </div>
  )
}
