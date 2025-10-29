import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface AddressAnalyzerProps {
  address: string
  onAnalysisComplete: (result: any) => void
}

export const AddressAnalyzer = ({ address, onAnalysisComplete }: AddressAnalyzerProps) => {
  const [analyzing, setAnalyzing] = useState(true)

  useEffect(() => {
    const analyzeAddress = async () => {
      // TODO: Вызов UPA Engine API
      // Определяет: EVM/Non-EVM, предпочтительный токен/сеть
      
      setTimeout(() => {
        const mockResult = {
          type: 'EVM',
          preferredToken: 'WBTC',
          preferredChain: 'Polygon',
          confidence: 0.95
        }
        
        onAnalysisComplete(mockResult)
        setAnalyzing(false)
      }, 1500)
    }

    analyzeAddress()
  }, [address])

  if (analyzing) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <Loader2 className="w-12 h-12 text-c-primary animate-spin" />
        <p className="text-c-text-secondary">Анализируем адрес...</p>
        <p className="text-xs text-c-text-tertiary">UPA Engine определяет оптимальный путь</p>
      </div>
    )
  }

  return null
}