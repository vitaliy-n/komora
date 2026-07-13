import { useState } from 'react'
import { BookMarked, ChevronDown, ChevronUp } from 'lucide-react'

interface Guide {
  id: string
  title: string
  icon: string
  description: string
  steps: string[]
  tips: string[]
  duration: string
  difficulty: 'Легко' | 'Середньо' | 'Складно'
}

const GUIDES: Guide[] = [
  {
    id: 'sterilization',
    title: 'Стерилізація банок',
    icon: '🔥',
    description: 'Правильна стерилізація — запорука тривалого зберігання',
    duration: '15-30 хв',
    difficulty: 'Легко',
    steps: [
      'Ретельно вимийте банки з содою, сполосніть теплою водою',
      'Поставте банки шийкою вниз на решітку в каструлю з водою',
      'Доведіть воду до кипіння і стерилізуйте 15 хв (0.5л), 20 хв (1л), 30 хв (3л)',
      'Кришки кип\'ятіть окремо 5-10 хвилин',
      'Виймайте банки стерильною щипцями, дайте стекти воді',
      'Заповнюйте банки гарячим продуктом відразу після стерилізації',
    ],
    tips: [
      'Не витирайте банки рушником — це порушує стерильність',
      'Стерилізуйте банки безпосередньо перед використанням',
      'Якщо банка холодна, а продукт гарячий — банка може лопнути',
    ],
  },
  {
    id: 'marinading',
    title: 'Маринування овочів',
    icon: '🥒',
    description: 'Класичний метод для огірків, помідорів, кабачків',
    duration: '1-2 години',
    difficulty: 'Середньо',
    steps: [
      'Підготуйте овочі: помийте, при потребі почистіть, наріжте',
      'Щільно укладіть овочі в стерильні банки',
      'Зваріть маринад: на 1 л води — 1-2 ст.л. солі, 2-3 ст.л. цукру, спеції',
      'Залийте овочі гарячим маринадом, залиште на 10-15 хв',
      'Злийте маринад, доведіть до кипіння знову, додайте оцет',
      'Залийте маринадом, закатайте кришки, переверніть банки',
    ],
    tips: [
      'Оцет додавайте в маринад останнім, щоб не випарувався',
      'Для хрустких огірків додайте листя хрону та дуба',
      'Не переварюйте овочі — вони стануть м\'якими',
    ],
  },
  {
    id: 'jam',
    title: 'Варення та джеми',
    icon: '🍓',
    description: 'Солодкі заготовки з фруктів та ягід',
    duration: '1-3 години',
    difficulty: 'Середньо',
    steps: [
      'Переберіть і помийте ягоди/фрукти, видаліть кісточки',
      'Засипте цукром (1:1 або 1:0.7) і залиште на 4-6 годин для соку',
      'Доведіть до кипіння на середньому вогні, зніміть піну',
      'Варіть 15-30 хв до потрібної консистенції',
      'Для густого джему пюрізуйте масу блендером і уваріть ще',
      'Розлийте гарячим у стерильні банки, закатайте',
    ],
    tips: [
      'Піну знімайте регулярно — вона містить білки, що погіршують зберігання',
      'Для желейної консистенції додайте пектин або агар-агар',
      'Лимонна кислота (1/4 ч.л. на кг) покращує колір і зберігання',
    ],
  },
  {
    id: 'drying',
    title: 'Сушка фруктів і грибів',
    icon: '☀️',
    description: 'Найстаріший метод збереження продуктів',
    duration: '6-24 години',
    difficulty: 'Легко',
    steps: [
      'Помийте і наріжте продукти тонкими скибками (3-5 мм)',
      'Бланшуюте фрукти 2-3 хв в кислому розчині (для кольору)',
      'Розкладіть на решітці в один шар, не накладаючи',
      'Сушіть при 50-70°C з циркуляцією повітря',
      'Періодично перевертайте скибки',
      'Готові продукти мають бути сухими, але еластичними',
    ],
    tips: [
      'Не сушіть різні продукти одночасно — вони обмінюються ароматами',
      'Зберігайте в герметичних банках у темному місці',
      'Гриби перед сушінням не миють — лише очищають щіткою',
    ],
  },
  {
    id: 'freezing',
    title: 'Заморожування продуктів',
    icon: '❄️',
    description: 'Найшвидший спосіб збереження вітамінів',
    duration: '30 хв - 1 год',
    difficulty: 'Легко',
    steps: [
      'Помийте і підготуйте продукти (наріжте, бланшуюте при потребі)',
      'Охолодіть продукти до кімнатної температури',
      'Розкладіть на деку в один шар і заморозьте (шокова заморозка)',
      'Пересипте заморожені продукти в пакети або контейнери',
      'Випустіть повітря з пакетів, герметично закрийте',
      'Наклейте етикетку з назвою і датою',
    ],
    tips: [
      'Шокова заморозка зберігає текстуру краще, ніж повільна',
      'Не заморожуйте повторно розморожені продукти',
      'Зелені трави можна заморозити в олії у формах для льоду',
    ],
  },
  {
    id: 'fermentation',
    title: 'Квашення та ферментація',
    icon: '🥬',
    description: 'Традиційний метод без оцту, через молочнокисле бродіння',
    duration: '3-7 днів',
    difficulty: 'Складно',
    steps: [
      'Підготуйте овочі: помийте, наріжте, нашаткуйте',
      'Приготуйте розсіл: 20-25 г солі на 1 л води (2-2.5%)',
      'Щільно укладіть овочі в банку або діжу',
      'Залийте розсолом так, щоб покривав овочі',
      'Поставте гніт і залиште при кімнатній температурі 3-5 днів',
      'Періодично проколюйте виделкою для виходу газів',
      'Після закінчення бродіння перенесіть в прохолодне місце',
    ],
    tips: [
      'Використовуйте кам\'яну або морсьву сіль — йодувана сіль пригнічує бактерії',
      'Температура бродіння 18-22°C — занадто тепло зіпсує продукт',
      'Піна на поверхні — нормально, але знімайте її регулярно',
    ],
  },
]

export function GuidesPage() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <BookMarked size={24} className="text-komora-600" />
        <h1 className="page-title">Гіди з консервації</h1>
      </div>

      <p className="text-sm text-stone-500 dark:text-stone-400">
        Покрокові інструкції для різних методів консервації та збереження продуктів
      </p>

      <div className="space-y-3">
        {GUIDES.map((guide) => (
          <div key={guide.id} className="card">
            <button
              onClick={() => setExpanded(expanded === guide.id ? null : guide.id)}
              className="w-full flex items-start gap-3 text-left"
            >
              <span className="text-3xl flex-shrink-0">{guide.icon}</span>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-stone-900 dark:text-stone-100">{guide.title}</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">{guide.description}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300">
                    ⏱ {guide.duration}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    guide.difficulty === 'Легко'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : guide.difficulty === 'Середньо'
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>
                    {guide.difficulty}
                  </span>
                </div>
              </div>
              {expanded === guide.id ? <ChevronUp size={20} className="text-stone-400 flex-shrink-0" /> : <ChevronDown size={20} className="text-stone-400 flex-shrink-0" />}
            </button>

            {expanded === guide.id && (
              <div className="mt-4 space-y-4 animate-slide-up">
                <div>
                  <h3 className="font-medium text-sm text-stone-700 dark:text-stone-300 mb-2">Покрокова інструкція</h3>
                  <ol className="space-y-2">
                    {guide.steps.map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-komora-100 dark:bg-komora-900/30 text-komora-700 dark:text-komora-400 flex items-center justify-center text-xs font-semibold">
                          {i + 1}
                        </span>
                        <p className="text-sm text-stone-700 dark:text-stone-300 pt-0.5">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <h3 className="font-medium text-sm text-amber-800 dark:text-amber-400 mb-2">💡 Поради</h3>
                  <ul className="space-y-1">
                    {guide.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-amber-700 dark:text-amber-300 flex gap-2">
                        <span>•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
