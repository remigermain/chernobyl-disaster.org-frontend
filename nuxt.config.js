const isDev = process.env.Node_ENV !== "production"

export default {

  mode: "universal",

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
  ],

  i18n: {
    locales: [
      { code: "fr", iso: "fr-FR", name: "Francais", file: "fr.json" },
      { code: "en", iso: "en-UK", name: "english", file: "en.json" }
    ],
    strategy: "prefix_and_default",
    defualtLocale: "en",
    lazy: true,
    langDir: "locales/",
    seo: true,
    vueI18nLoader: true
  },

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxt/content",
    "@nuxtjs/sitemap",
    "nuxt-i18n",
  ],

  axios: {},

  content: {},

  buildModules: [
    "@nuxtjs/fontawesome",
    "@nuxt/components",
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/style-resources",
    "@aceforth/nuxt-optimized-images",
    "nuxt-purgecss",
  ],

  components: [
    "~/components",
    { path: "~/components/extra/", prefix: "extra" }
  ],

  optimizedImages: {
    optimizeImages: true
  },

  css: [
    "~/assets/css/common.scss",
    "~/assets/css/fonts.scss"
  ],

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

  fontawesome: {
    component: "fa",
    icons: {
      solid: true,
      regular: true,
      //light: true,
      //duotone: true,
      brands: true
    }
  },

  purgecss: {
    whiteListPatterns: [/svg.*/, /fa.*/]
  },

  build: {
  }
}
