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
    const encryptedWallet = secureStorage.getItem('encryptedWallet')
    if (encryptedWallet) {
      const walletData = JSON.parse(encryptedWallet)
      set({
        hasWallet: true,
        address: walletData.address,
        encryptedWallet,
      })
    }
  },

  createWallet: async (password: string) => {
    secureStorage.initialize(password)
    const wallet = ethers.Wallet.createRandom() as ethers.HDNodeWallet
    const encryptedJson = await wallet.encrypt(password)
    
    secureStorage.setItem('encryptedWallet', encryptedJson)
    sessionWallet = wallet
    
    set({
      address: wallet.address,
      encryptedWallet: encryptedJson,
      isLocked: false,
      hasWallet: true,
    })
    
    return { address: wallet.address, mnemonic: wallet.mnemonic?.phrase || '' }
  },

  importWallet: async (mnemonic: string, password: string) => {
    try {
      secureStorage.initialize(password)
      const wallet = ethers.Wallet.fromPhrase(mnemonic) as ethers.HDNodeWallet
      const encryptedJson = await wallet.encrypt(password)
      
      secureStorage.setItem('encryptedWallet', encryptedJson)
      sessionWallet = wallet

      set({
        address: wallet.address,
        encryptedWallet: encryptedJson,
        isLocked: false,
        hasWallet: true,
      })
      return wallet.address
    } catch (error) {
      console.error('Invalid mnemonic:', error)
      throw new Error('Неверная seed-фраза')
    }
  },

  lock: () => {
    sessionWallet = null
    secureStorage.clear()
    set({ isLocked: true })
  },

  unlock: async (password: string) => {
    const { encryptedWallet } = get()
    if (!encryptedWallet) return false

    try {
      secureStorage.initialize(password)
      const wallet = await ethers.Wallet.fromEncryptedJson(encryptedWallet, password)
      sessionWallet = wallet
      set({ isLocked: false })
      return true
    } catch (error) {
      console.error('Failed to unlock wallet:', error)
      return false
    }
  },

  signTransaction: async (tx: ethers.TransactionRequest) => {
    if (!sessionWallet) {
      throw new Error('Wallet is locked or not initialized')
    }

    const populatedTx = await sessionWallet.populateTransaction(tx)
    const signedTx = await sessionWallet.signTransaction(populatedTx)
    
    return signedTx
  },

  getBalance: async () => {
    const { address } = get()
    if (!address) return

    try {
      const balance = await x1Provider.getBalance(address)
      set({ balance: ethers.formatEther(balance) })
    } catch (error) {
      console.error('Failed to get balance:', error)
    }
  },

  getTokens: async () => {
    // Mock data, as before
    set({
      tokens: [
        { symbol: 'XEC', balance: '0', name: 'X1 EcoChain Token' },
        { symbol: 'BNB', balance: '0', name: 'BNB' },
        { symbol: 'ETH', balance: '0', name: 'Ethereum' },
      ]
    })
  },

  disconnect: async () => {
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
  }
}))