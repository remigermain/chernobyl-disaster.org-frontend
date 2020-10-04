export default {
  target: "server",
  ssr: true,

  telemetry: false,

  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
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
    { src: "~/plugins/matomo.js", ssr: false },
    { src: "~/plugins/datetime.js", ssr: false },
    "~/plugins/axios.js",
    "~/plugins/mixins.js",
    "~/plugins/prototype.js",
    {src: "~/plugins/directive.js", ssr: false},
    {src: "~/plugins/quil.js", ssr: false}
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
    icon: false,
    manifest: {
      theme_color: "#1a202cff",
    },
  },

  i18n: require("./config/i18n").default, // i18n required in top

  sitemap: {
    hostname: process.env.SITE_URL,
    gzip: true,
    exclude: ["/contribute/**"],
  },
  robots: {
    UserAgent: "*",
    Disallow: "/contribute/*",
  },

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
    "@nuxtjs/tailwindcss",
    "nuxt-purgecss",
    "@nuxtjs/svg-sprite",
  ],

  components: [
    "~/components",
    {
      path: "~/components/admin/",
      prefix: "admin",
    },
    {
      path: "~/components/extra/",
      prefix: "extra",
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
    "~assets/css/main.css",
    "~assets/css/transition.scss",
    "~assets/css/grid-common.scss",
    "~assets/css/fonts.css",
    "~assets/css/reset.css",
    "~assets/css/utils.scss",

    'quill/dist/quill.core.css',
    'quill/dist/quill.snow.css',
  ],

  toast: {
    singleton: true,
    iconPack: "callback",
    position: "top-center",
  },

  tailwindcss: {
    configPath: "~/config/tailwind.config.js",
    cssPatg: "~/assets/css/tailwind.css",
    exposeConfig: false,
  },

  purgeCSS: {
    whitelistPatterns: [
      /svg/,
      /vdatetime/,
      /symbol/,
      /__nuxt-error-page/,
      /action/,
      /ripple/,
      /ql-/,
      /-(leave|enter|appear)(|-(to|from|active))$/,
      /^(?!(|.*?:)cursor-move).+-move$/,
      /^nuxt-link(|-exact)-active$/
    ],
  },

  build: {
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
