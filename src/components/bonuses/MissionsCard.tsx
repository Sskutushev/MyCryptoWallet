import { Card } from '../common/Card'
import { Button } from '../common/Button'
import { CheckCircle, Lock } from 'lucide-react'
import { Mission } from '../../types'

export const MissionsCard = () => {
  const missions: Mission[] = [
    {
      id: '1',
      title: 'DeFi-Старт',
      description: 'Совершите первый P2P-займ или купите ЦФА',
      progress: 0,
      total: 1,
      reward: '50 WLTX + NFT Badge',
      completed: false,
      icon: '🚀'
    },
    {
      id: '2',
      title: 'Eco-Master',
      description: 'Совершите 5 переводов через X1 EcoChain',
      progress: 2,
      total: 5,
      reward: '100 WLTX + DePIN Badge',
      completed: false,
      icon: '🌱'
    },
    {
      id: '3',
      title: 'Daily Warrior',
      description: 'Войди 7 дней подряд',
      progress: 7,
      total: 7,
      reward: 'Premium Spin × 3',
      completed: true,
      icon: '🔥'
    },
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-c-text-primary">
        Активные миссии
      </h3>

      {missions.map((mission) => (
        <Card key={mission.id} padding="md">
          <div className="flex items-start gap-3">
            {/* Иконка */}
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center text-2xl
              ${mission.completed ? 'bg-c-success/10' : 'bg-c-bg-tertiary'}
            `}>
              {mission.completed ? '✅' : mission.icon}
            </div>

            {/* Контент */}
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-c-text-primary">
                    {mission.title}
                  </h4>
                  <p className="text-sm text-c-text-secondary mt-1">
                    {mission.description}
                  </p>
                </div>
                {mission.completed && (
                  <CheckCircle className="w-5 h-5 text-c-success flex-shrink-0" />
                )}
              </div>

              {/* Прогресс бар */}
              {!mission.completed && (
                <div className="space-y-1">
                  <div className="h-2 bg-c-bg-tertiary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-c-primary rounded-full transition-all duration-300"
                      style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-c-text-tertiary">
                    {mission.progress}/{mission.total}
                  </p>
                </div>
              )}

              {/* Награда */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-c-text-tertiary">Награда:</span>
                  <span className="font-medium text-c-primary">
                    {mission.reward}
                  </span>
                </div>
                
                {mission.completed && (
                  <Button size="sm" variant="primary">
                    Забрать
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}