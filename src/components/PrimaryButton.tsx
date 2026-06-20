// Primary CTA — warm terracotta, large, rounded, soft press settle.
import { motion, type HTMLMotionProps } from 'framer-motion'

type Props = Omit<HTMLMotionProps<'button'>, 'ref'> & { fullWidth?: boolean }

export function PrimaryButton({ children, className = '', fullWidth = true, type = 'button', ...rest }: Props) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className={[
        fullWidth ? 'w-full' : '',
        'inline-flex min-h-[56px] items-center justify-center gap-2 rounded-button px-6',
        'bg-terracotta text-surface font-body text-body-lg font-bold',
        'shadow-soft transition-colors hover:bg-terracotta-d',
        'disabled:cursor-not-allowed disabled:bg-ink-soft/40 disabled:text-surface/80 disabled:shadow-none',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
