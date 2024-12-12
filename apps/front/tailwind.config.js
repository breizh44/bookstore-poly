/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  darkMode: 'class',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: {
            700: 'rgba(0, 69, 149, 1)',
            600: 'rgba(0, 69, 149, 0.8)',
            500: 'rgba(0, 69, 149, 0.7)',
            400: 'rgba(0, 69, 149, 0.6)',
            300: 'rgba(0, 69, 149, 0.5)',
            200: 'rgba(0, 69, 149, 0.4)',
            100: 'rgba(0, 69, 149, 0.3)',
            50: 'rgba(0, 69, 149, 0.1)',
          },
          red: {
            700: 'rgba(229, 49, 42, 1)',
            600: 'rgba(229, 49, 42, 0.8)',
            500: 'rgba(229, 49, 42, 0.7)',
            400: 'rgba(229, 49, 42, 0.6)',
            300: 'rgba(229, 49, 42, 0.5)',
            200: 'rgba(229, 49, 42, 0.4)',
            100: 'rgba(229, 49, 42, 0.3)',
            50: 'rgba(229, 49, 42, 0.1)',
          },
        },
        secondary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          // Ajoute d'autres nuances...
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          // Ajoute d'autres nuances...
        },
        background: {
          light: 'rgba(0, 69, 149, 0.3)', // Couleur de fond en mode clair
          dark: '#121212', // Couleur de fond en mode sombre
        },
        text: {
          light: '#000000', // Texte en mode clair
          dark: '#ffffff', // Texte en mode sombre
        },
      },
      fontFamily: {
        sans: [
          'Montserrat',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        serif: ['Merriweather', 'ui-serif', 'Georgia'],
      },
      fontSize: {
        'heading-1': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }], // 36px
        'body-text': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }], // 16px
        caption: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '300' }], // 14px
      },
    },
  },
  plugins: [typography],
}
