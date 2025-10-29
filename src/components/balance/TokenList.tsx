import { useState } from 'react'
import { Card } from '../common/Card'
import { ChevronDown, Settings as SettingsIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const TokenList = () => {
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState<'balance' | 'name' | 'change'>('balance')

  // TODO: Получить из walletStore
  const mockTokens = [
    { symbol: 'BNB', name: 'BNB', balance: 0, usdValue: 0, change24h: -1.66, icon: '🟡' },
    { symbol: 'TON', name: 'Toncoin', balance: 0, usdValue: 0, change24h: 0, syncing: true, icon: '💎' },
    { symbol: 'DEXNET', name: 'DexNet', balance: 0, usdValue: 0, change24h: -0.08, badge: 'BEP20', icon: '◈' },
    { symbol: 'DNC', name: 'Dexnet Coin', balance: 0, usdValue: 0, change24h: 0, icon: '◈' },
    { symbol: 'USDT', name: 'Tether', balance: 0, usdValue: 0, change24h: 0, badge: 'BEP20', icon: '₮' },
  ]

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {/* Сортировка */}}
          className="flex items-center gap-2 text-c-text-primary"
        >
          <span className="font-medium">Баланс</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => navigate('/manage-tokens')}
          className="text-c-text-secondary hover:text-c-text-primary transition-colors"
        >
          <SettingsIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Token List */}
      <div className="space-y-2">
        {mockTokens.map((token) => (
          <Card
            key={token.symbol}
            padding="md"
            hoverable
            onClick={() => navigate(`/token/${token.symbol}`)}
          >
            <div className="flex items-center justify-between">
              {/* Левая часть */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-c-bg-tertiary flex items-center justify-center text-xl">
                  {token.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-c-text-primary">
                      {token.symbol}
                    </span>
                    {token.badge && (
                      <span className="px-2 py-0.5 text-xs bg-c-bg-tertiary rounded text-c-text-tertiary">
                        {token.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-c-text-secondary">
                    {token.syncing ? 'Идет синхронизация...' : `${token.usdValue} $ ${token.change24h !== 0 ? `${token.change24h}%` : ''}`}
                  </p>
                </div>
              </div>

              {/* Правая часть */}
              <div className="text-right">
                <p className="font-medium text-c-text-primary">
                  {token.balance}
                </p>
                <p className="text-sm text-c-text-tertiary">
                  {token.usdValue} $
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}