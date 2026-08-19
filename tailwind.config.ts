import type { Config } from 'tailwindcss';

/** hsl token that still supports Tailwind's `/opacity` modifier */
const token = (name: string) => `hsl(var(${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* dossier tokens */
        paper: token('--paper'),
        'surface-1': token('--surface-1'),
        'surface-2': token('--surface-2'),
        hairline: token('--hairline'),
        ink: {
          DEFAULT: token('--ink'),
          muted: token('--ink-muted'),
          faint: token('--ink-faint'),
        },
        brand: {
          DEFAULT: token('--brand'),
          dim: token('--brand-dim'),
          foreground: token('--on-brand'),
        },

        /* shadcn aliases */
        border: token('--border'),
        input: token('--input'),
        ring: token('--ring'),
        background: token('--background'),
        foreground: token('--foreground'),
        primary: {
          DEFAULT: token('--primary'),
          foreground: token('--primary-foreground'),
        },
        secondary: {
          DEFAULT: token('--secondary'),
          foreground: token('--secondary-foreground'),
        },
        destructive: {
          DEFAULT: token('--destructive'),
          foreground: token('--destructive-foreground'),
        },
        muted: {
          DEFAULT: token('--muted'),
          foreground: token('--muted-foreground'),
        },
        accent: {
          DEFAULT: token('--accent'),
          foreground: token('--accent-foreground'),
        },
        popover: {
          DEFAULT: token('--popover'),
          foreground: token('--popover-foreground'),
        },
        card: {
          DEFAULT: token('--card'),
          foreground: token('--card-foreground'),
        },
      },

      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },

      /* fluid editorial scale — every step is a clamp() */
      fontSize: {
        'step--2': ['clamp(0.694rem, 0.68rem + 0.07vw, 0.75rem)', { lineHeight: '1.5' }],
        'step--1': ['clamp(0.833rem, 0.8rem + 0.17vw, 0.938rem)', { lineHeight: '1.5' }],
        'step-0': ['clamp(1rem, 0.96rem + 0.22vw, 1.125rem)', { lineHeight: '1.6' }],
        'step-1': ['clamp(1.2rem, 1.13rem + 0.35vw, 1.5rem)', { lineHeight: '1.4' }],
        'step-2': ['clamp(1.44rem, 1.32rem + 0.6vw, 2rem)', { lineHeight: '1.25' }],
        'step-3': ['clamp(1.728rem, 1.53rem + 0.99vw, 2.75rem)', { lineHeight: '1.15' }],
        'step-4': ['clamp(2.074rem, 1.76rem + 1.57vw, 3.75rem)', { lineHeight: '1.05' }],
        'step-5': ['clamp(2.488rem, 2rem + 2.44vw, 5rem)', { lineHeight: '0.98' }],
        'step-6': ['clamp(2.986rem, 2.24rem + 3.73vw, 7rem)', { lineHeight: '0.92' }],
        'step-7': ['clamp(3.583rem, 2.4rem + 5.9vw, 10rem)', { lineHeight: '0.86' }],
        /* the "poster" sizes — viewport-locked, for hero words */
        poster: ['clamp(3rem, 13vw, 13rem)', { lineHeight: '0.82' }],
        'poster-xl': ['clamp(3.5rem, 17.5vw, 19rem)', { lineHeight: '0.78' }],
      },

      spacing: {
        gutter: 'var(--gutter)',
        chapter: 'var(--chapter-pad)',
      },

      borderWidth: {
        rule: 'var(--rule)',
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'var(--radius)',
        sm: 'var(--radius)',
      },

      transitionTimingFunction: {
        expo: 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'marquee-x': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'stamp-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.35', transform: 'scale(0.82)' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'marquee-x': 'marquee-x var(--marquee-duration, 40s) linear infinite',
        blink: 'blink 1.05s steps(1) infinite',
        'stamp-spin': 'stamp-spin 22s linear infinite',
        'pulse-dot': 'pulse-dot 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
