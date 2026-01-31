import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Raleway Variable"', 'system-ui', 'sans-serif'],
        satisfy: ['Satisfy', 'cursive'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #ec4899, #f472b6)',
        shimmer: 'linear-gradient(90deg, #fce7f3 25%, #fbcfe8 50%, #fce7f3 75%)',
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
