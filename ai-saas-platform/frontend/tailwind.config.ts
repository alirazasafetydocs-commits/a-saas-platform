import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        accent: '#4F46E5',
        background: '#F8FAFC',
        card: '#FFFFFF',
        text: '#0F172A',
        button: '#38BDF8',
      },
    },
  },
  plugins: [],
}
export default config
