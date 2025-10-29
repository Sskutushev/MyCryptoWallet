import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../common/Button'
import { Card } from '../common/Card'
import { useToast } from '../common/Toast'

interface SpinReward {
  id: number
  name: string
  value: string
  color: string
  icon: string
}

interface SpinWheelProps {
  onSpinComplete: (reward: SpinReward) => void
}

export const SpinWheel = ({ onSpinComplete }: SpinWheelProps) => {
  const { showToast } = useToast()
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [selectedReward, setSelectedReward] = useState<SpinReward | null>(null)
  
  // Определим сегменты рулетки
  const rewards: SpinReward[] = [
    { id: 1, name: 'Бонус', value: '10 WLTX', color: '#00E0BE', icon: '💎' },
    { id: 2, name: 'Скидка', value: '5% на комиссии', color: '#10B981', icon: '💸' },
    { id: 3, name: 'Бонус', value: '25 WLTX', color: '#F59E0B', icon: '🎁' },
    { id: 4, name: 'Спин', value: 'Бесплатный спин', color: '#8B5CF6', icon: '🎰' },
    { id: 5, name: 'Бонус', value: '5 WLTX', color: '#EF4444', icon: '🪙' },
    { id: 6, name: 'Скидка', value: '10% на комиссии', color: '#3B82F6', icon: '🏷️' },
    { id: 7, name: 'Бонус', value: '15 WLTX', color: '#EC4899', icon: '🏆' },
    { id: 8, name: 'Джекпот', value: '50 WLTX', color: '#F97316', icon: '💰' },
  ]

  const spinWheel = () => {
    if (spinning) return
    
    setSpinning(true)
    setSelectedReward(null)
    
    // Рандомный выигрыш
    const randomRewardIndex = Math.floor(Math.random() * rewards.length)
    const reward = rewards[randomRewardIndex]
    
    // Рассчитываем полные обороты + угол для выигрыша
    const extraRotation = 360 * 5 // 5 дополнительных оборотов для драматического эффекта
    const segmentAngle = 360 / rewards.length
    const targetRotation = extraRotation + (360 - (randomRewardIndex * segmentAngle + segmentAngle / 2))
    
    const newRotation = rotation + targetRotation
    
    setRotation(newRotation)
    
    // Когда анимация завершится
    setTimeout(() => {
      setSpinning(false)
      setSelectedReward(reward)
      onSpinComplete(reward)
      showToast('success', `Вы выиграли: ${reward.value}!`)
    }, 5000) // Длительность анимации 5 секунд
  }

  return (
    <div className="flex flex-col items-center">
      {/* Рулетка */}
      <div className="relative w-64 h-64 mb-8">
        {/* Стрелка */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-c-danger"></div>
        </div>
        
        {/* Сама рулетка */}
        <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-c-border">
          <motion.div
            className="w-full h-full relative"
            animate={{ rotate: rotation }}
            transition={{
              duration: 5,
              ease: "easeOut"
            }}
          >
            {rewards.map((reward, index) => {
              const segmentAngle = 360 / rewards.length
              const rotation = index * segmentAngle
              
              return (
                <div
                  key={reward.id}
                  className="absolute w-full h-full"
                  style={{
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((rotation - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((rotation - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((rotation + segmentAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((rotation + segmentAngle - 90) * Math.PI / 180)}%)`,
                    transform: `rotate(${rotation}deg)`,
                    backgroundColor: reward.color,
                  }}
                >
                  <div 
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold"
                    style={{ 
                      transform: `translateX(-50%) rotate(${segmentAngle/2}deg)`,
                      width: '100%',
                      textAlign: 'center',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                    }}
                  >
                    {reward.icon}
                    <div className="text-[10px] mt-1">{reward.value}</div>
                  </div>
                </div>
              )
            })}
          </motion.div>
          
          {/* Центр рулетки */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-c-bg-primary rounded-full border-4 border-c-border z-10 flex items-center justify-center">
            <div className="w-8 h-8 bg-c-bg-secondary rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Кнопка спина */}
      <Button 
        variant="primary" 
        size="lg"
        disabled={spinning}
        onClick={spinWheel}
        className="w-48"
      >
        {spinning ? 'Крутится...' : 'Крутить рулетку!'}
      </Button>
      
      {/* Результат спина */}
      <AnimatePresence>
        {selectedReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-lg font-bold text-c-text-primary">
              Поздравляем! Вы выиграли:
            </p>
            <p className="text-2xl font-bold" style={{ color: selectedReward.color }}>
              {selectedReward.icon} {selectedReward.value}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SpinWheel