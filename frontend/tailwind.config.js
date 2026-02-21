/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        void: '#070B14',
        deep: '#0D1526',
        surface: '#111827',
        panel: '#0F1923',
        border: '#1E2D45',
        accent: '#00D4FF',
        glow: '#0EA5E9',
        electric: '#38BDF8',
        soft: '#94A3B8',
        bright: '#E2E8F0',
        danger: '#F43F5E',
        success: '#10B981',
        warn: '#F59E0B',
        violet: '#818CF8',
      },
      boxShadow: {
        glow: '0 0 20px rgba(0,212,255,0.15)',
        'glow-lg': '0 0 40px rgba(0,212,255,0.2)',
        'glow-sm': '0 0 10px rgba(0,212,255,0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 1.5s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
