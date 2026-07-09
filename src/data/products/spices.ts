import type { Product } from '../../types'

export const spicesProducts: Product[] = [
{
    id: 'prod-bay-leaf',
    name: 'Лавровий лист',
    category: 'Спеції',
    icon: '🍃',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, humidity: { min: 40, max: 60 }, shelfLifeDays: 730, tips: 'У герметичній тарі' },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату', 'Ламкість', 'Зміна кольору'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Обов\'язковий інгредієнт будь-якого маринаду', '2-3 листки на банку'],
    isBuiltIn: true,
  },

{
    id: 'prod-black-pepper',
    name: 'Перець чорний горошком',
    category: 'Спеції',
    icon: '⚫',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, humidity: { min: 40, max: 60 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату', 'Порошковість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['5-10 горошин на літрову банку', 'Цілий зберігає аромат довше за мелений'],
    isBuiltIn: true,
  },

{
    id: 'prod-allspice',
    name: 'Перець духмяний (запашний)',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Більший за чорний перець', '3-5 горошин на банку', 'Надає теплий пряний аромат маринадам'],
    isBuiltIn: true,
  },

{
    id: 'prod-clove',
    name: 'Гвоздика',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату', 'Ламкість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['2-3 штуки на банку', 'Перевірка якості: кинути в воду — свіжа тоне', 'Додають у маринади, компоти та варення'],
    isBuiltIn: true,
  },

{
    id: 'prod-cinnamon',
    name: 'Кориця',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату', 'Сторонній запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Палички — в компоти та маринади', 'Мелена — у варення та джеми'],
    isBuiltIn: true,
  },

{
    id: 'prod-coriander-seeds',
    name: 'Коріандр (насіння)',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Додають цитрусову нотку маринадам', 'Популярний у кавказьких рецептах'],
    isBuiltIn: true,
  },

{
    id: 'prod-cumin',
    name: 'Кмин',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Додають при квашенні капусти', 'Надає характерний аромат'],
    isBuiltIn: true,
  },

{
    id: 'prod-dill-seeds',
    name: 'Насіння кропу',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Замінює зонтики кропу взимку', '1 ч.л. на літрову банку'],
    isBuiltIn: true,
  },

{
    id: 'prod-mustard-seeds',
    name: 'Гірчичне насіння',
    category: 'Спеції',
    icon: '🟡',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату', 'Прогірклість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Запобігає плісняві в банці', 'Надає гостроту маринадам', '1 ч.л. на банку'],
    isBuiltIn: true,
  },

{
    id: 'prod-nutmeg',
    name: 'Мускатний горіх',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату', 'Висихання'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Натирати безпосередньо перед використанням', 'Додають у варення та джеми — дрібка'],
    isBuiltIn: true,
  },

{
    id: 'prod-cardamom',
    name: 'Кардамон',
    category: 'Спеції',
    icon: '🟢',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Додають у компоти та варення для екзотичного аромату'],
    isBuiltIn: true,
  },

{
    id: 'prod-star-anise',
    name: 'Бадьян (зірковий аніс)',
    category: 'Спеції',
    icon: '⭐',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату', 'Ламкість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['1 зірочка на 3-літрову банку компоту', 'Надає анісовий аромат'],
    isBuiltIn: true,
  },

{
    id: 'prod-turmeric',
    name: 'Куркума',
    category: 'Спеції',
    icon: '🟡',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата кольору', 'Втрата аромату', 'Грудкування'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Надає золотистий колір маринадам', 'Фарбує все навколо — обережно!'],
    isBuiltIn: true,
  },

{
    id: 'prod-sumac',
    name: 'Сумах',
    category: 'Спеції',
    icon: '🔴',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата кольору', 'Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Кислий смак — замінює лимонну кислоту', 'Червоний колір прикрашає страви'],
    isBuiltIn: true,
  },

{
    id: 'prod-ginger',
    name: 'Імбир',
    category: 'Спеції',
    icon: '🫚',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, shelfLifeDays: 7 },
      { method: 'fridge', temperature: { min: 2, max: 5 }, shelfLifeDays: 30 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Зморщування', 'М\'якість', 'Пліснява'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Маринований імбир — популярна закуска', 'Додають у варення для пікантності'],
    isBuiltIn: true,
  },

{
    id: 'prod-vanilla',
    name: 'Ванілін / Ваніль',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату', 'Грудкування'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Додають у варення, джеми та компоти', 'Натуральна стручкова ваніль — найкраща'],
    isBuiltIn: true,
  },

{
    id: 'prod-fenugreek',
    name: 'Пажитник (хмелі-сунелі)',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Основа кавказьких приправ', 'Додає горіховий аромат'],
    isBuiltIn: true,
  },

{
    id: 'prod-paprika',
    name: 'Паприка (мелена)',
    category: 'Спеції',
    icon: '🔴',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата кольору', 'Втрата аромату', 'Грудкування'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Солодка паприка для лечо та аджики', 'Копчена паприка — особливий аромат'],
    isBuiltIn: true,
  },

{
    id: 'prod-celery-seeds',
    name: 'Насіння селери',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Додають у маринади для пікантного аромату'],
    isBuiltIn: true,
  },

{
    id: 'prod-fennel-seeds',
    name: 'Насіння фенхелю',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Анісовий аромат', 'Додають у маринади та соління'],
    isBuiltIn: true,
  },

{
    id: 'prod-juniper',
    name: 'Ягоди ялівцю',
    category: 'Спеції',
    icon: '🔵',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Висихання', 'Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Додають при квашенні капусти', '2-3 ягідки на банку маринаду'],
    isBuiltIn: true,
  },

{
    id: 'prod-saffron',
    name: 'Шафран',
    category: 'Спеції',
    icon: '🟡',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095, tips: 'У герметичній тарі, подалі від світла' },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата кольору', 'Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Найдорожча спеція у світі', 'Дрібка надає золотистий колір'],
    isBuiltIn: true,
  },

{
    id: 'prod-horseradish-root-dried',
    name: 'Хрін (сушений корінь)',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, humidity: { min: 40, max: 60 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата гостроти', 'Пліснява'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Замочити перед використанням', 'Замінює свіжий хрін взимку'],
    isBuiltIn: true,
  },

{
    id: 'prod-dried-garlic',
    name: 'Часник сушений (гранули)',
    category: 'Спеції',
    icon: '🧄',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Грудкування', 'Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Замінює свіжий часник у маринадах', '1 ч.л. = 2 зубчики свіжого'],
    isBuiltIn: true,
  },

{
    id: 'prod-white-pepper',
    name: 'Перець білий горошком',
    category: 'Спеції',
    icon: '⚪',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['М\'якший за чорний — для ніжних маринадів', 'Не змінює колір маринаду'],
    isBuiltIn: true,
  },

{
    id: 'prod-red-pepper-flakes',
    name: 'Перець червоний (пластівці)',
    category: 'Спеції',
    icon: '🌶️',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата кольору', 'Втрата гостроти'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для аджики та гострих соусів'],
    isBuiltIn: true,
  },

{
    id: 'prod-dill-seeds',
    name: 'Кріп (зонтики/насіння)',
    category: 'Спеції',
    icon: '🌿',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 730, tips: 'Сушені зонтики' },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату', 'Пліснява', 'Потемніння'],
    seasonMonths: [7, 8, 9],
    tips: ['Обов\'язкова прянність для солінь', 'Зберігати в герметичній тарі'],
    isBuiltIn: true,
  },

{
    id: 'prod-bay-leaf',
    name: 'Лавровий лист',
    category: 'Спеції',
    icon: '🍃',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату', 'Пліснява'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Універсальна прянність', 'Для маринадів та солінь'],
    isBuiltIn: true,
  },

{
    id: 'prod-black-pepper',
    name: 'Перець чорний (горошок)',
    category: 'Спеції',
    icon: '⚫',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату', 'Пліснява'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Головна спеція для консервації', 'Зберігати в герметичній тарі'],
    isBuiltIn: true,
  },

{
    id: 'prod-allspice',
    name: 'Перець духмяний (пімента)',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для маринадів та м\'ясних консервів'],
    isBuiltIn: true,
  },

{
    id: 'prod-clove',
    name: 'Гвоздика',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для маринованих огірків та грибів', 'Кілька бутонів на банку'],
    isBuiltIn: true,
  },

{
    id: 'prod-cinnamon',
    name: 'Кориця',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для солодких компотів', 'Маринованих фруктів'],
    isBuiltIn: true,
  },

{
    id: 'prod-coriander',
    name: 'Коріандр (кінза насіння)',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для маринованих помідорів', 'Кавказька кухня'],
    isBuiltIn: true,
  },

{
    id: 'prod-spice-cumin',
    name: 'Зіра (Кмин римський)',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Незамінна для плову та східних страв'],
    isBuiltIn: true,
  },

{
    id: 'prod-spice-star-anise',
    name: 'Бадьян (Аніс зірчастий)',
    category: 'Спеції',
    icon: '⭐',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Ламкість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для глінтвейну та маринування груш'],
    isBuiltIn: true,
  },

{
    id: 'prod-spice-smoked-paprika',
    name: 'Паприка копчена',
    category: 'Спеції',
    icon: '🔴',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата кольору'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Надає аромат багаття стравам'],
    isBuiltIn: true,
  },

{
    id: 'prod-spice-sumac',
    name: 'Сумах (спеція)',
    category: 'Спеції',
    icon: '🔴',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата кислотності'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Кисла спеція бордового кольору'],
    isBuiltIn: true,
  },

{
    id: 'prod-spice-saffron',
    name: 'Шафран (справжній)',
    category: 'Спеції',
    icon: '🟡',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095, tips: 'У герметичній скляній тарі' },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата кольору та запаху'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Найдорожча спеція у світі'],
    isBuiltIn: true,
  },

{
    id: 'prod-spice-vanilla-bean',
    name: 'Ваніль натуральна (стручки)',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Висихання до ламкості', 'Пліснява'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для вишуканих варень та десертів'],
    isBuiltIn: true,
  },

{
    id: 'prod-spice-cardamom',
    name: 'Кардамон (коробочки)',
    category: 'Спеції',
    icon: '🟢',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для кави, випічки та глінтвейну'],
    isBuiltIn: true,
  },

{
    id: 'prod-spice-juniper',
    name: 'Ялівець (ягоди)',
    category: 'Спеції',
    icon: '🫐',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Всихання до пилу'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Ідеально для страв з дичини та маринадів'],
    isBuiltIn: true,
  },

{
    id: 'prod-spice-marjoram',
    name: 'Майоран сушений',
    category: 'Спеції',
    icon: '🌿',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата кольору (сірість)'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Схожий на орегано, але ніжніший'],
    isBuiltIn: true,
  },

{
    id: 'prod-canning-mustard-seeds',
    name: 'Гірчиця (насіння жовте)',
    category: 'Спеції',
    icon: '🟡',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Гіркий прогірклий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для маринадів. Захищає консервацію від "вибухання".'],
    isBuiltIn: true,
  },

{
    id: 'prod-canning-allspice',
    name: 'Перець духмяний (горошок)',
    category: 'Спеції',
    icon: '⚫',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата ефірних олій'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Обов\'язкова складова класичного маринаду.'],
    isBuiltIn: true,
  },

{
    id: 'prod-canning-cloves',
    name: 'Гвоздика (ціла)',
    category: 'Спеції',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Ламкість', 'Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Використовувати обережно (2-3 шт на банку), дуже сильна спеція.'],
    isBuiltIn: true,
  }
]
