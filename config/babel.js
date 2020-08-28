const isDev = process.env.Node_ENV !== "production"

let lst = [
  "@babel/plugin-proposal-optional-chaining",
  "babel-plugin-transform-minify-booleans",
]

if (!isDev) {
  lst = [
    ...lst,
    "babel-plugin-transform-remove-console",
    "babel-plugin-transform-remove-debugger"
  ]
}

export default {
  plugins: lst
}
