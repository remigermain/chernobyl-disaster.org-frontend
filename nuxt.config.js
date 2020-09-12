const isDev = process.env.NODE_ENV !== "production"
// const apiUrl = isDev ? "http://localhost:8000/": "https://chernobyl.org/"
const apiUrl = "http://localhost:8000/"

export default {

  target: "server",
  ssr: true,

  telemetry: false,

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
    {src: "~/plugins/matomo.js", ssr: false},
    {src: "~/plugins/datetime.js", ssr: true},
    "~/plugins/axios.js",
    "~/plugins/mixins.js",
    "~/plugins/prototype.js",
    "~/plugins/toast.js",
  ],

  modules: [
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@nuxtjs/pwa",
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "@nuxtjs/toast",
    "nuxt-i18n",
  ],

  pwa: {
    manifest: {
      lang: "fr"
    }
  },

  i18n: require("./config/i18n").default, // i18n required in top

  sitemap: {
    hostname: apiUrl,
    gzip: true,
    exclude: [
      "/contribute/**",
    ],
  },
  robots: {
    UserAgent: "*",
    Disallow: "/contribute/*"
  },

  auth: {
    resetOnError: true,
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
            url: `${apiUrl}auth/login/`,
            method: "post",
            propertyName: "key"
          },
          logout: {
            url: `${apiUrl}auth/logout/`,
            method: "post"
          },
          user: {
            url: `${apiUrl}auth/user/`,
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
    "@nuxtjs/svg-sprite"
  ],

  components: [
    "~/components",
    {
      path: "~/components/admin/",
      prefix: "admin"
    },
    {
      path: "~/components/extra/",
      prefix: "extra"
    },
    {
      path: "~/components/field/",
      prefix: "field"
    },
    {
      path: "~/components/model/",
      prefix: "model"
    },
    {
      path: "~/components/gallery/",
      prefix: "gallery"
    },
    {
      path: "~/components/timeline/",
      prefix: "timeline"
    },
    {
      path: "~/components/contribute/",
      prefix: "contribute"
    },
  ],

  optimizedImages: {
    optimizeImages: true
  },

  svgSprite: {
    input: "~/assets/svg",
    output: "~/assets/svg-compile",
  },

  css: [
    "destyle.css/destyle.css",
    "~assets/css/main.css",
    "~assets/css/grid-form.scss",
    "~assets/css/fonts.css",
    "~assets/css/reset.css",
    "~assets/css/utils.scss",
  ],

  toast: {
    singleton: true,
    iconPack: "callback",
    position: "top-center",
  },

  styleResources: {},

  tailwindcss: {
    configPath: "~/config/tailwind.config.js",
    cssPatg: "~/assets/css/tailwind.css",
    exposeConfig: false
  },

  purgeCSS: {
    whiteListPatterns: [/svg.*/, "svg", "symbol", "__nuxt-error-page"],
  },

  build: {
    indicator: isDev,
    devtools: isDev,

    babel: {
      ...require("./config/babel").default
    },

    optimizeCSS: !isDev,
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)|(\.svg$)/
        })
      }
    }
  }
}
