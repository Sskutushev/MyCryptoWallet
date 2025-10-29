import { create } from 'zustand'
import { UPARoute } from '../types'

interface UPAStore {
  currentRoute: UPARoute | null
  isAnalyzing: boolean
  setRoute: (route: UPARoute) => void
  resetRoute: () => void
}

export const useUPAStore = create<UPAStore>((set) => ({
  currentRoute: null,
  isAnalyzing: false,
  setRoute: (route) => set({ currentRoute: route, isAnalyzing: false }),
  resetRoute: () => set({ currentRoute: null, isAnalyzing: false }),
}))