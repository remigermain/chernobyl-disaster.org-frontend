export default {
  target: 'server',
  ssr: true,

  telemetry: false,

  head: {
    title: process.env.npm_package_name || '',
    titleTemplate: 'Chernobyl - %s',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      { name: 'og:image', content: '/icon.png' },
      { name: 'twitter:image', content: '/icon.png' }
      // ...require('~/config/head.config.js').default,
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /* -------------------------------------------------
    render sections
    ------------------------------------------------- */

  render: {
    http2: {
      push: true,
      pushAssets: null
    },
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  sitemap: {
    hostname: process.env.SITE_URL,
    gzip: true,
    i18n: true,
    exclude: ['/contribute/**'],
    Default: {
      changefreq: 'monthly',
      priority: 1,
      lastmod: new Date()
    }
  },
  robots: [
    {
      UserAgent: '*',
      Disallow: '/contribute/*'
    },
    {
      UserAgent: '*',
      Disallow: '/auth/new-password'
    },
    {
      UserAgent: '*',
      Disallow: '/auth/verify-email'
    }
  ],

  pwa: {
    meta: {
      theme_color: '#1a202c',
      nativeUI: true
    },
    manifest: {
      theme_color: '#1a202c'
    }
  },

  /* -------------------------------------------------
    config sections
    ------------------------------------------------- */

  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/pwa',

    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-i18n',

    '@nuxtjs/svg-sprite',
    'vue-toastification/nuxt'
  ],

  plugins: [
    { src: '~/plugins/matomo.client.js', ssr: false },
    '~/plugins/axios.js',
    '~/plugins/mixins.js',
    '~/plugins/prototype.js',
    '~/plugins/auth.js'
  ],

  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:8000',
    SITE_URL: process.env.SITE_URL || 'http://localhost:3000'
  },

  /* -------------------------------------------------
     sections
    ------------------------------------------------- */

  i18n: require('./config/i18n.config').default,
  auth: require('./config/auth.config').default,
  axios: {
    baseURL: process.env.BACKEND_URL || 'http://localhost:8000'
  },

  /* -------------------------------------------------
  style sections
  ------------------------------------------------- */

  css: [
    '~/assets/styles/default.scss',

    // TODO
    '~assets/css/action.scss',
    '~assets/css/main.scss',
    '~assets/css/dark-mode.scss',
    '~assets/css/transition.scss',
    '~assets/css/grid-common.scss',
    '~assets/css/fonts.css',
    '~assets/css/reset.scss',
    '~assets/css/utils.scss'
  ],

  toast: {
    cssFile: '~/assets/styles/toast.scss'
  },

  svgSprite: {
    input: '~/assets/svg',
    output: '~/assets/.svg-compile'
  },

  tailwindcss: {
    configPath: '~/config/tailwind.config.js',
    exposeConfig: true,
    jit: true
  },

  // nuxt color mode (dark mode)
  colorMode: {
    classSuffix: ''
  },

  purgeCSS: {
    whitelistPatterns: [
      // vue-toastification purge
      /Vue-Toastification/,
      /(top|bottom)-(left|center|right)/,
      // TODO
      /time-picker/,
      /svg/,
      /vdatetime/,
      /symbol/,
      /__nuxt-error-page/,
      /action/,
      /ripple/,
      /ql-/
    ],
    keyframes: true,
    variables: true,
    fontFace: true
  },

  /* -------------------------------------------------
    build sections
    ------------------------------------------------- */

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    'nuxt-purgecss',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/html-validator'
  ],

  build: {
    optimizeCSS: true,

    html: {
      minify: {
        // fix input type attributes
        removeRedundantAttributes: false
      }
    },
    postcss: {
      plugins: {
        cssnano: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true
              }
            }
          ]
        }
      }
    }
  }
}
