import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/database'
import { Calendar as CalendarIcon, ArrowLeft, Apple, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '../components/ui/Badge'

const MONTHS = [
  'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
  'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
]

export function CalendarPage() {
  const navigate = useNavigate()
  const currentMonthIndex = new Date().getMonth()
  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex + 1) // 1-12

  const products = useLiveQuery(() => db.products.toArray())

  if (!products) {
    return <div className="flex justify-center py-8">Завантаження...</div>
  }

  // Filter products that are in season for the selected month
  const seasonalProducts = products.filter(p => p.seasonMonths.includes(selectedMonth))

  // Group by category
  const groupedProducts = seasonalProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }
    acc[product.category].push(product)
    return acc
  }, {} as Record<string, typeof products>)

  const handlePrevMonth = () => {
    setSelectedMonth(prev => prev === 1 ? 12 : prev - 1)
  }

  const handleNextMonth = () => {
    setSelectedMonth(prev => prev === 12 ? 1 : prev + 1)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
            <CalendarIcon className="text-komora-600" />
            Сезонний календар
          </h1>
          <p className="text-sm text-stone-500">Що консервувати цього місяця</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={handlePrevMonth}
            className="p-2 rounded-xl hover:bg-stone-100 transition-colors"
          >
            <ChevronLeft size={24} className="text-stone-600" />
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-komora-700 capitalize">
              {MONTHS[selectedMonth - 1]}
            </h2>
            {selectedMonth === currentMonthIndex + 1 && (
              <Badge variant="success" className="mt-1">Поточний місяць</Badge>
            )}
          </div>

          <button 
            onClick={handleNextMonth}
            className="p-2 rounded-xl hover:bg-stone-100 transition-colors"
          >
            <ChevronRight size={24} className="text-stone-600" />
          </button>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 mb-8">
          {MONTHS.map((month, index) => {
            const isSelected = selectedMonth === index + 1
            const isCurrent = currentMonthIndex === index
            return (
              <button
                key={month}
                onClick={() => setSelectedMonth(index + 1)}
                className={`
                  text-xs font-medium py-2 rounded-lg transition-colors
                  ${isSelected ? 'bg-komora-600 text-white shadow-sm' : 
                    isCurrent ? 'bg-komora-100 text-komora-700' : 'bg-stone-50 text-stone-500 hover:bg-stone-100'}
                `}
                title={month}
              >
                {month.slice(0, 3)}
              </button>
            )
          })}
        </div>

        {Object.keys(groupedProducts).length === 0 ? (
          <div className="text-center py-12">
            <Apple size={48} className="mx-auto text-stone-300 mb-4" />
            <p className="text-stone-500">Для цього місяця немає сезонних продуктів.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedProducts).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                  <div className="w-2 h-6 bg-komora-500 rounded-full" />
                  {category}
                  <span className="text-sm font-normal text-stone-400">({items.length})</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {items.map(product => (
                    <div 
                      key={product.id}
                      onClick={() => navigate(`/app/products/${product.id}`)}
                      className="flex items-center gap-3 p-3 rounded-xl border border-stone-100 bg-stone-50 hover:bg-stone-100 hover:border-stone-200 transition-all cursor-pointer cursor-pointer"
                    >
                      <span className="text-2xl">{product.icon}</span>
                      <span className="text-sm font-medium text-stone-700 line-clamp-2 leading-tight">
                        {product.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
