import { useNavigate } from 'react-router-dom'
import { Menu, ScanLine } from 'lucide-react'

export const Header = () => {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 bg-c-bg-primary border-b border-c-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Левая часть: меню */}
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-c-bg-secondary transition-colors">
          <Menu className="w-6 h-6 text-c-text-secondary" />
        </button>

        {/* Центр: название кошелька */}
        <h1 className="text-lg font-medium text-c-text-primary">
          Wallet 1
        </h1>

        {/* Правая часть: QR scanner */}
        <button 
          onClick={() => navigate('/scan')}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-c-bg-secondary transition-colors"
        >
          <ScanLine className="w-6 h-6 text-c-primary" />
        </button>
      </div>
    </header>
  )
}