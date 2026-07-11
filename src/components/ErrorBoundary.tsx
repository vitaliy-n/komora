import { Component, type ReactNode } from 'react'

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
          <div className="max-w-sm text-center">
            <div className="text-5xl mb-4">🫙</div>
            <h1 className="text-xl font-bold text-stone-800 mb-2">Щось пішло не так</h1>
            <p className="text-sm text-stone-500 mb-4">
              {this.state.error?.message || 'Сталася помилка. Спробуйте перезавантажити сторінку.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-xl bg-komora-600 text-white font-medium hover:bg-komora-700 transition-colors"
            >
              Перезавантажити
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
