import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsStore {
  currency: 'USD' | 'EUR' | 'RUB'
  language: 'en' | 'ru'
  biometricEnabled: boolean
  notificationsEnabled: boolean
  autoLockTimeout: number // минуты
  setCurrency: (currency: 'USD' | 'EUR' | 'RUB') => void
  setLanguage: (language: 'en' | 'ru') => void
  toggleBiometric: () => void
  toggleNotifications: () => void
  setAutoLockTimeout: (timeout: number) => void
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      currency: 'USD',
      language: 'ru',
      biometricEnabled: false,
      notificationsEnabled: true,
      autoLockTimeout: 5,
      setCurrency: (currency) => set({ currency }),
      setLanguage: (language) => set({ language }),
      toggleBiometric: () => set((state) => ({ biometricEnabled: !state.biometricEnabled })),
      toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
      setAutoLockTimeout: (timeout) => set({ autoLockTimeout: timeout }),
    }),
    {
      name: 'dexsafe-settings',
    }
  )
)