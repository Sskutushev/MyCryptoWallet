class Analytics {
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