import { PageContainer } from '../components/layout/PageContainer'
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
          options: ['USD', 'EUR', 'RUB'] as const,
          onChange: (val: string) => setCurrency(val as any)
        },
        { 
          label: 'Язык', 
          value: language,
          type: 'select',
          options: ['en', 'ru'] as const,
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
                          {(item.options as readonly string[]).map((opt) => (
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