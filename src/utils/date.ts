export function formatDate(date: string): string {
  const d = new Date(date)
  return d.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatDateShort(date: string): string {
  const d = new Date(date)
  return d.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: '2-digit' })
}

export function daysUntil(date: string): number {
  const target = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

export function daysAgo(date: string): number {
  return -daysUntil(date)
}

export function isExpiringSoon(date: string, thresholdDays = 30): boolean {
  const days = daysUntil(date)
  return days >= 0 && days <= thresholdDays
}

export function isExpired(date: string): boolean {
  return daysUntil(date) < 0
}

export function getExpiryStatus(date: string): 'ok' | 'warning' | 'danger' | 'expired' {
  const days = daysUntil(date)
  if (days < 0) return 'expired'
  if (days <= 7) return 'danger'
  if (days <= 30) return 'warning'
  return 'ok'
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9)
}

export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function getMonthName(month: number): string {
  const months = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень',
  ]
  return months[month - 1] || ''
}

export function getCurrentMonth(): number {
  return new Date().getMonth() + 1
}

export function getSeasonLabel(months: number[]): string {
  if (months.length === 12) return 'Цілий рік'
  const names = months.map(getMonthName)
  if (names.length <= 3) return names.join(', ')
  return `${names[0]} — ${names[names.length - 1]}`
}
