import { useState } from 'react'
import { useWallet } from '../hooks/useWallet'
import { Button } from '../components/common/Button'
import { biometricAuth } from '../lib/security/biometric'
import { Fingerprint } from 'lucide-react'

export const Lock = () => {
  const { unlock } = useWallet()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleUnlock = async () => {
    const success = await unlock(password)
    if (!success) {
      setError('Неверный пароль')
      setPassword('')
    }
  }

  const handleBiometric = async () => {
    const success = await biometricAuth.authenticate()
    if (success) {
      await unlock('') // Биометрия успешна
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-c-bg-primary px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Иконка */}
        <div className="w-20 h-20 rounded-full bg-c-bg-secondary flex items-center justify-center mx-auto">
          <span className="text-4xl">🔒</span>
        </div>

        {/* Заголовок */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-c-text-primary mb-2">
            Кошелек заблокирован
          </h2>
          <p className="text-sm text-c-text-secondary">
            Введите пароль для разблокировки
          </p>
        </div>

        {/* Пароль */}
        <div className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
            placeholder="Пароль"
            className="w-full px-4 py-3 bg-c-bg-secondary border border-c-border rounded-lg text-c-text-primary text-center"
          />

          {error && (
            <p className="text-sm text-c-danger text-center">
              {error}
            </p>
          )}

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleUnlock}
            disabled={!password}
          >
            Разблокировать
          </Button>
        </div>

        {/* Биометрия */}
        <button
          onClick={handleBiometric}
          className="w-full flex flex-col items-center gap-2 p-4 bg-c-bg-secondary rounded-lg hover:bg-c-bg-tertiary transition-colors"
        >
          <Fingerprint className="w-8 h-8 text-c-primary" />
          <span className="text-sm text-c-text-secondary">
            Использовать биометрию
          </span>
        </button>
      </div>
    </div>
  )
}