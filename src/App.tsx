import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useTelegram } from './hooks/useTelegram'
import { useWallet } from './hooks/useWallet'
import './i18n/config'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { ToastProvider } from './components/common/Toast'

// Pages
import { Balance } from './pages/Balance'
import { DeFi } from './pages/DeFi'
import { Bonuses } from './pages/Bonuses'
import { Settings } from './pages/Settings'
import { Send } from './pages/Send'
import { Receive } from './pages/Receive'
import { Swap } from './pages/Swap'
import { TokenDetail } from './pages/TokenDetail'
import { OnboardingFlow } from './pages/OnboardingFlow'
import { Lock } from './pages/Lock'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  const { isReady, user } = useTelegram()
  const { address, isLocked } = useWallet()

  useEffect(() => {
    // Инициализация темы
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  // Telegram WebApp готовится
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-c-bg-primary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-c-primary mx-auto mb-4" />
          <p className="text-c-text-secondary">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              {/* Защищенные маршруты */}
              {!address ? (
                <Route path="*" element={<OnboardingFlow />} />
              ) : isLocked ? (
                <Route path="*" element={<Lock />} />
              ) : (
                <>
                  {/* Основные страницы */}
                  <Route path="/" element={<Balance />} />
                  <Route path="/defi" element={<DeFi />} />
                  <Route path="/bonuses" element={<Bonuses />} />
                  <Route path="/settings/*" element={<Settings />} />

                  {/* Функциональные страницы */}
                  <Route path="/send" element={<Send />} />
                  <Route path="/receive" element={<Receive />} />
                  <Route path="/swap" element={<Swap />} />
                  <Route path="/token/:symbol" element={<TokenDetail />} />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )}
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App