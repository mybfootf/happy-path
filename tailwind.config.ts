import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: '#1C1F27',
        gray1: '#84818A',
      },
      keyframes: {
        pulsate: {
          '0%': {
            transform: 'scale(0.1, 0.1)',
            opacity: '0',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            transform: 'scale(1.2, 1.2)',
            opacity: '0',
          },
        },
      },
      animation: {
        pulsate: 'pulsate 1s infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
