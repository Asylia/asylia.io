// eslint.config.mjs
import { withNuxt } from './apps/marketing/.nuxt/eslint.config.mjs';
import prettierPlugin from 'eslint-plugin-prettier';

export default withNuxt(
  {
    // apply Nuxt flat‐config for all *.vue, *.ts, *.js v apps/
    files: ['apps/**/*.{js,ts,vue}'],
    rules: {
      // turn off console errors in dev mode
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/no-v-html': 'off',
      'vue/html-self-closing': 'off',
    },
  },
  {
    /*
     * Rest of monorepo
     */
    files: ['packages/**/*.{js,ts,vue}', 'shared/**/*.{js,ts,vue}'],
    languageOptions: {
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
);
