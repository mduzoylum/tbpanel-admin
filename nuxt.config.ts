// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            API_URL: process.env.API_URL,
            APP_NAME: process.env.APP_NAME
        }
    },
    ssr: false,
    devtools: {enabled: true},
    css: [
        '~/assets/css/main.css',
        "~/assets/la/css/line-awesome.min.css"
    ],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    modules: ["@nuxtjs/i18n"],

    i18n: {
        vueI18n: './i18n.config.ts'
    },

    compatibilityDate: '2024-07-09'
})