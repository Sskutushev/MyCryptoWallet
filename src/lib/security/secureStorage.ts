import CryptoJS from 'crypto-js'

class SecureStorage {
  private encryptionKey: string | null = null

  // Инициализация с паролем пользователя
  initialize(password: string) {
    // Используем PBKDF2 для создания ключа из пароля
    this.encryptionKey = CryptoJS.PBKDF2(password, 'dexsafe-salt', {
      keySize: 256 / 32,
      iterations: 10000
    }).toString()
  }

  // Шифрование данных
  encrypt(data: string): string {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not initialized')
    }

    return CryptoJS.AES.encrypt(data, this.encryptionKey).toString()
  }

  // Расшифровка данных
  decrypt(encryptedData: string): string {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not initialized')
    }

    const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey)
    return bytes.toString(CryptoJS.enc.Utf8)
  }

  // Сохранение в localStorage (зашифровано)
  setItem(key: string, value: any) {
    const encrypted = this.encrypt(JSON.stringify(value))
    localStorage.setItem(key, encrypted)
  }

  // Получение из localStorage (расшифровка)
  getItem<T>(key: string): T | null {
    const encrypted = localStorage.getItem(key)
    if (!encrypted) return null

    try {
      const decrypted = this.decrypt(encrypted)
      return JSON.parse(decrypted)
    } catch {
      return null
    }
  }

  // Очистка
  clear() {
    this.encryptionKey = null
  }
}

export const secureStorage = new SecureStorage()