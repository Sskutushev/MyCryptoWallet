interface SecurityCheck {
  passed: boolean
  warnings: string[]
  severity: 'low' | 'medium' | 'high'
}

class TransactionValidator {
  // Проверка адреса на фишинг
  async checkAddressReputation(address: string): Promise<SecurityCheck> {
    // TODO: Интеграция с ChainAbuse API или подобными сервисами
    
    // Mock check
    const isKnownPhishing = false // Проверить в базе
    
    return {
      passed: !isKnownPhishing,
      warnings: isKnownPhishing ? ['Адрес помечен как подозрительный'] : [],
      severity: isKnownPhishing ? 'high' : 'low'
    }
  }

  // Проверка суммы (необычно большая)
  checkAmount(amount: number, averageAmount: number): SecurityCheck {
    const ratio = amount / averageAmount
    
    if (ratio > 10) {
      return {
        passed: false,
        warnings: ['Сумма значительно превышает вашу обычную транзакцию'],
        severity: 'high'
      }
    }
    
    if (ratio > 5) {
      return {
        passed: true,
        warnings: ['Сумма больше обычной. Проверьте детали'],
        severity: 'medium'
      }
    }
    
    return {
      passed: true,
      warnings: [],
      severity: 'low'
    }
  }

  // Проверка gas price (необычно высокая)
  checkGasPrice(currentGas: number, networkAverage: number): SecurityCheck {
    const ratio = currentGas / networkAverage
    
    if (ratio > 3) {
      return {
        passed: false,
        warnings: ['Gas price в 3 раза выше среднего по сети'],
        severity: 'high'
      }
    }
    
    if (ratio > 1.5) {
      return {
        passed: true,
        warnings: ['Gas price выше среднего'],
        severity: 'medium'
      }
    }
    
    return {
      passed: true,
      warnings: [],
      severity: 'low'
    }
  }

  // Комплексная проверка транзакции
  async validateTransaction(tx: {
    to: string
    amount: number
    gasPrice: number
  }): Promise<SecurityCheck[]> {
    const checks = await Promise.all([
      this.checkAddressReputation(tx.to),
      this.checkAmount(tx.amount, 100), // TODO: Получить реальную среднюю сумму
      this.checkGasPrice(tx.gasPrice, 20), // TODO: Получить реальную среднюю цену gas
    ])

    return checks
  }
}

export const transactionValidator = new TransactionValidator()