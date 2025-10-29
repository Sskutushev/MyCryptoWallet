import axios from 'axios'

// UPA Engine Sidecar Service
const UPA_API_URL = import.meta.env.VITE_UPA_ENGINE_URL || 'http://localhost:3001'

interface AddressAnalysisResult {
  type: 'EVM' | 'Non-EVM'
  preferredToken: string
  preferredChain: string
  confidence: number
}

interface RouteRecommendation {
  fromToken: string
  toToken: string
  fromChain: string
  toChain: string
  steps: string[]
  estimatedGas: string
  estimatedTime: number
  ecoScore: number
}

class UPAEngine {
  private api = axios.create({
    baseURL: UPA_API_URL,
    timeout: 10000,
  })

  async analyzeAddress(address: string): Promise<AddressAnalysisResult> {
    try {
      const response = await this.api.post('/analyze-address', { address })
      return response.data
    } catch (error) {
      console.error('UPA Address Analysis failed:', error)
      
      // Fallback: простая проверка
      return {
        type: address.startsWith('0x') ? 'EVM' : 'Non-EVM',
        preferredToken: 'USDT',
        preferredChain: 'X1 EcoChain',
        confidence: 0.5
      }
    }
  }

  async getOptimalRoute(params: {
    fromToken: string
    toToken: string
    fromChain: string
    toChain: string
    amount: string
  }): Promise<RouteRecommendation> {
    try {
      const response = await this.api.post('/optimal-route', params)
      return response.data
    } catch (error) {
      console.error('UPA Route calculation failed:', error)
      
      // Fallback маршрут через X1 EcoChain
      return {
        fromToken: params.fromToken,
        toToken: params.toToken,
        fromChain: params.fromChain,
        toChain: params.toChain,
        steps: [
          `Swap ${params.fromToken} to bridgeable token`,
          'Bridge via X1 EcoChain',
          `Swap to ${params.toToken}`
        ],
        estimatedGas: '0.002 ETH',
        estimatedTime: 30,
        ecoScore: 85
      }
    }
  }

  async estimateGasFee(params: {
    fromChain: string
    toChain: string
    complexity: 'simple' | 'swap' | 'bridge'
  }): Promise<string> {
    try {
      const response = await this.api.post('/estimate-gas', params)
      return response.data.estimatedGas
    } catch (error) {
      // Fallback estimates
      const estimates = {
        simple: '0.001',
        swap: '0.003',
        bridge: '0.005'
      }
      return `${estimates[params.complexity]} ETH`
    }
  }
}

export const upaEngine = new UPAEngine()