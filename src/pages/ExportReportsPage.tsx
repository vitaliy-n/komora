import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Download, FileText, FileSpreadsheet, BarChart3 } from 'lucide-react'
import { db } from '../db/database'
import { Button } from '../components/ui/Button'
import { formatDate } from '../utils/date'
import jsPDF from 'jspdf'
import type { CanningEntry, InventoryItem } from '../types'

export function ExportReportsPage() {
  const cannings = useLiveQuery(() => db.canningEntries.toArray())
  const inventory = useLiveQuery(() => db.inventory.toArray())
  const [exporting, setExporting] = useState(false)

  const exportCanningsPDF = () => {
    setExporting(true)
    try {
      const doc = new jsPDF()
      doc.setFontSize(16)
      doc.text('Звіт по закрутках — Комора', 14, 20)
      doc.setFontSize(10)
      doc.text(`Дата: ${formatDate(new Date().toISOString())}`, 14, 28)

      let y = 40
      doc.setFontSize(9)
      doc.setFont('helvetica', 'bold')
      doc.text('Назва', 14, y)
      doc.text('Дата', 80, y)
      doc.text('Банки', 110, y)
      doc.text('Залишок', 130, y)
      doc.text('Локація', 155, y)
      y += 4
      doc.setDrawColor(200)
      doc.line(14, y, 196, y)
      y += 6
      doc.setFont('helvetica', 'normal')

      for (const c of cannings || []) {
        if (y > 280) {
          doc.addPage()
          y = 20
        }
        doc.text(c.name.slice(0, 35), 14, y)
        doc.text(formatDate(c.date), 80, y)
        doc.text(String(c.totalJars), 110, y)
        doc.text(String(c.totalJars - c.consumedJars), 130, y)
        doc.text(c.storageLocation, 155, y)
        y += 6
      }

      y += 10
      doc.setFont('helvetica', 'bold')
      doc.text(`Всього закруток: ${cannings?.length || 0}`, 14, y)
      y += 6
      const totalJars = (cannings || []).reduce((s, c) => s + c.totalJars - c.consumedJars, 0)
      doc.text(`Банок на полиці: ${totalJars}`, 14, y)

      doc.save(`komora-report-${new Date().toISOString().slice(0, 10)}.pdf`)
    } finally {
      setExporting(false)
    }
  }

  const exportCanningsCSV = () => {
    const headers = ['Назва', 'Категорія', 'Дата', 'Розмір банки', 'Всього банок', 'Вжито', 'Залишок', 'Локація', 'Термін придатності']
    const rows = (cannings || []).map((c: CanningEntry) => [
      c.name,
      c.categoryId,
      c.date,
      String(c.jarSize),
      String(c.totalJars),
      String(c.consumedJars),
      String(c.totalJars - c.consumedJars),
      c.storageLocation,
      c.expiryDate || '',
    ])
    const csv = [headers, ...rows].map((r) => r.map((cell) => `"${cell}"`).join(',')).join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `komora-cannings-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportInventoryCSV = () => {
    const headers = ['Назва', 'Кількість', 'Одиниця', 'Ціна', 'Дата закупівлі', 'Зберігання', 'Термін придатності']
    const rows = (inventory || []).map((i: InventoryItem) => [
      i.name,
      String(i.quantity),
      i.unit,
      String(i.price || ''),
      i.purchaseDate,
      i.storageMethod,
      i.expiryDate || '',
    ])
    const csv = [headers, ...rows].map((r) => r.map((cell) => `"${cell}"`).join(',')).join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `komora-inventory-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <BarChart3 size={28} className="text-komora-600" />
        <h1 className="page-title">Експорт звітів</h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="card space-y-3">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-red-500" />
            <h2 className="font-semibold dark:text-stone-200">Закрутки — PDF</h2>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Повний звіт по всіх закрутках з кількістю банок та залишком
          </p>
          <Button onClick={exportCanningsPDF} disabled={exporting} className="w-full">
            <Download size={18} className="mr-2" />
            Завантажити PDF
          </Button>
        </div>

        <div className="card space-y-3">
          <div className="flex items-center gap-2">
            <FileSpreadsheet size={20} className="text-green-500" />
            <h2 className="font-semibold dark:text-stone-200">Закрутки — CSV</h2>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Табличний формат для Excel/Google Sheets
          </p>
          <Button onClick={exportCanningsCSV} variant="secondary" className="w-full">
            <Download size={18} className="mr-2" />
            Завантажити CSV
          </Button>
        </div>

        <div className="card space-y-3">
          <div className="flex items-center gap-2">
            <FileSpreadsheet size={20} className="text-blue-500" />
            <h2 className="font-semibold dark:text-stone-200">Запаси — CSV</h2>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Інвентар продуктів з цінами та термінами
          </p>
          <Button onClick={exportInventoryCSV} variant="secondary" className="w-full">
            <Download size={18} className="mr-2" />
            Завантажити CSV
          </Button>
        </div>
      </div>
    </div>
  )
}
