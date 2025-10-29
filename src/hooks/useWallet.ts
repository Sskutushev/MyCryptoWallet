import { create } from 'zustand'
import { ethers } from 'ethers'
import { x1Provider } from '../lib/api/x1chain'

interface WalletState {
  address: string | null
  privateKey: string | null
  mnemonic: string | null
  isLocked: boolean
  balance: string
  tokens: Array<{
    symbol: string
    balance: string
    name: string
  }>
  createWallet: () => Promise<void>
  importWallet: (mnemonic: string) => Promise<void>
  lock: () => void
  unlock: (password: string) => Promise<boolean>
  signTransaction: (tx: ethers.TransactionRequest) => Promise<string>
  getBalance: () => Promise<void>
  getTokens: () => Promise<void>
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

export const useWallet = create<WalletState>((set, get) => ({
  address: null,
  privateKey: null,
  mnemonic: null,
  isLocked: true,
  balance: '0',
  tokens: [],

  createWallet: async () => {
    // Генерация нового кошелька
    const wallet = ethers.Wallet.createRandom()
    
    // В реальном приложении нужно зашифровать privateKey и mnemonic с помощью пароля пользователя
    // Использовать ethers.Wallet.encrypt()
    
    set({
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic?.phrase,
      isLocked: false,
    })
  },

  importWallet: async (mnemonic: string) => {
    try {
      const wallet = ethers.Wallet.fromPhrase(mnemonic)
      
      set({
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic?.phrase,
        isLocked: false,
      })
    } catch (error) {
      console.error('Invalid mnemonic:', error)
      throw new Error('Неверная seed-фраза')
    }
  },

  lock: () => {
    set({ isLocked: true })
  },

  unlock: async (password: string) => {
    // В реальном приложении нужно расшифровать privateKey используя пароль
    // Использовать ethers.Wallet.decrypt()
    
    set({ isLocked: false })
    return true
  },

  signTransaction: async (tx: ethers.TransactionRequest) => {
    const { privateKey, isLocked } = get()
    
    if (isLocked || !privateKey) {
      throw new Error('Wallet is locked')
    }

    const wallet = new ethers.Wallet(privateKey)
    const populatedTx = await wallet.populateTransaction(tx)
    const signedTx = await wallet.signTransaction(populatedTx)
    
    return signedTx
  },

  getBalance: async () => {
    const { address } = get()
    if (!address) return

    try {
      const balance = await x1Provider.getBalance(address)
      set({ balance })
    } catch (error) {
      console.error('Failed to get balance:', error)
    }
  },

  getTokens: async () => {
    const { address } = get()
    if (!address) return

    // В реальном приложении здесь будет логика получения токенов
    // из разных блокчейнов и их балансов
    
    set({
      tokens: [
        { symbol: 'XEC', balance: '0', name: 'X1 EcoChain Token' },
        { symbol: 'BNB', balance: '0', name: 'BNB' },
        { symbol: 'ETH', balance: '0', name: 'Ethereum' },
      ]
    })
  },

  connect: async () => {
    // В реальном приложении здесь будет логика подключения
    // к различным провайдерам (MetaMask, WalletConnect и т.д.)
    console.log('Connecting wallet...')
  },

  disconnect: async () => {
    set({
      address: null,
      privateKey: null,
      mnemonic: null,
      isLocked: true,
      balance: '0',
      tokens: [],
    })
  }
}))