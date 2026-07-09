import type { Product } from '../../types'

export const canningExtraProducts: Product[] = [
{
    id: 'prod-green-tomato',
    name: 'Помідори зелені',
    category: 'Овочі',
    icon: '🟢',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, shelfLifeDays: 14, tips: 'Дозрівають при кімнатній температурі' },
      { method: 'basement', temperature: { min: 10, max: 14 }, humidity: { min: 85, max: 90 }, shelfLifeDays: 60, tips: 'Зберігаються довго в погребі' },
      { method: 'fridge', temperature: { min: 4, max: 8 }, shelfLifeDays: 21 },
    ],
    compatibility: [
      { productId: 'prod-tomato', compatible: true, reason: 'Схожі умови зберігання' },
    ],
    spoilageSigns: ['М\'які плями', 'Гниття', 'Пліснява'],
    seasonMonths: [8, 9, 10],
    tips: ['Ідеальні для маринування та варення', 'Можна зберігати до дозрівання'],
    isBuiltIn: true,
  },
{
    id: 'prod-garlic-shoots',
    name: 'Стрілки часнику',
    category: 'Овочі',
    icon: '🌿',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 5 }, shelfLifeDays: 7 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 180, tips: 'Нарізати перед заморозкою' },
    ],
    compatibility: [],
    spoilageSigns: ['В\'янення', 'Пожовтіння', 'Слизькість'],
    seasonMonths: [5, 6],
    tips: ['Маринуються цілими спіралями або нарізаними', 'Видаляйте верхівку з квіткою'],
    isBuiltIn: true,
  },
]
