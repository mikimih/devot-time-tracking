import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary)',
          100: 'var(--color-primary-dark)',
        },
        secondary: 'var(--color-secondary)',
        secondaryDark: 'var(--color-secondary-dark)',
        grey: 'var(--color-grey)',
        ghost: 'var(--color-ghost)',
        whisper: 'var(--color-white-whisper)',
        lilac: 'var(--color-white-lilac)',
        dark: '#0C0D25',
        alert: 'var(--color-alert)',
      },
    },
  },
  plugins: [],
};
export default config;
