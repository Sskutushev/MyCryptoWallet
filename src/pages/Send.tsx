import { useState } from 'react'
import { PageContainer } from '../components/layout/PageContainer'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { ArrowLeft, ScanLine } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AddressAnalyzer } from '../components/upa/AddressAnalyzer'
import { RouteRecommendation } from '../components/upa/RouteRecommendation'
import { useUPAStore } from '../store/upaStore'
import { Token } from '../types'

export const Send = () => {
  const navigate = useNavigate()
  const { currentRoute, setRoute } = useUPAStore()
  
  const [step, setStep] = useState<'input' | 'analyzing' | 'recommendation' | 'confirm'>('input')
  const [selectedToken, setSelectedToken] = useState('BNB')
  const [recipientAddress, setRecipientAddress] = useState('')
  const [amount, setAmount] = useState('')

  // Токены из кошелька
  const mockTokens: Token[] = [
    { symbol: 'BNB', name: 'BNB', balance: 0, usdValue: 0, change24h: 0, icon: '🟡' },
    { symbol: 'DEXNET', name: 'DexNet', balance: 0, usdValue: 0, change24h: 0, icon: '◈' },
    { symbol: 'USDT', name: 'Tether', balance: 0, usdValue: 0, change24h: 0, badge: 'BEP20', icon: '₮' },
  ]

  const handleAddressInput = (address: string) => {
    setRecipientAddress(address)
    
    // Если адрес валиден - запускаем UPA анализ
    if (address.length >= 42) {
      setStep('analyzing')
    }
  }

  const handleAnalysisComplete = (result: any) => {
    // Получили результат анализа от UPA Engine
    const mockRoute = {
      fromToken: selectedToken,
      toToken: result.preferredToken,
      fromChain: 'BSC',
      toChain: result.preferredChain,
      estimatedGas: '0.0012 BNB',
      ecoScore: 92,
      estimatedTime: 15,
      steps: ['Swap на X1 DEX', 'Bridge через X1 EcoChain', 'Transfer']
    }
    
    setRoute(mockRoute)
    setStep('recommendation')
  }

  const handleAcceptRoute = () => {
    setStep('confirm')
  }

  const handleRejectRoute = () => {
    // Показать альтернативные маршруты
    setStep('input')
  }

  // Шаг 1: Ввод данных
  if (step === 'input') {
    return (
      <PageContainer showBottomNav={false}>
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-c-bg-secondary"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-c-bg-secondary flex items-center justify-center">
                <span className="text-xl">🟡</span>
              </div>
              <h1 className="text-xl font-bold">Отправить {selectedToken}</h1>
            </div>
          </div>

          <div className="space-y-4">
            {/* Доступный баланс */}
            <div className="flex items-center justify-between p-4 bg-c-bg-secondary rounded-lg">
              <span className="text-c-text-secondary">Доступный баланс</span>
              <span className="font-medium text-c-text-primary">
                {mockTokens.find(t => t.symbol === selectedToken)?.balance || 0} {selectedToken}
              </span>
            </div>

            {/* Сумма */}
            <div>
              <Input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-2xl font-bold text-center"
              />
              <p className="text-center text-sm text-c-text-tertiary mt-2">
                Нет данных
              </p>
            </div>

            {/* Адрес получателя */}
            <div>
              <label className="block text-sm text-c-text-secondary mb-2">
                Адрес или домен
              </label>
              <div className="relative">
                <Input
                  placeholder="0x... или domain.eth"
                  value={recipientAddress}
                  onChange={(e) => handleAddressInput(e.target.value)}
                  className="pr-24"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-c-bg-tertiary hover:bg-c-bg-secondary transition-colors">
                    <ScanLine className="w-5 h-5 text-c-text-secondary" />
                  </button>
                  <button className="px-3 py-2 bg-c-bg-tertiary hover:bg-c-bg-secondary rounded-lg text-sm font-medium text-c-text-primary transition-colors">
                    Вставить
                  </button>
                </div>
              </div>
            </div>

            {/* Кнопка */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={!amount || !recipientAddress}
              onClick={() => recipientAddress.length >= 42 ? setStep('analyzing') : undefined}
            >
              Далее
            </Button>
          </div>
        </div>
      </PageContainer>
    )
  }

  // Шаг 2: Анализ адреса (UPA)
  if (step === 'analyzing') {
    return (
      <PageContainer showBottomNav={false}>
        <div className="container mx-auto px-4 py-6">
          <AddressAnalyzer
            address={recipientAddress}
            onAnalysisComplete={handleAnalysisComplete}
          />
        </div>
      </PageContainer>
    )
  }

  // Шаг 3: Рекомендация маршрута (UPA)
  if (step === 'recommendation' && currentRoute) {
    return (
      <PageContainer showBottomNav={false}>
        <div className="container mx-auto px-4 py-6">
          <RouteRecommendation
            route={currentRoute}
            onAccept={handleAcceptRoute}
            onReject={handleRejectRoute}
          />
        </div>
      </PageContainer>
    )
  }

  // Шаг 4: Подтверждение
  if (step === 'confirm') {
    return (
      <PageContainer showBottomNav={false}>
        <div className="container mx-auto px-4 py-6">
          <Card padding="lg" className="space-y-4">
            <h2 className="text-xl font-bold text-center text-c-text-primary">
              Подтверждение
            </h2>

            {/* Детали транзакции */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-c-text-secondary">Отправляете:</span>
                <span className="font-medium text-c-text-primary">
                  {amount} {selectedToken}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-c-text-secondary">Получит:</span>
                <span className="font-medium text-c-text-primary">
                  {amount} {currentRoute?.toToken}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-c-text-secondary">Адресат:</span>
                <span className="font-mono text-xs text-c-text-primary">
                  {recipientAddress.slice(0, 6)}...{recipientAddress.slice(-4)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-c-text-secondary">Комиссия:</span>
                <span className="font-medium text-c-text-primary">
                  {currentRoute?.estimatedGas}
                </span>
              </div>

              <div className="pt-3 border-t border-c-border flex justify-between">
                <span className="font-medium text-c-text-primary">Итого:</span>
                <span className="font-bold text-c-text-primary">
                  {amount} {selectedToken}
                </span>
              </div>
            </div>

            {/* Кнопки */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep('input')}>
                Отмена
              </Button>
              <Button variant="primary">
                Подтвердить
              </Button>
            </div>
          </Card>
        </div>
      </PageContainer>
    )
  }

  return null
}