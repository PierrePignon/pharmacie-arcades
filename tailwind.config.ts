import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#1A0F08',
        'ink-mid': '#5B4030',
        'ink-light': '#8B6F5A',
        cream: '#F4ECD8',
        'cream-deep': '#E8DCC0',
        sand: '#D9C39E',
        ocre: '#C9A56B',
        'terra-light': '#D88556',
        terra: '#B5571F',
        'terra-deep': '#7A3315',
        green: '#1C4F38',
        'green-sage': '#8FA286',
        'green-light': '#B9CAA6',
        gold: '#B8945F',
        'white-warm': '#FAF6EC',
        whatsapp: '#25D366',
      },
    },
  },
  plugins: [],
}
export default config
