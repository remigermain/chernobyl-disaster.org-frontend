let plugins = [
  "@babel/plugin-proposal-optional-chaining",
]

if (process.env.NODE_ENV === "production") {
  plugins = [
    ...plugins,
    "babel-plugin-transform-remove-console",
    "babel-plugin-transform-remove-debugger"
  ]
}

export default {
  plugins
}
