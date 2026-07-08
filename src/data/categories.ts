import type { Category } from '../types'

export const builtInCategories: Category[] = [
  { id: 'cat-varenna', name: 'Варення', icon: '🍓', color: '#dc2626', isBuiltIn: true },
  { id: 'cat-kompot', name: 'Компоти', icon: '🍹', color: '#ea580c', isBuiltIn: true },
  { id: 'cat-solinnia', name: 'Соління', icon: '🥒', color: '#65a30d', isBuiltIn: true },
  { id: 'cat-marynady', name: 'Маринади', icon: '🫙', color: '#0d9488', isBuiltIn: true },
  { id: 'cat-salaty', name: 'Салати', icon: '🥗', color: '#059669', isBuiltIn: true },
  { id: 'cat-sousy', name: 'Соуси', icon: '🍅', color: '#b91c1c', isBuiltIn: true },
  { id: 'cat-adzhyka', name: 'Аджика/Лечо', icon: '🌶️', color: '#e11d48', isBuiltIn: true },
  { id: 'cat-ikra', name: 'Ікра овочева', icon: '🍆', color: '#7c3aed', isBuiltIn: true },
  { id: 'cat-sik', name: 'Соки', icon: '🧃', color: '#f59e0b', isBuiltIn: true },
  { id: 'cat-dzhemy', name: 'Джеми/Повидло', icon: '🫐', color: '#6d28d9', isBuiltIn: true },
  { id: 'cat-other', name: 'Інше', icon: '📦', color: '#6b7280', isBuiltIn: true },
]
