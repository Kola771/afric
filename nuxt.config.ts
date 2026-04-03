// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr:true,
  vite: {
    server: {
      hmr: {
        overlay: false
      }
    }
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
   modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/icon'
  ],
  colorMode: {
    classSuffix: '',
    preference: 'system', // suit le système par défaut
    fallback: 'light'
  },
  components: true, // normalement true par défaut
  app: {
    head: {
      titleTemplate: '%s | Afric Storyline',
      meta: [
        { name: 'theme-color', content: '#fafafa' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/afric.png' }
      ]
    }
  },
   runtimeConfig: {
    public: {
      frontUrl: process.env.APP_URL || "https://fast-resto.shop",
      apiBackendUrl: process.env.SERVER_URL || "https://api.fast-resto.shop",
    }
  },
})
