interface Chip {
  value: string
  label: string
  icon?: string
  count?: number
}

interface FilterChipsProps {
  chips: Chip[]
  selected: string
  onSelect: (value: string) => void
  allLabel?: string
  allIcon?: string
}

export function FilterChips({
  chips,
  selected,
  onSelect,
  allLabel = 'Всі',
  allIcon,
}: FilterChipsProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onSelect('')}
        className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
          !selected ? 'bg-komora-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600'
        }`}
      >
        {allIcon && <span className="mr-1">{allIcon}</span>}
        {allLabel}
      </button>
      {chips.map((chip) => (
        <button
          key={chip.value}
          onClick={() => onSelect(chip.value === selected ? '' : chip.value)}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
            selected === chip.value ? 'bg-komora-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600'
          }`}
        >
          {chip.icon && <span className="mr-1">{chip.icon}</span>}
          {chip.label}
          {chip.count !== undefined && (
            <span className={`ml-1.5 text-xs ${selected === chip.value ? 'text-komora-100' : 'text-stone-400'}`}>
              {chip.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
