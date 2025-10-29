import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { SUPPORTED_CHAINS, ChainConfig } from '../lib/chains/chainConfig'

export const useMultiChain = () => {
  const [selectedChain, setSelectedChain] = useState<string>('x1')
  const [providers, setProviders] = useState<Record<string, ethers.JsonRpcProvider>>({})

  useEffect(() => {
    // Инициализация провайдеров для всех сетей
    const newProviders: Record<string, ethers.JsonRpcProvider> = {}
    
    Object.entries(SUPPORTED_CHAINS).forEach(([key, config]) => {
      newProviders[key] = new ethers.JsonRpcProvider(config.rpcUrl)
    })
    
    setProviders(newProviders)
  }, [])

  const getProvider = (chainKey: string): ethers.JsonRpcProvider | null => {
    return providers[chainKey] || null
  }

  const getChainConfig = (chainKey: string): ChainConfig | null => {
    return SUPPORTED_CHAINS[chainKey] || null
  }

  const switchChain = (chainKey: string) => {
    if (SUPPORTED_CHAINS[chainKey]) {
      setSelectedChain(chainKey)
    }
  }

  return {
    selectedChain,
    chains: SUPPORTED_CHAINS,
    getProvider,
    getChainConfig,
    switchChain,
  }
}