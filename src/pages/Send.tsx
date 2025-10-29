import { useState, useEffect } from 'react'
import { PageContainer } from '../components/layout/PageContainer'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { ArrowLeft, ScanLine } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '../hooks/useWallet'
import { useToast } from '../components/common/Toast'
import { ethers } from 'ethers'
import { x1Provider } from '../lib/api/x1chain'
import { useUPAStore } from '../store/upaStore'
import { upaEngine } from '../lib/api/upaEngine'
import { AddressAnalyzer } from '../components/upa/AddressAnalyzer'
import { RouteRecommendation } from '../components/upa/RouteRecommendation'

export const Send = () => {
  const navigate = useNavigate()
  const { tokens, signTransaction } = useWallet()
  const { showToast } = useToast()
  const { currentRoute, setRoute, resetRoute } = useUPAStore()

  const [step, setStep] = useState<'input' | 'analyzing' | 'recommendation' | 'confirm'>('input')
  const [selectedToken] = useState('XEC')
  const [recipientAddress, setRecipientAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [gasEstimate, setGasEstimate] = useState('0')

  const availableBalance = tokens.find(t => t.symbol === selectedToken)?.balance || '0'

  useEffect(() => {
    const estimateGas = async () => {
      if (step === 'confirm' && recipientAddress && amount) {
        try {
          const gas = await x1Provider.estimateGas({
            to: recipientAddress,
            value: ethers.parseEther(amount)
          })
          const gasPrice = await x1Provider.getGasPrice()
          const totalGas = parseFloat(ethers.formatUnits(gas, 'gwei')) * parseFloat(gasPrice)
          setGasEstimate(totalGas.toFixed(8))
        } catch (e) {
          console.error('Failed to estimate gas:', e)
          setGasEstimate('N/A')
        }
      }
    }
    estimateGas()
  }, [step, recipientAddress, amount])

  const handleAddressInput = (address: string) => {
    setRecipientAddress(address)
    if (ethers.isAddress(address)) {
      setStep('analyzing')
    }
  }

  const handleAnalysisComplete = async (analysisResult: any) => {
    showToast('info', 'Ищем оптимальный маршрут...')
    const route = await upaEngine.getOptimalRoute({
      fromToken: selectedToken,
      toToken: analysisResult.preferredToken,
      fromChain: 'X1', // Assuming we are on X1
      toChain: analysisResult.preferredChain,
      amount,
    })
    setRoute(route)
    setStep('recommendation')
  }

  const handleAcceptRoute = () => {
    setStep('confirm')
  }

  const handleRejectRoute = () => {
    resetRoute()
    setStep('input')
  }

  const handleSend = async () => {
    setLoading(true)
    showToast('info', 'Подписание транзакции...')

    try {
      const tx: ethers.TransactionRequest = {
        to: recipientAddress,
        value: ethers.parseEther(amount),
      }

      const signedTx = await signTransaction(tx)
      showToast('info', 'Отправка транзакции в сеть...')

      const txResponse = await x1Provider.sendTransaction(signedTx)
      await txResponse.wait()

      showToast('success', 'Транзакция успешно отправлена!')
      navigate('/')

    } catch (error) {
      console.error('Failed to send transaction:', error)
      showToast('error', 'Ошибка при отправке транзакции')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'input') {
    return (
      <PageContainer showBottomNav={false}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-c-bg-secondary">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-c-bg-secondary flex items-center justify-center"><span className="text-xl">💰</span></div>
              <h1 className="text-xl font-bold">Отправить {selectedToken}</h1>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-c-bg-secondary rounded-lg">
              <span className="text-c-text-secondary">Доступный баланс</span>
              <span className="font-medium text-c-text-primary">{parseFloat(availableBalance).toFixed(4)} {selectedToken}</span>
            </div>
            <div>
              <Input type="number" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} className="text-2xl font-bold text-center" />
            </div>
            <div>
              <label className="block text-sm text-c-text-secondary mb-2">Адрес получателя</label>
              <div className="relative">
                <Input placeholder="0x..." value={recipientAddress} onChange={(e) => handleAddressInput(e.target.value)} className="pr-12" />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-c-bg-tertiary transition-colors"><ScanLine className="w-5 h-5 text-c-text-secondary" /></button>
                </div>
              </div>
            </div>
            <Button variant="primary" size="lg" fullWidth disabled={!amount || !recipientAddress} onClick={() => handleAddressInput(recipientAddress)}>
              Далее
            </Button>
          </div>
        </div>
      </PageContainer>
    )
  }

  if (step === 'analyzing') {
    return (
      <PageContainer showBottomNav={false}>
        <div className="container mx-auto px-4 py-6">
          <AddressAnalyzer address={recipientAddress} onAnalysisComplete={handleAnalysisComplete} />
        </div>
      </PageContainer>
    )
  }

  if (step === 'recommendation' && currentRoute) {
    return (
      <PageContainer showBottomNav={false}>
        <div className="container mx-auto px-4 py-6">
          <RouteRecommendation route={currentRoute} onAccept={handleAcceptRoute} onReject={handleRejectRoute} />
        </div>
      </PageContainer>
    )
  }

  if (step === 'confirm') {
    return (
      <PageContainer showBottomNav={false}>
        <div className="container mx-auto px-4 py-6">
          <Card padding="lg" className="space-y-4">
            <h2 className="text-xl font-bold text-center text-c-text-primary">Подтверждение</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-c-text-secondary">Отправляете:</span>
                <span className="font-medium text-c-text-primary">{amount} {currentRoute?.fromToken}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-c-text-secondary">Получатель получит:</span>
                <span className="font-medium text-c-text-primary">~{amount} {currentRoute?.toToken}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-c-text-secondary">Адресат:</span>
                <span className="font-mono text-xs text-c-text-primary truncate">{recipientAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-c-text-secondary">Комиссия сети:</span>
                <span className="font-medium text-c-text-primary">~{gasEstimate} XEC</span>
              </div>
              <div className="pt-3 border-t border-c-border flex justify-between">
                <span className="font-medium text-c-text-primary">Итого:</span>
                <span className="font-bold text-c-text-primary">{amount} {currentRoute?.fromToken}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep('input')} disabled={loading}>Отмена</Button>
              <Button variant="primary" onClick={handleSend} loading={loading} disabled={loading}>Подтвердить</Button>
            </div>
          </Card>
        </div>
      </PageContainer>
    )
  }

  return null
}