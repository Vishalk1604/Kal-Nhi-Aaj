// Secondary action — calm surface with a hairline border.
import { motion, type HTMLMotionProps } from 'framer-motion'

type Props = Omit<HTMLMotionProps<'button'>, 'ref'> & { fullWidth?: boolean }

export function SecondaryButton({ children, className = '', fullWidth = true, type = 'button', ...rest }: Props) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className={[
        fullWidth ? 'w-full' : '',
        'inline-flex min-h-[56px] items-center justify-center gap-2 rounded-button px-6',
        'border border-line bg-surface text-ink font-body text-body-lg font-bold',
        'shadow-soft transition-colors hover:bg-peach/40',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
