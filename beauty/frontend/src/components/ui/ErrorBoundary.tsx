import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-luxury-black px-6">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6 text-rose-400">✦</div>
            <h1 className="font-serif text-3xl text-luxury-pearl mb-4">
              Something went wrong
            </h1>
            <p className="text-luxury-silver/60 mb-8 font-light">
              An unexpected error occurred. Please refresh the page to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 
                         rounded-full hover:bg-rose-500/20 transition-colors duration-300 
                         font-medium tracking-wide"
            >
              Reload Page
            </button>
            {import.meta.env.DEV && this.state.error && (
              <pre className="mt-8 text-xs text-left text-rose-400/50 max-h-32 overflow-auto">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
