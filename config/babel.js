const isDev = process.env.NODE_ENV !== "production"

let plugins = [
  "@babel/plugin-proposal-optional-chaining",
  "babel-plugin-transform-minify-booleans",
]

if (!isDev) {
  plugins = [
    ...plugins,
    "babel-plugin-transform-remove-console",
    "babel-plugin-transform-remove-debugger"
  ]
}

export default {
  plugins: plugins
}
