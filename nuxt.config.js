const isDev = process.env.Node_ENV !== "production"
const apiUrl = isDev ? "http://localhost:8000/": "https://chernobyl.org/"


export default {

  mode: "universal",
  ssr: true,
  telemetry: false,

  target: "server",

  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: process.env.npm_package_description || "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ]
  },

  render: {
    http2: {
      push: true, pushAssets: null
    }
  },

  plugins: [
    "~/plugins/axios.js",
    "~/plugins/mixins.js",
    "~/plugins/prototype.js",
    "~/plugins/toast.js",
    "~/plugins/context.js",
    "~/plugins/date-time-picker.js"
  ],

  i18n: {
    locales: [
      { code: "fr", iso: "fr-FR", name: "Francais", file: "fr.json" },
      { code: "en", iso: "en-UK", name: "english", file: "en.json" }
    ],
    strategy: "prefix",
    defaultLocale: "fr",
    lazy: true,
    langDir: "locales/",
    seo: true,
    vueI18nLoader: true
  },

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/auth",
    "nuxt-i18n",
    "@nuxtjs/toast",
    "@nuxtjs/sitemap",
  ],

  sitemap: {
    hostname: apiUrl,
    gzip: true,
    exclude: [
      "/contribute/**",
    ],
  },

  auth: {
    resetOnError: true, // une erreur 403/401 supprimer toutes les info, et redirige vers login
    plugins: ["~/plugins/auth.js"],
    redirect: {
      login: "/auth/login",
      logout: "/auth/login",
      callback: "/auth/login",
      home: "/"
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: apiUrl + "auth/login/",
            method: "post",
            propertyName: "key"
          },
          logout: {
            url: apiUrl + "auth/logout/",
            method: "post"
          },
          user: {
            url: apiUrl + "auth/user/",
            method: "get",
            propertyName: false
          }
        },
        tokenType: "Token"
      },
    }
  },

  axios: {
    baseURL: apiUrl
  },

  buildModules: [
    "@nuxtjs/eslint-module",
    "@nuxt/components",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/style-resources",
    "@aceforth/nuxt-optimized-images",
    "nuxt-purgecss",
    "nuxt-svg-loader",
  ],

  components: [
    "~/components",
    {
      path: "~/components/extra/",
      prefix: "extra"
    },
    {
      path: "~/components/utils/",
      prefix: "utils"
    },
    {
      path: "~/components/model/",
      prefix: "model"
    },
    {
      path: "~/components/admin/",
      prefix: "admin"
    },
    {
      path: "~/components/gallery/",
      prefix: "gallery"
    }
  ],

  optimizedImages: {
    optimizeImages: true
  },

  css: [
    "~/assets/css/common.scss",
    "~/assets/css/fonts.scss"
  ],

  toast: {
    singleton: true,
    iconPack: "callback",
    position: "top-center",
  },

  styleResources: {
    scss: [
      "~/assets/css/var/*.scss",
      "~/assets/css/var/*.sass",
    ]
  },

  tailwindcss: {
    configPath: "~/config/tailwind.config.js",
    cssPatg: "~/assets/css/tailwind.css",
    exposeConfig: false
  },

  purgecss: {
    whiteListPatterns: [/svg.*/, /fa.*/]
  },

  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)|(\.svg$)/ /* <--- here */
        })
      }
    }
  }
}
