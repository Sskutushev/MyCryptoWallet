import { useState } from 'react'
import { PageContainer } from '../components/layout/PageContainer'
import { MissionsCard } from '../components/bonuses/MissionsCard'
import { ReferralCard } from '../components/bonuses/ReferralCard'
import SpinWheel from '../components/bonuses/SpinWheel'
import { Trophy, Gift, Users } from 'lucide-react'

export const Bonuses = () => {
  const [activeTab, setActiveTab] = useState<'missions' | 'spin' | 'referrals'>('missions')

  const handleSpinComplete = (reward: { id: number, name: string, value: string, color: string, icon: string }) => {
    console.log('Spin result:', reward)
    // Здесь можно добавить логику для обновления баланса пользователя
  }

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-c-text-primary mb-1">
            🎁 Бонусы
          </h1>
          <p className="text-sm text-c-text-secondary">
            Выполняй задания и получай награды
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('missions')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors
              ${activeTab === 'missions'
                ? 'bg-c-primary text-white'
                : 'bg-c-bg-secondary text-c-text-secondary hover:bg-c-bg-tertiary'
              }
            `}
          >
            <Trophy className="w-4 h-4" />
            Миссии
          </button>
          
          <button
            onClick={() => setActiveTab('spin')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors
              ${activeTab === 'spin'
                ? 'bg-c-primary text-white'
                : 'bg-c-bg-secondary text-c-text-secondary hover:bg-c-bg-tertiary'
              }
            `}
          >
            <Gift className="w-4 h-4" />
            Daily Spin
          </button>
          
          <button
            onClick={() => setActiveTab('referrals')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors
              ${activeTab === 'referrals'
                ? 'bg-c-primary text-white'
                : 'bg-c-bg-secondary text-c-text-secondary hover:bg-c-bg-tertiary'
              }
            `}
          >
            <Users className="w-4 h-4" />
            Рефералы
          </button>
        </div>

        {/* Content */}
        {activeTab === 'missions' && <MissionsCard />}
        {activeTab === 'spin' && (
          <div className="py-6">
            <h2 className="text-xl font-bold text-c-text-primary mb-6 text-center">Ежедневный спин</h2>
            <SpinWheel onSpinComplete={handleSpinComplete} />
          </div>
        )}
        {activeTab === 'referrals' && <ReferralCard />}
      </div>
    </PageContainer>
  )
}