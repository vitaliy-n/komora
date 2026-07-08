import { useState } from 'react'
import { Download, Upload, Trash2, Bell } from 'lucide-react'
import { useNotifications } from '../hooks/useNotifications'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { db } from '../db/database'

export function SettingsPage() {
  const { requestPermission } = useNotifications()
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [notifStatus, setNotifStatus] = useState<string>('')
  const [exportStatus, setExportStatus] = useState('')

  const handleEnableNotifications = async () => {
    const granted = await requestPermission()
    setNotifStatus(granted ? 'Нотифікації увімкнено!' : 'Нотифікації відхилено браузером')
    setTimeout(() => setNotifStatus(''), 3000)
  }

  const handleExport = async () => {
    const data = {
      canningEntries: await db.canningEntries.toArray(),
      recipes: await db.recipes.where('isBuiltIn').equals(0).toArray(),
      inventory: await db.inventory.toArray(),
      categories: await db.categories.where('isBuiltIn').equals(0).toArray(),
      exportDate: new Date().toISOString(),
      version: 1,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `komora-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    setExportStatus('Експорт завершено!')
    setTimeout(() => setExportStatus(''), 3000)
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    try {
      const data = JSON.parse(text)
      if (data.canningEntries) await db.canningEntries.bulkPut(data.canningEntries)
      if (data.recipes) await db.recipes.bulkPut(data.recipes)
      if (data.inventory) await db.inventory.bulkPut(data.inventory)
      if (data.categories) await db.categories.bulkPut(data.categories)
      setExportStatus('Імпорт завершено! Оновіть сторінку.')
      setTimeout(() => setExportStatus(''), 5000)
    } catch {
      setExportStatus('Помилка імпорту: невірний формат файлу')
      setTimeout(() => setExportStatus(''), 5000)
    }
  }

  const handleClearData = async () => {
    await db.canningEntries.clear()
    await db.recipes.where('isBuiltIn').equals(0).delete()
    await db.inventory.clear()
    await db.categories.where('isBuiltIn').equals(0).delete()
    setShowClearConfirm(false)
    window.location.reload()
  }

  return (
    <div className="space-y-4">
      <h1 className="page-title">Налаштування</h1>

      <div className="card space-y-4">
        <h2 className="font-semibold">Нотифікації</h2>
        <p className="text-sm text-stone-500">
          Увімкніть нотифікації, щоб отримувати нагадування про терміни придатності закруток та продуктів.
        </p>
        <Button variant="secondary" onClick={handleEnableNotifications} className="flex items-center gap-2">
          <Bell size={18} />
          Увімкнути нотифікації
        </Button>
        {notifStatus && <p className="text-sm text-komora-600">{notifStatus}</p>}
      </div>

      <div className="card space-y-4">
        <h2 className="font-semibold">Дані</h2>
        <p className="text-sm text-stone-500">
          Всі ваші дані зберігаються локально на пристрої. Регулярно робіть резервну копію.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={handleExport} className="flex items-center gap-2">
            <Download size={18} />
            Експорт (JSON)
          </Button>
          <label className="btn-secondary flex items-center gap-2 cursor-pointer">
            <Upload size={18} />
            Імпорт
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
        {exportStatus && <p className="text-sm text-komora-600">{exportStatus}</p>}
      </div>

      <div className="card space-y-4 border-red-200">
        <h2 className="font-semibold text-red-700">Небезпечна зона</h2>
        <p className="text-sm text-stone-500">
          Видалення даних — незворотна дія. Вбудовані рецепти, продукти та категорії залишаться.
        </p>
        <Button variant="danger" onClick={() => setShowClearConfirm(true)} className="flex items-center gap-2">
          <Trash2 size={18} />
          Очистити дані
        </Button>
      </div>

      <div className="card">
        <h2 className="font-semibold mb-2">Про додаток</h2>
        <div className="text-sm text-stone-500 space-y-1">
          <p>🫙 <strong>Комора</strong> — додаток для домашніх закруток та зберігання продуктів</p>
          <p>Версія 1.0.0</p>
          <p>Працює повністю офлайн • PWA • Дані зберігаються на пристрої</p>
        </div>
      </div>

      <Modal isOpen={showClearConfirm} onClose={() => setShowClearConfirm(false)} title="Очистити всі дані?">
        <p className="text-stone-600 mb-4">
          Будуть видалені всі ваші закрутки, записи інвентарю та користувацькі рецепти. Цю дію не можна скасувати. Рекомендуємо спочатку зробити експорт.
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setShowClearConfirm(false)} className="flex-1">Скасувати</Button>
          <Button variant="danger" onClick={handleClearData} className="flex-1">Видалити все</Button>
        </div>
      </Modal>
    </div>
  )
}
