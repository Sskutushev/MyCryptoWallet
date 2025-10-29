import { PageContainer } from '../components/layout/PageContainer'
import { LendingCard } from '../components/defi/LendingCard'
import { CFATokenCard } from '../components/defi/CFATokenCard'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { ArrowRight, Info } from 'lucide-react'
import { CFAToken } from '../types'

export const DeFi = () => {
  // Mock ЦФА токены
  const cfaTokens: CFAToken[] = [
    { symbol: 'YNDX', name: 'Яндекс', type: 'stock', price: 2450.50, change24h: 2.3, icon: '🔴' },
    { symbol: 'AAPL', name: 'Apple Inc', type: 'stock', price: 178.45, change24h: 1.2, icon: '🍎' },
    { symbol: 'TSLA', name: 'Tesla', type: 'stock', price: 245.67, change24h: -0.8, icon: '🚗' },
  ]

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Заголовок */}
        <div>
          <h1 className="text-2xl font-bold text-c-text-primary mb-1">
            DeFi Hub
          </h1>
          <p className="text-sm text-c-text-secondary">
            Кредитование и токенизированные активы
          </p>
        </div>

        {/* Кредитование */}
        <LendingCard />

        {/* Разделитель */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-c-border" />
          <span className="text-xs text-c-text-tertiary">ТОКЕНИЗИРОВАННЫЕ АКТИВЫ</span>
          <div className="flex-1 h-px bg-c-border" />
        </div>

        {/* Информация о ЦФА */}
        <Card padding="md" className="flex items-start gap-3">
          <Info className="w-5 h-5 text-c-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-c-text-secondary">
            <strong className="text-c-text-primary">Торгуйте акциями через X1 DEX</strong>
            <p className="mt-1">
              Токенизированные активы обеспечены реальными акциями 1:1. 
              Все операции некастодиальны и происходят on-chain.
            </p>
          </div>
        </Card>

        {/* Список ЦФА токенов */}
        <div className="space-y-2">
          {cfaTokens.map((token) => (
            <CFATokenCard key={token.symbol} token={token} />
          ))}
        </div>

        {/* Показать все */}
        <Button variant="outline" fullWidth>
          Показать все активы
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        {/* Предупреждение */}
        <Card padding="md" className="bg-c-warning/10 border border-c-warning/20">
          <p className="text-xs text-c-text-secondary">
            ⚠️ <strong>Важно:</strong> Торговля ЦФА требует прохождения KYC. 
            Это законодательное требование для токенизированных ценных бумаг.
          </p>
        </Card>
      </div>
    </PageContainer>
  )
}