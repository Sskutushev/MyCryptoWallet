import { useState } from 'react'
import { Card } from '../common/Card'
import { ChevronDown, Settings as SettingsIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '../../hooks/useWallet'
import { TokenCardSkeleton } from '../common/Skeleton'

interface TokenListProps {
  loading: boolean
}

export const TokenList = ({ loading }: TokenListProps) => {
  const navigate = useNavigate()
  const { tokens } = useWallet()

  // TODO: Implement sorting logic

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
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <TokenCardSkeleton key={i} />)
        ) : (
          tokens.map((token) => (
            <Card
              key={token.symbol}
              padding="md"
              hoverable
              onClick={() => navigate(`/token/${token.symbol}`)}
            >
              <div className="flex items-center justify-between">
                {/* Левая часть */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-c-bg-tertiary flex items-center justify-center text-xl font-bold text-c-text-primary">
                    {token.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-c-text-primary">
                        {token.symbol}
                      </span>
                      {/* {token.badge && ( ... )} */}
                    </div>
                    <p className="text-sm text-c-text-secondary">
                      {token.name}
                    </p>
                  </div>
                </div>

                {/* Правая часть */}
                <div className="text-right">
                  <p className="font-medium text-c-text-primary">
                    {parseFloat(token.balance).toFixed(4)}
                  </p>
                  <p className="text-sm text-c-text-tertiary">
                    {/* {token.usdValue} $ */}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}