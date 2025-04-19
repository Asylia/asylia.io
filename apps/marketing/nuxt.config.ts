/// <reference types="nuxt/schema" />
import tailwindcss from "@tailwindcss/vite";
import tailwindPostcss from "@tailwindcss/postcss";
import {addPrerenderRoutes} from '@nuxt/kit'
import {defineNuxtConfig} from 'nuxt/config'
import {resolve} from 'pathe'
// import {config} from "@shared/composuables/language";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Asylia.io',
            link: [
                {rel: 'email', href: "info@asylia.com"},
                {rel: 'author', href: "David Zita"},
                {rel: 'icon', type: 'image/x-icon', href: '/images/favicon/favicon.ico'},
                {rel: 'apple-touch-icon', sizes: '180x180', href: '/images/favicon/apple-touch-icon.png'},
                {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon/favicon-32x32.png'},
                {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicon/favicon-16x16.png'},
                {rel: 'manifest', href: '/site.webmanifest'}
            ]
        },
    },
    alias: {
        '@content': resolve(__dirname, '../../content'),
        '@shared': resolve(__dirname, '../../shared'),
    },
    modules: [
        '@nuxt/ui',
        '@nuxt/fonts',
        '@nuxt/image',
        '@nuxtjs/supabase',
        '@nuxtjs/i18n',
        '@nuxtjs/device',
        '@vesp/nuxt-fontawesome',
        '@vueuse/nuxt',
        '@vueuse/motion/nuxt'
    ],
    ui: {
        colorMode: true,
        theme: {
            colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
        }
    },
    compatibilityDate: '2024-11-01',
    future: {
        compatibilityVersion: 4,
    },
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },
    css: [
        '~/assets/styles/main.css',
    ],
    postcss: {
        plugins: {
            // '@tailwindcss/postcss':tailwindPostcss,
            // autoprefixer: {},
        },
    },
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    i18n: {
        bundle: {
            optimizeTranslationDirective: false,
        },
        defaultLocale: 'en',
        // locales: [...config.MAPPED_LANGUAGES_LIST_FOR_NUXT_CONFIG_I18N] // todo
        locales: [
            {name: 'Cs', code: 'cs', file: 'cs.json', icon: 'flagpack:cz'},
            {name: 'Sk', code: 'sk', file: 'sk.json', icon: 'flagpack:sk'},
            {name: 'En', code: 'en', file: 'en.json', icon: 'flagpack:gb-ukm'},
        ],
        lazy: true,
        compilation: {
            strictMessage: false,
            escapeHtml: false
        }

    },
    fontawesome: {
        icons: {
            solid: ['file-pdf'],
            brands: ['github', 'x-twitter', 'medium', 'instagram']
        },
        proIcons: {
            solid: [
                'scroll',
            ],
            light: [
                'arrow-up',
                'scroll',
                'computer-mouse-scrollwheel'
            ],
            thin: [],
            duotone: [],
        },
    },
    runtimeConfig: {
        public: {
            supabase: {
                url: process.env.SUPABASE_URL,
                key: process.env.SUPABASE_KEY
            }
        }
    },
    supabase: {
        redirect: false,
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY,
    },
})