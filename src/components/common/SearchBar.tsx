import { Search, X } from 'lucide-react'
import { useState } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Пошук...' }: SearchBarProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div className={`relative flex items-center rounded-xl border transition-all ${focused ? 'border-komora-500 ring-2 ring-komora-500/20' : 'border-stone-300'}`}>
      <Search size={18} className="absolute left-3 text-stone-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-transparent focus:outline-none text-stone-900 placeholder:text-stone-400"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 p-0.5 rounded-full hover:bg-stone-100"
        >
          <X size={16} className="text-stone-400" />
        </button>
      )}
    </div>
  )
}
