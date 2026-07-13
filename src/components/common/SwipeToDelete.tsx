import { useState, useRef } from 'react'
import { Trash2 } from 'lucide-react'
import { useHaptic } from '../../hooks/useHaptic'

interface SwipeToDeleteProps {
  children: React.ReactNode
  onDelete: () => void
  confirmLabel?: string
}

export function SwipeToDelete({ children, onDelete, confirmLabel = 'Видалити' }: SwipeToDeleteProps) {
  const [translateX, setTranslateX] = useState(0)
  const [showConfirm, setShowConfirm] = useState(false)
  const startX = useRef(0)
  const currentX = useRef(0)
  const isDragging = useRef(false)
  const { medium, heavy } = useHaptic()

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    isDragging.current = true
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return
    currentX.current = e.touches[0].clientX
    const diff = currentX.current - startX.current
    if (diff < 0) {
      setTranslateX(Math.max(diff, -80))
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging.current) return
    isDragging.current = false
    if (translateX < -60) {
      setTranslateX(-80)
      setShowConfirm(true)
      medium()
    } else {
      setTranslateX(0)
    }
  }

  const handleConfirmDelete = () => {
    heavy()
    onDelete()
  }

  const handleCancel = () => {
    setTranslateX(0)
    setShowConfirm(false)
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className="absolute inset-0 flex items-center justify-end pr-4 bg-red-500"
        style={{ opacity: Math.min(Math.abs(translateX) / 80, 1) }}
      >
        {showConfirm ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleConfirmDelete}
              className="px-3 py-1.5 rounded-lg bg-white text-red-600 text-sm font-medium"
            >
              {confirmLabel}
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 rounded-lg bg-white/20 text-white text-sm"
            >
              Скасувати
            </button>
          </div>
        ) : (
          <Trash2 size={20} className="text-white" />
        )}
      </div>
      <div
        className="relative bg-white dark:bg-stone-800 transition-transform"
        style={{
          transform: `translateX(${translateX}px)`,
          transitionDuration: isDragging.current ? '0ms' : '200ms',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  )
}
