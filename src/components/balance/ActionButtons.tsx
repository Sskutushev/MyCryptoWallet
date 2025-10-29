import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight } from 'lucide-react'

export const ActionButtons = memo(() => {
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
})