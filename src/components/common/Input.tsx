import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input = ({ label, className = '', ...props }: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-c-text-secondary mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 bg-c-bg-secondary border border-c-border rounded-lg
          text-c-text-primary placeholder-c-text-tertiary
          focus:outline-none focus:ring-2 focus:ring-c-primary focus:border-transparent
          ${className}
        `}
        {...props}
      />
    </div>
  )
}