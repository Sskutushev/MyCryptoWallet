export interface Token {
  symbol: string
  name: string
  balance: number
  usdValue: number
  change24h: number
  syncing?: boolean
  badge?: string
  icon: string
}

export interface UPARoute {
  fromToken: string
  toToken: string
  fromChain: string
  toChain: string
  estimatedGas: string
  estimatedTime: number // секунды
  ecoScore: number // 0-100
  steps: string[]
}

export interface LendingPosition {
  id: string
  collateralToken: string
  collateralAmount: number
  borrowedToken: string
  borrowedAmount: number
  ltv: number // Loan-to-Value %
  liquidationPrice: number
  apy: number
}

export interface CFAToken {
  symbol: string
  name: string
  type: 'stock' | 'bond' | 'fund'
  price: number
  change24h: number
  icon: string
}

export interface ChainConfig {
  id: number
  name: string
  shortName: string
  rpcUrl: string
  blockExplorer: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  icon: string
  isEVM: boolean
  isTestnet: boolean
}

export interface Mission {
  id: string
  title: string
  description: string
  progress: number
  total: number
  reward: string
  completed: boolean
  icon: string
}