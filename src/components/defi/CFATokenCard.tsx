import { Card } from '../common/Card'
import { TrendingUp, ArrowUpRight } from 'lucide-react'
import { CFAToken } from '../../types'

export const CFATokenCard = ({ token }: { token: CFAToken }) => {
  return (
    <Card padding="md" hoverable>
      <div className="flex items-center justify-between">
        {/* Левая часть */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-c-bg-tertiary flex items-center justify-center">
            <span className="text-xl">{token.icon}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-c-text-primary">
                {token.symbol}
              </span>
              <span className="px-2 py-0.5 text-xs bg-c-primary/10 text-c-primary rounded">
                {token.type === 'stock' ? 'Stock' : token.type === 'bond' ? 'Bond' : 'Fund'}
              </span>
            </div>
            <p className="text-sm text-c-text-secondary">
              {token.name}
            </p>
          </div>
        </div>

        {/* Правая часть */}
        <div className="text-right">
          <p className="font-medium text-c-text-primary">
            ${token.price.toFixed(2)}
          </p>
          <p className={`text-sm flex items-center justify-end gap-1 ${
            token.change24h >= 0 ? 'text-c-success' : 'text-c-danger'
          }`}>
            <TrendingUp className="w-3 h-3" />
            {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
          </p>
        </div>
      </div>
    </Card>
  )
}