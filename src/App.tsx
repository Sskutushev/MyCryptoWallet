import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, Suspense, lazy } from 'react'
import { useTelegram } from './hooks/useTelegram'
import { useWallet } from './hooks/useWallet'
import './i18n/config'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { ToastProvider } from './components/common/Toast'

// Pages (Lazy Loaded)
const Balance = lazy(() => import('./pages/Balance').then(module => ({ default: module.Balance })))
const DeFi = lazy(() => import('./pages/DeFi').then(module => ({ default: module.DeFi })))
const Bonuses = lazy(() => import('./pages/Bonuses').then(module => ({ default: module.Bonuses })))
const Settings = lazy(() => import('./pages/Settings').then(module => ({ default: module.Settings })))
const Send = lazy(() => import('./pages/Send').then(module => ({ default: module.Send })))
const Receive = lazy(() => import('./pages/Receive').then(module => ({ default: module.Receive })))
const Swap = lazy(() => import('./pages/Swap').then(module => ({ default: module.Swap })))
const TokenDetail = lazy(() => import('./pages/TokenDetail').then(module => ({ default: module.TokenDetail })))
const OnboardingFlow = lazy(() => import('./pages/OnboardingFlow').then(module => ({ default: module.OnboardingFlow })))
const Lock = lazy(() => import('./pages/Lock').then(module => ({ default: module.Lock })))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-c-bg-primary">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-c-primary" />
  </div>
)

function App() {
  const { isReady } = useTelegram()
  const { hasWallet, isLocked, loadWallet } = useWallet()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    loadWallet()
  }, [loadWallet])

  if (!isReady) {
    return <Loading />
  }

  return (
    <ErrorBoundary>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <Routes>
                {!hasWallet ? (
                  <Route path="*" element={<OnboardingFlow />} />
                ) : isLocked ? (
                  <Route path="*" element={<Lock />} />
                ) : (
                  <>
                    <Route path="/" element={<Balance />} />
                    <Route path="/defi" element={<DeFi />} />
                    <Route path="/bonuses" element={<Bonuses />} />
                    <Route path="/settings/*" element={<Settings />} />
                    <Route path="/send" element={<Send />} />
                    <Route path="/receive" element={<Receive />} />
                    <Route path="/swap" element={<Swap />} />
                    <Route path="/token/:symbol" element={<TokenDetail />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </>
                )}
              </Routes>
            </Suspense>
          </BrowserRouter>
        </QueryClientProvider>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App