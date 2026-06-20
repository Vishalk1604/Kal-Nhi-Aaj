/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // "safe room at dawn" — warm, calm, deliberately un-clinical
      colors: {
        bg: '#FBF6F0', // warm linen (NOT cold white)
        surface: '#FFFDFB', // card surface
        peach: '#F7DFCB', // affirmation backgrounds, soft highlights
        terracotta: {
          DEFAULT: '#E0795A', // primary accent — warm, used with restraint
          d: '#B9512F', // pressed / strong accent text on light
        },
        sage: {
          DEFAULT: '#8FA98A', // calm / reassurance / "go" moments
          d: '#5E7A59', // sage text on light
        },
        ink: {
          DEFAULT: '#2B2420', // warm near-black for text (never pure #000)
          soft: '#7A6F68', // muted / secondary text
        },
        urgent: '#C73E1D', // red-flag only — serious, still in the warm family
        line: 'rgba(43,36,32,0.10)', // hairline borders
      },
      fontFamily: {
        display: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        body: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // mobile type scale — sentence case everywhere
        display: ['30px', { lineHeight: '1.18', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-sm': ['26px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        h2: ['22px', { lineHeight: '1.3', fontWeight: '600' }],
        body: ['16px', { lineHeight: '1.55' }],
        'body-lg': ['18px', { lineHeight: '1.5' }],
        caption: ['13px', { lineHeight: '1.45' }],
      },
      borderRadius: {
        card: '24px',
        button: '20px',
        chip: '999px',
      },
      boxShadow: {
        // soft, warm-tinted — never hard grey clinical shadows
        soft: '0 8px 24px rgba(184,81,47,0.08)',
        'soft-lg': '0 16px 40px rgba(184,81,47,0.12)',
        chip: '0 2px 8px rgba(184,81,47,0.10)',
      },
      spacing: {
        screen: '22px', // standard screen padding
      },
      transitionTimingFunction: {
        gentle: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.04)', opacity: '1' },
        },
        // slow, ambient warmth — barely-there drift behind focal screens
        'drift-a': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(16px, -22px, 0) scale(1.08)' },
        },
        'drift-b': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(-20px, 16px, 0) scale(1.06)' },
        },
      },
      animation: {
        breathe: 'breathe 6s ease-in-out infinite',
        'drift-a': 'drift-a 18s ease-in-out infinite',
        'drift-b': 'drift-b 24s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
