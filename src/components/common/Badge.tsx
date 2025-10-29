import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  className?: string
}

export const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
  const variants = {
    default: 'bg-c-bg-tertiary text-c-text-tertiary',
    primary: 'bg-c-primary/10 text-c-primary',
    success: 'bg-c-success/10 text-c-success',
    warning: 'bg-c-warning/10 text-c-warning',
    danger: 'bg-c-danger/10 text-c-danger',
  }

  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
      ${variants[variant]}
      ${className}
    `}>
      {children}
    </span>
  )
}