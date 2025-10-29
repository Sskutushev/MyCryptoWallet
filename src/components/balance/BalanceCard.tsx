import { Card } from '../common/Card'

export const BalanceCard = () => {
  // TODO: Получить из walletStore
  const totalBalance = 0
  const btcEquivalent = 0

  return (
    <Card padding="lg" className="text-center">
      <h1 className="text-5xl font-bold text-c-text-primary mb-2">
        {totalBalance} $
      </h1>
      <p className="text-c-text-secondary">
        ≈ {btcEquivalent} BTC
      </p>
    </Card>
  )
}