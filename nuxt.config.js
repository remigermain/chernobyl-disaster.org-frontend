const isDev = process.env.Node_ENV !== "production"
const apiUrl = isDev ? "http://localhost:8000/": "https://chernobyl.org/"

import i18nConfig from "./config/i18n"
import babelConfig from "./config/babel"


export default {

  mode: "universal",
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
    {
      src: "~/plugins/components-client",
      ssr: false
    },
    {
      src: "~/plugins/components-server",
      ssr: true
    },
    "~/plugins/axios.js",
    "~/plugins/mixins.js",
    "~/plugins/prototype.js",
    "~/plugins/toast.js",
  ],

  i18n: i18nConfig, // i18n required in top

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "@nuxtjs/toast",
    "nuxt-i18n",
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
    "@nuxtjs/pwa",
    "@nuxtjs/sitemap",
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
    "~/assets/css/main.scss",
    "~/assets/css/fonts.scss",
    "~/assets/css/reset.scss",
    "~/assets/css/utils.scss",
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
    whiteListPatterns: [/svg.*/],
  },

  build: {
    indicator: isDev,
    devtools: isDev,

    babel: {
      ...babelConfig
    },

    optimizeCSS: true,
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
