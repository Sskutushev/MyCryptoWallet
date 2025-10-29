import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useWallet } from './useWallet'
import { secureStorage } from '../lib/security/secureStorage'
import { ethers } from 'ethers'

// Mock secureStorage
vi.mock('../lib/security/secureStorage', () => {
  let store: Record<string, string> = {}
  return {
    secureStorage: {
      setItem: (key: string, value: any) => { store[key] = JSON.stringify(value) },
      getItem: (key: string) => store[key] || null,
      removeItem: (key: string) => { delete store[key] },
      clear: () => { store = {} },
    }
  }
})

describe('useWallet Hook', () => {
  const testPassword = 'password123'
  const testMnemonic = 'test junk utility logic rabbit direct hurry clap field program spatial rigid'
  const testWallet = ethers.Wallet.fromPhrase(testMnemonic)

  beforeEach(() => {
    vi.spyOn(ethers.Wallet, 'createRandom').mockReturnValue(testWallet)
    vi.spyOn(ethers.Wallet, 'fromPhrase').mockImplementation((mnemonic) => {
      if (mnemonic === testMnemonic) return testWallet;
      throw new Error('Invalid mnemonic');
    });
    vi.spyOn(ethers.Wallet, 'fromEncryptedJson').mockImplementation(async (json, password) => {
      if (password === testPassword) return testWallet;
      throw new Error('bad password');
    });

    act(() => { useWallet.getState().disconnect() })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should create a new wallet, encrypt it, and set state', async () => {
    const { result } = renderHook(() => useWallet())
    let address, mnemonic
    await act(async () => {
      const res = await result.current.createWallet(testPassword)
      address = res.address
      mnemonic = res.mnemonic
    })
    expect(address).toBe(testWallet.address)
    expect(mnemonic.split(' ').length).toBe(12)
    const state = result.current
    expect(state.address).toBe(testWallet.address)
    expect(state.hasWallet).toBe(true)
    expect(state.isLocked).toBe(false)
    expect(state.encryptedWallet).not.toBe(null)
  })

  it('should import a wallet from mnemonic, encrypt it, and set state', async () => {
    const { result } = renderHook(() => useWallet())
    let address
    await act(async () => {
      address = await result.current.importWallet(testMnemonic, testPassword)
    })
    expect(address).toBe(testWallet.address)
    const state = result.current
    expect(state.address).toBe(testWallet.address)
    expect(state.hasWallet).toBe(true)
    expect(state.isLocked).toBe(false)
    expect(state.encryptedWallet).not.toBe(null)
  })

  it('should fail to import with an invalid mnemonic', async () => {
    const { result } = renderHook(() => useWallet())
    const invalidMnemonic = 'this is not a valid mnemonic'
    await expect(act(async () => {
      await result.current.importWallet(invalidMnemonic, testPassword)
    })).rejects.toThrow('Неверная seed-фраза')
  })

  it('should lock the wallet', async () => {
    const { result } = renderHook(() => useWallet())
    await act(async () => { await result.current.createWallet(testPassword) })
    act(() => { result.current.lock() })
    expect(result.current.isLocked).toBe(true)
  })

  it('should unlock the wallet with the correct password', async () => {
    const { result } = renderHook(() => useWallet())
    await act(async () => { await result.current.createWallet(testPassword) })
    act(() => { result.current.lock() })
    let success
    await act(async () => {
      success = await result.current.unlock(testPassword)
    })
    expect(success).toBe(true)
    expect(result.current.isLocked).toBe(false)
  })

  it('should fail to unlock with an incorrect password', async () => {
    const { result } = renderHook(() => useWallet())
    await act(async () => { await result.current.createWallet(testPassword) })
    act(() => { result.current.lock() })
    let success
    await act(async () => {
      success = await result.current.unlock('wrongpassword')
    })
    expect(success).toBe(false)
    expect(result.current.isLocked).toBe(true)
  })

  it('should sign a transaction when unlocked', async () => {
    const { result } = renderHook(() => useWallet())
    await act(async () => { await result.current.importWallet(testMnemonic, testPassword) })
    const tx = { to: '0xRecipientAddress', value: ethers.parseEther('0.1') }
    let signedTx
    await act(async () => {
      signedTx = await result.current.signTransaction(tx)
    })
    expect(signedTx).to.be.a('string').and.startsWith('0x')
  })

  it('should throw error when signing while locked', async () => {
    const { result } = renderHook(() => useWallet())
    await act(async () => { await result.current.createWallet(testPassword) })
    act(() => { result.current.lock() })
    const tx = { to: '0xRecipientAddress', value: ethers.parseEther('0.1') }
    await expect(act(() => result.current.signTransaction(tx)))
      .rejects.toThrow('Wallet is locked or not initialized')
  })

  it('should load an existing wallet from storage', async () => {
    const { result: firstRender } = renderHook(() => useWallet())
    await act(async () => { await firstRender.current.createWallet(testPassword) })
    const { result: secondRender } = renderHook(() => useWallet())
    act(() => { secondRender.current.loadWallet() })
    const state = secondRender.current
    expect(state.hasWallet).toBe(true)
    expect(state.address).toBe(testWallet.address)
    expect(state.isLocked).toBe(true)
    expect(state.encryptedWallet).not.toBe(null)
  })

  it('should disconnect and clear all data', async () => {
    const { result } = renderHook(() => useWallet())
    await act(async () => { await result.current.createWallet(testPassword) })
    await act(async () => { await result.current.disconnect() })
    const state = result.current
    expect(state.hasWallet).toBe(false)
    expect(state.address).toBe(null)
    expect(state.encryptedWallet).toBe(null)
    expect(secureStorage.getItem('encryptedWallet')).toBe(null)
  })
})
