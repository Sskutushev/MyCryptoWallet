import { useNavigate, useLocation } from 'react-router-dom'
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