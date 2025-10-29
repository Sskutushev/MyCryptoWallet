import { useState } from 'react'
import { PageContainer } from '../components/layout/PageContainer'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { ArrowLeft, Copy, Share2, Edit3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import QRCode from 'qrcode.react'

export const Receive = () => {
  const navigate = useNavigate()
  const [selectedToken, setSelectedToken] = useState('BNB')
  const [selectedNetwork, setSelectedNetwork] = useState('BSC')
  
  // TODO: Получить реальный адрес из walletStore
  const walletAddress = '0x91A2d5821b2849A7DE11052f269da5b41ce5dba4'

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    // TODO: Показать toast "Скопировано!"
  }

  const shareAddress = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Мой адрес кошелька',
        text: walletAddress,
      })
    }
  }

  return (
    <PageContainer showBottomNav={false}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-c-primary"
          >
            Отменить
          </button>
          <h1 className="text-xl font-bold">Получить {selectedToken}</h1>
          <div className="w-20" /> {/* Spacer для центрирования */}
        </div>

        {/* Предупреждение */}
        <div className="mb-6 p-4 bg-c-primary/10 border border-c-primary/20 rounded-lg">
          <p className="text-sm text-c-text-primary">
            Только совместимые с сетью токены. Другие будут потеряны.
          </p>
        </div>

        {/* QR код */}
        <Card padding="lg" className="space-y-6">
          {/* QR */}
          <div className="flex justify-center">
            <div className="p-4 bg-white rounded-2xl">
              <QRCode
                value={walletAddress}
                size={240}
                level="H"
                includeMargin={false}
              />
            </div>
          </div>

          {/* Адрес */}
          <div className="text-center space-y-2">
            <p className="font-mono text-sm text-c-text-primary break-all px-4">
              {walletAddress}
            </p>
            <p className="text-xs text-c-text-secondary">
              Сеть: {selectedNetwork === 'BSC' ? 'BNB Smart Chain' : selectedNetwork}
            </p>
          </div>

          {/* Действия */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => {/* Установить сумму */}}
              className="flex flex-col items-center gap-2 p-3 bg-c-bg-tertiary rounded-lg hover:bg-c-bg-secondary transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-c-bg-secondary flex items-center justify-center">
                <Edit3 className="w-5 h-5 text-c-text-secondary" />
              </div>
              <span className="text-xs text-c-text-secondary">
                Установить<br />сумму
              </span>
            </button>

            <button
              onClick={copyAddress}
              className="flex flex-col items-center gap-2 p-3 bg-c-bg-tertiary rounded-lg hover:bg-c-bg-secondary transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-c-bg-secondary flex items-center justify-center">
                <Copy className="w-5 h-5 text-c-text-secondary" />
              </div>
              <span className="text-xs text-c-text-secondary">
                Копировать
              </span>
            </button>

            <button
              onClick={shareAddress}
              className="flex flex-col items-center gap-2 p-3 bg-c-bg-tertiary rounded-lg hover:bg-c-bg-secondary transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-c-bg-secondary flex items-center justify-center">
                <Share2 className="w-5 h-5 text-c-text-secondary" />
              </div>
              <span className="text-xs text-c-text-secondary">
                Поделиться
              </span>
            </button>
          </div>
        </Card>
      </div>
    </PageContainer>
  )
}