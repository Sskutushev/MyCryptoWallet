class BiometricAuth {
  // Проверка доступности биометрии
  async isAvailable(): Promise<boolean> {
    if (!window.PublicKeyCredential) {
      return false
    }

    const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
    return available
  }

  // Регистрация биометрии
  async register(userId: string): Promise<boolean> {
    try {
      const challenge = new Uint8Array(32)
      crypto.getRandomValues(challenge)

      const credential = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: {
            name: 'DexSafe Wallet Pro',
            id: window.location.hostname,
          },
          user: {
            id: new TextEncoder().encode(userId),
            name: userId,
            displayName: 'DexSafe User',
          },
          pubKeyCredParams: [
            { alg: -7, type: 'public-key' }, // ES256
          ],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'required',
          },
          timeout: 60000,
        },
      })

      if (credential) {
        // Сохранить credential ID для последующей проверки
        localStorage.setItem('biometric-credential', credential.id)
        return true
      }

      return false
    } catch (error) {
      console.error('Biometric registration failed:', error)
      return false
    }
  }

  // Аутентификация через биометрию
  async authenticate(): Promise<boolean> {
    try {
      const credentialId = localStorage.getItem('biometric-credential')
      if (!credentialId) return false

      const challenge = new Uint8Array(32)
      crypto.getRandomValues(challenge)

      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge,
          allowCredentials: [
            {
              id: Uint8Array.from(atob(credentialId), c => c.charCodeAt(0)),
              type: 'public-key',
            },
          ],
          timeout: 60000,
          userVerification: 'required',
        },
      })

      return assertion !== null
    } catch (error) {
      console.error('Biometric authentication failed:', error)
      return false
    }
  }
}

export const biometricAuth = new BiometricAuth()