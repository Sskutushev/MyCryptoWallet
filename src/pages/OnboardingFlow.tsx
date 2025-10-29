import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { useWallet } from '../hooks/useWallet'
import { motion } from 'framer-motion'
import { Shield, Key, Leaf, Copy, Eye, EyeOff } from 'lucide-react'
import { useToast } from '../components/common/Toast'

export const OnboardingFlow = () => {
  const navigate = useNavigate()
  const { createWallet, importWallet } = useWallet()
  const { showToast } = useToast()
  const [step, setStep] = useState<'welcome' | 'create' | 'import' | 'backup'>('welcome')
  const [mnemonic, setMnemonic] = useState('')
  const [newMnemonic, setNewMnemonic] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isMnemonicVisible, setIsMnemonicVisible] = useState(false)

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(newMnemonic)
    showToast('success', 'Seed-фраза скопирована!')
  }

  // Welcome Screen
  if (step === 'welcome') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-c-bg-primary px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-md"
        >
          {/* Logo */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-c-primary to-c-primary-hover flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-12 h-12 text-white" />
          </div>

          {/* Заголовок */}
          <div>
            <h1 className="text-3xl font-bold text-c-text-primary mb-2">
              DexSafe Wallet Pro
            </h1>
            <p className="text-c-text-secondary">
              Экологичный DeFi кошелек на X1 EcoChain
            </p>
          </div>

          {/* Преимущества */}
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3 p-3 bg-c-bg-secondary rounded-lg">
              <Shield className="w-5 h-5 text-c-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-c-text-primary text-sm">
                  100% Некастодиальный
                </p>
                <p className="text-xs text-c-text-tertiary">
                  Только вы контролируете свои ключи
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-c-bg-secondary rounded-lg">
              <Leaf className="w-5 h-5 text-c-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-c-text-primary text-sm">
                  Экологичность
                </p>
                <p className="text-xs text-c-text-tertiary">
                  На 85% меньше выбросов CO₂
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-c-bg-secondary rounded-lg">
              <Key className="w-5 h-5 text-c-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-c-text-primary text-sm">
                  DeFi & ЦФА
                </p>
                <p className="text-xs text-c-text-tertiary">
                  Кредитование и токенизированные активы
                </p>
              </div>
            </div>
          </div>

          {/* Кнопки */}
          <div className="space-y-3 pt-4">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setStep('create')}
            >
              Создать новый кошелек
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={() => setStep('import')}
            >
              Импортировать кошелек
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Create Wallet
  if (step === 'create') {
    return (
      <div className="min-h-screen flex flex-col bg-c-bg-primary px-4 py-6">
        <div className="max-w-md mx-auto w-full space-y-6">
          <h2 className="text-2xl font-bold text-c-text-primary">
            Создать кошелек
          </h2>

          <div className="space-y-4">
            <Input
              type="password"
              label="Пароль"
              placeholder="Минимум 8 символов"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              type="password"
              label="Подтвердите пароль"
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="p-4 bg-c-warning/10 border border-c-warning/20 rounded-lg">
              <p className="text-sm text-c-text-primary">
                ⚠️ <strong>Важно:</strong> Сохраните пароль в надежном месте. 
                Без него вы не сможете восстановить доступ к кошельку.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={!password || password !== confirmPassword || password.length < 8}
              onClick={async () => {
                const { mnemonic } = await createWallet(password)
                setNewMnemonic(mnemonic)
                setStep('backup')
              }}
            >
              Продолжить
            </Button>

            <Button
              variant="ghost"
              size="lg"
              fullWidth
              onClick={() => setStep('welcome')}
            >
              Назад
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Import Wallet
  if (step === 'import') {
    return (
      <div className="min-h-screen flex flex-col bg-c-bg-primary px-4 py-6">
        <div className="max-w-md mx-auto w-full space-y-6">
          <h2 className="text-2xl font-bold text-c-text-primary">
            Импортировать кошелек
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-c-text-secondary mb-2">
                Seed-фраза (12 или 24 слова)
              </label>
              <textarea
                value={mnemonic}
                onChange={(e) => setMnemonic(e.target.value)}
                placeholder="word1 word2 word3 ..."
                className="w-full h-32 px-4 py-3 bg-c-bg-secondary border border-c-border rounded-lg text-c-text-primary resize-none"
              />
            </div>

            <Input
              type="password"
              label="Пароль для шифрования"
              placeholder="Минимум 8 символов"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={!mnemonic || !password || password.length < 8}
              onClick={async () => {
                try {
                  await importWallet(mnemonic, password)
                  navigate('/')
                } catch (error) {
                  showToast('error', 'Неверная seed-фраза')
                }
              }}
            >
              Импортировать
            </Button>

            <Button
              variant="ghost"
              size="lg"
              fullWidth
              onClick={() => setStep('welcome')}
            >
              Назад
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Backup Screen
  if (step === 'backup') {
    return (
      <div className="min-h-screen flex flex-col bg-c-bg-primary px-4 py-6">
        <div className="max-w-md mx-auto w-full space-y-6">
          <h2 className="text-2xl font-bold text-c-text-primary">
            🔑 Резервное копирование
          </h2>

          <div className="p-4 bg-c-danger/10 border border-c-danger/20 rounded-lg">
            <p className="text-sm text-c-danger font-medium mb-2">
              ⚠️ Критически важно!
            </p>
            <p className="text-sm text-c-text-secondary">
              Запишите эту seed-фразу на бумагу. Без нее вы не сможете восстановить 
              доступ к кошельку при потере устройства.
            </p>
          </div>

          {/* Seed phrase */}
          <div className="relative p-4 bg-c-bg-secondary rounded-lg">
            <div className={`grid grid-cols-3 gap-3 font-mono transition-opacity duration-300 ${isMnemonicVisible ? 'opacity-100' : 'opacity-20 blur-sm'}`}>
              {newMnemonic.split(' ').map((word, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-c-text-tertiary text-sm select-none">
                    {i + 1}.
                  </span>
                  <span className="text-c-text-primary">
                    {word}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute top-3 right-3 flex gap-2">
              <button onClick={handleCopyToClipboard} className="text-c-text-secondary hover:text-c-primary">
                <Copy className="w-5 h-5" />
              </button>
              <button onClick={() => setIsMnemonicVisible(!isMnemonicVisible)} className="text-c-text-secondary hover:text-c-primary">
                {isMnemonicVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => navigate('/')}
            >
              Я сохранил seed-фразу
            </Button>

            <p className="text-xs text-center text-c-text-tertiary">
              Вы сможете сделать резервную копию позже в настройках
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null
}