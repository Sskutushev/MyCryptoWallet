import { create } from 'zustand'
import { LendingPosition } from '../types'

interface DeFiStore {
  lendingPositions: LendingPosition[]
  availableCredit: number
  totalBorrowed: number
  addPosition: (position: LendingPosition) => void
  closePosition: (id: string) => void
}

export const useDeFiStore = create<DeFiStore>((set) => ({
  lendingPositions: [],
  availableCredit: 0,
  totalBorrowed: 0,
  addPosition: (position) => set((state) => ({
    lendingPositions: [...state.lendingPositions, position]
  })),
  closePosition: (id) => set((state) => ({
    lendingPositions: state.lendingPositions.filter(p => p.id !== id)
  })),
}))