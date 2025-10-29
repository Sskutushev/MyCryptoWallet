import { ethers } from 'ethers'

// X1 EcoChain RPC Configuration
const X1_CHAIN_CONFIG = {
  chainId: 195, // X1 EcoChain ID (example)
  name: 'X1 EcoChain',
  rpcUrl: 'https://rpc.x1-ecochain.network', // TODO: Заменить на реальный RPC
  blockExplorer: 'https://explorer.x1-ecochain.network',
  nativeCurrency: {
    name: 'XEC',
    symbol: 'XEC',
    decimals: 18
  }
}

class X1ChainProvider {
  private provider: ethers.JsonRpcProvider

  constructor() {
    this.provider = new ethers.JsonRpcProvider(X1_CHAIN_CONFIG.rpcUrl)
  }

  async getBalance(address: string): Promise<string> {
    const balance = await this.provider.getBalance(address)
    return ethers.formatEther(balance)
  }

  async getTokenBalance(tokenAddress: string, walletAddress: string): Promise<string> {
    const erc20Abi = [
      'function balanceOf(address owner) view returns (uint256)',
      'function decimals() view returns (uint8)'
    ]
    
    const contract = new ethers.Contract(tokenAddress, erc20Abi, this.provider)
    const balance = await contract.balanceOf(walletAddress)
    const decimals = await contract.decimals()
    
    return ethers.formatUnits(balance, decimals)
  }

  async sendTransaction(signedTx: string): Promise<ethers.TransactionResponse> {
    return await this.provider.broadcastTransaction(signedTx)
  }

  async getGasPrice(): Promise<string> {
    const feeData = await this.provider.getFeeData()
    return ethers.formatUnits(feeData.gasPrice || 0, 'gwei')
  }

  async getBlockNumber(): Promise<number> {
    return await this.provider.getBlockNumber()
  }

  async getTransactionReceipt(txHash: string) {
    return await this.provider.getTransactionReceipt(txHash)
  }

  async estimateGas(transaction: ethers.TransactionRequest): Promise<bigint> {
    return await this.provider.estimateGas(transaction)
  }
}

export const x1Provider = new X1ChainProvider()