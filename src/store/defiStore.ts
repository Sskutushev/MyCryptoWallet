import { create } from 'zustand'
import { LendingPosition } from '../types'

interface DeFiStore {
  lendingPositions: LendingPosition[]
  availableCredit: number
  totalBorrowed: number
  addPosition: (position: LendingPosition) => void
  closePosition: (id: string) => void
}

const mockPositions: LendingPosition[] = [
  {
    id: '1',
    collateralToken: 'ETH',
    collateralAmount: 1.5,
    borrowedToken: 'USDT',
    borrowedAmount: 1500,
    ltv: 45.5,
    liquidationPrice: 2100,
    apy: 3.5,
  },
  {
    id: '2',
    collateralToken: 'WBTC',
    collateralAmount: 0.1,
    borrowedToken: 'USDC',
    borrowedAmount: 2500,
    ltv: 60.0,
    liquidationPrice: 45000,
    apy: 4.1,
  },
]

export const useDeFiStore = create<DeFiStore>((set) => ({
  lendingPositions: mockPositions,
  availableCredit: 12345.67,
  totalBorrowed: 4000.00,
  addPosition: (position) => set((state) => ({
    lendingPositions: [...state.lendingPositions, position]
  })),
  closePosition: (id) => set((state) => ({
    lendingPositions: state.lendingPositions.filter(p => p.id !== id)
  })),
}))