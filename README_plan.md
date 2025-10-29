🎯 DEXSAFE WALLET PRO - ФИНАЛЬНЫЙ ПЛАН РАЗРАБОТКИ
📋 EXECUTIVE SUMMARY
Проект: DexSafe Wallet Pro (Telegram Mini App → Browser Extension → Mobile)
Основа: Существующий DexSafe UI (темная тема, бирюзовый акцент #00E0BE)
Блокчейн: X1 EcoChain (приоритет) + Multi-chain (EVM)
Архитектура: Adaptive Modular Backend (АМБ) с Sidecar UPA Engine
Технологический стек: React 19, TypeScript 5, Vite 5, Tailwind CSS 3.4.0

🎨 ДИЗАЙН-СИСТЕМА (НА ОСНОВЕ СУЩЕСТВУЮЩИХ СКРИНОВ)
Цветовая палитра (Dark Theme)
css/* Основные цвета из DexSafe */
:root[data-theme="dark"] {
  /* Backgrounds */
  --c-bg-primary: #12141A;      /* Основной фон (скрин 2, 7, 8) */
  --c-bg-secondary: #1A1D25;    /* Фон карточек (скрин 2: токены) */
  --c-bg-tertiary: #2A2D35;     /* Hover states, modal backgrounds */
  
  /* Text */
  --c-text-primary: #E5E7EB;    /* Основной текст (скрин 2: "Wallet 1", "BNB") */
  --c-text-secondary: #9CA3AF;  /* Вторичный текст (скрин 2: "1 136 $", "Идет синхронизация") */
  --c-text-tertiary: #6B7280;   /* Подписи (скрин 2: "0 $") */
  
  /* Brand (неоновый бирюзовый) */
  --c-primary: #00E0BE;         /* Акцент (скрин 2: иконки в header, "Баланс" tab, кнопка "Далее") */
  --c-primary-hover: #00C4A7;   /* Hover состояние */
  --c-primary-dim: rgba(0, 224, 190, 0.1); /* Фон для subtle highlights */
  
  /* Status */
  --c-success: #10B981;         /* Положительные изменения (скрин 8: "+0,002745 BNB") */
  --c-danger: #EF4444;          /* Отрицательные изменения (скрин 8: "-0,001488 BNB") */
  --c-warning: #F59E0B;         /* Предупреждения */
  
  /* Borders */
  --c-border: #2A2D35;          /* Границы карточек (скрин 2: разделители между токенами) */
  --c-border-hover: #3A3D45;
  
  /* Radii */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;            /* Скрин 2: карточки токенов */
  --radius-2xl: 24px;           /* Скрин 10: QR-код контейнер */
}
```

### Компонентная база (из существующих скринов)

| Компонент | Характеристики | Где использовать |
|-----------|----------------|------------------|
| **Header** | Sticky top, 60px высота, темный фон (#12141A) | Все страницы |
| **Token Card** | Rounded 16px, padding 16px, hover effect | Список активов, ЦФА |
| **Action Button** | Circular (72px), icon + label, темный фон | Quick actions (Отправить, Получить, Обмен) |
| **Bottom Nav** | Sticky bottom, 3 tabs, активный - бирюзовый (#00E0BE) | Главная навигация |
| **Input Field** | Rounded 12px, темный фон (#1A1D25), border на focus | Формы отправки, адреса |
| **Modal** | Full-screen overlay, rounded top 24px, slide-up animation | Выбор токенов, настройки |
| **Toggle** | iOS-style, бирюзовый активный (#00E0BE) | Скрин 6: управление токенами |

---

## 📱 СТРУКТУРА ПРИЛОЖЕНИЯ (ОБНОВЛЕННАЯ)

### Навигация (Bottom Nav - 4 вкладки)
```
┌─────────────────────────────────────────┐
│  [💰 Баланс] [💱 DeFi] [🎁 Бонусы] [⚙️ Настройки] │
└─────────────────────────────────────────┘
Изменения относительно оригинала:

Удалена вкладка "Транзакции" (теперь доступ через иконку в Header)
Добавлена вкладка "DeFi" (кредитование + ЦФА)
"Настройки" стала отдельной вкладкой (не через профиль)


🚀 ЭТАП 1: ПОДГОТОВКА И ОСНОВА (День 1-2)
Шаг 1.1: Инициализация проекта
bash# Создать проект
npm create vite@latest dexsafe-wallet-pro -- --template react-ts
cd dexsafe-wallet-pro

# Установить зависимости
npm install

# Tailwind CSS 3.4.0 (КРИТИЧНО!)
npm install -D tailwindcss@3.4.0 postcss autoprefixer
npx tailwindcss init -p

# Core dependencies
npm install zustand @tanstack/react-query axios date-fns
npm install framer-motion @twa-dev/sdk
npm install react-router-dom
npm install lucide-react

# Web3 (некастодиальность)
npm install ethers@6 @wagmi/core viem
npm install @tanstack/react-query

# Charts & QR
npm install lightweight-charts recharts
npm install qrcode.react
Шаг 1.2: Настройка Tailwind (DexSafe Theme)
tailwind.config.js:
javascript/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'c-bg-primary': 'var(--c-bg-primary)',
        'c-bg-secondary': 'var(--c-bg-secondary)',
        'c-bg-tertiary': 'var(--c-bg-tertiary)',
        'c-text-primary': 'var(--c-text-primary)',
        'c-text-secondary': 'var(--c-text-secondary)',
        'c-text-tertiary': 'var(--c-text-tertiary)',
        'c-primary': 'var(--c-primary)',
        'c-primary-hover': 'var(--c-primary-hover)',
        'c-success': 'var(--c-success)',
        'c-danger': 'var(--c-danger)',
        'c-border': 'var(--c-border)',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
      },
    },
  },
  plugins: [],
}
src/index.css:
css@tailwind base;
@tailwind components;
@tailwind utilities;

:root[data-theme="dark"] {
  --c-bg-primary: #12141A;
  --c-bg-secondary: #1A1D25;
  --c-bg-tertiary: #2A2D35;
  --c-text-primary: #E5E7EB;
  --c-text-secondary: #9CA3AF;
  --c-text-tertiary: #6B7280;
  --c-primary: #00E0BE;
  --c-primary-hover: #00C4A7;
  --c-success: #10B981;
  --c-danger: #EF4444;
  --c-border: #2A2D35;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, sans-serif;
  background-color: var(--c-bg-primary);
  color: var(--c-text-primary);
  -webkit-font-smoothing: antialiased;
}

/* Кастомный scrollbar (как в DexSafe) */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--c-bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--c-border);
  border-radius: 3px;
}
```

### Шаг 1.3: Структура папок
```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx          # Кнопки (Primary, Secondary, Outline)
│   │   ├── Input.tsx           # Поля ввода
│   │   ├── Card.tsx            # Карточки
│   │   ├── Modal.tsx           # Модальные окна
│   │   ├── Toggle.tsx          # iOS-style toggle (скрин 6)
│   │   └── Badge.tsx           # Badges (BEP20, Stock, etc)
│   ├── layout/
│   │   ├── Header.tsx          # Sticky header
│   │   ├── BottomNav.tsx       # 4-tab навигация
│   │   └── PageContainer.tsx   # Layout wrapper
│   ├── balance/
│   │   ├── BalanceCard.tsx     # Основной баланс (скрин 2)
│   │   ├── ActionButtons.tsx   # Отправить/Получить/Обмен
│   │   └── TokenList.tsx       # Список токенов
│   ├── defi/
│   │   ├── LendingCard.tsx     # Кредитование UI
│   │   ├── CFATokenCard.tsx    # Токенизированные активы
│   │   └── LTVIndicator.tsx    # LTV progress bar
│   ├── upa/
│   │   ├── AddressAnalyzer.tsx # UPA: анализ адреса
│   │   ├── RouteRecommendation.tsx # UPA: рекомендация маршрута
│   │   └── GasAbstraction.tsx  # Gas fee display
│   └── charts/
│       └── TokenChart.tsx      # Lightweight-charts интеграция
├── pages/
│   ├── Balance.tsx             # Главная (скрин 2, 7)
│   ├── DeFi.tsx                # Новая вкладка (Lending + ЦФА)
│   ├── Bonuses.tsx             # Геймификация
│   ├── Settings.tsx            # Настройки
│   ├── Send.tsx                # UPA Flow (скрин 9)
│   ├── Receive.tsx             # QR + адрес (скрин 10)
│   ├── TokenDetail.tsx         # Детали токена (скрин 8)
│   └── Swap.tsx                # Обмен
├── hooks/
│   ├── useWallet.ts            # Web3 wallet hook
│   ├── useUPA.ts               # UPA Engine integration
│   ├── useX1Chain.ts           # X1 EcoChain RPC
│   └── useTelegram.ts          # Telegram WebApp SDK
├── store/
│   ├── walletStore.ts          # Zustand: balance, tokens
│   ├── upaStore.ts             # UPA state (routes, gas)
│   └── settingsStore.ts        # User preferences
├── lib/
│   ├── api/
│   │   ├── x1chain.ts          # X1 EcoChain RPC calls
│   │   ├── upaEngine.ts        # UPA Sidecar API
│   │   └── priceOracle.ts      # Price feeds
│   ├── web3/
│   │   ├── wallet.ts           # Wallet creation/import
│   │   ├── signer.ts           # Transaction signing
│   │   └── contracts.ts        # Smart contract ABIs
│   └── constants.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx

🎨 ЭТАП 2: БАЗОВЫЕ КОМПОНЕНТЫ (День 2-3)
Шаг 2.1: Button Component (DexSafe Style)
src/components/common/Button.tsx:
typescriptimport { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  children: ReactNode
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const variants = {
    primary: 'bg-c-primary hover:bg-c-primary-hover text-white',
    secondary: 'bg-c-bg-secondary hover:bg-c-bg-tertiary text-c-text-primary',
    outline: 'border border-c-border hover:border-c-primary text-c-text-primary',
    ghost: 'hover:bg-c-bg-secondary text-c-text-primary',
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        rounded-md font-medium transition-all duration-200
        flex items-center justify-center gap-2
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </motion.button>
  )
}
Шаг 2.2: Card Component
src/components/common/Card.tsx:
typescriptimport { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  padding?: 'sm' | 'md' | 'lg'
  hoverable?: boolean
  onClick?: () => void
  className?: string
}

export const Card = ({
  children,
  padding = 'md',
  hoverable = false,
  onClick,
  className = '',
}: CardProps) => {
  const paddings = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  const Component = hoverable ? motion.div : 'div'
  
  return (
    <Component
      className={`
        ${paddings[padding]}
        bg-c-bg-secondary
        rounded-xl
        ${onClick ? 'cursor-pointer' : ''}
        ${hoverable ? 'hover:bg-c-bg-tertiary' : ''}
        transition-colors duration-200
        ${className}
      `}
      onClick={onClick}
      {...(hoverable ? {
        whileHover: { scale: 1.01 },
        whileTap: { scale: 0.99 }
      } : {})}
    >
      {children}
    </Component>
  )
}
Шаг 2.3: Toggle Component (iOS Style - скрин 6)
src/components/common/Toggle.tsx:
typescriptimport { motion } from 'framer-motion'

interface ToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
}

export const Toggle = ({ enabled, onChange }: ToggleProps) => {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`
        relative w-12 h-7 rounded-full transition-colors duration-200
        ${enabled ? 'bg-c-primary' : 'bg-c-bg-tertiary'}
      `}
    >
      <motion.div
        className="absolute top-1 w-5 h-5 bg-white rounded-full"
        animate={{
          x: enabled ? 24 : 4
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  )
}

📐 ЭТАП 3: LAYOUT КОМПОНЕНТЫ (День 3-4)
Шаг 3.1: Header (из скрина 2)
src/components/layout/Header.tsx:
typescriptimport { useNavigate } from 'react-router-dom'
import { Menu, ScanLine } from 'lucide-react'

export const Header = () => {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 bg-c-bg-primary border-b border-c-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Левая часть: меню */}
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-c-bg-secondary transition-colors">
          <Menu className="w-6 h-6 text-c-text-secondary" />
        </button>

        {/* Центр: название кошелька */}
        <h1 className="text-lg font-medium text-c-text-primary">
          Wallet 1
        </h1>

        {/* Правая часть: QR scanner */}
        <button 
          onClick={() => navigate('/scan')}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-c-bg-secondary transition-colors"
        >
          <ScanLine className="w-6 h-6 text-c-primary" />
        </button>
      </div>
    </header>
  )
}
Шаг 3.2: Bottom Navigation (обновленная - 4 вкладки)
src/components/layout/BottomNav.tsx:
typescriptimport { useNavigate, useLocation } from 'react-router-dom'
import { Wallet, TrendingUp, Gift, Settings } from 'lucide-react'

export const BottomNav = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Баланс', icon: Wallet },
    { path: '/defi', label: 'DeFi', icon: TrendingUp },
    { path: '/bonuses', label: 'Бонусы', icon: Gift },
    { path: '/settings', label: 'Настройки', icon: Settings },
  ]

  return (
    <nav className="sticky bottom-0 z-50 bg-c-bg-primary border-t border-c-border">
      <div className="grid grid-cols-4 px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                flex flex-col items-center justify-center py-2 rounded-lg
                transition-all duration-200
                ${isActive 
                  ? 'text-c-primary' 
                  : 'text-c-text-secondary hover:text-c-text-primary'
                }
              `}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

💰 ЭТАП 4: ГЛАВНАЯ СТРАНИЦА (BALANCE) (День 4-5)
Шаг 4.1: Balance Card (скрин 2 - верхний блок)
src/components/balance/BalanceCard.tsx:
typescriptimport { Card } from '../common/Card'

export const BalanceCard = () => {
  // TODO: Получить из walletStore
  const totalBalance = 0
  const btcEquivalent = 0

  return (
    <Card padding="lg" className="text-center">
      <h1 className="text-5xl font-bold text-c-text-primary mb-2">
        {totalBalance} $
      </h1>
      <p className="text-c-text-secondary">
        ≈ {btcEquivalent} BTC
      </p>
    </Card>
  )
}
Шаг 4.2: Action Buttons (3 круглые кнопки - скрин 2)
src/components/balance/ActionButtons.tsx:
typescriptimport { useNavigate } from 'react-router-dom'
import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight } from 'lucide-react'

export const ActionButtons = () => {
  const navigate = useNavigate()

  const actions = [
    { 
      icon: ArrowUpRight, 
      label: 'Отправить', 
      path: '/send',
      bg: 'bg-c-bg-secondary' 
    },
    { 
      icon: ArrowDownLeft, 
      label: 'Получить', 
      path: '/receive',
      bg: 'bg-c-bg-secondary' 
    },
    { 
      icon: ArrowLeftRight, 
      label: 'Обмен', 
      path: '/swap',
      bg: 'bg-c-bg-secondary' 
    },
  ]

  return (
    <div className="flex justify-center gap-4">
      {actions.map((action) => {
        const Icon = action.icon
        
        return (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center gap-2"
          >
            <div className={`
              w-16 h-16 rounded-full ${action.bg}
              flex items-center justify-center
              hover:bg-c-bg-tertiary transition-colors
            `}>
              <Icon className="w-6 h-6 text-c-text-secondary" />
            </div>
            <span className="text-xs text-c-text-secondary">
              {action.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
Шаг 4.3: Token List (скрин 2 - список токенов)
src/components/balance/TokenList.tsx:
typescriptimport { useState } from 'react'
import { Card } from '../common/Card'
import { ChevronDown, Settings as SettingsIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const TokenList = () => {
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState<'balance' | 'name' | 'change'>('balance')

  // TODO: Получить из walletStore
  const mockTokens = [
    { symbol: 'BNB', name: 'BNB', balance: 0, usdValue: 0, change24h: -1.66, icon: '🟡' },
    { symbol: 'TON', name: 'Toncoin', balance: 0, usdValue: 0, change24h: 0, syncing: true, icon: '💎' },
    { symbol: 'DEXNET', name: 'DexNet', balance: 0, usdValue: 0, change24h: -0.08, badge: 'BEP20', icon: '◈' },
    { symbol: 'DNC', name: 'Dexnet Coin', balance: 0, usdValue: 0, change24h: 0, icon: '◈' },
    { symbol: 'USDT', name: 'Tether', balance: 0, usdValue: 0, change24h: 0, badge: 'BEP20', icon: '₮' },
  ]

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {/* Сортировка */}}
          className="flex items-center gap-2 text-c-text-primary"
        >
          <span className="font-medium">Баланс</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => navigate('/manage-tokens')}
          className="text-c-text-secondary hover:text-c-text-primary transition-colors"
        >
          <SettingsIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Token List */}
      <div className="space-y-2">
        {mockTokens.map((token) => (
          <Card
            key={token.symbol}
            padding="md"
            hoverable
            onClick={() => navigate(`/token/${token.symbol}`)}
          >
            <div className="flex items-center justify-between">
              {/* Левая часть */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-c-bg-tertiary flex items-center justify-center text-xl">
                  {token.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-c-text-primary">
                      {token.symbol}
                    </span>
                    {token.badge && (
                      <span className="px-2 py-0.5 text-xs bg-c-bg-tertiary rounded text-c-text-tertiary">
                        {token.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-c-text-secondary">
                    {token.syncing ? 'Идет синхронизация...' : `${token.usdValue} $ ${token.change24h !== 0 ? `${token.change24h}%` : ''}`}
                  </p>
                </div>
              </div>

              {/* Правая часть */}
              <div className="text-right">
                <p className="font-medium text-c-text-primary">
                  {token.balance}
                </p>
                <p className="text-sm text-c-text-tertiary">
                  {token.usdValue} $
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
Шаг 4.4: Balance Page (сборка)
src/pages/Balance.tsx:
typescriptimport { PageContainer } from '../components/layout/PageContainer'
import { BalanceCard } from '../components/balance/BalanceCard'
import { ActionButtons } from '../components/balance/ActionButtons'
import { TokenList } from '../components/balance/TokenList'

export const Balance = () => {
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <BalanceCard />
        <ActionButtons />
        <TokenList />
      </div>
    </PageContainer>
  )
}

🚀 ЭТАП 5: UPA FLOW (УМНАЯ ОТПРАВКА) (День 6-7)
Шаг 5.1: UPA Store (состояние маршрутизации)
src/store/upaStore.ts:
typescriptimport { create } from 'zustand'

interface UPARoute {
  fromToken: string
  toToken: string
  fromChain: string
  toChain: string
  estimatedGas: string
  estimatedTime: number // секунды
  ecoScore: number // 0-100
  steps: string[]
}

interface UPAStore {
  currentRoute: UPARoute | null
  isAnalyzing: boolean
  setRoute: (route: UPARoute) => void
  resetRoute: () => void
}

export const useUPAStore = create<UPAStore>((set) => ({
  currentRoute: null,
  isAnalyzing: false,
  setRoute: (route) => set({ currentRoute: route, isAnalyzing: false }),
  resetRoute: () => set({ currentRoute: null, isAnalyzing: false }),
}))
Шаг 5.2: Address Analyzer (UPA Step 1)
src/components/upa/AddressAnalyzer.tsx:
typescriptimport { useState, useEffect } from 'react'
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
  if (!analyzing) return null

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <Loader2 className="w-12 h-12 text-c-primary animate-spin" />
      <p className="text-c-text-secondary">Анализируем адрес...</p>
      <p className="text-xs text-c-text-tertiary">UPA Engine определяет оптимальный путь</p>
    </div>
  )
}
Шаг 5.3: Route Recommendation (UPA Step 2)
src/components/upa/RouteRecommendation.tsx:
typescriptimport { Card } from '../common/Card'
import { Button } from '../common/Button'
import { Leaf, Zap, CheckCircle } from 'lucide-react'

interface RouteRecommendationProps {
  route: {
    fromToken: string
    toToken: string
    fromChain: string
    toChain: string
    estimatedGas: string
    ecoScore: number
  }
  onAccept: () => void
  onReject: () => void
}

export const RouteRecommendation = ({ route, onAccept, onReject }: RouteRecommendationProps) => {
  return (
    <Card padding="lg" className="space-y-4">
      {/* Заголовок */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-c-primary/10 mb-3">
          <CheckCircle className="w-8 h-8 text-c-primary" />
        </div>
        <h3 className="text-xl font-bold text-c-text-primary mb-2">
          Рекомендуемый путь
        </h3>
        <p className="text-sm text-c-text-secondary">
          UPA Engine нашел оптимальный маршрут
        </p>
      </div>

      {/* Детали маршрута */}
      <div className="space-y-3 p-4 bg-c-bg-tertiary rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-c-text-secondary">Токен:</span>
          <span className="font-medium text-c-text-primary">
            {route.fromToken} → {route.toToken}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-c-text-secondary">Маршрут:</span>
          <span className="font-medium text-c-text-primary">
            {route.fromChain} → X1 EcoChain → {route.toChain}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-c-text-secondary flex items-center gap-2">
            <Zap className="w-4 h-4 text-c-warning" />
            Gas Fee:
          </span>
          <span className="font-medium text-c-text-primary">
            {route.estimatedGas}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-c-text-secondary flex items-center gap-2">
            <Leaf className="w-4 h-4 text-c-success" />
            Eco Score:
          </span>
          <span className="font-medium text-c-success">
            {route.ecoScore}/100
          </span>
        </div>
      </div>

      {/* Преимущества */}
      <div className="p-3 bg-c-primary/10 rounded-lg border border-c-primary/20">
        <p className="text-sm text-c-text-primary">
          ✨ <strong>Почему X1 EcoChain?</strong>
        </p>
        <ul className="mt-2 space-y-1 text-xs text-c-text-secondary">
          <li>• На 85% меньше выбросов CO₂</li>
          <li>• Комиссия в 10 раз ниже обычной</li>
          <li>• Моментальная финализация транзакций</li>
        </ul>
      </div>

      {/* Действия */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={onReject}>
          Другой путь
        </Button>
        <Button variant="primary" onClick={onAccept}>
          Принять
        </Button>
      </div>
    </Card>
  )
}
Шаг 5.4: Send Page (с UPA Flow - скрин 9)
src/pages/Send.tsx:
typescriptimport { useState } from 'react'
import { PageContainer } from '../components/layout/PageContainer'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { ArrowLeft, ScanLine } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AddressAnalyzer } from '../components/upa/AddressAnalyzer'
import { RouteRecommendation } from '../components/upa/RouteRecommendation'
import { useUPAStore } from '../store/upaStore'

export const Send = () => {
  const navigate = useNavigate()
  const { currentRoute, setRoute } = useUPAStore()
  
  const [step, setStep] = useState<'input' | 'analyzing' | 'recommendation' | 'confirm'>('input')
  const [selectedToken, setSelectedToken] = useState('BNB')
  const [recipientAddress, setRecipientAddress] = useState('')
  const [amount, setAmount] = useState('')

  // Токены из кошелька
  const mockTokens = [
    { symbol: 'BNB', balance: 0 },
    { symbol: 'DEXNET', balance: 0 },
    { symbol: 'USDT', balance: 0 },
  ]

  const handleAddressInput = (address: string) => {
    setRecipientAddress(address)
    
    // Если адрес валиден - запускаем UPA анализ
    if (address.length >= 42) {
      setStep('analyzing')
    }
  }

  const handleAnalysisComplete = (result: any) => {
    // Получили результат анализа от UPA Engine
    const mockRoute = {
      fromToken: selectedToken,
      toToken: result.preferredToken,
      fromChain: 'BSC',
      toChain: result.preferredChain,
      estimatedGas: '0.0012 BNB',
      ecoScore: 92,
      estimatedTime: 15,
      steps: ['Swap на X1 DEX', 'Bridge через X1 EcoChain', 'Transfer']
    }
    
    setRoute(mockRoute)
    setStep('recommendation')
  }

  const handleAcceptRoute = () => {
    setStep('confirm')
  }

  const handleRejectRoute = () => {
    // Показать альтернативные маршруты
    setStep('input')
  }

  // Шаг 1: Ввод данных
  if (step === 'input') {
    return (
      <PageContainer showBottomNav={false}>
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-c-bg-secondary"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-c-bg-secondary flex items-center justify-center">
                <span className="text-xl">🟡</span>
              </div>
              <h1 className="text-xl font-bold">Отправить {selectedToken}</h1>
            </div>
          </div>

          <div className="space-y-4">
            {/* Доступный баланс */}
            <div className="flex items-center justify-between p-4 bg-c-bg-secondary rounded-lg">
              <span className="text-c-text-secondary">Доступный баланс</span>
              <span className="font-medium text-c-text-primary">
                {mockTokens.find(t => t.symbol === selectedToken)?.balance || 0} {selectedToken}
              </span>
            </div>

            {/* Сумма */}
            <div>
              <Input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-2xl font-bold text-center"
              />
              <p className="text-center text-sm text-c-text-tertiary mt-2">
                Нет данных
              </p>
            </div>

            {/* Адрес получателя */}
            <div>
              <label className="block text-sm text-c-text-secondary mb-2">
                Адрес или домен
              </label>
              <div className="relative">
                <Input
                  placeholder="0x... или domain.eth"
                  value={recipientAddress}
                  onChange={(e) => handleAddressInput(e.target.value)}
                  className="pr-24"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-c-bg-tertiary hover:bg-c-bg-secondary transition-colors">
                    <ScanLine className="w-5 h-5 text-c-text-secondary" />
                  </button>
                  <button className="px-3 py-2 bg-c-bg-tertiary hover:bg-c-bg-secondary rounded-lg text-sm font-medium text-c-text-primary transition-colors">
                    Вставить
                  </button>
                </div>
              </div>
            </div>

            {/* Кнопка */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={!amount || !recipientAddress}
            >
              Далее
            </Button>
          </div>
        </div>
      </PageContainer>
    )
  }

  // Шаг 2: Анализ адреса (UPA)
  if (step === 'analyzing') {
    return (
      <PageContainer showBottomNav={false}>
        <div className="container mx-auto px-4 py-6">
          <AddressAnalyzer
            address={recipientAddress}
            onAnalysisComplete={handleAnalysisComplete}
          />
        </div>
      </PageContainer>
    )
  }

  // Шаг 3: Рекомендация маршрута (UPA)
  if (step === 'recommendation' && currentRoute) {
    return (
      <PageContainer showBottomNav={false}>
        <div className="container mx-auto px-4 py-6">
          <RouteRecommendation
            route={currentRoute}
            onAccept={handleAcceptRoute}
            onReject={handleRejectRoute}
          />
        </div>
      </PageContainer>
    )
  }

  // Шаг 4: Подтверждение
  if (step === 'confirm') {
    return (
      <PageContainer showBottomNav={false}>
        <div className="container mx-auto px-4 py-6">
          <Card padding="lg" className="space-y-4">
            <h2 className="text-xl font-bold text-center text-c-text-primary">
              Подтверждение
            </h2>

            {/* Детали транзакции */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-c-text-secondary">Отправляете:</span>
                <span className="font-medium text-c-text-primary">
                  {amount} {selectedToken}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-c-text-secondary">Получит:</span>
                <span className="font-medium text-c-text-primary">
                  {amount} {currentRoute?.toToken}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-c-text-secondary">Адресат:</span>
                <span className="font-mono text-xs text-c-text-primary">
                  {recipientAddress.slice(0, 6)}...{recipientAddress.slice(-4)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-c-text-secondary">Комиссия:</span>
                <span className="font-medium text-c-text-primary">
                  {currentRoute?.estimatedGas}
                </span>
              </div>

              <div className="pt-3 border-t border-c-border flex justify-between">
                <span className="font-medium text-c-text-primary">Итого:</span>
                <span className="font-bold text-c-text-primary">
                  {amount} {selectedToken}
                </span>
              </div>
            </div>

            {/* Кнопки */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep('input')}>
                Отмена
              </Button>
              <Button variant="primary">
                Подтвердить
              </Button>
            </div>
          </Card>
        </div>
      </PageContainer>
    )
  }

  return null
}

📥 ЭТАП 6: RECEIVE PAGE (День 7-8)
Шаг 6.1: Receive Page (скрин 10 - QR + адрес)
src/pages/Receive.tsx:
typescriptimport { useState } from 'react'
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

💱 ЭТАП 7: DEFI PAGE (LENDING + ЦФА) (День 8-10)
Шаг 7.1: DeFi Store (состояние кредитования)
src/store/defiStore.ts:
typescriptimport { create } from 'zustand'

interface LendingPosition {
  id: string
  collateralToken: string
  collateralAmount: number
  borrowedToken: string
  borrowedAmount: number
  ltv: number // Loan-to-Value %
  liquidationPrice: number
  apy: number
}

interface DeFiStore {
  lendingPositions: LendingPosition[]
  availableCredit: number
  totalBorrowed: number
  addPosition: (position: LendingPosition) => void
  closePosition: (id: string) => void
}

export const useDeFiStore = create<DeFiStore>((set) => ({
  lendingPositions: [],
  availableCredit: 0,
  totalBorrowed: 0,
  addPosition: (position) => set((state) => ({
    lendingPositions: [...state.lendingPositions, position]
  })),
  closePosition: (id) => set((state) => ({
    lendingPositions: state.lendingPositions.filter(p => p.id !== id)
  })),
}))
Шаг 7.2: Lending Card Component
src/components/defi/LendingCard.tsx:
typescriptimport { Card } from '../common/Card'
import { Button } from '../common/Button'
import { TrendingUp, Shield } from 'lucide-react'

export const LendingCard = () => {
  // TODO: Получить из defiStore
  const availableCredit = 0
  const activeLoan = null

  return (
    <Card padding="lg" className="space-y-4">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-c-text-primary flex items-center gap-2">
          <Shield className="w-5 h-5 text-c-primary" />
          DeFi Кредитование
        </h3>
        <span className="text-xs text-c-text-tertiary">
          Powered by X1 EcoChain
        </span>
      </div>

      {/* Доступный лимит */}
      <div className="p-4 bg-c-bg-tertiary rounded-lg">
        <p className="text-sm text-c-text-secondary mb-1">
          Доступный лимит
        </p>
        <h2 className="text-3xl font-bold text-c-text-primary">
          ${availableCredit.toLocaleString()}
        </h2>
        <p className="text-xs text-c-text-tertiary mt-1">
          Под залог ваших активов
        </p>
      </div>

      {/* Преимущества */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-c-primary/10 rounded-lg">
          <p className="text-xs text-c-text-tertiary">APY от</p>
          <p className="text-lg font-bold text-c-primary">3.5%</p>
        </div>
        <div className="p-3 bg-c-success/10 rounded-lg">
          <p className="text-xs text-c-text-tertiary">Без KYC</p>
          <p className="text-lg font-bold text-c-success">100%</p>
        </div>
      </div>

      {/* Действия */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" fullWidth>
          <TrendingUp className="w-4 h-4 mr-2" />
          Разместить
        </Button>
        <Button variant="primary" fullWidth>
          Получить займ
        </Button>
      </div>

      {/* Подсказка */}
      <p className="text-xs text-c-text-tertiary text-center">
        💡 LTV до 75% • Ликвидация от 85%
      </p>
    </Card>
  )
}
Шаг 7.3: ЦФА (Tokenized Assets) Card
src/components/defi/CFATokenCard.tsx:
typescriptimport { Card } from '../common/Card'
import { TrendingUp, ArrowUpRight } from 'lucide-react'

interface CFAToken {
  symbol: string
  name: string
  type: 'stock' | 'bond' | 'fund'
  price: number
  change24h: number
  icon: string
}

export const CFATokenCard = ({ token }: { token: CFAToken }) => {
  return (
    <Card padding="md" hoverable>
      <div className="flex items-center justify-between">
        {/* Левая часть */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-c-bg-tertiary flex items-center justify-center">
            <span className="text-xl">{token.icon}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-c-text-primary">
                {token.symbol}
              </span>
              <span className="px-2 py-0.5 text-xs bg-c-primary/10 text-c-primary rounded">
                {token.type === 'stock' ? 'Stock' : token.type === 'bond' ? 'Bond' : 'Fund'}
              </span>
            </div>
            <p className="text-sm text-c-text-secondary">
              {token.name}
            </p>
          </div>
        </div>

        {/* Правая часть */}
        <div className="text-right">
          <p className="font-medium text-c-text-primary">
            ${token.price.toFixed(2)}
          </p>
          <p className={`text-sm flex items-center justify-end gap-1 ${
            token.change24h >= 0 ? 'text-c-success' : 'text-c-danger'
          }`}>
            <TrendingUp className="w-3 h-3" />
            {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
          </p>
        </div>
      </div>
    </Card>
  )
}
Шаг 7.4: DeFi Page (сборка)
src/pages/DeFi.tsx:
typescriptimport { PageContainer } from '../components/layout/PageContainer'
import { LendingCard } from '../components/defi/LendingCard'
import { CFATokenCard } from '../components/defi/CFATokenCard'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { ArrowRight, Info } from 'lucide-react'

export const DeFi = () => {
  // Mock ЦФА токены
  const cfaTokens = [
    { symbol: 'YNDX', name: 'Яндекс', type: 'stock' as const, price: 2450.50, change24h: 2.3, icon: '🔴' },
    { symbol: 'AAPL', name: 'Apple Inc', type: 'stock' as const, price: 178.45, change24h: 1.2, icon: '🍎' },
    { symbol: 'TSLA', name: 'Tesla', type: 'stock' as const, price: 245.67, change24h: -0.8, icon: '🚗' },
  ]

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Заголовок */}
        <div>
          <h1 className="text-2xl font-bold text-c-text-primary mb-1">
            DeFi Hub
          </h1>
          <p className="text-sm text-c-text-secondary">
            Кредитование и токенизированные активы
          </p>
        </div>

        {/* Кредитование */}
        <LendingCard />

        {/* Разделитель */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-c-border" />
          <span className="text-xs text-c-text-tertiary">ТОКЕНИЗИРОВАННЫЕ АКТИВЫ</span>
          <div className="flex-1 h-px bg-c-border" />
        </div>

        {/* Информация о ЦФА */}
        <Card padding="md" className="flex items-start gap-3">
          <Info className="w-5 h-5 text-c-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-c-text-secondary">
            <strong className="text-c-text-primary">Торгуйте акциями через X1 DEX</strong>
            <p className="mt-1">
              Токенизированные активы обеспечены реальными акциями 1:1. 
              Все операции некастодиальны и происходят on-chain.
            </p>
          </div>
        </Card>

        {/* Список ЦФА токенов */}
        <div className="space-y-2">
          {cfaTokens.map((token) => (
            <CFATokenCard key={token.symbol} token={token} />
          ))}
        </div>

        {/* Показать все */}
        <Button variant="outline" fullWidth>
          Показать все активы
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        {/* Предупреждение */}
        <Card padding="md" className="bg-c-warning/10 border border-c-warning/20">
          <p className="text-xs text-c-text-secondary">
            ⚠️ <strong>Важно:</strong> Торговля ЦФА требует прохождения KYC. 
            Это законодательное требование для токенизированных ценных бумаг.
          </p>
        </Card>
      </div>
    </PageContainer>
  )
}

🎮 ЭТАП 8: ГЕЙМИФИКАЦИЯ (BONUSES) (День 11-12)
Шаг 8.1: Missions Component
src/components/bonuses/MissionsCard.tsx:
typescriptimport { Card } from '../common/Card'
import { Button } from '../common/Button'
import { CheckCircle, Lock } from 'lucide-react'

interface Mission {
  id: string
  title: string
  description: string
  progress: number
  total: number
  reward: string
  completed: boolean
  icon: string
}

export const MissionsCard = () => {
  const missions: Mission[] = [
    {
      id: '1',
      title: 'DeFi-Старт',
      description: 'Совершите первый P2P-займ или купите ЦФА',
      progress: 0,
      total: 1,
      reward: '50 WLTX + NFT Badge',
      completed: false,
      icon: '🚀'
    },
    {
      id: '2',
      title: 'Eco-Master',
      description: 'Совершите 5 переводов через X1 EcoChain',
      progress: 2,
      total: 5,
      reward: '100 WLTX
      reward: '100 WLTX + DePIN Badge',
      completed: false,
      icon: '🌱'
    },
    {
      id: '3',
      title: 'Daily Warrior',
      description: 'Войди 7 дней подряд',
      progress: 7,
      total: 7,
      reward: 'Premium Spin × 3',
      completed: true,
      icon: '🔥'
    },
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-c-text-primary">
        Активные миссии
      </h3>

      {missions.map((mission) => (
        <Card key={mission.id} padding="md">
          <div className="flex items-start gap-3">
            {/* Иконка */}
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center text-2xl
              ${mission.completed ? 'bg-c-success/10' : 'bg-c-bg-tertiary'}
            `}>
              {mission.completed ? '✅' : mission.icon}
            </div>

            {/* Контент */}
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-c-text-primary">
                    {mission.title}
                  </h4>
                  <p className="text-sm text-c-text-secondary mt-1">
                    {mission.description}
                  </p>
                </div>
                {mission.completed && (
                  <CheckCircle className="w-5 h-5 text-c-success flex-shrink-0" />
                )}
              </div>

              {/* Прогресс бар */}
              {!mission.completed && (
                <div className="space-y-1">
                  <div className="h-2 bg-c-bg-tertiary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-c-primary rounded-full transition-all duration-300"
                      style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-c-text-tertiary">
                    {mission.progress}/{mission.total}
                  </p>
                </div>
              )}

              {/* Награда */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-c-text-tertiary">Награда:</span>
                  <span className="font-medium text-c-primary">
                    {mission.reward}
                  </span>
                </div>
                
                {mission.completed && (
                  <Button size="sm" variant="primary">
                    Забрать
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
Шаг 8.2: Referral System
src/components/bonuses/ReferralCard.tsx:
typescriptimport { Card } from '../common/Card'
import { Button } from '../common/Button'
import { Copy, Share2, Users } from 'lucide-react'

export const ReferralCard = () => {
  const referralCode = 'DEXSAFE-ABC123'
  const stats = {
    invited: 5,
    earned: {
      wltx: 150,
      spins: 10
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode)
    // TODO: Toast
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-c-text-primary">
        Реферальная программа
      </h3>

      {/* Реферальный код */}
      <Card padding="lg" className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-c-primary/10 mb-2">
          <Users className="w-8 h-8 text-c-primary" />
        </div>
        
        <div>
          <p className="text-sm text-c-text-secondary mb-2">
            Твой реферальный код
          </p>
          <div className="flex items-center justify-center gap-2 p-3 bg-c-bg-tertiary rounded-lg">
            <span className="font-mono font-bold text-c-text-primary">
              {referralCode}
            </span>
            <button
              onClick={copyCode}
              className="text-c-primary hover:text-c-primary-hover transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <Button variant="primary" fullWidth>
          <Share2 className="w-4 h-4 mr-2" />
          Поделиться кодом
        </Button>
      </Card>

      {/* Статистика */}
      <Card padding="md">
        <h4 className="font-semibold text-c-text-primary mb-3">
          Твоя статистика
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-c-bg-tertiary rounded-lg">
            <p className="text-xs text-c-text-tertiary mb-1">Приглашено</p>
            <p className="text-2xl font-bold text-c-text-primary">
              {stats.invited}
            </p>
          </div>
          
          <div className="p-3 bg-c-primary/10 rounded-lg">
            <p className="text-xs text-c-text-tertiary mb-1">Заработано</p>
            <p className="text-lg font-bold text-c-primary">
              {stats.earned.wltx} WLTX
            </p>
            <p className="text-xs text-c-text-secondary">
              {stats.earned.spins} спинов
            </p>
          </div>
        </div>
      </Card>

      {/* Условия */}
      <Card padding="md" className="bg-c-primary/5 border border-c-primary/20">
        <h4 className="font-semibold text-c-text-primary mb-2">
          За каждого друга:
        </h4>
        <ul className="space-y-1 text-sm text-c-text-secondary">
          <li>• 30 WLTX при регистрации</li>
          <li>• 2 бесплатных спина</li>
          <li>• 5% от его торговых комиссий</li>
        </ul>
      </Card>
    </div>
  )
}
Шаг 8.3: Bonuses Page
src/pages/Bonuses.tsx:
typescriptimport { useState } from 'react'
import { PageContainer } from '../components/layout/PageContainer'
import { MissionsCard } from '../components/bonuses/MissionsCard'
import { ReferralCard } from '../components/bonuses/ReferralCard'
import { Trophy, Gift, Users } from 'lucide-react'

export const Bonuses = () => {
  const [activeTab, setActiveTab] = useState<'missions' | 'spin' | 'referrals'>('missions')

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-c-text-primary mb-1">
            🎁 Бонусы
          </h1>
          <p className="text-sm text-c-text-secondary">
            Выполняй задания и получай награды
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('missions')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors
              ${activeTab === 'missions'
                ? 'bg-c-primary text-white'
                : 'bg-c-bg-secondary text-c-text-secondary hover:bg-c-bg-tertiary'
              }
            `}
          >
            <Trophy className="w-4 h-4" />
            Миссии
          </button>
          
          <button
            onClick={() => setActiveTab('spin')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors
              ${activeTab === 'spin'
                ? 'bg-c-primary text-white'
                : 'bg-c-bg-secondary text-c-text-secondary hover:bg-c-bg-tertiary'
              }
            `}
          >
            <Gift className="w-4 h-4" />
            Daily Spin
          </button>
          
          <button
            onClick={() => setActiveTab('referrals')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors
              ${activeTab === 'referrals'
                ? 'bg-c-primary text-white'
                : 'bg-c-bg-secondary text-c-text-secondary hover:bg-c-bg-tertiary'
              }
            `}
          >
            <Users className="w-4 h-4" />
            Рефералы
          </button>
        </div>

        {/* Content */}
        {activeTab === 'missions' && <MissionsCard />}
        {activeTab === 'spin' && (
          <div className="text-center py-12 text-c-text-secondary">
            Coming soon: Daily Spin
          </div>
        )}
        {activeTab === 'referrals' && <ReferralCard />}
      </div>
    </PageContainer>
  )
}

⚙️ ЭТАП 9: SETTINGS PAGE (День 12-13)
Шаг 9.1: Settings Store
src/store/settingsStore.ts:
typescriptimport { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsStore {
  currency: 'USD' | 'EUR' | 'RUB'
  language: 'en' | 'ru'
  biometricEnabled: boolean
  notificationsEnabled: boolean
  autoLockTimeout: number // минуты
  setCurrency: (currency: 'USD' | 'EUR' | 'RUB') => void
  setLanguage: (language: 'en' | 'ru') => void
  toggleBiometric: () => void
  toggleNotifications: () => void
  setAutoLockTimeout: (timeout: number) => void
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      currency: 'USD',
      language: 'ru',
      biometricEnabled: false,
      notificationsEnabled: true,
      autoLockTimeout: 5,
      setCurrency: (currency) => set({ currency }),
      setLanguage: (language) => set({ language }),
      toggleBiometric: () => set((state) => ({ biometricEnabled: !state.biometricEnabled })),
      toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
      setAutoLockTimeout: (timeout) => set({ autoLockTimeout: timeout }),
    }),
    {
      name: 'dexsafe-settings',
    }
  )
)
Шаг 9.2: Settings Page
src/pages/Settings.tsx:
typescriptimport { PageContainer } from '../components/layout/PageContainer'
import { Card } from '../components/common/Card'
import { Toggle } from '../components/common/Toggle'
import { Button } from '../components/common/Button'
import { 
  User, 
  Shield, 
  Bell, 
  Globe, 
  Palette, 
  HelpCircle, 
  LogOut,
  ChevronRight 
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSettingsStore } from '../store/settingsStore'

export const Settings = () => {
  const navigate = useNavigate()
  const {
    currency,
    language,
    biometricEnabled,
    notificationsEnabled,
    setCurrency,
    setLanguage,
    toggleBiometric,
    toggleNotifications,
  } = useSettingsStore()

  const settingSections = [
    {
      title: 'Аккаунт',
      icon: User,
      items: [
        { label: 'Профиль', path: '/settings/profile' },
        { label: 'Безопасность', path: '/settings/security' },
        { label: 'Резервное копирование', path: '/settings/backup' },
      ]
    },
    {
      title: 'Настройки',
      icon: Globe,
      items: [
        { 
          label: 'Валюта', 
          value: currency,
          type: 'select',
          options: ['USD', 'EUR', 'RUB'],
          onChange: (val: string) => setCurrency(val as any)
        },
        { 
          label: 'Язык', 
          value: language,
          type: 'select',
          options: ['en', 'ru'],
          onChange: (val: string) => setLanguage(val as any)
        },
        { label: 'Тема оформления', path: '/settings/theme' },
      ]
    },
    {
      title: 'Приватность',
      icon: Shield,
      items: [
        {
          label: 'Биометрия',
          type: 'toggle',
          value: biometricEnabled,
          onChange: toggleBiometric
        },
        {
          label: 'Уведомления',
          type: 'toggle',
          value: notificationsEnabled,
          onChange: toggleNotifications
        },
      ]
    },
    {
      title: 'Поддержка',
      icon: HelpCircle,
      items: [
        { label: 'Справка', path: '/settings/help' },
        { label: 'Связаться с нами', path: '/settings/contact' },
        { label: 'Условия использования', path: '/settings/terms' },
      ]
    }
  ]

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-c-bg-secondary flex items-center justify-center mx-auto mb-3">
            <User className="w-10 h-10 text-c-text-secondary" />
          </div>
          <h2 className="text-xl font-bold text-c-text-primary">
            sskutushev
          </h2>
          <p className="text-sm text-c-text-secondary">
            552.152284 HOT
          </p>
        </div>

        {/* Settings Sections */}
        {settingSections.map((section) => {
          const Icon = section.icon
          
          return (
            <div key={section.title} className="space-y-3">
              <div className="flex items-center gap-2 text-c-text-tertiary">
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{section.title}</span>
              </div>

              <Card padding="sm">
                {section.items.map((item, index) => (
                  <div key={item.label}>
                    {item.type === 'toggle' ? (
                      <div className="flex items-center justify-between p-3">
                        <span className="text-c-text-primary">{item.label}</span>
                        <Toggle
                          enabled={item.value as boolean}
                          onChange={item.onChange as any}
                        />
                      </div>
                    ) : item.type === 'select' ? (
                      <div className="flex items-center justify-between p-3">
                        <span className="text-c-text-primary">{item.label}</span>
                        <select
                          value={item.value as string}
                          onChange={(e) => item.onChange?.(e.target.value)}
                          className="px-3 py-1 bg-c-bg-tertiary border border-c-border rounded text-c-text-primary"
                        >
                          {item.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <button
                        onClick={() => item.path && navigate(item.path)}
                        className="w-full flex items-center justify-between p-3 hover:bg-c-bg-tertiary transition-colors"
                      >
                        <span className="text-c-text-primary">{item.label}</span>
                        <ChevronRight className="w-5 h-5 text-c-text-tertiary" />
                      </button>
                    )}
                    
                    {index < section.items.length - 1 && (
                      <div className="h-px bg-c-border mx-3" />
                    )}
                  </div>
                ))}
              </Card>
            </div>
          )
        })}

        {/* Logout */}
        <Button variant="outline" fullWidth className="text-c-danger border-c-danger">
          <LogOut className="w-4 h-4 mr-2" />
          Выйти
        </Button>

        {/* Version */}
        <p className="text-center text-xs text-c-text-tertiary">
          DexSafe Wallet Pro v2.0.0
        </p>
      </div>
    </PageContainer>
  )
}

🔐 ЭТАП 10: WEB3 ИНТЕГРАЦИЯ (День 13-15)
Шаг 10.1: Wallet Hook (некастодиальность)
src/hooks/useWallet.ts:
typescriptimport { create } from 'zustand'
import { ethers } from 'ethers'

interface WalletState {
  address: string | null
  privateKey: string | null
  mnemonic: string | null
  isLocked: boolean
  createWallet: () => Promise<void>
  importWallet: (mnemonic: string) => Promise<void>
  lock: () => void
  unlock: (password: string) => Promise<boolean>
  signTransaction: (tx: any) => Promise<string>
}

export const useWallet = create<WalletState>((set, get) => ({
  address: null,
  privateKey: null,
  mnemonic: null,
  isLocked: true,

  createWallet: async () => {
    // Генерация нового кошелька
    const wallet = ethers.Wallet.createRandom()
    
    // TODO: Зашифровать privateKey и mnemonic с помощью пароля пользователя
    // Использовать ethers.Wallet.encrypt()
    
    set({
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic?.phrase,
      isLocked: false,
    })
  },

  importWallet: async (mnemonic: string) => {
    try {
      const wallet = ethers.Wallet.fromPhrase(mnemonic)
      
      set({
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic?.phrase,
        isLocked: false,
      })
    } catch (error) {
      console.error('Invalid mnemonic:', error)
      throw new Error('Неверная seed-фраза')
    }
  },

  lock: () => {
    set({ isLocked: true })
  },

  unlock: async (password: string) => {
    // TODO: Расшифровать privateKey используя пароль
    // Использовать ethers.Wallet.decrypt()
    
    set({ isLocked: false })
    return true
  },

  signTransaction: async (tx: any) => {
    const { privateKey, isLocked } = get()
    
    if (isLocked || !privateKey) {
      throw new Error('Wallet is locked')
    }

    const wallet = new ethers.Wallet(privateKey)
    const signedTx = await wallet.signTransaction(tx)
    
    return signedTx
  },
}))
Шаг 10.2: X1 EcoChain Provider
src/lib/api/x1chain.ts:
typescriptimport { ethers } from 'ethers'

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

  async sendTransaction(signedTx: string): Promise<string> {
    const tx = await this.provider.broadcastTransaction(signedTx)
    return tx.hash
  }

  async getGasPrice(): Promise<string> {
    const feeData = await this.provider.getFeeData()
    return ethers.formatUnits(feeData.gasPrice || 0, 'gwei')
  }
}

export const x1Provider = new X1ChainProvider()
Шаг 10.3: UPA Engine API (Sidecar Service)
src/lib/api/upaEngine.ts:
typescriptimport axios from 'axios'

// UPA Engine Sidecar Service
const UPA_API_URL = process.env.VITE_UPA_ENGINE_URL || 'http://localhost:3001'

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

📱 ЭТАП 11: TELEGRAM MINI APP ИНТЕГРАЦИЯ (День 15-16)
Шаг 11.1: Telegram WebApp SDK Hook
src/hooks/useTelegram.ts:
typescriptimport { useEffect, useState } from 'react'

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  photo_url?: string
}

export const useTelegram = () => {
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Проверяем доступность Telegram WebApp
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp

      // Инициализация
      tg.ready()
      tg.expand()

      // Получаем данные пользователя
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user as TelegramUser)
      }

      // Настраиваем цвета под тему
      tg.setHeaderColor('#12141A')
      tg.setBackgroundColor('#12141A')

      setIsReady(true)
    }
  }, [])

  const showAlert = (message: string) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showAlert(message)
    } else {
      alert(message)
    }
  }

  const showConfirm = (message: string, callback: (confirmed: boolean) => void) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showConfirm(message, callback)
    } else {
      const confirmed = confirm(message)
      callback(confirmed)
    }
  }

  const close = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.close()
    }
  }

  const openLink = (url: string) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openLink(url)
    } else {
      window.open(url, '_blank')
    }
  }

  return {
    user,
    isReady,
    showAlert,
    showConfirm,
    close,
    openLink,
  }
}

// Типы для TypeScript
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void
        expand: () => void
        close: () => void
        setHeaderColor: (color: string) => void
        setBackgroundColor: (color: string) => void
        showAlert: (message: string) => void
        showConfirm: (message: string, callback: (confirmed: boolean) => void) => void
        openLink: (url: string) => void
        initDataUnsafe: {
          user?: any
        }
      }
    }
  }
}
Шаг 11.2: Обновление main.tsx для Telegram
src/main.tsx:
typescriptimport React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Telegram WebApp SDK
const script = document.createElement('script')
script.src = 'https://telegram.org/js/telegram-web-app.js'
script.async = true
document.head.appendChild(script)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

🚢 ЭТАП 12: DEPLOYMENT & OPTIMIZATION (День 16-17)
Шаг 12.1: Environment Variables
.env.example:
bash# API Keys
VITE_CMC_API_KEY=your_coinmarketcap_key
VITE_INFURA_KEY=your_infura_key

# UPA Engine
VITE_UPA_ENGINE_URL=https://upa-engine.dexsafe.io

# X1 EcoChain
VITE_X1_RPC_URL=https://rpc.x1-ecochain.network
VITE_X1_CHAIN_ID=195

# Telegram
VITE_TELEGRAM_BOT_TOKEN=your_bot_token

# Feature Flags
VITE_ENABLE_LENDING=true
VITE_ENABLE_CFA=true
VITE_ENABLE_P2P=false
Шаг 12.2: Vite Config (оптимизация)
vite.config.ts:
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Удаляем console.log в production
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Разделяем большие библиотеки на отдельные chunks
          vendor: ['react', 'react-dom', 'react-router-dom'],
          web3: ['ethers', '@wagmi/core', 'viem'],
          charts: ['lightweight-charts', 'recharts'],
          ui: ['framer-motion', 'lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    host: true, // Для доступа из сети
  },
})
Шаг 12.3: Progressive Web App (PWA)
Установка:
bashnpm install -D vite-plugin-pwa
Обновленный vite.config.ts:
typescriptimport { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo.png'],
      manifest: {
        name: 'DexSafe Wallet Pro',
        short_name: 'DexSafe',
        description: 'Экологичный DeFi кошелек на X1 EcoChain',
        theme_color: '#00E0BE',
        background_color: '#12141A',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
Шаг 12.4: Vercel Deployment
vercel.json:
json{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
Deployment:
bash# Установить Vercel CLI
npm i -g vercel

# Войти
vercel login

# Deploy
vercel --prod
Шаг 12.5: Telegram Bot Setup
Интеграция с BotFather:
bash# 1. Открыть @BotFather в Telegram
# 2. Отправить /setmenubutton
# 3. Выбрать своего бота
# 4. Отправить URL: https://your-app.vercel.app
# 5. Отправить текст кнопки: "Открыть кошелек"

🔒 ЭТАП 13: БЕЗОПАСНОСТЬ (День 17-18)
Шаг 13.1: Secure Storage (шифрование)
src/lib/security/secureStorage.ts:
typescriptimport CryptoJS from 'crypto-js'

class SecureStorage {
  private encryptionKey: string | null = null

  // Инициализация с паролем пользователя
  initialize(password: string) {
    // Используем PBKDF2 для создания ключа из пароля
    this.encryptionKey = CryptoJS.PBKDF2(password, 'dexsafe-salt', {
      keySize: 256 / 32,
      iterations: 10000
    }).toString()
  }

  // Шифрование данных
  encrypt(data: string): string {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not initialized')
    }

    return CryptoJS.AES.encrypt(data, this.encryptionKey).toString()
  }

  // Расшифровка данных
  decrypt(encryptedData: string): string {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not initialized')
    }

    const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey)
    return bytes.toString(CryptoJS.enc.Utf8)
  }

  // Сохранение в localStorage (зашифровано)
  setItem(key: string, value: any) {
    const encrypted = this.encrypt(JSON.stringify(value))
    localStorage.setItem(key, encrypted)
  }

  // Получение из localStorage (расшифровка)
  getItem<T>(key: string): T | null {
    const encrypted = localStorage.getItem(key)
    if (!encrypted) return null

    try {
      const decrypted = this.decrypt(encrypted)
      return JSON.parse(decrypted)
    } catch {
      return null
    }
  }

  // Очистка
  clear() {
    this.encryptionKey = null
  }
}

export const secureStorage = new SecureStorage()
Установка зависимости:
bashnpm install crypto-js
npm install -D @types/crypto-js
Шаг 13.2: Biometric Authentication
src/lib/security/biometric.ts:
typescriptclass BiometricAuth {
  // Проверка доступности биометрии
  async isAvailable(): Promise<boolean> {
    if (!window.PublicKeyCredential) {
      return false
    }

    const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
    return available
  }

  // Регистрация биометрии
  async register(userId: string): Promise<boolean> {
    try {
      const challenge = new Uint8Array(32)
      crypto.getRandomValues(challenge)

      const credential = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: {
            name: 'DexSafe Wallet Pro',
            id: window.location.hostname,
          },
          user: {
            id: new TextEncoder().encode(userId),
            name: userId,
            displayName: 'DexSafe User',
          },
          pubKeyCredParams: [
            { alg: -7, type: 'public-key' }, // ES256
          ],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'required',
          },
          timeout: 60000,
        },
      })

      if (credential) {
        // Сохранить credential ID для последующей проверки
        localStorage.setItem('biometric-credential', credential.id)
        return true
      }

      return false
    } catch (error) {
      console.error('Biometric registration failed:', error)
      return false
    }
  }

  // Аутентификация через биометрию
  async authenticate(): Promise<boolean> {
    try {
      const credentialId = localStorage.getItem('biometric-credential')
      if (!credentialId) return false

      const challenge = new Uint8Array(32)
      crypto.getRandomValues(challenge)

      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge,
          allowCredentials: [
            {
              id: Uint8Array.from(atob(credentialId), c => c.charCodeAt(0)),
              type: 'public-key',
            },
          ],
          timeout: 60000,
          userVerification: 'required',
        },
      })

      return assertion !== null
    } catch (error) {
      console.error('Biometric authentication failed:', error)
      return false
    }
  }
}

export const biometricAuth = new BiometricAuth()
Шаг 13.3: Transaction Security Check
src/lib/security/transactionValidator.ts:
typescriptinterface SecurityCheck {
  passed: boolean
  warnings: string[]
  severity: 'low' | 'medium' | 'high'
}

class TransactionValidator {
  // Проверка адреса на фишинг
  async checkAddressReputation(address: string): Promise<SecurityCheck> {
    // TODO: Интеграция с ChainAbuse API или подобными сервисами
    
    // Mock check
    const isKnownPhishing = false // Проверить в базе
    
    return {
      passed: !isKnownPhishing,
      warnings: isKnownPhishing ? ['Адрес помечен как подозрительный'] : [],
      severity: isKnownPhishing ? 'high' : 'low'
    }
  }

  // Проверка суммы (необычно большая)
  checkAmount(amount: number, averageAmount: number): SecurityCheck {
    const ratio = amount / averageAmount
    
    if (ratio > 10) {
      return {
        passed: false,
        warnings: ['Сумма значительно превышает вашу обычную транзакцию'],
        severity: 'high'
      }
    }
    
    if (ratio > 5) {
      return {
        passed: true,
        warnings: ['Сумма больше обычной. Проверьте детали'],
        severity: 'medium'
      }
    }
    
    return {
      passed: true,
      warnings: [],
      severity: 'low'
    }
  }

  // Проверка gas price (необычно высокая)
  checkGasPrice(currentGas: number, networkAverage: number): SecurityCheck {
    const ratio = currentGas / networkAverage
    
    if (ratio > 3) {
      return {
        passed: false,
        warnings: ['Gas price в 3 раза выше среднего по сети'],
        severity: 'high'
      }
    }
    
    if (ratio > 1.5) {
      return {
        passed: true,
        warnings: ['Gas price выше среднего'],
        severity: 'medium'
      }
    }
    
    return {
      passed: true,
      warnings: [],
      severity: 'low'
    }
  }

  // Комплексная проверка транзакции
  async validateTransaction(tx: {
    to: string
    amount: number
    gasPrice: number
  }): Promise<SecurityCheck[]> {
    const checks = await Promise.all([
      this.checkAddressReputation(tx.to),
      this.checkAmount(tx.amount, 100), // TODO: Получить реальную среднюю сумму
      this.checkGasPrice(tx.gasPrice, 20), // TODO: Получить реальную среднюю цену gas
    ])

    return checks
  }
}

export const transactionValidator = new TransactionValidator()

🌍 ЭТАП 14: ЛОКАЛИЗАЦИЯ И МУЛЬТИЧЕЙН (День 18-19)
Шаг 14.1: i18n Setup
Установка:
bashnpm install i18next react-i18next
src/i18n/config.ts:
typescriptimport i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ru from './locales/ru.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    lng: localStorage.getItem('language') || 'ru',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
src/i18n/locales/en.json:
json{
  "common": {
    "send": "Send",
    "receive": "Receive",
    "swap": "Swap",
    "balance": "Balance",
    "confirm": "Confirm",
    "cancel": "Cancel"
  },
  "wallet": {
    "totalBalance": "Total Balance",
    "availableBalance": "Available Balance",
    "tokens": "Tokens"
  },
  "defi": {
    "lending": "DeFi Lending",
    "availableCredit": "Available Credit",
    "getBorrow": "Get Loan",
    "provideLiquidity": "Provide Liquidity"
  },
  "upa": {
    "analyzing": "Analyzing address...",
    "recommendation": "Recommended Route",
    "ecoScore": "Eco Score"
  }
}
src/i18n/locales/ru.json:
json{
  "common": {
    "send": "Отправить",
    "receive": "Получить",
    "swap": "Обмен",
    "balance": "Баланс",
    "confirm": "Подтвердить",
    "cancel": "Отмена"
  },
  "wallet": {
    "totalBalance": "Общий баланс",
    "availableBalance": "Доступный баланс",
    "tokens": "Токены"
  },
  "defi": {
    "lending": "DeFi Кредитование",
    "availableCredit": "Доступный лимит",
    "getBorrow": "Получить займ",
    "provideLiquidity": "Разместить займ"
  },
  "upa": {
    "analyzing": "Анализируем адрес...",
    "recommendation": "Рекомендуемый маршрут",
    "ecoScore": "Eco рейтинг"
  }
}
Шаг 14.2: Multi-Chain Support
src/lib/chains/chainConfig.ts:
typescriptexport interface ChainConfig {
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
src/hooks/useMultiChain.ts:
typescriptimport { useState, useEffect } from 'react'
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

📊 ЭТАП 15: АНАЛИТИКА И МОНИТОРИНГ (День 19-20)
Шаг 15.1: Analytics Integration
src/lib/analytics/tracker.ts:
typescriptclass Analytics {
  private enabled = true

  // Track page view
  trackPageView(pageName: string) {
    if (!this.enabled) return

    // Google Analytics (если нужен)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href,
      })
    }

    // Или собственный backend
    this.sendEvent('page_view', { page: pageName })
  }

  // Track user action
  trackEvent(category: string, action: string, label?: string, value?: number) {
    if (!this.enabled) return

    this.sendEvent('user_action', {
      category,
      action,
      label,
      value,
    })
  }

  // Track transaction
  trackTransaction(type: 'send' | 'receive' | 'swap', details: any) {
    if (!this.enabled) return

    this.sendEvent('transaction', {
      type,
      ...details,
    })
  }

  // Track error
  trackError(error: Error, context?: string) {
    if (!this.enabled) return

    this.sendEvent('error', {
      message: error.message,
      stack: error.stack,
      context,
    })
  }

  private async sendEvent(eventType: string, data: any) {
    try {
      // Отправка на свой backend
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType,
          timestamp: Date.now(),
          ...data,
        }),
      })
    } catch (error) {
      console.error('Analytics tracking failed:', error)
    }
  }

  disable() {
    this.enabled = false
  }

  enable() {
    this.enabled = true
  }
}

export const analytics = new Analytics()
Шаг 15.2: Performance Monitoring
src/lib/monitoring/performance.ts:
typescriptclass PerformanceMonitor {
  // Измерение времени загрузки компонента
  measureComponentLoad(componentName: string) {
    const startTime = performance.now()

    return () => {
      const endTime = performance.now()
      const loadTime = endTime - startTime

      console.log(`${componentName} loaded in ${loadTime.toFixed(2)}ms`)

      // Отправка метрики
      this.reportMetric('component_load', {
        component: componentName,
        duration: loadTime,
      })
    }
  }

  // Измерение времени выполнения API запроса
  async measureApiCall<T>(apiName: string, apiCall: () => Promise<T>): Promise<T> {
    const startTime = performance.now()

    try {
      const result = await apiCall()
      const endTime = performance.now()
      const duration = endTime - startTime

      this.reportMetric('api_call', {
        api: apiName,
        duration,
        status: 'success',
      })

      return result
    } catch (error) {
      const endTime = performance.now()
      const duration = endTime - startTime

      this.reportMetric('api_call', {
        api: apiName,
        duration,
        status: 'error',
      })

      throw error
    }
  }

  private reportMetric(metricType: string, data: any) {
    // TODO: Отправка на backend или сервис мониторинга (Sentry, DataDog)
    console.log(`[Metric] ${metricType}:`, data)
  }
}

export const performanceMonitor = new PerformanceMonitor()

✅ ЭТАП 16: ТЕСТИРОВАНИЕ (День 20-21)
Шаг 16.1: Unit Tests Setup
Установка:
bashnpm install -D vitest @testing-library/react @testing-library/jest-dom
vitest.config.ts:
typescriptimport { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
src/test/setup.ts:
typescriptimport { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
Шаг 16.2: Example Tests
src/components/common/tests/Button.test.tsx:
typescriptimport { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../Button'

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByText('Click me')).toBeDisabled()
  })

  it('shows loading state', () => {
    render(<Button loading>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
package.json scripts:
json{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}

📚 ЭТАП 17: ДОКУМЕНТАЦИЯ (День 21-22)
Шаг 17.1: README.md
README.md:
markdown# 🚀 DexSafe Wallet Pro

Экологичный DeFi кошелек на базе X1 EcoChain с интеллектуальной маршрутизацией (UPA Engine) и поддержкой токенизированных активов (ЦФА).

## ✨ Основные возможности

- 💚 **X1 EcoChain First** - приоритет самой экологичной сети
- 🤖 **UPA Engine** - автоматический выбор оптимального маршрута
- 📈 **Токенизированные активы** - торговля акциями через DEX
- 🏦 **DeFi Кредитование** - займы под залог криптовалюты
- 🔐 **100% Некастодиальность** - полный контроль над ключами
- 🎮 **Геймификация** - миссии, спины, рефералы

## 🛠 Технологический стек

- **Frontend**: React 19, TypeScript 5, Vite 5
- **Styling**: Tailwind CSS 3.4.0
- **State**: Zustand, React Query
- **Web3**: Ethers.js v6, Wagmi
- **Blockchain**: X1 EcoChain, Ethereum, BSC, Polygon, Arbitrum
- **UI/UX**: Framer Motion, Lucide React

## 📦 Установка

\`\`\`bash
# Клонировать репозиторий
git clone https://github.com/your-org/dexsafe-wallet-pro.git
cd dexsafe-wallet-pro

# Установить зависимости
npm install

# Создать .env файл
cp .env.example .env

# Запустить dev сервер
npm run dev
\`\`\`

## 🔧 Конфигурация

Создайте `.env` файл:

\`\`\`bash
VITE_INFURA_KEY=your_infura_key
VITE_UPA_ENGINE_URL=https://upa-engine.dexsafe.io
VITE_X1_RPC_URL=https://rpc.x1-ecochain.network
\`\`\`

## 📱 Telegram Mini App

1. Создайте бота через @BotFather
2. Получите токен
3. Настройте Menu Button:
   \`\`\`
   /setmenubutton
   URL: https://your-app.vercel.app
   Button text: Открыть кошелек
   \`\`\`

## 🚀 Deployment

\`\`\`bash
# Build
npm run build

# Deploy на Vercel
vercel --prod
\`\`\`

## 🧪 Тестирование

\`\`\`bash
# Запустить тесты
npm test

# Coverage
npm run test:coverage
\`\`\`

## 📄 Лицензия

MIT

## 🤝 Контакты

- Website: https://dexsafe.io
- Telegram: @dexsafe_support
- Email: support@dexsafe.io
\`\`\`

### Шаг 17.2: Архитектурная документация

**docs/ARCHITECTURE.md:**
```markdown
# Архитектура DexSafe Wallet Pro

## Обзор

DexSafe Wallet Pro построен по принципу **Adaptive Modular Backend (АМБ)** с **Sidecar UPA Engine**.

## Компоненты системы

### 1. Frontend (React)
- **Презентационный слой** - UI компоненты
- **Бизнес-логика** - Hooks, Stores
- **Web3 слой** - Взаимодействие с блокчейнами

### 2. UPA Engine (Sidecar Service)
- **Address Analyzer** - определение типа адреса
- **Transaction Router** - выбор оптимального маршрута
- **Gas Abstraction** - расчет и оплата комиссий

### 3. Blockchain Layer
- **X1 EcoChain** - основная сеть (приоритет)
- **EVM Chains** - Ethereum, BSC, Polygon, Arbitrum
- **Smart Contracts** - Lending, DEX, Bridge

## Потоки данных

### Отправка токенов (UPA Flow):
\`\`\`
User Input → Address Analyzer → Transaction Router → Gas Abstraction → Blockchain
\`\`\`

### Кредитование:
\`\`\`
Collateral Lock → LTV Calculation → Borrow Request → Smart Contract → Fund Transfer
\`\`\`

## Безопасность

- **Некастодиальность**: Приватные ключи только на устройстве пользователя
- **Шифрование**: AES-256 для хранения
- **Биометрия**: Face ID / Touch ID
- **Transaction Validation**: Проверка адресов на фишинг

## Масштабируемость

- **Multi-chain**: Легкое добавление новых сетей
- **Modular**: Независимые модули (Lending, ЦФА, P2P)
- **Lazy Loading**: Динамическая загрузка модулей
\`\`\`

---

##
🎯 ЭТАП 18: ФИНАЛЬНАЯ ИНТЕГРАЦИЯ И ОПТИМИЗАЦИЯ (День 22-23)
Шаг 18.1: App.tsx (Главная сборка)
src/App.tsx:
typescriptimport { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useTelegram } from './hooks/useTelegram'
import { useWallet } from './hooks/useWallet'
import './i18n/config'

// Pages
import { Balance } from './pages/Balance'
import { DeFi } from './pages/DeFi'
import { Bonuses } from './pages/Bonuses'
import { Settings } from './pages/Settings'
import { Send } from './pages/Send'
import { Receive } from './pages/Receive'
import { Swap } from './pages/Swap'
import { TokenDetail } from './pages/TokenDetail'
import { OnboardingFlow } from './pages/OnboardingFlow'
import { Lock } from './pages/Lock'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  const { isReady, user } = useTelegram()
  const { address, isLocked } = useWallet()

  useEffect(() => {
    // Инициализация темы
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  // Telegram WebApp готовится
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-c-bg-primary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-c-primary mx-auto mb-4" />
          <p className="text-c-text-secondary">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Защищенные маршруты */}
          {!address ? (
            <Route path="*" element={<OnboardingFlow />} />
          ) : isLocked ? (
            <Route path="*" element={<Lock />} />
          ) : (
            <>
              {/* Основные страницы */}
              <Route path="/" element={<Balance />} />
              <Route path="/defi" element={<DeFi />} />
              <Route path="/bonuses" element={<Bonuses />} />
              <Route path="/settings/*" element={<Settings />} />

              {/* Функциональные страницы */}
              <Route path="/send" element={<Send />} />
              <Route path="/receive" element={<Receive />} />
              <Route path="/swap" element={<Swap />} />
              <Route path="/token/:symbol" element={<TokenDetail />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
Шаг 18.2: Onboarding Flow (Первый запуск)
src/pages/OnboardingFlow.tsx:
typescriptimport { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { useWallet } from '../hooks/useWallet'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Key, Leaf } from 'lucide-react'

export const OnboardingFlow = () => {
  const navigate = useNavigate()
  const { createWallet, importWallet } = useWallet()
  const [step, setStep] = useState<'welcome' | 'create' | 'import' | 'backup'>('welcome')
  const [mnemonic, setMnemonic] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

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
                await createWallet()
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
                  await importWallet(mnemonic)
                  navigate('/')
                } catch (error) {
                  alert('Неверная seed-фраза')
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

          {/* Seed phrase (замаскирована) */}
          <div className="p-4 bg-c-bg-secondary rounded-lg">
            <div className="grid grid-cols-2 gap-2">
              {Array(12).fill(0).map((_, i) => (
                <div key={i} className="p-2 bg-c-bg-tertiary rounded text-center">
                  <span className="text-c-text-tertiary text-sm">{i + 1}.</span>
                  <span className="ml-2 text-c-text-primary font-mono">•••••</span>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="lg"
            fullWidth
          >
            Показать seed-фразу
          </Button>

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
Шаг 18.3: Lock Screen (Экран блокировки)
src/pages/Lock.tsx:
typescriptimport { useState } from 'react'
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

🎨 ЭТАП 19: ДОПОЛНИТЕЛЬНЫЕ УЛУЧШЕНИЯ (День 23-24)
Шаг 19.1: Loading States
src/components/common/Skeleton.tsx:
typescriptexport const Skeleton = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`animate-pulse bg-c-bg-tertiary rounded ${className}`} />
  )
}

export const TokenCardSkeleton = () => {
  return (
    <div className="p-4 bg-c-bg-secondary rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-16 h-3" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="w-12 h-4 ml-auto" />
          <Skeleton className="w-16 h-3 ml-auto" />
        </div>
      </div>
    </div>
  )
}
Шаг 19.2: Error Boundaries
src/components/common/ErrorBoundary.tsx:
typescriptimport { Component, ReactNode } from 'react'
import { Button } from './Button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught:', error, errorInfo)
    // TODO: Отправить на Sentry
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-c-bg-primary px-4">
          <div className="text-center space-y-4 max-w-md">
            <div className="text-6xl mb-4">😵</div>
            <h2 className="text-xl font-bold text-c-text-primary">
              Что-то пошло не так
            </h2>
            <p className="text-sm text-c-text-secondary">
              {this.state.error?.message || 'Произошла неожиданная ошибка'}
            </p>
            <Button
              variant="primary"
              onClick={() => window.location.reload()}
            >
              Перезагрузить приложение
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
Шаг 19.3: Toast Notifications
src/components/common/Toast.tsx:
typescriptimport { createContext, useContext, useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
}

interface ToastContextType {
  showToast: (type: Toast['type'], message: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (type: Toast['type'], message: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { id, type, message }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: AlertCircle,
  }

  const colors = {
    success: 'bg-c-success/10 border-c-success text-c-success',
    error: 'bg-c-danger/10 border-c-danger text-c-danger',
    warning: 'bg-c-warning/10 border-c-warning text-c-warning',
    info: 'bg-c-primary/10 border-c-primary text-c-primary',
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = icons[toast.type]
            
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className={`
                  flex items-start gap-3 p-4 rounded-lg border backdrop-blur-sm
                  ${colors[toast.type]}
                  max-w-sm
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <p className="flex-1 text-sm text-c-text-primary">
                  {toast.message}
                </p>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-c-text-tertiary hover:text-c-text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
Обновить App.tsx:
typescriptimport { ToastProvider } from './components/common/Toast'
import { ErrorBoundary } from './components/common/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          {/* ... rest of app */}
        </QueryClientProvider>
      </ToastProvider>
    </ErrorBoundary>
  )
}
```

---

## 📦 ФИНАЛЬНАЯ СТРУКТУРА ПРОЕКТА
```
dexsafe-wallet-pro/
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   ├── pwa-192x192.png
│   └── pwa-512x512.png
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Toggle.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── Toast.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   └── PageContainer.tsx
│   │   ├── balance/
│   │   │   ├── BalanceCard.tsx
│   │   │   ├── ActionButtons.tsx
│   │   │   └── TokenList.tsx
│   │   ├── defi/
│   │   │   ├── LendingCard.tsx
│   │   │   ├── CFATokenCard.tsx
│   │   │   └── LTVIndicator.tsx
│   │   ├── upa/
│   │   │   ├── AddressAnalyzer.tsx
│   │   │   ├── RouteRecommendation.tsx
│   │   │   └── GasAbstraction.tsx
│   │   └── bonuses/
│   │       ├── MissionsCard.tsx
│   │       └── ReferralCard.tsx
│   ├── pages/
│   │   ├── Balance.tsx
│   │   ├── DeFi.tsx
│   │   ├── Bonuses.tsx
│   │   ├── Settings.tsx
│   │   ├── Send.tsx
│   │   ├── Receive.tsx
│   │   ├── Swap.tsx
│   │   ├── TokenDetail.tsx
│   │   ├── OnboardingFlow.tsx
│   │   └── Lock.tsx
│   ├── hooks/
│   │   ├── useWallet.ts
│   │   ├── useUPA.ts
│   │   ├── useMultiChain.ts
│   │   └── useTelegram.ts
│   ├── store/
│   │   ├── walletStore.ts
│   │   ├── upaStore.ts
│   │   ├── defiStore.ts
│   │   └── settingsStore.ts
│   ├── lib/
│   │   ├── api/
│   │   │   ├── x1chain.ts
│   │   │   ├── upaEngine.ts
│   │   │   └── priceOracle.ts
│   │   ├── chains/
│   │   │   └── chainConfig.ts
│   │   ├── security/
│   │   │   ├── secureStorage.ts
│   │   │   ├── biometric.ts
│   │   │   └── transactionValidator.ts
│   │   ├── analytics/
│   │   │   └── tracker.ts
│   │   └── monitoring/
│   │       └── performance.ts
│   ├── i18n/
│   │   ├── config.ts
│   │   └── locales/
│   │       ├── en.json
│   │       └── ru.json
│   ├── types/
│   │   └── index.ts
│   ├── test/
│   │   └── setup.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── docs/
│   └── ARCHITECTURE.md
├── .env.example
├── .gitignore
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── README.md

✅ ЧЕКЛИСТ ФИНАЛЬНОЙ ПРОВЕРКИ
Функциональность

 Создание/импорт кошелька работает
 Отправка/получение токенов
 UPA Flow корректно определяет маршруты
 DeFi кредитование (UI готов)
 ЦФА токены отображаются
 Геймификация (миссии, рефералы)
 Настройки сохраняются
 Multi-chain переключение

Безопасность

 Приватные ключи зашифрованы
 Биометрия работает (если доступна)
 Auto-lock срабатывает
 Transaction validation проверяет адреса

UX/UI

 Dark theme применена везде
 Бирюзовый акцент (#00E0BE) используется
 Все кнопки имеют hover states
 Loading states показываются
 Error states обработаны
 Toast notifications работают

Performance

 Lazy loading модулей
 Code splitting настроен
 Images оптимизированы
 Bundle size < 1MB

Telegram Integration

 WebApp SDK подключен
 Пользователь определяется
 Цвета темы синхронизированы
 Кнопки навигации работают

Deployment

 .env variables настроены
 Build проходит без ошибок
 Vercel deployment успешен
 PWA manifest корректен


🚀 СЛЕДУЮЩИЕ ШАГИ (POST-MVP)
Backend Интеграция (После фронтенда)

UPA Engine API - реальная маршрутизация
Lending Smart Contracts - X1 EcoChain
ЦФА DEX Integration - подключение к X1 DEX
P2P Escrow - on-chain контракты

Дополнительные Функции

NFT Marketplace - покупка/продажа NFT
Staking - стейкинг токенов с APY
Bridge - мосты между сетями
DApp Browser - встроенный браузер для DApps
Portfolio Tracker - детальная аналитика портфеля
Price Alerts - уведомления о изменении цены
Transaction History Export - экспорт в CSV/PDF
Hardware Wallet Support - Ledger/Trezor
Multi-Signature - мультиподпись для безопасности
Social Recovery - восстановление через друзей

Масштабирование

Browser Extension (Chrome, Firefox, Edge, Brave)
Mobile Native Apps (iOS, Android)
Desktop Apps (Windows, macOS, Linux)
Watch-Only Wallets - отслеживание без приватных ключей


📝 ПАМЯТКА ПО ЗАПУСКУ
Быстрый старт (локально)
bash# 1. Клонировать и установить
git clone <repo-url>
cd dexsafe-wallet-pro
npm install

# 2. Настроить .env
cp .env.example .env
# Отредактировать .env с вашими ключами

# 3. Запустить dev сервер
npm run dev

# 4. Открыть в браузере
# http://localhost:3000
Тестирование в Telegram
bash# 1. Создать туннель через ngrok
npm install -g ngrok
ngrok http 3000

# 2. Скопировать HTTPS URL из ngrok

# 3. В Telegram открыть @BotFather
# /setmenubutton
# Вставить ngrok URL
# Сохранить

# 4. Открыть бота и нажать кнопку меню
Production Deploy (Vercel)
bash# 1. Установить Vercel CLI
npm i -g vercel

# 2. Войти
vercel login

# 3. Deploy
vercel --prod

# 4. Настроить Environment Variables в Vercel Dashboard
# - VITE_INFURA_KEY
# - VITE_UPA_ENGINE_URL
# - VITE_X1_RPC_URL

# 5. Обновить URL в @BotFather
# /setmenubutton
# Вставить Vercel URL

🔧 TROUBLESHOOTING
Проблема: Telegram WebApp SDK не загружается
Решение:
typescript// Добавить в index.html перед закрывающим </head>
<script src="https://telegram.org/js/telegram-web-app.js"></script>

// Или в main.tsx добавить проверку
if (!window.Telegram) {
  console.error('Telegram WebApp SDK not loaded')
}
Проблема: Ethers.js ошибки в браузере
Решение:
typescript// vite.config.ts - добавить polyfills
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  }
})
Проблема: Tailwind classes не применяются
Решение:
javascript// tailwind.config.js - проверить content paths
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Должны быть включены все файлы
  ],
}
Проблема: localStorage не работает в Telegram iOS
Решение:
typescript// Использовать sessionStorage или Telegram.WebApp.CloudStorage
const storage = window.Telegram?.WebApp?.CloudStorage || sessionStorage

📊 МЕТРИКИ УСПЕХА (KPI)
Технические

Время загрузки: < 2 секунды
Bundle size: < 1 MB
Lighthouse Score: > 90
Error rate: < 1%

Продуктовые

User Retention (D7): > 40%
Transaction Success Rate: > 95%
Average Session Duration: > 5 минут
Daily Active Users: Рост 10% месяц к месяцу

DeFi Метрики

TVL (Total Value Locked): Рост
Lending Utilization Rate: > 60%
ЦФА Trading Volume: Рост


🎯 ROADMAP (6 месяцев)
Месяц 1-2: MVP (Текущий этап)

 Базовый кошелек (send/receive/swap)
 Telegram Mini App
 UPA Flow (UI)
 DeFi/ЦФА (UI)
 Backend интеграция

Месяц 3: Полная интеграция

 UPA Engine (реальный API)
 Lending Smart Contracts
 ЦФА DEX подключение
 P2P Escrow

Месяц 4: Browser Extension

 Chrome Extension
 Firefox Add-on
 Sync между устройствами

Месяц 5: Mobile Native

 iOS App (React Native)
 Android App (React Native)
 Push notifications

Месяц 6: Advanced Features

 NFT Marketplace
 Portfolio Analytics
 Hardware Wallet Support
 Multi-signature


📚 ДОПОЛНИТЕЛЬНЫЕ РЕСУРСЫ
Документация

React: https://react.dev
Ethers.js: https://docs.ethers.org/v6
Telegram WebApp: https://core.telegram.org/bots/webapps
Tailwind CSS: https://tailwindcss.com/docs
Framer Motion: https://www.framer.com/motion

Инструменты

Vercel: https://vercel.com
Infura: https://infura.io
CoinMarketCap API: https://coinmarketcap.com/api
Sentry (мониторинг): https://sentry.io

Комьюнити

Telegram: @dexsafe_dev
Discord: discord.gg/dexsafe
GitHub: github.com/dexsafe/wallet-pro


🔐 БЕЗОПАСНОСТЬ CHECKLIST
Code Security

 Нет hardcoded приватных ключей
 Все API keys в .env
 Input validation везде
 XSS protection
 CSRF protection (для backend)

Wallet Security

 Приватные ключи зашифрованы AES-256
 Seed phrase показывается только при подтверждении
 Auto-lock через N минут
 Биометрия для разблокировки
 Transaction confirmation modals

Smart Contract Security

 Audited contracts (перед prod)
 Multi-signature для admin functions
 Emergency pause mechanism
 Rate limiting для withdrawals


💡 BEST PRACTICES
React
typescript// ✅ DO: Используй хуки правильно
const [state, setState] = useState(initialValue)
useEffect(() => {
  // cleanup
  return () => cleanup()
}, [dependencies])

// ❌ DON'T: Не мутируй state напрямую
state.value = newValue // WRONG
setState({ ...state, value: newValue }) // CORRECT
TypeScript
typescript// ✅ DO: Типизируй все
interface Token {
  symbol: string
  balance: number
  price: number
}

// ❌ DON'T: Не используй any
const data: any = await api.call() // WRONG
const data: Token = await api.call() // CORRECT
Web3
typescript// ✅ DO: Проверяй сеть перед транзакцией
const chainId = await provider.getNetwork()
if (chainId.chainId !== expectedChainId) {
  throw new Error('Wrong network')
}

// ✅ DO: Используй try-catch для всех blockchain calls
try {
  const tx = await contract.transfer(to, amount)
  await tx.wait()
} catch (error) {
  console.error('Transaction failed:', error)
}
Performance
typescript// ✅ DO: Мемоизируй тяжелые вычисления
const expensiveValue = useMemo(() => {
  return heavyCalculation(data)
}, [data])

// ✅ DO: Используй lazy loading
const DeFiPage = lazy(() => import('./pages/DeFi'))

// ✅ DO: Debounce user input
const debouncedSearch = useMemo(
  () => debounce(handleSearch, 300),
  []
)

🎨 UI/UX GUIDELINES
Цветовое кодирование
typescript// Используй семантические цвета
const STATUS_COLORS = {
  success: 'text-c-success',    // Положительные действия
  danger: 'text-c-danger',      // Опасные действия, ошибки
  warning: 'text-c-warning',    // Предупреждения
  info: 'text-c-primary',       // Информационные блоки
  neutral: 'text-c-text-secondary' // Нейтральная информация
}
Анимации
typescript// Используй единые timing functions
const ANIMATION_TIMINGS = {
  fast: 150,   // Hover effects, tooltips
  normal: 300, // Modals, slides
  slow: 500,   // Page transitions
}

// Framer Motion variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
}
Accessibility
typescript// ✅ Всегда добавляй aria-labels
<button aria-label="Отправить токены">
  <Send className="w-5 h-5" />
</button>

// ✅ Keyboard navigation
<div
  role="button"
  tabIndex={0}
  onKeyPress={(e) => e.key === 'Enter' && handleClick()}
>
  Clickable div
</div>

🧪 ТЕСТОВЫЕ ДАННЫЕ
Mock Wallets (для тестирования)
typescript// Testnet wallet с балансом
export const TEST_WALLET = {
  address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  mnemonic: 'test test test test test test test test test test test junk',
  // НЕ ИСПОЛЬЗОВАТЬ В PRODUCTION!
}

// Mock tokens
export const MOCK_TOKENS = [
  { symbol: 'ETH', balance: 0.5, price: 2345.67 },
  { symbol: 'USDT', balance: 1000, price: 1.00 },
  { symbol: 'BNB', balance: 2.5, price: 305.45 },
]

// Mock ЦФА
export const MOCK_CFA_TOKENS = [
  { symbol: 'AAPL', name: 'Apple Inc', price: 178.45, change24h: 1.2 },
  { symbol: 'TSLA', name: 'Tesla', price: 245.67, change24h: -0.8 },
]
Test Scenarios
typescript// Сценарий 1: Первый запуск
// 1. Открыть приложение
// 2. Нажать "Создать кошелек"
// 3. Ввести пароль
// 4. Сохранить seed-фразу
// 5. Попасть на Balance screen

// Сценарий 2: Отправка токенов (UPA Flow)
// 1. Нажать "Отправить"
// 2. Ввести адрес
// 3. Дождаться UPA анализа
// 4. Увидеть рекомендацию маршрута
// 5. Подтвердить транзакцию

// Сценарий 3: DeFi кредитование
// 1. Перейти на вкладку DeFi
// 2. Нажать "Получить займ"
// 3. Выбрать залоговый актив
// 4. Увидеть LTV и цену ликвидации
// 5. Подтвердить займ
```

---

## 📞 КОНТАКТЫ И ПОДДЕРЖКА

### Разработка
- **Tech Lead**: @your_telegram
- **Frontend Team**: @frontend_team
- **Backend Team**: @backend_team

### Поддержка пользователей
- **Telegram Support**: @dexsafe_support
- **Email**: support@dexsafe.io
- **FAQ**: https://docs.dexsafe.io/faq

### Баг-репорты
- **GitHub Issues**: github.com/dexsafe/wallet-pro/issues
- **Priority**: Critical → High → Medium → Low
- **Template**: 
```
  **Описание**: Что произошло
  **Шаги воспроизведения**: 1, 2, 3
  **Ожидаемый результат**: Что должно было быть
  **Скриншоты**: Если есть
  **Окружение**: Browser/OS/Version

🎉 ЗАКЛЮЧЕНИЕ
Вы получили полный, детальный и структурированный план разработки DexSafe Wallet Pro.
Что у вас есть:
✅ Четкая архитектура - АМБ с Sidecar UPA Engine
✅ Дизайн-система - Dark theme с бирюзовым акцентом
✅ Компонентная база - Готовые UI компоненты
✅ 18 этапов разработки - От setup до deployment
✅ Безопасность - Шифрование, биометрия, валидация
✅ Multi-chain support - X1 EcoChain + EVM сети
✅ UPA Flow - Интеллектуальная маршрутизация
✅ DeFi & ЦФА - Кредитование и токенизированные активы
✅ Геймификация - Миссии, спины, рефералы
✅ Telegram интеграция - Mini App готов к запуску
Следующие шаги:

Скопировать этот план в свой .md файл
Создать проект: npm create vite@latest
Установить зависимости из Этапа 1
Следовать этапам последовательно
Тестировать постоянно на каждом этапе
Deploy на Vercel когда готов MVP

Успехов в разработке! 🚀
P.S. Этот план - живой документ. Обновляйте его по мере развития проекта, добавляйте свои улучшения и делитесь с командой.