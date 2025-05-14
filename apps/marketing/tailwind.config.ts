import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{vue,js,ts}',
    '../../shared/**/*.{vue,js,ts}',
    // '.../shared/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
