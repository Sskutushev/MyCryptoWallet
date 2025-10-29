import { create } from 'zustand'
import { ethers } from 'ethers'
import { x1Provider } from '../lib/api/x1chain'
import { secureStorage } from '../lib/security/secureStorage'

// Этот кошелек будет храниться только в оперативной памяти
let sessionWallet: ethers.Signer | null = null

interface WalletState {
  address: string | null
  encryptedWallet: string | null
  isLocked: boolean
  hasWallet: boolean
  balance: string
  tokens: Array<{
    symbol: string
    balance: string
    name: string
  }>
  createWallet: (password: string) => Promise<{ address: string; mnemonic: string }>,
  importWallet: (mnemonic: string, password: string) => Promise<string>,
  lock: () => void,
  unlock: (password: string) => Promise<boolean>,
  signTransaction: (tx: ethers.TransactionRequest) => Promise<string>,
  getBalance: () => Promise<void>,
  getTokens: () => Promise<void>,
  disconnect: () => Promise<void>,
  loadWallet: () => void,
}

export const useWallet = create<WalletState>((set, get) => ({
  address: null,
  encryptedWallet: null,
  isLocked: true,
  hasWallet: false,
  balance: '0',
  tokens: [],

  loadWallet: () => {
    console.log('useWallet: loadWallet called')
    const encryptedWallet = secureStorage.getItem('encryptedWallet')
    console.log('useWallet: encryptedWallet from secureStorage =', encryptedWallet ? 'exists' : 'null')
    if (typeof encryptedWallet === 'string') {
      try {
        const walletData = JSON.parse(encryptedWallet)
        if (typeof walletData === 'object' && walletData !== null && 'address' in walletData && typeof walletData.address === 'string') {
          console.log('useWallet: Wallet data parsed and valid')
          set({
            hasWallet: true,
            address: walletData.address,
            encryptedWallet,
          })
        }
      } catch (e) {
        console.error('useWallet: Failed to parse encrypted wallet data:', e)
        secureStorage.removeItem('encryptedWallet') // Clear corrupted data
      }
    }
    console.log('useWallet: loadWallet finished')
  },

  createWallet: async (password: string) => {
    console.log('useWallet: createWallet called')
    secureStorage.initialize(password)
    const wallet = ethers.Wallet.createRandom()
    const encryptedJson = await wallet.encrypt(password)
    
    secureStorage.setItem('encryptedWallet', encryptedJson)
    sessionWallet = wallet
    
    set({
      address: wallet.address,
      encryptedWallet: encryptedJson,
      isLocked: false,
      hasWallet: true,
    })
    
    console.log('useWallet: createWallet finished')
    return { address: wallet.address, mnemonic: (wallet as any).mnemonic?.phrase || '' }
  },

  importWallet: async (mnemonic: string, password: string) => {
    console.log('useWallet: importWallet called')
    try {
      secureStorage.initialize(password)
      const wallet = ethers.Wallet.fromPhrase(mnemonic)
      const encryptedJson = await wallet.encrypt(password)
      
      secureStorage.setItem('encryptedWallet', encryptedJson)
      sessionWallet = wallet

      set({
        address: wallet.address,
        encryptedWallet: encryptedJson,
        isLocked: false,
        hasWallet: true,
      })
      console.log('useWallet: importWallet finished')
      return wallet.address
    } catch (error) {
      console.error('useWallet: Invalid mnemonic:', error)
      throw new Error('Неверная seed-фраза')
    }
  },

  lock: () => {
    console.log('useWallet: lock called')
    sessionWallet = null
    secureStorage.clear()
    set({ isLocked: true })
    console.log('useWallet: lock finished')
  },

  unlock: async (password: string) => {
    console.log('useWallet: unlock called')
    const { encryptedWallet } = get()
    if (!encryptedWallet) {
      console.log('useWallet: No encrypted wallet found to unlock')
      return false
    }

    try {
      secureStorage.initialize(password)
      const wallet = await ethers.Wallet.fromEncryptedJson(encryptedWallet, password)
      sessionWallet = wallet
      set({ isLocked: false })
      console.log('useWallet: Wallet unlocked successfully')
      return true
    } catch (error) {
      console.error('useWallet: Failed to unlock wallet:', error)
      return false
    }
  },

  signTransaction: async (tx: ethers.TransactionRequest) => {
    console.log('useWallet: signTransaction called')
    if (!sessionWallet) {
      throw new Error('Wallet is locked or not initialized')
    }

    const populatedTx = await sessionWallet.populateTransaction(tx)
    const signedTx = await sessionWallet.signTransaction(populatedTx)
    
    console.log('useWallet: signTransaction finished')
    return signedTx
  },

  getBalance: async () => {
    console.log('useWallet: getBalance called')
    const { address } = get()
    if (!address) return

    try {
      const balance = await x1Provider.getBalance(address)
      set({ balance: ethers.formatEther(balance) })
      console.log('useWallet: getBalance finished')
    } catch (error) {
      console.error('useWallet: Failed to get balance:', error)
    }
  },

  getTokens: async () => {
    console.log('useWallet: getTokens called')
    // Mock data, as before
    set({
      tokens: [
        { symbol: 'XEC', balance: '0', name: 'X1 EcoChain Token' },
        { symbol: 'BNB', balance: '0', name: 'BNB' },
        { symbol: 'ETH', balance: '0', name: 'Ethereum' },
      ]
    })
    console.log('useWallet: getTokens finished')
  },

  disconnect: async () => {
    console.log('useWallet: disconnect called')
    secureStorage.removeItem('encryptedWallet')
    sessionWallet = null
    set({
      address: null,
      encryptedWallet: null,
      isLocked: true,
      hasWallet: false,
      balance: '0',
      tokens: [],
    })
    console.log('useWallet: disconnect finished')
  }
}))