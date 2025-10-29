import { PageContainer } from '../components/layout/PageContainer'
import { LendingCard } from '../components/defi/LendingCard'
import { CFATokenCard } from '../components/defi/CFATokenCard'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { ArrowRight, Info } from 'lucide-react'
import { useDeFiStore } from '../store/defiStore'

import { cfaTokens } from '../mock/cfa'

export const DeFi = () => {
  const { lendingPositions } = useDeFiStore()

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

        {/* Мои позиции */}
        {lendingPositions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-c-text-primary">Мои позиции</h3>
            {lendingPositions.map((pos) => (
              <Card key={pos.id} padding="md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-c-text-secondary">Залог: <span className="font-medium text-c-text-primary">{pos.collateralAmount} {pos.collateralToken}</span></p>
                    <p className="text-sm text-c-text-secondary">Заём: <span className="font-medium text-c-text-primary">{pos.borrowedAmount} {pos.borrowedToken}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-c-success">APY {pos.apy}%</p>
                    <p className="text-xs text-c-text-tertiary">LTV {pos.ltv.toFixed(1)}%</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

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