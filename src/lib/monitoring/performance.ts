class PerformanceMonitor {
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