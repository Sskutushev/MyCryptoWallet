import { Card } from '../common/Card'
import { Button } from '../common/Button'
import { Leaf, Zap, CheckCircle } from 'lucide-react'

interface RouteRecommendationProps {
  route: {
    fromToken: string
    toToken: string
    fromChain: string
    toChain: string
    estimatedGas: string
    ecoScore: number
  }
  onAccept: () => void
  onReject: () => void
}

export const RouteRecommendation = ({ route, onAccept, onReject }: RouteRecommendationProps) => {
  return (
    <Card padding="lg" className="space-y-4">
      {/* Заголовок */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-c-primary/10 mb-3">
          <CheckCircle className="w-8 h-8 text-c-primary" />
        </div>
        <h3 className="text-xl font-bold text-c-text-primary mb-2">
          Рекомендуемый путь
        </h3>
        <p className="text-sm text-c-text-secondary">
          UPA Engine нашел оптимальный маршрут
        </p>
      </div>

      {/* Детали маршрута */}
      <div className="space-y-3 p-4 bg-c-bg-tertiary rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-c-text-secondary">Токен:</span>
          <span className="font-medium text-c-text-primary">
            {route.fromToken} → {route.toToken}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-c-text-secondary">Маршрут:</span>
          <span className="font-medium text-c-text-primary">
            {route.fromChain} → X1 EcoChain → {route.toChain}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-c-text-secondary flex items-center gap-2">
            <Zap className="w-4 h-4 text-c-warning" />
            Gas Fee:
          </span>
          <span className="font-medium text-c-text-primary">
            {route.estimatedGas}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-c-text-secondary flex items-center gap-2">
            <Leaf className="w-4 h-4 text-c-success" />
            Eco Score:
          </span>
          <span className="font-medium text-c-success">
            {route.ecoScore}/100
          </span>
        </div>
      </div>

      {/* Преимущества */}
      <div className="p-3 bg-c-primary/10 rounded-lg border border-c-primary/20">
        <p className="text-sm text-c-text-primary">
          ✨ <strong>Почему X1 EcoChain?</strong>
        </p>
        <ul className="mt-2 space-y-1 text-xs text-c-text-secondary">
          <li>• На 85% меньше выбросов CO₂</li>
          <li>• Комиссия в 10 раз ниже обычной</li>
          <li>• Моментальная финализация транзакций</li>
        </ul>
      </div>

      {/* Действия */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={onReject}>
          Другой путь
        </Button>
        <Button variant="primary" onClick={onAccept}>
          Принять
        </Button>
      </div>
    </Card>
  )
}