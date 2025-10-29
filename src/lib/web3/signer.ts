import { ethers } from 'ethers'

class SignerService {
  private signer: ethers.JsonRpcSigner | null = null

  async initializeSigner(provider: ethers.JsonRpcProvider, address: string): Promise<void> {
    this.signer = new ethers.JsonRpcSigner(provider, address)
  }

  async signMessage(message: string): Promise<string> {
    if (!this.signer) {
      throw new Error('Signer not initialized')
    }

    return await this.signer.signMessage(message)
  }

  async signTransaction(transaction: ethers.TransactionRequest): Promise<string> {
    if (!this.signer) {
      throw new Error('Signer not initialized')
    }

    return await this.signer.signTransaction(transaction)
  }

  async sendTransaction(transaction: ethers.TransactionRequest): Promise<ethers.TransactionResponse> {
    if (!this.signer) {
      throw new Error('Signer not initialized')
    }

    return await this.signer.sendTransaction(transaction)
  }

  async getBalance(): Promise<bigint> {
    if (!this.signer) {
      throw new Error('Signer not initialized')
    }

    return await this.signer.getBalance()
  }

  async getAddress(): Promise<string> {
    if (!this.signer) {
      throw new Error('Signer not initialized')
    }

    return await this.signer.getAddress()
  }

  getSigner(): ethers.JsonRpcSigner | null {
    return this.signer
  }
}

export const signerService = new SignerService()