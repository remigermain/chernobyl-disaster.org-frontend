module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    "@nuxtjs",
    "eslint:recommended",
    "plugin:vue/recommended",
    "prettier",
    "prettier/vue"
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
    parser: "babel-eslint"
  },
  plugins: ["vue", "prettier"],
  rules: {
    semi: [2, "never"],
    "max-len": ["error", { code: 200 }],
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
  }
}
