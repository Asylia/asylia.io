/// <reference types="nuxt/schema" />
import { defineNuxtConfig } from 'nuxt/config';
import { resolve } from 'pathe';
import { execSync } from 'child_process';

const debug = process.env.NODE_ENV === 'development';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  sourcemap: {
    client: 'hidden',
    server: false,
  },
  ssr: true,
  // nitro: {
  //   compressPublicAssets: true,
  //   prerender: {
  //     crawlLinks: true,
  //   },
  //   serveStatic: true,
  // },
  app: {
    head: {
      title: 'Asylia.io',
      link: [
        { rel: 'email', href: 'info@asylia.com' },
        { rel: 'author', href: 'David Zita' },
        { rel: 'icon', type: 'image/x-icon', href: '/images/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/favicon/apple-touch-icon.png' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/images/favicon/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/images/favicon/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      htmlAttrs: {
        lang: 'en',
      },
    },
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxtjs/supabase',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Roboto Mono': {
            wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          },
          'Roboto Flex': {
            wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          },
        },
      },
    ],
  ],
  future: {
    compatibilityVersion: 4,
  },
  devtools: {
    enabled: debug,
    timeline: {
      enabled: debug,
    },
  },
  alias: {
    '@content': resolve(__dirname, '../../content'),
    '@shared': resolve(__dirname, '../../shared'),
    '@packages': resolve(__dirname, '../../packages'),
  },
  // assetsInclude: ['**/*.json'],
  vite: {
    // assetsInclude: ['**/*.json'],
    define: {
      'import.meta.env.VITE_GIT_COMMIT_HASH': JSON.stringify(
        execSync('git rev-parse --short HEAD').toString().trim(),
      ),
      'import.meta.env.VITE_BUILD_DATE': JSON.stringify(new Date().toISOString()),
    },
  },
  css: ['~/assets/styles/main.css'],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'asylia-color-mode',
  },
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
    },
    colorMode: true,
  },
  runtimeConfig: {
    public: {
      supabase: {
        url: process.env.NUXT_PUBLIC_SUPABASE_URL,
        key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
      },
      NUXT_PUBLIC_CONTACT_EMAIL: process.env.NUXT_PUBLIC_CONTACT_EMAIL,
      NUXT_PUBLIC_WALLET_ADDRESS: process.env.NUXT_PUBLIC_WALLET_ADDRESS,
    },
  },
  i18n: {
    bundle: {
      optimizeTranslationDirective: false,
    },
    defaultLocale: 'en',
    // locales: [...config.MAPPED_LANGUAGES_LIST_FOR_NUXT_CONFIG_I18N] // todo
    locales: [
      { name: 'Cs', code: 'cs', file: 'cs.json', icon: 'flagpack:cz' },
      { name: 'Sk', code: 'sk', file: 'sk.json', icon: 'flagpack:sk' },
      { name: 'En', code: 'en', file: 'en.json', icon: 'flagpack:gb-ukm' },
    ],
    lazy: true,
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
    strategy: 'no_prefix',
  },
  supabase: {
    redirect: false,
  },
});
