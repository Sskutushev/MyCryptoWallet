import { motion } from 'framer-motion'

interface ToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
}

export const Toggle = ({ enabled, onChange }: ToggleProps) => {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`
        relative w-12 h-7 rounded-full transition-colors duration-200
        ${enabled ? 'bg-c-primary' : 'bg-c-bg-tertiary'}
      `}
    >
      <motion.div
        className="absolute top-1 w-5 h-5 bg-white rounded-full"
        animate={{
          x: enabled ? 24 : 4
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  )
}