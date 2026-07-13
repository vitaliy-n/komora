import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, BookOpen, Apple, Calendar, X } from 'lucide-react'
import { Button } from '../ui/Button'

const steps = [
  {
    icon: Cookie,
    title: 'Облік закруток',
    description: 'Додавайте свої домашні заготовки, відстежуйте кількість банок і терміни придатності.',
    color: 'text-komora-600',
  },
  {
    icon: BookOpen,
    title: 'Рецепти',
    description: 'Вбудована колекція рецептів консервування — від маринадів до джемів.',
    color: 'text-blue-600',
  },
  {
    icon: Apple,
    title: 'Каталог продуктів',
    description: 'Понад 850 продуктів з інформацією про зберігання, сумісність та сезонність.',
    color: 'text-orange-600',
  },
  {
    icon: Calendar,
    title: 'Сезонний календар',
    description: 'Дізнайтеся, які продукти зараз в сезоні — найкращий час для консервування.',
    color: 'text-purple-600',
  },
]

export function OnboardingModal() {
  const [step, setStep] = useState(0)
  const [dismissed, setDismissed] = useState(
    localStorage.getItem('komora_onboarding_done') === 'true',
  )

  if (dismissed) return null

  const handleSkip = () => {
    localStorage.setItem('komora_onboarding_done', 'true')
    setDismissed(true)
  }

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      handleSkip()
    }
  }

  const current = steps[step]
  const Icon = current.icon

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-stone-800 rounded-2xl max-w-md w-full p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? 'w-6 bg-komora-500' : 'w-1.5 bg-stone-300 dark:bg-stone-600'
                }`}
              />
            ))}
          </div>
          <button onClick={handleSkip} className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700">
            <X size={18} className="text-stone-400" />
          </button>
        </div>

        <div className="text-center py-6">
          <div className={`inline-flex p-4 rounded-2xl bg-stone-50 dark:bg-stone-700 mb-4`}>
            <Icon size={40} className={current.color} />
          </div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">{current.title}</h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">{current.description}</p>
        </div>

        <div className="flex gap-2">
          {step > 0 && (
            <Button variant="secondary" onClick={() => setStep(step - 1)} className="flex-1">
              Назад
            </Button>
          )}
          <Button onClick={handleNext} className="flex-1">
            {step < steps.length - 1 ? 'Далі' : 'Почати'}
          </Button>
        </div>

        {step === 0 && (
          <p className="text-center text-xs text-stone-400 mt-3">
            <Link to="/app/cannings/new" onClick={handleSkip} className="text-komora-600 hover:underline">
              Пропустити та створити закрутку →
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
