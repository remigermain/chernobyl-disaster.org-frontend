export default {
  target: "server",
  ssr: true,

  telemetry: false,

  head: {
    title: process.env.npm_package_name || "",
    titleTemplate: "Chernobyl - %s",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
      { name: "og:image", content: "/icon.png" },
      { name: "twitter:image", content: "/icon.png" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  render: {
    http2: {
      push: true,
      pushAssets: null,
    },
  },

  env: {
    BACKEND_URL: process.env.BACKEND_URL || "http://localhost:8000",
    SITE_URL: process.env.SITE_URL || "http://localhost:3000",
    SITE_NAME: process.env.SITE_NAME || "chernobyl-disaster.org",
  },

  plugins: [
    { src: "~/plugins/matomo.client.js", ssr: false },
    "~/plugins/axios.js",
    "~/plugins/mixins.js",
    "~/plugins/prototype.js",
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
    meta: {
      theme_color: "#1a202c",
      nativeUI: true,
    },
    manifest: {
      theme_color: "#1a202c",
    }
  },

  i18n: require("./config/i18n").default, // i18n required in top

  sitemap: {
    hostname: process.env.SITE_URL,
    gzip: true,
    exclude: ["/contribute/**"],
  },
  robots: [
    {
      UserAgent: "*",
      Disallow: "/contribute/*",
    },
    {
      UserAgent: "*",
      Disallow: "/auth/new-password",
    },
    {
      UserAgent: "*",
      Disallow: "/auth/verify-email",
    },
  ],

  auth: {
    resetOnError: true,
    plugins: ["~/plugins/auth.js"],
    redirect: {
      login: "/auth/login",
      logout: "/auth/login",
      callback: "/auth/login",
      home: "/",
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "auth/login/",
            method: "post",
            propertyName: "key",
          },
          logout: {
            url: "auth/logout/",
            method: "post",
          },
          user: {
            url: "auth/user/",
            method: "get",
            propertyName: false,
          },
        },
        tokenType: "Token",
      },
    },
  },

  axios: {
    baseURL: process.env.BACKEND_URL || "http://localhost:8000",
  },

  buildModules: [
    "@nuxtjs/eslint-module",
    "@nuxt/components",
    // "nuxt-purgecss",
    '@nuxtjs/color-mode',
    "@nuxtjs/tailwindcss",
    "@nuxtjs/svg-sprite",
  ],

  components: [
    "~/components",
    {
      path: "~/components/admin/",
      prefix: "admin",
    },
    {
      path: "~/components/action/",
      prefix: "action",
    },
    {
      path: "~/components/utils/",
      prefix: "utils",
    },
    {
      path: "~/components/field/",
      prefix: "field",
    },
    {
      path: "~/components/model/",
      prefix: "model",
    },
    {
      path: "~/components/gallery/",
      prefix: "gallery",
    },
    {
      path: "~/components/timeline/",
      prefix: "timeline",
    },
    {
      path: "~/components/contribute/",
      prefix: "contribute",
    },
  ],

  svgSprite: {
    input: "~/assets/svg",
    output: "~/assets/svg-compile",
  },

  css: [
    "destyle.css/destyle.css",
    "~assets/css/main.scss",
    "~assets/css/dark-mode.scss",
    "~assets/css/transition.scss",
    "~assets/css/grid-common.scss",
    "~assets/css/fonts.css",
    "~assets/css/reset.css",
    "~assets/css/utils.scss",
  ],

  toast: {
    singleton: true,
    iconPack: "callback",
    position: "top-center",
  },

  tailwindcss: {
    configPath: "~/config/tailwind.config.js",
    cssPatg: "~/assets/css/tailwind.css",
    exposeConfig: true,
  },

  colorMode: {
    classSuffix: ''
  },

  // many problemes with purge ...
  purgeCSS: {
    enabled: false,
    whitelist: ["vue__time-picker"],
    whitelistPatterns: [
      /svg/,
      /vdatetime/,
      /symbol/,
      /__nuxt-error-page/,
      /action/,
      /ripple/,
      /ql-/,
      /time-picker/,
      /-(leave|enter|appear)(|-(to|from|active))$/,
      /^(?!(|.*?:)cursor-move).+-move$/,
      /^nuxt-link(|-exact)-active$/
    ],
  },

  build: {
    optimizeCSS: true,
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)|(\.svg$)/,
        })
      }
    },
  },
}
