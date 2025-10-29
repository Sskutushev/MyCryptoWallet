import { ethers } from 'ethers'

class WalletService {
  private wallet: ethers.Wallet | null = null
  private provider: ethers.JsonRpcProvider | null = null

  async createWallet(mnemonic?: string): Promise<{ address: string; mnemonic: string; privateKey: string }> {
    let newWallet: ethers.Wallet

    if (mnemonic) {
      // Создать кошелек из мнемоники
      newWallet = ethers.Wallet.fromPhrase(mnemonic)
    } else {
      // Создать новый кошелек
      newWallet = ethers.Wallet.createRandom()
    }

    this.wallet = newWallet

    return {
      address: newWallet.address,
      mnemonic: newWallet.mnemonic!.phrase,
      privateKey: newWallet.privateKey
    }
  }

  async connectToProvider(rpcUrl: string): Promise<void> {
    this.provider = new ethers.JsonRpcProvider(rpcUrl)
  }

  async getBalance(address?: string): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not connected')
    }

    const addr = address || this.wallet?.address
    if (!addr) {
      throw new Error('No address provided')
    }

    const balance = await this.provider.getBalance(addr)
    return ethers.formatEther(balance)
  }

  async signMessage(message: string): Promise<string> {
    if (!this.wallet) {
      throw new Error('Wallet not created')
    }

    return await this.wallet.signMessage(message)
  }

  async signTransaction(transaction: ethers.TransactionRequest): Promise<string> {
    if (!this.wallet) {
      throw new Error('Wallet not created')
    }

    const populatedTx = await this.wallet.populateTransaction(transaction)
    return await this.wallet.signTransaction(populatedTx)
  }

  getConnectedWallet(): { address: string } | null {
    if (!this.wallet) {
      return null
    }

    return {
      address: this.wallet.address
    }
  }

  async encryptWallet(password: string): Promise<string> {
    if (!this.wallet) {
      throw new Error('Wallet not created')
    }

    return await this.wallet.encrypt(password)
  }

  async decryptWallet(encryptedJson: string, password: string): Promise<void> {
    const wallet = await ethers.Wallet.fromEncryptedJson(encryptedJson, password)
    this.wallet = wallet
  }
}

export const walletService = new WalletService()