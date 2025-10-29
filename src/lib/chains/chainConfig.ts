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

export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
  x1: {
    id: 195,
    name: 'X1 EcoChain',
    shortName: 'X1',
    rpcUrl: 'https://rpc.x1-ecochain.network',
    blockExplorer: 'https://explorer.x1-ecochain.network',
    nativeCurrency: {
      name: 'XEC',
      symbol: 'XEC',
      decimals: 18
    },
    icon: '🌱',
    isEVM: true,
    isTestnet: false
  },
  eth: {
    id: 1,
    name: 'Ethereum',
    shortName: 'ETH',
    rpcUrl: `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_KEY}`,
    blockExplorer: 'https://etherscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    icon: '💎',
    isEVM: true,
    isTestnet: false
  },
  bsc: {
    id: 56,
    name: 'BNB Smart Chain',
    shortName: 'BSC',
    rpcUrl: 'https://bsc-dataseed.binance.org',
    blockExplorer: 'https://bscscan.com',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    icon: '🟡',
    isEVM: true,
    isTestnet: false
  },
  polygon: {
    id: 137,
    name: 'Polygon',
    shortName: 'MATIC',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    icon: '🟣',
    isEVM: true,
    isTestnet: false
  },
  arbitrum: {
    id: 42161,
    name: 'Arbitrum One',
    shortName: 'ARB',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    icon: '🔵',
    isEVM: true,
    isTestnet: false
  }
}

// Приоритет использования (X1 EcoChain всегда первый)
export const CHAIN_PRIORITY = ['x1', 'polygon', 'arbitrum', 'bsc', 'eth']