// Quiet text link — for soft, non-committal paths ("Not ready yet?").
import { motion, type HTMLMotionProps } from 'framer-motion'

type Props = Omit<HTMLMotionProps<'button'>, 'ref'>

export function TextButton({ children, className = '', type = 'button', ...rest }: Props) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className={[
        'inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-full px-3',
        'font-body text-body font-bold text-ink-soft underline-offset-4',
        'transition-colors hover:text-ink hover:underline',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
