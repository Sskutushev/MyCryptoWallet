import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  padding?: 'sm' | 'md' | 'lg'
  hoverable?: boolean
  onClick?: () => void
  className?: string
}

export const Card = ({
  children,
  padding = 'md',
  hoverable = false,
  onClick,
  className = '',
}: CardProps) => {
  const paddings = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  const Component = hoverable ? motion.div : 'div'
  
  return (
    <Component
      className={`
        ${paddings[padding]}
        bg-c-bg-secondary
        rounded-xl
        ${onClick ? 'cursor-pointer' : ''}
        ${hoverable ? 'hover:bg-c-bg-tertiary' : ''}
        transition-colors duration-200
        ${className}
      `}
      onClick={onClick}
      {...(hoverable ? {
        whileHover: { scale: 1.01 },
        whileTap: { scale: 0.99 }
      } : {})}
    >
      {children}
    </Component>
  )
}