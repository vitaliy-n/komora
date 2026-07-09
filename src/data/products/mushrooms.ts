import type { Product } from '../../types'

export const mushroomsProducts: Product[] = [
{
    id: 'prod-mushrooms',
    name: 'Гриби (загальне)',
    category: 'Гриби',
    icon: '🍄',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 5, tips: 'В паперовому пакеті, не в поліетилені' },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365, tips: 'Відварити або обсмажити перед заморозкою' },
    ],
    compatibility: [],
    spoilageSigns: ['Слизькість', 'Потемніння', 'Неприємний запах', 'Плісняві плями'],
    seasonMonths: [6, 7, 8, 9, 10],
    tips: ['Мариновані та солоні гриби — класика', 'ОБОВ\'ЯЗКОВО впевнитись у їстівності!'],
    isBuiltIn: true,
  },

{
    id: 'prod-champignon',
    name: 'Шампіньйони',
    category: 'Гриби',
    icon: '🍄',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 7, tips: 'В паперовому пакеті' },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Потемніння шляпки', 'Слизькість', 'Неприємний запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Мариновані шампіньйони — швидка закуска'],
    isBuiltIn: true,
  },

{
    id: 'prod-boletus',
    name: 'Білі гриби (боровики)',
    category: 'Гриби',
    icon: '🍄',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 3 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365, tips: 'Нарізати та бланшувати' },
    ],
    compatibility: [],
    spoilageSigns: ['Потемніння', 'Черв\'ячки', 'М\'якість', 'Неприємний запах'],
    seasonMonths: [6, 7, 8, 9, 10],
    tips: ['Мариновані білі гриби — делікатес', 'Сушені зберігаються роками'],
    isBuiltIn: true,
  },

{
    id: 'prod-chanterelle',
    name: 'Лисички',
    category: 'Гриби',
    icon: '🟡',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 3 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365, tips: 'Попередньо обсмажити' },
    ],
    compatibility: [],
    spoilageSigns: ['Висихання', 'Потемніння', 'Неприємний запах'],
    seasonMonths: [6, 7, 8, 9],
    tips: ['Ніколи не бувають червивими', 'Мариновані лисички — ніжний смак'],
    isBuiltIn: true,
  },

{
    id: 'prod-honey-mushroom',
    name: 'Опеньки',
    category: 'Гриби',
    icon: '🍄',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 3 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Слизькість', 'Потемніння', 'Неприємний запах'],
    seasonMonths: [8, 9, 10, 11],
    tips: ['Мариновані опеньки — одна з найпопулярніших заготовок', 'ОБОВ\'ЯЗКОВО відварити перед маринуванням'],
    isBuiltIn: true,
  },

{
    id: 'prod-russula',
    name: 'Сироїжки',
    category: 'Гриби',
    icon: '🍄',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 3 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Слизькість', 'Потемніння', 'Неприємний запах'],
    seasonMonths: [6, 7, 8, 9, 10],
    tips: ['Солоні сироїжки — швидка закуска', 'Деякі види мають гострий смак — краще вимочити'],
    isBuiltIn: true,
  },

{
    id: 'prod-milk-mushroom',
    name: 'Груздь',
    category: 'Гриби',
    icon: '🍄',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 2 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Слизькість', 'Потемніння', 'Неприємний запах'],
    seasonMonths: [7, 8, 9, 10],
    tips: ['Обов\'язково вимочити 2-3 дні перед засолкою', 'Солоні груздочки — королі грибних заготовок'],
    isBuiltIn: true,
  },

{
    id: 'prod-oyster-mushroom',
    name: 'Гливи',
    category: 'Гриби',
    icon: '🍄',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 7 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Потемніння', 'Слизькість', 'Висихання'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Мариновані гливи — швидка та смачна закуска'],
    isBuiltIn: true,
  },

{
    id: 'prod-morel',
    name: 'Маслюки',
    category: 'Гриби',
    icon: '🍄',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 3 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Слизькість', 'Потемніння', 'Черв\'якуватість'],
    seasonMonths: [6, 7, 8, 9, 10],
    tips: ['Зняти плівку зі шляпки перед маринуванням', 'Мариновані маслюки — класика'],
    isBuiltIn: true,
  },

{
    id: 'prod-porcini-dry',
    name: 'Гриби сушені',
    category: 'Гриби',
    icon: '🍄',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, humidity: { min: 40, max: 60 }, shelfLifeDays: 730, tips: 'У паперових пакетах або скляних банках' },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява', 'Сторонній запах', 'Крихкість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Зберігати в сухому місці', 'Не допускати потрапляння вологи'],
    isBuiltIn: true,
  },

{
    id: 'prod-shiitake',
    name: 'Гриби Шиїтаке',
    category: 'Гриби',
    icon: '🍄',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 5 }, shelfLifeDays: 7 },
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365, tips: 'Сушені' },
    ],
    compatibility: [],
    spoilageSigns: ['Слизькість', 'Темні плями', 'Неприємний запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Мають виражений смак "умами"', 'Дуже корисні'],
    isBuiltIn: true,
  },

{
    id: 'prod-mushroom-shiitake',
    name: 'Гриби Шиїтаке свіжі',
    category: 'Гриби',
    icon: '🍄',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 4 }, shelfLifeDays: 7 },
    ],
    compatibility: [],
    spoilageSigns: ['Липкість', 'Потемніння пластинок'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Використовуйте лише капелюшки, ніжки жорсткі'],
    isBuiltIn: true,
  },

{
    id: 'prod-mushroom-oyster',
    name: 'Глива (гриби) свіжа',
    category: 'Гриби',
    icon: '🍄',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 4 }, shelfLifeDays: 5 },
    ],
    compatibility: [],
    spoilageSigns: ['Підсихання країв', 'Пліснява'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Ростуть гронами на деревах або субстраті'],
    isBuiltIn: true,
  },

{
    id: 'prod-mushroom-porcini-dried',
    name: 'Білі гриби сушені',
    category: 'Гриби',
    icon: '🍄',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи (черви)', 'Пліснява від вологи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Замочити у воді на 30 хв перед готуванням'],
    isBuiltIn: true,
  }
]
