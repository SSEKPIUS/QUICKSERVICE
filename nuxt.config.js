export default {
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'macsedoquickservice',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/css/sweetalert2.css' }
    ]
  },

  /*
    ** Customize the progress-bar color
    */
  // loading: false,
  loading: {
    color: 'gray',
    failedColor: 'red',
    height: '1px',
    continuous: false,
    throttle: 0
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css'
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false },
    '~/plugins/filters',
    '~/plugins/functionInjections.js',
    '~/plugins/vue-chartjs.js',
    '~plugins/swal',
    '~plugins/modal'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // Register the dotenv module
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    'cookie-universal-nuxt'
  ],

  toast: {
    theme: 'bubble',
    position: 'bottom-left',
    duration: 5000
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL, // Here, you set the base URL that Axios will use when making requests
    credentials: true // this says that in the request the httponly cookie should be sent
  },

  router: {
    // middleware: 'authenticated'
  },

  auth: {
    strategies: {
    }
  },

  server: {
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_URL,
    timing: false
  },

  publicRuntimeConfig: {
    baseURL: 'http://localhost:3112' // Used as fallback if no runtime config is provided
  },

  privateRuntimeConfig: {
    apiSecret: process.env.API_SECRET
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: {
      ignoreOrder: true
    },
    postcss: {
      plugins: {
        'postcss-url': false,
        'postcss-nested': {},
        'postcss-import': {},
        tailwindcss: {},
        autoprefixer: {}
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true
        }
      }
    },
    // Extend webpack config for nuxt  First, lets extend our Nuxt config to allow for loading files from our assets
    extend (config, { isDev, isClient }) {
      config.module.rules.push({ // https://nuxtjs.org/docs/features/configuration/#extend-webpack-to-load-audio-files
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
      // Sets webpack's mode to development if `isDev` is true.
      if (isDev) {
        config.mode = 'development'
      }
    }
  }
}
