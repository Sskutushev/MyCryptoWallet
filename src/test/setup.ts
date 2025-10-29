import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import { webcrypto } from 'crypto'

// Polyfill for crypto.getRandomValues
if (typeof global.crypto === 'undefined') {
  (global as any).crypto = webcrypto;
}
if (typeof global.crypto.getRandomValues === 'undefined') {
  global.crypto.getRandomValues = (arr: any) => {
    return webcrypto.getRandomValues(arr);
  };
}

expect.extend(matchers)

afterEach(() => {
  cleanup()
})