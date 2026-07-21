/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0C0C0E',
        surface: '#141417',
        card: '#1C1C21',
        primary: {
          DEFAULT: '#8B5CF6',
          hover: '#7C3AED',
          light: '#A78BFA',
        },
        secondary: {
          DEFAULT: '#14B8A6',
          hover: '#0D9488',
          light: '#2DD4BF',
        },
        accent: {
          DEFAULT: '#EC4899',
          hover: '#DB2777',
          light: '#F472B6',
        },
        highlight: {
          DEFAULT: '#06B6D4',
          hover: '#0891B2',
          light: '#22D3EE',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        text: '#FAFAFA',
        muted: '#9CA3AF',
        border: 'rgba(255,255,255,0.07)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(139, 92, 246, 0.15)',
        'glow-secondary': '0 0 20px rgba(20, 184, 166, 0.15)',
        'glow-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'subtle-border': '0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
};
