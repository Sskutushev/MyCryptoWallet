import { Card } from '../common/Card'
import { Button } from '../common/Button'
import { Copy, Share2, Users } from 'lucide-react'
import { referralCode, referralStats } from '../../mock/referrals'

export const ReferralCard = () => {
  const copyCode = () => {
    navigator.clipboard.writeText(referralCode)
    // TODO: Toast
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-c-text-primary">
        Реферальная программа
      </h3>

      {/* Реферальный код */}
      <Card padding="lg" className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-c-primary/10 mb-2">
          <Users className="w-8 h-8 text-c-primary" />
        </div>
        
        <div>
          <p className="text-sm text-c-text-secondary mb-2">
            Твой реферальный код
          </p>
          <div className="flex items-center justify-center gap-2 p-3 bg-c-bg-tertiary rounded-lg">
            <span className="font-mono font-bold text-c-text-primary">
              {referralCode}
            </span>
            <button
              onClick={copyCode}
              className="text-c-primary hover:text-c-primary-hover transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <Button variant="primary" fullWidth>
          <Share2 className="w-4 h-4 mr-2" />
          Поделиться кодом
        </Button>
      </Card>

      {/* Статистика */}
      <Card padding="md">
        <h4 className="font-semibold text-c-text-primary mb-3">
          Твоя статистика
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-c-bg-tertiary rounded-lg">
            <p className="text-xs text-c-text-tertiary mb-1">Приглашено</p>
            <p className="text-2xl font-bold text-c-text-primary">
              {referralStats.invited}
            </p>
          </div>
          
          <div className="p-3 bg-c-primary/10 rounded-lg">
            <p className="text-xs text-c-text-tertiary mb-1">Заработано</p>
            <p className="text-lg font-bold text-c-primary">
              {referralStats.earned.wltx} WLTX
            </p>
            <p className="text-xs text-c-text-secondary">
              {referralStats.earned.spins} спинов
            </p>
          </div>
        </div>
      </Card>

      {/* Условия */}
      <Card padding="md" className="bg-c-primary/5 border border-c-primary/20">
        <h4 className="font-semibold text-c-text-primary mb-2">
          За каждого друга:
        </h4>
        <ul className="space-y-1 text-sm text-c-text-secondary">
          <li>• 30 WLTX при регистрации</li>
          <li>• 2 бесплатных спина</li>
          <li>• 5% от его торговых комиссий</li>
        </ul>
      </Card>
    </div>
  )
}