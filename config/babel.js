let plugins = [
  "@babel/plugin-proposal-optional-chaining",
]

if (process.env.NODE_ENV) {
  plugins = [
    ...plugins,
    "babel-plugin-transform-remove-console",
    "babel-plugin-transform-remove-debugger"
  ]
}

export default {
  plugins: plugins
}
