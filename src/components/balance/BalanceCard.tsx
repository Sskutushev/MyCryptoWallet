import { Card } from '../common/Card'
import { useWallet } from '../../hooks/useWallet'
import { Skeleton } from '../common/Skeleton'

interface BalanceCardProps {
  loading: boolean
}

export const BalanceCard = ({ loading }: BalanceCardProps) => {
  const { balance } = useWallet()
  const totalBalance = parseFloat(balance) || 0
  const btcEquivalent = 0 // TODO: Fetch real BTC equivalent

  if (loading) {
    return (
      <Card padding="lg" className="text-center">
        <Skeleton className="h-12 w-48 mx-auto mb-2" />
        <Skeleton className="h-6 w-32 mx-auto" />
      </Card>
    )
  }

  return (
    <Card padding="lg" className="text-center">
      <h1 className="text-5xl font-bold text-c-text-primary mb-2">
        {totalBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </h1>
      <p className="text-c-text-secondary">
        ≈ {btcEquivalent} BTC
      </p>
    </Card>
  )
}