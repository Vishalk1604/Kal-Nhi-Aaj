import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const isPointerFine =
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)
  const x = useSpring(rawX, { stiffness: 180, damping: 22, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 180, damping: 22, mass: 0.4 })

  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!isPointerFine) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element
      setHovered(!!t.closest('button, a, input, textarea, [role="button"], label, select'))
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [isPointerFine, rawX, rawY, visible])

  if (!isPointerFine) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      {/* Outer ring — expands on interactive hover */}
      <motion.div
        className="absolute rounded-full"
        style={{
          translateX: '-50%',
          translateY: '-50%',
          border: '1.5px solid #E0795A',
          background: 'radial-gradient(circle, rgba(247,223,203,0.18) 0%, rgba(224,121,90,0.06) 100%)',
        }}
        animate={{
          width: hovered ? 38 : 22,
          height: hovered ? 38 : 22,
          opacity: hovered ? 0.75 : 0.55,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      />
      {/* Center dot */}
      <motion.div
        className="absolute rounded-full bg-terracotta"
        style={{ translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovered ? 5 : 4,
          height: hovered ? 5 : 4,
          opacity: hovered ? 0.9 : 0.7,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 26 }}
      />
    </motion.div>
  )
}
