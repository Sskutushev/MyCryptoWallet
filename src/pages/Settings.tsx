import { PageContainer } from '../components/layout/PageContainer'
import { Card } from '../components/common/Card'
import { Toggle } from '../components/common/Toggle'
import { Button } from '../components/common/Button'
import { 
  User, 
  Shield, 
  Globe, 
  LogOut,
  ChevronRight,
  HelpCircle 
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSettingsStore } from '../store/settingsStore'

interface SettingItem {
  label: string;
  path?: string;
  type?: 'toggle' | 'select';
  value?: any;
  options?: readonly string[];
  onChange?: ((val: string) => void) | ((val: boolean) => void);
}

interface SettingSection {
  title: string;
  icon: any; // LucideIcon type
  items: SettingItem[];
}

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

  const settingSections: SettingSection[] = [
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
          onChange: (val: string) => setCurrency(val as 'USD' | 'EUR' | 'RUB')
        },
        { 
          label: 'Язык', 
          value: language,
          type: 'select',
          options: ['en', 'ru'] as const,
          onChange: (val: string) => setLanguage(val as 'en' | 'ru')
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
          onChange: (val: boolean) => toggleBiometric()
        },
        {
          label: 'Уведомления',
          type: 'toggle',
          value: notificationsEnabled,
          onChange: (val: boolean) => toggleNotifications()
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
                          onChange={item.onChange as (enabled: boolean) => void}
                        />
                      </div>
                    ) : item.type === 'select' && item.options ? (
                      <div className="flex items-center justify-between p-3">
                        <span className="text-c-text-primary">{item.label}</span>
                        <select
                          value={item.value as string}
                          onChange={(e) => (item.onChange as (val: string) => void)?.(e.target.value as string)}
                          className="px-3 py-1 bg-c-bg-tertiary border border-c-border rounded text-c-text-primary"
                        >
                          {item.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : item.path ? (
                      <button
                        onClick={() => navigate(item.path!)}
                        className="w-full flex items-center justify-between p-3 hover:bg-c-bg-tertiary transition-colors"
                      >
                        <span className="text-c-text-primary">{item.label}</span>
                        <ChevronRight className="w-5 h-5 text-c-text-tertiary" />
                      </button>
                    ) : null}
                    
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