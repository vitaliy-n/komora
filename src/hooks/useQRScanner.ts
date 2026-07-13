import { useEffect, useRef, useState, useCallback } from 'react'
import jsQR from 'jsqr'

interface QRScannerOptions {
  onScan: (text: string) => void
  active: boolean
}

export function useQRScanner({ onScan, active }: QRScannerOptions) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  const detectQR = useCallback(async (video: HTMLVideoElement) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const checkFrame = () => {
      if (!video.videoWidth || !video.videoHeight) {
        rafRef.current = requestAnimationFrame(checkFrame)
        return
      }

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      })

      if (code) {
        onScan(code.data)
        return
      }

      rafRef.current = requestAnimationFrame(checkFrame)
    }

    checkFrame()
  }, [onScan])

  useEffect(() => {
    if (!active) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop())
        streamRef.current = null
      }
      cancelAnimationFrame(rafRef.current)
      setReady(false)
      return
    }

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        })
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
          setReady(true)
          detectQR(videoRef.current)
        }
      } catch {
        setError('Не вдалося отримати доступ до камери')
      }
    }

    startCamera()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop())
        streamRef.current = null
      }
      cancelAnimationFrame(rafRef.current)
    }
  }, [active, detectQR])

  return { videoRef, error, ready }
}
