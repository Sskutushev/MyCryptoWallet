import { PageContainer } from '../components/layout/PageContainer'
import { BalanceCard } from '../components/balance/BalanceCard'
import { ActionButtons } from '../components/balance/ActionButtons'
import { TokenList } from '../components/balance/TokenList'

export const Balance = () => {
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <BalanceCard />
        <ActionButtons />
        <TokenList />
      </div>
    </PageContainer>
  )
}