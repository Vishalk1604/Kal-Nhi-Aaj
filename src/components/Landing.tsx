// ---------------------------------------------------------------------------
// Landing — the first-time home page. A scroll-told story (insight → promise →
// what we do → barriers → ready) with high-end scroll reveals, hero parallax, a
// thin scroll-progress thread, an animated journey timeline, and a Start CTA the
// content softly dissolves into. Folds in the privacy promise. (Phase 3)
// ---------------------------------------------------------------------------

import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ChevronDown, VenetianMask, KeyRound, Hand, ArrowRight } from 'lucide-react'
import { PrimaryButton } from './PrimaryButton'
import { Disclaimer } from './Disclaimer'
import { copy } from '../content/copy.en'

const EASE = [0.22, 0.61, 0.36, 1] as const
const PROMISE_ICONS = [VenetianMask, KeyRound, Hand]

// Compact labels for the tight six-dot timeline so every column stays even and
// readable. (The full "Understand" wording still shows in the in-app progress
// hint, where there's room for it.)
const TIMELINE_LABELS = ['Enter', 'Affirm', 'Share', 'Learn', 'Act', 'Follow up']

// A clean, hand-tuned sunrise mark — a rising sun on the horizon with soft rays.
// (Reads more clearly as "a new day" than the stock upload-style glyph.)
function SunriseMark({ size = 56 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* rays */}
      <line x1="32" y1="13" x2="32" y2="22" />
      <line x1="17" y1="22" x2="22" y2="27" />
      <line x1="47" y1="22" x2="42" y2="27" />
      {/* rising sun */}
      <path d="M20 43 a12 12 0 0 1 24 0" />
      {/* horizon */}
      <line x1="9" y1="43" x2="25" y2="43" />
      <line x1="39" y1="43" x2="55" y2="43" />
      {/* foreground line for depth */}
      <line x1="15" y1="51" x2="49" y2="51" opacity="0.6" />
    </svg>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 font-body text-[12px] font-bold uppercase tracking-[0.16em] text-terracotta-d">
      {children}
    </p>
  )
}

export function Landing({ onStart }: { onStart: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ container: scrollRef })

  // A thin terracotta thread at the top fills as the story is read.
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })

  // Hero parallax — emblem settles back, hero text lifts + fades as you scroll in.
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, -36])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0])
  const emblemScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.78])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0])
  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, -140])
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, 90])

  // Reveal-on-scroll, observed against the scroll container (not the window).
  // A soft spring + faint scale gives each block a gentle "pop" as it settles.
  const Reveal = ({ children, delay = 0, y = 26 }: { children: ReactNode; delay?: number; y?: number }) => (
    <motion.div
      initial={reduce ? false : { opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ root: scrollRef, amount: 0.3, once: true }}
      transition={{ type: 'spring', stiffness: 90, damping: 16, mass: 0.9, delay }}
    >
      {children}
    </motion.div>
  )

  // Timeline choreography — circles pop in sequence, connectors draw between them.
  const dotPop = {
    hidden: reduce ? {} : { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 18 } },
  }
  const lineDraw = {
    hidden: reduce ? {} : { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 0.45, ease: EASE } },
  }
  const labelFade = {
    hidden: reduce ? {} : { opacity: 0, y: 4 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-bg">
      {/* scroll thread */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressX }}
        className="absolute inset-x-0 top-0 z-30 h-[3px] origin-left bg-gradient-to-r from-terracotta to-terracotta-d"
      />

      <div ref={scrollRef} className="scroll-area relative flex-1 overflow-y-auto overflow-x-hidden">
        {/* soft drifting background — depth without clutter */}
        <motion.div
          aria-hidden="true"
          style={{ y: reduce ? 0 : blobY1 }}
          className="pointer-events-none absolute -left-16 top-24 h-64 w-64 rounded-full bg-peach/50 blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          style={{ y: reduce ? 0 : blobY2 }}
          className="pointer-events-none absolute -right-20 top-[60%] h-72 w-72 rounded-full bg-sage/25 blur-3xl"
        />

        {/* ── HERO ───────────────────────────────────────────────── */}
        <section className="relative flex min-h-full flex-col items-center justify-center px-screen py-10 text-center">
          <motion.div style={{ y: reduce ? 0 : heroY, opacity: reduce ? 1 : heroOpacity }} className="flex flex-col items-center">
            <p className="font-display text-[15px] font-bold tracking-tight text-terracotta-d">{copy.appName}</p>
            <p className="mb-8 font-body text-caption text-ink-soft">{copy.tagline}</p>

            <motion.div style={{ scale: reduce ? 1 : emblemScale }} className="relative mb-9 grid place-items-center">
              <div className="absolute h-44 w-44 rounded-full bg-peach/60 blur-2xl animate-breathe" />
              <div className="relative grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-peach to-terracotta/70 shadow-soft-lg animate-breathe">
                <span className="text-surface">
                  <SunriseMark size={56} />
                </span>
              </div>
            </motion.div>

            <Eyebrow>{copy.landing.heroEyebrow}</Eyebrow>
            <h1 className="text-balance font-display text-[30px] font-bold leading-[1.16] text-ink">
              {copy.landing.heroTitle}
            </h1>
            <p className="mt-3 max-w-[310px] text-pretty font-body text-body-lg text-ink-soft">
              {copy.landing.heroSub}
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: reduce ? 1 : cueOpacity }}
            className="absolute bottom-3 flex flex-col items-center gap-1 text-ink-soft"
          >
            <span className="font-body text-caption font-bold">{copy.landing.scrollCue}</span>
            <motion.span
              animate={reduce ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={20} strokeWidth={2.4} aria-hidden="true" />
            </motion.span>
          </motion.div>
        </section>

        {/* ── INSIGHT ────────────────────────────────────────────── */}
        <section className="relative px-screen py-12">
          <Reveal>
            <Eyebrow>{copy.landing.insight.eyebrow}</Eyebrow>
            <h2 className="text-balance font-display text-[25px] font-bold leading-snug text-ink">
              {copy.landing.insight.title}
            </h2>
            <p className="mt-3 text-pretty font-body text-body-lg text-ink-soft">{copy.landing.insight.body}</p>
          </Reveal>
        </section>

        {/* ── PROMISE (folded-in privacy) ────────────────────────── */}
        <section className="relative px-screen py-12">
          <Reveal>
            <Eyebrow>{copy.landing.promise.eyebrow}</Eyebrow>
            <h2 className="mb-6 text-balance font-display text-[25px] font-bold leading-snug text-ink">
              {copy.landing.promise.title}
            </h2>
          </Reveal>
          <div className="space-y-3">
            {copy.privacy.points.map((p, i) => {
              const Icon = PROMISE_ICONS[i]
              return (
                <Reveal key={p.title} delay={0.08 * i}>
                  <motion.div
                    whileHover={reduce ? undefined : { y: -3 }}
                    whileTap={reduce ? undefined : { scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="flex items-start gap-4 rounded-card border border-line bg-surface/80 p-4 shadow-soft backdrop-blur-sm"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sage/15 text-sage-d">
                      <Icon size={24} strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-display text-[17px] font-bold text-ink">{p.title}</span>
                      <span className="mt-0.5 block font-body text-body text-ink-soft">{p.body}</span>
                    </span>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* ── WHAT WE DO (the six beats) ─────────────────────────── */}
        <section className="relative px-screen py-12">
          <Reveal>
            <Eyebrow>{copy.landing.goal.eyebrow}</Eyebrow>
            <h2 className="text-balance font-display text-[25px] font-bold leading-snug text-ink">
              {copy.landing.goal.title}
            </h2>
            <p className="mt-3 text-pretty font-body text-body-lg text-ink-soft">{copy.landing.goal.body}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <motion.ol
              className="mt-7 flex items-start justify-between rounded-card border border-line bg-surface/70 px-3 py-5 shadow-soft"
              initial="hidden"
              whileInView="show"
              viewport={{ root: scrollRef, amount: 0.6, once: true }}
              transition={{ staggerChildren: 0.12, delayChildren: 0.15 }}
            >
              {TIMELINE_LABELS.map((label, i) => (
                <motion.li key={label} variants={{ hidden: {}, show: {} }} className="flex min-w-0 flex-1 flex-col items-center text-center">
                  <span className="relative flex w-full items-center justify-center">
                    {i > 0 && (
                      <motion.span
                        variants={lineDraw}
                        className="absolute right-1/2 h-0.5 w-full origin-left bg-gradient-to-l from-terracotta/50 to-terracotta/20"
                      />
                    )}
                    <motion.span
                      variants={dotPop}
                      className="relative z-10 grid h-7 w-7 place-items-center rounded-full bg-terracotta text-[12px] font-bold text-surface shadow-chip"
                    >
                      {i + 1}
                    </motion.span>
                  </span>
                  <motion.span
                    variants={labelFade}
                    className="mt-2 px-0.5 font-body text-[9px] font-bold uppercase leading-[1.25] tracking-normal text-ink-soft"
                  >
                    {label}
                  </motion.span>
                </motion.li>
              ))}
            </motion.ol>
          </Reveal>
        </section>

        {/* ── BARRIERS ───────────────────────────────────────────── */}
        <section className="relative px-screen py-12">
          <Reveal>
            <Eyebrow>{copy.landing.barriers.eyebrow}</Eyebrow>
            <h2 className="mb-5 text-balance font-display text-[25px] font-bold leading-snug text-ink">
              {copy.landing.barriers.title}
            </h2>
          </Reveal>
          <div className="flex flex-wrap gap-2.5">
            {copy.landing.barriers.items.map((item, i) => (
              <Reveal key={item} delay={0.05 * i}>
                <motion.span
                  whileHover={reduce ? undefined : { y: -2, scale: 1.04 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                  className="inline-block rounded-chip border border-line bg-surface px-4 py-2.5 font-body text-body font-bold text-ink shadow-soft"
                >
                  {item}
                </motion.span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CLOSER ─────────────────────────────────────────────── */}
        <section className="relative px-screen pb-10 pt-6">
          <Reveal>
            <motion.div
              whileHover={reduce ? undefined : { y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="rounded-card bg-gradient-to-br from-peach/70 to-surface p-7 text-center shadow-soft"
            >
              <h2 className="text-balance font-display text-[26px] font-bold text-ink">{copy.landing.closer.title}</h2>
              <p className="mx-auto mt-2 max-w-[280px] text-pretty font-body text-body text-ink-soft">
                {copy.landing.closer.body}
              </p>
              <motion.span
                aria-hidden="true"
                animate={reduce ? undefined : { y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="mt-4 inline-flex text-terracotta-d"
              >
                <ArrowRight size={24} strokeWidth={2.4} className="rotate-90" />
              </motion.span>
            </motion.div>
          </Reveal>
        </section>

        {/* room so the closer can scroll clear of the dissolving CTA below */}
        <div className="h-28" />
      </div>

      {/* Start CTA — content softly dissolves into it (no hard line). */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <div className="footer-fade-blur absolute inset-0" aria-hidden="true" />
        <div className="footer-fade-wash absolute inset-0 bg-bg" aria-hidden="true" />
        <div className="pointer-events-auto relative px-screen pb-7 pt-12">
          <PrimaryButton onClick={onStart}>{copy.welcome.cta}</PrimaryButton>
          <Disclaimer variant="privacy" className="mt-3">
            {copy.welcome.finePrint}
          </Disclaimer>
        </div>
      </div>
    </div>
  )
}
