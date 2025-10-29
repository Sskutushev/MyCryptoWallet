interface Window {
  Telegram?: { 
    WebApp?: { 
      version?: string;
      sendData: (data: string) => void;
      initDataUnsafe?: any;
      themeParams?: any;
      ready: () => void;
      expand: () => void;
      setHeaderColor: (color: string) => void;
      setBackgroundColor: (color: string) => void;
      HapticFeedback?: { 
        impactOccurred: (style: 'light' | 'medium' | 'heavy') => void;
        notificationOccurred: (type: 'success' | 'warning' | 'error') => void;
        selectionChanged: () => void;
      };
      showAlert: (message: string) => void;
      showConfirm: (message: string, callback: (confirmed: boolean) => void) => void;
      showPopup: (params: { title?: string, message: string, buttons?: Array<{ id: string, type?: 'default' | 'destructive' | 'ok' }> }, callback?: (buttonId: string) => void) => void;
      close: () => void;
      openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
      openTelegramLink: (url: string) => void;
      clipboard?: { 
        writeText: (text: string) => Promise<void>;
      };
      CloudStorage?: { 
        setItem: (key: string, value: string, callback?: (error?: string) => void) => void;
        getItem: (key: string, callback?: (error: string | null, value: string | null) => void) => void;
      };
    };
  };
}
