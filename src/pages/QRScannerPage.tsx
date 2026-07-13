import { useState, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ScanLine, Camera, CheckCircle2 } from 'lucide-react'
import { useQRScanner } from '../hooks/useQRScanner'
import { useHaptic } from '../hooks/useHaptic'

export function QRScannerPage() {
  const navigate = useNavigate()
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const { success } = useHaptic()

  const handleScan = useCallback((text: string) => {
    setResult(text)
    setScanning(false)
    success()

    if (text.includes('/app/cannings/')) {
      const match = text.match(/\/app\/cannings\/(.+)/)
      if (match) {
        setTimeout(() => navigate(`/app/cannings/${match[1]}`), 500)
      }
    }
  }, [navigate, success])

  const { videoRef, error, ready } = useQRScanner({ onScan: handleScan, active: scanning })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700">
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">QR сканер</h1>
      </div>

      <div className="card">
        {!scanning && !result && (
          <div className="text-center py-12">
            <ScanLine size={64} className="mx-auto text-stone-300 dark:text-stone-600 mb-4" />
            <p className="text-stone-500 dark:text-stone-400 mb-4">
              Наведіть камеру на QR-код етикетки, щоб швидко знайти закрутку
            </p>
            <button
              onClick={() => setScanning(true)}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Camera size={18} />
              Почати сканування
            </button>
          </div>
        )}

        {scanning && (
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden bg-black aspect-square max-w-sm mx-auto">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                muted
              />
              <div className="absolute inset-0 border-4 border-komora-500/50 rounded-xl pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-komora-400 rounded-lg" />
              {!ready && !error && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
                  Запуск камери...
                </div>
              )}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-sm p-4 text-center">
                  {error}
                </div>
              )}
            </div>
            <button
              onClick={() => setScanning(false)}
              className="btn-secondary w-full"
            >
              Скасувати
            </button>
          </div>
        )}

        {result && !scanning && (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 size={48} className="mx-auto text-green-500" />
            <div>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-1">Результат сканування:</p>
              <p className="font-mono text-sm bg-stone-100 dark:bg-stone-700 p-2 rounded-lg break-all">
                {result}
              </p>
            </div>
            {result.includes('/app/cannings/') ? (
              <p className="text-sm text-komora-600">Перенаправлення...</p>
            ) : (
              <div className="flex gap-2 justify-center">
                <button onClick={() => setScanning(true)} className="btn-secondary">
                  Сканувати знову
                </button>
                <Link to="/app" className="btn-primary">На головну</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
