// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
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
})
