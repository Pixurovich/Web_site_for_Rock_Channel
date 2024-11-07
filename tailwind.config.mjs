/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#2D2D2D',
        secondary: '#FF3366',
        dark: '#1A1A1A',
      },
      fontFamily: {
        sans: ['Outfit Variable', 'sans-serif'],
      },
    },
  },
  plugins: [],
}