import { Component, ReactNode } from 'react'
import { Button } from './Button'

interface Props {
  children: ReactNode
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

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught:', error, errorInfo)
    // TODO: Отправить на Sentry
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-c-bg-primary px-4">
          <div className="text-center space-y-4 max-w-md">
            <div className="text-6xl mb-4">😵</div>
            <h2 className="text-xl font-bold text-c-text-primary">
              Что-то пошло не так
            </h2>
            <p className="text-sm text-c-text-secondary">
              {this.state.error?.message || 'Произошла неожиданная ошибка'}
            </p>
            <Button
              variant="primary"
              onClick={() => window.location.reload()}
            >
              Перезагрузить приложение
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}