import { Mission } from '../types'

export const missions: Mission[] = [
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
