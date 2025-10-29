import { useEffect, useState } from 'react'
import { PageContainer } from '../components/layout/PageContainer'
import { BalanceCard } from '../components/balance/BalanceCard'
import { ActionButtons } from '../components/balance/ActionButtons'
import { TokenList } from '../components/balance/TokenList'
import { useWallet } from '../hooks/useWallet'

export const Balance = () => {
  const { getBalance, getTokens } = useWallet()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await Promise.all([
        getBalance(),
        getTokens(),
      ])
      setLoading(false)
    }
    fetchData()
  }, [getBalance, getTokens])

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <BalanceCard loading={loading} />
        <ActionButtons />
        <TokenList loading={loading} />
      </div>
    </PageContainer>
  )
}