import path from 'path'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    /*
     * Monorepo
     */
    path.resolve(__dirname, '../**/*.{vue,js,ts}'),
  ]
}

export default config
