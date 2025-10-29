/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'c-bg-primary': 'var(--c-bg-primary)',
        'c-bg-secondary': 'var(--c-bg-secondary)',
        'c-bg-tertiary': 'var(--c-bg-tertiary)',
        'c-text-primary': 'var(--c-text-primary)',
        'c-text-secondary': 'var(--c-text-secondary)',
        'c-text-tertiary': 'var(--c-text-tertiary)',
        'c-primary': 'var(--c-primary)',
        'c-primary-hover': 'var(--c-primary-hover)',
        'c-success': 'var(--c-success)',
        'c-danger': 'var(--c-danger)',
        'c-border': 'var(--c-border)',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
      },
    },
  },
  plugins: [],
}

