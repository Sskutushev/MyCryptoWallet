import { useEffect, useState } from 'react'

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  photo_url?: string
}

interface ThemeParams {
  bg_color?: string
  text_color?: string
  hint_color?: string
  link_color?: string
  button_color?: string
  button_text_color?: string
}

export const useTelegram = () => {
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [webApp, setWebApp] = useState<any>(null)
  const [theme, setTheme] = useState<ThemeParams>({})
  const [isReady, setIsReady] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [headerColor, setHeaderColor] = useState('#12141A')
  const [backgroundColor, setBackgroundColor] = useState('#12141A')

  useEffect(() => {
    // Проверяем доступность Telegram WebApp
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp

      // Инициализация
      tg.ready()
      tg.expand()
      setIsExpanded(true)

      // Получаем данные пользователя
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user as TelegramUser)
      }

      // Получаем параметры темы
      if (tg.themeParams) {
        setTheme(tg.themeParams)
      }

      // Настраиваем цвета под тему DexSafe (с проверкой версии)
      const minVersionForColorSupport = '6.1' // Примерная версия, где появилась поддержка
      if (tg.version && tg.version >= minVersionForColorSupport) {
        tg.setHeaderColor('#12141A')
        tg.setBackgroundColor('#12141A')
      }
      setHeaderColor('#12141A')
      setBackgroundColor('#12141A')

      // Устанавливаем WebApp объект для дальнейшего использования
      setWebApp(tg)

      setIsReady(true)
    }
  }, [])

  // Функция для обновления цветов темы
  const updateThemeColors = (headerColor: string, backgroundColor: string) => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      const minVersionForColorSupport = '6.1'
      if (tg.version && tg.version >= minVersionForColorSupport) {
        tg.setHeaderColor(headerColor)
        tg.setBackgroundColor(backgroundColor)
      }
    }
  }

  // Функция для скрытия клавиатуры
  const hideKeyboard = () => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
    if (window.Telegram?.WebApp?.hideKeyboard) {
      window.Telegram.WebApp.hideKeyboard()
    } else if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  // Функция для вызова haptic feedback
  const hapticFeedback = (type: 'impact' | 'notification' | 'selection' = 'impact', impactStyle: 'light' | 'medium' | 'heavy' = 'medium') => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      if (type === 'impact') {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(impactStyle)
      } else if (type === 'notification') {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success') // или 'error', 'warning'
      } else if (type === 'selection') {
        window.Telegram.WebApp.HapticFeedback.selectionChanged()
      }
    }
  }

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

  const showPopup = (params: { title?: string, message: string, buttons?: Array<{ id: string, type?: 'default' | 'destructive' | 'ok' }> }, callback?: (buttonId: string) => void) => {
    window.Telegram?.WebApp?.showPopup(params, callback)
  }

  const close = () => {
    window.Telegram?.WebApp?.close()
  }

  const openLink = (url: string, options?: { try_instant_view?: boolean }) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openLink(url, options)
    } else {
      window.open(url, '_blank')
    }
  }

  const openTelegramLink = (url: string) => {
    window.Telegram?.WebApp?.openTelegramLink(url)
  }

  // Функция для сворачивания/разворачивания приложения
  const toggleExpand = () => {
    if (window.Telegram?.WebApp) {
      if (isExpanded) {
        window.Telegram.WebApp.close()
      } else {
        window.Telegram.WebApp.expand()
        setIsExpanded(true)
      }
    }
  }

  // Функция для установки значения в облаке
  const setCloudStorageValue = (key: string, value: string, callback?: (error?: string) => void) => {
    window.Telegram?.WebApp?.CloudStorage?.setItem(key, value, callback)
  }

  // Функция для получения значения из облака
  const getCloudStorageValue = (key: string, callback?: (error: string | null, value: string | null) => void) => {
    window.Telegram?.WebApp?.CloudStorage?.getItem(key, callback)
  }

  return {
    user,
    webApp,
    theme,
    isReady,
    isExpanded,
    headerColor,
    backgroundColor,
    updateThemeColors,
    hideKeyboard,
    hapticFeedback,
    showAlert,
    showConfirm,
    showPopup,
    close,
    openLink,
    openTelegramLink,
    toggleExpand,
    setCloudStorageValue,
    getCloudStorageValue,
  }
}