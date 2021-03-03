import redirectSSL from 'redirect-ssl'
const awsURL = 'https://s3.us-east-2.amazonaws.com/buffalo311'

export default {
  publicRuntimeConfig: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://oot-nuxt.herokuapp.com'
        : 'http://localhost:3000',
    awsURL,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'test',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
  ],

  googleAnalytics: {
    id: 'G-X8EM3VF55J',
    dev: process.env.NODE_ENV !== 'production',
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
  ],

  sentry: {
    initialize: process.env.NODE_ENV === 'production',
    dsn:
      'https://48d05c23bd234d0abb9f2f18310d50d6@o311837.ingest.sentry.io/5659111',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },
  proxy: {
    '/aws': {
      target: awsURL,
      pathRewrite: { '^/aws': '' },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Server Middleware:  https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-servermiddleware
  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV === 'production',
    }),
    // Will register file from project api directory to handle /api/*
    { path: '/api', handler: '~/api/index' },
  ],
}
