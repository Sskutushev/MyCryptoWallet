import { useState } from 'react'

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  photo_url?: string
}

export const useTelegram = () => {
  console.log('useTelegram: Hook initialized')
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [headerColor, setHeaderColor] = useState('#12141A')
  const [backgroundColor, setBackgroundColor] = useState('#12141A')

  // Attempt to parse Telegram-like initData from URL for user info if available
  // This useEffect will run once on mount
  useState(() => {
    console.log('useTelegram: Initializing for web app')
    const urlParams = new URLSearchParams(window.location.search);
    const initDataRaw = urlParams.get('tgWebAppInitData');
    if (initDataRaw) {
      try {
        // Note: In real scenarios, initData should be validated server-side
        const decodedInitData = Object.fromEntries(new URLSearchParams(initDataRaw));
        // Basic parsing for user data - adjust as per actual initData structure
        if (decodedInitData.user) {
          const parsedUser = JSON.parse(decodedInitData.user);
          setUser(parsedUser);
          console.log('useTelegram: Parsed user from initData', parsedUser);
        }
      } catch (e) {
        console.error('useTelegram: Failed to parse initData from URL', e);
      }
    }
    // For a generic web app, colors are set via CSS or theme context directly
    // setHeaderColor and setBackgroundColor are no longer Telegram SDK specific
    // They now control component-level state if needed
  }); // Empty dependency array, runs once

  // Function for updating theme colors (now controls local state)
  const updateThemeColors = (newHeaderColor: string, newBackgroundColor: string) => {
    setHeaderColor(newHeaderColor)
    setBackgroundColor(newBackgroundColor)
  }

  // Functions adapted for generic web context
  const hideKeyboard = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  const hapticFeedback = (type: 'impact' | 'notification' | 'selection' = 'impact', impactStyle: 'light' | 'medium' | 'heavy' = 'medium') => {
    // No haptic feedback in generic web apps unless custom implemented
    console.log(`Haptic Feedback: ${type} - ${impactStyle}`)
  }

  const showAlert = (message: string) => {
    alert(message)
  }

  const showConfirm = (message: string, callback: (confirmed: boolean) => void) => {
    const confirmed = confirm(message)
    callback(confirmed)
  }

  // showPopup will need a custom React Modal component or be replaced by showAlert/showConfirm
  const showPopup = (params: { title?: string, message: string, buttons?: Array<{ id: string, type?: 'default' | 'destructive' | 'ok' }> }, callback?: (buttonId: string) => void) => {
    console.warn('showPopup not fully implemented for generic web app. Using alert instead.')
    showAlert(params.message);
    if (callback && params.buttons && params.buttons.length > 0) {
        // Mocking a button click for popup
        callback(params.buttons[0].id);
    }
  }

  const close = () => {
    window.close() // Closes current window/tab
  }

  const openLink = (url: string) => {
    window.open(url, '_blank') // Opens in new tab
  }

  const openTelegramLink = (url: string) => {
    window.open(url, '_blank') // Opens Telegram link in new tab, user navigates
  }

  // Cloud storage functionalities are Telegram-specific and cannot be replicated directly in a generic web app
  const setCloudStorageValue = (_key: string, _value: string, callback?: (error?: string) => void) => {
    console.warn('CloudStorage is Telegram-specific and not available in generic web app.')
    callback?.('CloudStorage not available')
  }

  const getCloudStorageValue = (_key: string, callback?: (error: string | null, value: string | null) => void) => {
    console.warn('CloudStorage is Telegram-specific and not available in generic web app.')
    callback?.('CloudStorage not available', null)
  }

  return {
    user,
    webApp: null, // No Telegram WebApp object in generic context
    isReady: true,
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
    toggleExpand: () => console.warn('toggleExpand is Telegram-specific and not available in generic web app.'),
    setCloudStorageValue,
    getCloudStorageValue,
  }
}