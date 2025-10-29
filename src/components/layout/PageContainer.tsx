import { ReactNode } from 'react'
import { Header } from './Header'
import { BottomNav } from './BottomNav'

interface PageContainerProps {
  children: ReactNode
  showBottomNav?: boolean
}

export const PageContainer = ({ children, showBottomNav = true }: PageContainerProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-c-bg-primary text-c-text-primary">
      <Header />
      <main className="flex-1 pb-16">
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  )
}