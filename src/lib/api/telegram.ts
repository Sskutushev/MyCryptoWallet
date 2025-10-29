/// <reference types="../types/telegram" />

// Telegram WebApp API Service
class TelegramService {
  constructor() {
    // Инициализация Telegram WebApp API
    this.init()
  }

  private init() {
    // Автоматическая инициализация через useTelegram hook
    console.log('TelegramService initialized')
  }

  // Проверяет, запущено ли приложение в Telegram
  isRunningInTelegram(): boolean {
    return Boolean(window.Telegram?.WebApp)
  }

  // Возвращает информацию о версии Telegram WebApp
  getWebAppVersion(): string | null {
    if (window.Telegram?.WebApp) {
      return window.Telegram.WebApp.version
    }
    return null
  }

  // Проверяет, поддерживает ли текущая версия Telegram WebApp нужные функции
  isVersionSupported(minVersion: string): boolean {
    const currentVersion = this.getWebAppVersion()
    if (!currentVersion) return false

    // Простая проверка версии (в реальном приложении может быть сложнее)
    return currentVersion >= minVersion
  }

  // Отправляет события аналитики в Telegram
  trackEvent(eventName: string, eventData?: Record<string, any>) {
    if (window.Telegram?.WebApp) {
      // В реальном приложении тут будет вызов Telegram.WebApp.Analytics
      console.log('Tracking event:', eventName, eventData)
    }
  }

  // Работа с буфером обмена (Telegram безопасный способ)
  async copyToClipboard(text: string): Promise<boolean> {
    if (this.isRunningInTelegram() && window.Telegram?.WebApp?.clipboard) {
      try {
        await window.Telegram.WebApp.clipboard.writeText(text)
        return true
      } catch (error) {
        console.error('Failed to copy to clipboard:', error)
        return false
      }
    } else {
      // Резервный метод для браузера
      try {
        await navigator.clipboard.writeText(text)
        return true
      } catch (error) {
        console.error('Failed to copy to clipboard:', error)
        return false
      }
    }
  }

  // Отправка данных в Telegram
  sendData(data: string) {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.sendData(data)
    }
  }

  // Получение параметров запуска
  getStartParam(): string | null {
    if (window.Telegram?.WebApp) {
      return window.Telegram.WebApp.initDataUnsafe?.start_param || null
    }
    return null
  }

  // Проверка, является ли пользователь администратором чата
  isAdmin(): boolean {
    if (window.Telegram?.WebApp) {
      return window.Telegram.WebApp.initDataUnsafe?.chat?.type === 'supergroup' || 
             window.Telegram.WebApp.initDataUnsafe?.chat?.type === 'group'
    }
    return false
  }
}

export const telegramService = new TelegramService()