import { Card } from '../common/Card'
import { Button } from '../common/Button'
import { TrendingUp, Shield } from 'lucide-react'

export const LendingCard = () => {
  // TODO: Получить из defiStore
  const availableCredit = 0
  const activeLoan = null

  return (
    <Card padding="lg" className="space-y-4">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-c-text-primary flex items-center gap-2">
          <Shield className="w-5 h-5 text-c-primary" />
          DeFi Кредитование
        </h3>
        <span className="text-xs text-c-text-tertiary">
          Powered by X1 EcoChain
        </span>
      </div>

      {/* Доступный лимит */}
      <div className="p-4 bg-c-bg-tertiary rounded-lg">
        <p className="text-sm text-c-text-secondary mb-1">
          Доступный лимит
        </p>
        <h2 className="text-3xl font-bold text-c-text-primary">
          ${availableCredit.toLocaleString()}
        </h2>
        <p className="text-xs text-c-text-tertiary mt-1">
          Под залог ваших активов
        </p>
      </div>

      {/* Преимущества */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-c-primary/10 rounded-lg">
          <p className="text-xs text-c-text-tertiary">APY от</p>
          <p className="text-lg font-bold text-c-primary">3.5%</p>
        </div>
        <div className="p-3 bg-c-success/10 rounded-lg">
          <p className="text-xs text-c-text-tertiary">Без KYC</p>
          <p className="text-lg font-bold text-c-success">100%</p>
        </div>
      </div>

      {/* Действия */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" fullWidth>
          <TrendingUp className="w-4 h-4 mr-2" />
          Разместить
        </Button>
        <Button variant="primary" fullWidth>
          Получить займ
        </Button>
      </div>

      {/* Подсказка */}
      <p className="text-xs text-c-text-tertiary text-center">
        💡 LTV до 75% • Ликвидация от 85%
      </p>
    </Card>
  )
}